import { test } from "node:test";
import assert from "node:assert/strict";
import { fixture, ids, input, delivery } from "./manage-fixture.mjs";
test("isolated PostgreSQL: authorization, scoped workflow, revisions and review", async (t) => {
  const { db, actor, snapshot, command } = await fixture();
  let task, reportTask, submitted;
  try {
    await t.test(
      "anonymous, unprovisioned and forged user metadata denied",
      async () => {
        await actor(null);
        await assert.rejects(snapshot, /permission denied/);
        await actor("stranger");
        await assert.rejects(snapshot, /ACCESS_DENIED/);
        await db.query("select set_config('request.jwt.claims',$1,false)", [
          JSON.stringify({ user_metadata: { role: "founder" } }),
        ]);
        await assert.rejects(snapshot, /ACCESS_DENIED/);
      },
    );
    await t.test(
      "anonymous auth account denied even with principal",
      async () => {
        await actor("owner");
        await db.query("select set_config('request.jwt.claims',$1,false)", [
          JSON.stringify({ is_anonymous: true }),
        ]);
        await assert.rejects(snapshot, /ACCESS_DENIED/);
      },
    );
    await t.test(
      "direct tables and private identity helper denied",
      async () => {
        await actor("leaders");
        for (const table of [
          "principals",
          "grants",
          "tasks",
          "deliverables",
          "reviews",
          "activity",
          "requests",
        ])
          await assert.rejects(
            () => db.query(`select * from manage_private.${table}`),
            /permission denied/,
          );
        await assert.rejects(
          () => db.query("select manage_private.current_actor()"),
          /permission denied/,
        );
      },
    );
    await t.test(
      "registration grants no rights and training work remains disabled",
      async () => {
        await assert.rejects(
          () => command(input("reports", "reports")),
          /ACCESS_DENIED/,
        );
        await actor("owner");
        await assert.rejects(
          () => command(input("training", "owner")),
          /MODULE_DISABLED/,
        );
      },
    );
    await t.test("separate workspaces and cross-module task IDs", async () => {
      await actor("leaders");
      task = await command(input());
      await actor("reports");
      reportTask = await command(input("reports", "reports"));
      const s = await snapshot();
      assert.equal(s.tasks.length, 1);
      assert.equal(s.tasks[0].module_id, "reports");
      await assert.rejects(
        () =>
          command({
            type: "setState",
            taskId: task.taskId,
            revision: 1,
            state: "blocked",
            note: "Forbidden",
          }),
        /ACCESS_DENIED/,
      );
    });
    await t.test("another executor cannot submit", async () => {
      await actor("peer");
      await assert.rejects(() => command(delivery(task)), /ACCESS_DENIED/);
    });
    await t.test(
      "stale editor does not overwrite the saved revision",
      async () => {
        await actor("leaders");
        const edit = {
          ...input(),
          type: "editTask",
          taskId: task.taskId,
          revision: task.revision,
          title: "First editor saved",
        };
        delete edit.moduleId;
        task = await command(edit);
        await assert.rejects(
          () => command({ ...edit, title: "Stale overwrite" }),
          /REVISION_CONFLICT/,
        );
        assert.equal((await snapshot()).tasks[0].title, "First editor saved");
      },
    );
    await t.test(
      "raw RPC validates evidence and paired code references",
      async () => {
        for (const evidence of [
          ["javascript:alert(1)"],
          ["https://secret:password@example.com"],
        ])
          await assert.rejects(
            () => command({ ...delivery(task), evidence }),
            /INVALID_INPUT/,
          );
        await assert.rejects(
          () => command({ ...delivery(task), branch: "feature/test" }),
          /check constraint/,
        );
        assert.equal((await snapshot()).deliverables.length, 0);
      },
    );
    await t.test(
      "retry writes one deliverable; changed payload conflicts",
      async () => {
        const key = "same-deliverable-key-001",
          body = delivery(task);
        submitted = await command(body, key);
        assert.deepEqual(await command(body, key), submitted);
        await assert.rejects(
          () => command({ ...body, version: "v2" }, key),
          /IDEMPOTENCY_CONFLICT/,
        );
        const s = await snapshot();
        assert.equal(s.deliverables.length, 1);
        assert.equal(
          s.activity.filter((a) => a.operation === "submitDeliverable").length,
          1,
        );
      },
    );
    await t.test(
      "only assigned founder can review current submission",
      async () => {
        const review = {
          type: "review",
          taskId: task.taskId,
          revision: submitted.revision,
          deliverableId: submitted.deliverableId,
          decision: "accepted",
          note: "Evidence checked",
        };
        await assert.rejects(() => command(review), /ACCESS_DENIED/);
        await actor("owner");
        await assert.rejects(
          () => command({ ...review, deliverableId: ids.owner }),
          /DELIVERABLE_MISMATCH/,
        );
        task = await command(review);
        assert.equal(
          (await snapshot()).tasks.find((t) => t.id === task.taskId).state,
          "accepted",
        );
      },
    );
    await t.test(
      "reopening clears acceptance; new version requires new review",
      async () => {
        task = await command({
          type: "setState",
          taskId: task.taskId,
          revision: task.revision,
          state: "queued",
          note: "Scope changed; re-review required",
        });
        assert.equal(task.deliverableId, null);
        await actor("leaders");
        const second = await command({
          ...delivery(task),
          version: "v2",
          workspace: "Leaders workspace second session",
        });
        assert.equal((await snapshot()).tasks[0].state, "submitted");
        await actor("owner");
        await assert.rejects(
          () =>
            command({
              type: "review",
              taskId: task.taskId,
              revision: second.revision,
              deliverableId: submitted.deliverableId,
              decision: "accepted",
              note: "Wrong old version",
            }),
          /DELIVERABLE_MISMATCH/,
        );
        task = second;
      },
    );
    await t.test(
      "changes requested and independent second workspace retain history",
      async () => {
        await command({
          type: "review",
          taskId: task.taskId,
          revision: task.revision,
          deliverableId: task.deliverableId,
          decision: "changes_requested",
          note: "Add stronger evidence",
        });
        await actor("reports");
        await command({
          ...delivery(reportTask),
          workspace: "Reports workspace",
        });
        await actor("owner");
        const s = await snapshot();
        assert.equal(s.deliverables.length, 3);
        assert.equal(s.reviews.length, 2);
        assert.equal(new Set(s.deliverables.map((d) => d.workspace)).size, 3);
        assert.equal(
          s.activity.find((a) => a.operation === "state:queued").note,
          "Scope changed; re-review required",
        );
      },
    );
    await t.test(
      "no publish or active agents; revocation applies on next request",
      async () => {
        await assert.rejects(
          () => command({ type: "publish" }),
          /INVALID_INPUT/,
        );
        await db.exec("reset role");
        await assert.rejects(
          () =>
            db.query(
              "insert into manage_private.principals(display_name,kind,enabled) values('Agent','agent',true)",
            ),
          /check constraint/,
        );
        await db.query(
          "update manage_private.principals set enabled=false where id=$1",
          [ids.leaders],
        );
        await actor("leaders");
        await assert.rejects(snapshot, /ACCESS_DENIED/);
      },
    );
    await t.test(
      "all eight tables protected and public wrappers are invoker",
      async () => {
        await db.exec("reset role");
        const tables = (
          await db.query(
            "select relrowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='manage_private' and c.relkind='r'",
          )
        ).rows;
        assert.equal(tables.length, 8);
        assert.ok(tables.every((t) => t.relrowsecurity));
        assert.equal(
          (
            await db.query(
              "select count(*)::int n from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname like 'manage_%' and p.prosecdef",
            )
          ).rows[0].n,
          0,
        );
      },
    );
  } finally {
    await db.close();
  }
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { fixture, ids, input } from "./manage-fixture.mjs";
import { apiUrl } from "./manage-imports.mjs";
const { GET, POST } = await import(apiUrl);
test("HTTP handlers use real isolated workflow with mocked Auth/Data transport", async (t) => {
  const { db, actor, snapshot, command } = await fixture(),
    original = globalThis.fetch,
    oldUrl = process.env.NEXT_PUBLIC_SUPABASE_URL,
    oldKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  try {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://isolated.invalid";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "isolated-key";
    globalThis.fetch = async (i, options = {}) => {
      const req = new Request(i, options),
        path = new URL(req.url).pathname,
        name = req.headers.get("authorization")?.slice(7),
        id = ids[name];
      if (path === "/auth/v1/user")
        return Response.json(
          id
            ? {
                id,
                aud: "authenticated",
                role: "authenticated",
                is_anonymous: false,
              }
            : { message: "invalid token" },
          { status: id ? 200 : 401 },
        );
      assert.ok(id);
      assert.equal(req.headers.get("apikey"), "isolated-key");
      await actor(name);
      try {
        const p = await req.json();
        return Response.json(
          path.endsWith("manage_snapshot")
            ? await snapshot()
            : await command(p.payload, p.request_key),
        );
      } catch (e) {
        return Response.json(
          { code: e.code, message: e.message, details: null, hint: null },
          { status: 400 },
        );
      }
    };
    const request = (body, token = "owner", key = crypto.randomUUID()) =>
      new Request("https://room.invalid/api/manage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Idempotency-Key": key,
        },
        body: JSON.stringify(body),
      });
    const get = (token) =>
      GET(
        new Request("https://room.invalid/api/manage", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }),
      );
    let task;
    await t.test(
      "missing and invalid credentials disclose no records",
      async () => {
        assert.equal((await get()).status, 401);
        assert.equal((await get("forged-token")).status, 401);
      },
    );
    await t.test(
      "private no-store snapshots expose only scoped modules",
      async () => {
        const r = await get("leaders");
        assert.equal(r.status, 200);
        assert.equal(r.headers.get("cache-control"), "private, no-store");
        assert.deepEqual(
          (await r.json()).modules.map((m) => m.moduleId),
          ["leaders"],
        );
      },
    );
    await t.test(
      "HTTP bounds, strict schema and idempotency key required",
      async () => {
        assert.equal(
          (await POST(request({ ...input(), publish: true }))).status,
          400,
        );
        assert.equal(
          (await POST(request({ ...input(), goal: "x".repeat(41000) }))).status,
          413,
        );
        const r = request(input());
        r.headers.delete("Idempotency-Key");
        assert.equal((await POST(r)).status, 400);
        assert.equal(
          (await POST(request(input("training", "owner")))).status,
          422,
        );
      },
    );
    await t.test(
      "create/reopen and retry refer to one persisted task",
      async () => {
        const key = "http-idempotency-create-001";
        const r = await POST(request(input(), "owner", key));
        assert.equal(r.status, 200);
        task = await r.json();
        assert.deepEqual(
          await (await POST(request(input(), "owner", key))).json(),
          task,
        );
        assert.equal((await (await get("leaders")).json()).tasks.length, 1);
      },
    );
    await t.test(
      "stale writes return 409 and cross-module writes return 403",
      async () => {
        const edit = {
          ...input(),
          type: "editTask",
          taskId: task.taskId,
          revision: task.revision,
        };
        delete edit.moduleId;
        assert.equal((await POST(request(edit))).status, 200);
        const stale = await POST(request({ ...edit, title: "Stale" }));
        assert.equal(stale.status, 409);
        assert.equal((await stale.json()).error, "REVISION_CONFLICT");
        assert.equal(
          (await POST(request(input("reports", "owner"), "leaders"))).status,
          403,
        );
      },
    );
  } finally {
    globalThis.fetch = original;
    if (oldUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = oldUrl;
    if (oldKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = oldKey;
    await db.close();
  }
});

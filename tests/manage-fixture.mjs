import fs from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
export const ids = {
  owner: "11111111-1111-4111-8111-111111111111",
  leaders: "22222222-2222-4222-8222-222222222222",
  reports: "33333333-3333-4333-8333-333333333333",
  stranger: "44444444-4444-4444-8444-444444444444",
  peer: "55555555-5555-4555-8555-555555555555",
};
export async function fixture() {
  const db = new PGlite();
  await db.exec(
    `create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;create function auth.jwt() returns jsonb language sql as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;grant usage on schema auth to authenticated,anon;grant execute on all functions in schema auth to authenticated,anon;`,
  );
  await db.exec(
    await fs.readFile(
      new URL("../db/visionseek-manage.sql", import.meta.url),
      "utf8",
    ),
  );
  for (const [name, id] of Object.entries(ids)) {
    await db.query("insert into auth.users values($1)", [id]);
    if (name !== "stranger")
      await db.query(
        "insert into manage_private.principals(id,auth_user_id,display_name,kind,enabled) values($1,$1,$2,$3,true)",
        [id, name, name === "owner" ? "founder" : "human"],
      );
  }
  for (const name of ["leaders", "reports", "peer"])
    await db.query("insert into manage_private.grants values($1,$2,$3)", [
      ids[name],
      name === "reports" ? "reports" : "leaders",
      ["read", "createTask", "editTask", "submitDeliverable", "review"],
    ]);
  const actor = async (name) => {
    await db.exec("reset role");
    await db.query(
      "select set_config('request.jwt.claim.sub',$1,false),set_config('request.jwt.claims','{}',false)",
      [name ? ids[name] : ""],
    );
    await db.exec(`set role ${name ? "authenticated" : "anon"}`);
  };
  const snapshot = async () =>
    (await db.query("select public.manage_snapshot() as data")).rows[0].data;
  const command = async (value, key = crypto.randomUUID()) =>
    (
      await db.query("select public.manage_command($1::jsonb,$2) as data", [
        JSON.stringify(value),
        key,
      ])
    ).rows[0].data;
  return { db, actor, snapshot, command };
}
export const input = (module = "leaders", executor = "leaders") => ({
  type: "createTask",
  moduleId: module,
  title: `${module} acceptance`,
  goal: "Measurable deliverable",
  inputs: "Isolated test",
  acceptance: "Evidence reviewed",
  executorId: ids[executor],
  approverId: ids.owner,
  dueAt: null,
});
export const delivery = (t) => ({
  type: "submitDeliverable",
  taskId: t.taskId,
  revision: t.revision,
  summary: "Isolated evidence",
  version: "v1",
  evidence: ["https://example.com/evidence"],
  workspace: "Leaders workspace",
  branch: null,
  commit: null,
});

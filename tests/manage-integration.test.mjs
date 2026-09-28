import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { buildCatalog, generate } from "../scripts/generate-manage-registry.mjs";
import { checkRegistration } from "../scripts/check-manage-registration.mjs";
import { compile, serverUrl, registryUrl } from "./manage-imports.mjs";
import { fixture, ids } from "./manage-fixture.mjs";
const activityUrl = await compile("../lib/manage/github-activity.ts", { zod: import.meta.resolve("zod") });
const { parseActivity, createActivityReader } = await import(activityUrl);
const pull = { number: 41, title: "<script>plain title</script>", state: "open", draft: true, merged_at: null, updated_at: "2026-09-28T10:00:00Z", head: { ref: "feature/room", sha: "a".repeat(40) }, base: { repo: { full_name: "visionseek1/visionseek-platform" } } };

test("module discovery and handover generation need no registry code changes", async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), "room-catalog-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const dir of ["modules", "docs/manage-room/handovers", "lib/manage"]) await mkdir(path.join(root, dir), { recursive: true });
  const base = JSON.parse(await readFile(new URL("../modules/projects.json", import.meta.url)));
  await writeFile(path.join(root, "modules/future-unit.json"), JSON.stringify({ ...base, moduleId: "future-unit" }));
  assert.deepEqual(await generate(root), { modules: 1, handovers: 0 });
  await generate(root, true);
  const next = { ...base, moduleId: "another-unit" };
  await writeFile(path.join(root, "modules/another-unit.json"), JSON.stringify(next));
  await assert.rejects(generate(root, true), /stale/);
  assert.equal((await buildCatalog(root)).modules.length, 2);
  await generate(root);
  next.docsUrl = "https://user:password@example.com";
  await writeFile(path.join(root, "modules/another-unit.json"), JSON.stringify(next));
  await assert.rejects(buildCatalog(root));
});
test("handover gate requires a changed record covering all changed source files", () => {
  const handovers = [{ id: "one", changedPaths: ["components/leaders/"] }];
  assert.deepEqual(checkRegistration(["components/leaders/feed.tsx"], handovers), ["components/leaders/feed.tsx"]);
  assert.deepEqual(checkRegistration(["docs/manage-room/handovers/one.json", "components/leaders/feed.tsx", "app/ar/reports/page.tsx"], handovers), ["app/ar/reports/page.tsx"]);
  assert.deepEqual(checkRegistration(["docs/manage-room/handovers/one.json", "components/leaders/feed.tsx"], handovers), []);
  assert.deepEqual(checkRegistration(["package-lock.json", "docs/note.md"], []), []);
});
test("feed derives states and safe fixed-repository links, never a published state", () => {
  assert.equal(parseActivity("open", [pull])[0].state, "draft");
  assert.equal(parseActivity("closed", [{ ...pull, state: "closed" }])[0].state, "closed");
  const merged = parseActivity("closed", [{ ...pull, state: "closed", merged_at: pull.updated_at, html_url: "javascript:alert(1)" }])[0];
  assert.equal(merged.state, "merged");
  assert.equal(merged.url, "https://github.com/visionseek1/visionseek-platform/pull/41");
  assert.throws(() => parseActivity("open", [{ ...pull, base: { repo: { full_name: "other/repo" } } }]));
  assert.throws(() => parseActivity("open", [{ ...pull, number: -1 }]));
});
test("public source reads deduplicate/cache and explicitly report partial outages and stale expiry", async () => {
  let now = Date.parse("2026-09-28T10:00:00Z"), calls = 0, fail = false;
  const read = createActivityReader(async (url, options) => {
    calls++;
    assert.ok(url.startsWith("https://api.github.com/repos/visionseek1/visionseek-platform/"));
    assert.equal(new Headers(options.headers).has("authorization"), false);
    assert.equal(new Headers(options.headers).has("apikey"), false);
    if (fail && url.includes("state=open")) return new Response("rate limited", { status: 403 });
    return Response.json(url.includes("state=open") ? [pull] : [], { headers: { link: url.includes("state=open") ? '<url>; rel="next"' : "" } });
  }, () => now);
  const [first, second] = await Promise.all([read(), read()]);
  assert.deepEqual(first, second); assert.equal(calls, 3); assert.equal(first[0].limited, true);
  await read(); assert.equal(calls, 3);
  now += 300_001; fail = true;
  const stale = await read();
  assert.equal(stale[0].status, "stale"); assert.equal(stale[1].status, "current");
  assert.equal(stale[0].checkedAt, first[0].checkedAt); assert.equal(stale[0].items.length, 1);
  now += 86_400_001;
  const expired = await read();
  assert.equal(expired[0].status, "unavailable"); assert.equal(expired[0].checkedAt, null); assert.deepEqual(expired[0].items, []);
});
test("invalid or oversized source data is unavailable, not an empty successful feed", async () => {
  const malformed = createActivityReader(async () => Response.json({ message: "oops" }));
  assert.ok((await malformed()).every(s => s.status === "unavailable"));
  const large = createActivityReader(async () => new Response("x".repeat(6_000_001)));
  assert.ok((await large()).every(s => s.status === "unavailable"));
});
test("integration API checks live founder membership before even cached metadata is returned", async t => {
  const f = await fixture(), previousFetch = globalThis.fetch;
  const oldUrl = process.env.NEXT_PUBLIC_SUPABASE_URL, oldKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let githubCalls = 0;
  t.after(async () => { globalThis.fetch = previousFetch; if (oldUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL; else process.env.NEXT_PUBLIC_SUPABASE_URL = oldUrl; if (oldKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = oldKey; await f.db.close(); });
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://isolated.invalid";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "isolated-key";
  globalThis.fetch = async (input, options = {}) => {
    const request = new Request(input, options), url = new URL(request.url);
    if (url.hostname === "api.github.com") { githubCalls++; assert.equal(request.headers.has("authorization"), false); return Response.json([]); }
    const name = request.headers.get("authorization")?.slice(7);
    if (url.pathname === "/auth/v1/user") return Response.json(ids[name] ? { id: ids[name], aud: "authenticated", role: "authenticated", is_anonymous: false } : { error: "invalid" }, { status: ids[name] ? 200 : 401 });
    await f.actor(name);
    try { return Response.json(await f.snapshot()); } catch (e) { return Response.json({ code: e.code, message: e.message }, { status: 400 }); }
  };
  const route = await compile("../app/api/manage/integrations/route.ts", {
    "@/lib/manage/server": serverUrl, "@/lib/manage/registry": registryUrl,
    "@/lib/manage/github-activity": `${activityUrl}#api-test`,
  });
  const { GET } = await import(route);
  const get = token => GET(new Request("https://room.invalid/api/manage/integrations", { headers: token ? { authorization: `Bearer ${token}` } : {} }));
  assert.equal((await get()).status, 401);
  assert.equal((await get("forged")).status, 401);
  assert.equal((await get("reports")).status, 403);
  assert.equal(githubCalls, 0);
  const ok = await get("owner"); assert.equal(ok.status, 200); assert.equal(ok.headers.get("cache-control"), "private, no-store");
  assert.ok((await ok.json()).handovers.length); assert.equal(githubCalls, 3);
  await f.db.exec("reset role; update manage_private.principals set enabled=false where kind='founder';");
  assert.equal((await get("owner")).status, 403); assert.equal(githubCalls, 3);
});

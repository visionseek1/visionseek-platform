import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("uses native Next.js and Vercel configuration", async () => {
  const [packageJson, vercelJson] = await Promise.all([
    read("package.json"),
    read("vercel.json"),
  ]);
  const pkg = JSON.parse(packageJson);
  const vercel = JSON.parse(vercelJson);

  assert.equal(pkg.scripts.build, "next build");
  assert.equal(pkg.scripts.start, "next start");
  assert.equal(vercel.framework, "nextjs");
  assert.equal(pkg.dependencies.vinext, undefined);
  assert.equal(pkg.devDependencies.vite, undefined);
  assert.equal(pkg.devDependencies.wrangler, undefined);
});

test("does not embed Supabase configuration in the browser client", async () => {
  const client = await read("lib/supabase-browser.ts");

  assert.match(client, /process\.env\.NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(client, /process\.env\.NEXT_PUBLIC_SUPABASE_ANON_KEY/);
  assert.doesNotMatch(client, /sb_publishable_/);
  assert.doesNotMatch(client, /supabase\.co/);
});

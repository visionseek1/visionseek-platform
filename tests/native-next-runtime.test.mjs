import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const exists = async (path) => {
  try {
    await access(new URL(`../${path}`, import.meta.url));
    return true;
  } catch {
    return false;
  }
};

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
  assert.equal(await exists("vite.config.ts"), false);
  assert.equal(await exists("worker/index.ts"), false);
});

test("insights preview feed does not read raw main JSON", async () => {
  const [feed, client, englishPage, arabicPage] = await Promise.all([
    read("lib/insights-feed.mjs"),
    read("components/insights-page.tsx"),
    read("app/insights/page.tsx"),
    read("app/ar/insights/page.tsx"),
  ]);

  assert.match(feed, /Preview and development must not read raw main\/public\/insights\.json/);
  assert.match(feed, /vercelEnv === "production"/);
  assert.match(feed, /raw\.githubusercontent\.com\/visionseek1\/visionseek-platform\/main\/public\/insights\.json/);
  assert.match(feed, /\/insights\.json/);
  assert.doesNotMatch(client, /raw\.githubusercontent\.com/);
  assert.doesNotMatch(client, /\/main\/public\/insights\.json/);
  assert.match(englishPage, /insightsFeedUrl\(\)/);
  assert.match(arabicPage, /insightsFeedUrl\(\)/);

  const cases = [
    ["production", "https://raw.githubusercontent.com/visionseek1/visionseek-platform/main/public/insights.json"],
    ["preview", "/insights.json"],
    ["development", "/insights.json"],
    [undefined, "/insights.json"],
  ];
  const { insightsFeedUrl } = await import("../lib/insights-feed.mjs");
  for (const [env, expected] of cases) {
    assert.equal(insightsFeedUrl(env), expected);
  }
});

test("does not embed Supabase configuration in the browser client", async () => {
  const client = await read("lib/supabase-browser.ts");

  assert.match(client, /process\.env\.NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(client, /process\.env\.NEXT_PUBLIC_SUPABASE_ANON_KEY/);
  assert.doesNotMatch(client, /sb_publishable_/);
  assert.doesNotMatch(client, /supabase\.co/);
});

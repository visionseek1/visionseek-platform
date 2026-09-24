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

test("brief replaces the insights routes", async () => {
  const config = await read("next.config.ts");
  assert.match(config, /source:\s*"\/insights"/);
  assert.match(config, /destination:\s*"\/brief"/);
  assert.match(config, /source:\s*"\/ar\/insights"/);
  assert.match(config, /destination:\s*"\/ar\/brief"/);
  assert.match(config, /source:\s*"\/insights\/:slug"/);
  assert.match(config, /destination:\s*"\/brief\/:slug"/);
  assert.match(config, /source:\s*"\/ar\/insights\/:slug"/);
  assert.match(config, /destination:\s*"\/ar\/brief\/:slug"/);

  assert.equal(await exists("app/brief/page.tsx"), true);
  assert.equal(await exists("app/ar/brief/page.tsx"), true);
  assert.equal(await exists("app/brief/[slug]/page.tsx"), true);
  assert.equal(await exists("app/ar/brief/[slug]/page.tsx"), true);
  assert.equal(await exists("app/insights/page.tsx"), false);
  assert.equal(await exists("app/ar/insights/page.tsx"), false);
  assert.equal(await exists("app/insights/physical-ai/page.tsx"), false);

  const home = await read("components/home-page.tsx");
  assert.match(home, /\/brief/);
  assert.doesNotMatch(home, /\/insights/);
  assert.match(home, /BRIEF/);
});

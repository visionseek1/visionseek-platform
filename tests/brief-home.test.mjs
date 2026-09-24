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

test("leaders house replaces insights and the temporary brief routes", async () => {
  const config = await read("next.config.ts");
  assert.match(config, /source:\s*"\/insights"/);
  assert.match(config, /destination:\s*"\/leaders"/);
  assert.match(config, /source:\s*"\/ar\/insights"/);
  assert.match(config, /destination:\s*"\/ar\/leaders"/);
  assert.match(config, /source:\s*"\/insights\/:slug"/);
  assert.match(config, /destination:\s*"\/leaders\/:slug"/);
  assert.match(config, /source:\s*"\/ar\/insights\/:slug"/);
  assert.match(config, /destination:\s*"\/ar\/leaders\/:slug"/);
  assert.match(config, /source:\s*"\/brief"/);
  assert.match(config, /source:\s*"\/brief\/:slug"/);
  assert.match(config, /source:\s*"\/ar\/brief"/);
  assert.match(config, /source:\s*"\/ar\/brief\/:slug"/);

  assert.equal(await exists("app/leaders/page.tsx"), true);
  assert.equal(await exists("app/ar/leaders/page.tsx"), true);
  assert.equal(await exists("app/leaders/[slug]/page.tsx"), true);
  assert.equal(await exists("app/ar/leaders/[slug]/page.tsx"), true);
  assert.equal(await exists("app/brief/page.tsx"), false);
  assert.equal(await exists("app/ar/brief/page.tsx"), false);
  assert.equal(await exists("app/insights/page.tsx"), false);
  assert.equal(await exists("app/ar/insights/page.tsx"), false);

  const home = await read("components/home-page.tsx");
  assert.match(home, /\/leaders/);
  assert.match(home, /Leaders House/);
  assert.match(home, /بيت القادة/);
  assert.doesNotMatch(home, /\/insights/);
  assert.doesNotMatch(home, /\/brief/);

  const feed = await read("components/brief-page.tsx");
  const subscribe = await read("components/brief-subscribe.tsx");
  assert.match(feed, /الأحدث/);
  assert.match(feed, /المحفوظات/);
  assert.match(feed, /عرض منشورات أقدم/);
  assert.match(subscribe, /محتوى تجريبي/);
  assert.match(subscribe, /لم يُحفظ البريد ولم يُرسَل شيء/);
  assert.doesNotMatch(feed, /Useful/);
  assert.doesNotMatch(feed, /قريبًا/);
  assert.doesNotMatch(feed, /leaders-bar/);
  assert.doesNotMatch(feed, /brief-grid/);
  assert.match(feed, /className="leaders-figure"/);
  assert.match(await read("components/brief-signal.tsx"), /leaders-article-photo/);
  assert.match(await read("components/report-page.tsx"), /leaders-article-photo/);
  const source = await read("lib/brief.ts");
  assert.match(source, /\/leaders-placeholder\.png/);
  assert.doesNotMatch(source, /visionseek-hero\.png/);
  assert.doesNotMatch(subscribe, /mailto:/);
});

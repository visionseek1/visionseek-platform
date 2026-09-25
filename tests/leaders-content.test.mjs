import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { seriesList } from "../lib/series-data.mjs";
import { signalDepth } from "../lib/signal-depth.mjs";
import { weeklyPicks, weeklyRule } from "../lib/weekly-picks.mjs";
import { safeSourceUrl } from "../lib/leaders-rules.mjs";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const publicFiles = [
  "components/brief-page.tsx",
  "components/brief-signal.tsx",
  "components/learn-mark.tsx",
  "lib/brief.ts",
  "lib/series-agentic.mjs",
  "lib/series-grid.mjs",
  "lib/series-drones.mjs",
  "lib/weekly-picks.mjs",
  "lib/signal-depth.mjs",
];

test("public pages do not talk about drafts or an unfinished handoff", async () => {
  for (const path of publicFiles) {
    const text = await read(path);
    assert.doesNotMatch(text, /Draft|مسودة/);
    assert.doesNotMatch(text, /\bowner\b/i);
    assert.doesNotMatch(text, /لصاحب المنصة|متروكة لصاحب/);
  }
});

test("every learn series has five complete parts and cited hosts are allowed", () => {
  assert.equal(seriesList.length, 3);
  for (const series of seriesList) {
    assert.equal(series.parts.length, 5);
    for (const part of series.parts) {
      const words = part.body.en.join(" ").trim().split(/\s+/).filter(Boolean);
      assert.ok(words.length >= 600 && words.length <= 900, `${part.slug} ${words.length}`);
      assert.ok(part.body.ar.join(" ").trim().length > 400, part.slug);
      assert.equal(part.questions.en.length, 3);
      assert.equal(part.questions.ar.length, 3);
      assert.ok(part.deeper.length >= 3 && part.deeper.length <= 6, part.slug);
      for (const link of part.deeper) {
        assert.equal(safeSourceUrl(link.href), link.href, link.href);
      }
    }
  }
});

test("the weekly card states a rule and five sourced picks", () => {
  assert.equal(weeklyPicks.length, 5);
  assert.match(weeklyRule.en, /seven days/);
  assert.doesNotMatch(weeklyRule.en, /newest/);
  const fields = new Set();
  for (const pick of weeklyPicks) {
    assert.ok(pick.why.en.length > 40);
    assert.ok(pick.why.ar.length > 40);
    fields.add(pick.slug);
  }
  assert.equal(fields.size, 5);
});

test("signal depth links stay on the allowlist", () => {
  for (const [slug, depth] of Object.entries(signalDepth)) {
    assert.equal(depth.questions.en.length, 3, slug);
    assert.equal(depth.questions.ar.length, 3, slug);
    for (const link of depth.deeper) {
      assert.equal(safeSourceUrl(link.href), link.href, link.href);
    }
  }
});

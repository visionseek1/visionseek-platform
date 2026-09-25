import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import insights from "../public/insights.json" with { type: "json" };
import { orderedCoverRows, primaryField, safeSourceUrl } from "../lib/leaders-rules.mjs";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("reuters stories render as links", () => {
  assert.equal(safeSourceUrl("https://www.reuters.com/world/example"), "https://www.reuters.com/world/example");
  assert.equal(safeSourceUrl("https://reuters.com/world/example"), "https://reuters.com/world/example");
  assert.equal(safeSourceUrl("https://example.com/world/example"), null);
  assert.equal(insights.items.length > 0, true);
  for (const item of insights.items) {
    assert.equal(safeSourceUrl(item.sourceUrl), item.sourceUrl);
  }
});

test("AI policy is not the chip lab, and the first eight cards do not repeat a cover", () => {
  assert.equal(primaryField("AI Policy + Economic Rebalancing"), null);
  assert.equal(primaryField("AI GOVERNANCE + STRATEGIC DIALOGUE"), null);
  assert.equal(primaryField("AI Infrastructure"), null);
  assert.equal(primaryField("Semiconductors + AI Supply Chains"), "chips");
  assert.equal(primaryField("AI Infrastructure + Data Center Governance"), "chips");
  assert.equal(primaryField("AI Infrastructure + Energy Planning"), "energy");
  assert.equal(primaryField("Agentic AI + Cybersecurity"), "robots");
  assert.equal(primaryField("Autonomous Systems + Aviation Infrastructure"), "drones");

  const rows = orderedCoverRows(insights.items);
  const china = rows.find((row) => row.slug === "china-ai-supply-demand-imbalance-policy-2026");
  assert.ok(china);
  assert.equal(china.fieldId, null);
  assert.doesNotMatch(china.image, /field-chips/);
  assert.doesNotMatch(china.image, /visionseek-hero/);

  const first = rows.slice(0, 8).map((row) => row.image);
  assert.equal(first.length, 8);
  for (let index = 1; index < first.length; index += 1) {
    assert.notEqual(first[index], first[index - 1]);
  }
});

test("the take box is not clipped through a line", async () => {
  const css = await read("app/globals.css");
  const take = css.match(/\.leaders-take\s*\{[^}]+\}/)?.[0] ?? "";
  const takeText = css.match(/\.leaders-take-text\s*\{[^}]+\}/)?.[0] ?? "";
  assert.match(take, /padding/);
  assert.doesNotMatch(take, /line-clamp/);
  assert.doesNotMatch(take, /overflow/);
  assert.doesNotMatch(take, /max-height/);
  assert.match(takeText, /line-height/);
  assert.doesNotMatch(takeText, /line-clamp/);
  assert.doesNotMatch(takeText, /overflow/);
  assert.doesNotMatch(takeText, /padding/);
  const feed = await read("components/brief-page.tsx");
  assert.match(feed, /leaders-take-text/);
});

test("post pages always offer a next item and related items", async () => {
  const signal = await read("components/brief-signal.tsx");
  const report = await read("components/report-page.tsx");
  const footer = await read("components/leaders-continue.tsx");
  assert.match(signal, /LeadersContinue/);
  assert.match(report, /LeadersContinue/);
  assert.match(footer, /className="leaders-next"/);
  assert.match(footer, /className="leaders-related"/);
  assert.match(footer, /التالي في المجال/);
  assert.match(footer, /مواد قريبة/);
});

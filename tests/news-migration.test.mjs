import assert from "node:assert/strict";
import {readdirSync, readFileSync} from "node:fs";
import {join} from "node:path";
import test from "node:test";

const dir = join(process.cwd(), "content/news");
const files = readdirSync(dir).filter(name => name.endsWith(".json")).map(name => JSON.parse(readFileSync(join(dir, name), "utf8")));
const bySlug = Object.fromEntries(files.map(entry => [entry.slug, entry]));
const ordered = [...files].sort((a, b) => a.position - b.position);

test("news files keep the seven published articles in their original order", () => {
  assert.deepEqual(ordered.map(entry => entry.slug), [
    "ksp-official-route",
    "virtual-hospital-not-enough",
    "egypt-health-in-numbers",
    "capability-before-solution",
    "program-manager-model",
    "learning-from-challenges",
    "ideas-before-programs",
  ]);
});

test("news status strings are unchanged", () => {
  const statuses = ordered.map(entry => `${entry.status.en}|${entry.status.ar}`);
  assert.deepEqual(statuses, [
    "Source-based analysis|تحليل مسند",
    "Source-based analysis|تحليل مسند",
    "Source-based analysis|تحليل مسند",
    "Editorial|محتوى تحريري",
    "Source-based analysis|تحليل مسند",
    "Source-based analysis|تحليل مسند",
    "Source-based analysis|تحليل مسند",
  ]);
});

test("news keeps sources, photographer credit, and image forms", () => {
  assert.equal(bySlug["ksp-official-route"].references.length, 5);
  assert.equal(bySlug["virtual-hospital-not-enough"].references.length, 10);
  assert.equal(bySlug["egypt-health-in-numbers"].references.length, 15);
  assert.equal(bySlug["egypt-health-in-numbers"].imageCredit.name, "Omar Elsharawy");
  assert.equal(bySlug["egypt-health-in-numbers"].image.startsWith("https://"), true);
  assert.equal(bySlug["ksp-official-route"].image, "cities");
  assert.equal(bySlug["program-manager-model"].source.url, "https://www.darpa.mil/careers/program-manager");
  assert.equal(bySlug["ksp-official-route"].title.ar, "خبرة كورية بلا فاتورة: الطريق الرسمي إلى برنامج KSP");
  assert.equal(bySlug["capability-before-solution"].related[0].href, "/method");
});

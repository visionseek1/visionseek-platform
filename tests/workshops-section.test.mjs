import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(".next/server/app");

async function pages(dir = root) {
  const all = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) all.push(...(await pages(full)));
    else if (entry.name.endsWith(".html")) all.push(full);
  }
  return all;
}

test("workshops section pages render the draft name and offer status", async () => {
  const html = new Map();
  for (const file of await pages()) {
    const rel = path.relative(root, file).replaceAll(path.sep, "/").replace(/\.html$/, "");
    html.set(rel === "index" ? "/" : `/${rel}`, await readFile(file, "utf8"));
  }

  const en = html.get("/workshops");
  const ar = html.get("/ar/workshops");
  assert.ok(en, "Missing built page /workshops");
  assert.ok(ar, "Missing built page /ar/workshops");
  assert.match(en, /Workshops/);
  assert.match(en, /In preparation/);
  assert.match(ar, /ورش بناء القدرة/);
  assert.match(ar, /قيد التحضير/);
});

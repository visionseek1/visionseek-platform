import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { JSDOM } from "jsdom";
import React, { act } from "react";
const dom = new JSDOM("<!doctype html><body></body>", { url: "https://room.test" });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true });
const { createRoot } = await import("react-dom/client");
const require = createRequire(import.meta.url), mod = { exports: {} };
const source = ts.transpileModule(readFileSync(new URL("../components/manage/integrations.tsx", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022 } }).outputText;
new Function("require", "module", "exports", source)(name => name === "./room.module.css" ? { __esModule: true, default: {} } : require(name), mod, mod.exports);
const Integrations = mod.exports.default;
const session = id => ({ user: { id }, access_token: id });
const payload = title => ({ handovers: [], sources: [{ key: "open", checkedAt: "2026-09-28T10:00:00Z", status: "stale", limited: true, items: [{ id: "pr-1", title, url: "https://github.com/visionseek1/visionseek-platform/pull/1", state: "draft", branch: "test", commit: "a".repeat(40), updatedAt: "2026-09-28T10:00:00Z" }] }] });
const tick = async action => act(async () => { action?.(); await new Promise(r => setImmediate(r)); });
async function mount(t, fetcher) {
  const oldFetch = globalThis.fetch;
  globalThis.fetch = fetcher;
  const container = document.createElement("div"); document.body.append(container);
  const root = createRoot(container);
  t.after(async () => { await act(async () => root.unmount()); container.remove(); globalThis.fetch = oldFetch; });
  return { root, container };
}
test("integration UI renders source failure and code status honestly; titles remain text", async t => {
  const { root, container } = await mount(t, async () => Response.json(payload("<img src=x onerror=alert(1)>")));
  await tick(() => root.render(React.createElement(Integrations, { session: session("A") })));
  assert.equal(container.querySelector("img"), null);
  assert.match(container.textContent, /<img src=x onerror=alert\(1\)>/);
  assert.match(container.textContent, /آخر قراءة محفوظة/);
  assert.match(container.textContent, /مسودة/);
  assert.match(container.textContent, /السجل الكامل/);
  assert.match(container.textContent, /المحادثات نفسها غير متصلة تلقائيًا/);
});
test("retired account response cannot replace current integration view and revoked access clears data", async t => {
  let resolveOld, denied = false;
  const old = new Promise(resolve => { resolveOld = resolve; });
  const { root, container } = await mount(t, async (_url, options) => options.headers.Authorization === "Bearer A" ? old : denied ? new Response("denied", { status: 403 }) : Response.json(payload("current account")));
  await tick(() => root.render(React.createElement(Integrations, { key: "A", session: session("A") })));
  await tick(() => root.render(React.createElement(Integrations, { key: "B", session: session("B") })));
  await tick(() => resolveOld(Response.json(payload("retired account"))));
  assert.match(container.textContent, /current account/);
  assert.doesNotMatch(container.textContent, /retired account/);
  denied = true;
  await tick(() => container.querySelector("button").click());
  assert.doesNotMatch(container.textContent, /current account/);
  assert.match(container.textContent, /صلاحية متابعة التكامل غير متاحة/);
});

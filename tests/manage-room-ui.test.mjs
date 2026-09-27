import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { JSDOM } from "jsdom";
import React, { act } from "react";
import { fixture, ids, input } from "./manage-fixture.mjs";
import { apiUrl } from "./manage-imports.mjs";
const { GET, POST } = await import(apiUrl);
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://room.test",
});
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  FormData: dom.window.FormData,
  IS_REACT_ACT_ENVIRONMENT: true,
});
const { createRoot } = await import("react-dom/client");
const require = createRequire(import.meta.url);
function compile(path, overrides = {}) {
  const output = ts.transpileModule(
    readFileSync(new URL(path, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  const mod = { exports: {} };
  new Function("require", "module", "exports", output)(
    (name) => (name in overrides ? overrides[name] : require(name)),
    mod,
    mod.exports,
  );
  return mod.exports;
}
let currentSession, authChange;
const client = {
  auth: {
    getSession: async () => ({ data: { session: currentSession } }),
    onAuthStateChange: (cb) => {
      authChange = cb;
      return { data: { subscription: { unsubscribe() {} } } };
    },
  },
};
const contract = compile("../lib/manage/contracts.ts");
const hook = compile("../components/manage/use-room.ts", {
  "@/lib/supabase-browser": { createSupabaseBrowserClient: () => client },
});
// Test real room/forms + hook + API + SQL. Dialog, Next navigation and images are
// simple DOM adapters; this is not a browser layout, focus or hosted-auth test.
const block = (tag) =>
  function TestElement({ children, ...props }) {
    return React.createElement(tag, props, children);
  };
const Room = compile("../components/manage/room.tsx", {
  "next/link": block("a"),
  "next/image": block("img"),
  "@/lib/manage/contracts": contract,
  "./use-room": hook,
  "./room.module.css": {
    __esModule: true,
    default: new Proxy({}, { get: (_, k) => String(k) }),
  },
  "@/components/ui/dialog": {
    Dialog: ({ open, children }) => (open ? children : null),
    DialogContent: (props) =>
      React.createElement("section", { ...props, role: "dialog" }),
    DialogTitle: block("h2"),
    DialogDescription: block("p"),
  },
}).default;
let container, root, dbApi, inFlight;
async function flush(action = () => {}) {
  await act(async () => {
    action();
    for (let i = 0; i < 5; i++) {
      await new Promise((r) => setImmediate(r));
      await Promise.allSettled([...inFlight]);
    }
  });
}
function button(text) {
  const b = [...container.querySelectorAll("button")].find(
    (b) =>
      b.textContent.trim() === text || b.getAttribute("aria-label") === text,
  );
  assert.ok(b, `button ${text}`);
  return b;
}
const click = (text) => flush(() => button(text).click());
async function field(name, value) {
  const e = container.querySelector(`[name="${name}"]`);
  assert.ok(e, `field ${name}`);
  await flush(() => {
    e.value = value;
    e.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
  });
}
const task = () => container.querySelector(".taskRow");
async function openTask() {
  assert.ok(task());
  await flush(() => task().click());
}
async function mount(t) {
  dbApi = await fixture();
  inFlight = new Set();
  const oldFetch = globalThis.fetch,
    oldUrl = process.env.NEXT_PUBLIC_SUPABASE_URL,
    oldKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://isolated.invalid";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "isolated-key";
  currentSession = { user: { id: ids.owner }, access_token: "owner" };
  globalThis.fetch = (i, options = {}) => {
    const promise = (async () => {
      if (i === "/api/manage") {
        const request = new Request("https://room.test/api/manage", options);
        return options.method === "POST" ? POST(request) : GET(request);
      }
      const req = new Request(i, options),
        path = new URL(req.url).pathname,
        name = req.headers.get("authorization")?.slice(7);
      if (path === "/auth/v1/user")
        return Response.json({
          id: ids[name],
          aud: "authenticated",
          role: "authenticated",
          is_anonymous: false,
        });
      await dbApi.actor(name);
      try {
        const body = await req.json();
        return Response.json(
          path.endsWith("manage_snapshot")
            ? await dbApi.snapshot()
            : await dbApi.command(body.payload, body.request_key),
        );
      } catch (e) {
        return Response.json(
          { code: e.code, message: e.message },
          { status: 400 },
        );
      }
    })();
    inFlight.add(promise);
    promise.finally(() => inFlight.delete(promise));
    return promise;
  };
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  t.after(async () => {
    await act(async () => root.unmount());
    container.remove();
    globalThis.fetch = oldFetch;
    if (oldUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = oldUrl;
    if (oldKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = oldKey;
    await dbApi.db.close();
  });
  await flush(() => root.render(React.createElement(Room, { view: "tasks" })));
}
async function create() {
  await click("مهمة جديدة");
  await field("title", "اختبار دورة الغرفة");
  await field("goal", "مخرج محفوظ");
  await field("acceptance", "دليل واضح");
  await click("حفظ التكليف");
  assert.equal(container.querySelector("[role=dialog]"), null);
}

test("room forms persist creation, versioned delivery, founder acceptance and reopening through real API/SQL", async (t) => {
  await mount(t);
  await create();
  assert.match(task().textContent, /اختبار دورة الغرفة/);
  await openTask();
  await click("تسليم مخرج");
  await field("summary", "المخرج التجريبي");
  await field("version", "v1");
  await field("workspace", "مساحة اختبار محلية");
  await field("evidence", "https://example.org/evidence");
  await click("إرسال للمراجعة");
  assert.equal(container.querySelector("[role=dialog]"), null);
  await openTask();
  await click("مراجعة واعتماد");
  await field("decision", "accepted");
  await field("note", "تمت مراجعة الدليل");
  await click("تسجيل القرار");
  await dbApi.actor("owner");
  let saved = await dbApi.snapshot();
  assert.equal(saved.tasks[0].state, "accepted");
  assert.equal(saved.reviews.length, 1);
  await openTask();
  await click("تحديث الحالة");
  await field("state", "queued");
  await field("note", "فتح نسخة لاحقة");
  await click("حفظ الحالة");
  await dbApi.actor("owner");
  saved = await dbApi.snapshot();
  assert.equal(saved.tasks[0].state, "queued");
  assert.equal(saved.tasks[0].current_deliverable_id, null);
  assert.equal(saved.deliverables.length, 1);
  assert.equal(saved.reviews.length, 1);
  assert.equal(saved.activity.length, 4);
  await click("تحديث البيانات");
  assert.match(task().textContent, /اختبار دورة الغرفة/);
  await flush(() =>
    root.render(React.createElement(Room, { view: "activity" })),
  );
  assert.match(container.textContent, /فتح نسخة لاحقة/);
});

test("stale edit preserves the local draft until the user explicitly adopts the newer revision", async (t) => {
  await mount(t);
  await create();
  await openTask();
  await click("تعديل التكليف");
  await field("title", "تعديلي المحلي");
  await dbApi.actor("owner");
  const saved = (await dbApi.snapshot()).tasks[0];
  const edit = {
    ...input("leaders", "owner"),
    type: "editTask",
    taskId: saved.id,
    revision: saved.revision,
    title: "تعديل مساحة أخرى",
  };
  delete edit.moduleId;
  await dbApi.command(edit);
  await click("حفظ التكليف");
  assert.equal(container.querySelector("[name=title]").value, "تعديلي المحلي");
  assert.match(
    container.querySelector(".conflict").textContent,
    /تعديل مساحة أخرى/,
  );
  assert.equal(button("حفظ التكليف").disabled, true);
  await click("استخدم النسخة الأحدث وابدأ التعديل منها");
  assert.equal(
    container.querySelector("[name=title]").value,
    "تعديل مساحة أخرى",
  );
  assert.equal(button("حفظ التكليف").disabled, false);
});

test("changing accounts clears the real room form and scoped private tasks", async (t) => {
  await mount(t);
  await create();
  await click("مهمة جديدة");
  await field("title", "نص خاص لم يُحفظ");
  await flush(() => {
    currentSession = { user: { id: ids.reports }, access_token: "reports" };
    authChange("SIGNED_IN", currentSession);
  });
  assert.equal(container.querySelector("[role=dialog]"), null);
  assert.doesNotMatch(
    container.textContent,
    /اختبار دورة الغرفة|نص خاص لم يُحفظ/,
  );
});

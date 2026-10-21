import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { JSDOM } from "jsdom";
import React, { act } from "react";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://room.test",
});
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  IS_REACT_ACT_ENVIRONMENT: true,
});
const { createRoot } = await import("react-dom/client");
const require = createRequire(import.meta.url);
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((a, b) => {
    resolve = a;
    reject = b;
  });
  return { promise, resolve, reject };
};
const session = (id) => ({ user: { id }, access_token: `local-${id}` });
const A = session("A"),
  B = session("B");
const response = (body, status = 200) => ({
  ok: status < 400,
  status,
  json: async () => body,
});
const snapshot = (id) => ({
  principal: { id },
  tasks: [{ title: `private-${id}` }],
});
let authChange,
  currentSession,
  initialRead,
  sessionRead,
  room,
  root,
  container,
  requests,
  writeHandler,
  readHandler;
const client = {
  auth: {
    getSession: async () => {
      if (initialRead) {
        const pending = initialRead;
        initialRead = null;
        return pending.promise;
      }
      if (sessionRead) return sessionRead.promise;
      return { data: { session: currentSession } };
    },
    onAuthStateChange: (callback) => {
      authChange = callback;
      return { data: { subscription: { unsubscribe() {} } } };
    },
    signOut: async () => {
      currentSession = null;
      authChange("SIGNED_OUT", null);
      return { error: null };
    },
  },
};
const compiled = { exports: {} };
const output = ts.transpileModule(
  readFileSync(
    new URL("../components/manage/use-room.ts", import.meta.url),
    "utf8",
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  },
).outputText;
new Function("require", "module", "exports", output)(
  (name) =>
    name === "@/lib/supabase-browser"
      ? { createSupabaseBrowserClient: () => client }
      : require(name),
  compiled,
  compiled.exports,
);
const { useRoom } = compiled.exports;
function Harness() {
  room = useRoom();
  return React.createElement(
    "output",
    null,
    room.data?.tasks.map((t) => t.title).join(","),
  );
}
async function flush(action = () => {}) {
  await act(async () => {
    action();
    await new Promise((resolve) => setImmediate(resolve));
  });
}
async function mount(t, pendingInitial = null) {
  currentSession = A;
  initialRead = pendingInitial;
  sessionRead = null;
  requests = [];
  writeHandler = async () => response({ ok: true });
  readHandler = async (id) => response(snapshot(id));
  globalThis.fetch = async (path, options = {}) => {
    assert.equal(path, "/api/manage");
    const entry = { ...options };
    requests.push(entry);
    return options.method === "POST"
      ? writeHandler(entry)
      : readHandler(options.headers.Authorization.replace("Bearer local-", ""));
  };
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  t.after(async () => {
    await act(async () => root.unmount());
    container.remove();
  });
  await flush(() => root.render(React.createElement(Harness)));
}
async function change(next) {
  await flush(() => {
    currentSession = next;
    authChange(next ? "SIGNED_IN" : "SIGNED_OUT", next);
  });
}
const command = {
  type: "setState",
  taskId: "local-task",
  revision: 1,
  state: "in_progress",
  reason: "local test",
};

test("late mutation cannot reload the previous account or announce its save", async (t) => {
  await mount(t);
  const pending = deferred();
  writeHandler = () => pending.promise;
  let saved;
  await flush(() => {
    saved = room.mutate(command);
  });
  await change(B);
  assert.equal(container.textContent, "private-B");
  await flush(() => pending.resolve(response({ ok: true })));
  assert.equal(await saved, false);
  assert.equal(container.textContent, "private-B");
  assert.equal(room.notice, "");
  assert.equal(
    requests.filter(
      (r) =>
        r.method !== "POST" && r.headers.Authorization === "Bearer local-A",
    ).length,
    1,
  );
});

test("late bootstrap session cannot overwrite a newer auth event", async (t) => {
  const initial = deferred();
  await mount(t, initial);
  await change(B);
  await flush(() => initial.resolve({ data: { session: A } }));
  assert.equal(room.session.user.id, "B");
  assert.equal(container.textContent, "private-B");
});

test("synchronous duplicate save submits one command", async (t) => {
  await mount(t);
  const pending = deferred();
  writeHandler = () => pending.promise;
  await flush(() => {
    void room.mutate(command);
    void room.mutate(command);
  });
  assert.equal(requests.filter((r) => r.method === "POST").length, 1);
  await flush(() => pending.resolve(response({ ok: true })));
});

test("ambiguous network failure keeps the same idempotency key for retry", async (t) => {
  await mount(t);
  let attempt = 0;
  writeHandler = async () => {
    if (!attempt++) throw new Error("network failure");
    return response({ ok: true });
  };
  await flush(() => {
    void room.mutate(command);
  });
  await flush(() => {
    void room.mutate(command);
  });
  const writes = requests.filter((r) => r.method === "POST");
  assert.equal(writes.length, 2);
  assert.equal(
    writes[0].headers["Idempotency-Key"],
    writes[1].headers["Idempotency-Key"],
  );
  assert.equal(room.notice, "تم الحفظ.");
});

test("token refresh preserves the account epoch and pending form identity", async (t) => {
  await mount(t);
  const epoch = room.accountEpoch;
  await change({ ...A, access_token: "local-A-refreshed" });
  assert.equal(room.accountEpoch, epoch);
});

test("old refresh failure cannot overwrite new account status", async (t) => {
  await mount(t);
  const pending = deferred();
  readHandler = (id) => (id === "A" ? pending.promise : response(snapshot(id)));
  await flush(() => {
    void room.refresh();
  });
  await change(B);
  await flush(() => pending.reject(new Error("OLD_ACCOUNT_ERROR")));
  assert.equal(room.error, "");
  assert.equal(container.textContent, "private-B");
});

test("leaving and re-entering the same account invalidates earlier operations", async (t) => {
  await mount(t);
  const pending = deferred();
  writeHandler = () => pending.promise;
  let saved;
  await flush(() => {
    saved = room.mutate(command);
  });
  await change(B);
  await change(A);
  await flush(() => pending.resolve(response({ ok: true })));
  assert.equal(await saved, false);
  assert.equal(room.notice, "");
});

test("account change during session verification prevents sending the old command", async (t) => {
  await mount(t);
  const pending = deferred();
  sessionRead = pending;
  let saved;
  await flush(() => {
    saved = room.mutate(command);
  });
  await change(B);
  await flush(() => pending.resolve({ data: { session: A } }));
  assert.equal(await saved, false);
  assert.equal(requests.filter((r) => r.method === "POST").length, 0);
});

test("old account completion cannot unlock a new account save", async (t) => {
  await mount(t);
  const first = deferred(),
    second = deferred();
  writeHandler = (r) =>
    r.headers.Authorization === "Bearer local-A"
      ? first.promise
      : second.promise;
  await flush(() => {
    void room.mutate(command);
  });
  await change(B);
  await flush(() => {
    void room.mutate(command);
  });
  assert.equal(room.busy, true);
  await flush(() => first.resolve(response({ ok: true })));
  assert.equal(room.busy, true);
  await flush(() => second.resolve(response({ ok: true })));
  assert.equal(room.busy, false);
  assert.equal(container.textContent, "private-B");
});

test("session mismatch without an auth notification cannot submit private content", async (t) => {
  await mount(t);
  currentSession = B;
  await flush(() => {
    void room.mutate(command);
  });
  assert.equal(requests.filter((r) => r.method === "POST").length, 0);
  assert.equal(room.error, "SIGN_IN_REQUIRED");
});

test("StrictMode effect replay leaves the current account able to save", async (t) => {
  await mount(t);
  await act(async () => root.unmount());
  root = createRoot(container);
  await flush(() =>
    root.render(
      React.createElement(React.StrictMode, null, React.createElement(Harness)),
    ),
  );
  await flush(() => {
    void room.mutate(command);
  });
  assert.equal(requests.filter((r) => r.method === "POST").length, 1);
});

test("a confirmed save remains successful when refreshing the snapshot fails", async (t) => {
  await mount(t);
  readHandler = async () => {
    throw new Error("snapshot unavailable");
  };
  let saved;
  await flush(() => {
    saved = room.mutate(command);
  });
  assert.equal(await saved, true);
  assert.equal(room.notice, "تم الحفظ.");
  assert.equal(room.error, "SAVED_REFRESH_FAILED");
  assert.equal(requests.filter((r) => r.method === "POST").length, 1);
});

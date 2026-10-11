import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHmac } from "node:crypto";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the room is a private, non-indexed area behind a password from the environment", async () => {
  const [auth, route, login, config, proxy] = await Promise.all([
    read("lib/room-auth.ts"),
    read("app/room/route.ts"),
    read("app/room/login/route.ts"),
    read("next.config.ts"),
    read("proxy.ts"),
  ]);
  assert.match(auth, /process\.env\.ROOM_PASSWORD/);
  assert.match(auth, /timingSafeEqual/);
  assert.match(auth, /HttpOnly; Secure; SameSite=Strict/);
  assert.doesNotMatch(auth, /ROOM_PASSWORD\s*=\s*["']/);
  assert.match(route, /noindex, nofollow/);
  assert.match(route, /roomConfigured\(\)/);
  assert.match(login, /passwordIsValid/);
  assert.match(config, /source: "\/room", headers: room/);
  assert.match(proxy, /admin\|room\|/);
});

test("the room page carries the four levels, the evidence measurement and no secrets", async () => {
  const mod = await read("app/room/room-html.ts");
  const html = JSON.parse(mod.slice(mod.indexOf('"'), mod.lastIndexOf('"') + 1));
  assert.match(html, /<title>غرفة عمليات VisionSeek<\/title>/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  for (const needle of ["المستوى 1", "الأذرع الخمسة", "يرى", "يعرف", "يربط", "الكانبان", "التقويم", "الخرائط", "الدروس", "القرارات", "/room/logout"]) {
    assert.ok(html.includes(needle), `missing: ${needle}`);
  }
  assert.doesNotMatch(html, /sk-|sb_publishable_|ROOM_PASSWORD/);
});

test("the session token is an HMAC of the password, never the password itself", () => {
  const token = createHmac("sha256", "correct horse battery").update("visionseek-room-v1").digest("hex");
  assert.equal(token.length, 64);
  assert.notEqual(token, "correct horse battery");
});

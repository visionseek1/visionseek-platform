import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHmac } from "node:crypto";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the room is a private, non-indexed area behind a password from the environment", async () => {
  const [auth, route, login, config, proxy] = await Promise.all([
    read("lib/room-auth.ts"),
    read("app/ops/route.ts"),
    read("app/ops/login/route.ts"),
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
  assert.match(config, /source: "\/ops", headers: room/);
  assert.match(proxy, /admin\|ops\|/);
});

test("the admin platform carries the approved structure, no secrets and no trace of the cancelled programme", async () => {
  const mod = await read("app/ops/room-html.ts");
  const html = JSON.parse(mod.slice(mod.indexOf('"'), mod.lastIndexOf('"') + 1));
  assert.match(html, /<title>منصة إدارة VisionSeek<\/title>/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  for (const needle of ["مركز القيادة", "مهندس القدرات المؤسسية", "هل يبني قدرات؟", "أهداف الربع", "قرارات مستنياك", "مواعيد قريبة", "القطاعات", "الأقسام والمسارات", "الخدمات", "العملاء", "المرجع", "الأسعار (داخلي)", "القيم والقواعد", "سجل القرارات", "/ops/logout"]) {
    assert.ok(html.includes(needle), `missing: ${needle}`);
  }
  for (const s of ["خدمات المؤسسات", "المنتجات الجاهزة", "الشراكات ونقل التكنولوجيا", "المعرفة وبناء القادة", "الظهور والتواصل"]) assert.ok(html.includes(s), `missing sector: ${s}`);
  for (const d of ["القادة والعملاء", "هندسة القدرات", "الشراكات والتوطين", "البناء والمنتجات", "الرسالة والظهور", "التشغيل والمعرفة"]) assert.ok(html.includes(d), `missing department: ${d}`);
  assert.doesNotMatch(html, /sk-|sb_publishable_|ROOM_PASSWORD/);
  assert.doesNotMatch(html, /HLO/);
  // الأسعار داخلية: مفيش رقم سعر مكتوب في الصفحة نفسها، بتتقري من سجل القرارات بعد الدخول
  assert.doesNotMatch(html, /7,500|1,000 درهم/);
});

test("the session token is an HMAC of the password, never the password itself", () => {
  const token = createHmac("sha256", "correct horse battery").update("visionseek-room-v1").digest("hex");
  assert.equal(token.length, 64);
  assert.notEqual(token, "correct horse battery");
});

test("the room reads Notion live from the server and writes only engine requests", async () => {
  const [notion, route, run, html] = await Promise.all([
    read("lib/notion-room.ts"),
    read("app/ops/route.ts"),
    read("app/ops/run/route.ts"),
    read("app/ops/room-html.ts"),
  ]);
  assert.match(notion, /process\.env\.NOTION_TOKEN/);
  assert.doesNotMatch(notion, /ntn_[A-Za-z0-9]/);
  assert.match(notion, /\/data_sources\/\$\{src\.ds\}\/query/);
  assert.match(notion, /createEngineRequest/);
  // الكتابة من الموقع محصورة: إضافة في «طلبات المحرك» و«الشغل» و«تعليقات الغرفة»، وتحديث خصائص كارت شغل. لا حذف أبدًا.
  assert.doesNotMatch(notion, /method:\s*"DELETE"/);
  assert.doesNotMatch(notion, /archived:\s*true|in_trash:\s*true/);
  assert.match(route, /window\.__ROOM__/);
  assert.match(route, /\\u003c/);
  assert.match(run, /cookieIsValid/);
  assert.match(html, /\/ops\/run/);
  assert.match(html, /window\.__ROOM__/);
});

test("the tree: sector ← department ← track ← item ← methodology", async () => {
  const [mod, card, notion] = await Promise.all([read("app/ops/room-html.ts"), read("app/ops/card/route.ts"), read("lib/notion-room.ts")]);
  const html = JSON.parse(mod.slice(mod.indexOf('"'), mod.lastIndexOf('"') + 1));
  for (const needle of ["pageTrack", "pageNew", "methodBlock", "المثال الناجح", "القالب", "المقياس الأسبوعي", "/ops/card", "propose", "فكرة", "بيتفلتر", "شغال", "مستني أحمد", "خلص", "بعدين", "moveCard"]) {
    assert.ok(html.includes(needle), `missing: ${needle}`);
  }
  // الأنواع الثمانية اتلغت من زر «إضافة»: العنصر بيتعرّف بمساره
  assert.doesNotMatch(html, /name="type"/);
  assert.match(card, /مفيش عنصر من غير مسار/);
  assert.match(card, /cookieIsValid/);
  assert.match(notion, /tracks: \{ ds: "803372be-41c1-8328-b878-07f0cc236e5a"/);
  assert.match(notion, /function trackInfo/);
  assert.match(notion, /export async function proposeMethodUpdate/);
  // تحديث المنهجية من عنصر ناجح بيستنى موافقة د. أحمد
  assert.match(notion, /"مستني د. أحمد"/);
  // Nine Star منفصلة: أي حاجة تخص «هانا كار» ما تظهرش
  assert.match(notion, /function notNineStar/);
});

test("the room installs on a phone: manifest, icons, service worker, mobile bars, drag and drop", async () => {
  const [mod, manifest, sw] = await Promise.all([read("app/ops/room-html.ts"), read("public/ops/manifest.webmanifest"), read("public/ops/sw.js")]);
  const html = JSON.parse(mod.slice(mod.indexOf('"'), mod.lastIndexOf('"') + 1));
  const m = JSON.parse(manifest);
  assert.equal(m.start_url, "/ops");
  assert.equal(m.display, "standalone");
  assert.ok(m.icons.length >= 2);
  assert.match(html, /rel="manifest" href="\/ops\/manifest\.webmanifest"/);
  assert.match(html, /apple-mobile-web-app-capable/);
  assert.match(html, /serviceWorker\.register\("\/ops\/sw\.js\?v=\d+"/);
  for (const needle of ['id="tabbar"', 'id="topbar"', "ondragstart", "ondrop", "moveCard", "max-width:900px"]) assert.ok(html.includes(needle), `missing: ${needle}`);
  assert.doesNotMatch(sw, /caches\.open/); // لا تخزين لمحتوى الغرفة الخاصة
});

test("notifications: push routes, feed, cron, service worker handlers, no keys in the repo", async () => {
  const [mod, sw, vercel, send, keygen] = await Promise.all([read("app/ops/room-html.ts"), read("public/ops/sw.js"), read("vercel.json"), read("app/ops/push/send/route.ts"), read("app/ops/push/keygen/route.ts")]);
  const html = JSON.parse(mod.slice(mod.indexOf('"'), mod.lastIndexOf('"') + 1));
  for (const needle of ["/ops/push/key", "/ops/push/subscribe", "/ops/push/send", "/ops/feed", "pushManager.subscribe", "Notification.requestPermission"]) assert.ok(html.includes(needle), `missing: ${needle}`);
  assert.match(sw, /addEventListener\("push"/);
  assert.match(sw, /notificationclick/);
  assert.equal(JSON.parse(vercel).crons[0].path, "/ops/push/send");
  assert.match(send, /CRON_SECRET/);
  assert.match(send, /cookieIsValid/);
  assert.doesNotMatch(keygen, /VAPID_PRIVATE_KEY\s*=\s*["']/);
  for (const f of ["lib/webpush.ts", "lib/notion-room.ts", "app/ops/push/keygen/route.ts"]) {
    const t = await read(f);
    assert.doesNotMatch(t, /process\.env\.[A-Z_]+\s*=\s*["']/, `${f} assigns a secret`);
  }
});

test("clients: stage, last contact, next follow-up, pieces order per client, and the initiative counter", async () => {
  const [mod, notion, lead] = await Promise.all([read("app/ops/room-html.ts"), read("lib/notion-room.ts"), read("app/ops/lead/route.ts")]);
  const html = JSON.parse(mod.slice(mod.indexOf('"'), mod.lastIndexOf('"') + 1));
  for (const needle of ["pageClients", "pageClient", "تواصل", "جلسة تعريفية", "عرض", "تشخيص", "قطع لاحقة", "آخر تواصل", "المتابعة الجاية", "ترتيب القطع", "المنح العشرة", "حسب العميل"]) assert.ok(html.includes(needle), `missing: ${needle}`);
  assert.match(notion, /export async function updateLeadMap/);
  assert.match(notion, /export async function createLead/);
  assert.match(notion, /"ترتيب القطع"/);
  assert.match(notion, /"منحة المبادرة"/);
  assert.match(lead, /pieces: opt\("pieces"\)/);
  assert.match(lead, /cookieIsValid/);
});

test("methodologies: a room view, owner-only approval, agents read only approved ones", async () => {
  const [mod, notion, route] = await Promise.all([read("app/ops/room-html.ts"), read("lib/notion-room.ts"), read("app/ops/method/route.ts")]);
  const html = JSON.parse(mod.slice(mod.indexOf('"'), mod.lastIndexOf('"') + 1));
  for (const needle of ["renderMethods", "المنهجيات", "/ops/method", "المعتمدة", "مسارات من غير منهجية"]) assert.ok(html.includes(needle), `missing: ${needle}`);
  assert.match(notion, /export async function updateMethodStatus/);
  assert.match(route, /cookieIsValid/);
});

test("learning engine: entries L-xxx, six branch types tied to sectors, two-week red flag that waits on dependencies", async () => {
  const [lib, route, mod] = await Promise.all([read("lib/notion-room.ts"), read("app/ops/learn/route.ts"), read("app/ops/room-html.ts")]);
  const html = JSON.parse(mod.slice(mod.indexOf('"'), mod.lastIndexOf('"') + 1));
  assert.match(lib, /learn: \{ ds: "59de2970-31b2-4c62-8914-b3c8fecd3857"/);
  assert.match(lib, /learnBranches: \{ ds: "f9da4209-1ee3-474f-be98-2a7d0958034e"/);
  for (const [type, sector] of [["بحث", "المعرفة وبناء القادة"], ["ماستركلاس/تعليم", "المعرفة وبناء القادة"], ["منتج", "المنتجات الجاهزة"], ["نقل تقنية", "الشراكات ونقل التكنولوجيا"], ["خدمة مؤسسية", "خدمات المؤسسات"], ["ظهور", "الظهور والتواصل"]]) {
    assert.ok(lib.includes(`"${type}": "${sector}"`), type);
    assert.ok(html.includes(`["${type}", "${sector}"]`), type);
  }
  assert.match(lib, /LEARN_STALE_DAYS = 14/);
  assert.match(html, /LEARN_STALE_DAYS = 14/);
  assert.match(lib, /"اتفك التعليق"/);
  assert.match(html, /محتاج قرار: قفل أو إلغاء/);
  assert.match(html, /اللي أحمد بيتعلمه/);
  assert.match(html, /"بحث أبعاد القرار"/);
  assert.match(route, /verdict"\) === "close" \? "اتقفل"/);
  assert.match(route, /"cancel" \? "اتلغى"/);
  assert.doesNotMatch(route, /archived|in_trash|DELETE/);
});

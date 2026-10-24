import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const intake = await import("../lib/lead-intake.ts");

const base = {
  name: "سارة",
  organization: "وزارة الصحة",
  email: "Sara@Example.com",
  need: "نحتاج تشخيص للقدرات",
  source: intake.SITE_SOURCES.start,
  date: "2026-10-16",
};

test("source mapping keeps the new site values and every old value", () => {
  assert.equal(intake.SITE_SOURCES.start, "الموقع — جلسة مجانية");
  assert.equal(intake.SITE_SOURCES.korean, "الموقع — حلول من كوريا");
  assert.equal(intake.SITE_SOURCES.box, "الموقع — VisionSeek Box");
  assert.equal(intake.SITE_SOURCES.booking, "الموقع — حجز");
  assert.deepEqual(intake.LEAD_SOURCES, [...intake.LEAD_SOURCES_NEW, ...intake.LEAD_SOURCES_LEGACY]);
  for (const source of ["الموقع", "الحجز", "الرادار", "تعارف", "لينكدإن", "ماستركلاس", "تواصل مباشر", "LinkedIn", "X", "Facebook", "Instagram", "TikTok"]) {
    assert.ok(intake.LEAD_SOURCES.includes(source), source);
  }
  assert.notEqual(intake.LEAD_SOURCES.includes("لينكدإن"), false);
  assert.ok(intake.LEAD_SOURCES.includes("LinkedIn"));
  assert.equal(intake.LEAD_SOURCES.filter((s) => s === "تواصل مباشر").length, 1);
});

test("a new email creates one plan with name, organization, email, need, source and date", () => {
  const plan = intake.planIntake(base, null, { requireEmail: true });
  assert.equal(plan.ok, true);
  assert.equal(plan.action, "create");
  assert.equal(plan.email, "sara@example.com");
  assert.equal(plan.title, "وزارة الصحة");
  assert.equal(plan.decider, "سارة");
  assert.equal(plan.source, "الموقع — جلسة مجانية");
  assert.match(plan.note, /^2026-10-16/);
  assert.match(plan.note, /المصدر: الموقع — جلسة مجانية/);
  assert.match(plan.note, /الاسم: سارة/);
  assert.match(plan.note, /الجهة: وزارة الصحة/);
  assert.match(plan.note, /البريد: sara@example.com/);
  assert.match(plan.note, /الاحتياج: نحتاج تشخيص للقدرات/);
});

test("an existing email appends the new request and does not plan a new row", () => {
  const first = intake.planIntake(base, null, { requireEmail: true });
  const again = intake.planIntake({
    ...base,
    need: "طلب تاني عن حلول من كوريا",
    source: intake.SITE_SOURCES.korean,
    date: "2026-10-17",
  }, { id: "abc", note: first.note }, { requireEmail: true });
  assert.equal(again.ok, true);
  assert.equal(again.action, "append");
  assert.match(again.note, /الاسم: سارة/);
  assert.match(again.note, /— طلب جديد/);
  assert.match(again.note, /2026-10-17 · الموقع — حلول من كوريا/);
  assert.match(again.note, /الاحتياج: طلب تاني عن حلول من كوريا/);
  assert.ok(again.note.indexOf("الاسم: سارة") < again.note.indexOf("— طلب جديد"));
  assert.equal(again.note.includes("وزارة الصحة\n\n— طلب جديد") || again.note.includes("وزارة الصحة"), true);
});

test("a long existing note keeps the new request at the end", () => {
  const plan = intake.planIntake(base, { id: "abc", note: "قديم ".repeat(800) }, { requireEmail: true });
  assert.equal(plan.ok, true);
  assert.equal(plan.action, "append");
  assert.ok(plan.note.length <= 1900);
  assert.match(plan.note, /2026-10-16 · الموقع — جلسة مجانية/);
  assert.match(plan.note, /الاحتياج: نحتاج تشخيص للقدرات$/);
});

test("dedupe needs a real email, and unknown sources are refused; old sources still pass", () => {
  assert.equal(intake.planIntake({ ...base, email: "not-an-email" }, null, { requireEmail: true }).error, "email");
  assert.equal(intake.planIntake({ ...base, email: "" }, null, { requireEmail: true }).error, "email");
  assert.equal(intake.planIntake({ ...base, source: "إعلان" }, null).error, "source");
  const legacy = intake.planIntake({ ...base, source: "الرادار", email: "" }, null);
  assert.equal(legacy.ok, true);
  assert.equal(legacy.action, "create");
  assert.equal(legacy.source, "الرادار");
  const manual = intake.planIntake({ organization: "جهة", source: "LinkedIn", date: "2026-10-16", need: "من رسالة" }, null);
  assert.equal(manual.ok, true);
  assert.equal(manual.title, "جهة");
  assert.equal(manual.email, "");
});

test("/start and Korean Solutions save through the server, with no message to the visitor", async () => {
  const [startApi, startPage, korean, room, notion] = await Promise.all([
    read("app/api/start/route.ts"),
    read("components/institution/start-page.tsx"),
    read("app/api/korean-solutions/request/route.ts"),
    read("lib/notion-room.ts"),
    read("lib/notion-room.ts"),
  ]);
  assert.match(startApi, /SITE_SOURCES\.start/);
  assert.match(startApi, /recordClientIntake\(/);
  assert.match(startApi, /requireEmail: true/);
  assert.match(startApi, /if \(isPreview\(\)\) return json\(\{ ok: true, preview: true \}\)/);
  assert.match(startApi, /validEmail\(email\)/);
  assert.match(startPage, /name="email"/);
  assert.match(startPage, /type="email"/);
  assert.match(startPage, /required/);
  assert.match(startPage, /بريدك الإلكتروني \(مطلوب\)/);
  assert.match(startPage, /Your email \(required\)/);
  assert.match(startPage, /\/api\/start/);
  assert.match(startPage, /whatsappUrl\(message\)/);
  assert.match(startPage, /mailto:\$\{site\.email\}/);
  assert.match(korean, /SITE_SOURCES\.korean/);
  assert.match(korean, /isPreview\(\)/);
  const fn = room.slice(room.indexOf("export async function recordClientIntake"), room.indexOf("سجل التواصل: صف لكل"));
  assert.match(fn, /if \(isPreview\(\)\) throw new Error\("preview"\)/);
  assert.match(fn, /findLeadByEmail/);
  assert.ok(fn.indexOf('return "appended"') < fn.indexOf("notifyNewClient"));
  assert.match(fn, /notifyNewClient\(plan\.title, plan\.source\)/);
  assert.match(notion, /title: "عميل جديد"/);
  for (const text of [startApi, startPage, korean, room]) {
    assert.doesNotMatch(text, /sendMail|nodemailer|resend|sendgrid|mailgun/i);
    assert.doesNotMatch(text, /NOTION_TOKEN\s*=\s*["']/);
    assert.doesNotMatch(text, /VAPID_(PUBLIC|PRIVATE)_KEY\s*=\s*["']/);
  }
});

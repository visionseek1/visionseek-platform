/**
 * استقبال العملاء في قاعدة «عملاء — خط المتابعة».
 * المنطق هنا خالص: مفيش شبكة ولا أسرار. الحفظ نفسه في lib/notion-room.ts.
 *
 * خانة «مصدر العميل» في Notion مش بتتحدّث من الكود.
 * الخيارات الجديدة لازم تتضاف في القاعدة نفسها قبل ما صف بمصدر جديد ينجح.
 */

/** القيم الجديدة. «تواصل مباشر» موجودة من قبل وكمان في القايمة دي. */
export const LEAD_SOURCES_NEW = [
  "الموقع — جلسة مجانية",
  "الموقع — حلول من كوريا",
  "الموقع — VisionSeek Box",
  "الموقع — حجز",
  "LinkedIn",
  "X",
  "Facebook",
  "Instagram",
  "TikTok",
  "تواصل مباشر",
] as const;

/** القيم القديمة. تفضل مقبولة عشان الكروت اللي اتسجّلت قبل كده، وتحويل الرادار. */
export const LEAD_SOURCES_LEGACY = ["الموقع", "الحجز", "الرادار", "تعارف", "لينكدإن", "ماستركلاس"] as const;

export const LEAD_SOURCES: string[] = [...LEAD_SOURCES_NEW, ...LEAD_SOURCES_LEGACY];

/** مصدر كل فورم على الموقع. السيرفر هو اللي بيحطه، مش الزائر. */
export const SITE_SOURCES = {
  start: "الموقع — جلسة مجانية",
  korean: "الموقع — حلول من كوريا",
  box: "الموقع — VisionSeek Box",
  booking: "الموقع — حجز",
} as const;

const NOTE_MAX = 1900;
const SOURCE_SET = new Set<string>(LEAD_SOURCES);

/** صيغة بريد معقولة، من غير مسافات، وبطول محدود. */
export function validEmail(v: string): boolean {
  return v.length >= 6 && v.length <= 254 && /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/.test(v);
}

/** تاريخ اليوم بتوقيت كوريا، زي باقي تواريخ المنصة. */
export function koreaDate(now = Date.now()): string {
  return new Date(now + 9 * 3600_000).toISOString().slice(0, 10);
}

export type IntakeFields = {
  name?: string;
  organization?: string;
  email?: string;
  need?: string;
  source?: string;
  date?: string;
  extra?: string;
};

export type ExistingLead = { id: string; note: string };

export type IntakePlan =
  | { ok: false; error: "email" | "source" | "date" | "title" }
  | {
      ok: true;
      action: "create" | "append";
      email: string;
      source: string;
      date: string;
      title: string;
      decider: string;
      need: string;
      note: string;
    };

const oneLine = (value: string | undefined, max: number) => (value || "").replace(/\s+/g, " ").trim().slice(0, max);
const blockText = (value: string | undefined, max: number) => (value || "").replace(/\r/g, "").trim().slice(0, max);

/** بلوك الطلب الجديد اللي يتضاف على ملاحظة عميل موجود: التاريخ والمصدر والاحتياج. */
export function requestBlock(date: string, source: string, need: string): string {
  const lines = ["— طلب جديد", `${date} · ${source}`];
  if (need) lines.push(`الاحتياج: ${need}`);
  return lines.join("\n");
}

/**
 * يلحق الطلب على الملاحظة القديمة. لو النص هيزيد عن حد Notion،
 * بيحتفظ بالطلب الجديد في الآخر ويشيل من أول الملاحظة القديمة.
 */
export function appendRequestNote(existing: string, date: string, source: string, need: string): string {
  const block = requestBlock(date, source, need);
  const prev = (existing || "").trim();
  const tail = block.length > NOTE_MAX ? block.slice(0, NOTE_MAX) : block;
  if (!prev) return tail;
  const joined = `${prev}\n\n${tail}`;
  if (joined.length <= NOTE_MAX) return joined;
  const marker = "\n…\n\n";
  const room = NOTE_MAX - tail.length - marker.length;
  if (room < 1) return tail;
  return `${prev.slice(0, room).trimEnd()}${marker}${tail}`.slice(0, NOTE_MAX);
}

/**
 * يقرر: صف جديد ولا إلحاق على عميل الإيميل موجود.
 * existing يتبعت بس لو الإيميل اتلاقى فعلًا. من غير إيميل مفيش منع تكرار.
 */
export function planIntake(input: IntakeFields, existing: ExistingLead | null, opts?: { requireEmail?: boolean }): IntakePlan {
  const source = oneLine(input.source, 80);
  const date = oneLine(input.date, 10);
  const email = oneLine(input.email, 254).toLowerCase();
  const name = oneLine(input.name, 200);
  const organization = oneLine(input.organization, 200);
  const need = blockText(input.need, 2000);
  const extra = blockText(input.extra, 800);
  if (!SOURCE_SET.has(source)) return { ok: false, error: "source" };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, error: "date" };
  if (opts?.requireEmail || email) {
    if (!validEmail(email)) return { ok: false, error: "email" };
  }
  const title = (organization || name || email).slice(0, 200);
  if (!title) return { ok: false, error: "title" };
  const decider = name;
  if (existing) {
    return { ok: true, action: "append", email, source, date, title, decider, need, note: appendRequestNote(existing.note, date, source, need) };
  }
  const lines = [
    date,
    `المصدر: ${source}`,
    name ? `الاسم: ${name}` : "",
    organization ? `الجهة: ${organization}` : "",
    email ? `البريد: ${email}` : "",
    need ? `الاحتياج: ${need}` : "",
    extra,
  ].filter(Boolean);
  return { ok: true, action: "create", email, source, date, title, decider, need, note: lines.join("\n").slice(0, NOTE_MAX) };
}

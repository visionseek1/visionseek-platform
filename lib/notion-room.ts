/**
 * غرفة العمليات تقرأ Notion حيًّا.
 * التوكن من متغير البيئة NOTION_TOKEN (سرّ في Vercel). بدون توكن: الغرفة تعرض اللقطة.
 * الموقع ما بينشئش صفوف في «طلبات المحرك» (زر «شغّل دورة» اتلغى). لا حذف من أي قاعدة.
 */

const API = "https://api.notion.com/v1";
const VERSION = "2025-09-03";

/** معرّفات مصادر البيانات (data sources) والقواعد تحت «غرفة العمليات — بيانات VisionSeek». */
export const SOURCES = {
  // اتنقلت 13 أكتوبر 2026 لـWorkspace «9star’s Space» (نسخة من «كلود — الشغل الجديد»، والأصل متساب في الحساب القديم).
  goals: { ds: "5c8372be-41c1-8237-8e2f-0762e5706517", db: "761372be41c182a7899e017f63a88bb7" },
  decisions: { ds: "a3d372be-41c1-832c-9efc-875a397a2777", db: "8bb372be41c18201a2f281d27ca85e05" },
  work: { ds: "92a372be-41c1-82aa-9270-87980bc5fcae", db: "190372be41c183b3b29b81213dae64fe" },
  publish: { ds: "e5b372be-41c1-82b3-9be4-076a99f58ff2", db: "070372be41c183d5952381d3c37c6d1f" },
  methods: { ds: "d16372be-41c1-8368-86a9-0742ea574882", db: "0c3372be41c18224bd0201c5cfb0246e" },
  requests: { ds: "a4f372be-41c1-8397-a947-079603c94fc9", db: "164372be41c183269ffa813d72d06567" },
  comments: { ds: "77c372be-41c1-82dd-aaf4-876b091f79cd", db: "2fa372be41c182eabf5201bca2bc89b0" },
  leads: { ds: "3c2372be-41c1-826d-bcfc-0701247fee53", db: "193372be41c18375a5a78114d3d70c5d" },
  // الشجرة (13 أكتوبر 2026): القطاع ← القسم ← المسار ← العنصر ← المنهجية. كل مسار تحت قسم، وبيشاور على منهجيته.
  tracks: { ds: "803372be-41c1-8328-b878-07f0cc236e5a", db: "2b5372be41c1827a982f812ee578375d" },
  // محرّك التعلم (15 أكتوبر 2026): اتشال من المنصة 16 أكتوبر (قرار د. أحمد). المدخلات والفروع فاضلة في Notion زي ما هي، والمنصة مبقتش تقراها.
  learn: { ds: "59de2970-31b2-4c62-8914-b3c8fecd3857", db: "9366ca1687004a0a8f24426bc1179f92" },
  learnBranches: { ds: "f9da4209-1ee3-474f-be98-2a7d0958034e", db: "a8dadabb9bd44f49a7784b550434513d" },
  // الأبحاث والنشر (16 أكتوبر 2026): صف لكل ورقة أو تقرير أو مقال في كل جهة نشر.
  research: { ds: "161b632e-cee3-4f48-a902-58cabe7f87f6", db: "c084a15a23694c6aa759b8c9ed560397" },
  // المسابقات (16 أكتوبر 2026): الاسم، الرابط، الحالة، الموعد (آخر يوم للتقديم).
  competitions: { ds: "dfb7c211-c54d-4d4c-9365-dcb6293d2541", db: "21c7b10bbd714d06a4fd90f964ee885f" },
  // حلول من كوريا (16 أكتوبر 2026): صف لكل منتج أو حل أو تكنولوجيا. الموقع بيعرض الصفوف اللي «ظاهر» عليها علامة بس.
  koreanSolutions: { ds: "d81a751a-06b2-4ab1-933e-a6aa0deab79d", db: "14a9fa5e616343649ec107b70b384a4f" },
  // النشرة الشهرية لـ VisionSeek Insights (15 أكتوبر 2026): بند في قطاع الظهور والتواصل. مفيش إرسال غير بموافقة د. أحمد.
  newsletter: { ds: "8a242351-eda5-4798-b5ba-4d80afbcd564", db: "01b11b86292b44b0958c47f45128dd4d" },
  // نظام العملاء — المرحلة 1 (15 أكتوبر 2026): سجل التواصل، صف لكل مكالمة أو إيميل أو جلسة، مربوط بالعميل. كتابة بس، مفيش إرسال.
  contacts: { ds: "24254214-19b8-406c-8c33-b516160da228", db: "a45aff37317442f880cf45cbd7a6ff66" },
} as const;

type Row = Record<string, string | string[] | null>;
export type LiveRoom = {
  at: string;
  decisions: Row[];
  work: Row[];
  publish: Row[];
  methods: Row[];
  goals: Row[];
  requests: Row[];
  comments: Row[];
  leads: Row[];
  tracks: Row[];
  research: Row[];
  competitions: Row[];
  solutions: Row[];
  newsletter: Row[];
  contacts: Row[];
  cycles: { title: string; url: string; edited: string }[];
};

export function notionConfigured(): boolean {
  const t = process.env.NOTION_TOKEN;
  return typeof t === "string" && t.length > 20;
}

async function call(path: string, body?: unknown, version = VERSION): Promise<Response> {
  return fetch(`${API}${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "notion-version": version,
      "content-type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function plain(prop: any): string | string[] | null {
  if (!prop) return null;
  switch (prop.type) {
    case "title":
    case "rich_text":
      return (prop[prop.type] || []).map((t: any) => t.plain_text).join("");
    case "select":
      return prop.select?.name ?? null;
    case "multi_select":
      return (prop.multi_select || []).map((o: any) => o.name);
    case "date":
      return prop.date?.start ?? null;
    case "url":
      return prop.url ?? null;
    case "number":
      return typeof prop.number === "number" ? String(prop.number) : null;
    case "checkbox":
      return prop.checkbox ? "__YES__" : "__NO__";
    case "relation":
      return (prop.relation || []).map((r: any) => r.id);
    default:
      return null;
  }
}

export function toRow(page: any): Row {
  const row: Row = { url: page.url ?? null, id: page.id ?? null, edited: page.last_edited_time ?? null, created: page.created_time ?? null };
  for (const [k, v] of Object.entries(page.properties || {})) row[k] = plain(v);
  return row;
}

async function query(src: { ds: string; db: string }): Promise<Row[]> {
  let res = await call(`/data_sources/${src.ds}/query`, { page_size: 100 });
  if (res.status === 404 || res.status === 400) {
    res = await call(`/databases/${src.db}/query`, { page_size: 100 }, "2022-06-28");
  }
  if (!res.ok) throw new Error(`notion ${res.status} on ${src.db}`);
  const json: any = await res.json();
  return (json.results || []).map(toRow);
}

async function cycles(): Promise<LiveRoom["cycles"]> {
  const res = await call("/search", {
    query: "الدورة",
    filter: { property: "object", value: "page" },
    sort: { direction: "descending", timestamp: "last_edited_time" },
    page_size: 30,
  });
  if (!res.ok) return [];
  const json: any = await res.json();
  const out: LiveRoom["cycles"] = [];
  for (const p of json.results || []) {
    const titleProp: any = Object.values(p.properties || {}).find((x: any) => x?.type === "title");
    const title = (titleProp?.title || []).map((t: any) => t.plain_text).join("");
    if (!/رادار الفرص|رادار القدرات|المعالج/.test(title)) continue;
    out.push({ title, url: p.url, edited: p.last_edited_time });
  }
  return out.slice(0, 12);
}

let cache: { at: number; data: LiveRoom } | null = null;

const NINE_STAR = /هانا ?كار|Hana ?Car/i;
function notNineStar(r: Row): boolean {
  for (const k of ["الكارت", "القرار", "الطلب", "عنوان الكارت", "التعليق"]) if (NINE_STAR.test(String(r[k] || ""))) return false;
  return true;
}
const TTL = 60_000;

/** يقرأ كل القواعد مرة واحدة ويحتفظ بها دقيقة. أي فشل في قاعدة = مصفوفة فاضية، لا تعطيل للصفحة. */
export async function readLiveRoom(): Promise<LiveRoom | null> {
  if (!notionConfigured()) return null;
  if (cache && Date.now() - cache.at < TTL) return cache.data;
  const safe = async <T,>(p: Promise<T>, fallback: T): Promise<T> => {
    try {
      return await p;
    } catch {
      return fallback;
    }
  };
  const [decisions0, work0, publish, methods, goals, requests0, comments0, leads, tracks, research, competitions, solutions, newsletter, contacts, cyc] = await Promise.all([
    safe(query(SOURCES.decisions), []),
    safe(query(SOURCES.work), []),
    safe(query(SOURCES.publish), []),
    safe(query(SOURCES.methods), []),
    safe(query(SOURCES.goals), []),
    safe(query(SOURCES.requests), []),
    safe(query(SOURCES.comments), []),
    safe(query(SOURCES.leads), []),
    safe(query(SOURCES.tracks), []),
    safe(query(SOURCES.research), []),
    safe(query(SOURCES.competitions), []),
    safe(query(SOURCES.koreanSolutions), []),
    safe(query(SOURCES.newsletter), []),
    safe(query(SOURCES.contacts), []),
    safe(cycles(), []),
  ]);
  // Nine Star مش جزء من VisionSeek: أي حاجة تخص «هانا كار» ما تظهرش في المنصة (قرار د. أحمد 13 أكتوبر).
  const decisions = decisions0.filter(notNineStar);
  const work = work0.filter(notNineStar);
  const requests = requests0.filter(notNineStar);
  const comments = comments0.filter(notNineStar);
  const data: LiveRoom = { at: new Date().toISOString(), decisions, work, publish, methods, goals, requests, comments, leads, tracks, research, competitions, solutions, newsletter, contacts, cycles: cyc.filter((c) => !NINE_STAR.test(c.title)) };
  // قاعدة آلية (1 من 3): طلب دورة «اتعمل» ← كارت «راجع الدورة» على د. أحمد، مرة واحدة لكل طلب.
  try {
    const titles = new Set(work.map((w) => String(w["الكارت"] || "")));
    for (const r of requests) {
      if (r["الحالة"] !== "اتعمل") continue;
      const t = `راجع: ${String(r["الطلب"] || "")}`;
      if (!t.trim() || titles.has(t)) continue;
      await createWorkCard({ title: t, type: "محرك", owner: "د. أحمد", due: "", desc: String(r["خلاصة النتيجة"] || ""), sec: "eng.radar-d", appetite: "ساعة", link: String(r["النتيجة"] || ""), track: "الوكلاء" }, tracks);
      titles.add(t);
    }
  } catch {
    /* القاعدة الآلية ما توقفش الصفحة */
  }
  cache = { at: Date.now(), data };
  return data;
}

/* ---------- المستوى 3.1: كروت وتعليقات (كتابة محصورة في «الشغل» و«تعليقات الغرفة»، بلا حذف) ---------- */

const OWNERS = new Set(["د. أحمد", "Claude", "Grok", "nimo"]);
const TYPES = new Set(["مشروع", "تسويق", "عميل", "محرك", "موقع"]);
// أعمدة اللوحة الجديدة: فكرة ← بيتفلتر ← شغال ← مستني أحمد ← خلص، و«بعدين» للمؤجل. القيم القديمة لسه مقبولة.
const STAGES = new Set(["فكرة", "بيتفلتر", "شغال", "مستني أحمد", "خلص", "بعدين", "مستني قرار", "مراجعة", "واقف"]);
const FILTER_ANSWERS = new Set(["نعم", "تأجيل"]);
const SECTORS = new Set(["خدمات المؤسسات", "المنتجات الجاهزة", "الشراكات ونقل التكنولوجيا", "المعرفة وبناء القادة", "الظهور والتواصل"]);
const DEPTS = new Set(["القادة والعملاء", "هندسة القدرات", "الشراكات والتوطين", "البناء والمنتجات", "الرسالة والظهور", "التشغيل والمعرفة"]);

/** يلاقي المسار في قاعدة «المسارات» باسمه، ويرجّع القسم وأول قطاع بيخدمه — العنصر بيورثهم. */
function trackInfo(tracks: Row[], name: string): { dept: string; sector: string } | null {
  const t = tracks.find((r) => String(r["المسار"] || "") === name);
  if (!t) return null;
  const sectors = Array.isArray(t["القطاعات"]) ? (t["القطاعات"] as string[]) : [];
  return { dept: String(t["القسم"] || ""), sector: sectors[0] || "" };
}
const rt = (v: string) => ({ rich_text: v ? [{ text: { content: v.slice(0, 1900) } }] : [] });
const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);
const isPageId = (v: string) => /^[0-9a-f]{32}$/.test(v.replace(/-/g, ""));

export type NewCard = { title: string; type: string; owner: string; due: string; desc: string; sec: string; appetite: string; link?: string; blockedBy?: string; milestone?: boolean; track?: string; goal?: string; filter?: string; next?: string };

/** عنصر جديد بيتعمل من جوه مساره: القطاع والقسم بيتورثوا من قاعدة «المسارات»، ومفيش عنصر من غير مسار. */
export async function createWorkCard(c: NewCard, knownTracks?: Row[]): Promise<string> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  const title = c.title.trim().slice(0, 200);
  if (!title) throw new Error("empty title");
  const properties: Record<string, unknown> = {
    "الكارت": { title: [{ text: { content: title } }] },
    "المرحلة": { select: { name: "فكرة" } },
    "المسؤول": { select: { name: OWNERS.has(c.owner) ? c.owner : "د. أحمد" } },
    "الوصف": rt(c.desc || ""),
    "القسم": rt(c.sec || ""),
    "الشهية": rt(c.appetite || ""),
    "مستني": rt(c.blockedBy || ""),
    "معلم": { checkbox: !!c.milestone },
  };
  // النوع اتلغى من زر «إضافة» (13 أكتوبر): العنصر بيتعرّف بمساره. بيتكتب بس لو جه من مكان قديم.
  if (c.type && TYPES.has(c.type)) properties["النوع"] = { select: { name: c.type } };
  if (c.track) {
    const tracks = knownTracks ?? (await query(SOURCES.tracks));
    const info = trackInfo(tracks, c.track);
    if (!info) throw new Error("unknown track");
    properties["المسار"] = { select: { name: c.track } };
    if (DEPTS.has(info.dept)) properties["القسم المنفّذ"] = { select: { name: info.dept } };
    if (SECTORS.has(info.sector)) properties["القطاع"] = { select: { name: info.sector } };
  }
  if (c.filter && FILTER_ANSWERS.has(c.filter)) {
    properties["يبني قدرات؟"] = { select: { name: c.filter } };
    if (c.filter === "تأجيل") properties["المرحلة"] = { select: { name: "بعدين" } };
  }
  if (c.goal && isPageId(c.goal)) properties["الهدف المرتبط"] = { relation: [{ id: c.goal }] };
  if (c.next) properties["الخطوة الجاية"] = rt(c.next);
  if (c.due && isDate(c.due)) properties["الموعد"] = { date: { start: c.due } };
  if (c.link) properties["رابط Notion"] = { url: c.link };
  let res = await call("/pages", { parent: { type: "data_source_id", data_source_id: SOURCES.work.ds }, properties });
  if (res.status === 400 || res.status === 404) res = await call("/pages", { parent: { database_id: SOURCES.work.db }, properties }, "2022-06-28");
  if (!res.ok) throw new Error(`notion ${res.status} creating card`);
  const json: any = await res.json();
  cache = null;
  return json.url as string;
}

/* ---------- نظام العملاء — المرحلة 1 (15 أكتوبر 2026): خط واحد بترتيب د. أحمد: جلسة، بعدها تشخيص، بعدها عرض ---------- */
/** خط المتابعة بالترتيب. «مغلق» في الآخر بنتيجتين. */
export const LEAD_PIPELINE = ["جديد", "جلسة تعريفية", "تشخيص", "عرض", "تعاقد", "تنفيذ"];
export const LEAD_CLOSED = ["مغلق — فاز", "مغلق — خسر"];
/** المراحل القديمة بتتقرى على الخط الجديد، من غير ما نمسح أي قيمة من Notion. */
const LEAD_LEGACY: Record<string, string> = { "تواصل": "جديد", "اتلقى": "جديد", "جاهز للتواصل": "جديد", "اتبعت له": "جديد", "رد": "جديد", "جلسة محجوزة": "جلسة تعريفية", "قطع لاحقة": "تنفيذ", "كسبنا": "مغلق — فاز", "اتقفل — مش دلوقتي": "مغلق — خسر" };
export function leadStageOf(raw: unknown): string {
  const s = String(raw || "");
  if (LEAD_PIPELINE.includes(s) || LEAD_CLOSED.includes(s)) return s;
  return LEAD_LEGACY[s] || "جديد";
}
export const leadOpen = (r: Row): boolean => !LEAD_CLOSED.includes(leadStageOf(r["المرحلة"]));
/** آخر تواصل مسجّل، وإلا آخر تعديل على الكارت. 14 يوم من غيرهم = علم أحمر. */
export function leadStale(r: Row, today: string): boolean {
  const last = String(r["آخر تواصل"] || r["date:آخر تواصل:start"] || r["edited"] || r["created"] || "").slice(0, 10);
  if (!last) return false;
  return Date.parse(today) - Date.parse(last) >= LEAD_STALE_DAYS * 86_400_000;
}
/** مراحل لوحة العملاء — تحريك الكارت من الغرفة محصور فيها (الجديدة + القديمة عشان أي كارت قديم يتحرك). */
const LEAD_STAGES = new Set([...LEAD_PIPELINE, ...LEAD_CLOSED, ...Object.keys(LEAD_LEGACY)]);
/** مصادر العميل السبعة. «تواصل مباشر» للعملاء اللي اتسجّلوا من إيميل مباشر (قرار د. أحمد 15 أكتوبر). */
export const LEAD_SOURCES = ["الموقع", "الحجز", "الرادار", "تعارف", "لينكدإن", "ماستركلاس", "تواصل مباشر"];
/** القطاع اللي العميل جاي منه — نفس أسماء قطاعات المنصة. */
export const LEAD_SECTORS = ["خدمات المؤسسات", "المنتجات الجاهزة", "الشراكات ونقل التكنولوجيا", "المعرفة وبناء القادة", "الظهور والتواصل"];
/** عميل مفتوح من غير أي تواصل 14 يوم = علم أحمر على اللوحة. */
export const LEAD_STALE_DAYS = 14;
/** قطع الخدمة الست — ترتيبها عند كل عميل بيتسجّل في «ترتيب القطع». */
export const PIECES = ["التشخيص", "خريطة القدرات", "التوريد والشراكة", "البناء والتجربة", "النقل والتوطين", "التسليم والتمكين"];

/** يحرّك كارت عميل لمرحلة تانية على اللوحة (قاعدة «عملاء — خط المتابعة»). لا حذف، ولا تعديل غير المرحلة والملاحظة والمتابعة وسبب الإغلاق. */
export async function updateLeadStage(pageId: string, stage: string, note?: string, followup?: string, reason?: string): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  if (!isPageId(pageId)) throw new Error("bad page id");
  if (!LEAD_STAGES.has(stage)) throw new Error("bad stage");
  const properties: Record<string, unknown> = { "المرحلة": { select: { name: stage } } };
  if (note !== undefined && note !== "") properties["ملاحظة"] = rt(note);
  if (followup !== undefined) properties["المتابعة الجاية"] = followup && isDate(followup) ? { date: { start: followup } } : { date: null };
  if (LEAD_CLOSED.includes(stage)) properties["سبب الإغلاق"] = rt((reason || "").slice(0, 500));
  const res = await fetch(`${API}/pages/${pageId}`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${process.env.NOTION_TOKEN}`, "notion-version": VERSION, "content-type": "application/json" },
    body: JSON.stringify({ properties }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`notion ${res.status} moving lead`);
  // سجل الحركة: سطر مؤرخ في جسم صفحة الجهة — التاريخ ما يتمسحش، يتضاف عليه
  try {
    const today = new Date().toISOString().slice(0, 10);
    await fetch(`${API}/blocks/${pageId}/children`, {
      method: "PATCH",
      headers: { authorization: `Bearer ${process.env.NOTION_TOKEN}`, "notion-version": VERSION, "content-type": "application/json" },
      body: JSON.stringify({ children: [{ type: "paragraph", paragraph: { rich_text: [{ text: { content: `— ${today}: اتنقل لـ«${stage}» (من الغرفة)${note ? " · " + note.slice(0, 200) : ""}` } }] } }] }),
      cache: "no-store",
    });
  } catch {
    /* السجل تحسين، مش شرط نجاح النقلة */
  }
  cache = null;
}

/* ---------- خريطة العملاء والخدمات (12 أكتوبر 2026): النوع · المكان · الخدمة · النتيجة المقفولة ---------- */
const CLIENT_TYPES = new Set(["C1 ناشئة", "C2 كبيرة وعائلية", "C3 جامعات", "C4 هيئات"]);
const CLIENT_PLACES = new Set(["مصر", "السعودية", "الإمارات", "قطر", "باقي الخليج", "تانية"]);
const CLIENT_SERVICES = new Set(["S1 جلسة القائد", "S2 ورشة القيادات", "S3 تشخيص القدرات", "S4 بناء القدرة", "S5 مصممة مسبقًا"]);
const LOCKED_OUTCOMES = new Set(["اتبعت", "رد", "مكالمة", "جلسة", "دفع"]);

export type LeadMap = { type?: string; place?: string; service?: string; outcome?: string; followup?: string; signal?: string; signalUrl?: string; value?: string; reason?: string; forecast?: string; track?: string; pieces?: string; grant?: string; source?: string; sector?: string; next?: string; email?: string; lastContact?: string };
const LEAD_SOURCE_SET = new Set(LEAD_SOURCES);
const LEAD_SECTOR_SET = new Set(LEAD_SECTORS);
const LEAD_TRACKS = new Set(["عالي — نكلمهم دلوقتي", "متوسط — نسخّنهم الأول", "بدري — المراقبة"]);
const score10 = (v: string | undefined) => { if (v === undefined) return undefined; if (v === "") return { number: null }; const n = Number(v); if (!Number.isInteger(n) || n < 0 || n > 10) throw new Error("bad forecast"); return { number: n }; };
const CLOSE_REASONS = new Set(["مش دلوقتي", "الميزانية", "مش صاحب القرار", "ما ردّش", "اختار حل تاني", "تانية"]);
const num = (v: string | undefined) => { if (v === undefined) return undefined; if (v === "") return { number: null }; const n = Number(v.replace(/[,،\s]/g, "")); if (!Number.isFinite(n) || n < 0 || n > 1e9) throw new Error("bad number"); return { number: n }; };

/** يحدّث خانات الخريطة في كارت عميل. قيم محصورة في الخيارات المعتمدة؛ الفاضي يمسح الخانة. لا حذف للكارت ولا لمس لأي خانة تانية. */
export async function updateLeadMap(pageId: string, m: LeadMap): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  if (!isPageId(pageId)) throw new Error("bad page id");
  const sel = (v: string | undefined, allowed: Set<string>) => {
    if (v === undefined) return undefined;
    if (v === "") return { select: null };
    if (!allowed.has(v)) throw new Error("bad option");
    return { select: { name: v } };
  };
  const properties: Record<string, unknown> = {};
  const put = (k: string, v: unknown) => { if (v !== undefined) properties[k] = v; };
  put("نوع العميل", sel(m.type, CLIENT_TYPES));
  put("البلد", sel(m.place, CLIENT_PLACES));
  put("الخدمة", sel(m.service, CLIENT_SERVICES));
  put("النتيجة المقفولة", sel(m.outcome, LOCKED_OUTCOMES));
  put("سبب الإقفال", sel(m.reason, CLOSE_REASONS));
  put("القيمة (درهم)", num(m.value));
  put("التوقع", score10(m.forecast));
  put("المسار", sel(m.track, LEAD_TRACKS));
  put("مصدر العميل", sel(m.source, LEAD_SOURCE_SET));
  put("القطاع", sel(m.sector, LEAD_SECTOR_SET));
  if (m.followup !== undefined) properties["المتابعة الجاية"] = m.followup && isDate(m.followup) ? { date: { start: m.followup } } : { date: null };
  if (m.lastContact !== undefined) properties["آخر تواصل"] = m.lastContact && isDate(m.lastContact) ? { date: { start: m.lastContact } } : { date: null };
  if (m.next !== undefined) properties["الخطوة الجاية"] = rt(m.next.slice(0, 500));
  if (m.email !== undefined) {
    const e = m.email.trim().toLowerCase();
    if (e && !validEmail(e)) throw new Error("bad email");
    properties["الإيميل"] = { email: e || null };
  }
  if (m.signal !== undefined) properties["الإشارة"] = rt(m.signal);
  if (m.pieces !== undefined) {
    const list = m.pieces.split("←").map((x) => x.trim()).filter(Boolean);
    if (list.some((x) => !PIECES.includes(x)) || new Set(list).size !== list.length) throw new Error("bad pieces");
    properties["ترتيب القطع"] = rt(list.join(" ← "));
  }
  if (m.grant !== undefined) properties["منحة المبادرة"] = { checkbox: m.grant === "1" };
  if (m.signalUrl !== undefined) {
    if (m.signalUrl && !/^https:\/\/\S+$/.test(m.signalUrl)) throw new Error("bad url");
    properties["مصدر الإشارة"] = { url: m.signalUrl || null };
  }
  if (!Object.keys(properties).length) return;
  const res = await fetch(`${API}/pages/${pageId}`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${process.env.NOTION_TOKEN}`, "notion-version": VERSION, "content-type": "application/json" },
    body: JSON.stringify({ properties }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`notion ${res.status} updating lead map`);
  cache = null;
}

const LEAD_RECORDERS = new Set(["د. أحمد", "Claude", "nimo"]);

export type NewLead = LeadMap & { name: string; stage?: string; decider?: string; note?: string; by?: string };

/** يضيف جهة جديدة على لوحة العملاء (قاعدة «عملاء — خط المتابعة») بخانات الخريطة. إضافة فقط. المصدر مطلوب ولا يُفترض؛ اللي جاي من الموقع نفسه مصدره «الموقع». */
export async function createLead(l: NewLead): Promise<string> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  const name = (l.name || "").trim().slice(0, 200);
  if (!name) throw new Error("empty name");
  const stage = l.stage && LEAD_STAGES.has(l.stage) ? l.stage : "جديد";
  const by = l.by && LEAD_RECORDERS.has(l.by) ? l.by : "د. أحمد";
  // المصدر مطلوب (مراجعة nimo 15 أكتوبر): مفيش مصدر افتراضي. اللي جاي من الموقع نفسه بس ياخد «الموقع».
  if (l.source && !LEAD_SOURCE_SET.has(l.source)) throw new Error("bad source");
  const source = l.source || (by === "الموقع" ? "الموقع" : "");
  if (!source) throw new Error("source required");
  const properties: Record<string, unknown> = {
    "الجهة": { title: [{ text: { content: name } }] },
    "المرحلة": { select: { name: stage } },
    "سجّلها": { select: { name: by } },
    "مصدر العميل": { select: { name: source } },
  };
  const opt = (k: string, v: string | undefined, allowed: Set<string>) => { if (v && allowed.has(v)) properties[k] = { select: { name: v } }; };
  opt("نوع العميل", l.type, CLIENT_TYPES);
  opt("البلد", l.place, CLIENT_PLACES);
  opt("الخدمة", l.service, CLIENT_SERVICES);
  opt("النتيجة المقفولة", l.outcome, LOCKED_OUTCOMES);
  opt("القطاع", l.sector, LEAD_SECTOR_SET);
  if (l.next) properties["الخطوة الجاية"] = rt(l.next.slice(0, 500));
  if (l.email) { const e = l.email.trim().toLowerCase(); if (validEmail(e)) properties["الإيميل"] = { email: e }; }
  if (l.lastContact && isDate(l.lastContact)) properties["آخر تواصل"] = { date: { start: l.lastContact } };
  if (l.value) { const v = num(l.value); if (v) properties["القيمة (درهم)"] = v; }
  if (l.forecast) { const v = score10(l.forecast); if (v) properties["التوقع"] = v; }
  if (l.track && LEAD_TRACKS.has(l.track)) properties["المسار"] = { select: { name: l.track } };
  if (l.followup && isDate(l.followup)) properties["المتابعة الجاية"] = { date: { start: l.followup } };
  if (l.decider) properties["صاحب القرار"] = rt(l.decider.slice(0, 200));
  if (l.note) properties["ملاحظة"] = rt(l.note);
  if (l.signal) properties["الإشارة"] = rt(l.signal);
  if (l.signalUrl && /^https:\/\/\S+$/.test(l.signalUrl)) properties["مصدر الإشارة"] = { url: l.signalUrl };
  let res = await call("/pages", { parent: { type: "data_source_id", data_source_id: SOURCES.leads.ds }, properties });
  if (res.status === 400 || res.status === 404) res = await call("/pages", { parent: { database_id: SOURCES.leads.db }, properties }, "2022-06-28");
  if (!res.ok) throw new Error(`notion ${res.status} creating lead`);
  const json: any = await res.json();
  cache = null;
  return json.url as string;
}

/* ---------- سجل التواصل: صف لكل مكالمة أو إيميل أو جلسة. كتابة بس — مفيش إرسال لأي عميل من المنصة (قاعدة د. أحمد). ---------- */
export const CONTACT_CHANNELS = ["إيميل", "مكالمة", "واتساب", "جلسة", "لقاء", "لينكدإن", "الموقع", "تانية"];
export const CONTACT_DIRECTIONS = ["وارد", "صادر", "ملاحظة"];
export type NewContact = { lead: string; channel: string; direction: string; summary: string; details?: string; by?: string; date?: string; next?: string; followup?: string };

/** يسجّل تواصل على عميل، ويحدّث «آخر تواصل» على كارت العميل (والخطوة الجاية وموعدها لو اتبعتوا). يرجّع معرّف الصف. */
export async function addContact(c: NewContact): Promise<string> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  if (!isPageId(c.lead)) throw new Error("bad lead");
  const summary = (c.summary || "").trim().slice(0, 300);
  if (!summary) throw new Error("empty summary");
  if (!CONTACT_CHANNELS.includes(c.channel)) throw new Error("bad channel");
  if (!CONTACT_DIRECTIONS.includes(c.direction)) throw new Error("bad direction");
  const date = c.date && isDate(c.date) ? c.date : todayStr();
  const json = await createIn(SOURCES.contacts, {
    "الملخص": { title: [{ text: { content: summary } }] },
    "العميل": { relation: [{ id: c.lead }] },
    "التاريخ": { date: { start: date } },
    "القناة": { select: { name: c.channel } },
    "الاتجاه": { select: { name: c.direction } },
    "كتبها": { select: { name: c.by && LEAD_RECORDERS.has(c.by) ? c.by : "د. أحمد" } },
    "التفاصيل": rt((c.details || "").slice(0, 1900)),
  });
  const patch: Record<string, unknown> = { "آخر تواصل": { date: { start: date } } };
  if (c.next !== undefined && c.next !== "") patch["الخطوة الجاية"] = rt(c.next.slice(0, 500));
  if (c.followup && isDate(c.followup)) patch["المتابعة الجاية"] = { date: { start: c.followup } };
  try {
    await patchPage(c.lead, patch);
  } catch {
    /* الصف اتسجّل؛ تحديث الكارت تحسين */
  }
  cache = null;
  return String(json.id || "");
}

/* ---------- المنهجيات: د. أحمد بس اللي يعتمد أو يوقّف (من الغرفة بكلمة السر). النص نفسه بيتعدّل في Notion. ---------- */
const METHOD_STATUSES = new Set(["مسودة", "معتمدة", "متوقفة"]);
export async function updateMethodStatus(pageId: string, status: string): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  if (!isPageId(pageId)) throw new Error("bad page id");
  if (!METHOD_STATUSES.has(status)) throw new Error("bad status");
  const today = new Date().toISOString().slice(0, 10);
  const properties: Record<string, unknown> = { "الحالة": { select: { name: status } }, "آخر تحديث": { date: { start: today } } };
  if (status === "معتمدة") {
    properties["اعتمدها"] = { select: { name: "د. أحمد" } };
    properties["اتعتمدت يوم"] = { date: { start: today } };
  }
  const res = await fetch(`${API}/pages/${pageId}`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${process.env.NOTION_TOKEN}`, "notion-version": VERSION, "content-type": "application/json" },
    body: JSON.stringify({ properties }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`notion ${res.status} updating method`);
  cache = null;
}

/* ---------- تقرير الصباح: ملخص يومي بالكود — صفر توكنز ---------- */

const BRIEF_LOG_PAGE = "8c6372be41c182638ff381efaeb7030b";

/** يبني تقرير الصباح من البيانات الحية. weekly=true (الخميس) يضيف أرقام اللوحة ودورات الأسبوع. */
export function buildBrief(live: LiveRoom, weekly: boolean, today: string): { title: string; body: string } {
  const lines: string[] = [];
  const day = (iso: unknown) => String(iso || "").slice(0, 10);
  const follow = live.leads.filter((r) => {
    const f = day(r["date:المتابعة الجاية:start"] || r["المتابعة الجاية"]);
    return f && f <= today && leadOpen(r);
  });
  if (follow.length) lines.push(`⏰ متابعات النهارده: ${follow.map((r) => r["الجهة"]).join("، ")}`);
  const stale = live.leads.filter((r) => leadOpen(r) && leadStale(r, today));
  if (stale.length) lines.push(`🚩 من غير تواصل ${LEAD_STALE_DAYS} يوم: ${stale.slice(0, 5).map((r) => r["الجهة"]).join("، ")}${stale.length > 5 ? ` +${stale.length - 5}` : ""}`);
  const openCycles = live.requests.filter((r) => r["الحالة"] === "اتعمل" && r["الإقفال"] === "مفتوحة");
  if (openCycles.length) lines.push(`🔄 دورات مفتوحة بلا بناء: ${openCycles.length}`);
  const waiting = live.requests.filter((r) => r["الحالة"] === "جديد" || r["الحالة"] === "شغال");
  if (waiting.length) lines.push(`⚙️ في الماكينة: ${waiting.length} طلب`);
  const decNeed = live.decisions.filter((r) => r["الحالة"] === "مستني د. أحمد");
  if (decNeed.length) lines.push(`⚖️ قرارات مستنياك: ${decNeed.map((r) => String(r["القرار"] || "").split(":")[0]).slice(0, 3).join("، ")}${decNeed.length > 3 ? ` +${decNeed.length - 3}` : ""}`);
  const pubDue = live.publish.filter((r) => r["الحالة"] === "معتمد" && day(r["date:موعد النشر:start"] || r["موعد النشر"]) && day(r["date:موعد النشر:start"] || r["موعد النشر"]) <= today);
  if (pubDue.length) lines.push(`📣 معتمد ومستني نشرك: ${pubDue.map((r) => r["العنوان"]).join("، ")}`);
  if (weekly) {
    const counts = LEAD_PIPELINE.map((s) => `${s} ${live.leads.filter((r) => leadStageOf(r["المرحلة"]) === s).length}`).join(" · ");
    lines.push(`📊 اللوحة: ${counts}`);
    const weekAgo = new Date(new Date(today + "T00:00:00Z").getTime() - 7 * 864e5).toISOString().slice(0, 10);
    const cyc = live.requests.filter((r) => r["الحالة"] === "اتعمل" && day(r["date:اتعمل يوم:start"] || r["اتعمل يوم"]) >= weekAgo);
    lines.push(`🛰️ دورات الأسبوع: ${cyc.length}${cyc.length ? " — " + cyc.map((r) => r["المحرك"]).join("، ") : ""}`);
  }
  // كاشف التعطل الصامت: طلب واقف على «شغال» أكتر من ساعتين = التشغيلة غالبًا فشلت
  const twoHoursAgo = new Date(Date.now() - 2 * 3600 * 1000).toISOString();
  const stuck = live.requests.filter((r) => r["الحالة"] === "شغال" && String(r.edited || "") < twoHoursAgo);
  if (stuck.length) lines.push(`⚠️ تشغيلة معلقة (شغال من +ساعتين): ${stuck.map((r) => r["الطلب"]).join("، ")}`);
  // بكرة عليك: اعرف الليلة إيه اللي مستنيك الصبح
  const tom = new Date(new Date(today + "T00:00:00Z").getTime() + 864e5).toISOString().slice(0, 10);
  const followTom = live.leads.filter((r) => day(r["date:المتابعة الجاية:start"] || r["المتابعة الجاية"]) === tom && leadOpen(r));
  const pubTom = live.publish.filter((r) => r["الحالة"] === "معتمد" && day(r["date:موعد النشر:start"] || r["موعد النشر"]) === tom);
  if (followTom.length || pubTom.length) lines.push(`🌙 بكرة عليك: ${[...followTom.map((r) => "متابعة " + r["الجهة"]), ...pubTom.map((r) => "نشر «" + r["العنوان"] + "»")].join("، ")}`);
  if (!lines.length) lines.push("✓ مفيش حاجة مستنياك النهارده — المنصة مقفولة.");
  return { title: weekly ? "نبض الأسبوع — الخميس" : "تقرير الصباح", body: lines.join("\n") };
}

/** يسجّل التقرير في صفحة «تقرير الصباح — سجل» (الأحدث فوق). */
export async function logBrief(title: string, body: string, today: string): Promise<void> {
  await fetch(`${API}/blocks/${BRIEF_LOG_PAGE}/children`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${process.env.NOTION_TOKEN}`, "notion-version": VERSION, "content-type": "application/json" },
    body: JSON.stringify({ children: [{ type: "paragraph", paragraph: { rich_text: [{ text: { content: `☀️ ${today} — ${title}\n${body}`.slice(0, 1900) } }] } }] }),
    cache: "no-store",
  });
}

export type CardPatch = { stage?: string; owner?: string; due?: string; steps?: string; blockedBy?: string; milestone?: boolean; next?: string; sec?: string; goal?: string; filter?: string };

export async function updateWorkCard(pageId: string, p: CardPatch): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  if (!isPageId(pageId)) throw new Error("bad page id");
  const properties: Record<string, unknown> = {};
  if (p.stage && STAGES.has(p.stage)) properties["المرحلة"] = { select: { name: p.stage } };
  if (p.owner && OWNERS.has(p.owner)) properties["المسؤول"] = { select: { name: p.owner } };
  if (p.due !== undefined) properties["الموعد"] = p.due && isDate(p.due) ? { date: { start: p.due } } : { date: null };
  if (p.steps !== undefined) properties["الخطوات"] = rt(p.steps);
  if (p.blockedBy !== undefined) properties["مستني"] = rt(p.blockedBy);
  if (p.next !== undefined) properties["الخطوة الجاية"] = rt(p.next);
  if (p.milestone !== undefined) properties["معلم"] = { checkbox: !!p.milestone };
  if (p.sec && /^[a-z]+\.[a-z-]+$/.test(p.sec)) properties["القسم"] = rt(p.sec);
  if (p.goal !== undefined) properties["الهدف المرتبط"] = { relation: p.goal && isPageId(p.goal) ? [{ id: p.goal }] : [] };
  if (p.filter !== undefined && (p.filter === "" || FILTER_ANSWERS.has(p.filter))) {
    properties["يبني قدرات؟"] = p.filter ? { select: { name: p.filter } } : { select: null };
    if (p.filter === "تأجيل") properties["المرحلة"] = { select: { name: "بعدين" } };
  }
  if (!Object.keys(properties).length) return;
  const res = await fetch(`${API}/pages/${pageId}`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${process.env.NOTION_TOKEN}`, "notion-version": VERSION, "content-type": "application/json" },
    body: JSON.stringify({ properties }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`notion ${res.status} updating card`);
  cache = null;
}

export async function addComment(cardId: string, cardTitle: string, text: string): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  const t = text.trim().slice(0, 1900);
  if (!t) throw new Error("empty comment");
  const properties = {
    "التعليق": { title: [{ text: { content: t } }] },
    "الكارت": rt(isPageId(cardId) ? cardId : ""),
    "عنوان الكارت": rt(cardTitle.slice(0, 200)),
    "مين": { select: { name: "د. أحمد" } },
    "يوم": { date: { start: new Date().toISOString().slice(0, 10) } },
  };
  let res = await call("/pages", { parent: { type: "data_source_id", data_source_id: SOURCES.comments.ds }, properties });
  if (res.status === 400 || res.status === 404) res = await call("/pages", { parent: { database_id: SOURCES.comments.db }, properties }, "2022-06-28");
  if (!res.ok) throw new Error(`notion ${res.status} adding comment`);
  cache = null;
}

/* ---------- الإشعارات: اشتراكات Web Push + سجل الإرسال (قاعدة «إشعارات الغرفة») ---------- */
const NOTIFY = { ds: "655372be-41c1-83d2-a8f5-07db380e829e", db: "632372be41c1821892e481ac9a59a352" };

export type StoredSub = { id: string; key: string; sub: { endpoint: string; keys: { p256dh: string; auth: string } }; device: string };

export async function listSubscriptions(): Promise<StoredSub[]> {
  const rows = await query(NOTIFY);
  const out: StoredSub[] = [];
  for (const r of rows) {
    if (r["النوع"] !== "اشتراك" || r["الحالة"] !== "فعّال") continue;
    try {
      const sub = JSON.parse(String(r["البيانات"] || ""));
      if (sub && sub.endpoint && sub.keys && sub.keys.p256dh && sub.keys.auth) out.push({ id: String(r.id || "").replace(/-/g, ""), key: String(r["العنصر"] || ""), sub, device: String(r["الجهاز"] || "") });
    } catch {
      /* سطر تالف يتجاهل */
    }
  }
  return out;
}

export async function saveSubscription(key: string, sub: object, device: string): Promise<void> {
  const existing = (await listSubscriptions()).find((s) => s.key === key);
  if (existing) return;
  const today = new Date().toISOString();
  const properties = {
    "العنصر": { title: [{ text: { content: key } }] },
    "النوع": { select: { name: "اشتراك" } },
    "الحالة": { select: { name: "فعّال" } },
    "البيانات": rt(JSON.stringify(sub)),
    "الجهاز": rt(device.slice(0, 200)),
    "وقت": { date: { start: today } },
  };
  let res = await call("/pages", { parent: { type: "data_source_id", data_source_id: NOTIFY.ds }, properties });
  if (res.status === 400 || res.status === 404) res = await call("/pages", { parent: { database_id: NOTIFY.db }, properties }, "2022-06-28");
  if (!res.ok) throw new Error(`notion ${res.status} saving subscription`);
}

export async function expireSubscription(pageId: string): Promise<void> {
  if (!isPageId(pageId)) return;
  await fetch(`${API}/pages/${pageId}`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${process.env.NOTION_TOKEN}`, "notion-version": VERSION, "content-type": "application/json" },
    body: JSON.stringify({ properties: { "الحالة": { select: { name: "منتهي" } } } }),
    cache: "no-store",
  });
}

export async function lastNotificationAt(): Promise<string> {
  const rows = await query(NOTIFY);
  let last = "";
  for (const r of rows) {
    if (r["النوع"] !== "إشعار") continue;
    const t = String(r["وقت"] || "");
    if (t > last) last = t;
  }
  return last;
}

export async function logNotification(title: string, body: string, devices: number): Promise<void> {
  const properties = {
    "العنصر": { title: [{ text: { content: title.slice(0, 200) } }] },
    "النوع": { select: { name: "إشعار" } },
    "البيانات": rt(body),
    "وقت": { date: { start: new Date().toISOString() } },
    "عدد الأجهزة": { number: devices },
  };
  let res = await call("/pages", { parent: { type: "data_source_id", data_source_id: NOTIFY.ds }, properties });
  if (res.status === 400 || res.status === 404) res = await call("/pages", { parent: { database_id: NOTIFY.db }, properties }, "2022-06-28");
  if (!res.ok) throw new Error(`notion ${res.status} logging notification`);
}

/** يحسب اللي اتغيّر بعد وقت معيّن (نفس منطق «الوارد») — للإشعارات. */
export function changesSince(live: LiveRoom, since: string): { title: string; body: string; count: number } | null {
  const items: string[] = [];
  const lbl = (k: string, t: unknown, s: unknown) => `${k}: ${String(t || "")}${s ? " · " + String(s) : ""}`;
  for (const r of live.work) if (String(r.edited || "") > since) items.push(lbl("شغل", r["الكارت"], r["المرحلة"]));
  for (const r of live.decisions) if (String(r.edited || "") > since) items.push(lbl("قرار", r["القرار"], r["الحالة"]));
  for (const r of live.publish) if (String(r.edited || "") > since) items.push(lbl("نشر", r["العنوان"], r["الحالة"]));
  for (const r of live.requests) if (String(r.edited || "") > since) items.push(lbl("طلب دورة", r["الطلب"], r["الحالة"]));
  for (const r of live.comments) if (String(r.edited || "") > since && r["مين"] !== "د. أحمد") items.push(lbl("تعليق من " + String(r["مين"] || ""), r["عنوان الكارت"], r["التعليق"]));
  if (!items.length) return null;
  const late = live.work.filter((w) => String(w["الموعد"] || "") && String(w["الموعد"]) < new Date().toISOString().slice(0, 10) && !["خلص", "واقف"].includes(String(w["المرحلة"] || ""))).length;
  const title = items.length === 1 ? items[0].slice(0, 80) : `${items.length} تغييرات في الغرفة${late ? ` · ${late} متأخر` : ""}`;
  const body = items.slice(0, 4).join("\n") + (items.length > 4 ? `\n… و${items.length - 4} كمان` : "");
  return { title, body, count: items.length };
}

// ===== حسم القرارات من الغرفة (الإصدار 6): اعتمد / مش دلوقتي بضغطة =====
const DECISION_VERDICTS = new Set(["اتحسم", "مؤجل", "مرفوض"]);
export async function updateDecision(pageId: string, verdict: string, note?: string): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  if (!isPageId(pageId)) throw new Error("bad page id");
  if (!DECISION_VERDICTS.has(verdict)) throw new Error("bad verdict");
  const today = new Date().toISOString().slice(0, 10);
  // «مرفوض» بيتسجّل كقرار محسوم، والرفض مكتوب في «القرار النهائي».
  const properties: Record<string, unknown> = { "الحالة": { select: { name: verdict === "مرفوض" ? "اتحسم" : verdict } } };
  if (verdict !== "مؤجل") properties["اتحسم يوم"] = { date: { start: today } };
  const suffix = verdict === "اتحسم" ? `اتوافق عليه من المنصة ${today}` : verdict === "مرفوض" ? `اترفض من المنصة ${today}` : `اتأجل من المنصة ${today}`;
  properties["القرار النهائي"] = rt(`${note ? note + " — " : ""}${suffix}`);
  const res = await fetch(`${API}/pages/${pageId}`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${process.env.NOTION_TOKEN}`, "notion-version": VERSION, "content-type": "application/json" },
    body: JSON.stringify({ properties }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`notion ${res.status} deciding`);
  // طلب تحديث منهجية من عنصر ناجح: بعد موافقة د. أحمد بس، العنصر بيتسجّل «مثال ناجح» على المنهجية.
  if (verdict === "اتحسم") {
    try {
      const page: any = await (await call(`/pages/${pageId}`)).json();
      const opts = plain(page?.properties?.["الخيارات"]);
      const m = /method:([0-9a-f-]{32,36})\|item:([0-9a-f-]{32,36})/.exec(String(opts || ""));
      if (m) {
        const item: any = await (await call(`/pages/${m[2].replace(/-/g, "")}`)).json();
        const title = String(plain(item?.properties?.["الكارت"]) || "");
        await fetch(`${API}/pages/${m[1].replace(/-/g, "")}`, {
          method: "PATCH",
          headers: { authorization: `Bearer ${process.env.NOTION_TOKEN}`, "notion-version": VERSION, "content-type": "application/json" },
          body: JSON.stringify({ properties: { "المثال الناجح": rt(`${title} — اتعتمد مثال ناجح ${today}`), "رابط المثال الناجح": { url: item?.url || null }, "آخر تحديث": { date: { start: today } } } }),
          cache: "no-store",
        });
      }
    } catch {
      /* القرار نفسه اتسجّل؛ تحديث المنهجية يتعمل يدوي لو فشل */
    }
  }
  cache = null;
}

/** عنصر خلص وطريقته نجحت ← طلب تحديث لمنهجية مساره، بيستنى موافقة د. أحمد في «قرارات مستنية أحمد». */
export async function proposeMethodUpdate(itemId: string, methodId: string, note: string): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  if (!isPageId(itemId) || !isPageId(methodId)) throw new Error("bad page id");
  const item: any = await (await call(`/pages/${itemId}`)).json();
  const method: any = await (await call(`/pages/${methodId}`)).json();
  const itemTitle = String(plain(item?.properties?.["الكارت"]) || "").slice(0, 120);
  const methodTitle = String(plain(method?.properties?.["المنهجية"]) || "").slice(0, 120);
  if (!itemTitle || !methodTitle) throw new Error("not found");
  const today = new Date().toISOString().slice(0, 10);
  const properties = {
    "القرار": { title: [{ text: { content: `تحديث منهجية «${methodTitle}» من عنصر ناجح: «${itemTitle}»` } }] },
    "الحالة": { select: { name: "مستني د. أحمد" } },
    "القسم": { select: { name: "منهجيات" } },
    "الخيارات": rt(`method:${methodId.replace(/-/g, "")}|item:${itemId.replace(/-/g, "")}`),
    "السبب": rt(note.slice(0, 1500)),
    "اتطلب يوم": { date: { start: today } },
    "رابط التفاصيل": { url: item?.url || null },
  };
  let res = await call("/pages", { parent: { type: "data_source_id", data_source_id: SOURCES.decisions.ds }, properties });
  if (res.status === 400 || res.status === 404) res = await call("/pages", { parent: { database_id: SOURCES.decisions.db }, properties }, "2022-06-28");
  if (!res.ok) throw new Error(`notion ${res.status} proposing method update`);
  cache = null;
}

async function patchPage(pageId: string, properties: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${API}/pages/${pageId}`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${process.env.NOTION_TOKEN}`, "notion-version": VERSION, "content-type": "application/json" },
    body: JSON.stringify({ properties }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`notion ${res.status} patching page`);
}

async function createIn(src: { ds: string; db: string }, properties: Record<string, unknown>): Promise<any> {
  let res = await call("/pages", { parent: { type: "data_source_id", data_source_id: src.ds }, properties });
  if (res.status === 400 || res.status === 404) res = await call("/pages", { parent: { database_id: src.db }, properties }, "2022-06-28");
  if (!res.ok) throw new Error(`notion ${res.status} creating page`);
  return res.json();
}

const todayStr = () => new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10); // توقيت كوريا

/* ---------- الأبحاث والنشر، والمسابقات (16 أكتوبر 2026) — كتابة بس، مفيش حذف ---------- */
export const PUB_TYPES = ["ورقة علمية", "تقرير", "مقال"];
export const PUB_STATUSES = ["فكرة", "كتابة", "مراجعة", "منشور"];
export const COMP_STATUSES = ["مفتوحة", "مسجّلين", "بنجهّز", "قدّمنا", "انتهت"];
const isUrl = (v: string) => /^https?:\/\/\S+$/i.test(v);
const urlProp = (v: string) => ({ url: v && isUrl(v) ? v.slice(0, 500) : null });
const dateProp = (v: string) => ({ date: v && isDate(v) ? { start: v } : null });

export type NewPub = { title: string; type: string; status: string; venue: string; link: string; date: string };
export async function createPub(p: NewPub): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  const title = p.title.trim().slice(0, 300);
  if (!title) throw new Error("empty title");
  if (!PUB_TYPES.includes(p.type) || !PUB_STATUSES.includes(p.status)) throw new Error("bad option");
  const properties: Record<string, unknown> = {
    "العنوان": { title: [{ text: { content: title } }] },
    "النوع": { select: { name: p.type } },
    "الحالة": { select: { name: p.status } },
    "الجهة": rt(p.venue.slice(0, 200)),
  };
  if (p.link) properties["الرابط"] = urlProp(p.link);
  if (p.date) properties["التاريخ"] = dateProp(p.date);
  await createIn(SOURCES.research, properties);
  cache = null;
}
export async function updatePub(pageId: string, p: { status?: string; link?: string; date?: string }): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  if (!isPageId(pageId)) throw new Error("bad page id");
  const properties: Record<string, unknown> = {};
  if (p.status && PUB_STATUSES.includes(p.status)) properties["الحالة"] = { select: { name: p.status } };
  if (p.link !== undefined) properties["الرابط"] = urlProp(p.link);
  if (p.date !== undefined) properties["التاريخ"] = dateProp(p.date);
  if (!Object.keys(properties).length) return;
  await patchPage(pageId, properties);
  cache = null;
}

export type NewComp = { name: string; link: string; status: string; due: string };
export async function createComp(c: NewComp): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  const name = c.name.trim().slice(0, 300);
  if (!name) throw new Error("empty name");
  if (!COMP_STATUSES.includes(c.status)) throw new Error("bad status");
  const properties: Record<string, unknown> = { "الاسم": { title: [{ text: { content: name } }] }, "الحالة": { select: { name: c.status } } };
  if (c.link) properties["الرابط"] = urlProp(c.link);
  if (c.due) properties["الموعد"] = dateProp(c.due);
  await createIn(SOURCES.competitions, properties);
  cache = null;
}
export async function updateComp(pageId: string, c: { status?: string; due?: string; link?: string }): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  if (!isPageId(pageId)) throw new Error("bad page id");
  const properties: Record<string, unknown> = {};
  if (c.status && COMP_STATUSES.includes(c.status)) properties["الحالة"] = { select: { name: c.status } };
  if (c.due !== undefined) properties["الموعد"] = dateProp(c.due);
  if (c.link !== undefined) properties["الرابط"] = urlProp(c.link);
  if (!Object.keys(properties).length) return;
  await patchPage(pageId, properties);
  cache = null;
}

/* ---------- حلول من كوريا (16 أكتوبر 2026) — إضافة وتعديل وإخفاء. مفيش حذف. ---------- */
export const KS_TYPES = ["منتج", "حل", "تكنولوجيا"];
export const KS_SECTORS = ["الصحة", "الرعاية الاجتماعية", "الأمن والمدن", "الزراعة والغذاء", "الطاقة", "التصنيع"];
export const KS_REGIONS = ["نعم", "تجربة", "لسه"];
export const KS_ROUTES = ["شراء", "توزيع", "ترخيص", "مشروع مشترك"];
const slugOk = (v: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) && v.length <= 80;
const longText = (v: string) => rt(v.slice(0, 1900));

export type NewSolution = { titleAr: string; titleEn: string; slug: string; type: string; sector: string; maker: string; region: string; whereAr: string; whereEn: string; problemAr: string; problemEn: string; solutionAr: string; solutionEn: string; proofAr: string; proofEn: string; opportunityAr: string; opportunityEn: string; routes: string[]; order: string; visible: boolean };
export async function createSolution(x: NewSolution): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  const title = x.titleAr.trim().slice(0, 200);
  if (!title || !slugOk(x.slug)) throw new Error("bad title or slug");
  if (!KS_TYPES.includes(x.type) || !KS_SECTORS.includes(x.sector) || !KS_REGIONS.includes(x.region)) throw new Error("bad option");
  const properties: Record<string, unknown> = {
    "الاسم": { title: [{ text: { content: title } }] },
    "Name": rt(x.titleEn.slice(0, 200)),
    "slug": rt(x.slug),
    "النوع": { select: { name: x.type } },
    "المجال": { select: { name: x.sector } },
    "الشركة": rt(x.maker.slice(0, 200)),
    "وصل المنطقة": { select: { name: x.region } },
    "أين": rt(x.whereAr.slice(0, 500)),
    "Where": rt(x.whereEn.slice(0, 500)),
    "المشكلة": longText(x.problemAr), "Problem": longText(x.problemEn),
    "الحل": longText(x.solutionAr), "Solution": longText(x.solutionEn),
    "الدليل": longText(x.proofAr), "Proof": longText(x.proofEn),
    "الفرصة": longText(x.opportunityAr), "Opportunity": longText(x.opportunityEn),
    "طرق النقل": { multi_select: x.routes.filter((r) => KS_ROUTES.includes(r)).map((name) => ({ name })) },
    "ظاهر": { checkbox: x.visible },
  };
  const n = Number(x.order);
  if (x.order && Number.isFinite(n)) properties["الترتيب"] = { number: n };
  await createIn(SOURCES.koreanSolutions, properties);
  cache = null;
}
export type SolutionPatch = { visible?: boolean; region?: string; whereAr?: string; whereEn?: string; order?: string };
export async function updateSolution(pageId: string, p: SolutionPatch): Promise<void> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  if (!isPageId(pageId)) throw new Error("bad page id");
  const properties: Record<string, unknown> = {};
  if (p.visible !== undefined) properties["ظاهر"] = { checkbox: p.visible };
  if (p.region && KS_REGIONS.includes(p.region)) properties["وصل المنطقة"] = { select: { name: p.region } };
  if (p.whereAr !== undefined) properties["أين"] = rt(p.whereAr.slice(0, 500));
  if (p.whereEn !== undefined) properties["Where"] = rt(p.whereEn.slice(0, 500));
  if (p.order !== undefined) { const n = Number(p.order); properties["الترتيب"] = { number: p.order && Number.isFinite(n) ? n : null }; }
  if (!Object.keys(properties).length) return;
  await patchPage(pageId, properties);
  cache = null;
}

/* ---------- النشرة الشهرية (VisionSeek Insights) ---------- */

/** صيغة بريد معقولة، من غير مسافات، وبطول محدود. */
export function validEmail(v: string): boolean {
  return v.length >= 6 && v.length <= 254 && /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/.test(v);
}

/**
 * يسجّل مشترك في «النشرة الشهرية — المشتركين». البريد المكرر ما يتسجّلش مرتين.
 * الكتابة بس — مفيش أي إرسال للمشتركين من هنا (الإرسال بموافقة د. أحمد).
 */
export async function addNewsletterSubscriber(email: string, locale: "ar" | "en", page: string): Promise<"added" | "exists"> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  const e = email.trim().toLowerCase();
  if (!validEmail(e)) throw new Error("bad email");
  const filter = { property: "البريد", title: { equals: e } };
  let res = await call(`/data_sources/${SOURCES.newsletter.ds}/query`, { page_size: 1, filter });
  if (res.status === 404 || res.status === 400) res = await call(`/databases/${SOURCES.newsletter.db}/query`, { page_size: 1, filter }, "2022-06-28");
  if (res.ok) {
    const json: any = await res.json();
    if ((json.results || []).length) return "exists";
  }
  await createIn(SOURCES.newsletter, {
    "البريد": { title: [{ text: { content: e } }] },
    "اللغة": { select: { name: locale } },
    "الصفحة": rt(page.replace(/[^a-z0-9/_\-#]/gi, "").slice(0, 120)),
    "الحالة": { select: { name: "مشترك" } },
    "تاريخ الاشتراك": { date: { start: todayStr() } },
    "القطاع": { select: { name: "الظهور والتواصل" } },
  });
  cache = null;
  return "added";
}

/**
 * غرفة العمليات تقرأ Notion حيًّا (المستوى 1) وتكتب طلبات المحرك (المستوى 2).
 * التوكن من متغير البيئة NOTION_TOKEN (سرّ في Vercel). بدون توكن: الغرفة تعرض اللقطة.
 * الكتابة الوحيدة المسموحة من الموقع: سطر في قاعدة «طلبات المحرك». لا تعديل على أي قاعدة تانية.
 */

const API = "https://api.notion.com/v1";
const VERSION = "2025-09-03";

/** معرّفات مصادر البيانات (data sources) والقواعد تحت «غرفة العمليات — بيانات VisionSeek». */
export const SOURCES = {
  goals: { ds: "1c3b2da2-488c-4ade-b257-51301cee370e", db: "62b55a5d53924eb2a9040f9436b408f7" },
  decisions: { ds: "4a2607a2-8adc-4e1d-adbe-8b39b5f03d78", db: "3fab0d99aac847979e7b75d465f72edc" },
  work: { ds: "f9b149cf-8148-4951-9ce1-2219f05fe472", db: "d5b48733649c47f7a38374013bad10e4" },
  publish: { ds: "887bbcee-074d-4bcd-85e5-8b5c52c3a7d7", db: "13d5994fbae44c2893b30a2bd89506f2" },
  methods: { ds: "bc9bbdf6-5226-4a1b-9698-64dd3bfe7450", db: "6a2bcc17b8584b72bcd498c1cd9ec9c2" },
  requests: { ds: "54ff57e5-5d77-415d-98a6-b0c4810b80a4", db: "4ea8a74b705c4fc184235616a1498c4b" },
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
    case "checkbox":
      return prop.checkbox ? "__YES__" : "__NO__";
    case "relation":
      return (prop.relation || []).map((r: any) => r.id);
    default:
      return null;
  }
}

function toRow(page: any): Row {
  const row: Row = { url: page.url ?? null, id: page.id ?? null, edited: page.last_edited_time ?? null };
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
  const [decisions, work, publish, methods, goals, requests, cyc] = await Promise.all([
    safe(query(SOURCES.decisions), []),
    safe(query(SOURCES.work), []),
    safe(query(SOURCES.publish), []),
    safe(query(SOURCES.methods), []),
    safe(query(SOURCES.goals), []),
    safe(query(SOURCES.requests), []),
    safe(cycles(), []),
  ]);
  const data: LiveRoom = { at: new Date().toISOString(), decisions, work, publish, methods, goals, requests, cycles: cyc };
  cache = { at: Date.now(), data };
  return data;
}

const ENGINES = new Set(["الدورة كاملة", "رادار الفرص", "رادار القدرات", "المعالج"]);

/** يسجّل طلب تشغيل دورة. يرجّع رابط السطر أو يرمي خطأ. */
export async function createEngineRequest(engine: string, note: string): Promise<string> {
  if (!notionConfigured()) throw new Error("NOTION_TOKEN is not set");
  const eng = ENGINES.has(engine) ? engine : "الدورة كاملة";
  const today = new Date().toISOString().slice(0, 10);
  const properties = {
    "الطلب": { title: [{ text: { content: `${eng} — طلب من الغرفة ${today}` } }] },
    "المحرك": { select: { name: eng } },
    "الحالة": { select: { name: "جديد" } },
    "اتطلب يوم": { date: { start: today } },
    "مين طلب": { rich_text: [{ text: { content: "د. أحمد (من /ops)" } }] },
    "ملاحظة الطلب": { rich_text: [{ text: { content: note.slice(0, 1800) } }] },
  };
  let res = await call("/pages", { parent: { type: "data_source_id", data_source_id: SOURCES.requests.ds }, properties });
  if (res.status === 400 || res.status === 404) {
    res = await call("/pages", { parent: { database_id: SOURCES.requests.db }, properties }, "2022-06-28");
  }
  if (!res.ok) throw new Error(`notion ${res.status} creating request`);
  const json: any = await res.json();
  cache = null;
  return json.url as string;
}

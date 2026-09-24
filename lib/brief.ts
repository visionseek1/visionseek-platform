import insights from "@/public/insights.json";
import { fieldById, fields } from "@/lib/fields";

export type Locale = "ar" | "en";

export type BriefEntry = {
  slug: string;
  kind: "signal" | "report";
  publishedAt: string;
  source: string;
  sourceUrl: string | null;
  fieldIds: string[];
  category: { en: string; ar: string };
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  take: { en: string; ar: string } | null;
  readingMinutes: { en: number; ar: number };
  image: string;
  imageAlt: string;
};

type RawInsight = {
  id?: unknown;
  publishedAt?: unknown;
  source?: unknown;
  sourceUrl?: unknown;
  categoryEn?: unknown;
  categoryAr?: unknown;
  titleEn?: unknown;
  titleAr?: unknown;
  summaryEn?: unknown;
  summaryAr?: unknown;
  takeEn?: unknown;
  takeAr?: unknown;
};

const approvedHosts = new Set([
  "mckinsey.com",
  "www.mckinsey.com",
  "bcg.com",
  "www.bcg.com",
  "nature.com",
  "www.nature.com",
  "mit.edu",
  "www.mit.edu",
  "oecd.org",
  "www.oecd.org",
  "weforum.org",
  "www.weforum.org",
]);

const fieldRules: { id: string; test: RegExp }[] = [
  { id: "space", test: /space|aerospace|crew/i },
  { id: "drones", test: /drone|aviation|airspace|aerial|low-altitude/i },
  { id: "agriculture", test: /agricultur|food|biosecurity/i },
  { id: "science", test: /health|wearable|science/i },
  { id: "energy", test: /energy|climate|lng|hydrogen|renewable|fuel|electrification|grid|diesel|battery|electric vehicle/i },
  { id: "cities", test: /digital infrastructure|public digital|child online|future cities/i },
  { id: "chips", test: /semiconductor|chip|quantum|\bai\b|artificial intelligence|agentic|data center|frontier model|mineral/i },
  { id: "robots", test: /robot|autonomous|industrial|manufactur|defence|defense|cyber/i },
];

export const briefFeedUrl = "https://raw.githubusercontent.com/visionseek1/visionseek-platform/main/public/insights.json";

export const savedStorageKey = "visionseek.brief.saved";

export function fieldIdsForCategory(categoryEn: string) {
  const ids: string[] = [];
  for (const rule of fieldRules) {
    if (rule.test.test(categoryEn) && fields.some((field) => field.id === rule.id)) ids.push(rule.id);
  }
  return ids;
}

export function safeSourceUrl(value: unknown) {
  if (typeof value !== "string" || !value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && approvedHosts.has(url.hostname) ? url.toString() : null;
  } catch {
    return null;
  }
}

export function readingMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function imageFor(fieldIds: string[]) {
  for (const id of fieldIds) {
    const field = fieldById(id);
    if (field) return { image: field.image, imageAlt: field.alt };
  }
  return { image: "/leaders-placeholder.png", imageAlt: "VisionSeek" };
}

export function entryFromInsight(value: RawInsight): BriefEntry | null {
  const slug = text(value.id);
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  const titleEn = text(value.titleEn);
  const titleAr = text(value.titleAr);
  const summaryEn = text(value.summaryEn);
  const summaryAr = text(value.summaryAr);
  const publishedAt = text(value.publishedAt);
  if (!slug || !titleEn || !titleAr || !summaryEn || !summaryAr || !publishedAt) return null;
  if (Number.isNaN(Date.parse(publishedAt))) return null;
  const categoryEn = text(value.categoryEn);
  const categoryAr = text(value.categoryAr);
  const takeEn = text(value.takeEn);
  const takeAr = text(value.takeAr);
  const fieldIds = fieldIdsForCategory(categoryEn);
  const image = imageFor(fieldIds);
  return {
    slug,
    kind: "signal",
    publishedAt,
    source: text(value.source),
    sourceUrl: safeSourceUrl(value.sourceUrl),
    fieldIds,
    category: { en: categoryEn, ar: categoryAr },
    title: { en: titleEn, ar: titleAr },
    summary: { en: summaryEn, ar: summaryAr },
    take: takeEn || takeAr ? { en: takeEn, ar: takeAr } : null,
    readingMinutes: {
      en: readingMinutes(`${summaryEn} ${takeEn}`),
      ar: readingMinutes(`${summaryAr} ${takeAr}`),
    },
    image: image.image,
    imageAlt: image.imageAlt,
  };
}

const physicalAiImage = imageFor(["robots"]);

export const physicalAiEntry: BriefEntry = {
  slug: "physical-ai",
  kind: "report",
  publishedAt: "2026-09-01T00:00:00.000Z",
  source: "VisionSeek",
  sourceUrl: null,
  fieldIds: ["robots", "chips"],
  category: { en: "Physical AI", ar: "الذكاء الاصطناعي المادي" },
  title: {
    en: "Physical AI is becoming national infrastructure",
    ar: "الذكاء الاصطناعي المادي يتحول إلى بنية تحتية وطنية",
  },
  summary: {
    en: "The next AI advantage will not live only in data centers. It will move through ports, farms, factories, cities, and public services. Governments have a narrow window to shape the systems, standards, and capabilities that will determine who captures the value.",
    ar: "الميزة التالية للذكاء الاصطناعي لن تبقى داخل مراكز البيانات؛ بل ستتحرك عبر الموانئ والمزارع والمصانع والمدن والخدمات العامة. أمام الحكومات نافذة محدودة لبناء الأنظمة والمعايير والقدرات التي تحدد من يصنع القيمة ومن يكتفي باستيرادها.",
  },
  take: null,
  readingMinutes: { en: 8, ar: 8 },
  image: physicalAiImage.image,
  imageAlt: physicalAiImage.imageAlt,
};

export function entriesFromInsights(items: unknown[]) {
  const signals = items
    .map((item) => entryFromInsight((item ?? {}) as RawInsight))
    .filter((item): item is BriefEntry => item !== null && item.slug !== physicalAiEntry.slug);
  return [physicalAiEntry, ...signals].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export const briefEntries = entriesFromInsights(insights.items);

export function getBrief(slug: string) {
  return briefEntries.find((entry) => entry.slug === slug) ?? null;
}

/** At most five real fields that actually have posts. Empty fields stay off the row. */
export function feedTopicsFor(entries: BriefEntry[]) {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const id of entry.fieldIds) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return fields
    .filter((field) => (counts.get(field.id) ?? 0) > 0)
    .sort((a, b) => (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0) || fields.indexOf(a) - fields.indexOf(b))
    .slice(0, 5);
}

export function briefHref(locale: Locale, slug?: string) {
  const base = locale === "ar" ? "/ar/leaders" : "/leaders";
  return slug ? `${base}/${slug}` : base;
}

function idList(storageKey: string, eventName: string) {
  const empty: string[] = [];
  let cache = "[]";
  let ids = empty;
  return {
    read() {
      if (typeof window === "undefined") return empty;
      const raw = window.localStorage.getItem(storageKey) ?? "[]";
      if (raw === cache) return ids;
      cache = raw;
      try {
        const parsed = JSON.parse(raw) as unknown;
        ids = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : empty;
      } catch {
        ids = empty;
      }
      return ids;
    },
    server() {
      return empty;
    },
    subscribe(onChange: () => void) {
      window.addEventListener("storage", onChange);
      window.addEventListener(eventName, onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(eventName, onChange);
      };
    },
    write(next: string[]) {
      const raw = JSON.stringify(next);
      window.localStorage.setItem(storageKey, raw);
      cache = raw;
      ids = next;
      window.dispatchEvent(new Event(eventName));
    },
  };
}

const savedList = idList(savedStorageKey, "visionseek-brief-saved");

export const readSavedIds = () => savedList.read();
export const readSavedServer = () => savedList.server();
export const subscribeSaved = (onChange: () => void) => savedList.subscribe(onChange);
export const writeSavedIds = (ids: string[]) => savedList.write(ids);

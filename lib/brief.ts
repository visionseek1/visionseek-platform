import insights from "@/public/insights.json";
import { fields } from "@/lib/fields";
import { learnCoverExtras, seriesList } from "./series-data.mjs";
import { signalDepth } from "./signal-depth.mjs";
import { weeklyPicks, weeklyRule, weeklyTitle } from "./weekly-picks.mjs";
import {
  byNewest,
  orderedCoverRows,
  physicalFieldId,
  physicalPublishedAt,
  physicalSlug,
  primaryField,
  safeSourceUrl,
  weeklyPublishedAt,
  weeklySlug,
} from "./leaders-rules.mjs";

export type Locale = "ar" | "en";

export type SourceLink = {
  href: string;
  label: { en: string; ar: string };
};

export type WeeklyItem = {
  slug: string;
  title: { en: string; ar: string };
  sourceUrl: string | null;
  source: string;
  fieldId: string | null;
  why: { en: string; ar: string };
};

export type SeriesPart = {
  slug: string | null;
  title: { en: string; ar: string };
};

export type BriefSeries = {
  id: string;
  title: { en: string; ar: string };
  parts: SeriesPart[];
};

export type GlossaryItem = {
  term: { en: string; ar: string };
  meaning: { en: string; ar: string };
};

export type BriefEntry = {
  slug: string;
  kind: "signal" | "report" | "learn" | "weekly";
  draft: boolean;
  publishedAt: string;
  source: string;
  sourceUrl: string | null;
  fieldIds: string[];
  seriesId: string | null;
  seriesPart: number | null;
  category: { en: string; ar: string };
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  take: { en: string; ar: string } | null;
  body: { en: string[]; ar: string[] } | null;
  glossary: GlossaryItem[] | null;
  questions: { en: string[]; ar: string[] } | null;
  figures: { en: string[]; ar: string[] };
  figuresVerified: boolean;
  deeper: SourceLink[];
  weeklyItems: WeeklyItem[] | null;
  series: BriefSeries | null;
  readingMinutes: { en: number; ar: number };
  image: string | null;
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

export const briefFeedUrl = "https://raw.githubusercontent.com/visionseek1/visionseek-platform/main/public/insights.json";

export const savedStorageKey = "visionseek.brief.saved";
export const followedStorageKey = "visionseek.leaders.followed";
export const learnProgressKey = "visionseek.leaders.learnProgress";
export const seenAtKey = "visionseek.leaders.seenAt";
export const seenPrevKey = "visionseek.leaders.seenPrev";

export function fieldIdsForCategory(categoryEn: string) {
  const id = primaryField(categoryEn);
  return id ? [id] : [];
}

export { safeSourceUrl };

export function readingMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function sentencesWithNumbers(value: string) {
  return value
    .split(/\n+|(?<=[.!?؟])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0 && /\d/.test(sentence))
    .slice(0, 3);
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
  const sourceUrl = safeSourceUrl(value.sourceUrl);
  const depth = signalDepth[slug as keyof typeof signalDepth] as
    | {
        seriesId: string | null;
        figures: { en: string[]; ar: string[] };
        questions: { en: string[]; ar: string[] };
        deeper: SourceLink[];
      }
    | undefined;
  const seriesId = depth ? depth.seriesId : /agentic/i.test(`${categoryEn} ${titleEn}`) ? "agentic-ai" : null;
  const reuters = sourceUrl ? [{ href: sourceUrl, label: { en: "Reuters", ar: "رويترز" } }] : [];
  const deeper = depth ? depth.deeper.filter((link) => safeSourceUrl(link.href)) : reuters;
  return {
    slug,
    kind: "signal",
    draft: false,
    publishedAt,
    source: text(value.source),
    sourceUrl,
    fieldIds,
    seriesId,
    seriesPart: null,
    category: { en: categoryEn, ar: categoryAr },
    title: { en: titleEn, ar: titleAr },
    summary: { en: summaryEn, ar: summaryAr },
    take: takeEn || takeAr ? { en: takeEn, ar: takeAr } : null,
    body: null,
    glossary: null,
    questions: depth ? depth.questions : null,
    figures: depth ? depth.figures : { en: sentencesWithNumbers(summaryEn), ar: sentencesWithNumbers(summaryAr) },
    figuresVerified: Boolean(depth),
    deeper,
    weeklyItems: null,
    series: null,
    readingMinutes: {
      en: readingMinutes(`${summaryEn} ${takeEn}`),
      ar: readingMinutes(`${summaryAr} ${takeAr}`),
    },
    image: null,
    imageAlt: "",
  };
}

const physicalSources: SourceLink[] = [
  {
    href: "https://www.mckinsey.com/mgi/our-research/agents-robots-and-us-skill-partnerships-in-the-age-of-ai",
    label: { en: "McKinsey Global Institute — Agents, robots, and us", ar: "معهد ماكنزي — الوكلاء والروبوتات ونحن" },
  },
  {
    href: "https://www.oecd.org/en/publications/governing-with-artificial-intelligence_795de142-en/full-report.html",
    label: { en: "OECD — Governing with Artificial Intelligence", ar: "OECD — الحوكمة بالذكاء الاصطناعي" },
  },
  {
    href: "https://www.weforum.org/stories/2025/01/ai-and-autonomous-systems/",
    label: { en: "World Economic Forum — AI in the physical world", ar: "المنتدى الاقتصادي العالمي — الذكاء الاصطناعي في العالم المادي" },
  },
];

export const physicalAiEntry: BriefEntry = {
  slug: physicalSlug,
  kind: "report",
  draft: false,
  publishedAt: physicalPublishedAt,
  source: "VisionSeek",
  sourceUrl: null,
  fieldIds: [physicalFieldId, "chips"],
  seriesId: null,
  seriesPart: null,
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
  body: null,
  glossary: null,
  questions: null,
  figures: { en: [], ar: [] },
  figuresVerified: false,
  deeper: physicalSources,
  weeklyItems: null,
  series: null,
  readingMinutes: { en: 8, ar: 8 },
  image: null,
  imageAlt: "",
};

function learnEntries(): BriefEntry[] {
  return seriesList.flatMap((series) =>
    series.parts.map((part) => {
      const en = [part.summary.en, ...part.body.en].join(" ");
      const ar = [part.summary.ar, ...part.body.ar].join(" ");
      const seriesMeta = {
        id: series.id,
        title: series.title,
        parts: series.parts.map((item) => ({ slug: item.slug, title: item.title })),
      };
      return {
        slug: part.slug,
        kind: "learn" as const,
        draft: false,
        publishedAt: part.publishedAt,
        source: part.source,
        sourceUrl: safeSourceUrl(part.deeper[0]?.href),
        fieldIds: series.fieldId ? [series.fieldId] : [],
        seriesId: series.id,
        seriesPart: part.part,
        category: series.category,
        title: part.title,
        summary: part.summary,
        take: null,
        body: part.body,
        glossary: part.glossary,
        questions: part.questions,
        figures: { en: [], ar: [] },
        figuresVerified: false,
        deeper: part.deeper.filter((link) => safeSourceUrl(link.href)),
        weeklyItems: null,
        series: seriesMeta,
        readingMinutes: { en: readingMinutes(en), ar: readingMinutes(ar) },
        image: null,
        imageAlt: "",
      };
    }),
  );
}

function weeklyEntry(signals: BriefEntry[]): BriefEntry {
  const bySlug = new Map(signals.map((item) => [item.slug, item]));
  const five = weeklyPicks.flatMap((pick) => {
    const item = bySlug.get(pick.slug);
    return item ? [{ item, why: pick.why }] : [];
  });
  return {
    slug: weeklySlug,
    kind: "weekly",
    draft: false,
    publishedAt: weeklyPublishedAt,
    source: "VisionSeek",
    sourceUrl: null,
    fieldIds: [],
    seriesId: null,
    seriesPart: null,
    category: { en: "Weekly brief", ar: "موجز الأسبوع" },
    title: weeklyTitle,
    summary: weeklyRule,
    take: null,
    body: null,
    glossary: null,
    questions: null,
    figures: { en: [], ar: [] },
    figuresVerified: false,
    deeper: five.flatMap(({ item }) => (item.sourceUrl ? [{ href: item.sourceUrl, label: item.title }] : [])),
    weeklyItems: five.map(({ item, why }) => ({
      slug: item.slug,
      title: item.title,
      sourceUrl: item.sourceUrl,
      source: item.source || "Reuters",
      fieldId: item.fieldIds[0] ?? null,
      why,
    })),
    series: null,
    readingMinutes: {
      en: readingMinutes(`${weeklyRule.en} ${five.map(({ why }) => why.en).join(" ")}`),
      ar: readingMinutes(`${weeklyRule.ar} ${five.map(({ why }) => why.ar).join(" ")}`),
    },
    image: null,
    imageAlt: "",
  };
}

const reservedSlugs = new Set([physicalSlug, weeklySlug, ...seriesList.flatMap((series) => series.parts.map((part) => part.slug))]);

export function entriesFromInsights(items: unknown[]) {
  const signals = items
    .map((item) => entryFromInsight((item ?? {}) as RawInsight))
    .filter((item): item is BriefEntry => item !== null && !reservedSlugs.has(item.slug));
  const merged = [physicalAiEntry, ...learnEntries(), weeklyEntry(signals), ...signals];
  const covers = new Map(orderedCoverRows(items, learnCoverExtras()).map((row) => [row.slug, row]));
  return merged
    .map((entry) => {
      const cover = covers.get(entry.slug);
      return cover ? { ...entry, image: cover.image, imageAlt: cover.imageAlt || entry.imageAlt } : entry;
    })
    .sort(byNewest);
}

export const briefEntries = entriesFromInsights(insights.items);

export function getBrief(slug: string) {
  return briefEntries.find((entry) => entry.slug === slug) ?? null;
}

export function kindLabel(kind: BriefEntry["kind"], locale: Locale) {
  const labels = {
    signal: { en: "Signal", ar: "إشارة" },
    report: { en: "Report", ar: "تقرير" },
    learn: { en: "Learn", ar: "تعلّم" },
    weekly: { en: "Weekly brief", ar: "موجز الأسبوع" },
  };
  return labels[kind][locale];
}

/** Next item, three related items, and the Learn series when this post belongs to one. */
export function continueFor(entry: BriefEntry, entries: BriefEntry[]) {
  const others = entries.filter((item) => item.slug !== entry.slug);
  const field = entry.fieldIds[0] ?? null;
  const sameField = field ? others.filter((item) => item.fieldIds.includes(field)) : [];
  const next = sameField.find((item) => Date.parse(item.publishedAt) < Date.parse(entry.publishedAt))
    ?? sameField[0]
    ?? others.find((item) => Date.parse(item.publishedAt) < Date.parse(entry.publishedAt))
    ?? others[0]
    ?? null;
  const ranked = [
    ...sameField,
    ...others.filter((item) => item.category.en && item.category.en === entry.category.en),
    ...others,
  ];
  const related: BriefEntry[] = [];
  for (const item of ranked) {
    if (related.length >= 3) break;
    if (item.slug === next?.slug) continue;
    if (related.some((picked) => picked.slug === item.slug)) continue;
    related.push(item);
  }
  if (related.length < 3 && next && !related.some((picked) => picked.slug === next.slug)) related.push(next);
  const learn = entry.kind === "learn" || !entry.seriesId
    ? null
    : entries.find((item) => item.kind === "learn" && item.seriesId === entry.seriesId && item.seriesPart === 1) ?? null;
  return { next, related, learn };
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
const followedList = idList(followedStorageKey, "visionseek-leaders-followed");
const progressList = idList(learnProgressKey, "visionseek-learn-progress");

export const readSavedIds = () => savedList.read();
export const readSavedServer = () => savedList.server();
export const subscribeSaved = (onChange: () => void) => savedList.subscribe(onChange);
export const writeSavedIds = (ids: string[]) => savedList.write(ids);

export const readFollowedIds = () => followedList.read();
export const readFollowedServer = () => followedList.server();
export const subscribeFollowed = (onChange: () => void) => followedList.subscribe(onChange);
export const writeFollowedIds = (ids: string[]) => followedList.write(ids);

export const readLearnProgress = () => progressList.read();
export const readLearnProgressServer = () => progressList.server();
export const subscribeLearnProgress = (onChange: () => void) => progressList.subscribe(onChange);
export const writeLearnProgress = (ids: string[]) => progressList.write(ids);

let seenPrevRaw = "\0";
let seenPrevCache: string | null = null;

export function readSeenPrev() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(seenPrevKey);
  const key = raw ?? "";
  if (key === seenPrevRaw) return seenPrevCache;
  seenPrevRaw = key;
  seenPrevCache = raw;
  return seenPrevCache;
}

export function readSeenPrevServer() {
  return null;
}

export function subscribeSeenPrev(onChange: () => void) {
  const handler = () => onChange();
  window.addEventListener("storage", handler);
  window.addEventListener("visionseek-leaders-seen", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("visionseek-leaders-seen", handler);
  };
}

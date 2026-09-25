/** Pure feed rules. Imported by the app and by node:test. */

export const approvedHosts = new Set([
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
  "reuters.com",
  "www.reuters.com",
]);

export const weeklySlug = "week-2026-09-19";
export const weeklyPublishedAt = "2026-09-19T18:00:00.000Z";
export const learnSlug = "agentic-ai-what-it-is";
export const learnPublishedAt = "2026-02-13T00:00:00.000Z";
export const physicalSlug = "physical-ai";
export const physicalPublishedAt = "2026-09-01T00:00:00.000Z";
export const physicalFieldId = "robots";

const fieldRules = [
  { id: "drones", test: /drone|airspace|low-altitude|counter-drone|aviation|aerial/i },
  { id: "space", test: /\bspace\b|aerospace|\bcrew\b/i },
  { id: "agriculture", test: /agricultur|food|biosecurity/i },
  { id: "science", test: /health|wearable/i },
  { id: "energy", test: /energy|climate|lng|hydrogen|renewable|fuel|electrification|grid|diesel|battery|electric vehicle/i },
  { id: "cities", test: /digital infrastructure|public digital|child online/i },
  { id: "chips", test: /semiconductor|\bchips?\b|quantum|critical mineral|\bminerals?\b|data center/i },
  { id: "robots", test: /robot|autonomous|industrial|manufactur|defence|defense|cyber/i },
];

const covers = {
  space: ["/covers/field-space-1.jpg", "/covers/field-space-2.jpg", "/covers/field-space-3.jpg"],
  drones: ["/covers/field-drones-1.jpg", "/covers/field-drones-2.jpg", "/covers/field-drones-3.jpg"],
  cities: ["/covers/field-cities-1.jpg", "/covers/field-cities-2.jpg", "/covers/field-cities-3.jpg"],
  science: ["/covers/field-science-1.jpg", "/covers/field-science-2.jpg", "/covers/field-science-3.jpg"],
  energy: ["/covers/field-energy-1.jpg", "/covers/field-energy-2.jpg", "/covers/field-energy-3.jpg"],
  robots: ["/covers/field-industry-1.jpg", "/covers/field-industry-2.jpg", "/covers/field-industry-3.jpg"],
  agriculture: ["/covers/field-food-1.jpg", "/covers/field-food-2.jpg", "/covers/field-food-3.jpg"],
  chips: ["/covers/field-chips-1.jpg", "/covers/field-chips-2.jpg", "/covers/field-chips-3.jpg"],
  plate: ["/leaders-placeholder.png", "/covers/plate-2.png", "/covers/plate-3.png"],
};

const alts = {
  space: "صاروخ ينطلق إلى الفضاء وقت الغروب",
  drones: "درون حديث يحلق في الهواء",
  cities: "شبكات رقمية ترمز إلى مدن المستقبل",
  science: "باحث يعمل داخل مختبر حديث",
  energy: "ألواح شمسية وتوربينات رياح",
  robots: "روبوتات داخل مصنع متقدم",
  agriculture: "صوب زراعية حديثة من الجو",
  chips: "رقائق إلكترونية ومواد متقدمة",
};

export function safeSourceUrl(value) {
  if (typeof value !== "string" || !value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && approvedHosts.has(url.hostname) ? url.toString() : null;
  } catch {
    return null;
  }
}

/** One field per post. AI policy and governance are not the chip lab. */
export function primaryField(categoryEn) {
  const text = typeof categoryEn === "string" ? categoryEn : "";
  for (const rule of fieldRules) {
    if (rule.test.test(text)) return rule.id;
  }
  return null;
}

export function hashSlug(slug) {
  let hash = 2166136261;
  const value = typeof slug === "string" ? slug : "";
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function poolFor(fieldId) {
  return covers[fieldId] ?? covers.plate;
}

export function byNewest(a, b) {
  return Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || String(a.slug).localeCompare(String(b.slug));
}

function extraRows() {
  return [
    { slug: weeklySlug, publishedAt: weeklyPublishedAt, fieldId: null },
    { slug: physicalSlug, publishedAt: physicalPublishedAt, fieldId: physicalFieldId },
    { slug: learnSlug, publishedAt: learnPublishedAt, fieldId: null },
  ];
}

/**
 * Cover for every feed row, in newest-first order.
 * Same field, several crops, chosen from the slug.
 * If that crop matches the previous card, the next crop in the pool is used.
 */
export function orderedCoverRows(items) {
  const rows = [];
  for (const item of items ?? []) {
    const slug = typeof item?.id === "string" ? item.id : "";
    const publishedAt = typeof item?.publishedAt === "string" ? item.publishedAt : "";
    const category = typeof item?.categoryEn === "string" ? item.categoryEn : "";
    if (!slug || !publishedAt) continue;
    rows.push({ slug, publishedAt, fieldId: primaryField(category) });
  }
  for (const extra of extraRows()) {
    if (!rows.some((row) => row.slug === extra.slug)) rows.push(extra);
  }
  rows.sort(byNewest);
  const recent = [];
  return rows.map((row) => {
    const pool = poolFor(row.fieldId);
    let index = hashSlug(row.slug) % pool.length;
    let guard = 0;
    while (recent.includes(pool[index]) && guard < pool.length) {
      index = (index + 1) % pool.length;
      guard += 1;
    }
    const image = pool[index];
    recent.push(image);
    if (recent.length > 2) recent.shift();
    return {
      slug: row.slug,
      publishedAt: row.publishedAt,
      fieldId: row.fieldId,
      image,
      imageAlt: alts[row.fieldId] ?? "VisionSeek",
    };
  });
}

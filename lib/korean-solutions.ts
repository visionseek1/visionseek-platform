import fallback from '@/content/korean-solutions.json';
import {SOURCES, notionConfigured, toRow} from '@/lib/notion-room';

/**
 * «حلول من كوريا» / Korean Solutions.
 * The site reads the Notion database «حلول من كوريا» (rows marked «ظاهر» only) and refreshes every 10 minutes.
 * If Notion is not reachable, it shows the copy kept in content/korean-solutions.json.
 * Every number on the page comes from a proof line that carries its source link.
 */
import {REGIONS, ROUTES, TYPES, type Proof, type Region, type Route, type Solution, type SolutionType} from '@/lib/korean-solutions-copy';
export * from '@/lib/korean-solutions-copy';

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const isUrl = (v: string) => /^https?:\/\/\S+$/i.test(v);

/** Proof lines are stored one per line as «text | url». Arabic and English lines are paired by position. */
export function parseProof(ar: string, en: string): Proof[] {
  const split = (v: string) => v.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => {
    const i = l.lastIndexOf('|');
    const url = i >= 0 ? l.slice(i + 1).trim() : '';
    return isUrl(url) ? {text: l.slice(0, i).trim(), url} : {text: l, url: ''};
  });
  const a = split(ar); const e = split(en);
  return a.map((x, i) => ({ar: x.text, en: e[i]?.text || '', url: x.url || e[i]?.url || ''})).filter(p => p.ar);
}

function fromRow(r: Record<string, unknown>): Solution | null {
  const slug = str(r['slug']);
  const type = str(r['النوع']) as SolutionType;
  if (!/^[a-z0-9-]+$/.test(slug) || !TYPES.includes(type) || r['ظاهر'] !== '__YES__') return null;
  const region = (REGIONS as string[]).includes(str(r['وصل المنطقة'])) ? str(r['وصل المنطقة']) as Region : 'لسه';
  const routes = (Array.isArray(r['طرق النقل']) ? r['طرق النقل'] as string[] : []).filter((x): x is Route => (ROUTES as string[]).includes(x));
  const title = {ar: str(r['الاسم']), en: str(r['Name'])};
  if (!title.ar) return null;
  return {
    slug, type, sector: str(r['المجال']), order: Number(r['الترتيب']) || 99,
    title, maker: str(r['الشركة']),
    problem: {ar: str(r['المشكلة']), en: str(r['Problem'])},
    solution: {ar: str(r['الحل']), en: str(r['Solution'])},
    proof: parseProof(str(r['الدليل']), str(r['Proof'])),
    region, where: {ar: str(r['أين']), en: str(r['Where'])},
    opportunity: {ar: str(r['الفرصة']), en: str(r['Opportunity'])},
    routes,
  };
}

const backup = (): Solution[] => (fallback.solutions as unknown as Solution[]).slice().sort((a, b) => a.order - b.order);

async function fromNotion(): Promise<Solution[] | null> {
  if (!notionConfigured()) return null;
  try {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${SOURCES.koreanSolutions.ds}/query`, {
      method: 'POST',
      headers: {authorization: `Bearer ${process.env.NOTION_TOKEN}`, 'notion-version': '2025-09-03', 'content-type': 'application/json'},
      body: JSON.stringify({page_size: 100}),
      next: {revalidate: 600, tags: ['korean-solutions']},
    });
    if (!res.ok) return null;
    const json = await res.json() as {results?: unknown[]};
    const rows = (json.results || []).map(p => fromRow(toRow(p))).filter((x): x is Solution => x !== null);
    const seen = new Set<string>();
    return rows.filter(s => (seen.has(s.slug) ? false : (seen.add(s.slug), true))).sort((a, b) => a.order - b.order);
  } catch {
    return null;
  }
}

/** Visible solutions, in their set order. Notion first; the JSON copy if Notion is unreachable or empty. */
export async function getSolutions(): Promise<Solution[]> {
  const live = await fromNotion();
  return live && live.length ? live : backup();
}

export async function getSolution(slug: string): Promise<Solution | null> {
  return (await getSolutions()).find(s => s.slug === slug) || null;
}

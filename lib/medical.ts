import data from '@/content/medical.json';
import {insights, latestNotes, type Bi, type InsightLink} from '@/lib/insights';
import {isArchived} from '@/lib/visibility';

/** Healthcare sectors and fields for the preview. Edited from /admin («الهيكل الطبي»). */
export type {Bi};
export type MedicalField = {id: string; focus: boolean; title: Bi; line?: Bi};
export type MedicalSector = {slug: string; title: Bi; problem: Bi; fieldIds: string[]};
export type MedicalStep = {id: string; href: string; title: Bi; text: Bi};
export type MedicalPart = {title: Bi; text: Bi};
export type MedicalTrackStep = {id: string; title: Bi; text: Bi};
export type Medical = {
  home: {eyebrow: Bi; title: Bi; intro: Bi; fieldsLink: Bi};
  fieldsPage: {eyebrow: Bi; title: Bi; intro: Bi; now: Bi; later: Bi; soon: Bi; starLabel: Bi; sectorsHeading: Bi};
  sectors: MedicalSector[];
  fields: MedicalField[];
  fieldsNote: Bi;
  identity: {eyebrow: Bi; title: Bi; problem: Bi; insights: Bi};
  education: {
    eyebrow: Bi; title: Bi; intro: Bi;
    general: MedicalPart; specific: MedicalPart;
    formatsTitle: Bi; formats: MedicalPart[];
    starting: Bi; communityTitle: Bi; community: Bi;
  };
  system: {
    eyebrow: Bi; title: Bi; intro: Bi;
    generalTitle: Bi; generalIntro: Bi; general: MedicalTrackStep[];
    customTitle: Bi; custom: Bi; bridge: Bi;
  };
  work: {eyebrow: Bi; title: Bi; intro: Bi; steps: MedicalStep[]};
  insightsBlock: {title: Bi; intro: Bi; empty: Bi; future: Bi; all: Bi};
  session: {title: Bi; text: Bi; button: Bi};
  cross: {fields: Bi; others: Bi; who: Bi; education: Bi; system: Bi};
};

export const medical: Medical = data;

const fieldById = new Map(medical.fields.map(field => [field.id, field]));

export const sectorBySlug = (slug: string): MedicalSector | undefined => medical.sectors.find(sector => sector.slug === slug);

/** Fields for a sector, focus fields first, in the order stored on the sector. Unknown ids are dropped. */
export const fieldsForSector = (sector: MedicalSector): MedicalField[] =>
  sector.fieldIds.map(id => fieldById.get(id)).filter((field): field is MedicalField => Boolean(field));

export const focusFields = (): MedicalField[] => medical.fields.filter(field => field.focus);
export const laterFields = (): MedicalField[] => medical.fields.filter(field => !field.focus);

export type SectorInsight = {href: string; title: Bi; date: string};

const tagsOf = (item: object): string[] => {
  const tags = (item as {tags?: unknown}).tags;
  return Array.isArray(tags) ? tags.filter((tag): tag is string => typeof tag === 'string') : [];
};

const pushLink = (out: SectorInsight[], slug: string, item: InsightLink, href: string | undefined) => {
  if (!href || !tagsOf(item).includes(slug)) return;
  if (href.startsWith('/') && isArchived(href)) return;
  out.push({href, title: item.title, date: item.date ?? ''});
};

/**
 * Latest Insights for a sector. An item counts only when its data carries a `tags` array
 * containing the sector slug. Untagged items are not guessed into a sector.
 */
export function insightsForSector(slug: string): SectorInsight[] {
  const out: SectorInsight[] = [];
  for (const note of latestNotes()) {
    if (!tagsOf(note).includes(slug) || isArchived(`/insights/notes/${note.slug}`)) continue;
    out.push({href: `/insights/notes/${note.slug}`, title: note.title, date: note.date});
  }
  for (const report of insights.reports) pushLink(out, slug, report, report.page);
  for (const article of insights.articles) pushLink(out, slug, article, article.page ?? article.url);
  for (const paper of insights.research) pushLink(out, slug, paper, paper.page ?? paper.preprint);
  for (const framework of insights.frameworks) {
    const href = `/insights/frameworks/${framework.slug}`;
    if (!tagsOf(framework).includes(slug) || isArchived(href)) continue;
    out.push({href, title: framework.title, date: ''});
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}

import data from '@/content/insights.json';
import {isArchived} from '@/lib/visibility';

/** VisionSeek Insights — the public face of the learning engine. Edited from /admin («VisionSeek Insights»). */
export type Bi = {en: string; ar: string};
export type InsightNote = {slug: string; number: string; date: string; dateLabel: Bi; status: Bi; title: Bi; subtitle: Bi; teaser: Bi; teaserNote: Bi; notice: Bi; blocks: {heading: Bi; text: Bi}[]; comingHeading: Bi; coming: Bi[]; follow: Bi};
export type InsightFramework = {slug: string; order: Bi; title: Bi; status: Bi; text: Bi};
export type InsightLink = {title: Bi; summary?: Bi; url?: string; pdf?: string; pdfLang?: 'ar' | 'en'; journal?: string; preprint?: string; date?: string; kind?: Bi; page?: string; doi?: string; related?: {href: string; label: Bi}};
export type Insights = {
  hub: {title: Bi; intro: Bi; latest: Bi; readNote: Bi};
  sections: Record<'reports' | 'articles' | 'notes' | 'frameworks' | 'research', {title: Bi; intro: Bi}>;
  notes: InsightNote[];
  frameworks: InsightFramework[];
  reports: InsightLink[];
  articles: InsightLink[];
  research: InsightLink[];
  newsletter: Record<'title' | 'text' | 'label' | 'button' | 'privacy' | 'success' | 'exists' | 'invalid' | 'error' | 'cta', Bi>;
};
export const insights = data as unknown as Insights;
export const latestNotes = (): InsightNote[] => insights.notes.filter(n => !isArchived(`/insights/notes/${n.slug}`)).sort((a, b) => (a.date < b.date ? 1 : -1));
export const noteBySlug = (slug: string) => insights.notes.find(n => n.slug === slug);
export const frameworkBySlug = (slug: string) => insights.frameworks.find(f => f.slug === slug);

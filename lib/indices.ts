import data from '@/content/indices.json';
import {isArchived} from '@/lib/visibility';

/** VisionSeek Indices — forthcoming measuring-body reports. Edited from /admin («المؤشرات»). */
export type Bi = {en: string; ar: string};
export type IndexStatus = 'upcoming' | 'published';
export type IndexPillar = {id: string; name: Bi};
export type IndexPrinciple = {id: string; title: Bi; text: Bi};
export type IndexEntry = {
  slug: string;
  status: IndexStatus;
  statusLabel: Bi;
  title: Bi;
  shortTitle: Bi;
  subtitle: Bi;
  heroImage: string;
  heroAlt: Bi;
  lede: Bi;
  measuresTitle: Bi;
  measures: Bi;
  pillarsTitle: Bi;
  pillarsIntro: Bi;
  pillars: IndexPillar[];
  principlesTitle: Bi;
  principles: IndexPrinciple[];
  methodologyTitle: Bi;
  methodology: Bi;
  pilotTitle: Bi;
  pilot: Bi;
  audienceTitle: Bi;
  audience: Bi;
  resultsTitle: Bi;
  results: Bi;
};
export type IndicesContent = {
  hub: {
    eyebrow: Bi;
    title: Bi;
    intro: Bi;
    measuringBodyTitle: Bi;
    measuringBody: Bi;
    empty: Bi;
    catalogTitle: Bi;
    catalogIntro: Bi;
    openIndex: Bi;
    home: Bi;
    back: Bi;
  };
  notify: {label: Bi; hint: Bi; email: string; subject: Bi};
  indices: IndexEntry[];
};

export const indicesContent = data as IndicesContent;

export const indexPath = (slug: string) => `/indices/${slug}`;

/** Live indices: archived slugs stay in the JSON and disappear from the public list. */
export const liveIndices = (): IndexEntry[] =>
  indicesContent.indices.filter(item => !isArchived(indexPath(item.slug)));

export const indexBySlug = (slug: string) => liveIndices().find(item => item.slug === slug);

export function notifyMailto(locale: 'ar' | 'en'): string {
  const {email, subject} = indicesContent.notify;
  const params = new URLSearchParams();
  params.set('subject', subject[locale]);
  return `mailto:${email}?${params.toString().replace(/\+/g, '%20')}`;
}

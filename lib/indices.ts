import data from '@/content/indices.json';
import {isArchived} from '@/lib/visibility';

/** VisionSeek Indices — measuring-body products. Edited from /admin («المؤشرات»). */
export type Bi = {en: string; ar: string};
export type IndexStatus = 'upcoming' | 'published';
export type IndexPillar = {id: string; name: Bi};
export type IndexPrinciple = {id: string; title: Bi; text: Bi};
export type ScaleRung = {id: string; code?: string; name: Bi; text: Bi};
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
export type ProductCta = 'method' | 'principles' | 'follow' | 'about';
export type HubProduct = {
  id: string;
  slug: string;
  named: boolean;
  cta: ProductCta;
  title: Bi;
  definition: Bi;
  question: Bi;
  unit: Bi;
  output: Bi;
  cadence: Bi;
  status: Bi;
};
export type IndicesContent = {
  hub: {
    eyebrow: Bi;
    title: Bi;
    thesis: Bi;
    intro: Bi;
    readMethodology: Bi;
    followEdition: Bi;
    measuringBodyTitle: Bi;
    measuringBody: Bi;
    empty: Bi;
    catalogTitle: Bi;
    catalogIntro: Bi;
    aboutProduct: Bi;
    ctaMethod: Bi;
    ctaPrinciples: Bi;
    ctaFollow: Bi;
    home: Bi;
    back: Bi;
    mapTitle: Bi;
    mapIntro: Bi;
    mapPilotLabel: Bi;
    mapLaterLabel: Bi;
    measureTitle: Bi;
    measureIntro: Bi;
    measureAtlasNote: Bi;
    ladderTitle: Bi;
    ladder: ScaleRung[];
    atlasScaleTitle: Bi;
    atlasScale: ScaleRung[];
    evidenceScaleTitle: Bi;
    evidenceScale: ScaleRung[];
    unitTitle: Bi;
    unitText: Bi;
    validityTitle: Bi;
    validityText: Bi;
    downloadLabel: Bi;
    citeTitle: Bi;
    citeHow: Bi;
    releaseMethodology: Bi;
    releaseEdition: Bi;
    previousEditionsTitle: Bi;
    showPreviousEditions: boolean;
    principlesTitle: Bi;
    principles: IndexPrinciple[];
    pressTitle: Bi;
    pressIntro: Bi;
    downloadArLabel: Bi;
    downloadEnLabel: Bi;
    downloadArHref: string;
    downloadEnHref: string;
    teamEmailLabel: Bi;
    relatedTitle: Bi;
    relatedLine: Bi;
    reportsLabel: Bi;
    reportsHref: string;
    programsLabel: Bi;
    programsHref: string;
    diagramTitle: Bi;
    diagramIntro: Bi;
    diagramSourceName: Bi;
    diagramSourceRole: Bi;
    diagramFeeds: Bi;
    diagramIndexName: Bi;
    diagramIndexRole: Bi;
    diagramListRole: Bi;
    technologiesTitle: Bi;
    questionLabel: Bi;
    unitLabel: Bi;
    outputLabel: Bi;
    cadenceLabel: Bi;
    statusFieldLabel: Bi;
    methodologyLabel: Bi;
    methodologyName: Bi;
    methodologyHref: string;
  };
  products: HubProduct[];
  notify: {label: Bi; hint: Bi; email: string; subject: Bi};
  indices: IndexEntry[];
};

export const indicesContent = data as IndicesContent;

export const indexPath = (slug: string) => `/indices/${slug}`;

/** Live indices: archived slugs stay in the JSON and disappear from the public list. */
export const liveIndices = (): IndexEntry[] =>
  indicesContent.indices.filter(item => !isArchived(indexPath(item.slug)));

export const liveHubProducts = (): HubProduct[] =>
  indicesContent.products.filter(item => !item.slug || !isArchived(indexPath(item.slug)));

export const indexBySlug = (slug: string) => liveIndices().find(item => item.slug === slug);

export const sevenTechnologies = (): IndexPillar[] =>
  indicesContent.indices.find(item => item.slug === 'arab-technology-capability')?.pillars ?? [];

export function notifyMailto(locale: 'ar' | 'en'): string {
  const {email, subject} = indicesContent.notify;
  const params = new URLSearchParams();
  params.set('subject', subject[locale]);
  return `mailto:${email}?${params.toString().replace(/\+/g, '%20')}`;
}

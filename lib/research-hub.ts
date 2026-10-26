import data from '@/content/research.json';

/** Public research hub (/research, /ar/research). One JSON file; a DOI and Zenodo URL turn the card live. */
export type Bi = {en: string; ar: string};
export type ResearchLink = {href: string; label: Bi};
export type TrustItem = {
  id: string;
  kind?: 'doiCount' | string;
  value?: Bi;
  href?: string;
  caption: Bi;
};
export type StrengthItem = {id: string; title: Bi; text: Bi; link?: ResearchLink};
export type ResearchPaper = {
  id: string;
  title: Bi;
  topic: Bi;
  summary: Bi;
  author: Bi;
  year?: number;
  doi: string | null;
  url?: string | null;
  datasetUrl?: string | null;
  citation?: string | null;
};
export type ResearchHub = {
  hub: {title: Bi; brandline: Bi; headline: Bi; intro: Bi};
  trust: {label: Bi; items: TrustItem[]};
  strengths: {title: Bi; quote: Bi; items: StrengthItem[]};
  papersHeading: {title: Bi; preprint: Bi};
  cta: {
    available: Bi;
    pending: Bi;
    data: Bi;
    citation: Bi;
    copied: Bi;
    copyError: Bi;
  };
  standards: {title: Bi; items: StrengthItem[]};
  researcher: {
    title: Bi;
    name: Bi;
    degree: Bi;
    affiliation: Bi;
    orcid: string;
    orcidUrl: string;
    orcidLabel: Bi;
    photo: string;
    photoAlt: Bi;
    priorLabel: Bi;
    prior: Bi;
    priorHref: string;
    priorDoi: string;
  };
  papers: ResearchPaper[];
};

export const research = data as ResearchHub;

const asAbsoluteUrl = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : null;
};

export const paperDoiHref = (doi: string | null | undefined): string | null => {
  const absolute = asAbsoluteUrl(doi);
  if (absolute) return absolute;
  if (!doi) return null;
  const value = doi.trim();
  if (!value) return null;
  return `https://doi.org/${value}`;
};

export const paperRecordHref = (paper: Pick<ResearchPaper, 'doi' | 'url'>): string | null =>
  asAbsoluteUrl(paper.url) || paperDoiHref(paper.doi);

export const paperDatasetHref = (paper: Pick<ResearchPaper, 'datasetUrl'>): string | null =>
  asAbsoluteUrl(paper.datasetUrl);

export const paperDoiLabel = (doi: string | null | undefined): string | null => {
  if (!doi) return null;
  const value = doi.trim();
  if (!value) return null;
  return value.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '');
};

export const publishedDoiCount = (papers: ResearchPaper[]): number =>
  papers.filter(paper => Boolean(paperDoiHref(paper.doi))).length;

export const paperApaCitation = (paper: ResearchPaper): string => {
  const stored = paper.citation?.trim();
  if (stored) return stored;
  const year = paper.year ?? '';
  const doi = paperDoiHref(paper.doi);
  const title = paper.title.en.trim();
  const yearPart = year ? ` (${year}).` : '.';
  const doiPart = doi ? ` ${doi}` : '';
  return `Abdelalim, A.${yearPart} ${title} [Preprint]. Zenodo.${doiPart}`.replace(/\s+/g, ' ').trim();
};

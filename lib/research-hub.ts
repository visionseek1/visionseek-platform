import data from '@/content/research.json';

/** Public research hub (/research, /ar/research). One JSON file; a DOI and Zenodo URL turn the card live. */
export type Bi = {en: string; ar: string};
export type ResearchPaper = {
  id: string;
  title: Bi;
  topic: Bi;
  summary: Bi;
  author: Bi;
  doi: string | null;
  url?: string | null;
};
export type ResearchHub = {
  hub: {title: Bi; brandline: Bi; intro: Bi; count: Bi};
  cta: {available: Bi; pending: Bi};
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

export const paperDoiLabel = (doi: string | null | undefined): string | null => {
  if (!doi) return null;
  const value = doi.trim();
  if (!value) return null;
  return value.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '');
};

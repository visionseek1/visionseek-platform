import data from '@/content/research.json';

/** Public research hub (/research, /ar/research). One JSON file; drop a DOI when a paper is on Zenodo. */
export type Bi = {en: string; ar: string};
export type ResearchPaper = {
  id: string;
  title: Bi;
  topic: Bi;
  summary: Bi;
  author: Bi;
  doi: string | null;
};
export type ResearchHub = {
  hub: {title: Bi; brandline: Bi; intro: Bi; count: Bi};
  cta: {available: Bi; pending: Bi};
  papers: ResearchPaper[];
};

export const research = data as ResearchHub;

export const paperDoiHref = (doi: string | null | undefined): string | null => {
  if (!doi) return null;
  const value = doi.trim();
  if (!value) return null;
  return value.startsWith('http://') || value.startsWith('https://') ? value : `https://doi.org/${value}`;
};

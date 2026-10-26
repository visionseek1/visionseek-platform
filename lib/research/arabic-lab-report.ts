/** Shared types for Arabic VisionSeek Lab reports (v1.1). */
export type Bi = {ar: string; en: string};

export type ReportTable = {
  heading?: string;
  columns: string[];
  rows: {cells: string[]; strong?: boolean}[];
  note?: string;
};

export type ReportBlock =
  | {kind: 'prose'; text: string}
  | {kind: 'bullets'; items: string[]}
  | {kind: 'table'; table: ReportTable; exhibit?: {no: number; title: string}}
  | {kind: 'subhead'; text: string};

export type ReportSection = {
  id: string;
  kicker: string;
  heading: Bi;
  intro?: string;
  blocks: ReportBlock[];
};

export type LabReport = {
  slug: string;
  pdfAr: string;
  cover: string;
  coverWidth: number;
  coverHeight: number;
  date: string;
  dateLabel: Bi;
  versionLabel: Bi;
  label: Bi;
  lab: string;
  title: Bi;
  question: Bi;
  deck: Bi;
  attribution: Bi;
  fullTitle: Bi;
  author: Bi;
  cardSummary: Bi;
  doi: string;
  doiUrl: string;
  doiLine: Bi;
  researchHref?: string;
  researchLabel?: Bi;
  methodologyHref: string;
  methodologyLabel: Bi;
  headline: string;
  headlineNote: string;
  notices?: string[];
  about: {heading: Bi; body: string};
  markersLegend: {
    heading: Bi;
    items: {kind: 's' | 'i' | 'p'; ar: string; en: string}[];
  };
  stats: {big: string; text: string}[];
  conclusions: {heading: Bi; items: {title: string; text: string}[]};
  sections: ReportSection[];
  questions: {heading: Bi; items: {title: string; text?: string}[]};
  method: {heading: Bi; items: {label: string; text: string}[]};
  notes?: {heading: string; text: string};
  closing: {heading: Bi; text: string; strong?: string};
  citation: string;
  researchCitation?: string;
};

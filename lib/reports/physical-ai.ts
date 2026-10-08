import data from '@/content/reports/physical-ai.json';

/**
 * The Physical AI government brief, shown at /reports/physical-ai and /insights/physical-ai from the same text.
 * Edited from /admin («تقرير الذكاء الاصطناعي المادي»). Plain JSON import.
 */
export type ReportSource = {name: string; title: string; url: string};
export type ReportFinding = {number: string; title: string; body: string};
export type ReportAction = {title: string; body: string};
export type ReportCopy = {
  label: string; date: string; read: string; title: string; standfirst: string;
  summaryLabel: string; summary: string;
  findingsLabel: string; findings: ReportFinding[];
  connectionLabel: string; connectionTitle: string; connection: string;
  actionLabel: string; actions: ReportAction[];
  perspectiveLabel: string; perspective: string;
  sourceLabel: string; sourceNote: string; cta: string; back: string;
};

export const sources: ReportSource[] = data.sources;
export const report: {en: ReportCopy; ar: ReportCopy} = {en: data.en, ar: data.ar};

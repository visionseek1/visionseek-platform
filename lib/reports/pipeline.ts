export type PipelineReport = {
  id: string;
  desk: string;
  status: 'preview' | 'published';
  title: { ar: string; en: string };
  judgments: { ar: string; en: string; confidence: string; change: { ar: string; en: string } }[];
  question: { ar: string; en: string };
  scope: { ar: string; en: string };
  evidence: { ar: string; en: string };
  assumptions: { ar: string; en: string };
  alternative: { ar: string; en: string };
  implication: { ar: string; en: string };
  sources: { claim: string; url: string; accessedAt: string; limit: { ar: string; en: string } }[];
};

/** Filled only from an accepted line card. Empty means the shelf stays honest. */
export const pipelineReports: PipelineReport[] = [];

export function listedReports() {
  return pipelineReports.filter(report => report.status === 'published' && report.judgments.length > 0 && report.sources.length > 0 && report.title.ar && report.title.en);
}

export function lineReport(id: string) {
  return pipelineReports.find(report => report.id === id);
}

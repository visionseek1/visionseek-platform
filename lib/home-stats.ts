import {concepts} from '@/lib/institution/programs';
import {insights} from '@/lib/insights';
import {isArchived} from '@/lib/visibility';

/**
 * Homepage proof counts. Arabic and English read these two functions,
 * so the numbers cannot drift between languages and are not typed by hand.
 */

/** Programs with a public code in content/programs — the list on /programs and /ar/programs. */
export function announcedProgramCount(): number {
  return concepts.filter(program => Boolean(program.code)).length;
}

/** Reports on the Reports hub (content/insights.json → reports) whose page is not archived. */
export function publishedReportCount(): number {
  return insights.reports.filter(report => {
    const page = report.page?.split('#')[0];
    return !page || !isArchived(page);
  }).length;
}

export function homeProofCount(id: string): number {
  if (id === 'programs') return announcedProgramCount();
  if (id === 'reports') return publishedReportCount();
  throw new Error(`Unknown homepage proof id: ${id}`);
}

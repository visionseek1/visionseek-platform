import type {Metadata} from 'next';
import {ReportsMethodology} from '@/components/insights/reports-methodology';
import {paper} from '@/lib/research/reports-methodology';

export const metadata: Metadata = {
  title: `${paper.cardTitle.ar} | VisionSeek Insights`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/insights/reports/methodology', languages: {ar: '/ar/insights/reports/methodology', en: '/insights/reports/methodology'}},
  openGraph: {title: paper.cardTitle.ar, description: paper.cardSummary.ar, url: '/ar/insights/reports/methodology', images: [{url: paper.cover, alt: paper.title.ar, width: 1600, height: 1200}]},
};
export default function Page() { return <ReportsMethodology locale="ar"/>; }

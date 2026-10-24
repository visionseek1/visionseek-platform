import type {Metadata} from 'next';
import {ReportsMethodology} from '@/components/insights/reports-methodology';
import {paper} from '@/lib/research/reports-methodology';

export const metadata: Metadata = {
  title: `${paper.cardTitle.en} | VisionSeek Insights`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/insights/reports/methodology', languages: {en: '/insights/reports/methodology', ar: '/ar/insights/reports/methodology'}},
  openGraph: {title: paper.cardTitle.en, description: paper.cardSummary.en, url: '/insights/reports/methodology', images: [{url: paper.cover, alt: paper.title.en, width: 1600, height: 1200}]},
};
export default function Page() { return <ReportsMethodology locale="en"/>; }

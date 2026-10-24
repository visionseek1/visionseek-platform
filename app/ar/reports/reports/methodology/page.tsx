import type {Metadata} from 'next';
import {ReportsMethodology} from '@/components/insights/reports-methodology';
import {paper} from '@/lib/research/reports-methodology';

export const metadata: Metadata = {
  title: `${paper.cardTitle.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/methodology', languages: {ar: '/ar/reports/reports/methodology', en: '/reports/reports/methodology'}},
  openGraph: {title: paper.cardTitle.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/methodology', images: [{url: paper.cover, alt: paper.title.ar, width: 1600, height: 1200}]},
};
export default function Page() { return <ReportsMethodology locale="ar"/>; }

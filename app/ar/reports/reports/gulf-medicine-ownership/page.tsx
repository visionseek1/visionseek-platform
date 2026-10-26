import type {Metadata} from 'next';
import {GulfMedicineOwnership} from '@/components/insights/gulf-medicine-ownership';
import {paper} from '@/lib/research/gulf-medicine-ownership';

export const metadata: Metadata = {
  title: `${paper.fullTitle.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/gulf-medicine-ownership', languages: {ar: '/ar/reports/reports/gulf-medicine-ownership', en: '/reports/reports/gulf-medicine-ownership'}},
  openGraph: {title: paper.fullTitle.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/gulf-medicine-ownership', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: paper.coverWidth, height: paper.coverHeight}]},
};
export default function Page() { return <GulfMedicineOwnership locale="ar"/>; }

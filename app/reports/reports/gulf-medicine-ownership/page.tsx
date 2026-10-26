import type {Metadata} from 'next';
import {GulfMedicineOwnership} from '@/components/insights/gulf-medicine-ownership';
import {paper} from '@/lib/research/gulf-medicine-ownership';

export const metadata: Metadata = {
  title: `${paper.fullTitle.en} | VisionSeek Reports`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/reports/reports/gulf-medicine-ownership', languages: {en: '/reports/reports/gulf-medicine-ownership', ar: '/ar/reports/reports/gulf-medicine-ownership'}},
  openGraph: {title: paper.fullTitle.en, description: paper.cardSummary.en, url: '/reports/reports/gulf-medicine-ownership', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: paper.coverWidth, height: paper.coverHeight}]},
};
export default function Page() { return <GulfMedicineOwnership locale="en"/>; }

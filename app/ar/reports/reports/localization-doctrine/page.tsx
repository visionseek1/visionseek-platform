import type {Metadata} from 'next';
import {LocalizationDoctrine} from '@/components/insights/localization-doctrine';
import {paper} from '@/lib/research/localization-doctrine';

export const metadata: Metadata = {
  title: `${paper.title.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/localization-doctrine', languages: {ar: '/ar/reports/reports/localization-doctrine', en: '/reports/reports/localization-doctrine'}},
  openGraph: {title: paper.title.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/localization-doctrine', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: 2382, height: 3369}]},
};
export default function Page() { return <LocalizationDoctrine locale="ar"/>; }

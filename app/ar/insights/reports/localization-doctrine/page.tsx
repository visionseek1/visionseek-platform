import type {Metadata} from 'next';
import {LocalizationDoctrine} from '@/components/insights/localization-doctrine';
import {paper} from '@/lib/research/localization-doctrine';

export const metadata: Metadata = {
  title: `${paper.title.ar} | VisionSeek Insights`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/insights/reports/localization-doctrine', languages: {ar: '/ar/insights/reports/localization-doctrine', en: '/insights/reports/localization-doctrine'}},
  openGraph: {title: paper.title.ar, description: paper.cardSummary.ar, url: '/ar/insights/reports/localization-doctrine', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: 2382, height: 3369}]},
};
export default function Page() { return <LocalizationDoctrine locale="ar"/>; }

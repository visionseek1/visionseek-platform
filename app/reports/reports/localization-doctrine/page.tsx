import type {Metadata} from 'next';
import {LocalizationDoctrine} from '@/components/insights/localization-doctrine';
import {paper} from '@/lib/research/localization-doctrine';

export const metadata: Metadata = {
  title: `${paper.title.en} | VisionSeek Reports`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/reports/reports/localization-doctrine', languages: {en: '/reports/reports/localization-doctrine', ar: '/ar/reports/reports/localization-doctrine'}},
  openGraph: {title: paper.title.en, description: paper.cardSummary.en, url: '/reports/reports/localization-doctrine', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: 2382, height: 3369}]},
};
export default function Page() { return <LocalizationDoctrine locale="en"/>; }

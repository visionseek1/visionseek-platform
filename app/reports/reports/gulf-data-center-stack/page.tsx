import type {Metadata} from 'next';
import {GulfDataCenterStack} from '@/components/insights/gulf-data-center-stack';
import {paper} from '@/lib/research/gulf-data-center-stack';

export const metadata: Metadata = {
  title: `${paper.fullTitle.en} | VisionSeek Reports`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/reports/reports/gulf-data-center-stack', languages: {en: '/reports/reports/gulf-data-center-stack', ar: '/ar/reports/reports/gulf-data-center-stack'}},
  openGraph: {title: paper.fullTitle.en, description: paper.cardSummary.en, url: '/reports/reports/gulf-data-center-stack', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: paper.coverWidth, height: paper.coverHeight}]},
};
export default function Page() { return <GulfDataCenterStack locale="en"/>; }

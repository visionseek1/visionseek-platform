import type {Metadata} from 'next';
import {GulfDataCenterStack} from '@/components/insights/gulf-data-center-stack';
import {paper} from '@/lib/research/gulf-data-center-stack';

export const metadata: Metadata = {
  title: `${paper.fullTitle.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/gulf-data-center-stack', languages: {ar: '/ar/reports/reports/gulf-data-center-stack', en: '/reports/reports/gulf-data-center-stack'}},
  openGraph: {title: paper.fullTitle.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/gulf-data-center-stack', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: paper.coverWidth, height: paper.coverHeight}]},
  twitter: {title: paper.fullTitle.ar, description: paper.cardSummary.ar, images: [paper.cover]},
};
export default function Page() { return <GulfDataCenterStack locale="ar"/>; }

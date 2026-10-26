import type {Metadata} from 'next';
import {PatentOwnershipMap} from '@/components/insights/patent-ownership-map';
import {paper} from '@/lib/research/patent-ownership-map';

export const metadata: Metadata = {
  title: `${paper.fullTitle.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/patent-ownership-map', languages: {ar: '/ar/reports/reports/patent-ownership-map', en: '/reports/reports/patent-ownership-map'}},
  openGraph: {title: paper.fullTitle.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/patent-ownership-map', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: 909, height: 1287}]},
};
export default function Page() { return <PatentOwnershipMap locale="ar"/>; }

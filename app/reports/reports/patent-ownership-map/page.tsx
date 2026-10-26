import type {Metadata} from 'next';
import {PatentOwnershipMap} from '@/components/insights/patent-ownership-map';
import {paper} from '@/lib/research/patent-ownership-map';

export const metadata: Metadata = {
  title: `${paper.fullTitle.en} | VisionSeek Reports`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/reports/reports/patent-ownership-map', languages: {en: '/reports/reports/patent-ownership-map', ar: '/ar/reports/reports/patent-ownership-map'}},
  openGraph: {title: paper.fullTitle.en, description: paper.cardSummary.en, url: '/reports/reports/patent-ownership-map', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: 909, height: 1287}]},
};
export default function Page() { return <PatentOwnershipMap locale="en"/>; }

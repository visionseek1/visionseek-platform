import type {Metadata} from 'next';
import {BoardAiOversightCaio} from '@/components/insights/board-ai-oversight-caio';
import {paper} from '@/lib/research/board-ai-oversight-caio';

export const metadata: Metadata = {
  title: `${paper.title.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/board-ai-oversight-caio', languages: {ar: '/ar/reports/reports/board-ai-oversight-caio', en: '/reports/reports/board-ai-oversight-caio'}},
  openGraph: {title: paper.title.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/board-ai-oversight-caio', images: [{url: paper.ogImage, alt: paper.heroAlt, width: paper.ogWidth, height: paper.ogHeight}]},
  twitter: {title: paper.title.ar, description: paper.cardSummary.ar, images: [paper.ogImage]},
};
export default function Page() { return <BoardAiOversightCaio locale="ar"/>; }

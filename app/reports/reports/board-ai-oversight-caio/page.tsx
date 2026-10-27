import type {Metadata} from 'next';
import {BoardAiOversightCaio} from '@/components/insights/board-ai-oversight-caio';
import {paper} from '@/lib/research/board-ai-oversight-caio';

export const metadata: Metadata = {
  title: `${paper.title.en} | VisionSeek Reports`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/reports/reports/board-ai-oversight-caio', languages: {en: '/reports/reports/board-ai-oversight-caio', ar: '/ar/reports/reports/board-ai-oversight-caio'}},
  openGraph: {title: paper.title.en, description: paper.cardSummary.en, url: '/reports/reports/board-ai-oversight-caio', images: [{url: paper.ogImage, alt: paper.heroAlt, width: paper.ogWidth, height: paper.ogHeight}]},
  twitter: {title: paper.title.en, description: paper.cardSummary.en, images: [paper.ogImage]},
};
export default function Page() { return <BoardAiOversightCaio locale="en"/>; }

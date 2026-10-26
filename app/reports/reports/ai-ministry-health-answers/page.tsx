import type {Metadata} from 'next';
import {AiMinistryHealthAnswers} from '@/components/insights/ai-ministry-health-answers';
import {paper} from '@/lib/research/ai-ministry-health-answers';

export const metadata: Metadata = {
  title: `${paper.fullTitle.en} | VisionSeek Reports`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/reports/reports/ai-ministry-health-answers', languages: {en: '/reports/reports/ai-ministry-health-answers', ar: '/ar/reports/reports/ai-ministry-health-answers'}},
  openGraph: {title: paper.fullTitle.en, description: paper.cardSummary.en, url: '/reports/reports/ai-ministry-health-answers', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: paper.coverWidth, height: paper.coverHeight}]},
};
export default function Page() { return <AiMinistryHealthAnswers locale="en"/>; }

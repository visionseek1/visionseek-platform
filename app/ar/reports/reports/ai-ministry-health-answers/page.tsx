import type {Metadata} from 'next';
import {AiMinistryHealthAnswers} from '@/components/insights/ai-ministry-health-answers';
import {paper} from '@/lib/research/ai-ministry-health-answers';

export const metadata: Metadata = {
  title: `${paper.fullTitle.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/ai-ministry-health-answers', languages: {ar: '/ar/reports/reports/ai-ministry-health-answers', en: '/reports/reports/ai-ministry-health-answers'}},
  openGraph: {title: paper.fullTitle.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/ai-ministry-health-answers', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: paper.coverWidth, height: paper.coverHeight}]},
};
export default function Page() { return <AiMinistryHealthAnswers locale="ar"/>; }

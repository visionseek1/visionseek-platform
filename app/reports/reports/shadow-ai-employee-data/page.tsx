import type {Metadata} from 'next';
import {ShadowAiEmployeeData} from '@/components/insights/shadow-ai-employee-data';
import {paper} from '@/lib/research/shadow-ai-employee-data';

export const metadata: Metadata = {
  title: `${paper.title.en} | VisionSeek Reports`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/reports/reports/shadow-ai-employee-data', languages: {en: '/reports/reports/shadow-ai-employee-data', ar: '/ar/reports/reports/shadow-ai-employee-data'}},
  openGraph: {title: paper.title.en, description: paper.cardSummary.en, url: '/reports/reports/shadow-ai-employee-data', images: [{url: paper.ogImage, alt: paper.heroAlt, width: paper.ogWidth, height: paper.ogHeight}]},
  twitter: {title: paper.title.en, description: paper.cardSummary.en, images: [paper.ogImage]},
};
export default function Page() { return <ShadowAiEmployeeData locale="en"/>; }

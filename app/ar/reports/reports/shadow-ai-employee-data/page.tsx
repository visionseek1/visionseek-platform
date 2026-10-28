import type {Metadata} from 'next';
import {ShadowAiEmployeeData} from '@/components/insights/shadow-ai-employee-data';
import {paper} from '@/lib/research/shadow-ai-employee-data';

export const metadata: Metadata = {
  title: `${paper.title.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/shadow-ai-employee-data', languages: {ar: '/ar/reports/reports/shadow-ai-employee-data', en: '/reports/reports/shadow-ai-employee-data'}},
  openGraph: {title: paper.title.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/shadow-ai-employee-data', images: [{url: paper.ogImage, alt: paper.heroAlt, width: paper.ogWidth, height: paper.ogHeight}]},
  twitter: {title: paper.title.ar, description: paper.cardSummary.ar, images: [paper.ogImage]},
};
export default function Page() { return <ShadowAiEmployeeData locale="ar"/>; }

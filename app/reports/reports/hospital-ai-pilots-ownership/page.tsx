import type {Metadata} from 'next';
import {HospitalAiPilotsOwnership} from '@/components/insights/hospital-ai-pilots-ownership';
import {paper} from '@/lib/research/hospital-ai-pilots-ownership';

export const metadata: Metadata = {
  title: `${paper.title.en} | VisionSeek Reports`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/reports/reports/hospital-ai-pilots-ownership', languages: {en: '/reports/reports/hospital-ai-pilots-ownership', ar: '/ar/reports/reports/hospital-ai-pilots-ownership'}},
  openGraph: {title: paper.title.en, description: paper.cardSummary.en, url: '/reports/reports/hospital-ai-pilots-ownership', images: [{url: paper.ogImage, alt: paper.heroAlt, width: paper.ogWidth, height: paper.ogHeight}]},
  twitter: {title: paper.title.en, description: paper.cardSummary.en, images: [paper.ogImage]},
};
export default function Page() { return <HospitalAiPilotsOwnership locale="en"/>; }

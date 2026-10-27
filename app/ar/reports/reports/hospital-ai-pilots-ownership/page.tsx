import type {Metadata} from 'next';
import {HospitalAiPilotsOwnership} from '@/components/insights/hospital-ai-pilots-ownership';
import {paper} from '@/lib/research/hospital-ai-pilots-ownership';

export const metadata: Metadata = {
  title: `${paper.title.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/hospital-ai-pilots-ownership', languages: {ar: '/ar/reports/reports/hospital-ai-pilots-ownership', en: '/reports/reports/hospital-ai-pilots-ownership'}},
  openGraph: {title: paper.title.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/hospital-ai-pilots-ownership', images: [{url: paper.ogImage, alt: paper.heroAlt, width: paper.ogWidth, height: paper.ogHeight}]},
  twitter: {title: paper.title.ar, description: paper.cardSummary.ar, images: [paper.ogImage]},
};
export default function Page() { return <HospitalAiPilotsOwnership locale="ar"/>; }

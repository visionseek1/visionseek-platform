import type {Metadata} from 'next';
import {ArabicTokenTax} from '@/components/insights/arabic-token-tax';
import {paper} from '@/lib/research/arabic-token-tax';

export const metadata: Metadata = {
  title: `${paper.title.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/arabic-token-tax', languages: {ar: '/ar/reports/reports/arabic-token-tax', en: '/reports/reports/arabic-token-tax'}},
  openGraph: {title: paper.title.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/arabic-token-tax', images: [{url: paper.ogImage, alt: paper.heroAlt, width: paper.ogWidth, height: paper.ogHeight}]},
  twitter: {title: paper.title.ar, description: paper.cardSummary.ar, images: [paper.ogImage]},
};
export default function Page() { return <ArabicTokenTax locale="ar"/>; }

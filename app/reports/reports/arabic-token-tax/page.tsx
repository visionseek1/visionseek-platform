import type {Metadata} from 'next';
import {ArabicTokenTax} from '@/components/insights/arabic-token-tax';
import {paper} from '@/lib/research/arabic-token-tax';

export const metadata: Metadata = {
  title: `${paper.title.en} | VisionSeek Reports`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/reports/reports/arabic-token-tax', languages: {en: '/reports/reports/arabic-token-tax', ar: '/ar/reports/reports/arabic-token-tax'}},
  openGraph: {title: paper.title.en, description: paper.cardSummary.en, url: '/reports/reports/arabic-token-tax', images: [{url: paper.ogImage, alt: paper.heroAlt, width: paper.ogWidth, height: paper.ogHeight}]},
  twitter: {title: paper.title.en, description: paper.cardSummary.en, images: [paper.ogImage]},
};
export default function Page() { return <ArabicTokenTax locale="en"/>; }

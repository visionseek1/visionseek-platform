import type {Metadata} from 'next';
import {CapabilityLedger} from '@/components/insights/capability-ledger';
import {paper} from '@/lib/research/capability-ledger';

export const metadata: Metadata = {
  title: `${paper.title.en} | VisionSeek Insights`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/insights/reports/capability-ledger', languages: {en: '/insights/reports/capability-ledger', ar: '/ar/insights/reports/capability-ledger'}},
  openGraph: {title: paper.title.en, description: paper.cardSummary.en, url: '/insights/reports/capability-ledger', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: 1600, height: 1200}]},
};
export default function Page() { return <CapabilityLedger locale="en"/>; }

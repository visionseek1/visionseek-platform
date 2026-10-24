import type {Metadata} from 'next';
import {CapabilityLedger} from '@/components/insights/capability-ledger';
import {paper} from '@/lib/research/capability-ledger';

export const metadata: Metadata = {
  title: `${paper.title.en} | VisionSeek Reports`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/reports/reports/capability-ledger', languages: {en: '/reports/reports/capability-ledger', ar: '/ar/reports/reports/capability-ledger'}},
  openGraph: {title: paper.title.en, description: paper.cardSummary.en, url: '/reports/reports/capability-ledger', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: 1600, height: 1200}]},
};
export default function Page() { return <CapabilityLedger locale="en"/>; }

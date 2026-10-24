import type {Metadata} from 'next';
import {CapabilityLedger} from '@/components/insights/capability-ledger';
import {paper} from '@/lib/research/capability-ledger';

export const metadata: Metadata = {
  title: `${paper.title.ar} | VisionSeek Insights`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/insights/reports/capability-ledger', languages: {ar: '/ar/insights/reports/capability-ledger', en: '/insights/reports/capability-ledger'}},
  openGraph: {title: paper.title.ar, description: paper.cardSummary.ar, url: '/ar/insights/reports/capability-ledger', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: 1600, height: 1200}]},
};
export default function Page() { return <CapabilityLedger locale="ar"/>; }

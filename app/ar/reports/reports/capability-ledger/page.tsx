import type {Metadata} from 'next';
import {CapabilityLedger} from '@/components/insights/capability-ledger';
import {paper} from '@/lib/research/capability-ledger';

export const metadata: Metadata = {
  title: `${paper.title.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/capability-ledger', languages: {ar: '/ar/reports/reports/capability-ledger', en: '/reports/reports/capability-ledger'}},
  openGraph: {title: paper.title.ar, description: paper.cardSummary.ar, url: '/ar/reports/reports/capability-ledger', images: [{url: paper.cover, alt: paper.fullTitle.ar, width: 1600, height: 1200}]},
};
export default function Page() { return <CapabilityLedger locale="ar"/>; }

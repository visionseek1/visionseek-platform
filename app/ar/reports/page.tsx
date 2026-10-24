import type {Metadata} from 'next';
import {InsightsHub} from '@/components/insights/pages';
import {insights} from '@/lib/insights';

export const metadata: Metadata = {
  title: 'تقارير VisionSeek | الفكرة قبل القرار',
  description: insights.hub.intro.ar,
  alternates: {canonical: '/ar/reports', languages: {en: '/reports', ar: '/ar/reports'}},
  openGraph: {title: 'تقارير VisionSeek', description: insights.hub.intro.ar, url: '/ar/reports'},
};
export default function Page() { return <InsightsHub locale="ar"/>; }

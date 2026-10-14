import type {Metadata} from 'next';
import {InsightsHub} from '@/components/insights/pages';
import {insights} from '@/lib/insights';

export const metadata: Metadata = {
  title: 'VisionSeek Insights | الفكرة قبل القرار',
  description: insights.hub.intro.ar,
  alternates: {canonical: '/ar/insights', languages: {en: '/insights', ar: '/ar/insights'}},
  openGraph: {title: 'VisionSeek Insights', description: insights.hub.intro.ar, url: '/ar/insights'},
};
export default function Page() { return <InsightsHub locale="ar"/>; }

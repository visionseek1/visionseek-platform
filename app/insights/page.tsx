import type {Metadata} from 'next';
import {InsightsHub} from '@/components/insights/pages';
import {insights} from '@/lib/insights';

export const metadata: Metadata = {
  title: 'VisionSeek Insights',
  description: insights.hub.intro.en,
  alternates: {canonical: '/insights', languages: {en: '/insights', ar: '/ar/insights'}},
  openGraph: {title: 'VisionSeek Insights', description: insights.hub.intro.en, url: '/insights'},
};
export default function Page() { return <InsightsHub locale="en"/>; }

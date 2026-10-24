import type {Metadata} from 'next';
import {InsightsHub} from '@/components/insights/pages';
import {insights} from '@/lib/insights';

export const metadata: Metadata = {
  title: 'VisionSeek Reports',
  description: insights.hub.intro.en,
  alternates: {canonical: '/reports', languages: {en: '/reports', ar: '/ar/reports'}},
  openGraph: {title: 'VisionSeek Reports', description: insights.hub.intro.en, url: '/reports'},
};
export default function Page() { return <InsightsHub locale="en"/>; }

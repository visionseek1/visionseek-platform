import type {Metadata} from 'next';
import {OG_IMAGES} from '@/lib/seo';
import {InsightsHub} from '@/components/insights/pages';
import {insights} from '@/lib/insights';

export const metadata: Metadata = {
  title: 'VisionSeek Insights',
  description: insights.hub.intro.en,
  alternates: {canonical: '/insights', languages: {en: '/insights', ar: '/ar/insights'}},
  openGraph: {images:OG_IMAGES,title: 'VisionSeek Insights', description: insights.hub.intro.en, url: '/insights'},
};
export default function Page() { return <InsightsHub locale="en"/>; }

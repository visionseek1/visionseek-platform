import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {InsightsFramework} from '@/components/insights/pages';
import {insights, frameworkBySlug} from '@/lib/insights';

type Props = {params: Promise<{slug: string}>};
export const dynamicParams = false;
export function generateStaticParams() { return insights.frameworks.map(f => ({slug: f.slug})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const f = frameworkBySlug((await params).slug); if (!f) return {};
  return {title: `${f.title.en} | VisionSeek Insights`, description: f.text.en, alternates: {canonical: `/insights/frameworks/${f.slug}`, languages: {en: `/insights/frameworks/${f.slug}`, ar: `/ar/insights/frameworks/${f.slug}`}}};
}
export default async function Page({params}: Props) {
  const f = frameworkBySlug((await params).slug); if (!f) notFound();
  return <InsightsFramework locale="en" framework={f}/>;
}

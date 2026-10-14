import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {InsightsNote} from '@/components/insights/pages';
import {insights, noteBySlug} from '@/lib/insights';

type Props = {params: Promise<{slug: string}>};
export const dynamicParams = false;
export function generateStaticParams() { return insights.notes.map(n => ({slug: n.slug})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const n = noteBySlug((await params).slug); if (!n) return {};
  return {title: `${n.number} · ${n.title.en} | VisionSeek Insights`, description: n.subtitle.en, alternates: {canonical: `/insights/notes/${n.slug}`, languages: {en: `/insights/notes/${n.slug}`, ar: `/ar/insights/notes/${n.slug}`}}};
}
export default async function Page({params}: Props) {
  const n = noteBySlug((await params).slug); if (!n) notFound();
  return <InsightsNote locale="en" note={n}/>;
}

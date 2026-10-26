import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {KoreaGateDocument} from '@/components/korea-gate/document';
import {GATE, sampleBySlug, samples} from '@/lib/korea-gate';

type Props = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return samples.map(item => ({slug: item.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const item = sampleBySlug(slug);
  if (!item) return {};
  const path = `${GATE}/samples/${slug}`;
  return {
    title: `${item.title.ar} | بوابة كوريا`,
    description: item.blurb.ar,
    alternates: {canonical: `/ar${path}`, languages: {ar: `/ar${path}`, en: path}},
  };
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  if (!sampleBySlug(slug)) notFound();
  return <KoreaGateDocument locale="ar" kind="sample" slug={slug}/>;
}

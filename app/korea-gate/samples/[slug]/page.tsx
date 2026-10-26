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
    title: `${item.title.en} | Korea Gate`,
    description: item.blurb.en,
    alternates: {canonical: path, languages: {en: path, ar: `/ar${path}`}},
  };
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  if (!sampleBySlug(slug)) notFound();
  return <KoreaGateDocument locale="en" kind="sample" slug={slug}/>;
}

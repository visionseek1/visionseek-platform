import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {PillarDetail} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {pillarBySlug, pillars, tx} from '@/lib/public-site';

export function generateStaticParams() {
  return pillars.map(pillar => ({slug: pillar.slug}));
}

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const pillar = pillarBySlug(slug);
  if (!pillar) return {};
  return pageMeta('en', `/pillars/${slug}`, tx('en', pillar.title), tx('en', pillar.sub));
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  if (!pillarBySlug(slug)) notFound();
  return <PillarDetail locale="en" slug={slug}/>;
}

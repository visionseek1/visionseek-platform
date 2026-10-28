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
  return pageMeta('ko', `/pillars/${slug}`, tx('ko', pillar.title), tx('ko', pillar.sub));
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  if (!pillarBySlug(slug)) notFound();
  return <PillarDetail locale="ko" slug={slug}/>;
}

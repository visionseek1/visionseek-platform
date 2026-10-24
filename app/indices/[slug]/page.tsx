import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {IndicesEntry} from '@/components/indices/pages';
import {indexBySlug, liveIndices} from '@/lib/indices';

type Props = {params: Promise<{slug: string}>};
export const dynamicParams = false;
export function generateStaticParams() {
  return liveIndices().map(item => ({slug: item.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const item = indexBySlug((await params).slug);
  if (!item) return {};
  return {
    title: `${item.title.en} | VisionSeek`,
    description: item.lede.en,
    alternates: {
      canonical: `/indices/${item.slug}`,
      languages: {en: `/indices/${item.slug}`, ar: `/ar/indices/${item.slug}`},
    },
    openGraph: {title: `${item.title.en} | VisionSeek`, description: item.lede.en, url: `/indices/${item.slug}`},
  };
}

export default async function Page({params}: Props) {
  const item = indexBySlug((await params).slug);
  if (!item) notFound();
  return <IndicesEntry locale="en" item={item}/>;
}

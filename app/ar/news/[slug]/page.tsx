import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {NewsDetail, newsSocialImage} from '@/components/news/pages';
import {entries, getEntry} from '@/lib/institution';
import {getNews, listNews} from '@/lib/news';

export const dynamicParams = false;

export function generateStaticParams() {
  const briefings = listNews('ar').map(item => ({slug: item.slug}));
  const legacy = entries.filter(entry => entry.section === 'news').map(entry => ({slug: entry.slug}));
  const seen = new Set<string>();
  return [...briefings, ...legacy].filter(item => (seen.has(item.slug) ? false : (seen.add(item.slug), true)));
}

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const item = getNews(slug);
  if (item) {
    const image = newsSocialImage(item);
    return {
      title: `${item.title} | VisionSeek`,
      description: item.dek,
      alternates: {canonical: `/ar/news/${slug}`, languages: {en: `/news/${slug}`, ar: `/ar/news/${slug}`}},
      openGraph: {title: item.title, description: item.dek, url: `/ar/news/${slug}`, images: [image]},
      twitter: {card: 'summary_large_image', title: item.title, description: item.dek, images: [image.url]},
      robots: item.sample ? {index: false, follow: false} : undefined,
    };
  }
  const entry = getEntry('news', slug);
  if (!entry) return {};
  return {
    title: `${entry.title.ar} | VisionSeek`,
    description: entry.summary.ar,
    alternates: {canonical: `/ar/news/${slug}`, languages: {en: `/news/${slug}`, ar: `/ar/news/${slug}`}},
    openGraph: {title: `${entry.title.ar} | VisionSeek`, description: entry.summary.ar, url: `/ar/news/${slug}`},
  };
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  const item = getNews(slug);
  if (item) return <NewsDetail locale="ar" item={item}/>;
  if (!getEntry('news', slug)) notFound();
  return <DetailPage locale="ar" sectionId="news" slug={slug}/>;
}

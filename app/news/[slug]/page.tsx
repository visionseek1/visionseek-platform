import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {NewsDetail, newsSocialImage} from '@/components/news/pages';
import {entries, getEntry} from '@/lib/institution';
import {getNews, listNews, visibleNews} from '@/lib/news';

export const dynamicParams = false;

export function generateStaticParams() {
  const briefings = visibleNews().map(item => ({slug: item.slug}));
  const english = listNews('en').map(item => ({slug: item.slug}));
  const legacy = entries.filter(entry => entry.section === 'news').map(entry => ({slug: entry.slug}));
  const seen = new Set<string>();
  return [...briefings, ...english, ...legacy].filter(item => (seen.has(item.slug) ? false : (seen.add(item.slug), true)));
}

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const item = getNews(slug);
  if (item) {
    const title = item.titleEn || item.title;
    const description = item.dekEn || item.dek;
    const image = newsSocialImage(item);
    return {
      title: `${title} | VisionSeek`,
      description,
      alternates: {canonical: `/news/${slug}`, languages: {en: `/news/${slug}`, ar: `/ar/news/${slug}`}},
      openGraph: {title, description, url: `/news/${slug}`, images: [image]},
      twitter: {card: 'summary_large_image', title, description, images: [image.url]},
      robots: item.sample ? {index: false, follow: false} : undefined,
    };
  }
  const entry = getEntry('news', slug);
  if (!entry) return {};
  return {
    title: `${entry.title.en} | VisionSeek`,
    description: entry.summary.en,
    alternates: {canonical: `/news/${slug}`, languages: {en: `/news/${slug}`, ar: `/ar/news/${slug}`}},
    openGraph: {title: `${entry.title.en} | VisionSeek`, description: entry.summary.en, url: `/news/${slug}`},
  };
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  const item = getNews(slug);
  if (item) return <NewsDetail locale="en" item={item}/>;
  if (!getEntry('news', slug)) notFound();
  return <DetailPage locale="en" sectionId="news" slug={slug}/>;
}

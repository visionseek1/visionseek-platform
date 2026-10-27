import type {Metadata} from 'next';
import {NewsHub} from '@/components/news/pages';
import {t} from '@/components/news/copy';
import {listNews} from '@/lib/news';

const items = listNews('ar');
const og = items[0];

export const metadata: Metadata = {
  title: 'أخبار | VisionSeek',
  description: t('ar', 'intro'),
  alternates: {canonical: '/ar/news', languages: {en: '/news', ar: '/ar/news'}},
  openGraph: {
    title: 'أخبار | VisionSeek',
    description: t('ar', 'intro'),
    url: '/ar/news',
    images: og ? [{url: og.ogImageSrc, alt: og.heroAlt, width: 1200, height: 630}] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أخبار | VisionSeek',
    description: t('ar', 'intro'),
    images: og ? [og.ogImageSrc] : undefined,
  },
};

export default function Page() {
  return <NewsHub locale="ar" items={items}/>;
}

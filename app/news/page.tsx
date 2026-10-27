import type {Metadata} from 'next';
import {NewsHub} from '@/components/news/pages';
import {t} from '@/components/news/copy';
import {listNews} from '@/lib/news';

const items = listNews('en');
const og = items[0];

export const metadata: Metadata = {
  title: 'News | VisionSeek',
  description: t('en', 'intro'),
  alternates: {canonical: '/news', languages: {en: '/news', ar: '/ar/news'}},
  openGraph: {
    title: 'News | VisionSeek',
    description: t('en', 'intro'),
    url: '/news',
    images: og ? [{url: og.ogImageSrc, alt: og.heroAltEn || og.heroAlt, width: 1200, height: 630}] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News | VisionSeek',
    description: t('en', 'intro'),
    images: og ? [og.ogImageSrc] : undefined,
  },
};

export default function Page() {
  return <NewsHub locale="en" items={items}/>;
}

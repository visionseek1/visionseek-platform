import type {Metadata} from 'next';
import {FellowshipPage} from '@/components/institute/fellowship-page';
import {fellowship} from '@/lib/institute';

const description = fellowship.opening.ar;

export const metadata: Metadata = {
  title: `${fellowship.title.ar} | VisionSeek`,
  description,
  alternates: {
    canonical: '/ar/institute/fellowship',
    languages: {en: '/institute/fellowship', ar: '/ar/institute/fellowship'},
  },
  openGraph: {
    title: `${fellowship.title.ar} | VisionSeek`,
    description,
    url: '/ar/institute/fellowship',
    images: [{url: fellowship.hero, width: 1280, height: 720, alt: fellowship.heroAlt.ar}],
  },
};

export default function Page() {
  return <FellowshipPage locale="ar" />;
}

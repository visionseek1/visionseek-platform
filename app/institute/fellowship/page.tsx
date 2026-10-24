import type {Metadata} from 'next';
import {FellowshipPage} from '@/components/institute/fellowship-page';
import {fellowship} from '@/lib/institute';

const description = fellowship.opening.en;

export const metadata: Metadata = {
  title: `${fellowship.title.en} | VisionSeek`,
  description,
  alternates: {
    canonical: '/institute/fellowship',
    languages: {en: '/institute/fellowship', ar: '/ar/institute/fellowship'},
  },
  openGraph: {
    title: `${fellowship.title.en} | VisionSeek`,
    description,
    url: '/institute/fellowship',
    images: [{url: fellowship.hero, width: 1280, height: 720, alt: fellowship.heroAlt.en}],
  },
};

export default function Page() {
  return <FellowshipPage locale="en" />;
}

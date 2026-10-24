import type {Metadata} from 'next';
import {IndicesHub} from '@/components/indices/pages';
import {indicesContent, liveIndices} from '@/lib/indices';

const title = `${indicesContent.hub.title.en} | VisionSeek`;
const description = indicesContent.hub.intro.en;
const first = liveIndices()[0];

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: '/indices', languages: {en: '/indices', ar: '/ar/indices'}},
  openGraph: {
    title,
    description,
    url: '/indices',
    images: first ? [{url: first.heroImage, alt: first.heroAlt.en, width: 1280, height: 720}] : undefined,
  },
};

export default function Page() {
  return <IndicesHub locale="en"/>;
}

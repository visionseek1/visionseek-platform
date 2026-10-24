import type {Metadata} from 'next';
import {IndicesHub} from '@/components/indices/pages';
import {indicesContent} from '@/lib/indices';

const title = `${indicesContent.hub.title.en} | VisionSeek`;
const description = indicesContent.hub.intro.en;

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: '/indices', languages: {en: '/indices', ar: '/ar/indices'}},
  openGraph: {title, description, url: '/indices'},
};

export default function Page() {
  return <IndicesHub locale="en"/>;
}

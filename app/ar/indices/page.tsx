import type {Metadata} from 'next';
import {IndicesHub} from '@/components/indices/pages';
import {indicesContent} from '@/lib/indices';

const title = `${indicesContent.hub.title.ar} | VisionSeek`;
const description = indicesContent.hub.intro.ar;

export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: '/ar/indices', languages: {en: '/indices', ar: '/ar/indices'}},
  openGraph: {title, description, url: '/ar/indices'},
};

export default function Page() {
  return <IndicesHub locale="ar"/>;
}

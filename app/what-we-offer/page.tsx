import type {Metadata} from 'next';
import {OfferPage} from '@/components/one/pages';
import {OG_IMAGES} from '@/lib/seo';
import {oneMessage} from '@/lib/one-message';

const o = oneMessage.offer;
export const metadata: Metadata = {
  title: `${o.title.en} | VisionSeek`,
  description: o.intro.en,
  alternates: {canonical: '/what-we-offer', languages: {en: '/what-we-offer', ar: '/ar/what-we-offer'}},
  openGraph: {title: `${o.title.en} | VisionSeek`, description: o.intro.en, url: '/what-we-offer', images: OG_IMAGES},
};
export default function Page() { return <OfferPage locale="en"/>; }

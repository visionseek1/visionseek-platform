import type {Metadata} from 'next';
import {InitiativePage} from '@/components/one/pages';
import {OG_IMAGES} from '@/lib/seo';
import {oneMessage} from '@/lib/one-message';

const it = oneMessage.initiative;
export const metadata: Metadata = {
  title: `${it.title.en} | VisionSeek`,
  description: `${it.offer.en} — ${it.period.en}. ${it.intro.en}`,
  alternates: {canonical: '/initiative', languages: {en: '/initiative', ar: '/ar/initiative'}},
  openGraph: {title: `${it.title.en} | VisionSeek`, description: `${it.offer.en} — ${it.period.en}.`, url: '/initiative', images: OG_IMAGES},
};
export default function Page() { return <InitiativePage locale="en"/>; }

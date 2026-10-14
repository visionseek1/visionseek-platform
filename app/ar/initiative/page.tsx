import type {Metadata} from 'next';
import {InitiativePage} from '@/components/one/pages';
import {OG_IMAGES} from '@/lib/seo';
import {oneMessage} from '@/lib/one-message';

const it = oneMessage.initiative;
export const metadata: Metadata = {
  title: `${it.title.ar} | VisionSeek`,
  description: `${it.offer.ar} — ${it.period.ar}. ${it.intro.ar}`,
  alternates: {canonical: '/ar/initiative', languages: {en: '/initiative', ar: '/ar/initiative'}},
  openGraph: {title: `${it.title.ar} | VisionSeek`, description: `${it.offer.ar} — ${it.period.ar}.`, url: '/ar/initiative', images: OG_IMAGES},
};
export default function Page() { return <InitiativePage locale="ar"/>; }

import type {Metadata} from 'next';
import {MasterclassPage} from '@/components/institution/masterclass-view';
import {masterclass} from '@/lib/institution/masterclass';

export const metadata: Metadata = {
  title: `${masterclass.title.ar} | VisionSeek`,
  description: masterclass.intro.ar,
  alternates: {
    canonical: '/ar/workshops/ai-in-leadership',
    languages: {en: '/workshops/ai-in-leadership', ar: '/ar/workshops/ai-in-leadership'},
  },
  openGraph: {
    title: `${masterclass.title.ar} | VisionSeek`,
    description: masterclass.intro.ar,
    url: '/ar/workshops/ai-in-leadership',
  },
};

export default function Page() {
  return <MasterclassPage locale="ar" />;
}

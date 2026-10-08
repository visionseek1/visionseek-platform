import type {Metadata} from 'next';
import {MasterclassPage} from '@/components/institution/masterclass-view';
import {masterclass} from '@/lib/institution/masterclass';

export const metadata: Metadata = {
  title: `${masterclass.title.en} | VisionSeek`,
  description: masterclass.intro.en,
  alternates: {
    canonical: '/workshops/ai-in-leadership',
    languages: {en: '/workshops/ai-in-leadership', ar: '/ar/workshops/ai-in-leadership'},
  },
  openGraph: {
    title: `${masterclass.title.en} | VisionSeek`,
    description: masterclass.intro.en,
    url: '/workshops/ai-in-leadership',
  },
};

export default function Page() {
  return <MasterclassPage locale="en" />;
}

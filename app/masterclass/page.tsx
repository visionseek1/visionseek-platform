import type {Metadata} from 'next';
import {WorkshopsIndex} from '@/components/institution/workshops-view';
import {workshopSection} from '@/lib/institution/workshops';

export const metadata: Metadata = {
  title: `${workshopSection.title.en} | VisionSeek`,
  description: workshopSection.intro.en,
  alternates: {canonical: '/masterclass', languages: {en: '/masterclass', ar: '/ar/masterclass'}},
  openGraph: {title: `${workshopSection.title.en} | VisionSeek`, description: workshopSection.intro.en, url: '/masterclass'},
};

export default function Page() {
  return <WorkshopsIndex locale="en" />;
}

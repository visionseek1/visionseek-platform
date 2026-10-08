import type {Metadata} from 'next';
import {WorkshopsIndex} from '@/components/institution/workshops-view';
import {workshopSection} from '@/lib/institution/workshops';

export const metadata: Metadata = {
  title: `${workshopSection.title.en} | VisionSeek`,
  description: workshopSection.intro.en,
  alternates: {canonical: '/workshops', languages: {en: '/workshops', ar: '/ar/workshops'}},
  openGraph: {title: `${workshopSection.title.en} | VisionSeek`, description: workshopSection.intro.en, url: '/workshops'},
};

export default function Page() {
  return <WorkshopsIndex locale="en" />;
}

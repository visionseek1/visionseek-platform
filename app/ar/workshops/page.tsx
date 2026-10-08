import type {Metadata} from 'next';
import {WorkshopsIndex} from '@/components/institution/workshops-view';
import {workshopSection} from '@/lib/institution/workshops';

export const metadata: Metadata = {
  title: `${workshopSection.title.ar} | VisionSeek`,
  description: workshopSection.intro.ar,
  alternates: {canonical: '/ar/workshops', languages: {en: '/workshops', ar: '/ar/workshops'}},
  openGraph: {title: `${workshopSection.title.ar} | VisionSeek`, description: workshopSection.intro.ar, url: '/ar/workshops'},
};

export default function Page() {
  return <WorkshopsIndex locale="ar" />;
}

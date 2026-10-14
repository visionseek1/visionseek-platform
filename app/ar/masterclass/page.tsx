import type {Metadata} from 'next';
import {OG_IMAGES} from '@/lib/seo';
import {WorkshopsIndex} from '@/components/institution/workshops-view';
import {workshopSection} from '@/lib/institution/workshops';

export const metadata: Metadata = {
  title: `${workshopSection.title.ar} | VisionSeek`,
  description: workshopSection.intro.ar,
  alternates: {canonical: '/ar/masterclass', languages: {en: '/masterclass', ar: '/ar/masterclass'}},
  openGraph: {images:OG_IMAGES,title: `${workshopSection.title.ar} | VisionSeek`, description: workshopSection.intro.ar, url: '/ar/masterclass'},
};

export default function Page() {
  return <WorkshopsIndex locale="ar" />;
}

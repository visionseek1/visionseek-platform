import type {Metadata} from 'next';
import {WorkshopsIndex} from '@/components/institution/workshops-view';
import {institute} from '@/lib/institute';

export const metadata: Metadata = {
  title: `${institute.title.en} | VisionSeek`,
  description: institute.intro.en,
  alternates: {canonical: '/institute', languages: {en: '/institute', ar: '/ar/institute'}},
  openGraph: {title: `${institute.title.en} | VisionSeek`, description: institute.intro.en, url: '/institute'},
};

export default function Page() {
  return <WorkshopsIndex locale="en" />;
}

import type {Metadata} from 'next';
import {WorkWithUsPage} from '@/components/institution/work-with-us-page';
import {getSection} from '@/lib/institution';

// Hourly, so an open competition card turns «اكتمل» soon after its deadline without a new deploy.
export const revalidate = 3600;

const section = getSection('work-with-us')!;
export const metadata: Metadata = {
  title: section.title.ar + ' | VisionSeek',
  description: section.intro.ar,
  alternates: {canonical: '/ar/work-with-us', languages: {en: '/work-with-us', ar: '/ar/work-with-us'}},
  openGraph: {title: section.title.ar + ' | VisionSeek', url: '/ar/work-with-us'},
};

export default function Page() {
  return <WorkWithUsPage locale="ar"/>;
}

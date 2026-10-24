import type {Metadata} from 'next';
import {WorkWithUsPage} from '@/components/institution/work-with-us-page';
import {plexSans} from '@/components/competitions/plex-sans';
import {getSection} from '@/lib/institution';

// Hourly, so an open competition card turns «Filled» soon after its deadline without a new deploy.
export const revalidate = 3600;

const section = getSection('work-with-us')!;
export const metadata: Metadata = {
  title: section.title.en + ' | VisionSeek',
  description: section.intro.en,
  alternates: {canonical: '/work-with-us', languages: {en: '/work-with-us', ar: '/ar/work-with-us'}},
  openGraph: {title: section.title.en + ' | VisionSeek', url: '/work-with-us'},
};

export default function Page() {
  return <WorkWithUsPage locale="en" fontClassName={plexSans.variable}/>;
}

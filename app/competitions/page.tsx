import type {Metadata} from 'next';
import {CompetitionsPage} from '@/components/competitions/competitions-page';
import {plexSans} from '@/components/competitions/plex-sans';
import {competitions} from '@/lib/competitions';

// Hourly, so an open card turns «Filled» soon after its deadline without a new deploy.
export const revalidate = 3600;

const title = `${competitions.hero.kicker.en} | VisionSeek`;
const description = competitions.hero.text.en;
export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: '/competitions', languages: {en: '/competitions', ar: '/ar/competitions'}},
  openGraph: {title, description, url: '/competitions'},
};

export default function Page() {
  return <CompetitionsPage locale="en" fontClassName={plexSans.variable}/>;
}

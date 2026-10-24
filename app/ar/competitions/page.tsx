import type {Metadata} from 'next';
import {CompetitionsPage} from '@/components/competitions/competitions-page';
import {competitions} from '@/lib/competitions';

// Hourly, so an open card turns «اكتمل» soon after its deadline without a new deploy.
export const revalidate = 3600;

const title = `${competitions.hero.kicker.ar} | VisionSeek`;
const description = competitions.hero.text.ar;
export const metadata: Metadata = {
  title,
  description,
  alternates: {canonical: '/ar/competitions', languages: {en: '/competitions', ar: '/ar/competitions'}},
  openGraph: {title, description, url: '/ar/competitions'},
};

export default function Page() {
  return <CompetitionsPage locale="ar"/>;
}

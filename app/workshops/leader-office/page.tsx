import type {Metadata} from 'next';
import {LeaderOfficePage} from '@/components/institution/masterclass-view';
import {leaderOffice} from '@/lib/institution/masterclass';

export const metadata: Metadata = {
  title: `${leaderOffice.title.en} | VisionSeek`,
  description: leaderOffice.lede.en,
  alternates: {
    canonical: '/workshops/leader-office',
    languages: {en: '/workshops/leader-office', ar: '/ar/workshops/leader-office'},
  },
  openGraph: {
    title: `${leaderOffice.title.en} | VisionSeek`,
    description: leaderOffice.lede.en,
    url: '/workshops/leader-office',
  },
};

export default function Page() {
  return <LeaderOfficePage locale="en" />;
}

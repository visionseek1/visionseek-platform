import type {Metadata} from 'next';
import {LeaderOfficePage} from '@/components/institution/masterclass-view';
import {leaderOffice} from '@/lib/institution/masterclass';

export const metadata: Metadata = {
  title: `${leaderOffice.title.ar} | VisionSeek`,
  description: leaderOffice.lede.ar,
  alternates: {
    canonical: '/ar/workshops/leader-office',
    languages: {en: '/workshops/leader-office', ar: '/ar/workshops/leader-office'},
  },
  openGraph: {
    title: `${leaderOffice.title.ar} | VisionSeek`,
    description: leaderOffice.lede.ar,
    url: '/ar/workshops/leader-office',
  },
};

export default function Page() {
  return <LeaderOfficePage locale="ar" />;
}

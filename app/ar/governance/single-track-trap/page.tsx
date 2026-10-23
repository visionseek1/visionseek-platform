import type {Metadata} from 'next';
import {MasterclassPage} from '@/components/governance/course';
import {workshop} from '@/lib/governance';

const title = `${workshop.subtitle.ar} | VisionSeek`;

export const metadata: Metadata = {
  title,
  description: workshop.promise.ar,
  alternates: {
    canonical: '/ar/governance/single-track-trap',
    languages: {ar: '/ar/governance/single-track-trap', en: '/governance/single-track-trap'},
  },
  openGraph: {
    title,
    description: workshop.subtitle.ar,
    url: '/ar/governance/single-track-trap',
    images: [{url: workshop.cover, width: 1280, height: 720, alt: workshop.coverAlt.ar}],
  },
};

export default function Page() {
  return <MasterclassPage locale="ar" />;
}

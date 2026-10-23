import type {Metadata} from 'next';
import {MasterclassPage} from '@/components/governance/course';
import {coursePath, localePath, workshop} from '@/lib/governance';

const title = `${workshop.subtitle.ar} | VisionSeek`;

export const metadata: Metadata = {
  title,
  description: workshop.blurb.ar,
  alternates: {
    canonical: localePath('ar', coursePath),
    languages: {ar: localePath('ar', coursePath), en: coursePath},
  },
  openGraph: {
    title,
    description: workshop.subtitle.ar,
    url: localePath('ar', coursePath),
    images: [{url: workshop.cover, width: 1280, height: 720, alt: workshop.coverAlt.ar}],
  },
};

export default function Page() {
  return <MasterclassPage locale="ar" />;
}

import type {Metadata} from 'next';
import {MasterclassPage} from '@/components/governance/course';
import {coursePath, localePath, workshop} from '@/lib/governance';

const title = `${workshop.title.en} | VisionSeek`;

export const metadata: Metadata = {
  title,
  description: workshop.blurb.en.replace(/\s*\n+\s*/g, ' '),
  alternates: {
    canonical: coursePath,
    languages: {en: coursePath, ar: localePath('ar', coursePath)},
  },
  openGraph: {
    title,
    description: workshop.blurb.en.replace(/\s*\n+\s*/g, ' '),
    url: coursePath,
    images: [{url: workshop.cover, width: 1280, height: 720, alt: workshop.coverAlt.en}],
  },
};

export default function Page() {
  return <MasterclassPage locale="en" />;
}

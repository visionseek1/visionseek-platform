import type {Metadata} from 'next';
import {GovernanceIndex} from '@/components/governance/course';
import {governance} from '@/lib/governance';

const title = `${governance.section.title.en} | VisionSeek`;

export const metadata: Metadata = {
  title,
  description: governance.section.intro.en,
  alternates: {canonical: '/governance', languages: {en: '/governance', ar: '/ar/governance'}},
  openGraph: {
    title,
    description: governance.section.intro.en,
    url: '/governance',
    images: [{url: '/governance/cover.jpg', width: 1280, height: 720, alt: governance.workshop.coverAlt.en}],
  },
};

export default function Page() {
  return <GovernanceIndex locale="en" />;
}

import type {Metadata} from 'next';
import {GovernanceIndex} from '@/components/governance/course';
import {governance} from '@/lib/governance';

const title = `${governance.section.title.ar} | VisionSeek`;

export const metadata: Metadata = {
  title,
  description: governance.section.intro.ar,
  alternates: {canonical: '/ar/governance', languages: {en: '/governance', ar: '/ar/governance'}},
  openGraph: {
    title,
    description: governance.section.intro.ar,
    url: '/ar/governance',
    images: [{url: '/governance/cover.jpg', width: 1280, height: 720, alt: governance.workshop.coverAlt.ar}],
  },
};

export default function Page() {
  return <GovernanceIndex locale="ar" />;
}

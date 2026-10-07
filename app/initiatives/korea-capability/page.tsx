import type { Metadata } from 'next';
import { KoreaInitiative } from '@/components/initiatives/initiatives-page';

export const metadata: Metadata = {
  title: 'Korea Capability Empowerment | VisionSeek',
  description: 'A VisionSeek initiative in preparation. Training, tools, and a working path. Not vehicle trading.',
  alternates: { canonical: '/initiatives/korea-capability', languages: { en: '/initiatives/korea-capability', ar: '/ar/initiatives/korea-capability' } },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <KoreaInitiative locale="en" />;
}

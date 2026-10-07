import type { Metadata } from 'next';
import { KoreaInitiative } from '@/components/initiatives/initiatives-page';

export const metadata: Metadata = {
  title: 'Forge | VisionSeek',
  description: 'Forge by VisionSeek, from Korea. In preparation. Training, tools, and a way of working. Not vehicle trading.',
  alternates: { canonical: '/initiatives/korea-capability', languages: { en: '/initiatives/korea-capability', ar: '/ar/initiatives/korea-capability' } },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <KoreaInitiative locale="en" />;
}

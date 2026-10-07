import type { Metadata } from 'next';
import { KoreaInitiative } from '@/components/initiatives/initiatives-page';

export const metadata: Metadata = {
  title: 'Level Up Korea | VisionSeek',
  description: 'Level Up Korea by VisionSeek. In preparation. Training, tools, and a way of working. Not vehicle trading.',
  alternates: { canonical: '/initiatives/level-up-korea', languages: { en: '/initiatives/level-up-korea', ar: '/ar/initiatives/level-up-korea' } },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <KoreaInitiative locale="en" />;
}

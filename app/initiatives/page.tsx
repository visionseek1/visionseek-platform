import type { Metadata } from 'next';
import { InitiativesIndex } from '@/components/initiatives/initiatives-page';

export const metadata: Metadata = {
  title: 'Initiatives | VisionSeek',
  description: 'Long-running efforts that create capable people and organizations.',
  alternates: { canonical: '/initiatives', languages: { en: '/initiatives', ar: '/ar/initiatives' } },
};

export default function Page() {
  return <InitiativesIndex locale="en" />;
}

import type { Metadata } from 'next';
import { InitiativesIndex } from '@/components/initiatives/initiatives-page';

export const metadata: Metadata = {
  title: 'المبادرات | VisionSeek',
  description: 'جهود طويلة تبني أناسًا ومؤسسات قادرة.',
  alternates: { canonical: '/ar/initiatives', languages: { en: '/initiatives', ar: '/ar/initiatives' } },
};

export default function Page() {
  return <InitiativesIndex locale="ar" />;
}

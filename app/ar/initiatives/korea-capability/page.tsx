import type { Metadata } from 'next';
import { KoreaInitiative } from '@/components/initiatives/initiatives-page';

export const metadata: Metadata = {
  title: 'تمكين القدرة من كوريا | VisionSeek',
  description: 'مبادرة VisionSeek قيد التجهيز. تدريب وأدوات ومسار عمل. ليست تجارة مركبات.',
  alternates: { canonical: '/ar/initiatives/korea-capability', languages: { en: '/initiatives/korea-capability', ar: '/ar/initiatives/korea-capability' } },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <KoreaInitiative locale="ar" />;
}

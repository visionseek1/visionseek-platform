import type { Metadata } from 'next';
import HloPage from '@/components/hlo/hlo-page';

export const metadata: Metadata = {
  title: 'HLO — قسم البحث والتطوير لمؤسستك | VisionSeek',
  description: 'HLO هو قسم البحث والتطوير لمؤسستك في هذا العصر. ندرس واقعكم، ونرى ما أصبح ممكنًا الآن، وندخل نركّب القدرة التي ترفع فاعليتكم، ثم نطوّرها بعد أن تشتغل.',
  alternates: { canonical: '/ar/hlo', languages: { en: '/hlo', ar: '/ar/hlo' } },
  openGraph: { title: 'HLO — Highest Level One | VisionSeek', url: '/ar/hlo' },
};

export default function Page() {
  return <HloPage locale="ar" />;
}

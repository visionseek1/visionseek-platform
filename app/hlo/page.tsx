import type { Metadata } from 'next';
import HloPage from '@/components/hlo/hlo-page';

export const metadata: Metadata = {
  title: 'HLO — Your institution’s R&D | VisionSeek',
  description: 'HLO is your institution’s research and development in this era. We study your reality, see what is now possible, enter and install the capability that raises your effectiveness, then develop it after it is running.',
  alternates: { canonical: '/hlo', languages: { en: '/hlo', ar: '/ar/hlo' } },
  openGraph: { title: 'HLO — Highest Level One | VisionSeek', url: '/hlo' },
};

export default function Page() {
  return <HloPage locale="en" />;
}

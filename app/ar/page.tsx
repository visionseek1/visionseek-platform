import type {Metadata} from 'next';
import {HomeView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {hero, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ar', '/', tx('ar', hero.headline), tx('ar', hero.sub));

export default function ArabicHome() {
  return <HomeView locale="ar"/>;
}

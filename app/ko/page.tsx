import type {Metadata} from 'next';
import {HomeView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {hero, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ko', '/', tx('ko', hero.headline), tx('ko', hero.sub));

export default function KoreanHome() {
  return <HomeView locale="ko"/>;
}

import type {Metadata} from 'next';
import {PillarsView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {hero, navLabel, publicNav, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ko', '/pillars', navLabel('ko', publicNav[0]), tx('ko', hero.sub));

export default function Page() {
  return <PillarsView locale="ko"/>;
}

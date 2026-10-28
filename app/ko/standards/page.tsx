import type {Metadata} from 'next';
import {StandardsView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {hero, navLabel, publicNav, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ko', '/standards', navLabel('ko', publicNav[1]), tx('ko', hero.sub));

export default function Page() {
  return <StandardsView locale="ko"/>;
}

import type {Metadata} from 'next';
import {StandardsView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {hero, navLabel, publicNav, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ar', '/standards', navLabel('ar', publicNav[1]), tx('ar', hero.sub));

export default function Page() {
  return <StandardsView locale="ar"/>;
}

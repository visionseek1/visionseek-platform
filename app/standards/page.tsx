import type {Metadata} from 'next';
import {StandardsView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {hero, navLabel, publicNav, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('en', '/standards', navLabel('en', publicNav[1]), tx('en', hero.sub));

export default function Page() {
  return <StandardsView locale="en"/>;
}

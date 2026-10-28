import type {Metadata} from 'next';
import {PillarsView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {hero, navLabel, publicNav, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('en', '/pillars', navLabel('en', publicNav[0]), tx('en', hero.sub));

export default function Page() {
  return <PillarsView locale="en"/>;
}

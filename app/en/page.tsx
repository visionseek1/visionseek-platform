import type {Metadata} from 'next';
import {HomeView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {hero, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('en', '/', tx('en', hero.headline), tx('en', hero.sub));

export default function EnglishAliasHome() {
  return <HomeView locale="en"/>;
}

import type {Metadata} from 'next';
import {MasterclassView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {masterclass, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('en', '/executive-masterclass', tx('en', masterclass.title), tx('en', masterclass.sub));

export default function Page() {
  return <MasterclassView locale="en"/>;
}

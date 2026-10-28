import type {Metadata} from 'next';
import {MasterclassView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {masterclass, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ar', '/executive-masterclass', tx('ar', masterclass.title), tx('ar', masterclass.sub));

export default function Page() {
  return <MasterclassView locale="ar"/>;
}

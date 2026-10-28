import type {Metadata} from 'next';
import {MasterclassView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {masterclass, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ko', '/executive-masterclass', tx('ko', masterclass.title), tx('ko', masterclass.sub));

export default function Page() {
  return <MasterclassView locale="ko"/>;
}

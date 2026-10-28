import type {Metadata} from 'next';
import {ObservatoryView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {navLabel, observatoryCopy, publicNav, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ko', '/observatory', navLabel('ko', publicNav[4]), tx('ko', observatoryCopy.teardowns));

export default function Page() {
  return <ObservatoryView locale="ko"/>;
}

import type {Metadata} from 'next';
import {ObservatoryView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {navLabel, observatoryCopy, publicNav, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ar', '/observatory', navLabel('ar', publicNav[4]), tx('ar', observatoryCopy.teardowns));

export default function Page() {
  return <ObservatoryView locale="ar"/>;
}

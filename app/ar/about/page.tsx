import type {Metadata} from 'next';
import {AboutView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {direction, navLabel, publicNav, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ar', '/about', navLabel('ar', publicNav[6]), tx('ar', direction));

export default function Page() {
  return <AboutView locale="ar"/>;
}

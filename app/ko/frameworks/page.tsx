import type {Metadata} from 'next';
import {FrameworksView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {navLabel, publicNav} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ko', '/frameworks', navLabel('ko', publicNav[5]), navLabel('ko', publicNav[5]));

export default function Page() {
  return <FrameworksView locale="ko"/>;
}

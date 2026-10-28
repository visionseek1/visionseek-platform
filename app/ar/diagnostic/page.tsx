import type {Metadata} from 'next';
import {DiagnosticView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {diagnosticIntro, navLabel, publicNav, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ar', '/diagnostic', navLabel('ar', publicNav[3]), tx('ar', diagnosticIntro));

export default function Page() {
  return <DiagnosticView locale="ar"/>;
}

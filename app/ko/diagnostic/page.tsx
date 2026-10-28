import type {Metadata} from 'next';
import {DiagnosticView} from '@/components/governance/views';
import {pageMeta} from '@/components/governance/frame';
import {diagnosticIntro, navLabel, publicNav, tx} from '@/lib/public-site';

export const metadata: Metadata = pageMeta('ko', '/diagnostic', navLabel('ko', publicNav[3]), tx('ko', diagnosticIntro));

export default function Page() {
  return <DiagnosticView locale="ko"/>;
}

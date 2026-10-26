import type {Metadata} from 'next';
import {KoreaGateHub} from '@/components/korea-gate/hub';
import {meta} from '@/lib/korea-gate';

export const metadata: Metadata = {
  title: meta.title.ar,
  description: meta.description.ar,
  alternates: {canonical: '/ar/korea-gate', languages: {ar: '/ar/korea-gate', en: '/korea-gate'}},
  openGraph: {title: meta.title.ar, description: meta.description.ar, url: '/ar/korea-gate'},
};

export default function Page() {
  return <KoreaGateHub locale="ar"/>;
}

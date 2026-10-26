import type {Metadata} from 'next';
import {KoreaGateHub} from '@/components/korea-gate/hub';
import {meta} from '@/lib/korea-gate';

export const metadata: Metadata = {
  title: meta.title.en,
  description: meta.description.en,
  alternates: {canonical: '/korea-gate', languages: {en: '/korea-gate', ar: '/ar/korea-gate'}},
  openGraph: {title: meta.title.en, description: meta.description.en, url: '/korea-gate'},
};

export default function Page() {
  return <KoreaGateHub locale="en"/>;
}

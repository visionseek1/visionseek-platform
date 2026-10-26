import type {Metadata} from 'next';
import {ResearchHub} from '@/components/research/hub';
import {research} from '@/lib/research-hub';

export const metadata: Metadata = {
  title: 'الأبحاث | VisionSeek',
  description: research.hub.intro.ar,
  alternates: {canonical: '/ar/research', languages: {en: '/research', ar: '/ar/research'}},
  openGraph: {title: 'أبحاث VisionSeek', description: research.hub.intro.ar, url: '/ar/research'},
};
export default function Page() { return <ResearchHub locale="ar"/>; }

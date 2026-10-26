import type {Metadata} from 'next';
import {ResearchHub} from '@/components/research/hub';
import {research} from '@/lib/research-hub';

export const metadata: Metadata = {
  title: 'Research | VisionSeek',
  description: research.hub.headline.en,
  alternates: {canonical: '/research', languages: {en: '/research', ar: '/ar/research'}},
  openGraph: {title: 'VisionSeek Research', description: research.hub.headline.en, url: '/research'},
};
export default function Page() { return <ResearchHub locale="en"/>; }

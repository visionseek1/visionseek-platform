import type {Metadata} from 'next';
import {HalfThePicture} from '@/components/insights/half-the-picture';
import {paper} from '@/lib/research/half-the-picture';

export const metadata: Metadata = {
  title: `${paper.title.ar} | VisionSeek Insights`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/insights/research/half-the-picture', languages: {ar: '/ar/insights/research/half-the-picture', en: '/insights/research/half-the-picture'}},
};
export default function Page() { return <HalfThePicture locale="ar"/>; }

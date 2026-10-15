import type {Metadata} from 'next';
import {HalfThePicture} from '@/components/insights/half-the-picture';
import {paper} from '@/lib/research/half-the-picture';

export const metadata: Metadata = {
  title: `${paper.title.ar} | VisionSeek Insights`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/insights/reports/half-the-picture', languages: {ar: '/ar/insights/reports/half-the-picture', en: '/insights/reports/half-the-picture'}},
};
export default function Page() { return <HalfThePicture locale="ar"/>; }

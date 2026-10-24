import type {Metadata} from 'next';
import {HalfThePicture} from '@/components/insights/half-the-picture';
import {paper} from '@/lib/research/half-the-picture';

export const metadata: Metadata = {
  title: `${paper.title.ar} | تقارير VisionSeek`,
  description: paper.cardSummary.ar,
  alternates: {canonical: '/ar/reports/reports/half-the-picture', languages: {ar: '/ar/reports/reports/half-the-picture', en: '/reports/reports/half-the-picture'}},
};
export default function Page() { return <HalfThePicture locale="ar"/>; }

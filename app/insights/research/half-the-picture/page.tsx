import type {Metadata} from 'next';
import {HalfThePicture} from '@/components/insights/half-the-picture';
import {paper} from '@/lib/research/half-the-picture';

export const metadata: Metadata = {
  title: `${paper.title.en} | VisionSeek Insights`,
  description: paper.cardSummary.en,
  alternates: {canonical: '/insights/research/half-the-picture', languages: {en: '/insights/research/half-the-picture', ar: '/ar/insights/research/half-the-picture'}},
};
export default function Page() { return <HalfThePicture locale="en"/>; }

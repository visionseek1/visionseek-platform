import type {Metadata} from 'next';
import {KoreanSolutionsHub} from '@/components/korean-solutions/pages';

export const metadata: Metadata = {
  title: 'Korean Solutions | VisionSeek',
  description: 'We transfer Korean products, technology and capability to Arab companies and institutions, and root them locally.',
  alternates: {canonical: '/korean-solutions', languages: {en: '/korean-solutions', ar: '/ar/korean-solutions'}},
};
export default function Page() {
  return <KoreanSolutionsHub locale="en"/>;
}

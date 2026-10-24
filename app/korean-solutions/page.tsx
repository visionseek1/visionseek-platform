import type {Metadata} from 'next';
import {KoreanSolutionsHub} from '@/components/korean-solutions/pages';

export const metadata: Metadata = {
  title: 'Korean Solutions | VisionSeek',
  description: 'We help Arab companies and institutions transfer Korean products and technology, and localise them. We also launch initiatives that build lasting bridges between Korea and the Arab world.',
  alternates: {canonical: '/korean-solutions', languages: {en: '/korean-solutions', ar: '/ar/korean-solutions'}},
};
export default function Page() {
  return <KoreanSolutionsHub locale="en"/>;
}

import type {Metadata} from 'next';
import {KoreanSolutionsHub} from '@/components/korean-solutions/pages';
import {isLiveSite} from '@/lib/deploy';
import {getSolutions} from '@/lib/korean-solutions';

export const revalidate = 600;
export const metadata: Metadata = {
  title: 'حلول من كوريا | VisionSeek',
  description: 'محتاج منتج أو خدمة من كوريا؟ قول لـ VisionSeek. نبحث عنها، ونتحقق منها، ونوصّلها لمصر والخليج.',
  alternates: {canonical: '/ar/korean-solutions', languages: {ar: '/ar/korean-solutions', en: '/korean-solutions'}},
};
export default async function Page() {
  return <KoreanSolutionsHub locale="ar" solutions={await getSolutions()} record={isLiveSite()}/>;
}

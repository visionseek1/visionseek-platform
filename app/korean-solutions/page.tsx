import type {Metadata} from 'next';
import {KoreanSolutionsHub} from '@/components/korean-solutions/pages';
import {isLiveSite} from '@/lib/deploy';
import {getSolutions} from '@/lib/korean-solutions';

export const revalidate = 600;
export const metadata: Metadata = {
  title: 'Korean Solutions | VisionSeek',
  description: 'Need a product or service from Korea? Tell VisionSeek. We find it, check it, and deliver it to Egypt and the Gulf.',
  alternates: {canonical: '/korean-solutions', languages: {en: '/korean-solutions', ar: '/ar/korean-solutions'}},
};
export default async function Page() {
  return <KoreanSolutionsHub locale="en" solutions={await getSolutions()} record={isLiveSite()}/>;
}

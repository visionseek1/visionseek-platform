import type {Metadata} from 'next';
import {KoreanSolutionsHub} from '@/components/korean-solutions/pages';
import {getSolutions} from '@/lib/korean-solutions';

export const revalidate = 600;
export const metadata: Metadata = {title: 'Korean Solutions | VisionSeek', description: 'Korean products, solutions and technology that have proven themselves in Korea, chosen for the needs of Arab organisations, each with its proof and its route to transfer.', alternates: {canonical: '/korean-solutions', languages: {en: '/korean-solutions', ar: '/ar/korean-solutions'}}};
export default async function Page() { return <KoreanSolutionsHub locale="en" solutions={await getSolutions()}/>; }

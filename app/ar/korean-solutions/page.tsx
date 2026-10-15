import type {Metadata} from 'next';
import {KoreanSolutionsHub} from '@/components/korean-solutions/pages';
import {getSolutions} from '@/lib/korean-solutions';

export const revalidate = 600;
export const metadata: Metadata = {title: 'حلول من كوريا | VisionSeek', description: 'منتجات وحلول وتكنولوجيا كورية أثبتت نفسها في كوريا، نختارها لاحتياجات المؤسسات العربية، ومع كل منها دليله وطريق نقله.', alternates: {canonical: '/ar/korean-solutions', languages: {ar: '/ar/korean-solutions', en: '/korean-solutions'}}};
export default async function Page() { return <KoreanSolutionsHub locale="ar" solutions={await getSolutions()}/>; }

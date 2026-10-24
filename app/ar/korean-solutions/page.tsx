import type {Metadata} from 'next';
import {KoreanSolutionsHub} from '@/components/korean-solutions/pages';

export const metadata: Metadata = {
  title: 'حلول من كوريا | VisionSeek',
  description: 'ننقل إلى الشركات والمؤسسات العربية المنتجات والتكنولوجيا والقدرة الكورية، ونوطّنها في أرضها.',
  alternates: {canonical: '/ar/korean-solutions', languages: {ar: '/ar/korean-solutions', en: '/korean-solutions'}},
};
export default function Page() {
  return <KoreanSolutionsHub locale="ar"/>;
}

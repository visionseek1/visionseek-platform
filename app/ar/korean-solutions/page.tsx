import type {Metadata} from 'next';
import {KoreanSolutionsHub} from '@/components/korean-solutions/pages';

export const metadata: Metadata = {
  title: 'حلول من كوريا | VisionSeek',
  description: 'نساعد الشركات والمؤسسات العربية على نقل المنتجات والتكنولوجيا الكورية وتوطينها، ونطلق مبادرات تبني جسورًا دائمة بين كوريا والعالم العربي.',
  alternates: {canonical: '/ar/korean-solutions', languages: {ar: '/ar/korean-solutions', en: '/korean-solutions'}},
};
export default function Page() {
  return <KoreanSolutionsHub locale="ar"/>;
}

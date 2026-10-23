import type {Metadata} from 'next';
import KoreanCars from '@/components/korean-solutions/cars';

export const metadata: Metadata = {
  title: 'السيارات | حلول من كوريا',
  description: 'سيارات كورية جديدة فقط: هجين، وكهرباء، وبيت جينيسيس. من غير سعر، ومن غير مستعمل. VisionSeek تفتح الطلب.',
  alternates: {canonical: '/ar/korean-solutions/cars', languages: {ar: '/ar/korean-solutions/cars', en: '/korean-solutions/cars'}},
};

export default function Page() {
  return <KoreanCars locale="ar"/>;
}

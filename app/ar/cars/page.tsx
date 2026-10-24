import type {Metadata} from 'next';
import {CarsHub} from '@/components/cars/pages';
import {getListedCars} from '@/lib/cars';
import {isLiveSite} from '@/lib/deploy';

export const metadata: Metadata = {
  title: 'سيارات هايبرد وكهربائية | VisionSeek',
  description: 'لا توجد سيارات معروضة هنا الآن. أخبر VisionSeek بالسيارة الهايبرد أو الكهربائية التي تحتاجها من كوريا.',
  alternates: {canonical: '/ar/cars', languages: {ar: '/ar/cars', en: '/cars'}},
};
export default function Page() {
  return <CarsHub locale="ar" cars={getListedCars()} record={isLiveSite()}/>;
}

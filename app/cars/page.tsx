import type {Metadata} from 'next';
import {CarsHub} from '@/components/cars/pages';
import {getListedCars} from '@/lib/cars';
import {isLiveSite} from '@/lib/deploy';

export const metadata: Metadata = {
  title: 'Hybrid & EV cars | VisionSeek',
  description: 'There is no car inventory on this page yet. Tell VisionSeek the hybrid or electric car you want from Korea.',
  alternates: {canonical: '/cars', languages: {en: '/cars', ar: '/ar/cars'}},
};
export default function Page() {
  return <CarsHub locale="en" cars={getListedCars()} record={isLiveSite()}/>;
}

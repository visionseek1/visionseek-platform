import type {Metadata} from 'next';
import KoreanCars from '@/components/korean-solutions/cars';

export const metadata: Metadata = {
  title: 'Cars | Korean Solutions',
  description: 'New Korean cars only: hybrid, electric, and the Genesis house. No price, no used cars. VisionSeek opens the request.',
  alternates: {canonical: '/korean-solutions/cars', languages: {en: '/korean-solutions/cars', ar: '/ar/korean-solutions/cars'}},
};

export default function Page() {
  return <KoreanCars locale="en"/>;
}

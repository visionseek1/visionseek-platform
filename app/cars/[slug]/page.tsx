import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {CarDetail} from '@/components/cars/pages';
import {carTitle, getCar, getListedCars} from '@/lib/cars';
import {isLiveSite} from '@/lib/deploy';

type Props = {params: Promise<{slug: string}>};
export const dynamicParams = true;
export function generateStaticParams() { return getListedCars().map(c => ({slug: c.slug})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const c = getCar((await params).slug); if (!c) return {};
  const path = `/cars/${c.slug}`;
  const title = carTitle(c, 'en');
  return {
    title: `${title} | Hybrid & EV cars`,
    description: c.example ? 'EXAMPLE DATA for layout only. Not a real listing.' : `${title} — request this car from Korea through VisionSeek.`,
    robots: c.example ? {index: false, follow: false} : undefined,
    alternates: {canonical: path, languages: {en: path, ar: `/ar${path}`}},
  };
}
export default async function Page({params}: Props) {
  const c = getCar((await params).slug); if (!c) notFound();
  return <CarDetail locale="en" car={c} record={isLiveSite()}/>;
}

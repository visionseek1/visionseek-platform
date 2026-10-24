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
  const title = carTitle(c, 'ar');
  return {
    title: `${title} | سيارات هايبرد وكهربائية`,
    description: c.example ? 'بيانات نموذجية للتصميم فقط. ليست سيارة حقيقية.' : `${title} — اطلب هذه السيارة من كوريا عبر VisionSeek.`,
    robots: c.example ? {index: false, follow: false} : undefined,
    alternates: {canonical: `/ar${path}`, languages: {ar: `/ar${path}`, en: path}},
  };
}
export default async function Page({params}: Props) {
  const c = getCar((await params).slug); if (!c) notFound();
  return <CarDetail locale="ar" car={c} record={isLiveSite()}/>;
}

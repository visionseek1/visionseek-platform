import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {KoreanSolutionDetail} from '@/components/korean-solutions/pages';
import {isLiveSite} from '@/lib/deploy';
import {getSolution, getSolutions} from '@/lib/korean-solutions';

type Props = {params: Promise<{slug: string}>};
export const revalidate = 600;
export const dynamicParams = true;
export async function generateStaticParams() { return (await getSolutions()).map(s => ({slug: s.slug})); }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const s = await getSolution((await params).slug); if (!s) return {};
  const path = `/korean-solutions/${s.slug}`;
  return {title: `${s.title.ar} | حلول من كوريا`, description: s.problem.ar, alternates: {canonical: `/ar${path}`, languages: {ar: `/ar${path}`, en: path}}};
}
export default async function Page({params}: Props) {
  const {slug} = await params;
  const all = await getSolutions();
  const s = all.find(x => x.slug === slug); if (!s) notFound();
  const related = all.filter(x => x.slug !== s.slug && x.sector === s.sector).slice(0, 3);
  return <KoreanSolutionDetail locale="ar" s={s} related={related} record={isLiveSite()}/>;
}

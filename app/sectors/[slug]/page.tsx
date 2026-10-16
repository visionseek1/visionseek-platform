import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {SectorPage} from "@/components/preview/interior";
import {medical, sectorBySlug} from "@/lib/medical";

export const dynamicParams = false;

export function generateStaticParams() {
  return medical.sectors.map(sector => ({slug: sector.slug}));
}

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const sector = sectorBySlug(slug);
  if (!sector) return {};
  const title = `${sector.title.en} | VisionSeek`;
  const description = sector.problem.en;
  return {
    title,
    description,
    alternates: {canonical: `/sectors/${slug}`, languages: {en: `/sectors/${slug}`, ar: `/ar/sectors/${slug}`}},
    openGraph: {title, description, url: `/sectors/${slug}`},
  };
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  const sector = sectorBySlug(slug);
  if (!sector) notFound();
  return <SectorPage locale="en" sector={sector} />;
}

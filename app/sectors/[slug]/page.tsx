import {notFound, permanentRedirect} from "next/navigation";
import {medical} from "@/lib/medical";

export const dynamicParams = false;

export function generateStaticParams() {
  return medical.sectors.map(sector => ({slug: sector.slug}));
}

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  if (!medical.sectors.some(sector => sector.slug === slug)) notFound();
  permanentRedirect(`/projects#${slug}`);
}

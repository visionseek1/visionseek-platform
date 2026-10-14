import type {Metadata} from 'next';
import {OG_IMAGES} from '@/lib/seo';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {WorkshopPage} from '@/components/institution/workshops-view';
import {entries, getEntry} from '@/lib/institution';
import {getWorkshop, workshops, workshopTitle} from '@/lib/institution/workshops';

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = new Set<string>([
    ...workshops.map(item => item.slug),
    ...entries.filter(entry => entry.section === 'workshops').map(entry => entry.slug),
  ]);
  return [...slugs].map(slug => ({slug}));
}

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const workshop = getWorkshop(slug);
  if (workshop) {
    return {
      title: `${workshopTitle(workshop, 'en')} | VisionSeek`,
      description: workshop.summary.en,
      alternates: {canonical: `/masterclass/${slug}`, languages: {en: `/masterclass/${slug}`, ar: `/ar/masterclass/${slug}`}},
      openGraph: {images:OG_IMAGES,title: `${workshopTitle(workshop, 'en')} | VisionSeek`, description: workshop.summary.en, url: `/masterclass/${slug}`},
    };
  }
  const entry = getEntry('workshops', slug);
  if (!entry) return {};
  return {
    title: `${entry.title.en} | VisionSeek`,
    description: entry.summary.en,
    alternates: {canonical: `/masterclass/${slug}`, languages: {en: `/masterclass/${slug}`, ar: `/ar/masterclass/${slug}`}},
    openGraph: {images:OG_IMAGES,title: `${entry.title.en} | VisionSeek`, description: entry.summary.en, url: `/masterclass/${slug}`},
  };
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  if (getWorkshop(slug)) return <WorkshopPage locale="en" slug={slug} />;
  if (!getEntry('workshops', slug)) notFound();
  return <DetailPage locale="en" sectionId="workshops" slug={slug} />;
}

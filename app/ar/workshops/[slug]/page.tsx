import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {WorkshopPage} from '@/components/institution/workshops-view';
import {entries, getEntry} from '@/lib/institution';
import {getWorkshop, workshops} from '@/lib/institution/workshops';

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
      title: `${workshop.outcome.ar} | VisionSeek`,
      description: workshop.summary.ar,
      alternates: {canonical: `/ar/workshops/${slug}`, languages: {en: `/workshops/${slug}`, ar: `/ar/workshops/${slug}`}},
      openGraph: {title: `${workshop.outcome.ar} | VisionSeek`, description: workshop.summary.ar, url: `/ar/workshops/${slug}`},
    };
  }
  const entry = getEntry('workshops', slug);
  if (!entry) return {};
  return {
    title: `${entry.title.ar} | VisionSeek`,
    description: entry.summary.ar,
    alternates: {canonical: `/ar/workshops/${slug}`, languages: {en: `/workshops/${slug}`, ar: `/ar/workshops/${slug}`}},
    openGraph: {title: `${entry.title.ar} | VisionSeek`, description: entry.summary.ar, url: `/ar/workshops/${slug}`},
  };
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  if (getWorkshop(slug)) return <WorkshopPage locale="ar" slug={slug} />;
  if (!getEntry('workshops', slug)) notFound();
  return <DetailPage locale="ar" sectionId="workshops" slug={slug} />;
}

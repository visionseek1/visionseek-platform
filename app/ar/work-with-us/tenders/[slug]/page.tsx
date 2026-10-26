import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {TenderDetailPage} from '@/components/tenders/tender-detail';
import {getTender, tenders} from '@/lib/tenders';

export const revalidate = 3600;
export const dynamicParams = false;
export function generateStaticParams() {
  return tenders.cards.map(card => ({slug: card.id}));
}

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const card = getTender(slug);
  if (!card) return {};
  return {
    title: card.title.ar + ' | VisionSeek',
    description: card.summary.ar,
    alternates: {canonical: `/ar/work-with-us/tenders/${slug}`, languages: {en: `/work-with-us/tenders/${slug}`, ar: `/ar/work-with-us/tenders/${slug}`}},
    openGraph: {title: card.title.ar + ' | VisionSeek', description: card.summary.ar, url: `/ar/work-with-us/tenders/${slug}`},
  };
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  const card = getTender(slug);
  if (!card) notFound();
  return <TenderDetailPage card={card} locale="ar"/>;
}

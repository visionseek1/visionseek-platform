import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {KoreaGateDocument} from '@/components/korea-gate/document';
import {GATE, studies, studyBySlug} from '@/lib/korea-gate';

type Props = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return studies.map(item => ({slug: item.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const item = studyBySlug(slug);
  if (!item) return {};
  const path = `${GATE}/studies/${slug}`;
  return {
    title: `${item.title.ar} | بوابة كوريا`,
    description: item.blurb.ar,
    alternates: {canonical: `/ar${path}`, languages: {ar: `/ar${path}`, en: path}},
  };
}

export default async function Page({params}: Props) {
  const {slug} = await params;
  if (!studyBySlug(slug)) notFound();
  return <KoreaGateDocument locale="ar" kind="study" slug={slug}/>;
}

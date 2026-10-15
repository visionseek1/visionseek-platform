import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {entries,getEntry} from '@/lib/institution';
export const dynamicParams=false;
export function generateStaticParams(){return entries.filter(e=>e.section==='news').map(e=>({slug:e.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const e=getEntry('news',slug);if(!e)return {};return {title:e.title.en+' | VisionSeek',description:e.summary.en,alternates:{canonical:'/news/'+slug,languages:{en:'/news/'+slug,ar:'/ar/news/'+slug}},openGraph:{title:e.title.en+' | VisionSeek',description:e.summary.en,url:'/news/'+slug}};}
export default async function Page({params}:Props){const {slug}=await params;if(!getEntry('news',slug))notFound();return <DetailPage locale="en" sectionId="news" slug={slug}/>;}

import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {entries,getEntry} from '@/lib/institution';
export const dynamicParams=false;
export function generateStaticParams(){return entries.filter(e=>e.section==='about').map(e=>({slug:e.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const e=getEntry('about',slug);if(!e)return {};return {title:e.title.en+' | VisionSeek',description:e.summary.en,alternates:{canonical:'/about/'+slug,languages:{en:'/about/'+slug,ar:'/ar/about/'+slug}},openGraph:{title:e.title.en+' | VisionSeek',description:e.summary.en,url:'/about/'+slug}};}
export default async function Page({params}:Props){const {slug}=await params;if(!getEntry('about',slug))notFound();return <DetailPage locale="en" sectionId="about" slug={slug}/>;}

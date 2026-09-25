import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {entries,getEntry} from '@/lib/institution';
export const dynamicParams=false;
export function generateStaticParams(){return entries.filter(e=>e.section==='careers').map(e=>({slug:e.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const e=getEntry('careers',slug);if(!e)return {};return {title:e.title.en+' | VisionSeek',description:e.summary.en,alternates:{canonical:'/careers/'+slug,languages:{en:'/careers/'+slug,ar:'/ar/careers/'+slug}},openGraph:{title:e.title.en+' | VisionSeek',description:e.summary.en,url:'/careers/'+slug}};}
export default async function Page({params}:Props){const {slug}=await params;if(!getEntry('careers',slug))notFound();return <DetailPage locale="en" sectionId="careers" slug={slug}/>;}

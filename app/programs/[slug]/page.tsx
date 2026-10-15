import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {entries,getEntry} from '@/lib/institution';
export const dynamicParams=false;
export function generateStaticParams(){return entries.filter(e=>e.section==='programs').map(e=>({slug:e.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const e=getEntry('programs',slug);if(!e)return {};return {title:e.title.en+' | VisionSeek',description:e.summary.en,alternates:{canonical:'/programs/'+slug,languages:{en:'/programs/'+slug,ar:'/ar/programs/'+slug}},openGraph:{title:e.title.en+' | VisionSeek',description:e.summary.en,url:'/programs/'+slug}};}
export default async function Page({params}:Props){const {slug}=await params;if(!getEntry('programs',slug))notFound();return <DetailPage locale="en" sectionId="programs" slug={slug}/>;}

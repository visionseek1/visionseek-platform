import type {Metadata} from 'next';
import {OG_IMAGES} from '@/lib/seo';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {entries,getEntry} from '@/lib/institution';
export const dynamicParams=false;
export function generateStaticParams(){return entries.filter(e=>e.section==='programs').map(e=>({slug:e.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const e=getEntry('programs',slug);if(!e)return {};return {title:e.title.ar+' | VisionSeek',description:e.summary.ar,alternates:{canonical:'/ar/programs/'+slug,languages:{en:'/programs/'+slug,ar:'/ar/programs/'+slug}},openGraph:{images:OG_IMAGES,title:e.title.ar+' | VisionSeek',description:e.summary.ar,url:'/ar/programs/'+slug}};}
export default async function Page({params}:Props){const {slug}=await params;if(!getEntry('programs',slug))notFound();return <DetailPage locale="ar" sectionId="programs" slug={slug}/>;}

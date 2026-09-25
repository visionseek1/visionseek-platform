import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {entries,getEntry} from '@/lib/institution';
export const dynamicParams=false;
export function generateStaticParams(){return entries.filter(e=>e.section==='offices').map(e=>({slug:e.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const e=getEntry('offices',slug);if(!e)return {};return {title:e.title.ar+' | VisionSeek',description:e.summary.ar,alternates:{canonical:'/ar/offices/'+slug,languages:{en:'/offices/'+slug,ar:'/ar/offices/'+slug}},openGraph:{title:e.title.ar+' | VisionSeek',description:e.summary.ar,url:'/ar/offices/'+slug}};}
export default async function Page({params}:Props){const {slug}=await params;if(!getEntry('offices',slug))notFound();return <DetailPage locale="ar" sectionId="offices" slug={slug}/>;}

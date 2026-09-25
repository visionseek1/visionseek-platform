import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {entries,getEntry} from '@/lib/institution';
export const dynamicParams=false;
export function generateStaticParams(){return entries.filter(e=>e.section==='opportunities').map(e=>({slug:e.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const e=getEntry('opportunities',slug);if(!e)return {};return {title:e.title.en+' | VisionSeek',description:e.summary.en,alternates:{canonical:'/opportunities/'+slug,languages:{en:'/opportunities/'+slug,ar:'/ar/opportunities/'+slug}},openGraph:{title:e.title.en+' | VisionSeek',description:e.summary.en,url:'/opportunities/'+slug}};}
export default async function Page({params}:Props){const {slug}=await params;if(!getEntry('opportunities',slug))notFound();return <DetailPage locale="en" sectionId="opportunities" slug={slug}/>;}

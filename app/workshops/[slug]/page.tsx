import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {entries,getEntry} from '@/lib/institution';
export const dynamicParams=false;
export function generateStaticParams(){return entries.filter(e=>e.section==='workshops').map(e=>({slug:e.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const e=getEntry('workshops',slug);if(!e)return {};return {title:e.title.en+' | VisionSeek',description:e.summary.en,alternates:{canonical:'/workshops/'+slug,languages:{en:'/workshops/'+slug,ar:'/ar/workshops/'+slug}},openGraph:{title:e.title.en+' | VisionSeek',description:e.summary.en,url:'/workshops/'+slug}};}
export default async function Page({params}:Props){const {slug}=await params;if(!getEntry('workshops',slug))notFound();return <DetailPage locale="en" sectionId="workshops" slug={slug}/>;}

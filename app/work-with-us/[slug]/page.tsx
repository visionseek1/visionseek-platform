import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import {entries,getEntry} from '@/lib/institution';
export const dynamicParams=false;
export function generateStaticParams(){return entries.filter(e=>e.section==='work-with-us').map(e=>({slug:e.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const e=getEntry('work-with-us',slug);if(!e)return {};return {title:e.title.en+' | VisionSeek',description:e.summary.en,alternates:{canonical:'/work-with-us/'+slug,languages:{en:'/work-with-us/'+slug,ar:'/ar/work-with-us/'+slug}},openGraph:{title:e.title.en+' | VisionSeek',description:e.summary.en,url:'/work-with-us/'+slug}};}
export default async function Page({params}:Props){const {slug}=await params;if(!getEntry('work-with-us',slug))notFound();return <DetailPage locale="en" sectionId="work-with-us" slug={slug}/>;}

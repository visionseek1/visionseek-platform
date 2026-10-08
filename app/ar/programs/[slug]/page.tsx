import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DetailPage} from '@/components/institution/pages';
import OfferedProgramPage from '@/components/programs/offered-program';
import {entries,getEntry} from '@/lib/institution';
import {offeredProgramBySlug} from '@/lib/institution/offered-programs';
export const dynamicParams=false;
export function generateStaticParams(){return entries.filter(e=>e.section==='programs').map(e=>({slug:e.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const e=getEntry('programs',slug);if(!e)return {};const offered=offeredProgramBySlug(slug);const description=offered?`${offered.hook.ar} ${offered.summary.ar}`:e.summary.ar;return {title:e.title.ar+' | VisionSeek',description,alternates:{canonical:'/ar/programs/'+slug,languages:{en:'/programs/'+slug,ar:'/ar/programs/'+slug}},openGraph:{title:e.title.ar+' | VisionSeek',description,url:'/ar/programs/'+slug}};}
export default async function Page({params}:Props){const {slug}=await params;if(!getEntry('programs',slug))notFound();const offered=offeredProgramBySlug(slug);if(offered)return <OfferedProgramPage program={offered} locale="ar"/>;return <DetailPage locale="ar" sectionId="programs" slug={slug}/>;}

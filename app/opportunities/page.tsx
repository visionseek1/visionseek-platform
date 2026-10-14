import type {Metadata} from 'next';
import {OG_IMAGES} from '@/lib/seo';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('opportunities')!;
export const metadata:Metadata={title:section.title.en+' | VisionSeek',description:section.intro.en,alternates:{canonical:'/opportunities',languages:{en:'/opportunities',ar:'/ar/opportunities'}},openGraph:{images:OG_IMAGES,title:section.title.en+' | VisionSeek',url:'/opportunities'}};
export default function Page(){return <SectionPage locale="en" sectionId="opportunities"/>;}

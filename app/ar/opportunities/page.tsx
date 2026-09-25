import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('opportunities')!;
export const metadata:Metadata={title:section.title.ar+' | VisionSeek',description:section.intro.ar,alternates:{canonical:'/ar/opportunities',languages:{en:'/opportunities',ar:'/ar/opportunities'}},openGraph:{title:section.title.ar+' | VisionSeek',url:'/ar/opportunities'}};
export default function Page(){return <SectionPage locale="ar" sectionId="opportunities"/>;}

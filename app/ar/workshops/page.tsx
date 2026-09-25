import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('workshops')!;
export const metadata:Metadata={title:section.title.ar+' | VisionSeek',description:section.intro.ar,alternates:{canonical:'/ar/workshops',languages:{en:'/workshops',ar:'/ar/workshops'}},openGraph:{title:section.title.ar+' | VisionSeek',url:'/ar/workshops'}};
export default function Page(){return <SectionPage locale="ar" sectionId="workshops"/>;}

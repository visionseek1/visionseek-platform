import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('programs')!;
export const metadata:Metadata={title:section.title.ar+' | VisionSeek',description:section.intro.ar,alternates:{canonical:'/ar/programs',languages:{en:'/programs',ar:'/ar/programs'}},openGraph:{title:section.title.ar+' | VisionSeek',url:'/ar/programs'}};
export default function Page(){return <SectionPage locale="ar" sectionId="programs"/>;}

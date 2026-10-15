import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('programs')!;
export const metadata:Metadata={title:section.title.en+' | VisionSeek',description:section.intro.en,alternates:{canonical:'/programs',languages:{en:'/programs',ar:'/ar/programs'}},openGraph:{title:section.title.en+' | VisionSeek',url:'/programs'}};
export default function Page(){return <SectionPage locale="en" sectionId="programs"/>;}

import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('work-with-us')!;
export const metadata:Metadata={title:section.title.ar+' | VisionSeek',description:section.intro.ar,alternates:{canonical:'/ar/work-with-us',languages:{en:'/work-with-us',ar:'/ar/work-with-us'}},openGraph:{title:section.title.ar+' | VisionSeek',url:'/ar/work-with-us'}};
export default function Page(){return <SectionPage locale="ar" sectionId="work-with-us"/>;}

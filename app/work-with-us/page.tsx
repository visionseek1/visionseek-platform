import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('work-with-us')!;
export const metadata:Metadata={title:section.title.en+' | VisionSeek',description:section.intro.en,alternates:{canonical:'/work-with-us',languages:{en:'/work-with-us',ar:'/ar/work-with-us'}},openGraph:{title:section.title.en+' | VisionSeek',url:'/work-with-us'}};
export default function Page(){return <SectionPage locale="en" sectionId="work-with-us"/>;}

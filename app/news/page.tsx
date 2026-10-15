import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('news')!;
export const metadata:Metadata={title:section.title.en+' | VisionSeek',description:section.intro.en,alternates:{canonical:'/news',languages:{en:'/news',ar:'/ar/news'}},openGraph:{title:section.title.en+' | VisionSeek',url:'/news'}};
export default function Page(){return <SectionPage locale="en" sectionId="news"/>;}

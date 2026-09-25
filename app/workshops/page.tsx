import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('workshops')!;
export const metadata:Metadata={title:section.title.en+' | VisionSeek',description:section.intro.en,alternates:{canonical:'/workshops',languages:{en:'/workshops',ar:'/ar/workshops'}},openGraph:{title:section.title.en+' | VisionSeek',url:'/workshops'}};
export default function Page(){return <SectionPage locale="en" sectionId="workshops"/>;}

import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('offices')!;
export const metadata:Metadata={title:section.title.en+' | VisionSeek',description:section.intro.en,alternates:{canonical:'/offices',languages:{en:'/offices',ar:'/ar/offices'}},openGraph:{title:section.title.en+' | VisionSeek',url:'/offices'}};
export default function Page(){return <SectionPage locale="en" sectionId="offices"/>;}

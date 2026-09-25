import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('careers')!;
export const metadata:Metadata={title:section.title.en+' | VisionSeek',description:section.intro.en,alternates:{canonical:'/careers',languages:{en:'/careers',ar:'/ar/careers'}},openGraph:{title:section.title.en+' | VisionSeek',url:'/careers'}};
export default function Page(){return <SectionPage locale="en" sectionId="careers"/>;}

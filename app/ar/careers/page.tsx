import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('careers')!;
export const metadata:Metadata={title:section.title.ar+' | VisionSeek',description:section.intro.ar,alternates:{canonical:'/ar/careers',languages:{en:'/careers',ar:'/ar/careers'}},openGraph:{title:section.title.ar+' | VisionSeek',url:'/ar/careers'}};
export default function Page(){return <SectionPage locale="ar" sectionId="careers"/>;}

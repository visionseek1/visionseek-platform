import type {Metadata} from 'next';
import {SectionPage} from '@/components/institution/pages';
import {getSection} from '@/lib/institution';
const section = getSection('news')!;
export const metadata:Metadata={title:section.title.ar+' | VisionSeek',description:section.intro.ar,alternates:{canonical:'/ar/news',languages:{en:'/news',ar:'/ar/news'}},openGraph:{title:section.title.ar+' | VisionSeek',url:'/ar/news'}};
export default function Page(){return <SectionPage locale="ar" sectionId="news"/>;}

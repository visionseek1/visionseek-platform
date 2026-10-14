import type {Metadata} from 'next';
import StartPage from '@/components/institution/start-page';
import {projectOptions} from '@/lib/projects';
export const metadata:Metadata={title:'تواصل | VisionSeek',description:'راسل VisionSeek عن القدرة التي تحتاجها مؤسستك، عبر واتساب أو البريد.',alternates:{canonical:'/ar/start',languages:{en:'/start',ar:'/ar/start'}}};
export default function Page(){return <StartPage locale="ar" projects={projectOptions}/>;}

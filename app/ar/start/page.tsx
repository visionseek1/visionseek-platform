import type {Metadata} from 'next';
import StartPage from '@/components/institution/start-page';
import {projectOptions} from '@/lib/projects';
export const metadata:Metadata={title:'ابنِ حلولك معنا | VisionSeek',description:'ناقش تحديات مؤسستك والحلول التي تريد بناءها مع VisionSeek عبر واتساب أو البريد.',alternates:{canonical:'/ar/start',languages:{en:'/start',ar:'/ar/start'}}};
export default function Page(){return <StartPage locale="ar" projects={projectOptions}/>;}

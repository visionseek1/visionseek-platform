import type {Metadata} from 'next';
import StartPage from '@/components/institution/start-page';
import {projectOptions} from '@/lib/projects';
export const metadata:Metadata={title:'Build your solutions with us | VisionSeek',description:'Discuss your organization’s challenges and the solutions you want to build with VisionSeek, through WhatsApp or email.',alternates:{canonical:'/start',languages:{en:'/start',ar:'/ar/start'}}};
export default function Page(){return <StartPage locale="en" projects={projectOptions}/>;}

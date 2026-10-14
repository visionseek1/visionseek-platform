import type {Metadata} from 'next';
import StartPage from '@/components/institution/start-page';
import {projectOptions} from '@/lib/projects';
export const metadata:Metadata={title:'Contact | VisionSeek',description:'Write to VisionSeek about the capability your institution needs, by WhatsApp or email.',alternates:{canonical:'/start',languages:{en:'/start',ar:'/ar/start'}}};
export default function Page(){return <StartPage locale="en" projects={projectOptions}/>;}

import type {Metadata} from 'next';
import {ProjectsIndex} from '@/components/projects/project-pages';
export const metadata:Metadata={title:'Projects | VisionSeek',description:'VisionSeek project concepts: floating LNG supply security in Egypt and fleet efficiency and resilience in the Gulf.',alternates:{canonical:'/projects',languages:{en:'/projects',ar:'/ar/projects'}}};
export default function Page(){return <ProjectsIndex locale="en"/>;}

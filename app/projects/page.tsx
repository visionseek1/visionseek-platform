import type {Metadata} from 'next';
import {ProjectsIndex} from '@/components/projects/project-pages';
export const metadata:Metadata={title:'Projects | VisionSeek',description:'VisionSeek projects: tools and solutions built from what institutions need now.',alternates:{canonical:'/projects',languages:{en:'/projects',ar:'/ar/projects'}}};
export default function Page(){return <ProjectsIndex locale="en"/>;}

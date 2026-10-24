import type {Metadata} from 'next';
import {ProjectsIndex} from '@/components/projects/project-pages';
export const metadata:Metadata={title:'المشاريع | VisionSeek',description:'مشاريع VisionSeek: أدوات وحلول نبنيها مما تحتاجه المؤسسات الآن.',alternates:{canonical:'/ar/projects',languages:{en:'/projects',ar:'/ar/projects'}}};
export default function Page(){return <ProjectsIndex locale="ar"/>;}

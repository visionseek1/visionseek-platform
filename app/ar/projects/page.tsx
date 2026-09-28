import type {Metadata} from 'next';
import {ProjectsIndex} from '@/components/projects/project-pages';
export const metadata:Metadata={title:'المشاريع | VisionSeek',description:'مشاريع وأفكار VisionSeek حسب المجال: الطاقة والرقائق والطيران والدفاع والروبوتات والصحة والزراعة.',alternates:{canonical:'/ar/projects',languages:{en:'/projects',ar:'/ar/projects'}}};
export default function Page(){return <ProjectsIndex locale="ar"/>;}

import type {Metadata} from 'next';
import {ProjectsIndex} from '@/components/projects/project-pages';
export const metadata:Metadata={title:'المشاريع | VisionSeek',description:'مشروعات VisionSeek قيد الدراسة: أمن إمدادات الغاز المسال في مصر، وكفاءة ومرونة الأساطيل في الخليج.',alternates:{canonical:'/ar/projects',languages:{en:'/projects',ar:'/ar/projects'}}};
export default function Page(){return <ProjectsIndex locale="ar"/>;}

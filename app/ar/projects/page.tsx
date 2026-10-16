import type {Metadata} from 'next';
import {ProjectsIndex} from '@/components/projects/project-pages';
export const metadata:Metadata={title:'المشاريع | VisionSeek',description:'خمس جهات في القطاع الصحي: المستشفيات ومقدّمو الرعاية، شركات الأدوية والمصانع، الصيدليات والتوزيع، الحكومة والجهات الرقابية، البحث والجامعات. والمشاريع المنشورة تحت كل جهة.',alternates:{canonical:'/ar/projects',languages:{en:'/projects',ar:'/ar/projects'}}};
export default function Page(){return <ProjectsIndex locale="ar"/>;}

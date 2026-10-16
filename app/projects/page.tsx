import type {Metadata} from 'next';
import {ProjectsIndex} from '@/components/projects/project-pages';
export const metadata:Metadata={title:'Projects | VisionSeek',description:'Five parts of healthcare — hospitals and care providers, pharmaceutical companies and plants, pharmacies and distribution, government and oversight bodies, research and universities — and the projects under each.',alternates:{canonical:'/projects',languages:{en:'/projects',ar:'/ar/projects'}}};
export default function Page(){return <ProjectsIndex locale="en"/>;}

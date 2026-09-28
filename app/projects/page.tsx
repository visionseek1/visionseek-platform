import type {Metadata} from 'next';
import {ProjectsIndex} from '@/components/projects/project-pages';
export const metadata:Metadata={title:'Projects | VisionSeek',description:'Explore VisionSeek concepts by sector: energy, semiconductors, aviation, defense, robotics, health and agriculture.',alternates:{canonical:'/projects',languages:{en:'/projects',ar:'/ar/projects'}}};
export default function Page(){return <ProjectsIndex locale="en"/>;}

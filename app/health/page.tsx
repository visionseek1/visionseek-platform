import type {Metadata} from 'next';
import HealthPage from '@/components/health/health';
export const metadata:Metadata={
 title:'Health & Care | VisionSeek',
 description:'Korean innovations in diagnosis, care and rehabilitation that are already in real use, each shown with its evidence and sources and read against the needs of Egypt and the Gulf.',
 alternates:{canonical:'/health',languages:{en:'/health',ar:'/ar/health'}},
 openGraph:{title:'Health & Care | VisionSeek',url:'/health'},
};
export default function Page(){return <HealthPage locale="en"/>;}

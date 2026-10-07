import type {Metadata} from 'next';
import HealthPage from '@/components/health/health';
export const metadata:Metadata={
 title:'Health & Care | VisionSeek',
 description:'Approved, field-tested Korean innovations in health and care, each shown with its evidence and sources, read against the needs of Egypt and the Gulf.',
 alternates:{canonical:'/health',languages:{en:'/health',ar:'/ar/health'}},
 openGraph:{title:'Health & Care | VisionSeek',url:'/health'},
};
export default function Page(){return <HealthPage locale="en"/>;}

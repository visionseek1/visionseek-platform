import type {Metadata} from 'next';
import HealthPage from '@/components/health/health';
export const metadata:Metadata={title:'VisionSeek Health | Advanced Health Capability Transfer',description:'Advanced health capability transfer from Korea to institutions in the Gulf and the Arab world.',alternates:{canonical:'/health',languages:{en:'/health',ar:'/ar/health'}}};
export default function Page(){return <HealthPage locale="en"/>;}

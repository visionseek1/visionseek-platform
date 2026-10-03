import type {Metadata} from 'next';
import HealthPage from '@/components/health/health';
export const metadata:Metadata={title:'VisionSeek Health | Advanced Health Capability Transfer',description:'ننقل القدرات الصحية المتقدمة من كوريا إلى المؤسسات في الخليج والمنطقة العربية.',alternates:{canonical:'/ar/health',languages:{en:'/health',ar:'/ar/health'}}};
export default function Page(){return <HealthPage locale="ar"/>;}

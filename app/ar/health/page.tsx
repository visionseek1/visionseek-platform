import type {Metadata} from 'next';
import HealthPage from '@/components/health/health';
export const metadata:Metadata={
 title:'الصحة والرعاية | VisionSeek',
 description:'ابتكارات كورية في التشخيص والرعاية والتأهيل تعمل اليوم على أرض الواقع، كل واحد منها بدليله ومصدره، ومقروء على احتياج مصر والخليج.',
 alternates:{canonical:'/ar/health',languages:{en:'/health',ar:'/ar/health'}},
 openGraph:{title:'الصحة والرعاية | VisionSeek',url:'/ar/health'},
};
export default function Page(){return <HealthPage locale="ar"/>;}

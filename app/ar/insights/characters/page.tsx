import type {Metadata} from 'next';
import LeadersFeed from '@/components/leaders/feed';
export const metadata:Metadata={title:'موضوعات كبسولة | VisionSeek',description:'استكشف قراءات كبسولة في نقل التقنية والتصنيع والذكاء الاصطناعي والجودة والبحث الطبي.',alternates:{canonical:'/ar/insights/characters',languages:{ar:'/ar/insights/characters',en:'/insights/characters'}}};
export default function Characters(){return <LeadersFeed locale="ar" directory/>;}

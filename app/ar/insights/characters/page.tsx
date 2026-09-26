import type {Metadata} from 'next';
import LeadersFeed from '@/components/leaders/feed';
export const metadata:Metadata={title:'شخصيات بيت القادة | VisionSeek',description:'تعرّف على شخصيات VisionSeek الخمس عشرة، واستكشف مجالاتها واختر من تتابع.',alternates:{canonical:'/ar/insights/characters',languages:{ar:'/ar/insights/characters',en:'/insights/characters'}}};
export default function Characters(){return <LeadersFeed locale="ar" directory/>;}

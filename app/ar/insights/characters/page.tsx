import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {showPublicCharacters} from '@/lib/leaders/presentation';
import LeadersFeed from '@/components/leaders/feed';
export const metadata:Metadata=!showPublicCharacters?{title:'Leaders House | VisionSeek',robots:{index:false,follow:false}}:{title:'شخصيات بيت القادة | VisionSeek',description:'تعرّف على شخصيات VisionSeek الخمس عشرة، واستكشف مجالاتها واختر من تتابع.',alternates:{canonical:'/ar/insights/characters',languages:{ar:'/ar/insights/characters',en:'/insights/characters'}}};
export default function Characters(){if(!showPublicCharacters)redirect('/ar/insights');return <LeadersFeed locale="ar" directory/>;}

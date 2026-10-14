import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {showPublicCharacters} from '@/lib/leaders/presentation';
import LeadersFeed from '@/components/leaders/feed';
export const metadata:Metadata=!showPublicCharacters?{title:'Leaders House | VisionSeek',robots:{index:false,follow:false}}:{title:'شخصيات بيت القادة | VisionSeek',description:'تعرّف على شخصيات VisionSeek الخمس عشرة، واستكشف مجالاتها واختر من تتابع.',alternates:{canonical:'/ar/leaders-house/characters',languages:{ar:'/ar/leaders-house/characters',en:'/leaders-house/characters'}}};
export default function Characters(){if(!showPublicCharacters)redirect('/ar/leaders-house');return <LeadersFeed locale="ar" directory/>;}

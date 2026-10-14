import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {showPublicCharacters} from '@/lib/leaders/presentation';
import LeadersFeed from '@/components/leaders/feed';
export const metadata:Metadata=!showPublicCharacters?{title:'Leaders House | VisionSeek',robots:{index:false,follow:false}}:{title:'Meet the characters | Leaders House',description:'Meet the 15 VisionSeek editorial characters and explore their fields.',alternates:{canonical:'/leaders-house/characters',languages:{ar:'/ar/leaders-house/characters',en:'/leaders-house/characters'}}};
export default function Characters(){if(!showPublicCharacters)redirect('/leaders-house');return <LeadersFeed locale="en" directory/>;}

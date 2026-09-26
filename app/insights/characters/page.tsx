import type {Metadata} from 'next';
import LeadersFeed from '@/components/leaders/feed';
export const metadata:Metadata={title:'Meet the characters | Leaders House',description:'Meet the 15 VisionSeek editorial characters and explore their fields.',alternates:{canonical:'/insights/characters',languages:{ar:'/ar/insights/characters',en:'/insights/characters'}}};
export default function Characters(){return <LeadersFeed locale="en" directory/>;}

import type {Metadata} from 'next';
import LeadersFeed from '@/components/leaders/feed';
export const metadata:Metadata={title:'Kapsula topics | VisionSeek',description:'Explore Kapsula readings in technology transfer, manufacturing, AI, quality and medical research.',alternates:{canonical:'/insights/characters',languages:{ar:'/ar/insights/characters',en:'/insights/characters'}}};
export default function Characters(){return <LeadersFeed locale="en" directory/>;}

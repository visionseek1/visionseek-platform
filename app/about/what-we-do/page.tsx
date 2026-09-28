import type { Metadata } from 'next';
import PositioningPage from '@/components/positioning/positioning';
export const metadata:Metadata={title:'How VisionSeek works — HLO | VisionSeek',description:'Discover Engineering Opportunities, VisionSeek’s place across strategy, building and operations, and HLO: connecting global capabilities to your institution’s next step.',alternates:{canonical:'/about/what-we-do',languages:{en:'/about/what-we-do',ar:'/ar/about/what-we-do'}},openGraph:{title:'Build on the world’s progress. | VisionSeek',url:'/about/what-we-do'}};
export default function Page(){return <PositioningPage locale="en"/>;}

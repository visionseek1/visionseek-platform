import type { Metadata } from 'next';
import PositioningPage from '@/components/positioning/positioning';
export const metadata:Metadata={title:'How VisionSeek works — HLO | VisionSeek',description:'Engineering Opportunities, and HLO: your institution’s research and development in this era. Study the reality, see what is now possible, enter and install the capability, then develop it after it is running.',alternates:{canonical:'/about/what-we-do',languages:{en:'/about/what-we-do',ar:'/ar/about/what-we-do'}},openGraph:{title:'Build on the world’s progress. | VisionSeek',url:'/about/what-we-do'}};
export default function Page(){return <PositioningPage locale="en"/>;}

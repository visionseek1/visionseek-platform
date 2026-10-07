import type { Metadata } from 'next';
import PositioningPage from '@/components/positioning/positioning';
export const metadata:Metadata={title:'كيف تعمل VisionSeek؟ — HLO',description:'تعرّف على هندسة الفرص وموقع VisionSeek، وعلى HLO: قسم البحث والتطوير الذي يدرس الواقع، ويرى ما أصبح ممكنًا، ويدخل يركّب القدرة، ثم يطوّرها بعد التشغيل.',alternates:{canonical:'/ar/about/what-we-do',languages:{en:'/about/what-we-do',ar:'/ar/about/what-we-do'}},openGraph:{title:'ابدأ من حيث وصل العالم. | VisionSeek',url:'/ar/about/what-we-do'}};
export default function Page(){return <PositioningPage locale="ar"/>;}

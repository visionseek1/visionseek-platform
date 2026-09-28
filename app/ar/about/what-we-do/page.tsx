import type { Metadata } from 'next';
import PositioningPage from '@/components/positioning/positioning';
export const metadata:Metadata={title:'كيف تعمل VisionSeek؟ — برنامج HLO',description:'تعرّف على هندسة الفرص وموقع VisionSeek بين الاستراتيجية والبناء والتشغيل، وكيف يربط برنامج HLO مؤسستك بالفرص والقدرات المتاحة عالميًا.',alternates:{canonical:'/ar/about/what-we-do',languages:{en:'/about/what-we-do',ar:'/ar/about/what-we-do'}},openGraph:{title:'ابدأ من حيث وصل العالم. | VisionSeek',url:'/ar/about/what-we-do'}};
export default function Page(){return <PositioningPage locale="ar"/>;}

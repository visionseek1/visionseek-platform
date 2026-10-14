import type { Metadata } from 'next';
import {OG_IMAGES} from '@/lib/seo';
import PositioningPage from '@/components/positioning/positioning';
export const metadata:Metadata={title:'كيف تعمل VisionSeek؟',description:'تعرّف على VisionSeek، مهندس القدرات المؤسسية: موقعها بين الاستراتيجية والبناء والتشغيل، وكيف نربط مؤسستك بالفرص والقدرات المتاحة عالميًا.',openGraph:{images:OG_IMAGES,title:'كيف تعمل VisionSeek؟',description:'تعرّف على VisionSeek، مهندس القدرات المؤسسية: موقعها بين الاستراتيجية والبناء والتشغيل، وكيف نربط مؤسستك بالفرص والقدرات المتاحة عالميًا.',url:'/ar/about/what-we-do'},twitter:{title:'كيف تعمل VisionSeek؟',description:'تعرّف على VisionSeek، مهندس القدرات المؤسسية: موقعها بين الاستراتيجية والبناء والتشغيل، وكيف نربط مؤسستك بالفرص والقدرات المتاحة عالميًا.'},alternates:{canonical:'/ar/about/what-we-do',languages:{en:'/about/what-we-do',ar:'/ar/about/what-we-do'}}};
export default function Page(){return <PositioningPage locale="ar"/>;}

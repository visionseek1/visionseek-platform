import type {Metadata} from 'next';
import StartPage from '@/components/institution/start-page';
export const metadata:Metadata={title:'ابنِ قدرة معنا | VisionSeek',description:'ابدأ محادثة مع VisionSeek حول القدرة التي تحتاجها مؤسستك عبر واتساب أو البريد.',alternates:{canonical:'/ar/start',languages:{en:'/start',ar:'/ar/start'}}};
export default function Page(){return <StartPage locale="ar"/>;}

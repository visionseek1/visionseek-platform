import type {Metadata} from 'next';
import StartPage from '@/components/institution/start-page';
export const metadata:Metadata={title:'Build a capability with us | VisionSeek',description:'Start a conversation with VisionSeek about a capability your organization needs, through WhatsApp or email.',alternates:{canonical:'/start',languages:{en:'/start',ar:'/ar/start'}}};
export default function Page(){return <StartPage locale="en"/>;}

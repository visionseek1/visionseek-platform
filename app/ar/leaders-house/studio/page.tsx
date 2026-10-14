import type {Metadata} from 'next';
import LeadersStudio from '@/components/leaders/studio';
export const metadata:Metadata={title:'استوديو المحتوى | بيت القادة',robots:{index:false,follow:false}};
export default function Page(){return <LeadersStudio locale="ar"/>;}

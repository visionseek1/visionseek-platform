import type {Metadata} from 'next';
import LeadersStudio from '@/components/leaders/studio';
export const metadata:Metadata={title:'Character Room | Leaders House',robots:{index:false,follow:false}};
export default function Page(){return <LeadersStudio locale="en" room/>;}

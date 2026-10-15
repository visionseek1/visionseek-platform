import type {Metadata} from 'next';
import {InsightsList} from '@/components/insights/pages';
export const metadata: Metadata = {title: 'Research papers | VisionSeek Insights', description: 'Research papers produced at VisionSeek, with permanent links.', alternates: {canonical: '/insights/research', languages: {en: '/insights/research', ar: '/ar/insights/research'}}};
export default function Page() { return <InsightsList locale="en" kind="research"/>; }

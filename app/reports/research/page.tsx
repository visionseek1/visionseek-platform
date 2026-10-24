import type {Metadata} from 'next';
import {InsightsList} from '@/components/insights/pages';
export const metadata: Metadata = {title: 'Research papers | VisionSeek Reports', description: 'Research papers produced at VisionSeek, with permanent links.', alternates: {canonical: '/reports/research', languages: {en: '/reports/research', ar: '/ar/reports/research'}}};
export default function Page() { return <InsightsList locale="en" kind="research"/>; }

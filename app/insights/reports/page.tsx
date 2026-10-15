import type {Metadata} from 'next';
import {InsightsList} from '@/components/insights/pages';
export const metadata: Metadata = {title: 'Reports | VisionSeek Insights', description: 'Plain-language reports from VisionSeek, each with a PDF to download.', alternates: {canonical: '/insights/reports', languages: {en: '/insights/reports', ar: '/ar/insights/reports'}}};
export default function Page() { return <InsightsList locale="en" kind="reports"/>; }

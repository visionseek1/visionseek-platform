import type {Metadata} from 'next';
import {InsightsList} from '@/components/insights/pages';
export const metadata: Metadata = {title: 'Reports | VisionSeek Reports', description: 'Plain-language reports from VisionSeek, each with a PDF to download.', alternates: {canonical: '/reports/reports', languages: {en: '/reports/reports', ar: '/ar/reports/reports'}}};
export default function Page() { return <InsightsList locale="en" kind="reports"/>; }

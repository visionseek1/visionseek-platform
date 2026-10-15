import type {Metadata} from 'next';
import {InsightsList} from '@/components/insights/pages';
export const metadata: Metadata = {title: 'التقارير | VisionSeek Insights', description: 'تقارير مبسّطة من VisionSeek، وفي كل تقرير نسخة PDF للتحميل.', alternates: {canonical: '/ar/insights/reports', languages: {ar: '/ar/insights/reports', en: '/insights/reports'}}};
export default function Page() { return <InsightsList locale="ar" kind="reports"/>; }

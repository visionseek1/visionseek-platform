import type {Metadata} from 'next';
import {InsightsList} from '@/components/insights/pages';
export const metadata: Metadata = {title: 'التقارير | تقارير VisionSeek', description: 'تقارير مبسّطة من VisionSeek، وفي كل تقرير نسخة PDF للتحميل.', alternates: {canonical: '/ar/reports/reports', languages: {ar: '/ar/reports/reports', en: '/reports/reports'}}};
export default function Page() { return <InsightsList locale="ar" kind="reports"/>; }

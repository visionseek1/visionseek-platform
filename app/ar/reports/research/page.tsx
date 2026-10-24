import type {Metadata} from 'next';
import {InsightsList} from '@/components/insights/pages';
export const metadata: Metadata = {title: 'الأوراق العلمية | تقارير VisionSeek', description: 'أوراق علمية أنتجناها في VisionSeek، بروابطها الدائمة.', alternates: {canonical: '/ar/reports/research', languages: {ar: '/ar/reports/research', en: '/reports/research'}}};
export default function Page() { return <InsightsList locale="ar" kind="research"/>; }

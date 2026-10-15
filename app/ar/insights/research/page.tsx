import type {Metadata} from 'next';
import {InsightsList} from '@/components/insights/pages';
export const metadata: Metadata = {title: 'الأوراق العلمية | VisionSeek Insights', description: 'أوراق علمية أنتجناها في VisionSeek، بروابطها الدائمة.', alternates: {canonical: '/ar/insights/research', languages: {ar: '/ar/insights/research', en: '/insights/research'}}};
export default function Page() { return <InsightsList locale="ar" kind="research"/>; }

import type {Metadata} from 'next';
import {InitiativePage} from '@/components/identity/pages';
export const metadata: Metadata = {"title": "اطلب جلسة تعريفية | VisionSeek", "description": "مبادرة VisionSeek لبناء القدرات العربية: جلسة تعريفية مجانية مع د. أحمد عبدالعليم لعدد محدود من القادة، حتى 31 ديسمبر 2026.", "alternates": {"canonical": "/ar/initiative", "languages": {"en": "/initiative", "ar": "/ar/initiative"}}, "openGraph": {"title": "اطلب جلسة تعريفية | VisionSeek", "url": "/ar/initiative"}};
export default function Page() { return <InitiativePage locale="ar"/>; }

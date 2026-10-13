import type {Metadata} from 'next';
import {OfferPage} from '@/components/identity/pages';
export const metadata: Metadata = {"title": "عرض الخدمة | VisionSeek", "description": "قدراتنا، ومن يقود العمل معك، وملاحظة عن هذا العصر، ومقولات حقيقية.", "alternates": {"canonical": "/ar/offer", "languages": {"en": "/offer", "ar": "/ar/offer"}}, "openGraph": {"title": "عرض الخدمة | VisionSeek", "url": "/ar/offer"}};
export default function Page() { return <OfferPage locale="ar"/>; }

import type {Metadata} from 'next';
import {OfferPage} from '@/components/identity/pages';
export const metadata: Metadata = {"title": "Service offer | VisionSeek", "description": "Our capabilities, who leads the work with you, a note on this age, and what others have said.", "alternates": {"canonical": "/offer", "languages": {"en": "/offer", "ar": "/ar/offer"}}, "openGraph": {"title": "Service offer | VisionSeek", "url": "/offer"}};
export default function Page() { return <OfferPage locale="en"/>; }

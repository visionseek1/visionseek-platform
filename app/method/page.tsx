import type {Metadata} from 'next';
import {MethodPage} from '@/components/identity/pages';
export const metadata: Metadata = {"title": "The method | VisionSeek", "description": "Six flexible pieces arranged around your institution: diagnosis, capability map, sourcing and partnership, build and test, transfer and localization, handover and enablement.", "alternates": {"canonical": "/method", "languages": {"en": "/method", "ar": "/ar/method"}}, "openGraph": {"title": "The method | VisionSeek", "url": "/method"}};
export default function Page() { return <MethodPage locale="en"/>; }

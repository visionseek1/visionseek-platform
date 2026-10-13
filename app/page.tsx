import type {Metadata} from 'next';
import IdentityHome from '@/components/identity/home';
export const metadata: Metadata = {"title": "VisionSeek | Institutional Capability Engineer", "description": "We design the capability your institution needs, source it anywhere in the world, and make it yours.", "alternates": {"canonical": "/", "languages": {"en": "/", "ar": "/ar"}}, "openGraph": {"title": "VisionSeek | Institutional Capability Engineer", "url": "/"}};
export default function Page() { return <IdentityHome locale="en"/>; }

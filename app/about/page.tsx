import type {Metadata} from 'next';
import {AboutPage} from '@/components/identity/pages';
export const metadata: Metadata = {"title": "About VisionSeek | VisionSeek", "description": "The institutional capability engineer: where we stand, our vision for 2036, our values, and the founder.", "alternates": {"canonical": "/about", "languages": {"en": "/about", "ar": "/ar/about"}}, "openGraph": {"title": "About VisionSeek | VisionSeek", "url": "/about"}};
export default function Page() { return <AboutPage locale="en"/>; }

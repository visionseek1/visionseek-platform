import type {Metadata} from 'next';
import {InitiativePage} from '@/components/identity/pages';
export const metadata: Metadata = {"title": "Request an introductory session | VisionSeek", "description": "The VisionSeek Arab Capability Initiative: a free introductory session with Dr. Ahmed Abdelalim for a limited number of leaders, until 31 December 2026.", "alternates": {"canonical": "/initiative", "languages": {"en": "/initiative", "ar": "/ar/initiative"}}, "openGraph": {"title": "Request an introductory session | VisionSeek", "url": "/initiative"}};
export default function Page() { return <InitiativePage locale="en"/>; }

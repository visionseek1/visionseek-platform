import type {Metadata} from 'next';
import {ServicesPage} from '@/components/identity/pages';
export const metadata: Metadata = {"title": "What we offer | VisionSeek", "description": "Institutional services, ready products, partnerships and technology transfer, knowledge and leader development, presence and outreach.", "alternates": {"canonical": "/services", "languages": {"en": "/services", "ar": "/ar/services"}}, "openGraph": {"title": "What we offer | VisionSeek", "url": "/services"}};
export default function Page() { return <ServicesPage locale="en"/>; }

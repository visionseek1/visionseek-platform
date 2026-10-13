import type {Metadata} from 'next';
import {ServicesPage} from '@/components/identity/pages';
export const metadata: Metadata = {"title": "ما نقدّمه | VisionSeek", "description": "خدمات المؤسسات، والمنتجات الجاهزة، والشراكات ونقل التكنولوجيا، والمعرفة وبناء القادة، والظهور والتواصل.", "alternates": {"canonical": "/ar/services", "languages": {"en": "/services", "ar": "/ar/services"}}, "openGraph": {"title": "ما نقدّمه | VisionSeek", "url": "/ar/services"}};
export default function Page() { return <ServicesPage locale="ar"/>; }

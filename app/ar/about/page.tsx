import type {Metadata} from 'next';
import {AboutPage} from '@/components/identity/pages';
export const metadata: Metadata = {"title": "عن VisionSeek | VisionSeek", "description": "مهندس القدرات المؤسسية: أين نقف، ورؤيتنا لسنة 2036، وقيمنا، والمؤسس.", "alternates": {"canonical": "/ar/about", "languages": {"en": "/about", "ar": "/ar/about"}}, "openGraph": {"title": "عن VisionSeek | VisionSeek", "url": "/ar/about"}};
export default function Page() { return <AboutPage locale="ar"/>; }

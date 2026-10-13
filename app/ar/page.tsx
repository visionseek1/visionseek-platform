import type {Metadata} from 'next';
import IdentityHome from '@/components/identity/home';
export const metadata: Metadata = {"title": "VisionSeek | مهندس القدرات المؤسسية", "description": "نصمّم القدرة التي تحتاجها مؤسستك، ونجلبها من أي مكان في العالم، ونوطّنها عندك.", "alternates": {"canonical": "/ar", "languages": {"en": "/", "ar": "/ar"}}, "openGraph": {"title": "VisionSeek | مهندس القدرات المؤسسية", "url": "/ar"}};
export default function Page() { return <IdentityHome locale="ar"/>; }

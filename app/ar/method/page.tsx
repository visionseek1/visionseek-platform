import type {Metadata} from 'next';
import {MethodPage} from '@/components/identity/pages';
export const metadata: Metadata = {"title": "المنهج | VisionSeek", "description": "ست قطع مرنة نرتّبها على احتياج مؤسستك: التشخيص، وخريطة القدرات، والتوريد والشراكة، والبناء والتجربة، والنقل والتوطين، والتسليم والتمكين.", "alternates": {"canonical": "/ar/method", "languages": {"en": "/method", "ar": "/ar/method"}}, "openGraph": {"title": "المنهج | VisionSeek", "url": "/ar/method"}};
export default function Page() { return <MethodPage locale="ar"/>; }

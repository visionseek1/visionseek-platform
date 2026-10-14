import type {Metadata} from 'next';
import {OneHome} from '@/components/one/pages';
import {OG_IMAGES, TITLE_AR} from '@/lib/seo';
import {oneMessage} from '@/lib/one-message';

export const metadata: Metadata = {
  title: {absolute: TITLE_AR},
  description: oneMessage.home.problem.text.ar,
  alternates: {canonical: '/ar', languages: {en: '/', ar: '/ar'}},
  openGraph: {title: TITLE_AR, description: oneMessage.home.problem.text.ar, url: '/ar', images: OG_IMAGES},
};
export default function ArabicHome() { return <OneHome locale="ar"/>; }

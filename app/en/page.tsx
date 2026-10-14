import type {Metadata} from 'next';
import {OneHome} from '@/components/one/pages';
import {OG_IMAGES, TITLE_EN} from '@/lib/seo';
import {oneMessage} from '@/lib/one-message';

export const metadata: Metadata = {
  title: {absolute: TITLE_EN},
  description: oneMessage.home.problem.text.en,
  alternates: {canonical: '/', languages: {en: '/', ar: '/ar'}},
  openGraph: {title: TITLE_EN, description: oneMessage.home.problem.text.en, url: '/', images: OG_IMAGES},
};
export default function EnglishHome() { return <OneHome locale="en"/>; }

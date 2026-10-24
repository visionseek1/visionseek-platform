import type {Metadata} from 'next';
import {InstituteHub} from '@/components/institute/institute-hub';
import {institute} from '@/lib/institute';

export const metadata: Metadata = {
  title: `${institute.title.ar} | VisionSeek`,
  description: institute.intro.ar,
  alternates: {canonical: '/ar/institute', languages: {en: '/institute', ar: '/ar/institute'}},
  openGraph: {title: `${institute.title.ar} | VisionSeek`, description: institute.intro.ar, url: '/ar/institute'},
};

export default function Page() {
  return <InstituteHub locale="ar" />;
}

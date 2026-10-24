import type {Metadata} from 'next';
import {MasterclassListing} from '@/components/institute/masterclass-listing';
import {institute} from '@/lib/institute';

export const metadata: Metadata = {
  title: `${institute.masterclassTitle.ar} | ${institute.title.ar}`,
  description: institute.masterclassIntro.ar,
  alternates: {
    canonical: '/ar/institute/masterclass',
    languages: {en: '/institute/masterclass', ar: '/ar/institute/masterclass'},
  },
  openGraph: {
    title: `${institute.masterclassTitle.ar} | ${institute.title.ar}`,
    description: institute.masterclassIntro.ar,
    url: '/ar/institute/masterclass',
  },
};

export default function Page() {
  return <MasterclassListing locale="ar" />;
}

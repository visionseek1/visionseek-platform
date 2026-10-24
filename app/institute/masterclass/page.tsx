import type {Metadata} from 'next';
import {MasterclassListing} from '@/components/institute/masterclass-listing';
import {institute} from '@/lib/institute';

export const metadata: Metadata = {
  title: `${institute.masterclassTitle.en} | ${institute.title.en}`,
  description: institute.masterclassIntro.en,
  alternates: {
    canonical: '/institute/masterclass',
    languages: {en: '/institute/masterclass', ar: '/ar/institute/masterclass'},
  },
  openGraph: {
    title: `${institute.masterclassTitle.en} | ${institute.title.en}`,
    description: institute.masterclassIntro.en,
    url: '/institute/masterclass',
  },
};

export default function Page() {
  return <MasterclassListing locale="en" />;
}

import type {Metadata} from 'next';
import ForumsPage, {forumsMetadata} from '@/components/forums/pages';

export const metadata: Metadata = forumsMetadata('en');
export default function Page() {
  return <ForumsPage locale="en"/>;
}

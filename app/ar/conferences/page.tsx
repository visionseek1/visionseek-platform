import type {Metadata} from 'next';
import ForumsPage, {forumsMetadata} from '@/components/forums/pages';

export const metadata: Metadata = forumsMetadata('ar');
export default function Page() {
  return <ForumsPage locale="ar"/>;
}

import {permanentRedirect} from 'next/navigation';

type Props = {params: Promise<{slug: string[]}>};

/** Korean pages outside the new structure fall back to the English URL. */
export default async function Page({params}: Props) {
  const {slug} = await params;
  permanentRedirect(`/${slug.map(encodeURIComponent).join('/')}`);
}

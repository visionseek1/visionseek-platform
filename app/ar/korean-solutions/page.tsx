import {permanentRedirect} from 'next/navigation';

/** Old hub. Canonical page is /ar/korea-gate. 308. */
export default function Page() {
  permanentRedirect('/ar/korea-gate');
}

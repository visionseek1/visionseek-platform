import {permanentRedirect} from 'next/navigation';

/** Old hub. Canonical page is /korea-gate. 308. */
export default function Page() {
  permanentRedirect('/korea-gate');
}

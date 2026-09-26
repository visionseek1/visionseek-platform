import {Suspense} from 'react';
import Consent from './screen';
export default function Page(){return <Suspense fallback={<main>جاري التحميل…</main>}><Consent/></Suspense>;}

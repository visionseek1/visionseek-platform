'use client';
import {prefillRequest} from '@/components/requests/request-form';
import styles from './ks.module.css';

type Locale = 'ar' | 'en';

/** Two doors into the same form: a company RFQ, or a personal request. */
export default function Audience({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const pick = (buyer: 'company' | 'person') => () => prefillRequest({buyer});
  return <div className={styles.who} role="group" aria-label={ar ? 'نوع الطلب' : 'Who is requesting'}>
    <a className={styles.whoCard} href="#needs" onClick={pick('company')}>
      <b>{ar ? 'شركة أو مؤسسة' : 'A company or institution'}</b>
      <span>{ar ? 'توريد، خط إنتاج، أو خدمة لنشاطك.' : 'Sourcing, a production line, or a service for your work.'}</span>
    </a>
    <a className={styles.whoCard} href="#needs" onClick={pick('person')}>
      <b>{ar ? 'فرد' : 'An individual'}</b>
      <span>{ar ? 'طلب شخصي، أو قطعة واحدة من كوريا.' : 'A personal request, or a single item from Korea.'}</span>
    </a>
  </div>;
}

'use client';
import Image from 'next/image';
import Link from 'next/link';
import CarMark from '@/components/cars/car-mark';
import {prefillRequest} from '@/components/requests/request-form';
import {CATEGORIES, type Bi} from '@/lib/korean-solutions-copy';
import styles from './ks.module.css';

type Locale = 'ar' | 'en';

/** The fields people can ask in. A tile picks its field in the request form below; the cars tile opens the cars page. */
export default function Categories({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  const arrow = ar ? '←' : '→';
  return <div className={styles.gutter}><section id="categories" className={`${styles.inner} ${styles.cats}`} aria-labelledby="cats-title">
    <div className={styles.secHead}>
      <h2 id="cats-title">{ar ? 'ماذا يمكنك أن تطلب؟' : 'What you can request'}</h2>
      <p>{ar ? 'اختر المجال، أو اكتب طلبك مباشرة.' : 'Pick a field, or write your request straight away.'}</p>
    </div>
    <ul className={styles.catGrid}>
      {CATEGORIES.map(c => {
        const go = c.href ? (ar ? 'افتح صفحة السيارات' : 'Open the cars page') : c.id === 'other' ? (ar ? 'اكتب طلبك' : 'Write your request') : (ar ? 'اطلب من هذا المجال' : 'Request in this field');
        const body = <>
          {c.image
            ? <span className={styles.catPhoto}><Image src={c.image} alt="" fill sizes="(max-width:560px) 100vw, (max-width:1100px) 50vw, 300px"/></span>
            : <span className={`${styles.catPhoto} ${c.href ? styles.catInk : styles.catLime}`} aria-hidden="true">{c.href ? <CarMark className={styles.catMark}/> : <span className={styles.catPlus}>+</span>}</span>}
          <span className={styles.catBody}>
            <b>{t(c.name)}</b>
            <span>{t(c.examples)}</span>
            <span className={styles.catGo}>{go} <span aria-hidden="true">{arrow}</span></span>
          </span>
        </>;
        return <li key={c.id}>{c.href
          ? <Link className={styles.cat} href={`${p}${c.href}`}>{body}</Link>
          : <a className={styles.cat} href="#needs" onClick={() => prefillRequest({category: c.sector})}>{body}</a>}</li>;
      })}
    </ul>
    <p className={styles.photoNote}>{ar ? 'الصور توضيحية للمجال، وليست صورة المنتج نفسه.' : 'Photos illustrate the field. They are not the product itself.'}</p>
  </section></div>;
}

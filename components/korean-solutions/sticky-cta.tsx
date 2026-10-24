'use client';
import {useEffect, useState} from 'react';
import {site, whatsappUrl} from '@/lib/site';
import styles from './ks.module.css';

type Locale = 'ar' | 'en';

/**
 * On a narrow screen the request button leaves the viewport quickly. This bar stays until the form
 * itself is on screen, so it never covers the fields the visitor is filling.
 */
export default function StickyCta({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const [show, setShow] = useState(false);

  useEffect(() => {
    const needs = document.getElementById('needs');
    let needsIn = false;
    const io = needs ? new IntersectionObserver(([entry]) => {
      needsIn = entry.isIntersecting;
      tick();
    }, {threshold: 0.12}) : null;
    if (needs && io) io.observe(needs);

    const tick = () => {
      const narrow = window.matchMedia('(max-width: 719px)').matches;
      setShow(narrow && window.scrollY > 240 && !needsIn);
    };
    window.addEventListener('scroll', tick, {passive: true});
    window.addEventListener('resize', tick);
    tick();
    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
    };
  }, []);

  if (!show) return null;
  return <div className={styles.sticky} role="region" aria-label={ar ? 'إرسال الطلب' : 'Send a request'}>
    <a className={styles.stickyMain} href="#needs">{ar ? 'اطلب من كوريا' : 'Request from Korea'}</a>
    <a className={styles.stickyWa} href={whatsappUrl()} target="_blank" rel="noreferrer">{ar ? 'واتساب' : 'WhatsApp'} <span dir="ltr">{site.phoneDisplay}</span></a>
  </div>;
}

'use client';
import {useEffect, useState} from 'react';
import {mailto} from '@/lib/site';
import styles from './ks.module.css';

type Locale = 'ar' | 'en';

/** Mobile bar for the email CTA. Hides while the contact band is on screen. */
export default function StickyCta({locale}: {locale: Locale}) {
  const ar = locale === 'ar';
  const [show, setShow] = useState(false);
  const href = mailto(ar ? 'VisionSeek — مناقشة مشروع نقل تكنولوجيا' : 'VisionSeek — Technology-transfer discussion');

  useEffect(() => {
    const talk = document.getElementById('talk');
    let talkIn = false;
    const io = talk ? new IntersectionObserver(([entry]) => {
      talkIn = entry.isIntersecting;
      tick();
    }, {threshold: 0.12}) : null;
    if (talk && io) io.observe(talk);

    const tick = () => {
      const narrow = window.matchMedia('(max-width: 719px)').matches;
      setShow(narrow && window.scrollY > 240 && !talkIn);
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
  return <div className={styles.sticky} role="region" aria-label={ar ? 'ناقش مشروع نقل تكنولوجيا' : 'Discuss a technology-transfer project'}>
    <a className={styles.stickyMain} href={href}>{ar ? 'ناقش مشروع نقل تكنولوجيا' : 'Discuss a transfer project'}</a>
  </div>;
}

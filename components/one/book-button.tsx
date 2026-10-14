'use client';
import Link from 'next/link';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {oneMessage, bookingHref} from '@/lib/one-message';

/** The one CTA of the site, usable from client components (the header). Cal.com when the link is set; the initiative page until then. */
export function BookButton({locale, className}: {locale: 'ar' | 'en'; className?: string}) {
  const ar = locale === 'ar';
  const href = bookingHref(locale);
  const Arrow = ar ? ArrowLeft : ArrowRight;
  const label = ar ? oneMessage.cta.label.ar : oneMessage.cta.label.en;
  return href.startsWith('https://')
    ? <a className={className ?? 'vs-button'} href={href} target="_blank" rel="noreferrer">{label}<Arrow size={20}/></a>
    : <Link className={className ?? 'vs-button'} href={href}>{label}<Arrow size={20}/></Link>;
}

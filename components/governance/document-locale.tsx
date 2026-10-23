'use client';

import {useEffect} from 'react';
import type {Locale} from '@/lib/governance';

/** The root layout hardcodes `<html lang="en" dir="ltr">`. Set the document
 *  element for this section after hydration, and put the previous values back
 *  when the reader leaves. Server HTML still carries lang and dir on the page shell. */
export function DocumentLocale({locale}: {locale: Locale}) {
  useEffect(() => {
    const root = document.documentElement;
    const previousLang = root.lang;
    const previousDir = root.getAttribute('dir');
    root.lang = locale;
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    return () => {
      root.lang = previousLang;
      if (previousDir === null) root.removeAttribute('dir');
      else root.setAttribute('dir', previousDir);
    };
  }, [locale]);
  return null;
}

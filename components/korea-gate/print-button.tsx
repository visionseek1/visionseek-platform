'use client';

import {chrome, tx, type Locale} from '@/lib/korea-gate';
import styles from './korea-gate.module.css';

export function PrintButton({locale}: {locale: Locale}) {
  const t = tx(locale);
  return (
    <button type="button" className={`${styles.ghost} ${styles.printHide}`} onClick={() => window.print()}>
      {t(chrome.print)}
    </button>
  );
}

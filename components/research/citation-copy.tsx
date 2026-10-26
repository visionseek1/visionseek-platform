'use client';

import {useState} from 'react';
import {Check, Copy} from 'lucide-react';
import styles from './research.module.css';

type CopyLabels = {idle: string; copied: string; error: string};

export function CitationCopy({citation, labels}: {citation: string; labels: CopyLabels}) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle');
  async function copy() {
    try {
      await navigator.clipboard.writeText(citation);
      setState('copied');
    } catch {
      setState('error');
    }
  }
  return (
    <div className={styles.citeBox}>
      <p className={styles.citation} lang="en" dir="ltr">{citation}</p>
      <button type="button" className={styles.citeBtn} onClick={copy}>
        {state === 'copied' ? <Check size={16} aria-hidden="true"/> : <Copy size={16} aria-hidden="true"/>}
        {state === 'copied' ? labels.copied : labels.idle}
      </button>
      <span role="status" aria-live="polite" className={styles.citeStatus}>
        {state === 'error' ? labels.error : state === 'copied' ? labels.copied : ''}
      </span>
    </div>
  );
}

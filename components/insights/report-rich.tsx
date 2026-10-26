import type {ReactNode} from 'react';
import styles from './localization-doctrine.module.css';

function findClose(s: string, start: number): number {
  let depth = 0;
  for (let i = start; i < s.length; i++) {
    if (s[i] === '[') depth++;
    else if (s[i] === ']') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function isMarkAt(s: string, i: number): boolean {
  return s[i] === '[' && /^(?:مؤكد بمصدر|استنتاج|رأي منقول)/.test(s.slice(i + 1));
}

function matchLink(s: string, i: number): {label: string; href: string; end: number} | null {
  if (s[i] !== '[') return null;
  if (isMarkAt(s, i)) return null;
  const close = s.indexOf(']', i + 1);
  if (close < 0 || s[close + 1] !== '(') return null;
  const hrefEnd = s.indexOf(')', close + 2);
  if (hrefEnd < 0) return null;
  return {label: s.slice(i + 1, close), href: s.slice(close + 2, hrefEnd), end: hrefEnd + 1};
}

function markKind(token: string): 's' | 'i' | 'p' {
  if (token.startsWith('[مؤكد بمصدر')) return 's';
  if (token.startsWith('[رأي منقول')) return 'p';
  return 'i';
}

function splitRich(text: string, allowMarks: boolean): ReactNode[] {
  const out: ReactNode[] = [];
  let i = 0;
  let buf = '';
  const flush = () => {
    if (buf) {
      out.push(buf);
      buf = '';
    }
  };
  while (i < text.length) {
    if (text.startsWith('**', i)) {
      const end = text.indexOf('**', i + 2);
      if (end !== -1) {
        flush();
        out.push(<strong key={out.length}>{splitRich(text.slice(i + 2, end), allowMarks)}</strong>);
        i = end + 2;
        continue;
      }
    }
    if (allowMarks && isMarkAt(text, i)) {
      const close = findClose(text, i);
      if (close !== -1) {
        flush();
        const token = text.slice(i, close + 1);
        const kind = markKind(token);
        const wide = token.length > 36;
        out.push(
          <mark key={out.length} className={`${styles.mark} ${styles[kind]}${wide ? ` ${styles.markWide}` : ''}`}>
            [{splitRich(token.slice(1, -1), false)}]
          </mark>,
        );
        i = close + 1;
        continue;
      }
    }
    const link = matchLink(text, i);
    if (link) {
      flush();
      out.push(<a key={out.length} className={styles.ref} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>);
      i = link.end;
      continue;
    }
    buf += text[i];
    i++;
  }
  flush();
  return out;
}

export function Rich({text}: {text: string}) {
  return <>{splitRich(text, true)}</>;
}

export function Exhibit({no, title, children, note}: {no: number; title: string; children: ReactNode; note?: string}) {
  return <figure className={styles.ex}>
    <figcaption><span className={styles.exNo}>الشكل {no}</span><span>{title}</span></figcaption>
    {children}
    {note && <p className={styles.exNote}><Rich text={note}/></p>}
  </figure>;
}

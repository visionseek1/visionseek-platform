'use client';
import {useId, useState, type FormEvent} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {mailto, site} from '@/lib/site';
import {composeInterest, interestProblems, INTEREST_MAX, type InterestLocale, type InterestProblem, type InterestValues} from '@/lib/interest';
import styles from './interest-form.module.css';

type Props = {
  locale: InterestLocale;
  topic: string;
  page: string;
  label: string;
  className?: string;
};

const LABELS = {
  title: {ar: 'سجّل اهتمامك', en: 'Register interest'},
  intro: {
    ar: 'ثلاثة حقول فقط. نفتح رسالة جاهزة إلى بريد VisionSeek، ونسجّل الاهتمام إن تيسّر ذلك.',
    en: 'Three fields only. We open a ready email to VisionSeek, and record the interest when that is available.',
  },
  name: {ar: 'الاسم', en: 'Name'},
  email: {ar: 'البريد الإلكتروني', en: 'Email'},
  organization: {ar: 'المؤسسة', en: 'Organization'},
  send: {ar: 'أرسل عبر البريد', en: 'Send by email'},
  missing: {ar: 'هذا الحقل مطلوب.', en: 'This field is required.'},
  invalidEmail: {ar: 'اكتب بريدًا صحيحًا، مثل name@example.com', en: 'Use a valid email, like name@example.com'},
  alert: {ar: 'راجع الحقول المعلّمة، ثم أعد المحاولة.', en: 'Please check the highlighted fields and try again.'},
  fine: {
    ar: 'يفتح الزر رسالة جاهزة في تطبيق بريدك، ولا يُرسَل شيء قبل أن تضغط «إرسال» هناك.',
    en: 'The button opens a ready email in your email app; nothing is sent until you press Send there.',
  },
  ready: {ar: 'رسالتك جاهزة.', en: 'Your email is ready.'},
  readyAsk: {ar: 'لم يفتح البريد؟', en: 'Did your email app not open?'},
  openAgain: {ar: 'افتح الرسالة مرة أخرى', en: 'Open the email again'},
  copy: {ar: 'انسخ النص', en: 'Copy the text'},
  copied: {ar: 'تم النسخ ✓', en: 'Copied ✓'},
};

export function InterestButton({locale, topic, page, label, className}: Props) {
  const ar = locale === 'ar';
  const t = (key: keyof typeof LABELS) => LABELS[key][locale];
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [problems, setProblems] = useState<InterestProblem[]>([]);
  const [ready, setReady] = useState<{subject: string; body: string; url: string} | null>(null);
  const [copied, setCopied] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get('website') || '')) return;
    const values: InterestValues = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      organization: String(data.get('organization') || ''),
    };
    const found = interestProblems(values);
    setProblems(found);
    if (found.length) {
      setReady(null);
      const first = form.elements.namedItem(found[0].key);
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    const mail = composeInterest({locale, values, topic, page});
    fetch('/api/korean-solutions/request', {
      method: 'POST', keepalive: true, headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        kind: 'interest', locale, name: mail.name, org: mail.organization,
        email: mail.email, topic, page, website: '',
      }),
    }).catch(() => {});
    const url = mailto(mail.subject, mail.body);
    setReady({subject: mail.subject, body: mail.body, url});
    setCopied(false);
    window.location.assign(url);
  }

  async function copy() {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(`${ready.subject}\n\n${ready.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const problemOf = (key: InterestProblem['key']) => problems.find(item => item.key === key);
  const field = (key: keyof InterestValues, type: 'text' | 'email', autoComplete: string, dir?: string) => {
    const problem = problemOf(key);
    const id = `${uid}-${key}`;
    return <div className={styles.field}>
      <label htmlFor={id}>{t(key)}<span className={styles.req} aria-hidden="true"> *</span></label>
      <input
        id={id} name={key} type={type} required maxLength={INTEREST_MAX[key]}
        autoComplete={autoComplete} dir={dir || (ar ? 'auto' : undefined)}
        aria-invalid={problem ? true : undefined} aria-required="true"
        aria-describedby={problem ? `${id}-error` : undefined}
      />
      {problem && <span id={`${id}-error`} className={styles.error}>{problem.reason === 'invalid' ? t('invalidEmail') : t('missing')}</span>}
    </div>;
  };

  return <Dialog open={open} onOpenChange={next => { setOpen(next); if (!next) { setProblems([]); setReady(null); } }}>
    <DialogTrigger className={className}>{label}</DialogTrigger>
    <DialogContent className={styles.wrap} dir={ar ? 'rtl' : 'ltr'}>
      <DialogTitle>{t('title')}</DialogTitle>
      <DialogDescription>{t('intro')}</DialogDescription>
      <form className={styles.form} onSubmit={submit} noValidate>
        {field('name', 'text', 'name')}
        {field('email', 'email', 'email', 'ltr')}
        {field('organization', 'text', 'organization')}
        <div className={styles.trap} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
        {problems.length > 0 && <p className={styles.alert} role="alert">{t('alert')}</p>}
        <div className={styles.send}>
          <button type="submit">{t('send')}</button>
          <p className={styles.fine}>{t('fine')} <span dir="ltr">{site.email}</span></p>
        </div>
        {ready && <div className={styles.ready} role="status">
          <p><b>{t('ready')}</b></p>
          <p>{t('readyAsk')}</p>
          <div className={styles.readyActions}>
            <a href={ready.url}>{t('openAgain')}</a>
            <button type="button" onClick={copy}>{copied ? t('copied') : t('copy')}</button>
          </div>
        </div>}
      </form>
    </DialogContent>
  </Dialog>;
}

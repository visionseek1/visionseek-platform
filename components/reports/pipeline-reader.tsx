import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/site-header';
import { lineReport, type PipelineReport } from '@/lib/reports/pipeline';
import styles from './reports.module.css';

type Locale = 'ar' | 'en';

function Block({ title, body }: { title: string; body: string }) {
  return (
    <section className={styles.principles}>
      <h2>{title}</h2>
      <p>{body}</p>
    </section>
  );
}

export default function PipelineReader({ locale, id }: { locale: Locale; id: string }) {
  const report = lineReport(id);
  if (!report) notFound();
  const ar = locale === 'ar';
  const root = ar ? '/ar/reports' : '/reports';
  const t = (a: string, e: string) => (ar ? a : e);
  const text = (value: PipelineReport['question']) => value[locale];
  return (
    <div className={styles.page} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <SiteHeader locale={locale} items={[]} languageHref={`${ar ? '/reports' : '/ar/reports'}/line/${id}`} solid />
      <main className={styles.main} id="main-content">
        <nav className={styles.nav} aria-label={t('تنقل التقرير', 'Report navigation')}>
          <Link href={root}>{t('التقارير', 'Reports')}</Link>
          <span>{report.desk}</span>
        </nav>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{report.status === 'published' ? t('منشور', 'PUBLISHED') : t('معاينة غير منشورة', 'UNPUBLISHED PREVIEW')}</p>
          <h1>{text(report.title)}</h1>
          <p className={styles.lead}>{text(report.question)}</p>
        </header>
        <section className={styles.principles}>
          <h2>{t('الأحكام', 'Judgments')}</h2>
          <div className={styles.grid}>
            {report.judgments.map(item => (
              <article key={item.en}>
                <span className={styles.label}>{item.confidence}</span>
                <h3>{text(item)}</h3>
                <p>{text(item.change)}</p>
              </article>
            ))}
          </div>
        </section>
        <Block title={t('النطاق', 'Scope')} body={text(report.scope)} />
        <Block title={t('الدليل', 'Evidence')} body={text(report.evidence)} />
        <Block title={t('الافتراضات', 'Assumptions')} body={text(report.assumptions)} />
        <Block title={t('بديل', 'Alternative')} body={text(report.alternative)} />
        <Block title={t('ماذا يعني هذا', 'What this means')} body={text(report.implication)} />
        <section className={styles.principles}>
          <h2>{t('المصادر', 'Sources')}</h2>
          <div className={styles.grid}>
            {report.sources.map(source => (
              <article key={source.url}>
                <h3><a href={source.url}>{source.claim}</a></h3>
                <p>{source.accessedAt} · {text(source.limit)}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

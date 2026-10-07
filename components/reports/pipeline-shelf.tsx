import Link from 'next/link';
import { listedReports } from '@/lib/reports/pipeline';
import styles from './reports.module.css';

export default function PipelineShelf({ locale }: { locale: 'ar' | 'en' }) {
  const ar = locale === 'ar';
  const root = ar ? '/ar/reports' : '/reports';
  const t = (a: string, e: string) => (ar ? a : e);
  const reports = listedReports();
  return (
    <section id="line" className={styles.library} aria-labelledby="line-title">
      <div className={styles.sectionHead}>
        <div>
          <p className={styles.label}>{t('من السلسلة', 'FROM THE LINE')}</p>
          <h2 id="line-title">{t('تقارير مكتملة', 'Completed reports')}</h2>
        </div>
        <span>{reports.length ? t(`${reports.length} منشور`, `${reports.length} published`) : t('لا شيء منشور', 'Nothing published')}</span>
      </div>
      {reports.length === 0 ? (
        <div className={styles.noResults}>
          <h3>{t('لا تقرير منشور من هذه السلسلة بعد.', 'No report from this line is published yet.')}</h3>
          <p>{t('التقرير يظهر هنا فقط بعد أحكام ودليل وحد وبديل، ثم معاينة، ثم اعتماد النشر. الأرشيف أسفل ليس من هذه السلسلة.', 'A report appears here only after judgments, evidence, limits and an alternative, then a preview, then publication approval. The archive below is not part of this line.')}</p>
        </div>
      ) : (
        reports.map((report, index) => (
          <article key={report.id} className={styles.publicationRow}>
            <div className={styles.publicationType}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{report.desk}</p>
            </div>
            <div>
              <h3><Link href={`${root}/line/${report.id}`}>{report.title[locale]}</Link></h3>
              <p>{report.question[locale]}</p>
              <span className={styles.status}>{t('منشور من السلسلة', 'Published from the line')}</span>
            </div>
          </article>
        ))
      )}
    </section>
  );
}

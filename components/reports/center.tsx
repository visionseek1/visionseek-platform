import Link from 'next/link';
import SiteHeader from '@/components/site-header';
import { references, toolkit, publishedReports } from '@/lib/reports/catalog';
import styles from './reports.module.css';

type Locale = 'ar' | 'en';
export default function ReportsCenter({ locale, methodology = false }: { locale: Locale; methodology?: boolean }) {
  const ar = locale === 'ar';
  const root = ar ? '/ar/reports' : '/reports';
  const t = (a: string, e: string) => ar ? a : e;
  const stages = [
    ['سؤال يستحق البحث', 'A question worth answering', 'نحدد القرار والمستفيد والإضافة المتوقعة قبل اختيار الأداة.', 'Define the decision, audience and expected contribution before choosing a tool.'],
    ['بروتوكول ومصادر', 'Protocol and sources', 'نوثق التعريفات والفترة والتغطية والحقوق وحدود المقارنة.', 'Document definitions, time periods, coverage, rights and comparability.'],
    ['تحليل قابل للإعادة', 'Reproducible analysis', 'نحفظ المدخلات والكود والإصدارات، ونختبر الحساسية والتفسيرات البديلة.', 'Preserve inputs, code and versions; test sensitivity and alternative explanations.'],
    ['مراجعة مستقلة', 'Independent review', 'يفحص مراجع مؤهل المنهج والاستنتاجات، وتوثق الاستجابة للملاحظات.', 'A qualified reviewer examines methods and conclusions, with a recorded response.'],
    ['إصدار وتصحيحات', 'Release and corrections', 'اعتماد بشري لنسخة محددة، ثم أرشفة وتحديثات لا تمحو تاريخ التقرير.', 'Human approval of a specific version, followed by archiving and a visible correction history.'],
  ];
  return <div className={styles.page} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
    <SiteHeader locale={locale} items={[]} languageHref={`${ar ? '/reports' : '/ar/reports'}${methodology ? '/methodology' : ''}`} solid />
    <main className={styles.main} id="main-content">
      <nav className={styles.nav} aria-label={t('تنقل قسم التقارير', 'Reports navigation')}>
        <Link href={root} aria-current={!methodology ? 'page' : undefined}>{t('التقارير', 'Reports')}</Link>
        <Link href={`${root}/methodology`} aria-current={methodology ? 'page' : undefined}>{t('المنهج والمعايير', 'Methods & standards')}</Link>
        <Link href={ar ? '/ar/insights' : '/insights'}>{t('بيت القادة', 'Leaders House')}</Link>
      </nav>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>VISIONSEEK / {t('البحث والتحليل', 'RESEARCH & ANALYSIS')}</p>
        <h1>{methodology ? t('كيف نبني الدليل.', 'How we build evidence.') : t('معرفة تُبنى عليها القرارات.', 'Evidence for consequential decisions.')}</h1>
        <p className={styles.lead}>{methodology ? t('معايير القسم المقترحة: من سؤال البحث إلى تقرير يمكن فحص نتائجه وفهم حدوده.', 'Proposed department standards: from a research question to findings that can be inspected and understood in context.') : t('تقارير عن القدرات والتقنيات والفرص التي تغيّر المؤسسات والأسواق. للمسؤول الذي يقرر، والباحث الذي يتحقق، والصحفي الذي يشرح.', 'Research on the capabilities, technologies and opportunities reshaping institutions and markets. For decision-makers, researchers and journalists.')}</p>
      </header>
      {!methodology ? <>
        <section className={styles.library} aria-labelledby="library-title">
          <div className={styles.sectionHead}><h2 id="library-title">{t('مكتبة التقارير', 'Research library')}</h2><span>{t('إصدارات موثقة', 'Documented editions')}</span></div>
          {publishedReports.length === 0 && <div className={styles.empty}><span className={styles.label}>{t('القسم قيد التأسيس', 'DEPARTMENT IN DEVELOPMENT')}</span><h3>{t('التقرير الأول يبدأ بسؤال واضح.', 'The first report starts with a clear question.')}</h3><p>{t('لم يُدرج بعد تقرير مستوفٍ لمعايير المراجعة في هذه المكتبة. ستظهر الإصدارات مع مصادرها ومنهجها وحالة مراجعتها وحدود نتائجها.', 'No report meeting this library’s review requirements has been added yet. Editions will include sources, methods, review status and limitations.')}</p><Link className={styles.cta} href={`${root}/methodology`}>{t('اطّلع على معايير القسم', 'Explore our research standards')} <span aria-hidden>↗</span></Link></div>}
          {publishedReports.map(report => <article key={report.id} className={styles.empty}><p>{report.id} · {report.version}</p><h3>{report.title[locale]}</h3><p>{report.question}</p><a href={report.evidencePackage}>{t('حزمة الأدلة', 'Evidence package')}</a></article>)}
        </section>
        <section className={styles.archive}><div><span className={styles.label}>{t('من أرشيف VisionSeek', 'FROM THE VISIONSEEK ARCHIVE')}</span><h2>{t('الذكاء الاصطناعي المادي يتحول إلى بنية تحتية وطنية', 'Physical AI is becoming national infrastructure')}</h2><p>{t('إحاطة منشورة سابقًا. لم تُثبت لها مراجعة مستقلة وفق معايير القسم الجديدة؛ ليست ضمن التقارير المراجعة أعلاه.', 'A previously published brief. Independent review under the new department standards has not been established; it is not part of the reviewed catalogue above.')}</p></div><Link className={styles.cta} href={ar ? '/ar/insights/physical-ai' : '/insights/physical-ai'}>{t('قراءة الإحاطة', 'Read the brief')} <span aria-hidden>↗</span></Link></section>
        <section className={styles.principles}><h2>{t('كل تقرير، وأساسه معاه.', 'Every report comes with its foundations.')}</h2><div className={styles.grid}>{[
          [t('دليل يمكن تتبعه', 'Traceable evidence'), t('مصدر كل دعوى مهمة، وتعريف كل مؤشر، وتاريخ البيانات المستخدمة.', 'A source for each material claim, definitions for indicators and dates for the data.')],
          [t('نتائج بحدود واضحة', 'Findings with clear limits'), t('نفصل ما قيس فعلًا عما استُنتج، ونوضح المجهول وعدم اليقين.', 'Separate measurements from inferences and disclose uncertainty and unknowns.')],
          [t('معرفة قابلة للاستخدام', 'Usable research'), t('تقرير أصلي، وموجز لصانع القرار، ومواد قابلة للاقتباس وفق حقوقها.', 'Original research, a decision brief and reference material subject to its reuse rights.')],
        ].map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      </> : <>
        <section className={styles.stages} aria-label={t('مراحل البحث', 'Research stages')}>{stages.map(([a,e,ad,ed],i)=><article key={e}><span className={styles.number}>{String(i+1).padStart(2,'0')}</span><div><h2>{t(a,e)}</h2><p>{t(ad,ed)}</p></div></article>)}</section>
        <section className={styles.principles}><h2>{t('نتعلم من المعايير الدولية', 'Learning from international practice')}</h2><p>{t('مراجع لتطوير منهجنا؛ لا تعني شراكة أو اعتمادًا من الجهات المذكورة.', 'References for developing our methods; no partnership or endorsement is implied.')}</p><div className={styles.grid}>{references.map(item=><article key={item.name}><h3><a href={item.url}>{item.name} ↗</a></h3><p>{item[locale]}</p></article>)}</div></section>
        <section className={styles.principles}><h2>{t('أدوات مفتوحة، وتحليل يمكن فحصه', 'Open tools. Inspectable analysis.')}</h2><p>{t('نواة مرشحة للتقييم الفني. الاطلاع على توثيق الأداة لا يعني أنها متصلة أو مشغلة داخل المنصة.', 'A candidate stack for technical evaluation. Reviewing documentation does not mean a tool is integrated or running on this platform.')}</p><div className={styles.grid}>{toolkit.map(item=><article key={item.name}><span className={styles.label}>{t('مرشح للتقييم', 'CANDIDATE')}</span><h3><a href={item.url}>{item.name} ↗</a></h3><p>{item[locale]}</p></article>)}</div></section>
        <aside className={styles.note}><h2>{t('ما الذي يمنح التقرير صفة «مراجع»؟', 'What makes a report reviewed?')}</h2><p>{t('سجل مراجعة مستقل مرتبط بالنسخة، وإغلاق الملاحظات الجوهرية، واعتماد نشر بشري موثق. لا يكفي فحص آلي أو وجود استشهادات. عند تقييد البيانات نوضح مسار الوصول وإعادة الحساب بدل نشرها دون حق.', 'An independent, version-specific review record, resolution of material comments and documented human publication approval. Automated checks and citations alone are insufficient. Restricted data require a documented access and reproduction procedure.')}</p></aside>
      </>}
      <footer className={styles.footer}><span>VISIONSEEK · {t('هندسة الفرص', 'Engineering opportunities')}</span><Link href={methodology ? root : `${root}/methodology`}>{methodology ? t('مكتبة التقارير', 'Research library') : t('المنهج والمعايير', 'Methods & standards')}</Link></footer>
    </main>
  </div>;
}

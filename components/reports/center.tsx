import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/site-header';
import { references, toolkit } from '@/lib/reports/catalog';
import styles from './reports.module.css';
import ReportsLibrary from './library';
import { report, sources } from '@/lib/reports/physical-ai';

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
      <header className={`${styles.hero} ${!methodology ? styles.indexHero : ''}`}>
        <div className={styles.masthead}><span>VISIONSEEK RESEARCH</span><span>{t('نربط المعرفة بما يمكن تحقيقه.', 'Connecting knowledge to what comes next.')}</span></div>
        <p className={styles.eyebrow}>VISIONSEEK / {t('البحث والتحليل', 'RESEARCH & ANALYSIS')}</p>
        <h1>{methodology ? t('كيف نبني الدليل.', 'How we build evidence.') : t('التقارير', 'Research & reports')}</h1>
        <p className={styles.lead}>{methodology ? t('معايير القسم المقترحة: من سؤال البحث إلى تقرير يمكن فحص نتائجه وفهم حدوده.', 'Proposed department standards: from a research question to findings that can be inspected and understood in context.') : t('تقارير عن القدرات والتقنيات والفرص التي تغيّر المؤسسات والأسواق. للمسؤول الذي يقرر، والباحث الذي يتحقق، والصحفي الذي يشرح.', 'Research on the capabilities, technologies and opportunities reshaping institutions and markets. For decision-makers, researchers and journalists.')}</p>
      </header>
      {!methodology ? <>
        <section className={styles.feature} aria-labelledby="featured-report">
          <div className={styles.featureCopy}>
            <div className={styles.meta}><span>{t('من أرشيفنا', 'FROM OUR ARCHIVE')}</span><span>{t('إحاطة استراتيجية · سبتمبر 2026', 'STRATEGIC BRIEF · SEPTEMBER 2026')}</span></div>
            <h2 id="featured-report">{report[locale].title}</h2>
            <p>{t('حين تنتقل قدرات الذكاء الاصطناعي إلى الموانئ والمصانع والخدمات العامة، يصبح السؤال: كيف نبني منظومة متكاملة حولها؟', 'As AI capabilities move into ports, factories and public services, the question becomes: how do we build an integrated system around them?')}</p>
            <div className={styles.featureLinks}><Link className={styles.cta} href={`${root}/physical-ai`}>{t('اقرأ الإحاطة', 'Read the brief')} <span aria-hidden>↗</span></Link><Link className={styles.secondaryLink} href={`${root}/physical-ai#references`}>{t('المراجع وبيانات الإصدار', 'Sources & publication record')}</Link></div>
            <p className={styles.reviewNote}>{t('منظور استراتيجي من الأرشيف. المراجعة المستقلة غير مثبتة.', 'An archival strategic perspective. Independent review is not established.')}</p>
          </div>
          <Link className={styles.featureImage} href={`${root}/physical-ai`} aria-label={t('قراءة إحاطة الذكاء الاصطناعي المادي', 'Read the Physical AI brief')}>
            <Image src="/field-industry.jpg" alt={t('صورة توضيحية لخط إنتاج صناعي', 'Illustrative industrial production line')} fill sizes="(max-width: 760px) 100vw, 40vw" priority />
            <div className={styles.coverCaption}><span>VISIONSEEK / 01</span><strong>PHYSICAL<br/>AI</strong><span>{t('من التقنية إلى القدرة', 'FROM TECHNOLOGY TO CAPABILITY')}</span></div>
          </Link>
        </section>
        <div className={styles.issueStrip}><span>{t('إحاطة استراتيجية', 'Strategic brief')}</span><span>{t('العربية / English', 'English / العربية')}</span><span>{sources.length} {t('مراجع مختارة', 'selected references')}</span><Link href={`${root}/physical-ai#publication-record`}>{t('افحص بيانات الإصدار', 'Inspect the publication record')} ↗</Link></div>
        <ReportsLibrary locale={locale} />
        <section className={styles.editorialBand}>
          <div><span className={styles.label}>{t('عدسة VisionSeek', 'THE VISIONSEEK LENS')}</span><h2>{t('نبحث فيما يمكن أن يصبح ممكنًا.', 'Researching what could become possible.')}</h2></div>
          <p>{t('قيمة البحث عندنا في وصل ما نعرفه بما نستطيع فعله: تحديد الفجوة، وفهم العناصر المتاحة، واختبار الفرصة قبل تحويلها إلى قرار أو مشروع.', 'The value of research is in connecting what we know to what we can do: defining the gap, understanding available capabilities and testing an opportunity before it becomes a decision or project.')}</p>
          <Link className={styles.secondaryLink} href={`${root}/methodology`}>{t('تعرّف على منهجنا', 'Explore our method')} ↗</Link>
        </section>
        <section className={styles.principles}><div className={styles.sectionHead}><h2>{t('ما وراء كل إصدار', 'Behind every edition')}</h2><span>{t('معاييرنا المقترحة للإصدارات الجديدة', 'Our proposed standards for new editions')}</span></div><div className={styles.grid}>{[
          [t('دليل يمكن تتبعه', 'Traceable evidence'), t('مصدر كل دعوى مهمة، وتعريف كل مؤشر، وتاريخ البيانات المستخدمة.', 'A source for every material claim, indicator definitions and data dates.')],
          [t('نتائج بحدود واضحة', 'Findings with clear limits'), t('نفصل القياس عن الاستنتاج، ونوضح عدم اليقين وما لا تسمح البيانات بإثباته.', 'Measurements are distinct from inferences, with uncertainty and data limitations made explicit.')],
          [t('مراجعة وإصدارات محفوظة', 'Review and version history'), t('مراجعة مناسبة للمنهج، واعتماد بشري للنشر، وتصحيحات تحفظ تاريخ المعرفة.', 'Method-appropriate review, human publication approval and corrections that preserve the historical record.')],
        ].map(([title,body],i)=><article key={title}><span className={styles.number}>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      </> : <>
        <section className={styles.stages} aria-label={t('مراحل البحث', 'Research stages')}>{stages.map(([a,e,ad,ed],i)=><article key={e}><span className={styles.number}>{String(i+1).padStart(2,'0')}</span><div><h2>{t(a,e)}</h2><p>{t(ad,ed)}</p></div></article>)}</section>
        <section className={styles.principles}><h2>{t('نتعلم من المعايير الدولية', 'Learning from international practice')}</h2><p>{t('مراجع لتطوير منهجنا؛ لا تعني شراكة أو اعتمادًا من الجهات المذكورة.', 'References for developing our methods; no partnership or endorsement is implied.')}</p><div className={styles.grid}>{references.map(item=><article key={item.name}><h3><a href={item.url}>{item.name} ↗</a></h3><p>{item[locale]}</p></article>)}</div></section>
        <section className={styles.principles}><h2>{t('أدوات مفتوحة، وتحليل يمكن فحصه', 'Open tools. Inspectable analysis.')}</h2><p>{t('نواة مرشحة للتقييم الفني. الاطلاع على توثيق الأداة لا يعني أنها متصلة أو مشغلة داخل المنصة.', 'A candidate stack for technical evaluation. Reviewing documentation does not mean a tool is integrated or running on this platform.')}</p><div className={styles.grid}>{toolkit.map(item=><article key={item.name}><span className={styles.label}>{t('مرشح للتقييم', 'CANDIDATE')}</span><h3><a href={item.url}>{item.name} ↗</a></h3><p>{item[locale]}</p></article>)}</div></section>
        <aside className={styles.note}><h2>{t('ما الذي يمنح التقرير صفة «مراجع»؟', 'What makes a report reviewed?')}</h2><p>{t('سجل مراجعة مستقل مرتبط بالنسخة، وإغلاق الملاحظات الجوهرية، واعتماد نشر بشري موثق. لا يكفي فحص آلي أو وجود استشهادات. عند تقييد البيانات نوضح مسار الوصول وإعادة الحساب بدل نشرها دون حق.', 'An independent, version-specific review record, resolution of material comments and documented human publication approval. Automated checks and citations alone are insufficient. Restricted data require a documented access and reproduction procedure.')}</p></aside>
      </>}
      <footer className={styles.footer}><Link href={`${root}/studio`}>{t('إدارة التقارير', 'Reports studio')}</Link><span>VISIONSEEK · {t('هندسة الفرص', 'Engineering opportunities')}</span><Link href={methodology ? root : `${root}/methodology`}>{methodology ? t('مكتبة التقارير', 'Research library') : t('المنهج والمعايير', 'Methods & standards')}</Link></footer>
    </main>
  </div>;
}

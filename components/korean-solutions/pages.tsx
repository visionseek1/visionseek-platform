import Link from 'next/link';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import Finder, {SolutionCard} from './finder';
import RequestForm from './request-form';
import styles from './ks.module.css';
import {NO_PARTNERSHIP, REGION_COPY, ROUTES, ROUTE_COPY, SECTOR_EN, TYPE_COPY, type Bi, type Solution} from '@/lib/korean-solutions-copy';

type Locale = 'ar' | 'en';

function Shell({locale, path, here, children}: {locale: Locale; path: string; here?: string; children: React.ReactNode}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : '';
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
    <CapabilityHeader locale={locale} path={path}/>
    <main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>
      <nav className={`${styles.bar} ${styles.gutter}`} aria-label={ar ? 'أقسام حلول من كوريا' : 'Korean Solutions sections'}><div className={`${styles.inner} ${styles.barInner}`}>
        <span className={styles.barName}><Link href={`${p}/korean-solutions`}>{ar ? 'حلول من كوريا' : 'Korean Solutions'}</Link>{here && <><span className={styles.sep} aria-hidden="true">/</span><span className={styles.here}>{here}</span></>}</span>
        <span className={styles.barNav}>
          <a href={`${p}/korean-solutions#sections`}>{ar ? 'الأقسام' : 'Sections'}</a>
          <a href={`${p}/korean-solutions#needs`}>{ar ? 'احتياجات المنطقة' : 'Regional needs'}</a>
          <a href={`${p}/korean-solutions#how`}>{ar ? 'كيف ننقل الحل' : 'How we transfer'}</a>
        </span>
      </div></nav>
      {children}
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

const STEPS: {title: Bi; text: Bi}[] = [
  {title: {ar: 'نفهم المشكلة', en: 'We understand the problem'}, text: {ar: 'نجلس مع المؤسسة ونحدد ما تحتاجه بالضبط، وأين يقف الحل الحالي.', en: 'We sit with the organisation and pin down exactly what it needs, and where today’s answer falls short.'}},
  {title: {ar: 'نختار من كوريا', en: 'We choose from Korea'}, text: {ar: 'نرشّح الحل الكوري الأنسب، ومعه دليله واعتماده وأين يعمل.', en: 'We put forward the best-fitting Korean solution, with its proof, its approvals and where it already works.'}},
  {title: {ar: 'نجرّب على نطاق صغير', en: 'We pilot small'}, text: {ar: 'تجربة محدودة داخل المؤسسة، بمقياس نجاح متفق عليه من البداية.', en: 'A limited trial inside the organisation, with a measure of success agreed at the start.'}},
  {title: {ar: 'ننقل ونوطّن', en: 'We transfer and localise'}, text: {ar: 'شراء أو توزيع أو ترخيص أو مشروع مشترك، حتى يعمل الحل عندك بفريقك.', en: 'Purchase, distribution, licensing or a joint venture, until the solution runs with your own team.'}},
];

export function KoreanSolutionsHub({locale, solutions}: {locale: Locale; solutions: Solution[]}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en);
  return <Shell locale={locale} path="/korean-solutions">
    <Finder locale={locale} solutions={solutions}/>
    <section id="needs" className={`${styles.needs} ${styles.gutter}`} aria-labelledby="needs-title"><div className={`${styles.inner} ${styles.needsInner}`}>
      <div className={styles.needsText}>
        <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>REGIONAL NEEDS</p>
        <h2 id="needs-title">{ar ? 'عندك مشكلة، ولم تجد حلها؟' : 'Have a problem you cannot find a solution for?'}</h2>
        <p>{ar ? 'اكتب لنا ما تحتاجه مؤسستك. نبحث عن الحل في كوريا، ونعود إليك بما وجدنا، ومعه الطريق إلى نقله.' : 'Tell us what your organisation needs. We look for the answer in Korea and come back to you with what we found, and the route to bring it over.'}</p>
      </div>
      <RequestForm locale={locale} kind="need"/>
    </div></section>
    <div className={styles.gutter}><section id="how" className={`${styles.inner} ${styles.how}`} aria-labelledby="how-title">
      <h2 id="how-title">{ar ? 'كيف ننقل الحل' : 'How we transfer a solution'}</h2>
      <ol className={styles.steps}>{STEPS.map((s, i) => <li key={i}><span className={styles.num}>{String(i + 1).padStart(2, '0')}</span><b>{t(s.title)}</b><p>{t(s.text)}</p></li>)}</ol>
      <div className={styles.routeBar}><b>{ar ? 'طرق النقل:' : 'Transfer routes:'}</b>{ROUTES.map(r => <span key={r}>{t(ROUTE_COPY[r].name)}</span>)}</div>
    </section></div>
  </Shell>;
}

export function KoreanSolutionDetail({locale, s, related}: {locale: Locale; s: Solution; related: Solution[]}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en) || v.ar; const p = ar ? '/ar' : '';
  const type = TYPE_COPY[s.type];
  const sector = ar ? s.sector : SECTOR_EN[s.sector] || s.sector;
  const where = t(s.where);
  return <Shell locale={locale} path="/korean-solutions" here={`${t(type.many)} · ${sector}`}>
    <section className={`${styles.dHero} ${styles.gutter}`} aria-labelledby="sol-title"><div className={`${styles.inner} ${styles.dHeroInner}`}>
      <div className={styles.dHeroMain}>
        <div className={styles.dTags}>
          <span className={styles.dType}>{t(type.one)}</span>
          {sector && <span>{sector}</span>}
          {s.region === 'نعم' && <span className={styles.dIn}>{t(REGION_COPY['نعم'].lead)}</span>}
          {s.region === 'تجربة' && <span>{t(REGION_COPY['تجربة'].lead)}</span>}
        </div>
        <h1 id="sol-title">{t(s.title)}</h1>
        {s.maker && <p className={`${styles.dMaker} ${styles.latin}`} dir="auto">{s.maker}</p>}
      </div>
      <div className={styles.dActions}>
        <a className={styles.primary} href="#request">{ar ? 'اطلب هذا الحل' : 'Ask for this solution'}</a>
        <Link className={styles.secondary} href={`${p}/korean-solutions#finder`}>{ar ? 'رجوع للمستكشف' : 'Back to the finder'}</Link>
      </div>
    </div></section>

    <div className={styles.gutter}><div className={`${styles.inner} ${styles.dBody}`}>
      <article className={styles.dMain}>
        <section aria-labelledby="problem" className={styles.dBlock} style={{borderTop: 0, paddingTop: 0}}>
          <p id="problem" className={styles.kicker}>{ar ? 'المشكلة في منطقتنا' : 'The problem in our region'}</p>
          <p className={styles.statement}>{t(s.problem)}</p>
        </section>
        <section aria-labelledby="solution" className={styles.dBlock}>
          <h2 id="solution">{ar ? 'الحل' : 'The solution'}</h2>
          <p className={styles.prose}>{t(s.solution)}</p>
        </section>
        {s.proof.length > 0 && <section aria-labelledby="proof" className={styles.dBlock}>
          <h2 id="proof">{ar ? 'الدليل' : 'The proof'}</h2>
          <ol className={styles.proofList}>{s.proof.map((x, i) => <li key={i}><span className={styles.proofText}><span dir="auto">{t(x)}</span>{x.url && <a href={x.url} target="_blank" rel="noreferrer">{ar ? 'المصدر ↗' : 'Source ↗'}</a>}</span></li>)}</ol>
          <p className={styles.small}>{ar ? 'كل رقم هنا من مصدر منشور، ورابطه بجانبه.' : 'Every number here comes from a published source, linked beside it.'}</p>
        </section>}
        <section aria-labelledby="where" className={styles.dBlock}>
          <h2 id="where">{ar ? 'في المنطقة العربية' : 'In the Arab region'}</h2>
          <div className={`${styles.regionBox} ${s.region === 'نعم' ? styles.on : ''}`}><b>{t(REGION_COPY[s.region].lead)}</b>{where && <span>{where}</span>}</div>
        </section>
        {t(s.opportunity) && <section aria-labelledby="opportunity" className={styles.dBlock}>
          <h2 id="opportunity">{ar ? 'أين الفرصة' : 'Where the opportunity is'}</h2>
          <p className={styles.prose}>{t(s.opportunity)}</p>
        </section>}
        <section aria-labelledby="routes" className={styles.dBlock}>
          <h2 id="routes">{ar ? 'طرق النقل الممكنة' : 'Possible transfer routes'}</h2>
          <div className={styles.routeGrid}>{ROUTES.map(r => { const open = s.routes.includes(r); return <div key={r} className={open ? styles.open : ''}><b>{t(ROUTE_COPY[r].name)}</b><span>{open ? t(ROUTE_COPY[r].line) : (ar ? 'غير مطروح لهذا الحل' : 'Not offered for this solution')}</span></div>; })}</div>
        </section>
      </article>
      <aside id="request" className={styles.aside} aria-labelledby="request-title">
        <h2 id="request-title">{ar ? 'اطلب هذا الحل' : 'Ask for this solution'}</h2>
        <p>{ar ? 'اكتب لنا عن مؤسستك، ونعود إليك بالخطوة التالية.' : 'Tell us about your organisation, and we will come back to you with the next step.'}</p>
        <RequestForm locale={locale} kind="solution" solution={{slug: s.slug, title: s.title.ar}}/>
        <p className={styles.fine}>{t(NO_PARTNERSHIP)}</p>
      </aside>
    </div></div>

    {related.length > 0 && <div className={styles.gutter}><section className={`${styles.inner} ${styles.related}`} aria-labelledby="related-title">
      <h2 id="related-title">{ar ? 'حلول أخرى في المجال نفسه' : 'More in the same field'}</h2>
      <div className={styles.relatedGrid}>{related.map(r => <SolutionCard key={r.slug} s={r} locale={locale}/>)}</div>
    </section></div>}
  </Shell>;
}

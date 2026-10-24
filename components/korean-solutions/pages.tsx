import Link from 'next/link';
import Image from 'next/image';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import RequestForm from '@/components/requests/request-form';
import Categories from './categories';
import Finder, {SolutionCard} from './finder';
import {PHOTO_CREDIT, productImage} from './photos';
import styles from './ks.module.css';
import {CATEGORIES, NO_PARTNERSHIP, REGION_COPY, ROUTES, ROUTE_COPY, SECTOR_EN, TYPE_COPY, type Bi, type Solution} from '@/lib/korean-solutions-copy';
import {site, whatsappUrl} from '@/lib/site';

type Locale = 'ar' | 'en';
const ORIGIN = 'https://visionseek.org';

function Shell({locale, path, here, children}: {locale: Locale; path: string; here?: string; children: React.ReactNode}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : '';
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
    <CapabilityHeader locale={locale} path={path}/>
    <main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>
      <nav className={`${styles.bar} ${styles.gutter}`} aria-label={ar ? 'أقسام حلول من كوريا' : 'Korean Solutions sections'}><div className={`${styles.inner} ${styles.barInner}`}>
        <span className={styles.barName}><Link href={`${p}/korean-solutions`}>{ar ? 'حلول من كوريا' : 'Korean Solutions'}</Link>{here && <><span className={styles.sep} aria-hidden="true">/</span><span className={styles.here}>{here}</span></>}</span>
        <span className={styles.barNav}>
          <a href={`${p}/korean-solutions#how`}>{ar ? 'خطوات الطلب' : 'How it works'}</a>
          <a href={`${p}/korean-solutions#categories`}>{ar ? 'ماذا تطلب' : 'What to request'}</a>
          <a href={`${p}/korean-solutions#finder`}>{ar ? 'حلول نرصدها' : 'Solutions we track'}</a>
          <Link href={`${p}/cars`}>{ar ? 'السيارات' : 'Cars'}</Link>
          <a className={styles.barCta} href={`${p}/korean-solutions#needs`}>{ar ? 'اكتب طلبك' : 'Your request'}</a>
        </span>
      </div></nav>
      {children}
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

const STEPS: {title: Bi; text: Bi}[] = [
  {title: {ar: 'قل لنا ما تحتاجه', en: 'Tell us what you need'}, text: {ar: 'اكتب المنتج أو الخدمة، ومعها الكمية أو الميزانية إن كانت عندك.', en: 'Describe the product or service, with a quantity or budget if you have one.'}},
  {title: {ar: 'نبحث عنه في كوريا', en: 'We find it in Korea'}, text: {ar: 'ندوّر عند المصنّعين والموردين في كوريا على ما يناسب طلبك.', en: 'We look among Korean makers and suppliers for what fits your request.'}},
  {title: {ar: 'نتحقق', en: 'We verify'}, text: {ar: 'نراجع المورّد والمواصفات معك قبل أي التزام.', en: 'We check the supplier and the specifications with you before anything is committed.'}},
  {title: {ar: 'نوصّله لك', en: 'We deliver'}, text: {ar: 'نرتّب الشحن والتوصيل إلى بلدك في الخليج أو مصر.', en: 'We arrange shipping and delivery to your country in the Gulf or Egypt.'}},
];

const REQUEST_CATEGORIES = CATEGORIES.filter(c => !c.href).map(c => ({value: c.sector, label: c.name}));

/** The sourcing funnel: one promise and one button, the four steps, the fields, the request, then the solutions we track. */
export function KoreanSolutionsHub({locale, solutions, record}: {locale: Locale; solutions: Solution[]; record: boolean}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  return <Shell locale={locale} path="/korean-solutions">
    <section className={styles.hero} aria-labelledby="ks-title"><div className={styles.gutter}><div className={`${styles.inner} ${styles.heroInner}`}>
      <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>KOREAN SOLUTIONS · VISIONSEEK</p>
      <h1 id="ks-title">{ar ? 'محتاج منتج أو خدمة من كوريا؟ نجيبها لك.' : 'Need a product or service from Korea? We’ll source it for you.'}</h1>
      <p className={styles.heroLede}>{ar
        ? 'من مصر أو من أي بلد في الخليج: قل لنا ما تحتاجه، فنبحث عنه في كوريا، ونتحقق منه، ونوصّله لك.'
        : 'From Egypt or anywhere in the Gulf: tell us what you need. We find it in Korea, check it, and deliver it to you.'}</p>
      <div className={styles.heroCta}>
        <a className={styles.cta} href="#needs">{ar ? 'اطلب من كوريا' : 'Request from Korea'} <span aria-hidden="true">{ar ? '←' : '→'}</span></a>
        <span>{ar ? 'نرد عليك بأنفسنا، بلا رسائل آلية.' : 'We reply personally. No automated messages.'}</span>
      </div>
    </div></div></section>

    <div className={styles.gutter}><section id="how" className={`${styles.inner} ${styles.how}`} aria-labelledby="how-title">
      <h2 id="how-title">{ar ? 'خطوات الطلب' : 'How it works'}</h2>
      <ol className={styles.steps}>{STEPS.map((s, i) => <li key={i}><span className={styles.num}>{String(i + 1).padStart(2, '0')}</span><b>{t(s.title)}</b><p>{t(s.text)}</p></li>)}</ol>
    </section></div>

    <Categories locale={locale}/>

    <section id="needs" className={`${styles.needs} ${styles.gutter}`} aria-labelledby="needs-title"><div className={`${styles.inner} ${styles.needsInner}`}>
      <div className={styles.needsText}>
        <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>YOUR REQUEST</p>
        <h2 id="needs-title">{ar ? 'اكتب طلبك' : 'Tell us what you need'}</h2>
        <p>{ar ? 'املأ الحقول المطلوبة (*)، وأضف أي تفصيل يساعدنا على فهم طلبك.' : 'Fill in the required fields (*), and add any detail that helps us understand your request.'}</p>
        <p className={styles.needsAlt}>{ar ? 'تفضّل واتساب؟' : 'Prefer WhatsApp?'} <a href={whatsappUrl()} target="_blank" rel="noreferrer" dir="ltr">{site.phoneDisplay}</a></p>
      </div>
      <div className={styles.needsForm}>
        <RequestForm locale={locale} kind="korea" page={`${ORIGIN}${p}/korean-solutions`} categories={REQUEST_CATEGORIES} record={record}/>
      </div>
    </div></section>

    <Finder locale={locale} solutions={solutions}/>
  </Shell>;
}

export function KoreanSolutionDetail({locale, s, related, record}: {locale: Locale; s: Solution; related: Solution[]; record: boolean}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en) || v.ar; const p = ar ? '/ar' : '';
  const type = TYPE_COPY[s.type];
  const sector = ar ? s.sector : SECTOR_EN[s.sector] || s.sector;
  const where = t(s.where);
  const credit = PHOTO_CREDIT[s.slug];
  return <Shell locale={locale} path={`/korean-solutions/${s.slug}`} here={`${t(type.many)} · ${sector}`}>
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
      <figure className={styles.dPhoto}>
        <Image src={productImage(s.slug)} alt="" fill sizes="(max-width:900px) 100vw, 420px"/>
        {credit && <figcaption className={styles.credit}>{ar ? 'الصورة' : 'Photo'}: {credit}</figcaption>}
      </figure>
      <div className={styles.dActions}>
        <a className={styles.primary} href="#request">{ar ? 'اطلب هذا الحل' : 'Ask for this solution'}</a>
        <Link className={styles.secondary} href={`${p}/korean-solutions#finder`}>{ar ? 'كل الحلول التي نرصدها' : 'All the solutions we track'}</Link>
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
        <p>{ar ? 'اكتب لنا عن طلبك، ونعود إليك بالخطوة التالية.' : 'Tell us about your request, and we will come back to you with the next step.'}</p>
        <RequestForm locale={locale} kind="korea" page={`${ORIGIN}${p}/korean-solutions/${s.slug}`} about={t(s.title)} hide={['category', 'link']} record={record}/>
        <p className={styles.fine}>{t(NO_PARTNERSHIP)}</p>
      </aside>
    </div></div>

    {related.length > 0 && <div className={styles.gutter}><section className={`${styles.inner} ${styles.related}`} aria-labelledby="related-title">
      <h2 id="related-title">{ar ? 'حلول أخرى في المجال نفسه' : 'More in the same field'}</h2>
      <div className={styles.relatedGrid}>{related.map(r => <SolutionCard key={r.slug} s={r} locale={locale}/>)}</div>
    </section></div>}
  </Shell>;
}

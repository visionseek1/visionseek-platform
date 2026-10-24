import Link from 'next/link';
import Image from 'next/image';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {SolutionCard} from './finder';
import StickyCta from './sticky-cta';
import {PHOTO_CREDIT, productImage} from './photos';
import styles from './ks.module.css';
import {NO_PARTNERSHIP, REGION_COPY, ROUTES, ROUTE_COPY, SECTOR_EN, TYPE_COPY, type Bi, type Solution} from '@/lib/korean-solutions-copy';
import {mailto, site} from '@/lib/site';

type Locale = 'ar' | 'en';

function transferMail(locale: Locale, about?: string) {
  const subject = locale === 'ar'
    ? `VisionSeek — مناقشة مشروع نقل تكنولوجيا${about ? `: ${about}` : ''}`
    : `VisionSeek — Technology-transfer discussion${about ? `: ${about}` : ''}`;
  return mailto(subject);
}

function Shell({locale, path, here, children}: {locale: Locale; path: string; here?: string; children: React.ReactNode}) {
  const ar = locale === 'ar'; const p = ar ? '/ar' : '';
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
    <CapabilityHeader locale={locale} path={path}/>
    <main id="main-content" className={`${styles.page} ${ar ? '' : styles.en}`}>
      <nav className={`${styles.bar} ${styles.gutter}`} aria-label={ar ? 'أقسام حلول من كوريا' : 'Korean Solutions sections'}><div className={`${styles.inner} ${styles.barInner}`}>
        <span className={styles.barName}><Link href={`${p}/korean-solutions`}>{ar ? 'حلول من كوريا' : 'Korean Solutions'}</Link>{here && <><span className={styles.sep} aria-hidden="true">/</span><span className={styles.here}>{here}</span></>}</span>
        <span className={styles.barNav}>
          <a href={`${p}/korean-solutions#do`}>{ar ? 'ماذا نفعل' : 'What we do'}</a>
          <a href={`${p}/korean-solutions#how`}>{ar ? 'كيف نعمل' : 'How we work'}</a>
          <a href={`${p}/korean-solutions#initiatives`}>{ar ? 'المبادرات' : 'Initiatives'}</a>
          <Link href={`${p}/cars`}>{ar ? 'السيارات' : 'Cars'}</Link>
          <a className={styles.barCta} href={transferMail(locale)}>{ar ? 'ناقش مشروع نقل تكنولوجيا' : 'Discuss a transfer project'}</a>
        </span>
      </div></nav>
      {children}
      <StickyCta locale={locale}/>
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

const WHAT: {title: Bi; text: Bi}[] = [
  {title: {ar: 'نقل التكنولوجيا', en: 'Technology transfer'}, text: {ar: 'نربط المؤسسة بالشريك الكوري المناسب، ونصمم مسار النقل والتدريب حتى تمتلك القدرة.', en: 'We connect the institution to the right Korean counterpart, and design the transfer and training path until the capability is theirs.'}},
  {title: {ar: 'شراكات صناعية', en: 'Industrial partnerships'}, text: {ar: 'شراكات تصنيع وتجميع وتكييف محلي بدل الاستيراد الدائم.', en: 'Partnerships for manufacturing, assembly and local adaptation — not permanent import.'}},
  {title: {ar: 'المبادرات', en: 'Initiatives'}, text: {ar: 'برامج تبني الكفاءات العربية التي تحمل هذه القدرات.', en: 'Programmes that build the Arab people who will carry these capabilities.'}},
];

const HOW: Bi[] = [
  {ar: 'نفهم الحاجة الاستراتيجية', en: 'Understand the strategic need'},
  {ar: 'نحدد القدرة الكورية المناسبة', en: 'Identify the fitting Korean capability'},
  {ar: 'نصمم مسار النقل', en: 'Design the transfer path'},
  {ar: 'نبني الكفاءة محليًا', en: 'Build competence locally'},
  {ar: 'تمتلك المؤسسة القدرة', en: 'The institution owns the capability'},
];

const INITIATIVE = {
  proposedName: {ar: 'بوابات إنتشون: مبادرة تمكين الشباب العربي', en: 'Incheon Gateways: an initiative to empower Arab youth'},
  alternatives: [
    {ar: 'جسور القدرات الكورية', en: 'Korean Capability Bridges'},
    {ar: 'سفراء القدرات', en: 'Capability Ambassadors'},
  ],
  idea: {
    ar: 'نختار شبابًا عربًا متميزين وندربهم تدريبًا عميقًا على القدرات والتكنولوجيا الكورية وطريقة نقلها، ليصبح كل منهم بوابة لهذه القدرات في بلده ومؤسسته.',
    en: 'We select outstanding Arab youth and train them in depth on Korean capabilities and technology, and on how those are transferred, so each becomes a gateway to those capabilities in their country and institution.',
  },
  gains: {
    ar: 'تدريب متخصص، وفهم عملي لمنظومة الصناعة والتكنولوجيا الكورية، وموقع بوابة بين القدرات الكورية والمؤسسات العربية.',
    en: 'Specialised training, a working grasp of Korea’s industry and technology system, and a place as a gateway between Korean capabilities and Arab institutions.',
  },
  status: {ar: 'سيتم فتح باب التسجيل قريبًا', en: 'Registration will open soon'},
};

/** Institutional front: transfer the capability, not ship the product. Initiatives live here. Cars stay on /cars. */
export function KoreanSolutionsHub({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en);
  return <Shell locale={locale} path="/korean-solutions">
    <section className={styles.hero} aria-labelledby="ks-title"><div className={styles.gutter}><div className={`${styles.inner} ${styles.heroInner}`}>
      <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>KOREAN SOLUTIONS · VISIONSEEK</p>
      <h1 id="ks-title">{ar ? 'من كوريا إلى المنطقة العربية: نقل القدرة، لا شحن المنتج' : 'From Korea to the Arab region: transfer the capability, not ship the product'}</h1>
      <p className={styles.heroLede}>{ar
        ? 'نساعد الشركات والمؤسسات العربية على نقل المنتجات والتكنولوجيا الكورية وتوطينها، ونطلق مبادرات تبني جسورًا دائمة بين كوريا والعالم العربي.'
        : 'We help Arab companies and institutions transfer Korean products and technology, and localise them. We also launch initiatives that build lasting bridges between Korea and the Arab world.'}</p>
      <div className={styles.heroCta}>
        <a className={styles.cta} href={transferMail(locale)}>{ar ? 'ناقش مشروع نقل تكنولوجيا' : 'Discuss a technology-transfer project'} <span aria-hidden="true">{ar ? '←' : '→'}</span></a>
        <span>{ar ? 'يفتح الزر رسالة إلى أحمد عبدالعليم. بلا رسائل آلية.' : 'The button opens an email to Ahmed Abdelalim. No automated messages.'}</span>
      </div>
    </div></div></section>

    <div className={styles.gutter}><section id="do" className={`${styles.inner} ${styles.band}`} aria-labelledby="do-title">
      <div className={styles.secHead}>
        <h2 id="do-title">{ar ? 'ماذا نفعل' : 'What we do'}</h2>
        <p>{ar ? 'المنطق مؤسسي: امتلاك القدرة، لا شراء شحنة.' : 'The posture is institutional: own the capability, do not buy a shipment.'}</p>
      </div>
      <ul className={styles.doGrid}>{WHAT.map((item, i) => <li key={i}><b>{t(item.title)}</b><p>{t(item.text)}</p></li>)}</ul>
    </section></div>

    <div className={styles.gutter}><section id="how" className={`${styles.inner} ${styles.how}`} aria-labelledby="how-title">
      <h2 id="how-title">{ar ? 'كيف نعمل' : 'How we work'}</h2>
      <ol className={styles.steps}>{HOW.map((s, i) => <li key={i}><span className={styles.num}>{String(i + 1).padStart(2, '0')}</span><b>{t(s)}</b></li>)}</ol>
    </section></div>

    <section id="talk" className={`${styles.talk} ${styles.gutter}`} aria-labelledby="talk-title"><div className={`${styles.inner} ${styles.talkInner}`}>
      <div>
        <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>EMAIL</p>
        <h2 id="talk-title">{ar ? 'ناقش مشروع نقل تكنولوجيا' : 'Discuss a technology-transfer project'}</h2>
        <p>{ar ? 'التواصل بالبريد فقط. أحمد عبدالعليم يرد بنفسه.' : 'Email only. Ahmed Abdelalim replies himself.'}</p>
      </div>
      <a className={styles.talkBtn} href={transferMail(locale)}>
        <span>{ar ? 'افتح رسالة' : 'Open an email'}</span>
        <b dir="ltr">{site.email}</b>
      </a>
    </div></section>

    <div className={styles.gutter}><section id="initiatives" className={`${styles.inner} ${styles.band}`} aria-labelledby="ini-title">
      <div className={styles.secHead}>
        <h2 id="ini-title">{ar ? 'المبادرات' : 'Initiatives'}</h2>
        <p>{ar ? 'مبادرات تبني جسورًا بشرية دائمة بين كوريا والمنطقة العربية.' : 'Initiatives that build lasting human bridges between Korea and the Arab region.'}</p>
      </div>
      <article className={styles.ini} aria-labelledby="ini-name">
        <p className={styles.proposal}>{ar ? 'اسم مقترح — بانتظار اعتماد أحمد عبدالعليم' : 'Proposed name — pending Ahmed Abdelalim’s approval'}</p>
        <h3 id="ini-name">{t(INITIATIVE.proposedName)}</h3>
        <p className={styles.iniAlts}>{ar ? 'بدائل مقترحة:' : 'Proposed alternatives:'} {INITIATIVE.alternatives.map(a => t(a)).join(ar ? ' · ' : ' · ')}</p>
        <p className={styles.iniStatus} role="status">{t(INITIATIVE.status)}</p>
        <div className={styles.iniBody}>
          <div>
            <h4>{ar ? 'الفكرة' : 'The idea'}</h4>
            <p>{t(INITIATIVE.idea)}</p>
          </div>
          <div>
            <h4>{ar ? 'ماذا يحصل عليه المشارك' : 'What a participant receives'}</h4>
            <p>{t(INITIATIVE.gains)}</p>
          </div>
        </div>
        <p className={styles.iniNote}>{ar
          ? 'لا يوجد نموذج تسجيل على هذه الصفحة. سيُعلن فتح الباب هنا عندما يُعتمد.'
          : 'There is no registration form on this page. The opening will be announced here when it is approved.'}</p>
      </article>
    </section></div>
  </Shell>;
}

export function KoreanSolutionDetail({locale, s, related}: {locale: Locale; s: Solution; related: Solution[]}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en) || v.ar; const p = ar ? '/ar' : '';
  const type = TYPE_COPY[s.type];
  const sector = ar ? s.sector : SECTOR_EN[s.sector] || s.sector;
  const where = t(s.where);
  const credit = PHOTO_CREDIT[s.slug];
  const mail = transferMail(locale, t(s.title));
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
        <a className={styles.primary} href={mail}>{ar ? 'ناقش نقل هذه القدرة' : 'Discuss transferring this capability'}</a>
        <Link className={styles.secondary} href={`${p}/korean-solutions`}>{ar ? 'حلول من كوريا' : 'Korean Solutions'}</Link>
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
      <aside id="talk" className={styles.aside} aria-labelledby="request-title">
        <h2 id="request-title">{ar ? 'ناقش نقل هذه القدرة' : 'Discuss transferring this capability'}</h2>
        <p>{ar ? 'التواصل بالبريد فقط. ليست طلب شراء، ولا نموذج تسجيل.' : 'Email only. This is not a purchase request, and not a registration form.'}</p>
        <a className={styles.cta} href={mail}>{ar ? 'افتح رسالة' : 'Open an email'} <span aria-hidden="true">↗</span></a>
        <p className={styles.fine}>{t(NO_PARTNERSHIP)}</p>
      </aside>
    </div></div>

    {related.length > 0 && <div className={styles.gutter}><section className={`${styles.inner} ${styles.related}`} aria-labelledby="related-title">
      <h2 id="related-title">{ar ? 'حلول أخرى في المجال نفسه' : 'More in the same field'}</h2>
      <div className={styles.relatedGrid}>{related.map(r => <SolutionCard key={r.slug} s={r} locale={locale}/>)}</div>
    </section></div>}
  </Shell>;
}

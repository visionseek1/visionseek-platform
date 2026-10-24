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
          <a href={`${p}/korean-solutions#domains`}>{ar ? 'المجالات' : 'Fields'}</a>
          <a href={`${p}/korean-solutions#how`}>{ar ? 'كيف نعمل' : 'How we work'}</a>
          <a href={`${p}/korean-solutions#initiatives`}>{ar ? 'المبادرات' : 'Initiatives'}</a>
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
  {title: {ar: 'شراكات صناعية', en: 'Industrial partnerships'}, text: {ar: 'نصمم شراكات تصنيع وتجميع وتكييف محلي تملك المؤسسة خط الإنتاج.', en: 'We design manufacturing, assembly and local-adaptation partnerships that put the production line in the institution’s hands.'}},
  {title: {ar: 'المبادرات', en: 'Initiatives'}, text: {ar: 'نبني الكفاءات العربية التي تحمل هذه القدرات وتنقلها.', en: 'We build the Arab talent who will carry these capabilities and pass them on.'}},
];

const HOW: Bi[] = [
  {ar: 'نفهم الحاجة الاستراتيجية', en: 'Understand the strategic need'},
  {ar: 'نحدد القدرة الكورية المناسبة', en: 'Select the Korean capability'},
  {ar: 'نصمم مسار النقل', en: 'Design the transfer path'},
  {ar: 'نبني الكفاءة محليًا', en: 'Build competence locally'},
  {ar: 'تمتلك المؤسسة القدرة', en: 'The institution owns the capability'},
];

type Domain = {id: string; image: string; title: Bi; text: Bi; href?: string};

const PRODUCTS: Domain[] = [
  {id: 'medical', image: '/ks/domains/medical.webp', title: {ar: 'الطب والتقنية الصحية', en: 'Medicine and health tech'}, text: {ar: 'مثال على قدرة يمكن نقلها وتوطينها: التشخيص والعلاج والتقنيات الصحية الكورية.', en: 'An example of a capability that can be transferred and localised: Korean diagnostics, treatment and health technologies.'}},
  {id: 'beauty', image: '/ks/domains/beauty.webp', title: {ar: 'التجميل والعناية الكورية', en: 'K-beauty and personal care'}, text: {ar: 'ننقل منظومة التجميل والعناية الكورية: المنتج، والمعرفة، ومعايير التشغيل.', en: 'We transfer the Korean beauty and care system: the product, the know-how, and the operating standard.'}},
  {id: 'manufacturing', image: '/ks/domains/manufacturing.webp', title: {ar: 'التصنيع الذكي والمعدات الصناعية', en: 'Smart manufacturing and industrial equipment'}, text: {ar: 'ننقل خطوط التصنيع والمعدات الصناعية الكورية، ونوطّن تشغيلها.', en: 'We transfer Korean production lines and industrial equipment, and root their operation locally.'}},
  {id: 'energy', image: '/ks/domains/energy.webp', title: {ar: 'الطاقة والبطاريات والمركبات الكهربائية', en: 'Energy, batteries and electric vehicles'}, text: {ar: 'ننقل قدرات الطاقة والبطارية والمركبة الكهربائية الكورية إلى المؤسسة.', en: 'We transfer Korean energy, battery and electric-vehicle capability into the institution.'}},
  {id: 'education', image: '/ks/domains/education.webp', title: {ar: 'التعليم والتقنيات الرقمية', en: 'Education and digital / edtech'}, text: {ar: 'ننقل حلول التعليم الرقمي والمنصات الكورية، ونوطّنها في المؤسسة التعليمية.', en: 'We transfer Korean digital-education solutions and platforms, and root them in the learning institution.'}},
  {id: 'agriculture', image: '/ks/domains/agriculture.webp', title: {ar: 'الزراعة الذكية وتقنيات الغذاء', en: 'Smart agriculture and food tech'}, text: {ar: 'ننقل الزراعة المحمية وتقنيات الغذاء الكورية إلى المنتج العربي.', en: 'We transfer Korean protected agriculture and food technology to the Arab producer.'}},
];

const SERVICES: Domain[] = [
  {id: 'transfer', image: '/ks/domains/transfer.webp', title: {ar: 'نقل التكنولوجيا', en: 'Technology transfer'}, text: {ar: 'نصمم مسار النقل من الشريك الكوري حتى تمتلك المؤسسة القدرة.', en: 'We design the transfer path from the Korean counterpart until the institution owns the capability.'}},
  {id: 'partnerships', image: '/ks/domains/partnerships.webp', title: {ar: 'الشراكات الصناعية', en: 'Industrial partnerships'}, text: {ar: 'نبني شراكة تصنيع وتجميع وتكييف تملك المؤسسة موضعها في السلسلة.', en: 'We build a manufacturing, assembly and adaptation partnership that gives the institution its place in the chain.'}},
  {id: 'training', image: '/ks/domains/training.webp', title: {ar: 'التدريب وبناء الكفاءة', en: 'Training and competence'}, text: {ar: 'ندرّب الفريق المحلي حتى يشغّل القدرة ويطوّرها.', en: 'We train the local team to run the capability and advance it.'}},
];

const RELAY = {
  href: '/programs/relay',
  kicker: {ar: 'برنامج مرتبط', en: 'Related program'},
  title: {ar: 'Relay يدير التزام نقل القدرة على مدى عمر المشروع.', en: 'Relay manages the transfer obligation for the life of the project.'},
  body: {ar: 'في الصفقات الكورية–العربية المدنية نقيس النقل على سلّم الامتلاك: استخدام، تجميع، تكييف، تصميم، تصدير. التقارير تصل إلى الطرفين.', en: 'In civil Korean–Arab deals we measure transfer on the ownership ladder: use, assemble, adapt, design, export. Reports go to both sides.'},
  cta: {ar: 'افتح Relay', en: 'Open Relay'},
};

const INITIATIVE = {
  name: {ar: 'بوابات إنتشون: مبادرة تمكين الشباب العربي', en: 'Incheon Gateways: an initiative to empower Arab youth'},
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

function DomainGrid({locale, items}: {locale: Locale; items: Domain[]}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  return <ul className={styles.catGrid}>
    {items.map(c => {
      const body = <>
        <span className={styles.catPhoto}><Image src={c.image} alt="" fill sizes="(max-width:560px) 100vw, (max-width:1100px) 50vw, 300px"/></span>
        <span className={styles.catBody}>
          <b>{t(c.title)}</b>
          <span>{t(c.text)}</span>
          {c.href && <span className={styles.catGo}>{ar ? 'افتح الصفحة' : 'Open the page'} <span aria-hidden="true">{ar ? '←' : '→'}</span></span>}
        </span>
      </>;
      return <li key={c.id}>{c.href
        ? <Link className={styles.cat} href={`${p}${c.href}`}>{body}</Link>
        : <article className={styles.cat}>{body}</article>}</li>;
    })}
  </ul>;
}

/** Institutional front: transfer and localise Korean capability. Initiatives live here. */
export function KoreanSolutionsHub({locale}: {locale: Locale}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en);
  return <Shell locale={locale} path="/korean-solutions">
    <section className={styles.hero} aria-labelledby="ks-title"><div className={styles.gutter}><div className={`${styles.inner} ${styles.heroInner}`}>
      <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>KOREAN SOLUTIONS · VISIONSEEK</p>
      <h1 id="ks-title">{ar ? 'من كوريا إلى المنطقة العربية: ننقل القدرة الكورية ونوطّنها' : 'From Korea to the Arab region: we transfer Korean capability and localise it'}</h1>
      <p className={styles.heroLede}>{ar
        ? 'ننقل إلى الشركات والمؤسسات العربية المنتجات والتكنولوجيا والقدرة الكورية، ونوطّنها في أرضها، ونطلق مبادرات تبني جسورًا راسخة بين كوريا والعالم العربي.'
        : 'We transfer Korean products, technology and capability to Arab companies and institutions, root them locally, and launch initiatives that bind Korea to the Arab world.'}</p>
      <div className={styles.heroCta}>
        <a className={styles.cta} href={transferMail(locale)}>{ar ? 'ناقش مشروع نقل تكنولوجيا' : 'Discuss a technology-transfer project'} <span aria-hidden="true">{ar ? '←' : '→'}</span></a>
        <span>{ar ? 'أحمد عبدالعليم يرد بنفسه.' : 'Ahmed Abdelalim replies himself.'}</span>
      </div>
    </div></div></section>

    <div className={styles.gutter}><section id="do" className={`${styles.inner} ${styles.band}`} aria-labelledby="do-title">
      <div className={styles.secHead}>
        <h2 id="do-title">{ar ? 'ماذا نفعل' : 'What we do'}</h2>
        <p>{ar ? 'نملك المؤسسة القدرة الكورية: نقلًا، وشراكة، وكفاءة تحملها.' : 'We put Korean capability in the institution’s hands: transfer, partnership, and the people who carry it.'}</p>
      </div>
      <ul className={styles.doGrid}>{WHAT.map((item, i) => <li key={i}><b>{t(item.title)}</b><p>{t(item.text)}</p></li>)}</ul>
    </section></div>

    <div className={styles.gutter}><section id="domains" className={`${styles.inner} ${styles.cats}`} aria-labelledby="domains-title">
      <div className={styles.secHead}>
        <h2 id="domains-title">{ar ? 'المجالات' : 'Fields'}</h2>
        <p>{ar ? 'ننقل القدرة الكورية في هذه الميادين، ونوطّنها.' : 'We transfer Korean capability in these fields, and root it here.'}</p>
      </div>
      <h3 className={styles.subHead}>{ar ? 'المنتجات والقدرات' : 'Products and capabilities'}</h3>
      <DomainGrid locale={locale} items={PRODUCTS}/>
      <h3 id="services" className={styles.subHead}>{ar ? 'الخدمات' : 'Services'}</h3>
      <DomainGrid locale={locale} items={SERVICES}/>
    </section></div>

    <div className={styles.gutter}><section id="how" className={`${styles.inner} ${styles.how}`} aria-labelledby="how-title">
      <h2 id="how-title">{ar ? 'كيف نعمل' : 'How we work'}</h2>
      <ol className={styles.steps}>{HOW.map((s, i) => <li key={i}><span className={styles.num}>{String(i + 1).padStart(2, '0')}</span><b>{t(s)}</b></li>)}</ol>
      <article className={styles.programCall} aria-labelledby="relay-title">
        <p className={styles.eyebrow}>{t(RELAY.kicker)}</p>
        <h3 id="relay-title">{t(RELAY.title)}</h3>
        <p>{t(RELAY.body)}</p>
        <Link className={styles.cta} href={`${ar ? '/ar' : ''}${RELAY.href}`}>{t(RELAY.cta)} <span aria-hidden="true">{ar ? '←' : '→'}</span></Link>
      </article>
    </section></div>

    <div className={styles.gutter}><section id="initiatives" className={`${styles.inner} ${styles.band}`} aria-labelledby="ini-title">
      <div className={styles.secHead}>
        <h2 id="ini-title">{ar ? 'المبادرات' : 'Initiatives'}</h2>
        <p>{ar ? 'مبادرات تبني جسورًا بشرية راسخة بين كوريا والمنطقة العربية.' : 'Initiatives that build lasting human bridges between Korea and the Arab region.'}</p>
      </div>
      <article className={styles.ini} aria-labelledby="ini-name">
        <h3 id="ini-name">{t(INITIATIVE.name)}</h3>
        <p className={styles.iniStatus} role="status">{t(INITIATIVE.status)}</p>
        <div className={styles.iniBody}>
          <div>
            <h4>{ar ? 'الفكرة' : 'The idea'}</h4>
            <p>{t(INITIATIVE.idea)}</p>
          </div>
          <div>
            <h4>{ar ? 'ما يكتسبه المشارك' : 'What a participant gains'}</h4>
            <p>{t(INITIATIVE.gains)}</p>
          </div>
        </div>
      </article>
    </section></div>

    <section id="talk" className={`${styles.talk} ${styles.gutter}`} aria-labelledby="talk-title"><div className={`${styles.inner} ${styles.talkInner}`}>
      <div>
        <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>EMAIL</p>
        <h2 id="talk-title">{ar ? 'ناقش مشروع نقل تكنولوجيا' : 'Discuss a technology-transfer project'}</h2>
        <p>{ar ? 'أحمد عبدالعليم يرد بنفسه.' : 'Ahmed Abdelalim replies himself.'}</p>
      </div>
      <a className={styles.talkBtn} href={transferMail(locale)}>
        <span>{ar ? 'افتح رسالة' : 'Open an email'}</span>
        <b dir="ltr">{site.email}</b>
      </a>
    </div></section>
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
        <p>{ar ? 'أحمد عبدالعليم يرد بنفسه.' : 'Ahmed Abdelalim replies himself.'}</p>
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

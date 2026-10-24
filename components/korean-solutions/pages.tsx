import Link from 'next/link';
import Image from 'next/image';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import RequestForm from '@/components/requests/request-form';
import Audience from './audience';
import Categories from './categories';
import Finder, {SolutionCard} from './finder';
import StickyCta from './sticky-cta';
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
          <a href={`${p}/korean-solutions#verify`}>{ar ? 'التحقق' : 'Verification'}</a>
          <a href={`${p}/korean-solutions#categories`}>{ar ? 'ماذا تطلب' : 'What to request'}</a>
          <a href={`${p}/korean-solutions#next`}>{ar ? 'بعد الإرسال' : 'After you send'}</a>
          <a href={`${p}/korean-solutions#faq`}>{ar ? 'أسئلة' : 'FAQ'}</a>
          <Link href={`${p}/cars`}>{ar ? 'السيارات' : 'Cars'}</Link>
          <a className={styles.barCta} href={`${p}/korean-solutions#needs`}>{ar ? 'اكتب طلبك' : 'Your request'}</a>
        </span>
      </div></nav>
      {children}
      <StickyCta locale={locale}/>
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

const STEPS: {title: Bi; text: Bi}[] = [
  {title: {ar: 'قل لنا ما تحتاجه', en: 'Tell us what you need'}, text: {ar: 'اكتب المنتج أو الخدمة، والمواصفة، والكمية أو الميزانية إن كانت عندك.', en: 'Describe the product or service, the spec, and a quantity or budget if you have one.'}},
  {title: {ar: 'نبحث عنه في كوريا', en: 'We find it in Korea'}, text: {ar: 'ندوّر عند المصنّعين والموردين في كوريا على ما يناسب طلبك.', en: 'We look among Korean makers and suppliers for what fits your request.'}},
  {title: {ar: 'نتحقق', en: 'We verify'}, text: {ar: 'نراجع المورّد والمواصفات معك قبل أي التزام.', en: 'We check the supplier and the specifications with you before anything is committed.'}},
  {title: {ar: 'نوصّله لك', en: 'We deliver'}, text: {ar: 'نرتّب الشحن والتوصيل إلى بلدك في الخليج أو مصر.', en: 'We arrange shipping and delivery to your country in the Gulf or Egypt.'}},
];

const REQUEST_CATEGORIES = CATEGORIES.filter(c => !c.href).map(c => ({value: c.sector, label: c.name}));

const VERIFY: {title: Bi; text: Bi}[] = [
  {title: {ar: 'نفهم المواصفة', en: 'We understand the spec'}, text: {ar: 'إيه اللي هيُعتبر مطابق لطلبك: المقاس، الخامة، الاستخدام، وأي شرط مكتوب.', en: 'What “a match” means for you: size, material, use, and any written condition.'}},
  {title: {ar: 'نراجع المورّد', en: 'We review the supplier'}, text: {ar: 'مين الشركة، وبتعمل إيه. من غير ما نختلق شهادات أو شارات توثيق.', en: 'Who the company is, and what it makes. We do not invent certificates or verification badges.'}},
  {title: {ar: 'نطابق العرض على طلبك', en: 'We match the offer to your request'}, text: {ar: 'العرض يتقاس على المواصفة، مش على وصف عام.', en: 'The offer is measured against the spec, not against a vague description.'}},
  {title: {ar: 'نعرضه عليك قبل أي التزام', en: 'We show it to you before any commitment'}, text: {ar: 'مفيش التزام يتكتب غير لما تشوف وتوافق.', en: 'Nothing is committed until you have seen it and agreed.'}},
  {title: {ar: 'معاينة على الأرض لو الحالة تستدعي', en: 'A physical look when the case needs it'}, text: {ar: 'لو الطلب يستاهل فحصًا في كوريا، نتفق على نطاقه معاك الأول. مش خدمة معلنة لكل طلب.', en: 'If the request warrants a check in Korea, we agree the scope with you first. It is not a published service on every request.'}},
];

const NEXT: {title: Bi; text: Bi}[] = [
  {title: {ar: 'الطلب يوصلنا', en: 'The request reaches us'}, text: {ar: 'الزر يفتح رسالة جاهزة إلى بريد أحمد عبدالعليم. على الموقع الحي نسجّل الطلب كمان للمتابعة الداخلية.', en: 'The button opens a ready email to Ahmed Abdelalim. On the live site we also file the request for internal follow-up.'}},
  {title: {ar: 'نقرأه، ونسأل لو ناقص', en: 'We read it, and ask if something is missing'}, text: {ar: 'لو المواصفة أو الكمية أو بلد التسليم مش واضحة، نرجع لك بسؤال محدد.', en: 'If the spec, quantity or destination is unclear, we come back with a specific question.'}},
  {title: {ar: 'ندوّر في كوريا', en: 'We search in Korea'}, text: {ar: 'بين المصنّعين والمورّدين على ما يناسب الطلب. مش كتالوج مفتوح للشراء الفوري.', en: 'Among makers and suppliers for what fits the request. This is not an open catalogue for instant purchase.'}},
  {title: {ar: 'نرجع لك باللي لقيناه', en: 'We come back with what we found'}, text: {ar: 'الخيارات والخطوة التالية. من غير مهلة معلنة بالأيام — المدة تختلف حسب الطلب.', en: 'The options and the next step. We do not publish a turnaround in days — it depends on the request.'}},
  {title: {ar: 'لو وافقت: نتحقق ونرتّب التوصيل', en: 'If you agree: we verify, then arrange delivery'}, text: {ar: 'أي تكلفة أو شرط دفع يتكتب معاك قبل ما يحصل التزام.', en: 'Any cost or payment term is written with you before a commitment is made.'}},
];

const FAQ: {q: Bi; a: Bi}[] = [
  {q: {ar: 'أطلب إيه من الصفحة دي؟', en: 'What can I request on this page?'}, a: {ar: 'منتج أو خدمة من كوريا: معدات، إلكترونيات، حلول للشركات، أو غيرهم. السيارات لها صفحة لوحدها.', en: 'A product or service from Korea: equipment, electronics, solutions for companies, or something else. Cars have their own page.'}},
  {q: {ar: 'لازم أكون شركة؟', en: 'Do I have to be a company?'}, a: {ar: 'لأ. الشركات والأفراد يقدروا يطلبوا. اختَر «شركة أو مؤسسة» أو «فرد» في النموذج عشان نفهم طبيعة الطلب.', en: 'No. Companies and individuals can request. Choose “A company or institution” or “An individual” on the form so we understand the request.'}},
  {q: {ar: 'هتدفعوا إزاي / فيه رسوم؟', en: 'How does payment work, and are there fees?'}, a: {ar: 'مفيش دفع على الموقع، ومفيش جدول رسوم منشور. التكلفة والشحن وأي شرط دفع بنتفق عليهم بعد ما نفهم الطلب، وقبل أي التزام.', en: 'Nothing is paid on this site, and there is no published fee schedule. Cost, shipping and any payment term are agreed after we understand the request, and before any commitment.'}},
  {q: {ar: 'هتردوا امتى؟', en: 'When will you reply?'}, a: {ar: 'أول ما نقدر نفهم الطلب ونشوف السوق. مفيش وعد بعدد أيام على الموقع — المدة تختلف حسب المنتج.', en: 'As soon as we can understand the request and look at the market. We do not promise a number of days on the site — it depends on the item.'}},
  {q: {ar: 'بتتأكدوا من المورّد إزاي؟', en: 'How do you check the supplier?'}, a: {ar: 'نفهم المواصفة، نراجع هوية المورّد، ونطابق العرض على طلبك، ونعرضه عليك قبل الالتزام. المعاينة في كوريا لو الحالة تستدعي ونتفق على نطاقها. مفيش ضمان عام مكتوب هنا.', en: 'We understand the spec, review who the supplier is, match the offer to your request, and show it to you before a commitment. A check in Korea happens when the case needs it and we agree the scope. There is no general guarantee written here.'}},
  {q: {ar: 'الجمارك والشحن؟', en: 'What about customs and shipping?'}, a: {ar: 'نرتّب الشحن من كوريا إلى بلد التسليم. رسوم الجمارك في بلدك حسب قانون بلدك — منغير ما نحدد رقم هنا.', en: 'We arrange shipping from Korea to the destination country. Customs charges in your country follow your country’s law — we do not name a figure here.'}},
  {q: {ar: 'العربيات؟', en: 'What about cars?'}, a: {ar: 'السيارات الهجين والكهربائية على صفحة مستقلة. على الموقع الحي القائمة فاضية لحد ما يتوفر عرض حقيقي.', en: 'Hybrid and electric cars have their own page. On the live site the list is empty until a real listing exists.'}},
  {q: {ar: 'هتتواصلوا إزاي؟', en: 'How will you contact me?'}, a: {ar: 'على البريد أو واتساب بالرقم الظاهر في الصفحة. أحمد عبدالعليم بيرد بنفسه، بلا رسائل آلية.', en: 'By email or WhatsApp, using the number on this page. Ahmed Abdelalim replies himself. No automated messages.'}},
];

/** The sourcing funnel: one promise and one button, the four steps, the fields, the request, then the solutions we track. */
export function KoreanSolutionsHub({locale, solutions, record}: {locale: Locale; solutions: Solution[]; record: boolean}) {
  const ar = locale === 'ar'; const t = (v: Bi) => (ar ? v.ar : v.en); const p = ar ? '/ar' : '';
  return <Shell locale={locale} path="/korean-solutions">
    <section className={styles.hero} aria-labelledby="ks-title"><div className={styles.gutter}><div className={`${styles.inner} ${styles.heroInner}`}>
      <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>KOREAN SOLUTIONS · VISIONSEEK</p>
      <h1 id="ks-title">{ar ? 'محتاج منتج أو خدمة من كوريا؟ نجيبها لك.' : 'Need a product or service from Korea? We’ll source it for you.'}</h1>
      <p className={styles.heroLede}>{ar
        ? 'من مصر أو من أي بلد في الخليج — للشركات وللأفراد: قل لنا ما تحتاجه، فنبحث عنه في كوريا، ونتحقق منه، ونوصّله لك.'
        : 'From Egypt or anywhere in the Gulf — for companies and for individuals: tell us what you need. We find it in Korea, check it, and deliver it to you.'}</p>
      <div className={styles.heroCta}>
        <a className={styles.cta} href="#needs">{ar ? 'اطلب من كوريا' : 'Request from Korea'} <span aria-hidden="true">{ar ? '←' : '→'}</span></a>
        <span>{ar ? 'نرد عليك بأنفسنا، بلا رسائل آلية.' : 'We reply personally. No automated messages.'}</span>
      </div>
      <Audience locale={locale}/>
    </div></div></section>

    <div className={styles.gutter}><section id="how" className={`${styles.inner} ${styles.how}`} aria-labelledby="how-title">
      <h2 id="how-title">{ar ? 'خطوات الطلب' : 'How it works'}</h2>
      <ol className={styles.steps}>{STEPS.map((s, i) => <li key={i}><span className={styles.num}>{String(i + 1).padStart(2, '0')}</span><b>{t(s.title)}</b><p>{t(s.text)}</p></li>)}</ol>
    </section></div>

    <div className={styles.gutter}><section id="verify" className={`${styles.inner} ${styles.band}`} aria-labelledby="verify-title">
      <div className={styles.secHead}>
        <h2 id="verify-title">{ar ? 'إزاي نتحقق' : 'How we verify'}</h2>
        <p>{ar ? 'دي خطوات شغل، مش ضمان منشور ولا برنامج توثيق.' : 'These are working steps, not a published guarantee or a verification programme.'}</p>
      </div>
      <ol className={styles.steps}>{VERIFY.map((s, i) => <li key={i}><span className={styles.num}>{String(i + 1).padStart(2, '0')}</span><b>{t(s.title)}</b><p>{t(s.text)}</p></li>)}</ol>
      <p className={styles.note}>{ar
        ? 'مفيش محفظة ضمان ولا إسكرو على الموقع. أي التزام يتكتب معاك قبل ما يحصل.'
        : 'There is no escrow or payment-protection product on this site. Any commitment is written with you before it happens.'}</p>
    </section></div>

    <Categories locale={locale}/>

    <section id="needs" className={`${styles.needs} ${styles.gutter}`} aria-labelledby="needs-title"><div className={`${styles.inner} ${styles.needsInner}`}>
      <div className={styles.needsText}>
        <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>YOUR REQUEST</p>
        <h2 id="needs-title">{ar ? 'اكتب طلبك' : 'Tell us what you need'}</h2>
        <p>{ar ? 'اختَر شركة أو فرد، املأ الحقول المطلوبة (*)، وأضف المواصفة والكمية والموعد لو عندك.' : 'Choose company or individual, fill in the required fields (*), and add the spec, quantity and timing if you have them.'}</p>
        <p className={styles.needsAlt}>{ar ? 'تفضّل واتساب؟' : 'Prefer WhatsApp?'} <a href={whatsappUrl()} target="_blank" rel="noreferrer" dir="ltr">{site.phoneDisplay}</a></p>
      </div>
      <div className={styles.needsForm}>
        <RequestForm locale={locale} kind="korea" page={`${ORIGIN}${p}/korean-solutions`} categories={REQUEST_CATEGORIES} record={record}/>
      </div>
    </div></section>

    <div className={styles.gutter}><section id="next" className={`${styles.inner} ${styles.band}`} aria-labelledby="next-title">
      <div className={styles.secHead}>
        <h2 id="next-title">{ar ? 'بعد ما تبعت الطلب' : 'What happens after you send'}</h2>
        <p>{ar ? 'المدة تختلف حسب الطلب. مفيش مهلة معلنة بالأيام على الصفحة.' : 'Timing depends on the request. This page does not publish a turnaround in days.'}</p>
      </div>
      <ol className={styles.steps}>{NEXT.map((s, i) => <li key={i}><span className={styles.num}>{String(i + 1).padStart(2, '0')}</span><b>{t(s.title)}</b><p>{t(s.text)}</p></li>)}</ol>
    </section></div>

    <section id="talk" className={`${styles.talk} ${styles.gutter}`} aria-labelledby="talk-title"><div className={`${styles.inner} ${styles.talkInner}`}>
      <div>
        <p className={`${styles.eyebrow} ${styles.latin}`} lang="en" dir="ltr" style={{textAlign: ar ? 'right' : 'left'}}>WHATSAPP</p>
        <h2 id="talk-title">{ar ? 'كلّمنا على واتساب' : 'Write to us on WhatsApp'}</h2>
        <p>{ar ? 'نفس الطلب، من غير ما تفتح البريد. أحمد عبدالعليم بيرد بنفسه.' : 'The same request, without opening email. Ahmed Abdelalim replies himself.'}</p>
      </div>
      <a className={styles.talkBtn} href={whatsappUrl()} target="_blank" rel="noreferrer">
        <span>{ar ? 'افتح واتساب' : 'Open WhatsApp'}</span>
        <b dir="ltr">{site.phoneDisplay}</b>
      </a>
    </div></section>

    <div className={styles.gutter}><section id="faq" className={`${styles.inner} ${styles.faq}`} aria-labelledby="faq-title">
      <div className={styles.secHead}>
        <h2 id="faq-title">{ar ? 'أسئلة متكررة' : 'Questions people ask'}</h2>
        <p>{ar ? 'لو سؤالك مش هنا، اكتبه في الطلب أو على واتساب.' : 'If your question is not here, write it in the request or on WhatsApp.'}</p>
      </div>
      <div className={styles.faqList}>{FAQ.map((item, i) => <details key={i} className={styles.faqItem}>
        <summary>{t(item.q)}</summary>
        <p>{t(item.a)}</p>
      </details>)}</div>
    </section></div>

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

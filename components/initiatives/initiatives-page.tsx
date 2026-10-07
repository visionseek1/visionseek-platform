import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CapabilityHeader } from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';

type Locale = 'ar' | 'en';
const initiativePath = '/initiatives/level-up-korea';

const tracks = [
  {
    ar: { name: 'التنقّل والمركبات', items: 'سيارات، سيارات كهرباء، قوارب، سفن، معدات نقل.', status: 'قيد التجهيز', note: 'المسار الأول. ما نقدمه تدريب وأدوات ومسار عمل، لا مركبات ولا تصدير.' },
    en: { name: 'Mobility', items: 'Cars, electric cars, boats, ships, transport equipment.', status: 'In preparation', note: 'The first path. What we offer is training, tools, and a way of working, not vehicles and not export.' },
  },
  {
    ar: { name: 'الصناعة والتصنيع', items: 'مصانع، معدات، روبوتات، طاقة.', status: 'قريبًا', note: 'نفس المنهج. لم يبدأ بعد.' },
    en: { name: 'Industry', items: 'Factories, equipment, robotics, energy.', status: 'Coming soon', note: 'The same method. Not started.' },
  },
  {
    ar: { name: 'التكنولوجيا والذكاء الاصطناعي', items: 'ذكاء اصطناعي، برمجيات، منتجات ذكية.', status: 'قريبًا', note: 'نفس المنهج. لم يبدأ بعد.' },
    en: { name: 'Tech & AI', items: 'Artificial intelligence, software, smart products.', status: 'Coming soon', note: 'The same method. Not started.' },
  },
];

const copy = {
  ar: {
    home: 'الرئيسية',
    section: 'المبادرات',
    purpose: 'جهد طويل يبني أناسًا يتعلمون العمل من كوريا، ثم يقومون به بأنفسهم. ليست مهمة لعميل واحد.',
    not: 'ليست برنامجًا، ولا مشروعًا، ولا ورشة، ولا تقريرًا. التخصص هو المنهج، لا قطاع.',
    mark: 'by VisionSeek · من كوريا',
    status: 'قيد التجهيز',
    open: 'ادخل Level Up Korea',
    blurb: 'المسار الأول هو التنقّل والمركبات. الصناعة والتكنولوجيا بعده. السعودية أولًا، والخليج مرحلة تالية.',
    hlo: 'HLO هو دخول المؤسسة. Level Up Korea يبني الناس الذين يمكن أن يعملوا داخله لاحقًا. لا توجد دفعة قائمة اليوم.',
  },
  en: {
    home: 'Home',
    section: 'Initiatives',
    purpose: 'A long effort that builds people who learn the work from Korea, then do it themselves. Not a one-off job for one client.',
    not: 'Not a program, not a project, not a workshop, and not a report. The specialty is the method, not a sector.',
    mark: 'by VisionSeek · from Korea',
    status: 'In preparation',
    open: 'Enter Level Up Korea',
    blurb: 'Mobility is the first path. Industry and technology come after. Saudi Arabia first. The Gulf is a later stage.',
    hlo: 'HLO is how we enter an institution. Level Up Korea builds the people who can later work inside it. No cohort is running today.',
  },
} as const;

function Frame({ locale, path, children }: { locale: Locale; path: string; children: React.ReactNode }) {
  return (
    <div className={`vs-site locale-${locale}`} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <CapabilityHeader locale={locale} path={path} />
      <main id="main-content">{children}</main>
      <CapabilityFooter locale={locale} />
    </div>
  );
}

function Hero({ locale, crumbs, eyebrow, title, text, notice }: { locale: Locale; crumbs: React.ReactNode; eyebrow: string; title: string; text: string; notice?: string }) {
  return (
    <section className="vs-institution-hero">
      <div className="vs-institution-hero-copy">
        <nav className="vs-breadcrumb" aria-label={locale === 'ar' ? 'مسار الصفحة' : 'Breadcrumb'}>{crumbs}</nav>
        <p className="vs-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
        {notice ? <p className="vs-directory-notice">{notice}</p> : null}
      </div>
      <div className="vs-institution-hero-image"><Image src="/field-industry.jpg" alt="" fill priority sizes="(max-width:760px) 100vw, 40vw" /></div>
    </section>
  );
}

export function InitiativesIndex({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const p = locale === 'ar' ? '/ar' : '';
  return (
    <Frame locale={locale} path="/initiatives">
      <Hero locale={locale} eyebrow="VISIONSEEK" title={t.section} text={t.purpose} notice={t.not} crumbs={<><Link href={p || '/'}>{t.home}</Link><span>/</span><span>{t.section}</span></>} />
      <div className="vs-institution-layout">
        <aside className="vs-institution-aside">
          <p className="vs-eyebrow">VISIONSEEK</p>
          <h2>{locale === 'ar' ? 'المبادرة' : 'The initiative'}</h2>
          <nav aria-label={locale === 'ar' ? 'روابط القسم' : 'Section links'}>
            <Link href={`${p}${initiativePath}`}>Level Up Korea<ArrowRight size={16} /></Link>
          </nav>
        </aside>
        <div>
          <article className="vs-directory-card">
            <div className="vs-directory-content">
              <span className="vs-status">{t.status}</span>
              <h2><Link href={`${p}${initiativePath}`}>Level Up Korea</Link></h2>
              <p>{t.mark}</p>
              <p>{t.blurb}</p>
              <Link className="vs-directory-cta" href={`${p}${initiativePath}`}>{t.open}<ArrowRight size={18} /></Link>
            </div>
          </article>
        </div>
      </div>
      <section className="vs-institution-cta">
        <div>
          <p className="vs-eyebrow">HLO</p>
          <h2>{t.hlo}</h2>
        </div>
        <Link href={`${p}/about/what-we-do#hlo`} className="vs-button">HLO<ArrowRight size={18} /></Link>
      </section>
    </Frame>
  );
}

const page = {
  ar: {
    hero: 'تتعلم العمل من الصفر، من ممارسة شغالة في كوريا. ثم تقوم به أنت.',
    where: 'السعودية أولًا. الخليج مرحلة تالية.',
    problemTitle: 'لماذا هذا المسار',
    problem: 'الشراء من وسيط لا يبني شخصًا يرى العمل ويتحقق منه ويقوم به. Level Up Korea يبني هذا الشخص، ولا يبيع الصفقة.',
    methodTitle: 'منهج واحد. ثلاثة مسارات.',
    steps: [
      'نرى العمل من مصدر شغال في كوريا.',
      'نتحقق منه قبل أن نعلّمه.',
      'يتعلمه الممارس من الصفر، داخل نظام.',
      'نعمل معًا.',
      'ثم يعملون هم بأنفسهم.',
    ],
    tracksTitle: 'كوريا قوية هنا. المنهج هو الأساس.',
    whoTitle: 'من ينضم',
    who: 'شخص يبدأ من الصفر ويريد أن يتعلم العمل ثم يمارسه معنا. أو مؤسسة تريد هذه القدرة عندها. السعودية أولًا. الخليج مرحلة تالية. لا توجد دفعة مفتوحة اليوم.',
    getTitle: 'ماذا يحصل عليه',
    get: 'تدريب، وأدوات، ومسار عمل مكتوب. حين يوجد مقابل، يكون أجرًا ثابتًا ومعلنًا. أي حصة لشريك تُكتب. لا عمولة خفية ولا ربا. لا أسعار في هذه الصفحة.',
    statusTitle: 'الحالة',
    statusBody: 'قيد التجهيز. لا خريجون، ولا نتائج، ولا شركاء.',
    cta: 'حدّثنا عن Level Up Korea',
    ctaNote: 'الزر يجهّز رسالة. لا يعني أن الطلب سُجّل.',
  },
  en: {
    hero: 'Learn the work from zero, from a practice that already runs in Korea. Then you do it.',
    where: 'Saudi Arabia first. The Gulf is a later stage.',
    problemTitle: 'Why this path',
    problem: 'Buying through a middleman does not build someone who can see the work, check it, and do it. Level Up Korea builds that person. It does not sell the deal.',
    methodTitle: 'One method. Three paths.',
    steps: [
      'We see the work from a source that already runs in Korea.',
      'We verify it before we teach it.',
      'The practitioner learns it from zero, inside a system.',
      'We do the work together.',
      'Then they do it themselves.',
    ],
    tracksTitle: 'Korea is strong here. The method is the point.',
    whoTitle: 'Who joins',
    who: 'Someone starting from zero who wants to learn the work and then practice it with us. Or an organization that wants this capability in-house. Saudi Arabia first. The Gulf comes later. No cohort is open today.',
    getTitle: 'What you get',
    get: 'Training, tools, and a written way of working. When there is a fee, it is fixed and disclosed. Any partner share is written down. No hidden commission and no interest. No prices on this page.',
    statusTitle: 'Status',
    statusBody: 'In preparation. No graduates, no results, and no partners.',
    cta: 'Talk to us about Level Up Korea',
    ctaNote: 'The button prepares a message. It does not mean the request was registered.',
  },
} as const;

export function KoreaInitiative({ locale }: { locale: Locale }) {
  const t = page[locale];
  const p = locale === 'ar' ? '/ar' : '';
  const sections = [
    ['problem', t.problemTitle],
    ['method', t.methodTitle],
    ['tracks', t.tracksTitle],
    ['who', t.whoTitle],
    ['receive', t.getTitle],
    ['status', t.statusTitle],
  ] as const;
  return (
    <Frame locale={locale} path={initiativePath}>
      <Hero locale={locale} eyebrow={copy[locale].mark} title="Level Up Korea" text={t.hero} notice={t.where} crumbs={<><Link href={p || '/'}>{copy[locale].home}</Link><span>/</span><Link href={`${p}/initiatives`}>{copy[locale].section}</Link><span>/</span><span>Level Up Korea</span></>} />
      <div className="vs-detail-layout">
        <aside className="vs-detail-aside">
          <h2>{locale === 'ar' ? 'في هذه الصفحة' : 'On this page'}</h2>
          <nav aria-label={locale === 'ar' ? 'محتويات الصفحة' : 'Page contents'}>
            {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <Link href={`${p}/initiatives`} className="vs-text-link">{locale === 'ar' ? 'العودة إلى القسم' : 'Back to section'}<ArrowRight size={17} /></Link>
        </aside>
        <article className="vs-detail-body">
          <section id="problem"><h2>{t.problemTitle}</h2><p>{t.problem}</p></section>
          <section id="method"><h2>{t.methodTitle}</h2><ul>{t.steps.map(step => <li key={step}>{step}</li>)}</ul></section>
          <section id="tracks">
            <h2>{t.tracksTitle}</h2>
            <div className="vs-directory-grid">
              {tracks.map(track => {
                const item = track[locale];
                return (
                  <article className="vs-directory-card" key={item.name}>
                    <div className="vs-directory-content">
                      <span className="vs-status">{item.status}</span>
                      <h2>{item.name}</h2>
                      <p>{item.items}</p>
                      <p>{item.note}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
          <section id="who"><h2>{t.whoTitle}</h2><p>{t.who}</p></section>
          <section id="receive"><h2>{t.getTitle}</h2><p>{t.get}</p></section>
          <section id="status"><h2>{t.statusTitle}</h2><p>{t.statusBody}</p></section>
          <p><Link className="vs-button" href={`${p}/start?from=initiatives`}>{t.cta}<ArrowRight size={18} /></Link></p>
          <p className="vs-directory-notice">{t.ctaNote}</p>
          <p><Link href={`${p}/about/what-we-do#hlo`}>HLO</Link> · <Link href={`${p}/programs`}>{locale === 'ar' ? 'البرامج' : 'Programs'}</Link> · <Link href={`${p}/work-with-us`}>{locale === 'ar' ? 'اعمل معنا' : 'Work with us'}</Link></p>
        </article>
      </div>
    </Frame>
  );
}

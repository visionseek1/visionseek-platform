import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CapabilityHeader } from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';

type Locale = 'ar' | 'en';

const tracks = [
  {
    ar: { name: 'التنقّل والمركبات', items: 'سيارات، سيارات كهرباء، قوارب، سفن، معدات نقل.', status: 'قيد التجهيز', note: 'المسار الأول. ما نبيعه تدريب وأدوات ومسار عمل، لا مركبات ولا تصدير.' },
    en: { name: 'Mobility', items: 'Cars, electric cars, boats, ships, transport equipment.', status: 'In preparation', note: 'The first path. We sell training, tools, and a way of working, not vehicles and not export.' },
  },
  {
    ar: { name: 'الصناعة والتصنيع', items: 'مصانع، معدات، روبوتات، طاقة.', status: 'قريبًا', note: 'نفس المنهج، لم يبدأ بعد.' },
    en: { name: 'Industry', items: 'Factories, equipment, robotics, energy.', status: 'Coming soon', note: 'The same method. Not started.' },
  },
  {
    ar: { name: 'التكنولوجيا والذكاء الاصطناعي', items: 'ذكاء اصطناعي، برمجيات، منتجات ذكية.', status: 'قريبًا', note: 'نفس المنهج، لم يبدأ بعد.' },
    en: { name: 'Tech & AI', items: 'Artificial intelligence, software, smart products.', status: 'Coming soon', note: 'The same method. Not started.' },
  },
];

const copy = {
  ar: {
    home: 'الرئيسية',
    section: 'المبادرات',
    purpose: 'مش مهمة لعميل واحد. دي مسار طويل: ناس يتعلموا الشغل من كوريا، وبعدين يعملوه هم.',
    not: 'مش برنامج، ومش مشروع، ومش ورشة، ومش تقرير. التخصص المنهجية، مش قطاع.',
    mark: 'by VisionSeek · من كوريا',
    status: 'قيد التجهيز',
    open: 'ادخل Forge',
    blurb: 'المسار الأول التنقّل والمركبات. الصناعة والتكنولوجيا بعده. السعودية الأول، والخليج مرحلة تالية.',
    hlo: 'HLO دخول المؤسسة. Forge يبني الناس اللي يمكن يشتغلوا جواه بعدين. مفيش دفعة قائمة النهاردة.',
  },
  en: {
    home: 'Home',
    section: 'Initiatives',
    purpose: 'Not a one-off job for one client. A long path: people learn the work from Korea, then do it themselves.',
    not: 'Not a program, not a project, not a workshop, and not a report. The specialty is the method, not a sector.',
    mark: 'by VisionSeek · from Korea',
    status: 'In preparation',
    open: 'Enter Forge',
    blurb: 'Mobility is the first path. Industry and technology come after. Saudi Arabia first. The Gulf is a later stage.',
    hlo: 'HLO is how we enter an institution. Forge builds the people who can later work inside it. No cohort is running today.',
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

export function InitiativesIndex({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const p = locale === 'ar' ? '/ar' : '';
  return (
    <Frame locale={locale} path="/initiatives">
      <section className="vs-institution-hero">
        <div className="vs-institution-hero-copy">
          <nav className="vs-breadcrumb" aria-label={locale === 'ar' ? 'مسار الصفحة' : 'Breadcrumb'}>
            <Link href={p || '/'}>{t.home}</Link><span>/</span><span>{t.section}</span>
          </nav>
          <p className="vs-eyebrow">VISIONSEEK</p>
          <h1>{t.section}</h1>
          <p>{t.purpose}</p>
          <p className="vs-directory-notice">{t.not}</p>
        </div>
      </section>
      <div className="vs-institution-layout">
        <article className="vs-detail-body">
          <span className="vs-status">{t.status}</span>
          <h2><Link href={`${p}/initiatives/korea-capability`}>Forge</Link></h2>
          <p>{t.mark}</p>
          <p>{t.blurb}</p>
          <p><Link className="vs-button" href={`${p}/initiatives/korea-capability`}>{t.open}<ArrowRight size={18} /></Link></p>
        </article>
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
    hero: 'تتعلّم الشغل من الصفر، من حاجة شغالة فعلًا في كوريا. بعدين تعمله أنت.',
    where: 'السعودية الأول. الخليج مرحلة تالية.',
    problemTitle: 'ليه المسار',
    problem: 'الشراء من وسيط مش بيبني حد يشوف الشغل ويتأكد منه ويعمله. Forge يبني الناس دول ما يبيعش الصفقة.',
    methodTitle: 'منهج واحد، تلات مسارات',
    steps: [
      'نشوف الشغل من مصدر شغال في كوريا.',
      'نتحقق قبل ما نعلّم.',
      'نتعلّم من الصفر جوه نظام.',
      'نشتغل سوا.',
      'بعدين هما يشتغلوا لوحدهم.',
    ],
    tracksTitle: 'كوريا قوية هنا. المنهج هو هو.',
    whoTitle: 'مين يدخل',
    who: 'واحد يبدأ من الصفر وعايز يتعلّم الشغل ويعمله معنا. أو مؤسسة عايزة القدرة دي عندها. السعودية الأول. الخليج مرحلة تالية. مفيش دفعة مفتوحة النهاردة.',
    getTitle: 'اللي تاخده',
    get: 'تدريب، وأدوات، ومسار شغل مكتوب. حين يبقى فيه مقابل، يكون أجرًا ثابتًا ومعلنًا. أي حصة لشريك تتكتب. مفيش عمولة خفية ولا ربا. مفيش أسعار هنا.',
    statusTitle: 'الحالة',
    statusBody: 'قيد التجهيز. مفيش خريجين، ولا نتائج، ولا شركاء.',
    cta: 'احكيلنا عن Forge',
    ctaNote: 'الزر يجهّز رسالة. مش معناه إن الطلب اتسجل.',
  },
  en: {
    hero: 'Learn the work from zero, from something that already runs in Korea. Then you do it.',
    where: 'Saudi Arabia first. The Gulf is a later stage.',
    problemTitle: 'Why this path',
    problem: 'Buying through a middleman does not build someone who can see the work, check it, and do it. Forge builds the person. It does not sell the deal.',
    methodTitle: 'One method. Three paths.',
    steps: [
      'We see the work from a source that already runs in Korea.',
      'We verify it before we teach it.',
      'You learn it from zero, inside a system.',
      'We work it together.',
      'Then you work it on your own.',
    ],
    tracksTitle: 'Korea is strong here. The method is the point.',
    whoTitle: 'Who comes in',
    who: 'Someone starting from zero who wants to learn the work and do it with us. Or an organization that wants the capability in-house. Saudi Arabia first. The Gulf comes later. No cohort is open today.',
    getTitle: 'What you get',
    get: 'Training, tools, and a written way of working. When there is a fee, it is fixed and stated. Any partner share is written down. No hidden commission and no interest. No prices on this page.',
    statusTitle: 'Status',
    statusBody: 'In preparation. No graduates, no results, and no partners.',
    cta: 'Talk to us about Forge',
    ctaNote: 'The button prepares a message. It does not mean the request was registered.',
  },
} as const;

export function KoreaInitiative({ locale }: { locale: Locale }) {
  const t = page[locale];
  const p = locale === 'ar' ? '/ar' : '';
  const path = '/initiatives/korea-capability';
  return (
    <Frame locale={locale} path={path}>
      <section className="vs-institution-hero">
        <div className="vs-institution-hero-copy">
          <nav className="vs-breadcrumb">
            <Link href={p || '/'}>{copy[locale].home}</Link><span>/</span>
            <Link href={`${p}/initiatives`}>{copy[locale].section}</Link><span>/</span>
            <span>Forge</span>
          </nav>
          <p className="vs-eyebrow">{copy[locale].mark}</p>
          <h1>Forge</h1>
          <p>{t.hero}</p>
          <p className="vs-directory-notice">{t.where}</p>
        </div>
      </section>
      <article className="vs-detail-body">
        <section id="problem"><h2>{t.problemTitle}</h2><p>{t.problem}</p></section>
        <section id="method"><h2>{t.methodTitle}</h2><ol>{t.steps.map(step => <li key={step}>{step}</li>)}</ol></section>
        <section id="tracks">
          <h2>{t.tracksTitle}</h2>
          <div className="vs-grid">
            {tracks.map(track => {
              const item = track[locale];
              return (
                <article key={item.name}>
                  <span className="vs-status">{item.status}</span>
                  <h3>{item.name}</h3>
                  <p>{item.items}</p>
                  <p>{item.note}</p>
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
    </Frame>
  );
}

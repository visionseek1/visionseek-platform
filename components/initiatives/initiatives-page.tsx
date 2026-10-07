import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CapabilityHeader } from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';

type Locale = 'ar' | 'en';
const copy = {
  ar: {
    home: 'الرئيسية',
    section: 'المبادرات',
    purpose: 'جهد طويل تبني به VisionSeek أناسًا ومؤسسات قادرة في سوق، لا مهمة لعميل واحد.',
    not: 'ليست برنامجًا محدودًا، ولا مشروعًا لجهة، ولا ورشة، ولا تقريرًا.',
    cardName: 'تمكين القدرة من كوريا',
    cardProblem: 'مؤسسات وأناس في مصر والخليج يريدون العمل في مجالات لها ممارسة شغالة في كوريا، وليس عندهم مسار يرون منه العمل ويتحققون منه ثم ينفذونه.',
    cardBuild: 'نبني شبكة ممارسين يتعلمون العمل من الصفر داخل نظام واضح، ثم يعملون معنا.',
    cardWho: 'متدربون يبدأون من الصفر، ومؤسسات شريكة في السعودية والخليج.',
    cardFirst: 'التطبيق الأول: المركبات. ليست هوية VisionSeek، ولا نبيع مركبات ولا نصدّرها.',
    status: 'قيد التجهيز',
    join: 'حدّثنا',
    open: 'افتح المبادرة',
    hlo: 'HLO هو دخول VisionSeek إلى المؤسسة. المبادرة تبني الناس الذين يمكن أن يعملوا داخل هذا الدخول لاحقًا. لا توجد دفعة قائمة اليوم.',
    programs: 'البرامج مسار قدرة محدود. المبادرة تبقى وتكوّن الممارسين.',
  },
  en: {
    home: 'Home',
    section: 'Initiatives',
    purpose: 'A long-running VisionSeek effort that creates capable people and organizations in a market, not a one-off client engagement.',
    not: 'Not a bounded program, not a project for one institution, not a workshop, and not a report.',
    cardName: 'Korea Capability Empowerment',
    cardProblem: 'People and institutions in Egypt and the Gulf want to work in fields that already operate in Korea, without a path to see the work, verify it, and then do it.',
    cardBuild: 'We build a network of practitioners who learn the work from zero inside a clear system, then work with us.',
    cardWho: 'Trainees starting from zero, and partner organizations in Saudi Arabia and the Gulf.',
    cardFirst: 'First application: vehicles. This is not VisionSeek’s identity, and we do not sell or export vehicles.',
    status: 'In preparation',
    join: 'Talk to us',
    open: 'Open the initiative',
    hlo: 'HLO is how VisionSeek enters an institution. The initiative builds people who can later work inside that engagement. No cohort is running today.',
    programs: 'A program is a bounded capability path. An initiative stays, and forms the practitioners.',
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
          <h2><Link href={`${p}/initiatives/korea-capability`}>{t.cardName}</Link></h2>
          <p>{t.cardProblem}</p>
          <p>{t.cardBuild}</p>
          <p>{t.cardWho}</p>
          <p>{t.cardFirst}</p>
          <p><Link className="vs-button" href={`${p}/initiatives/korea-capability`}>{t.open}<ArrowRight size={18} /></Link></p>
        </article>
      </div>
      <section className="vs-institution-cta">
        <div>
          <p className="vs-eyebrow">HLO</p>
          <h2>{t.hlo}</h2>
          <p>{t.programs}</p>
        </div>
        <Link href={`${p}/about/what-we-do#hlo`} className="vs-button">{locale === 'ar' ? 'HLO' : 'HLO'}<ArrowRight size={18} /></Link>
      </section>
    </Frame>
  );
}

const korea = {
  ar: {
    hero: 'نبني قدرة الناس على رؤية العمل والتحقق منه ثم تشغيله، من ممارسة شغالة في كوريا.',
    problemTitle: 'المشكلة',
    problem: 'الشراء من وسيط لا يترك عند المؤسسة من يرى المجال ويتحقق منه ويعمل فيه. المبادرة تبني هذا المسار لأناس ومؤسسات في مصر والخليج، بدل أن تبيع لهم صفقة.',
    methodTitle: 'المنهج',
    steps: [
      'نرى المجال من مصدر شغال في كوريا.',
      'نتحقق مما هو حقيقي قبل أن نعلّمه.',
      'يتعلم الممارس العمل من الصفر داخل نظام واضح.',
      'نعمل معًا، ثم يقوم هو بالعمل.',
      'نفس المنهج ينتقل إلى مجال تالٍ، ولا نبدأ من الصفر كل مرة.',
    ],
    appTitle: 'التطبيق الأول، ثم ما بعده',
    app: 'المركبات هي التطبيق الأول فقط. ما نبيعه هو التدريب والأدوات ومسار العمل، لا المركبات. بعدها، حين يثبت المسار: القوارب والسفن، والمعدات البحرية والصناعية، وما يشبهها مما هو متاح في كوريا.',
    whoTitle: 'من ينضم',
    who: 'متدرب يبدأ من الصفر ويريد أن يتعلم العمل ثم يمارسه معنا. أو مؤسسة تريد أن تبني هذه القدرة عندها. النطاق الذي نجهزه: السعودية والخليج. لا دفعة مفتوحة اليوم.',
    getTitle: 'ماذا يحصلون عليه',
    get: 'تدريب، وأدوات، ومسار عمل مكتوب. حين يوجد مقابل، يكون أجرًا ثابتًا ومعلنًا. أي حصة لشريك تُكتب. لا عمولة خفية ولا ربا. لا أسعار في هذه الصفحة.',
    statusTitle: 'الحالة',
    statusBody: 'قيد التجهيز. لا خريجون، ولا نتائج، ولا شركاء معلنون. الاسم العام لم يُحسم بعد.',
    cta: 'حدّثنا عن المبادرة',
    ctaNote: 'الزر يجهّز رسالة. لا يعني أن الطلب سُجّل.',
  },
  en: {
    hero: 'We build people’s capability to see the work, verify it, and operate it, from a practice that already runs in Korea.',
    problemTitle: 'The problem',
    problem: 'Buying through a middleman does not leave an institution with people who can see a field, verify it, and work in it. The initiative builds that path for people and organizations in Egypt and the Gulf, instead of selling them a deal.',
    methodTitle: 'The method',
    steps: [
      'See the field from a working source in Korea.',
      'Verify what is real before teaching it.',
      'The practitioner learns the work from zero inside a clear system.',
      'We do the work together, then they do it.',
      'The same method moves to the next field. We do not start from zero each time.',
    ],
    appTitle: 'First application, then the next',
    app: 'Vehicles are only the first application. What we sell is training, tools, and a working path, not vehicles. After the path holds: boats and ships, marine and industrial equipment, and similar fields available in Korea.',
    whoTitle: 'Who joins',
    who: 'A trainee who starts from zero and wants to learn the work and then practice it with us. Or an organization that wants this capability in-house. The scope we are preparing: Saudi Arabia and the Gulf. No cohort is open today.',
    getTitle: 'What they receive',
    get: 'Training, tools, and a written operating path. When a fee exists, it is fixed and disclosed. Any partner share is written down. No hidden commission and no interest. No prices on this page.',
    statusTitle: 'Status',
    statusBody: 'In preparation. No graduates, no results, and no announced partners. The public name is not settled.',
    cta: 'Talk to us about the initiative',
    ctaNote: 'The button prepares a message. It does not mean the request was registered.',
  },
} as const;

export function KoreaInitiative({ locale }: { locale: Locale }) {
  const t = korea[locale];
  const p = locale === 'ar' ? '/ar' : '';
  const path = '/initiatives/korea-capability';
  return (
    <Frame locale={locale} path={path}>
      <section className="vs-institution-hero">
        <div className="vs-institution-hero-copy">
          <nav className="vs-breadcrumb">
            <Link href={p || '/'}>{copy[locale].home}</Link><span>/</span>
            <Link href={`${p}/initiatives`}>{copy[locale].section}</Link><span>/</span>
            <span>{copy[locale].cardName}</span>
          </nav>
          <span className="vs-status">{copy[locale].status}</span>
          <h1>{copy[locale].cardName}</h1>
          <p>{t.hero}</p>
        </div>
      </section>
      <article className="vs-detail-body">
        <section id="problem"><h2>{t.problemTitle}</h2><p>{t.problem}</p></section>
        <section id="method"><h2>{t.methodTitle}</h2><ol>{t.steps.map(step => <li key={step}>{step}</li>)}</ol></section>
        <section id="application"><h2>{t.appTitle}</h2><p>{t.app}</p></section>
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

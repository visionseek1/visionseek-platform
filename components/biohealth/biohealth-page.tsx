import type {ReactNode} from "react";
import {ArrowRight} from "lucide-react";
import {CapabilityHeader} from "@/components/capability/navigation";
import CapabilityFooter from "@/components/capability/footer";
import type {Locale} from "@/components/capability/content";
import BiohealthInquiry from "./inquiry-form";
import styles from "./biohealth.module.css";

import Link from "next/link";

function En({children}: {children: ReactNode}) {
  return <bdi dir="ltr">{children}</bdi>;
}

export default function BiohealthPage({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const p = ar ? "/ar" : "";
  const gaps = [
    {
      tag: "01 // BIOPROCESS GAP",
      en: "Beyond fill-and-finish, into the bioprocess",
      ar: "تجاوز التعبئة السطحية إلى عمق المعالجة الحيوية",
      body: ar
        ? <>معظم المبادرات الإقليمية تقف عند حدود التعبئة والتغليف (<En>Fill & Finish</En>). الفجوة الحقيقية تكمن في ضبط المفاعلات الحيوية، والمعالجة التكبيرية (<En>Upstream/Downstream Process</En>)، وتأصيل معايير الـ <En>cGMP</En> الصارمة لإنتاج اللقاحات والبدائل الحيوية (<En>Biosimilars</En>).</>
        : <>Most regional initiatives stop at fill and finish. The real gap is control of the bioreactors, the upstream and downstream process, and a strict cGMP standard for vaccines and biosimilars.</>,
    },
    {
      tag: "02 // DATA SOVEREIGNTY",
      en: "Genomic and medical records do not leave the border",
      ar: "حظر تسريب السجلات الجينية والطبية",
      body: ar
        ? <>الحلول السحابية التجارية للذكاء الاصطناعي تعرض البيانات الجينومية والصحية الوطنية لمخاطر خروجها خارج الحدود. الحاجة ملحة لنشر خوارزميات فحص متقدمة تعمل محلياً داخل البنية التحتية للمستشفيات بنسبة 100%.</>
        : <>Commercial cloud AI puts national genomic and health data at risk of leaving the country. Advanced screening has to run inside the hospital’s own infrastructure, fully.</>,
    },
    {
      tag: "03 // IN SILICO R&D",
      en: "Shorten the time and cost of drug discovery",
      ar: "تقليص زمن وتكلفة الاكتشاف الدوائي",
      body: ar
        ? <>الانتقال من الأدوية الجنيسة التقليدية إلى أبحاث الأورام والمناعة يتطلب مختبرات نمذجة جزيئية حاسوبية تقلل سنوات التجارب المعملية المكلفة وتلائم الخصائص الوراثية لسكان المنطقة.</>
        : <>Moving from conventional generics into oncology and immunology needs molecular modelling labs that cut years of costly bench work and fit the genetics of the region’s population.</>,
    },
  ];
  const units = [
    {
      code: "UNIT-01 // OPERATIONAL BIOPROCESS",
      name: "VisionSeek Bioprocess Engineering",
      href: "/programs/apex",
      program: ar ? <>مدعومة ببروتوكول <En>VS-P02: Apex</En> (<En>Embedded Capability</En>)</> : "Driven by VS-P02: Apex (Embedded Capability)",
      body: ar
        ? <>نقل وتوطين المعرفة التشغيلية الدقيقة لعمليات التصنيع الحيوي من مجمعي سونغدو (<En>Songdo</En>) وأوسونغ (<En>Osong</En>) في كوريا الجنوبية. نقوم بدمج مهندسي عمليات وصيادلة تشغيليين (<En>Forward-Deployed Engineers</En>) يشاركون جنباً إلى جنب مع فرق المنشأة في تشغيل المفاعلات، وتوسيع نطاق الإنتاج (<En>Scale-up</En>)، وتأهيل الكوادر الوطنية على الفحص والاعتماد الذاتي.</>
        : <>Transfer the operating know-how of biomanufacturing from Songdo and Osong in South Korea. Forward-deployed process engineers and pharmacists work beside the plant on the reactors, the scale-up, and a national staff that can test and release on its own.</>,
      who: ar
        ? <>مصانع الأدوية الحيوية، شركات اللقاحات، وأذرع الاستثمار الدوائي السيادي مثل <En>Lifera</En> و <En>Mubadala Bio</En> و <En>Gypto Pharma</En>.</>
        : <>Biopharmaceutical plants, vaccine companies, and sovereign pharma arms such as Lifera, Mubadala Bio, and Gypto Pharma.</>,
      term: ar ? "تفويض تشغيلي ميداني ممتد من 12 إلى 18 شهراً." : "A field operating mandate of 12 to 18 months.",
    },
    {
      code: "UNIT-02 // CLINICAL AI & GENOMICS",
      name: "VisionSeek Sovereign Diagnostics",
      href: "/programs/aegis",
      program: ar ? <>مدعومة بمعمارية <En>VS-P01: Aegis</En> (<En>Sovereign Infrastructure</En>)</> : "Driven by VS-P01: Aegis (Sovereign Infrastructure)",
      body: ar
        ? <>نشر وتوطين محركات الذكاء الاصطناعي التشخيصي السريري المعتمدة في كوريا (لفحص أورام الصدر، الثدي، والمسوحات الجينية) داخل المنظومات الصحية والمستشفيات التخصصية، مع تشغيلها محلياً بالكامل (<En>On-Premises / Air-Gapped</En>) لضمان السيادة المطلقة للسجلات الطبية دون اتصال بأي سحابة أجنبية.</>
        : <>Bring clinically adopted Korean diagnostic engines for chest, breast, and genomic screening into health systems and specialist hospitals, running fully on premises and air-gapped, with no link to a foreign cloud.</>,
      who: ar
        ? <>المدن الطبية، برامج الفحص الوطني للأورام، مراكز أبحاث الجينوم، والمستشفيات التخصصية مثل <En>KFSHRC</En> ودوائر الصحة ووزارات الصحة.</>
        : <>Medical cities, national cancer-screening programmes, genome centres, and specialist hospitals such as KFSHRC, departments of health, and ministries of health.</>,
      term: ar ? "نشر معمارية وتخصيص نماذج تجريبية خلال 6 إلى 9 أشهر." : "An architecture and a pilot deployment in 6 to 9 months.",
    },
  ];
  const bridges = [
    {
      en: "Songdo Bio Cluster, Incheon",
      ar: <>مجمع سونغدو الحيوي، إنتشون (<En>Songdo Bio Cluster</En>)</>,
      text: {en: "The world’s largest contract biomanufacturing capacity, for process control and the quality of production lines.", ar: "أكبر سعة تصنيع تعاقدي حيوي في العالم لنقل ممارسات ضبط العمليات وجودة خطوط الإنتاج."},
    },
    {
      en: "Osong Bio Valley / KBIOHealth",
      ar: <>وادي أوسونغ الحيوي (<En>Osong Bio Valley / KBIOHealth</En>)</>,
      text: {en: "Preclinical testing and the development of complex bioprocess paths.", ar: "مراكز الاختبارات قبل السريرية وتطوير مسارات المعالجة الحيوية المعقدة."},
    },
    {
      en: "Clinical Diagnostic Consortia",
      ar: <>تحالفات التشخيص السريري (<En>Clinical Diagnostic Consortia</En>)</>,
      text: {en: "The technical groups behind clinically adopted imaging and genomic screening engines.", ar: "التحالفات التقنية المطورة لأدق خوارزميات المسح والتشخيص الإشعاعي والجيني المعتمدة عالمياً."},
    },
  ];
  return <div className={`vs-site locale-${locale} ${styles.page}`} lang={locale} dir={ar ? "rtl" : "ltr"}>
    <CapabilityHeader locale={locale} path="/biohealth"/>
    <main id="main-content">
      <section className={styles.hero}>
        <p className={styles.kicker} dir="ltr"><En>VS-ARM-01 // SOVEREIGN BIOHEALTH & CLINICAL INTELLIGENCE</En></p>
        <h1>{ar ? "هندسة القدرات الحيوية: من المعالجة الجزيئية إلى سيادة التصنيع الدوائي" : "Engineering Sovereign Bio-Capabilities: From Molecular Compute to Bioprocess Dominance"}</h1>
        <p className={styles.lede}>{ar
          ? "نربط المنظومات الصحية والدوائية في الخليج ومصر بأحدث تقنيات التصنيع الحيوي والذكاء الاصطناعي السريري في كوريا الجنوبية. لا نبيع استشارات ورقية؛ بل ندمج مهندسينا ميدانياً لتوطين بروتوكولات التشغيل ونقل السيادة العلاجية."
          : "Bridging MENA healthcare and pharma institutions with South Korea’s most mature biomanufacturing clusters and clinically proven AI engines. We do not deliver slide decks; we deploy forward-deployed capability architects directly to site."}</p>
        <div className={styles.actions}>
          <a className="vs-button" href="#brief">{ar ? "طلب موجز استكشاف القدرة الحيوية" : "Request a bio-capability brief"}<ArrowRight size={18}/></a>
          <a className="vs-button vs-button-ghost" href="#units">{ar ? "استعراض الوحدات التشغيلية" : "See the operating units"}<ArrowRight size={18}/></a>
        </div>
      </section>
      <section className={`${styles.section} ${styles.rule}`} aria-label={ar ? "فجوة الواقع الميداني" : "The strategic reality gap"}>
        <p className={styles.kicker}>{ar ? <>فجوة الواقع الميداني <En>// THE STRATEGIC REALITY GAP</En></> : "THE STRATEGIC REALITY GAP"}</p>
        <div className={styles.gaps}>
          {gaps.map(gap => <article className={styles.rule} key={gap.tag}>
            <p className={styles.kicker} dir="ltr"><En>{gap.tag}</En></p>
            <h2>{ar ? gap.ar : gap.en}</h2>
            <p>{gap.body}</p>
          </article>)}
        </div>
      </section>
      <section className={styles.section} id="units">
        <div className={styles.unitsHead}>
          <p className={styles.kicker}>{ar ? <>الوحدات التشغيلية الميدانية <En>// DEPLOYABLE OPERATING UNITS</En></> : "DEPLOYABLE OPERATING UNITS"}</p>
        </div>
        <div className={styles.units}><div>
          {units.map(unit => <article key={unit.code}>
            <p className={styles.kicker} dir="ltr"><En>{unit.code}</En></p>
            <h2><En>{unit.name}</En></h2>
            <Link href={`${p}${unit.href}`}>{unit.program}<ArrowRight size={16}/></Link>
            <p>{unit.body}</p>
            <p><strong>{ar ? "الجهات المستهدفة: " : "For: "}</strong>{unit.who}</p>
            <p><strong>{ar ? "طبيعة المهمة: " : "Mandate: "}</strong>{unit.term}</p>
          </article>)}
        </div></div>
      </section>
      <section className={styles.section} aria-label={ar ? "جسر القدرة الكوري" : "Korea to MENA"}>
        <div className={styles.bridgeInner}>
          <p className={styles.kicker} dir="ltr"><En>KOREA TO MENA // CAPABILITY PIPELINE</En></p>
          <h2>{ar ? "جسر القدرة الكوري" : "The Korean capability bridge"}</h2>
          <div>{bridges.map(item => <article key={item.en}>
            <h3>{ar ? item.ar : item.en}</h3>
            <p>{ar ? item.text.ar : item.text.en}</p>
          </article>)}</div>
        </div>
      </section>
      <section className={`vs-section vs-brief ${styles.brief}`} id="brief">
        <h2>{ar ? "ابدأ حوار توطين القدرة الحيوية" : "Start a bio-capability conversation"}</h2>
        <p className={styles.lede}>{ar
          ? <>اختر المسار التشغيلي الذي تستهدفه مؤسستك لطلب موجز استكشاف ميداني مخصص (<En>Executive Immersion Brief</En>). يُراجع كل طلب مباشرة من قيادة هندسة القدرات.</>
          : "Choose the operating path your institution wants, and request a field brief. Capability engineering leadership reviews every request."}</p>
        <BiohealthInquiry locale={locale}/>
        <p className={`vs-brief-note ${styles.note}`}>{ar ? "يصل الطلب مباشرة إلى الفريق الهندسي. نلتزم بأعلى معايير السرية المؤسسية وحوكمة البيانات." : "The request goes straight to the engineering team. Institutional confidentiality and data governance apply."}</p>
      </section>
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

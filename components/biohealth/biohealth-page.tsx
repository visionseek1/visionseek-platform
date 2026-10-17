import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {CapabilityHeader} from "@/components/capability/navigation";
import CapabilityFooter from "@/components/capability/footer";
import type {Locale} from "@/components/capability/content";
import BiohealthInquiry from "./inquiry-form";
import styles from "./biohealth.module.css";

const gaps = [
  {
    en: "Beyond fill-and-finish, into the bioprocess",
    ar: "تجاوز التعبئة السطحية إلى عمق المعالجة الحيوية",
    text: {
      en: "Most regional projects stop at fill and finish. The real gap is the bioreactor, the upstream and downstream process, and the cGMP standard required to make vaccines and biosimilars.",
      ar: "معظم المشاريع الإقليمية تقف عند حدود التعبئة والتغليف. الفجوة الحقيقية تكمن في ضبط المفاعلات الحيوية، والمعالجة في بداية الخط ونهايته، ومطابقة معايير التصنيع الجيد الصارمة لإنتاج اللقاحات والبدائل الحيوية.",
    },
  },
  {
    en: "Genomic and medical records do not leave the border",
    ar: "حظر تسريب السجلات الجينية والطبية",
    text: {
      en: "Commercial cloud AI can take national genomic and health data outside the country. What is needed is advanced screening that runs inside the hospital’s own infrastructure, fully.",
      ar: "الحلول السحابية التجارية للذكاء الاصطناعي تعرض البيانات الجينومية والصحية الوطنية لمخاطر خروجها خارج الحدود. الحاجة ملحة لنشر خوارزميات فحص متقدمة تعمل محلياً داخل البنية التحتية للمستشفيات بنسبة 100%.",
    },
  },
  {
    en: "Shorten the time and cost of drug discovery",
    ar: "تقليص زمن وتكلفة الاكتشاف الدوائي",
    text: {
      en: "Moving from conventional generics into oncology and immunology needs molecular modelling labs that cut years of costly bench work and fit the genetics of the region’s population.",
      ar: "الانتقال من الأدوية الجنيسة التقليدية إلى أبحاث الأورام والمناعة يتطلب مختبرات نمذجة جزيئية حاسوبية تقلل سنوات التجارب المعملية المكلفة وتلائم الخصائص الوراثية لسكان المنطقة.",
    },
  },
];

const units = [
  {
    code: "UNIT-01 // OPERATIONAL BIOPROCESS",
    name: "VisionSeek Bioprocess Engineering",
    program: {href: "/programs/apex", en: "Driven by VS-P02: Apex", ar: "مدعومة ببروتوكول VS-P02: Apex"},
    text: {
      en: "Transfer the operating know-how of biomanufacturing from the Songdo and Osong clusters in South Korea. Process engineers and operating pharmacists work beside the plant team on the reactors, the scale-up, and the qualification of a national staff that can test and release on its own.",
      ar: "نقل وتوطين المعرفة التشغيلية الدقيقة لعمليات التصنيع الحيوي من مجمعي سونغدو وأوسونغ في كوريا الجنوبية. ندمج مهندسي عمليات وصيادلة تشغيليين يشاركون جنباً إلى جنب مع فرق المنشأة في تشغيل المفاعلات، وتوسيع نطاق الإنتاج، وتأهيل الكوادر الوطنية على الفحص والاعتماد الذاتي.",
    },
    who: {
      en: "Biopharmaceutical plants, vaccine companies, and sovereign pharma investment arms such as Lifera, Mubadala Bio, and Gypto Pharma.",
      ar: "مصانع الأدوية الحيوية، شركات اللقاحات، وأذرع الاستثمار الدوائي السيادي مثل Lifera وMubadala Bio وGypto Pharma.",
    },
    term: {en: "A field mandate of 12 to 18 months.", ar: "تفويض تشغيلي ميداني ممتد من 12 إلى 18 شهراً."},
  },
  {
    code: "UNIT-02 // CLINICAL AI & GENOMICS",
    name: "VisionSeek Sovereign Diagnostics",
    program: {href: "/programs/aegis", en: "Driven by VS-P01: Aegis", ar: "مدعومة بمعمارية VS-P01: Aegis"},
    text: {
      en: "Bring clinically adopted Korean diagnostic engines — chest and breast imaging, and genomic screening — into health systems and specialist hospitals, running fully on site, with no link to a foreign cloud.",
      ar: "نشر وتوطين محركات الذكاء الاصطناعي التشخيصي السريري المعتمدة في كوريا، لفحص أورام الصدر والثدي والمسوحات الجينية، داخل المنظومات الصحية والمستشفيات التخصصية، مع تشغيلها محلياً بالكامل لضمان السيادة المطلقة للسجلات الطبية دون اتصال بأي سحابة أجنبية.",
    },
    who: {
      en: "Medical cities, national cancer-screening programmes, genome centres, and specialist hospitals such as KFSHRC, departments of health, and ministries of health.",
      ar: "المدن الطبية، برامج الفحص الوطني للأورام، مراكز أبحاث الجينوم، والمستشفيات التخصصية مثل KFSHRC ودوائر الصحة ووزارات الصحة.",
    },
    term: {en: "An architecture and a pilot in 6 to 9 months.", ar: "نشر معمارية وتخصيص نماذج تجريبية خلال 6 إلى 9 أشهر."},
  },
];

const bridges = [
  {en: "Songdo Bio Cluster, Incheon", ar: "مجمع سونغدو الحيوي، إنتشون", text: {en: "The world’s largest contract biomanufacturing capacity, for process control and production lines.", ar: "أكبر سعة تصنيع تعاقدي حيوي في العالم لنقل ممارسات ضبط العمليات وخطوط الإنتاج."}},
  {en: "Osong Bio Valley, KBIOHealth", ar: "وادي أوسونغ الحيوي", text: {en: "Preclinical testing and the development of complex bioprocesses.", ar: "مراكز الاختبارات قبل السريرية وتطوير العمليات الحيوية المعقدة."}},
  {en: "Clinical diagnostic consortia", ar: "تحالفات التشخيص السريري", text: {en: "Korean technical groups behind clinically adopted imaging and genomic screening engines.", ar: "التحالفات التقنية الكورية المطورة لخوارزميات المسح والتشخيص الإشعاعي والجيني الحاصلة على اعتماد سريري."}},
];

export default function BiohealthPage({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const p = ar ? "/ar" : "";
  return <div className={`vs-site locale-${locale} ${styles.page}`} lang={locale} dir={ar ? "rtl" : "ltr"}>
    <CapabilityHeader locale={locale} path="/biohealth"/>
    <main id="main-content">
      <section className={styles.hero}>
        <p className="vs-eyebrow" dir="ltr">VS-ARM-01 // SOVEREIGN BIOHEALTH & CLINICAL INTELLIGENCE</p>
        <h1>{ar ? "هندسة القدرات الحيوية: من المعالجة الجزيئية إلى سيادة التصنيع الدوائي" : "Engineering Sovereign Bio-Capabilities: From Molecular Compute to Bioprocess Dominance"}</h1>
        <p className={styles.lede}>{ar
          ? "نربط المنظومات الصحية والدوائية في الخليج ومصر بأحدث تقنيات التصنيع الحيوي والذكاء الاصطناعي السريري في كوريا الجنوبية. لا نبيع استشارات ورقية؛ بل ندمج مهندسينا ميدانياً لتوطين بروتوكولات التشغيل ونقل السيادة العلاجية."
          : "Bridging MENA healthcare and pharma institutions with South Korea’s most mature biomanufacturing clusters and clinically proven AI engines. We do not deliver slide decks; we deploy forward-deployed capability architects directly to site."}</p>
        <div className={styles.actions}>
          <a className="vs-button" href="#brief">{ar ? "طلب موجز استكشاف القدرة الحيوية" : "Request a bio-capability brief"}<ArrowRight size={18}/></a>
          <a className="vs-button vs-button-ghost" href="#units">{ar ? "استعراض الوحدات التشغيلية" : "See the operating units"}<ArrowRight size={18}/></a>
        </div>
      </section>
      <section className={styles.gaps} aria-label={ar ? "الواقع الميداني" : "The operating reality"}>
        {gaps.map((gap, index) => <article key={gap.en}>
          <p className={styles.tag} dir="ltr">{String(index + 1).padStart(2, "0")}</p>
          <h2>{ar ? gap.ar : gap.en}</h2>
          <p>{ar ? gap.text.ar : gap.text.en}</p>
        </article>)}
      </section>
      <section className={styles.units} id="units">
        <p className="vs-eyebrow">{ar ? "الوحدات التشغيلية" : "OPERATING UNITS"}</p>
        <div>
          {units.map(unit => <article key={unit.code}>
            <p className={styles.tag} dir="ltr">{unit.code}</p>
            <h2>{unit.name}</h2>
            <Link href={`${p}${unit.program.href}`}>{ar ? unit.program.ar : unit.program.en}<ArrowRight size={16}/></Link>
            <p>{ar ? unit.text.ar : unit.text.en}</p>
            <p><strong>{ar ? "الجهات" : "For"}</strong> {ar ? unit.who.ar : unit.who.en}</p>
            <p><strong>{ar ? "المهمة" : "Mandate"}</strong> {ar ? unit.term.ar : unit.term.en}</p>
          </article>)}
        </div>
      </section>
      <section className={styles.bridge} aria-label={ar ? "الجسر الكوري" : "Korea to MENA"}>
        <p className="vs-eyebrow" dir="ltr">KOREA TO MENA</p>
        <h2>{ar ? "جسر القدرة الكوري" : "The Korean capability bridge"}</h2>
        <div>{bridges.map(item => <article key={item.en}><h3>{ar ? item.ar : item.en}</h3><p>{ar ? item.text.ar : item.text.en}</p></article>)}</div>
      </section>
      <section className={`vs-section vs-brief ${styles.brief}`} id="brief">
        <h2>{ar ? "ابدأ حوار توطين القدرة الحيوية" : "Start a bio-capability conversation"}</h2>
        <p className={styles.lede}>{ar
          ? "اختر المسار التشغيلي الذي تستهدفه مؤسستك لطلب موجز استكشاف ميداني مخصص. يُراجع كل طلب مباشرة من قيادة هندسة القدرات."
          : "Choose the operating path your institution wants, and request a field brief. Capability engineering leadership reviews every request."}</p>
        <BiohealthInquiry locale={locale}/>
        <p className="vs-brief-note">{ar ? "يصل الطلب مباشرة إلى الفريق الهندسي. نلتزم بسرية المؤسسة، ولا نشارك البيانات." : "The request goes straight to the engineering team. Institutional confidentiality applies. The data is not shared."}</p>
      </section>
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

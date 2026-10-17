import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {CapabilityHeader} from "@/components/capability/navigation";
import CapabilityFooter from "@/components/capability/footer";
import type {Locale} from "@/components/capability/content";
import styles from "./domains.module.css";

const domains = [
  {
    tag: "01 / SOVEREIGN & INSTITUTIONAL AI",
    en: "Sovereign AI and institutional data governance",
    ar: "الذكاء الاصطناعي السيادي وحوكمة البيانات المؤسسية",
    text: {
      en: "Ground and run AI inside the institution’s own infrastructure, with absolute security. We build sovereign data architectures and trusted decision models that fit strict rules and real operating complexity, without sending the data outside.",
      ar: "تأصيل وتشغيل أنظمة الذكاء الاصطناعي داخل البنية التحتية للمؤسسة بأمان مطلق. نبني معماريات بيانات سيادية، ونطوّر نماذج قرار موثوقة تتوافق مع اللوائح الصارمة وتعقيدات التشغيل الفعلي دون تسريب البيانات للخارج.",
    },
    program: {href: "/programs/aegis", en: "Linked to VS-P01: Aegis", ar: "مرتبط ببرنامج VS-P01: Aegis"},
  },
  {
    tag: "02 / INDUSTRIAL AUTONOMY, ROBOTICS & AEROSPACE",
    en: "Industrial automation, robotics, and autonomous systems",
    ar: "الأتمتة الصناعية، الروبوتات، والأنظمة المستقلة",
    text: {
      en: "Transfer and localize advanced manufacturing, robotic arms, drones, and autonomous command-and-control from Korean industrial bases into factories and critical field operations.",
      ar: "نقل وتوطين تقنيات التصنيع المتقدم، الأذرع الروبوتية، الطائرات المسيرة، وأنظمة القيادة والتحكم الذاتي من القلاع الصناعية الكورية إلى المنشآت الصناعية والعمليات الميدانية الحرجة.",
    },
  },
  {
    tag: "03 / BIOHEALTH, COMPUTATIONAL DRUG DESIGN & MEDTECH",
    en: "Biohealth, precision medicine, and computational drug design",
    ar: "التكنولوجيا الحيوية، الطب الدقيق، والتصميم الدوائي المحسوب",
    text: {
      en: "Join advanced pharmaceutical science and computational drug modelling with intelligent diagnostics from South Korea, and build research, treatment, and industrial capability for health and pharmaceutical institutions.",
      ar: "دمج البحث العلمي المتقدم في العلوم الصيدلانية والنمذجة الحاسوبية للأدوية مع تقنيات التشخيص الطبي الذكي في كوريا الجنوبية، لبناء قدرات بحثية وعلاجية وصناعية متقدمة للمؤسسات الصحية والدوائية.",
    },
    arm: {href: "/biohealth", en: "Open the operating arm: VisionSeek BioHealth", ar: "استعرض الذراع التشغيلي: VisionSeek BioHealth"},
  },
  {
    tag: "04 / CRITICAL INFRASTRUCTURE, ENERGY & SEMICONDUCTORS",
    en: "Critical infrastructure, advanced energy, and semiconductors",
    ar: "البنية التحتية الحرجة، الطاقة المتقدمة، وأشباه الموصلات",
    text: {
      en: "Engineer and transfer technical know-how across chip supply chains, clean energy networks, smart-city systems, and technical agriculture, so the institution keeps sovereignty and operating resilience.",
      ar: "هندسة ونقل المعرفة التقنية في سلاسل إمداد الرقائق الإلكترونية، شبكات الطاقة النظيفة، أنظمة المدن الذكية، وحلول الأمن الغذائي والزراعة التقنية لضمان السيادة والمرونة التشغيلية.",
    },
  },
];

export default function DomainsPage({locale}: {locale: Locale}) {
  const ar = locale === "ar";
  const p = ar ? "/ar" : "";
  return <div className={`vs-site locale-${locale} ${styles.page}`} lang={locale} dir={ar ? "rtl" : "ltr"}>
    <CapabilityHeader locale={locale} path="/domains"/>
    <main id="main-content">
      <section className={styles.hero}>
        <p className="vs-eyebrow">CAPABILITY DOMAINS · KOREA TO MENA</p>
        <h1>{ar ? "قطاعات القدرات الحرجة" : "Critical capability domains"}</h1>
        <p className={styles.lede}>{ar
          ? "نربط الاحتياجات الاستراتيجية للمؤسسات في العالم العربي بأكثر منظومات التكنولوجيا العميقة والصناعات المتقدمة نضجاً في كوريا الجنوبية — لتحويل الطموح القطاعي إلى قدرة تشغيلية مملوكة ومستدامة."
          : "We connect the strategic needs of institutions in the Arab world with the most mature deep-technology and advanced-industry systems in South Korea — and turn a sector ambition into an operating capability the institution owns and can sustain."}</p>
      </section>
      <section className={styles.grid} aria-label={ar ? "القطاعات" : "Domains"}>
        {domains.map(domain => <article key={domain.tag} className={styles.card}>
          <p className={styles.tag} dir="ltr">{domain.tag}</p>
          <h2>{ar ? domain.ar : domain.en}</h2>
          <p>{ar ? domain.text.ar : domain.text.en}</p>
          {domain.program && <Link className={styles.badge} href={`${p}${domain.program.href}`}>{ar ? domain.program.ar : domain.program.en}<ArrowRight size={16}/></Link>}
          {"arm" in domain && domain.arm && <Link className={styles.badge} href={`${p}${domain.arm.href}`}>{ar ? domain.arm.ar : domain.arm.en}<ArrowRight size={16}/></Link>}
        </article>)}
      </section>
      <section className={styles.cta}>
        <h2>{ar ? "هل تستهدف مؤسستك بناء قدرة حرجة في أحد هذه القطاعات؟" : "Is your institution building a critical capability in one of these domains?"}</h2>
        <p>{ar
          ? "نحن لا نقدم تقارير استشارية عامة؛ بل ننزل ميدانياً لهندسة المعمارية ومطابقتها مع أقوى الشركاء التقنيين في كوريا الجنوبية."
          : "We do not hand over a general advisory report. We go into the field, engineer the architecture, and match it with the strongest technical partners in South Korea."}</p>
        <Link className="vs-button" href={`${p}/#contact`}>{ar ? "اطلب موجز القدرة للقطاع المستهدف" : "Request a capability brief for this domain"}<ArrowRight size={18}/></Link>
      </section>
    </main>
    <CapabilityFooter locale={locale}/>
  </div>;
}

import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import HomeScene from "@/components/home-scene";
import s from "./home-page.module.css";

const fields = [
  ["Space & aerospace", "الفضاء والأنظمة الجوية"],
  ["Drones & autonomous systems", "الدرونز والأنظمة ذاتية التشغيل"],
  ["Cities & infrastructure", "المدن والبنية التحتية"],
  ["Science & health", "العلم والصحة"],
  ["Energy & climate", "الطاقة والمناخ"],
  ["Robotics & smart industry", "الروبوتات والصناعة الذكية"],
  ["Agriculture & food", "الزراعة والغذاء"],
  ["Chips & advanced materials", "الرقائق والمواد المتقدمة"],
];

export default function HomePage({ locale }: { locale: "ar" | "en" }) {
  const ar = locale === "ar";
  const projects = ar ? "/ar/projects" : "/projects";
  const insights = ar ? "/ar/insights" : "/insights";
  const steps = ar ? [
    { title: "نرى ما ينقص.", text: "نبدأ بحاجة حقيقية، أو قدرة لم تجد استخدامها، أو صلة لم يلتفت إليها أحد. نحدّد الفرصة التي تستحق العمل.", output: "فرصة واضحة · فرضيات قابلة للاختبار" },
    { title: "نربط ما يلزم.", text: "نجمع التكنولوجيا والخبرة والأشخاص والسوق في التكوين المناسب. ونحدّد من يبني، ومن يستخدم، ومن يملك القرار.", output: "تكوين مناسب · مسؤوليات واضحة" },
    { title: "نبني ما يعمل.", text: "نحوّل الفكرة إلى تجربة محددة، نختبر قيمتها في الواقع، ثم نقرّر ما يستحق التطوير والتشغيل.", output: "تجربة عملية · دليل · قرار تالٍ" },
  ] : [
    { title: "See what is missing.", text: "Start with a real need, an underused capability, or a connection no one has made. Define the opportunity worth pursuing.", output: "A clear opportunity · Testable assumptions" },
    { title: "Connect what matters.", text: "Bring technology, expertise, people and markets into the right configuration. Establish who builds, who uses and who decides.", output: "The right configuration · Clear ownership" },
    { title: "Build what works.", text: "Turn the idea into a focused pilot. Test its value in the real world, then decide what deserves to be developed and operated.", output: "A working pilot · Evidence · A next decision" },
  ];

  return (
    <main className={s.page} lang={locale} dir={ar ? "rtl" : "ltr"}>
      <a href="#vision" className={s.skip}>{ar ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <SiteHeader locale={locale} languageHref={ar ? "/" : "/ar"} items={[
        { href: "#vision", label: ar ? "الرؤية" : "VISION" },
        { href: "#approach", label: ar ? "المنهج" : "APPROACH" },
        { href: "#fields", label: ar ? "المجالات" : "FIELDS" },
        { href: insights, label: ar ? "رؤى" : "INSIGHTS" },
        { href: "#contact", label: ar ? "تواصل معنا" : "GET IN TOUCH" },
      ]} />

      <section className={s.hero} id="top" aria-labelledby="home-title">
        <HomeScene locale={locale} />
        <div className={s.heroContent}>
          <p className={s.eyebrow}>{ar ? "VISIONSEEK / هندسة الفرص" : "VISIONSEEK / OPPORTUNITY ENGINEERING"}</p>
          <h1 id="home-title" className={s.heroTitle} lang="en" dir="ltr">MAKE IT<br />POSSIBLE<span>.</span></h1>
          <div className={s.heroBottom}>
            <p>{ar ? "نربط الأفكار والتكنولوجيا والأشخاص، لنحوّل ما يمكن أن يكون إلى قدرات تعمل في الواقع." : "We connect ideas, technology and people to turn what could be into capabilities that work."}</p>
            <a className={s.heroLink} href="#vision">{ar ? "اكتشف رؤيتنا" : "EXPLORE OUR VISION"}<span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <div className={s.bridge}>
        <span>{ar ? "انطلاقًا من كوريا الجنوبية. برؤية تتجاوز الحدود." : "ROOTED IN SOUTH KOREA. LOOKING BEYOND BORDERS."}</span>
        <span>{ar ? "تكنولوجيا / علم / تصميم / ريادة أعمال" : "TECHNOLOGY / SCIENCE / DESIGN / ENTREPRENEURSHIP"}</span>
      </div>

      <section className={s.thesis} id="vision" aria-labelledby="vision-title">
        <div className={s.sectionLabel}><span>01 /</span> {ar ? "ما نراه" : "WHAT WE SEE"}</div>
        <div className={s.thesisMain}>
          <h2 id="vision-title">{ar ? <>المستقبل موجود بالفعل.<br /><span>لكنه لم يُربط بعد.</span></> : <>The future is already here.<br /><span>Not connected yet.</span></>}</h2>
          <div className={s.thesisColumns}>
            <p className={s.largeText}>{ar ? "قدرة جديدة قد تبدأ بصلة بين أشياء موجودة بالفعل." : "A new capability can begin with a connection between things that already exist."}</p>
            <div><p>{ar ? "نكتشف ما يصبح ممكنًا عندما تتصل الأفكار والتقنيات والأشخاص والأسواق والمؤسسات. ثم نحدّد الشكل الصحيح لجعله واقعًا." : "We discover what becomes possible when ideas, technologies, people, markets and institutions connect. Then we find the right form to make it real."}</p><p>{ar ? "VisionSeek استوديو فرص ومشروعات، يبني نحو مؤسسة عالمية تساعد الحكومات والشركات والقادة على تحويل الإمكانات إلى عمل." : "VisionSeek is an opportunity and venture studio, building toward a global institution that helps governments, businesses and leaders turn potential into action."}</p></div>
          </div>
        </div>
      </section>

      <section className={s.approach} id="approach" aria-labelledby="approach-title">
        <div className={s.approachIntro}>
          <div className={s.sectionLabel}><span>02 /</span> {ar ? "كيف نعمل" : "HOW WE WORK"}</div>
          <h2 id="approach-title">{ar ? <>هندسة<br />الفرص.</> : <>Opportunity<br />engineering.</>}</h2>
          <p>{ar ? "من أول سؤال، إلى دليل يستحق البناء عليه." : "From the first question to evidence worth building on."}</p>
          <a className={s.textLink} href="#contact">{ar ? "ناقش فرصة معنا" : "DISCUSS AN OPPORTUNITY"}<span aria-hidden="true">↗</span></a>
        </div>
        <div className={s.steps}>{steps.map((step, i) => <article className={s.step} key={step.title}>
          <span className={s.stepNumber}>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p><span className={s.output}>{step.output}</span></div>
        </article>)}</div>
      </section>

      <section className={s.fields} id="fields" aria-labelledby="fields-title">
        <div className={s.fieldsTop}><div><div className={s.sectionLabel}><span>03 /</span> {ar ? "مجالات نستكشفها" : "FIELDS WE EXPLORE"}</div><h2 id="fields-title">{ar ? <>حيث تتقاطع القدرات،<br />تبدأ احتمالات جديدة.</> : <>Where capabilities meet,<br />possibilities begin.</>}</h2></div><p>{ar ? "نتتبّع الفرص عبر المجالات، ونبحث عن الروابط بينها. هذه اتجاهات استكشاف، وليست قائمة مشروعات منفّذة." : "We explore opportunities across disciplines—and the connections between them. These are areas of exploration, not a portfolio of completed projects."}</p></div>
        <div className={s.fieldList}>{fields.map(([en, arabic], i) => <Link href={projects} className={s.fieldRow} key={en}><span className={s.fieldNumber}>0{i + 1}</span><h3>{ar ? arabic : en}</h3><span className={s.fieldArrow} aria-hidden="true">↗</span></Link>)}</div>
        <Link className={s.textLink} href={projects}>{ar ? "استكشف المجالات" : "EXPLORE THE FIELDS"}<span aria-hidden="true">↗</span></Link>
      </section>

      <section className={s.report} aria-labelledby="report-title">
        <div className={s.reportImage}><Image src="/field-industry.jpg" alt={ar ? "روبوت داخل مصنع سيارات" : "A robot inside an automotive factory"} fill sizes="(max-width: 760px) 100vw, 55vw" /><span>{ar ? "من رؤى VISIONSEEK" : "FROM VISIONSEEK INSIGHTS"}</span></div>
        <div className={s.reportCopy}><div className={s.sectionLabel}><span>04 /</span> {ar ? "فكرة تستحق النظر" : "A CLOSER LOOK"}</div><p className={s.reportTag}>{ar ? "تقرير / الذكاء الاصطناعي المادي" : "REPORT / PHYSICAL AI"}</p><h2 id="report-title">{ar ? <>حين يغادر الذكاء<br />الاصطناعي الشاشة.</> : <>When AI moves<br />beyond the screen.</>}</h2><p>{ar ? "ما الذي يصبح ممكنًا عندما يجتمع الذكاء الاصطناعي والروبوتات والصناعة؟ قراءة في الانتقال من البرمجيات إلى العالم المادي." : "What becomes possible when artificial intelligence, robotics and industry come together? A perspective on the shift from software into the physical world."}</p><Link className={s.textLink} href={`${insights}/physical-ai`}>{ar ? "اقرأ التقرير" : "READ THE REPORT"}<span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className={s.founder} id="founder" aria-labelledby="founder-title">
        <div className={s.founderImage}><Image src="/ahmed-abdelalim.jpg" alt={ar ? "أحمد عبدالعليم، مؤسس VisionSeek" : "Ahmed Abdelalim, founder of VisionSeek"} fill sizes="(max-width: 760px) 80vw, 28vw" /></div>
        <div className={s.founderCopy}><div className={s.sectionLabel}><span>05 /</span> {ar ? "خلف الرؤية" : "BEHIND THE VISION"}</div><blockquote>{ar ? "«يبدأ التغيير الحقيقي عندما نربط ما هو موجود بالفعل، ونحوّله إلى ما هو قادم.»" : "“Meaningful change begins when we connect what already exists—and turn it into what comes next.”"}</blockquote><h2 id="founder-title">{ar ? "أحمد عبدالعليم" : "Ahmed Abdelalim"}</h2><p>{ar ? "المؤسس، VISIONSEEK · إنتشون، كوريا الجنوبية" : "FOUNDER, VISIONSEEK · INCHEON, SOUTH KOREA"}</p><a className={s.textLink} href="https://www.linkedin.com/in/ahmed-abdelalim-462491160/" target="_blank" rel="noreferrer">{ar ? "تواصل على LinkedIn" : "CONNECT ON LINKEDIN"}<span aria-hidden="true">↗</span></a></div>
      </section>

      <section className={s.contact} id="contact" aria-labelledby="contact-title">
        <div className={s.sectionLabel}><span>06 /</span> {ar ? "ابدأ محادثة" : "START A CONVERSATION"}</div>
        <div className={s.contactHeading}><h2 id="contact-title">{ar ? <>ماذا يمكن أن<br />نجعله ممكنًا؟</> : <>What could we<br />make possible?</>}</h2><a className={s.contactButton} href="mailto:abdelalim@visionseek.org" aria-label={ar ? "راسل VisionSeek بالبريد الإلكتروني" : "Email VisionSeek"}><span aria-hidden="true">↗</span></a></div>
        <div className={s.contactLinks}><a href="mailto:abdelalim@visionseek.org">abdelalim@visionseek.org</a><a href="https://wa.me/821042419606" target="_blank" rel="noreferrer">{ar ? "تواصل عبر واتساب" : "WHATSAPP"} <span aria-hidden="true">↗</span></a><span>{ar ? "إنتشون، كوريا الجنوبية" : "INCHEON, SOUTH KOREA"}</span></div>
      </section>
      <footer className={s.footer}><Link href={ar ? "/ar" : "/"} aria-label="VisionSeek home"><Image src="/visionseek-logo-v2.png" alt="VisionSeek" width={1920} height={440} /></Link><p lang="en" dir="ltr">MAKE IT POSSIBLE.</p><nav aria-label={ar ? "روابط قانونية" : "Legal"}><Link href={ar ? "/ar/privacy" : "/privacy"}>{ar ? "الخصوصية" : "PRIVACY"}</Link><Link href={ar ? "/ar/terms" : "/terms"}>{ar ? "الشروط" : "TERMS"}</Link></nav></footer>
    </main>
  );
}

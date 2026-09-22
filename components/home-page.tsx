import Image from "next/image";
import Link from "next/link";

export default function HomePage({ locale }: { locale: "ar" | "en" }) {
  const ar = locale === "ar";
  const insightsHref = ar ? "/ar/insights" : "/insights";
  const physicalAiHref = ar ? "/ar/insights/physical-ai" : "/insights/physical-ai";

  return (
    <main className={ar ? "locale-ar" : "locale-en"} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <header className="topbar">
        <a className="logo" href="#top" aria-label="VisionSeek home">
          <Image src="/visionseek-logo-v2.png" alt="VisionSeek" width={1920} height={440} priority />
        </a>
        <nav aria-label={ar ? "التنقل الرئيسي" : "Primary navigation"}>
          <a href="#how">{ar ? "كيف نعمل" : "How we work"}</a>
          <a href="#boards">{ar ? "للمجالس" : "Boards"}</a>
          <a href="#bridge">{ar ? "كوريا–الشرق الأوسط" : "Korea–MENA"}</a>
          <Link href={insightsHref}>{ar ? "رؤى" : "Insights"}</Link>
          <a href="#contact">{ar ? "تواصل" : "Contact"}</a>
          <Link className="language-link" href={ar ? "/" : "/ar"}>
            {ar ? "EN" : "العربية"}
          </Link>
          <span className="nav-node" aria-hidden="true" />
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="brand-mark" aria-hidden="true">
          <Image src="/visionseek-symbol-v2.png" alt="" fill sizes="80px" priority />
        </div>

        <div className="hero-copy">
          <div className="hero-title-lockup">
            <h1 className={ar ? "primary-ar" : "primary-en"}>
              {ar ? (
                <>
                  <span>نبني ما يأتي</span>
                  <br />
                  <span>بعد الطموح</span>
                </>
              ) : (
                <>
                  WE BUILD
                  <br />
                  WHAT COMES NEXT.
                </>
              )}
            </h1>
          </div>
          <p className={ar ? "intro-copy primary-ar" : "intro-copy primary-en"}>
            {ar ? (
              <>
                من طموح الذكاء الاصطناعي إلى تشغيل محكوم — للقادة اللي بيبنوا، مش بيتفرّجوا.
                <br />
                كوريا ↔ الشرق الأوسط: تبنٍّ مسؤول للوكلاء، طبقات تحكم، وقرارات تملكها المجالس.
              </>
            ) : (
              <>
                From AI ambition to governed execution — for leaders who build, not spectators.
                <br />
                Korea ↔ MENA: responsible agentic adoption, control planes, and decisions boards can own.
              </>
            )}
          </p>
          <div className="hero-cta">
            <a className="cta-primary" href="#contact">
              {ar ? "ابدأ إثباتًا محدود النطاق" : "Start a scoped proof"}
            </a>
            <a className="cta-secondary" href="#contact">
              {ar ? "ناقش قرارًا محكومًا واحدًا" : "Talk about one governed decision"}
            </a>
            <a className="cta-tertiary" href="#how">
              {ar ? "كيف نعمل" : "How we work"}
            </a>
          </div>
        </div>

        <div className="floating-world" aria-hidden="true">
          <div className="tile tile-photo">
            <Image src="/visionseek-hero.png" alt="" fill sizes="280px" />
          </div>
          <div className="tile tile-lime">
            <span>V</span>
          </div>
          <div className="tile tile-mist" />
          <div className="tile tile-line">
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span /> {ar ? "مرّر" : "SCROLL"}
        </div>
      </section>

      <section className="vision" id="vision">
        <div className="section-code">01 / {ar ? "رؤيتنا" : "OUR VISION"}</div>
        <div className="section-copy">
          <p className={ar ? "arabic-label" : "section-label-en"}>{ar ? "رؤيتنا" : "OUR VISION"}</p>
          <h2 className={ar ? "primary-ar" : "primary-en"}>
            {ar ? (
              <>نوجد حتى تستطيع الحكومات والشركات والمجالس اكتشاف ما يأتي بعد — وبناء قدرة محكومة للتحرّك.</>
            ) : (
              <>
                We exist so governments, companies, and boards can discover what comes next — and build the
                governed capability to act.
              </>
            )}
          </h2>
          <p className={ar ? "vision-human primary-ar" : "vision-human primary-en"}>
            {ar ? (
              <>
                قادة المنطقة يقدروا يبنوا ويقودوا من هنا. الذكاء الاصطناعي قرّب القدرة لمن يحكم ما يبني — مش لمن
                يشتري اسم نموذج فقط.
              </>
            ) : (
              <>
                MENA leaders can build and lead from here. AI brought capability closer to those who govern what
                they build — not those who only buy a model name.
              </>
            )}
          </p>
        </div>

        <div className="vision-orbit" aria-hidden="true">
          <span className="orbit-ring" />
          <span className="orbit-node node-one" />
          <span className="orbit-node node-two" />
          <span className="orbit-node node-three" />
        </div>
      </section>

      <section className="fields pillars" id="pillars">
        <div className="section-code">02 / {ar ? "أعمدة العمل" : "FOUR PILLARS"}</div>
        <div className="fields-heading">
          <p className={ar ? "arabic-label" : "section-label-en"}>{ar ? "أعمدة العمل" : "FOUR PILLARS"}</p>
          <h2 className={ar ? "primary-ar" : "primary-en"}>
            {ar ? "من الطموح إلى تنفيذ يمكن الحكم عليه." : "From ambition to execution boards can own."}
          </h2>
        </div>

        <div className="pillar-grid">
          <article className="pillar-card">
            <span>01</span>
            <h3>{ar ? "وكلاء محكومون" : "Governed agents"}</h3>
            <p>
              {ar
                ? "طبقة وكلاء لها صاحب وسياسات وقواعد واضحة لمتى يُسمح بالفعل. ليس: شات بوت لكل شيء."
                : "Agents with an owner, policies, and clear rules for when action is allowed. Not: a chatbot for everything."}
            </p>
          </article>
          <article className="pillar-card" id="boards">
            <span>02</span>
            <h3>{ar ? "قرارات جاهزة للمجالس" : "Board-ready decisions"}</h3>
            <p>
              {ar
                ? "خط أساس، نطاق، معايير قبول، ومن يوقف النظام. ليس: وعود توفير بلا قياس."
                : "Baseline, scope, acceptance criteria, and who can stop the system. Not: savings promises without measurement."}
            </p>
          </article>
          <article className="pillar-card" id="bridge">
            <span>03</span>
            <h3>{ar ? "جسر كوريا–الشرق الأوسط" : "Korea–MENA bridge"}</h3>
            <p>
              {ar
                ? "قدرة جادة من كوريا × طلب مؤسسي في المنطقة. ليس: ادعاء تفويض محلي غير قائم."
                : "Serious capability from Korea × institutional demand in the region. Not: claiming a local mandate that does not exist."}
            </p>
          </article>
          <article className="pillar-card">
            <span>04</span>
            <h3>{ar ? "هندسة الفرص" : "Opportunity Engineering"}</h3>
            <p>
              {ar
                ? "نختبر فرصًا صعبة بتشغيل بشري ونماذج تحت حوكمة. ليس: شركة جديدة كل أسبوع أو ضجيج إطلاق."
                : "We stress-test hard opportunities with human + model work under governance. Not: a new company every week / launch noise."}
            </p>
          </article>
        </div>
      </section>

      <section className="vision how-work" id="how">
        <div className="section-code">03 / {ar ? "كيف نعمل" : "HOW WE WORK"}</div>
        <div className="section-copy">
          <p className={ar ? "arabic-label" : "section-label-en"}>{ar ? "كيف نعمل" : "HOW WE WORK"}</p>
          <h2 className={ar ? "primary-ar" : "primary-en"}>
            {ar ? (
              <>إثباتات محدودة النطاق. طبقات تحكم واضحة. قرارات تملكها المجالس.</>
            ) : (
              <>Scoped proofs. Clear control planes. Decisions a board can own.</>
            )}
          </h2>
          <p className={ar ? "vision-human primary-ar" : "vision-human primary-en"}>
            {ar ? (
              <>نربط الطموح بتنفيذ محكوم عبر هندسة الفرص — لا تجارب بلا ملكية.</>
            ) : (
              <>
                We connect ambition to governed execution through Opportunity Engineering — not pilots without
                ownership.
              </>
            )}
          </p>
          <p className="how-cta">
            <a href="#contact">{ar ? "ابدأ إثباتًا محدود النطاق" : "Start a scoped proof"}</a>
          </p>
        </div>
      </section>

      <section className="fields insights-teaser" id="insights">
        <div className="section-code">04 / {ar ? "رؤى" : "INSIGHTS"}</div>
        <div className="fields-heading">
          <p className={ar ? "arabic-label" : "section-label-en"}>{ar ? "رؤى" : "INSIGHTS"}</p>
          <h2 className={ar ? "primary-ar" : "primary-en"}>
            {ar ? "إشارات أصلية للقادة العامين والمؤسسيين." : "Original signals for public and institutional leaders."}
          </h2>
          <p className={ar ? "pillar-lead primary-ar" : "pillar-lead primary-en"}>
            {ar
              ? "نربط تحولات التقنية والعلم والصناعة بالسياسة والاستثمار والقدرة الوطنية."
              : "Connecting technology, science, and industry shifts to policy, investment, and national capability."}
          </p>
          <div className="insights-teaser-links">
            <Link href={insightsHref}>{ar ? "اقرأ الرؤى" : "Read Insights"}</Link>
            <Link href={physicalAiHref}>
              {ar ? "مميز: Physical AI — موجز حكومي" : "Featured: Physical AI government brief"}
            </Link>
          </div>
        </div>
      </section>

      <section className="finale">
        <div className="final-node" aria-hidden="true" />
        <p className={ar ? "primary-ar" : "primary-en"}>
          {ar ? (
            <>
              المستقبل المحكوم
              <br />
              يُبنى — لا يُشترى جاهزًا.
            </>
          ) : (
            <>
              A governed future
              <br />
              is built — not bought.
            </>
          )}
        </p>
      </section>

      <section className="contact" id="contact">
        <div className="section-code">05 / {ar ? "ابدأ إثباتًا" : "START A SCOPED PROOF"}</div>
        <div className="contact-heading">
          <p className={ar ? "arabic-label" : "section-label-en"}>
            {ar ? "تواصل معنا" : "START A SCOPED PROOF"}
          </p>
          <h2 className={ar ? "primary-ar" : "primary-en"}>
            {ar ? (
              <>
                ناقش قرارًا محكومًا
                <br />
                واحدًا.
              </>
            ) : (
              <>
                TALK ABOUT ONE
                <br />
                GOVERNED DECISION.
              </>
            )}
          </h2>
        </div>

        <div className="contact-grid">
          <a className="contact-item" href="mailto:abdelalim@visionseek.org">
            <span>{ar ? "البريد الإلكتروني" : "EMAIL"}</span>
            <strong>abdelalim@visionseek.org</strong>
            <i aria-hidden="true">↗</i>
          </a>
          <a className="contact-item" href="https://wa.me/821042419606" target="_blank" rel="noreferrer">
            <span>{ar ? "واتساب" : "WHATSAPP"}</span>
            <strong>+82 10 4241 9606</strong>
            <i aria-hidden="true">↗</i>
          </a>
          <a
            className="contact-item"
            href="https://www.linkedin.com/in/ahmed-abdelalim-462491160/"
            target="_blank"
            rel="noreferrer"
          >
            <span>{ar ? "لينكدإن" : "LINKEDIN"}</span>
            <strong>Ahmed Abdelalim</strong>
            <i aria-hidden="true">↗</i>
          </a>
          <div className="contact-location">
            <p>{ar ? "إنتشون، كوريا الجنوبية" : "INCHEON, SOUTH KOREA"}</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo" aria-hidden="true" />
        <span>VISIONSEEK</span>
      </footer>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function HomePage({ locale }: { locale: "ar" | "en" }) {
  const ar = locale === "ar";
  return (
    <main className={ar ? "locale-ar" : "locale-en"} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <header className="topbar">
        <a className="logo" href="#top" aria-label="VisionSeek home">
          <Image src="/visionseek-logo-v2.png" alt="VisionSeek" width={1920} height={440} priority />
        </a>
        <nav aria-label={ar ? "التنقل الرئيسي" : "Primary navigation"}>
          <Link href={ar ? "/ar/projects" : "/projects"}>{ar ? "المشروعات" : "PROJECTS"}</Link>
          <a href="#vision">{ar ? "الرؤية" : "VISION"}</a>
          <a href="#founder">{ar ? "المؤسس" : "FOUNDER"}</a>
          <a href="#contact">{ar ? "تواصل" : "CONTACT"}</a>
          <Link className="language-link" href={ar ? "/" : "/ar"}>{ar ? "EN" : "العربية"}</Link>
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
              {ar ? <><span>نحن نبني</span><br /><span>ما هو قادم</span></> : <>WE BUILD<br />WHAT COMES NEXT.</>}
            </h1>
          </div>
          <p className={ar ? "intro-copy primary-ar" : "intro-copy primary-en"}>
            {ar
              ? <>تجمع VisionSeek بين التكنولوجيا والعلم والتصميم وريادة الأعمال لتحويل الإمكانات الجديدة إلى مشروعات ومنتجات وأنظمة قابلة للتنفيذ والتوسع.</>
              : <>VisionSeek brings together technology, science, design, and entrepreneurship to turn emerging possibilities into scalable projects, products, and systems.</>}
          </p>
        </div>

        <div className="floating-world" aria-hidden="true">
          <div className="tile tile-photo"><Image src="/visionseek-hero.png" alt="" fill sizes="280px" /></div>
          <div className="tile tile-lime"><span>V</span></div>
          <div className="tile tile-mist" />
          <div className="tile tile-line"><i /><i /><i /></div>
        </div>

        <div className="scroll-cue" aria-hidden="true"><span /> {ar ? "مرّر" : "SCROLL"}</div>
      </section>

      <section className="vision" id="vision">
        <div className="section-code">01 / {ar ? "رؤيتنا" : "OUR VISION"}</div>
        <div className="section-copy">
          <p className={ar ? "arabic-label" : "section-label-en"}>{ar ? "رؤيتنا" : "OUR VISION"}</p>
          <h2 className={ar ? "primary-ar" : "primary-en"}>
            {ar
              ? <>أن نصبح مؤسسة عالمية تساعد الحكومات والشركات والقادة على اكتشاف فرص المستقبل وبناء القدرات اللازمة للاستفادة منها.</>
              : <>To become a global institution that helps governments, companies, and leaders discover future opportunities and build the capabilities to act on them.</>}
          </h2>
        </div>

        <div className="vision-orbit" aria-hidden="true">
          <span className="orbit-ring" />
          <span className="orbit-node node-one" />
          <span className="orbit-node node-two" />
          <span className="orbit-node node-three" />
        </div>
      </section>

      <section className="fields" id="fields">
        <div className="section-code">02 / {ar ? "مجالات نستكشفها" : "FIELDS WE EXPLORE"}</div>
        <div className="fields-heading">
          <p className={ar ? "arabic-label" : "section-label-en"}>{ar ? "مساحات نبحث فيها" : "FIELDS WE EXPLORE"}</p>
          <h2 className={ar ? "primary-ar" : "primary-en"}>{ar ? "نبحث حيث يمكن للأفكار الجديدة أن تعيد تشكيل حياة الإنسان." : "We explore where new ideas can reshape human life."}</h2>
        </div>

        <div className="field-grid">
          <article className="field-card field-space">
            <Image src="/field-space.jpg" alt="صاروخ ينطلق إلى الفضاء وقت الغروب" fill sizes="(max-width: 850px) 100vw, 58vw" />
            <div className="field-caption"><span>01</span><h3>{ar ? "الفضاء والصواريخ" : "SPACE & ROCKETS"}</h3></div>
          </article>
          <article className="field-card field-drones">
            <Image src="/field-drones.jpg" alt="درون حديث يحلق في الهواء" fill sizes="(max-width: 850px) 100vw, 42vw" />
            <div className="field-caption"><span>02</span><h3>{ar ? "الدرونز والأنظمة الجوية" : "DRONES & AERIAL SYSTEMS"}</h3></div>
          </article>
          <article className="field-card field-cities">
            <Image src="/field-cities.jpg" alt="شبكات رقمية ترمز إلى مدن المستقبل" fill sizes="(max-width: 850px) 100vw, 58vw" />
            <div className="field-caption"><span>03</span><h3>{ar ? "مدن المستقبل" : "FUTURE CITIES"}</h3></div>
          </article>
          <article className="field-card field-science">
            <Image src="/field-science.jpg" alt="باحث يعمل داخل مختبر حديث" fill sizes="(max-width: 850px) 100vw, 42vw" />
            <div className="field-caption"><span>04</span><h3>{ar ? "العلم والصحة" : "SCIENCE & HEALTH"}</h3></div>
          </article>
          <article className="field-card field-energy">
            <Image src="/field-energy.jpg" alt="ألواح شمسية وتوربينات رياح" fill sizes="(max-width: 850px) 100vw, 34vw" />
            <div className="field-caption"><span>05</span><h3>{ar ? "الطاقة والمناخ" : "ENERGY & CLIMATE"}</h3></div>
          </article>
          <article className="field-card field-industry">
            <Image src="/field-industry.jpg" alt="روبوتات داخل مصنع متقدم" fill sizes="(max-width: 850px) 100vw, 66vw" />
            <div className="field-caption"><span>06</span><h3>{ar ? "الروبوتات والصناعة الذكية" : "ROBOTICS & SMART INDUSTRY"}</h3></div>
          </article>
          <article className="field-card field-food">
            <Image src="/field-food.jpg" alt="صوب زراعية حديثة من الجو" fill sizes="(max-width: 850px) 100vw, 34vw" />
            <div className="field-caption"><span>07</span><h3>{ar ? "الزراعة والغذاء المستدام" : "AGRICULTURE & SUSTAINABLE FOOD"}</h3></div>
          </article>
        </div>
      </section>

      <section className="founder" id="founder">
        <div className="section-code">03 / {ar ? "خلف الرؤية" : "BEHIND THE VISION"}</div>
        <div className="founder-portrait">
          <Image src="/ahmed-abdelalim.jpg" alt="أحمد عبدالعليم" fill sizes="(max-width: 850px) 100vw, 45vw" />
          <span aria-hidden="true" />
        </div>
        <div className="founder-copy">
          <p className={ar ? "arabic-label" : "section-label-en"}>{ar ? "خلف الرؤية" : "BEHIND THE VISION"}</p>
          <h2 className={ar ? "primary-ar" : "primary-en"}>{ar ? "أحمد عبدالعليم" : "Ahmed Abdelalim"}</h2>
          <p className="founder-role">{ar ? "المؤسس · VISIONSEEK" : "FOUNDER · VISIONSEEK"}</p>
          <p className={ar ? "founder-bio primary-ar" : "founder-bio primary-en"}>
            {ar
              ? <>أؤمن أن تغيير العالم لا يبدأ دائمًا باختراع شيء جديد، بل باكتشاف الرابط المفقود بين ما نعرفه وما نستطيع أن نصنعه. من خلال VisionSeek، أطمح إلى جمع التكنولوجيا والعلم والتصميم وريادة الأعمال في مشروعات تفتح إمكانات جديدة للإنسان والمجتمع.</>
              : <>I believe changing the world does not always begin with inventing something new, but with discovering the missing connection between what we know and what we can build. Through VisionSeek, I aim to unite technology, science, design, and entrepreneurship in projects that unlock new possibilities for people and society.</>}
          </p>
          <blockquote className={ar ? "primary-ar" : "primary-en"}>
            {ar ? "يبدأ التغيير الحقيقي عندما نربط ما هو موجود بالفعل، ونحوّله إلى ما هو قادم." : "Meaningful change begins when we connect what already exists — and turn it into what comes next."}
          </blockquote>
        </div>
      </section>

      <section className="finale">
        <div className="final-node" aria-hidden="true" />
        <p className={ar ? "primary-ar" : "primary-en"}>{ar ? <>المستقبل موجود بالفعل،<br />لكنه لم يُربط بعد.</> : <>The future is already here.<br />It simply has not been connected yet.</>}</p>
      </section>

      <section className="contact" id="contact">
        <div className="section-code">04 / {ar ? "ابدأ محادثة" : "START A CONVERSATION"}</div>
        <div className="contact-heading">
          <p className={ar ? "arabic-label" : "section-label-en"}>{ar ? "تواصل معنا" : "START A CONVERSATION"}</p>
          <h2 className={ar ? "primary-ar" : "primary-en"}>{ar ? <>دعنا نبني<br />ما هو قادم.</> : <>LET&apos;S BUILD<br />WHAT COMES NEXT.</>}</h2>
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
          <a className="contact-item" href="https://www.linkedin.com/in/ahmed-abdelalim-462491160/" target="_blank" rel="noreferrer">
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

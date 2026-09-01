import Link from "next/link";

const sources = [
  {
    name: "McKinsey Global Institute",
    title: "Agents, robots, and us: Skill partnerships in the age of AI",
    url: "https://www.mckinsey.com/mgi/our-research/agents-robots-and-us-skill-partnerships-in-the-age-of-ai",
  },
  {
    name: "OECD",
    title: "Governing with Artificial Intelligence",
    url: "https://www.oecd.org/en/publications/governing-with-artificial-intelligence_795de142-en/full-report.html",
  },
  {
    name: "World Economic Forum",
    title: "Bringing AI into the physical world with autonomous systems",
    url: "https://www.weforum.org/stories/2025/01/ai-and-autonomous-systems/",
  },
];

const report = {
  en: {
    label: "VISIONSEEK GOVERNMENT BRIEF / 01",
    date: "SEPTEMBER 2026",
    read: "8 MIN READ",
    title: "Physical AI is becoming national infrastructure",
    standfirst: "The next AI advantage will not live only in data centers. It will move through ports, farms, factories, cities, and public services. Governments have a narrow window to shape the systems, standards, and capabilities that will determine who captures the value.",
    summaryLabel: "EXECUTIVE BRIEF",
    summary: "Physical AI combines intelligence, sensing, and machines that can act in the real world. For governments, it is simultaneously a productivity opportunity, a strategic capability, and a new domain of public risk. The winning approach is not a collection of isolated pilots. It is a national deployment system: priority missions, shared infrastructure, procurement pathways, safety rules, talent, and measurable public outcomes.",
    findingsLabel: "THREE SIGNALS FOR GOVERNMENT",
    findings: [
      ["01", "The unit of competition is shifting", "Competitive advantage is moving from individual robots toward the full stack: data, simulation, sensors, connectivity, energy, software, standards, and operating talent. Policy that supports only hardware will leave the most valuable layers elsewhere."],
      ["02", "Public demand can create the market", "Ports, utilities, emergency response, agriculture, healthcare, and infrastructure maintenance give governments real operating environments in which to define problems, validate systems, and create reference demand for local industry."],
      ["03", "Trust must be engineered before scale", "When AI acts in physical space, failures can affect safety and essential services. Assurance, cybersecurity, human override, incident reporting, liability, and auditability must be designed into deployment—not added after adoption."],
    ],
    connectionLabel: "THE STRATEGIC GAP",
    connectionTitle: "Most governments have the pieces. Few have connected them.",
    connection: "Research institutions, industrial companies, public data, infrastructure operators, investors, and regulators often work through separate programs. Physical AI turns that fragmentation into the central policy problem. The state’s highest-value role is to connect these capabilities around missions that matter to citizens and the economy.",
    actionLabel: "A FIVE-PART GOVERNMENT AGENDA",
    actions: [
      ["Choose three national missions", "Prioritize outcomes where autonomy can create clear public value—such as food resilience, port productivity, infrastructure inspection, disaster response, or elder care."],
      ["Build shared test environments", "Create secure real-world sandboxes, simulation assets, and evaluation protocols that agencies, researchers, and companies can use."],
      ["Procure outcomes, not demonstrations", "Use staged procurement tied to safety, reliability, local capability, and measurable service improvement."],
      ["Establish an assurance layer", "Define requirements for cybersecurity, data governance, human control, incident disclosure, and independent testing."],
      ["Develop the operating workforce", "Prepare engineers, frontline workers, public managers, and regulators to deploy and supervise autonomous systems together."],
    ],
    perspectiveLabel: "VISIONSEEK PERSPECTIVE",
    perspective: "Physical AI policy should begin with the public outcome, not the machine. Countries that connect national missions to experimentation, regulation, procurement, and industrial capability will move from importing technology to shaping markets.",
    sourceLabel: "SELECTED SOURCES",
    sourceNote: "This brief is original VisionSeek analysis. Sources are provided for evidence and further reading; no source text is republished.",
    cta: "Discuss a government mission",
    back: "Back to Insights",
  },
  ar: {
    label: "إحاطة VISIONSEEK للحكومات / 01",
    date: "سبتمبر 2026",
    read: "8 دقائق قراءة",
    title: "الذكاء الاصطناعي المادي يتحول إلى بنية تحتية وطنية",
    standfirst: "الميزة التالية للذكاء الاصطناعي لن تبقى داخل مراكز البيانات؛ بل ستتحرك عبر الموانئ والمزارع والمصانع والمدن والخدمات العامة. أمام الحكومات نافذة محدودة لبناء الأنظمة والمعايير والقدرات التي تحدد من يصنع القيمة ومن يكتفي باستيرادها.",
    summaryLabel: "الملخص التنفيذي",
    summary: "يجمع الذكاء الاصطناعي المادي بين الذكاء والاستشعار والآلات القادرة على الفعل في العالم الحقيقي. وهو للحكومات فرصة للإنتاجية، وقدرة استراتيجية، ومجال جديد للمخاطر العامة في الوقت نفسه. النجاح لن يأتي من تجارب منفصلة، بل من منظومة وطنية للتنفيذ: أولويات واضحة، وبنية مشتركة، ومسارات شراء، وقواعد أمان، ومهارات، ونتائج عامة قابلة للقياس.",
    findingsLabel: "ثلاث إشارات للحكومات",
    findings: [
      ["01", "وحدة المنافسة تتغير", "الميزة تنتقل من الروبوت منفردًا إلى المنظومة الكاملة: البيانات والمحاكاة والمستشعرات والاتصال والطاقة والبرمجيات والمعايير والمهارات التشغيلية. دعم الأجهزة وحدها يترك الطبقات الأعلى قيمة في الخارج."],
      ["02", "الطلب الحكومي قادر على صناعة السوق", "توفر الموانئ والمرافق والاستجابة للطوارئ والزراعة والرعاية الصحية وصيانة البنية التحتية بيئات حقيقية لتعريف المشكلات واختبار الأنظمة وبناء طلب مرجعي للصناعة المحلية."],
      ["03", "الثقة يجب أن تُهندس قبل التوسع", "عندما يعمل الذكاء الاصطناعي في المجال المادي تصبح الأخطاء مرتبطة بالسلامة والخدمات الأساسية. لذلك يجب تصميم الأمن السيبراني والتدخل البشري والإبلاغ عن الحوادث والمسؤولية والتدقيق داخل النظام منذ البداية."],
    ],
    connectionLabel: "الفجوة الاستراتيجية",
    connectionTitle: "تمتلك معظم الحكومات العناصر، لكن القليل منها ربطها.",
    connection: "غالبًا ما تعمل مؤسسات البحث والشركات الصناعية ومشغلو البنية التحتية والمستثمرون والجهات التنظيمية عبر برامج منفصلة. يحول الذكاء الاصطناعي المادي هذا التشتت إلى جوهر التحدي. وأعلى أدوار الدولة قيمة هو ربط تلك القدرات حول مهام تمس المواطن والاقتصاد.",
    actionLabel: "أجندة حكومية من خمسة محاور",
    actions: [
      ["اختيار ثلاث مهام وطنية", "تحديد نتائج يمكن للأنظمة الذاتية أن تصنع فيها قيمة عامة واضحة، مثل الأمن الغذائي أو إنتاجية الموانئ أو فحص البنية التحتية أو الاستجابة للكوارث أو رعاية كبار السن."],
      ["بناء بيئات اختبار مشتركة", "إنشاء مختبرات واقعية آمنة وأصول للمحاكاة وبروتوكولات تقييم تستخدمها الجهات الحكومية والباحثون والشركات."],
      ["شراء النتائج لا العروض", "استخدام مشتريات مرحلية مرتبطة بالأمان والموثوقية وبناء القدرة المحلية وتحسن الخدمة بصورة قابلة للقياس."],
      ["تأسيس طبقة ضمان", "وضع متطلبات للأمن السيبراني وحوكمة البيانات والسيطرة البشرية والإفصاح عن الحوادث والاختبار المستقل."],
      ["تطوير قوة العمل التشغيلية", "إعداد المهندسين والعاملين الميدانيين والمديرين الحكوميين والمنظمين لنشر الأنظمة الذاتية والإشراف عليها معًا."],
    ],
    perspectiveLabel: "منظور VISIONSEEK",
    perspective: "يجب أن تبدأ سياسة الذكاء الاصطناعي المادي من النتيجة العامة لا من الآلة. الدول التي تربط المهام الوطنية بالتجربة والتنظيم والشراء والقدرة الصناعية ستنتقل من استيراد التكنولوجيا إلى تشكيل أسواقها.",
    sourceLabel: "مصادر مختارة",
    sourceNote: "هذه إحاطة أصلية من VisionSeek. أُدرجت المصادر للاستدلال والقراءة الإضافية، ولم يُعاد نشر نصوصها.",
    cta: "ناقش مهمة حكومية معنا",
    back: "العودة إلى الرؤى",
  },
};

export default function ReportPage({ locale }: { locale: "ar" | "en" }) {
  const ar = locale === "ar";
  const copy = report[locale];
  const base = ar ? "/ar" : "";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Report",
    headline: copy.title,
    datePublished: "2026-09-01",
    inLanguage: ar ? "ar" : "en",
    author: { "@type": "Organization", name: "VisionSeek", url: "https://visionseek.org" },
    publisher: { "@type": "Organization", name: "VisionSeek", url: "https://visionseek.org" },
    mainEntityOfPage: `https://visionseek.org${base}/insights/physical-ai`,
  };

  return (
    <main className={`report-page ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="topbar insights-topbar">
        <Link className="insights-wordmark" href={base || "/"}>VISIONSEEK</Link>
        <nav aria-label={ar ? "التنقل الرئيسي" : "Primary navigation"}>
          <Link href={`${base}/insights`}>{ar ? "الرؤى" : "INSIGHTS"}</Link>
          <Link className="language-link" href={ar ? "/insights/physical-ai" : "/ar/insights/physical-ai"}>{ar ? "EN" : "العربية"}</Link>
          <span className="nav-node" aria-hidden="true" />
        </nav>
      </header>

      <article>
        <header className="report-header">
          <div className="report-meta"><span>{copy.label}</span><span>{copy.date} · {copy.read}</span></div>
          <h1>{copy.title}</h1>
          <p>{copy.standfirst}</p>
        </header>

        <section className="report-summary">
          <p className="report-eyebrow">{copy.summaryLabel}</p>
          <p>{copy.summary}</p>
        </section>

        <section className="report-findings">
          <div className="report-section-title"><p>{copy.findingsLabel}</p><span>03</span></div>
          <div className="finding-grid">
            {copy.findings.map(([number, title, body]) => <section key={number}><span>{number}</span><h2>{title}</h2><p>{body}</p></section>)}
          </div>
        </section>

        <section className="report-connection">
          <p className="report-eyebrow">{copy.connectionLabel}</p>
          <h2>{copy.connectionTitle}</h2>
          <p>{copy.connection}</p>
        </section>

        <section className="report-actions">
          <div className="report-section-title"><p>{copy.actionLabel}</p><span>05</span></div>
          <ol>{copy.actions.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
        </section>

        <section className="report-perspective">
          <p>{copy.perspectiveLabel}</p>
          <blockquote>{copy.perspective}</blockquote>
        </section>

        <section className="report-sources">
          <p className="report-eyebrow">{copy.sourceLabel}</p>
          <p>{copy.sourceNote}</p>
          <ol>{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><span>{source.name}</span>{source.title} ↗</a></li>)}</ol>
        </section>

        <footer className="report-footer">
          <Link href={`${base}/insights`}>← {copy.back}</Link>
          <a href="mailto:abdelalim@visionseek.org?subject=Government%20mission%20briefing">{copy.cta} ↗</a>
        </footer>
      </article>
    </main>
  );
}

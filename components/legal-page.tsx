import Link from "next/link";
import SiteHeader from "@/components/site-header";

type LegalKind = "privacy" | "terms";

export default function LegalPage({ locale, kind }: { locale: "ar" | "en"; kind: LegalKind }) {
  const ar = locale === "ar";
  const home = ar ? "/ar" : "/";
  const privacyHref = ar ? "/ar/privacy" : "/privacy";
  const termsHref = ar ? "/ar/terms" : "/terms";

  return (
    <main className={`legal-page ${ar ? "locale-ar" : "locale-en"}`} lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>
      <SiteHeader
        locale={locale}
        languageHref={kind === "privacy" ? (ar ? "/privacy" : "/ar/privacy") : (ar ? "/terms" : "/ar/terms")}
        items={[
          { href: home, label: ar ? "الرئيسية" : "HOME" },
          { href: ar ? "/ar/projects" : "/projects", label: ar ? "المجالات" : "FIELDS" },
          { href: ar ? "/ar/insights" : "/insights", label: ar ? "رؤى" : "INSIGHTS" },
        ]}
      />

      <article className="legal-wrap">
        <p className="legal-kicker">VISIONSEEK / {kind === "privacy" ? (ar ? "الخصوصية" : "PRIVACY") : (ar ? "الشروط" : "TERMS")}</p>
        {kind === "privacy" ? <Privacy ar={ar} /> : <Terms ar={ar} />}
        <p className="legal-meta">
          {ar ? "ساري من 23 سبتمبر 2026 · إنتشون، كوريا الجنوبية" : "EFFECTIVE 23 SEPTEMBER 2026 · INCHEON, SOUTH KOREA"}
          {" · "}
          <Link href={kind === "privacy" ? termsHref : privacyHref}>{kind === "privacy" ? (ar ? "الشروط" : "Terms") : (ar ? "الخصوصية" : "Privacy")}</Link>
        </p>
      </article>

      <footer>
        <div className="footer-logo" aria-hidden="true" />
        <span>VISIONSEEK</span>
        <nav className="footer-legal" aria-label={ar ? "روابط قانونية" : "Legal"}>
          <Link href={privacyHref}>{ar ? "الخصوصية" : "PRIVACY"}</Link>
          <Link href={termsHref}>{ar ? "الشروط" : "TERMS"}</Link>
        </nav>
      </footer>
    </main>
  );
}

function Privacy({ ar }: { ar: boolean }) {
  if (ar) {
    return (
      <>
        <h1 className="primary-ar">الخصوصية</h1>
        <p className="legal-lead primary-ar">موقع VisionSeek العام لا يفتح حسابات، ولا يبيع بيانات، ولا يشغّل إعلانات.</p>
        <h2>من نحن</h2>
        <p>VisionSeek مؤسسة يعمل عليها أحمد عبدالعليم من إنتشون، كوريا الجنوبية. للتواصل: <a href="mailto:abdelalim@visionseek.org">abdelalim@visionseek.org</a>.</p>
        <h2>ما الذي لا نجمعه هنا</h2>
        <ul>
          <li>لا حسابات، ولا نماذج تخزّن بيانات على خوادمنا.</li>
          <li>لا ملفات تعريف ارتباط إعلانية، ولا بكسل تتبّع.</li>
        </ul>
        <h2>إذا راسلتنا</h2>
        <p>البريد وواتساب يمرّان عبر تلك الخدمات ثم إلينا لنرد. نحتفظ بالمراسلة للرد والمتابعة، ونحذفها إذا طلبت ذلك على العنوان أعلاه، ما لم يلزمنا الاحتفاظ بها لالتزام قانوني.</p>
        <h2>صفحة الرؤى</h2>
        <p>متصفحك يطلب ملف إشارات عامًا من GitHub (<span dir="ltr">raw.githubusercontent.com</span>). هذا الطلب ظاهر لـ GitHub بحسب شروطهم. لا نضيف إليه اسمك.</p>
        <h2>سجلات التشغيل</h2>
        <p>الاستضافة على Vercel قد تسجّل عنوان الإنترنت ونوع المتصفح والصفحة المطلوبة لتشغيل الموقع وحمايته. لا نبيع هذه السجلات.</p>
        <h2>الأطفال</h2>
        <p>الموقع غير موجّه للأطفال.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="primary-en">Privacy</h1>
      <p className="legal-lead primary-en">This public VisionSeek site does not open accounts, sell data, or run advertising.</p>
      <h2>Who</h2>
      <p>VisionSeek is operated by Ahmed Abdelalim from Incheon, South Korea. Contact: <a href="mailto:abdelalim@visionseek.org">abdelalim@visionseek.org</a>.</p>
      <h2>What this site does not collect</h2>
      <ul>
        <li>No accounts, and no forms that store personal data on our servers.</li>
        <li>No advertising cookies and no tracking pixel.</li>
      </ul>
      <h2>If you write to us</h2>
      <p>Email and WhatsApp pass through those services and then to us so we can reply. We keep the correspondence to answer and follow up, and we delete it if you ask at the address above, unless a legal duty requires us to keep it.</p>
      <h2>Insights</h2>
      <p>Your browser requests a public signals file from GitHub (raw.githubusercontent.com). That request is visible to GitHub under their terms. We do not attach your name to it.</p>
      <h2>Operations logs</h2>
      <p>The site is hosted on Vercel, which may log IP address, browser type, and the page requested in order to run and protect the site. We do not sell those logs.</p>
      <h2>Children</h2>
      <p>The site is not directed at children.</p>
    </>
  );
}

function Terms({ ar }: { ar: boolean }) {
  if (ar) {
    return (
      <>
        <h1 className="primary-ar">الشروط</h1>
        <p className="legal-lead primary-ar">الموقع عرض لما هي عليه VisionSeek وما تستكشفه. ليس عقدًا، ولا عرضًا للاستثمار، ولا استشارة.</p>
        <h2>ما تقرأه</h2>
        <p>صفحة المجالات تصف مساحات استكشاف، لا مشروعات مُسلَّمة، إلا إذا قال اتفاق مكتوب غير ذلك. صفحة الرؤى مستشعر: إشارات وإحاطات للمساعدة على الرؤية، لا نصيحة قانونية أو استثمارية أو قرارًا حكوميًا بالنيابة عنك.</p>
        <h2>لا شراكة ضمنية</h2>
        <p>يمكنك الربط بالموقع. لا تستخدم الاسم أو الشعار بما يوحي بشراكة أو تفويض أو تمثيل حكومي.</p>
        <h2>المحتوى</h2>
        <p>النصوص والصور والعلامة على هذا الموقع لـ VisionSeek ما لم يُنسب مصدر آخر. الإحاطات قد تختصر أخبارًا عامة؛ المصدر المذكور يبقى مصدر الواقعة.</p>
        <h2>التوافر</h2>
        <p>نسعى لأن يبقى الموقع متاحًا، دون ضمان عدم الانقطاع أو خلوّه من الخطأ.</p>
        <h2>أي التزام حقيقي</h2>
        <p>لا ينشأ التزام مال أو تسليم أو تمثيل إلا باتفاق مكتوب. للأسئلة: <a href="mailto:abdelalim@visionseek.org">abdelalim@visionseek.org</a>.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="primary-en">Terms</h1>
      <p className="legal-lead primary-en">The site shows what VisionSeek is and what it is exploring. It is not a contract, an investment offer, or advice.</p>
      <h2>What you are reading</h2>
      <p>The fields page describes areas of exploration, not delivered projects, unless a written agreement says otherwise. Insights is a sensor: signals and briefings to help you see, not legal, investment, or policy advice, and not a decision made for you.</p>
      <h2>No implied partnership</h2>
      <p>You may link to the site. Do not use the name or mark to suggest a partnership, a mandate, or government representation.</p>
      <h2>Content</h2>
      <p>Text, images, and the mark on this site belong to VisionSeek unless another source is named. Briefings may compress public news; the cited source remains the source of the fact.</p>
      <h2>Availability</h2>
      <p>We try to keep the site available. We do not guarantee that it will be uninterrupted or error-free.</p>
      <h2>A real obligation</h2>
      <p>No duty of money, delivery, or representation arises except in a written agreement. Questions: <a href="mailto:abdelalim@visionseek.org">abdelalim@visionseek.org</a>.</p>
    </>
  );
}

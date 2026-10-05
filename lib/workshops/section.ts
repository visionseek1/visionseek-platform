import type { Locale } from "@/components/capability/content";

/** Preview copy from workshops-section-page-v0-DRAFT. Native EN and AR fields only. */
const copy = {
  en: {
    name: "Workshops",
    promise:
      "Working sessions that help an organization decide what capability to build, buy, or bring in with a partner — and in what order — leaving with one decision it can act on.",
    audience:
      "Leadership and operating teams in organizations that need a new capability — starting with pharmaceutical manufacturing (technology transfer, training, GMP/quality, supply chain).",
    how: "How we work",
    blocks: [
      {
        title: "One capability question",
        body: "Every session starts from a single question the organization actually faces: can we do a specific, observable thing we can't do today? If it isn't a real question yet, we don't run the session.",
      },
      {
        title: "Evidence before options",
        body: "The team brings what exists, what is missing, and how they know. We separate evidence from opinion and assumption before anyone proposes a solution.",
      },
      {
        title: "Build, buy, or partner",
        body: "For each critical piece of the capability, the team weighs building it in-house, buying it, or transferring it with a partner — including quality and regulatory impact — and records what was rejected and why.",
      },
      {
        title: "A decision and a first test",
        body: "The session ends with a one-page decision memo, a named owner for each step, and a first test of the riskiest assumption. We follow up one week later on what actually moved.",
      },
    ],
    offer: {
      title: "Capability transfer decision session (pharmaceutical manufacturing)",
      forLabel: "For",
      for: "A manufacturing site preparing to take on a new product or line through technology transfer.",
      outputLabel: "Output",
      output:
        "A one-page decision memo: build / buy / partner for each critical component, the order of first steps, the riskiest assumption and how to test it, and an owner for each item.",
      formatLabel: "Format",
      format: "One closed 90-minute working session, with short preparation beforehand.",
      status: "In preparation",
    },
    cta: "Talk to us about a capability question",
    home: "Home",
    email: "Email",
    whatsapp: "WhatsApp",
  },
  ar: {
    name: "ورش بناء القدرة",
    promise:
      "جلسات عمل، مش محاضرات: بنقعد مع فريق المؤسسة على سؤال قدرة واحد، ونطلع بقرار واضح — نبني إيه، نشتري إيه، ننقل إيه مع شريك، وبأي ترتيب.",
    audience:
      "قيادات وفرق تشغيل في مؤسسات محتاجة قدرة جديدة — وبنبدأ بالتصنيع الدوائي: نقل التقنية، التدريب، الجودة وGMP، وسلسلة التوريد.",
    how: "كيف نعمل",
    blocks: [
      {
        title: "سؤال قدرة واحد",
        body: "كل جلسة بتبدأ من سؤال واحد المؤسسة عايشاه فعلًا: نقدر نعمل حاجة محددة نقدر نشوفها، ومش قادرين عليها النهارده؟ لو السؤال لسه مش حقيقي، الجلسة ما بتتعملش.",
      },
      {
        title: "الواقع قبل الخيارات",
        body: "الفريق بيجيب اللي موجود، واللي ناقص، وعارف منين. بنفصل الدليل عن الرأي وعن الافتراض قبل ما حد يقترح حل.",
      },
      {
        title: "نبني، نشتري، ولا ننقل مع شريك",
        body: "لكل جزء حرج من القدرة، الفريق بيوزن: نبنيه جوه، نشتريه جاهز، ولا ننقله مع شريك — ومعاه أثره على الجودة والاشتراطات — وبيكتب اللي اترفض وليه.",
      },
      {
        title: "قرار وأول اختبار",
        body: "الجلسة بتخلص بمذكرة قرار من صفحة واحدة، ومالك لكل خطوة، وأول اختبار لأصعب فرضية. وبعد أسبوع بنراجع إيه اللي اتحرك فعلًا.",
      },
    ],
    offer: {
      title: "جلسة قرار نقل القدرة — تصنيع دوائي",
      forLabel: "لمن",
      for: "مصنع بيستعد يستلم مستحضر أو خط إنتاج جديد عن طريق نقل تقنية.",
      outputLabel: "المخرج",
      output:
        "مذكرة قرار من صفحة واحدة: نبني / نشتري / ننقل لكل مكوّن حرج، ترتيب أول الخطوات، أصعب فرضية وإزاي نختبرها، ومالك لكل بند.",
      formatLabel: "الصيغة",
      format: "جلسة عمل مغلقة 90 دقيقة، مع تحضير قصير قبلها.",
      status: "قيد التحضير",
    },
    cta: "كلّمنا عن سؤال قدرة عندك",
    home: "الرئيسية",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب",
  },
} as const;

export function workshopSection(locale: Locale) {
  return copy[locale];
}

/** Verified depth for the newest signals and for the weekly picks that sit outside that eight. */

const oecd = {
  href: "https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/02/the-agentic-ai-landscape-and-its-conceptual-foundations_a9d4b451/396cf758-en.pdf",
  label: { en: "OECD — The agentic AI landscape (PDF)", ar: "منظمة التعاون والتنمية — مشهد الذكاء الوكيل" },
};
const nist = {
  href: "https://www.nist.gov/itl/ai-risk-management-framework",
  label: { en: "NIST — AI Risk Management Framework", ar: "المعهد الوطني للمعايير — إطار إدارة المخاطر" },
};
const nistNews = {
  href: "https://www.nist.gov/news-events/news/2023/01/nist-risk-management-framework-aims-improve-trustworthiness-artificial",
  label: { en: "NIST — framework announcement, January 2023", ar: "المعهد الوطني للمعايير — إعلان الإطار، يناير 2023" },
};
const iea = {
  href: "https://www.iea.org/reports/electricity-grids-and-secure-energy-transitions/executive-summary",
  label: { en: "IEA — Electricity grids, executive summary", ar: "وكالة الطاقة — شبكات الكهرباء، الملخص التنفيذي" },
};
const ieaReport = {
  href: "https://www.iea.org/reports/electricity-grids-and-secure-energy-transitions",
  label: { en: "IEA — Electricity Grids and Secure Energy Transitions", ar: "وكالة الطاقة — شبكات الكهرباء وانتقالات الطاقة الآمنة" },
};
const doe = {
  href: "https://www.energy.gov/oe/office-electricity",
  label: { en: "U.S. Department of Energy — Office of Electricity", ar: "وزارة الطاقة الأمريكية — مكتب الكهرباء" },
};
const easa = {
  href: "https://www.easa.europa.eu/en/domains/civil-drones",
  label: { en: "EASA — Drones and air mobility", ar: "سلامة الطيران الأوروبية — الدرونات" },
};
const faa = {
  href: "https://www.faa.gov/uas",
  label: { en: "FAA — Unmanned aircraft systems", ar: "الطيران الفدرالي الأمريكي — الأنظمة غير المأهولة" },
};
const remoteId = {
  href: "https://www.faa.gov/uas/getting_started/remote_id",
  label: { en: "FAA — Remote identification", ar: "الطيران الفدرالي الأمريكي — التعريف عن بعد" },
};
const cisa = {
  href: "https://www.cisa.gov/resources-tools/resources/suspicious-unmanned-aircraft-system-activity-guidance",
  label: { en: "CISA — Suspicious drone activity", ar: "الأمن السيبراني الأمريكي — نشاط درون مريب" },
};

export const signalDepth = {
  "suriname-granmorgu-offshore-output-2028-2026": {
    seriesId: null,
    figures: {
      en: [
        "Reuters reported a $12 billion offshore project, with first output aimed at mid-2028.",
        "Wood Mackenzie in 2024 estimated more than 2.4 billion barrels of oil and liquids and more than 12.5 trillion cubic feet of gas.",
        "TotalEnergies’ chairman said about 50 percent of planned investment has been spent. Block 58 covers 1.4 million acres, with four exploratory wells slated next year.",
      ],
      ar: [
        "رويترز نقلت مشروعًا بحريًا بـ12 مليار دولار، وأول إنتاج مستهدف منتصف 2028.",
        "وود ماكنزي في 2024 قدّرت أكثر من 2.4 مليار برميل من النفط والسوائل وأكثر من 12.5 تريليون قدم مكعب من الغاز.",
        "رئيس توتال إنرجيز قال إن نحو 50 في المئة من الاستثمار المخطط أُنفق. البلوك 58 مساحته 1.4 مليون فدان، وأربعة آبار استكشافية مقررة العام المقبل.",
      ],
    },
    questions: {
      en: [
        "What changes in our fiscal or offtake plans if first oil slips past mid-2028?",
        "Who on our side can explain Block 58’s dependence on the Guyana neighbourhood without a company slide?",
        "Which contract assumes a second floating unit that the state oil company has only said it dreams of?",
      ],
      ar: [
        "إيه اللي يتغير في ماليتنا أو عقود الشراء لو أول نفط تأخر عن منتصف 2028؟",
        "مين عندنا يشرح اعتماد البلوك 58 على جوار غيانا من غير شريحة شركة؟",
        "أي عقد عندنا يفترض وحدة عائمة ثانية لم تقل شركة النفط الحكومية إلا إنها تحلم بها؟",
      ],
    },
    deeper: [],
  },
  "china-ai-supply-demand-imbalance-policy-2026": {
    seriesId: null,
    figures: { en: [], ar: [] },
    questions: {
      en: [
        "If wider AI use deepens a supply-heavy economy, which of our exports or inputs sit on that surplus?",
        "Huang asked for a higher share of household income and for central borrowing to repair local balance sheets. Which of those is our actual exposure?",
        "What would we watch, monthly, to tell an export boom from a recovery in domestic demand?",
      ],
      ar: [
        "لو اتساع الذكاء الاصطناعي عمّق اقتصادًا عرضه أثقل من طلبه، أي صادراتنا أو مدخلاتنا تقف على هذا الفائض؟",
        "هوانغ طلب رفع نصيب دخل الأسر واقتراضًا مركزيًا لإصلاح موازنات المحليات. أيهما يمسّنا فعلًا؟",
        "إيه اللي نراقبه كل شهر لنفرّق طفرة تصدير من تعافٍ في الطلب الداخلي؟",
      ],
    },
    deeper: [oecd, nist, nistNews],
  },
  "bolivia-diesel-subsidy-unified-pricing-2026": {
    seriesId: null,
    figures: {
      en: [
        "President Paz said the government spends approximately $55 million a week on diesel subsidies, and that Bolivia imports roughly 90 percent of its diesel.",
        "The dual price being replaced charged high-volume users 18 bolivianos ($2.60) a litre and others a subsidised 9.80 bolivianos.",
      ],
      ar: [
        "الرئيس باز قال إن الحكومة تنفق نحو 55 مليون دولار أسبوعيًا على دعم الديزل، وإن بوليفيا تستورد نحو 90 في المئة من ديزلها.",
        "السعر المزدوج الذي يُلغى كان يحاسب كثيفي الاستهلاك 18 بوليفيانو (2.60 دولار) للتر والباقين 9.80 بوليفيانو مدعومًا.",
      ],
    },
    questions: {
      en: [
        "Where do our fuel prices still use two rates, and who captures the gap?",
        "If the import share is anywhere near 90 percent, what is our week of subsidy in cash, not in principle?",
        "Which households receive the cash transfer, and which only meet the new pump price?",
      ],
      ar: [
        "فين أسعار الوقود عندنا لسه بنظامين، ومين بياخد الفرق؟",
        "لو حصة الاستيراد قربت من 90 في المئة، أسبوع الدعم عندنا كام نقدًا لا مبدأً؟",
        "أي بيوت تاخد التحويل النقدي، وأي بيوت تلاقي سعر المضخة الجديد بس؟",
      ],
    },
    deeper: [],
  },
  "us-taiwan-anduril-autonomous-arms-delay-2026": {
    seriesId: "drones-airspace",
    figures: {
      en: [
        "Reuters reported a $14 billion U.S. arms package for Taiwan awaiting presidential approval for months.",
        "Taiwan uses Anduril’s Altius drone. Last year it unveiled the Barracuda-500, an autonomous low-cost cruise missile made with Anduril.",
        "China sanctioned Anduril’s founder in December for selling weapons to Taiwan.",
      ],
      ar: [
        "رويترز نقلت حزمة سلاح أمريكية لتايوان بـ14 مليار دولار تنتظر موافقة رئاسية منذ أشهر.",
        "تايوان تستخدم درون ألتيوس من أندوريل. والعام الماضي كشفت باراكودا-500، صاروخًا جوّالًا منخفض الكلفة صنعته مع أندوريل.",
        "الصين عاقبت مؤسس أندوريل في ديسمبر لبيعه أسلحة لتايوان.",
      ],
    },
    questions: {
      en: [
        "Which of our orders depends on a foreign approval that can be held as a negotiating chip?",
        "Do we know whether we are buying a surveillance drone or a cruise missile, in the words of the contract?",
        "If the licence stalls, what else in the relationship stalls with it, as Luckey said progress elsewhere stops?",
      ],
      ar: [
        "أي طلبياتنا معلقة بموافقة أجنبية يمكن حبسها كورقة تفاوض؟",
        "نعرف إحنا بنشتري درون مراقبة ولا صاروخ جوّال، بنص العقد؟",
        "لو الرخصة وقفت، إيه تاني في العلاقة يقف معاها، زي ما لوكي قال إن التقدم في جهات أخرى يتوقف؟",
      ],
    },
    deeper: [faa, cisa, easa],
  },
  "indonesia-forest-fire-class-action-2026": {
    seriesId: null,
    figures: {
      en: [
        "Reuters reported a first hearing set for 7 October at the Pontianak court.",
        "Indonesia is battling its most intense wildfires in 11 years, and the government has warned they could continue until November.",
        "A 2016 lawsuit over the 2015 fires was overturned when the Supreme Court granted a judicial review in 2022, Reuters said, citing media reports.",
      ],
      ar: [
        "رويترز نقلت أن أول جلسة محددة في 7 أكتوبر أمام محكمة بونتياناك.",
        "إندونيسيا تواجه أشد حرائقها منذ 11 عامًا، والحكومة حذرت أنها قد تستمر حتى نوفمبر.",
        "دعوى 2016 عن حرائق 2015 نُقضت حين قبلت المحكمة العليا مراجعة قضائية في 2022، كما قالت رويترز نقلًا عن تقارير صحفية.",
      ],
    },
    questions: {
      en: [
        "Who on our side is reading the Pontianak filing, not only the headline?",
        "What is our exposure if fires of this intensity run through November?",
        "A similar case was overturned in 2022. What does counsel say that implies for treating a lawsuit as the accountability tool?",
      ],
      ar: [
        "مين عندنا بيقرأ دعوى بونتياناك، مش العنوان بس؟",
        "إيه تعرضنا لو حرائق بهذه الشدة استمرت حتى نوفمبر؟",
        "قضية شبيهة نُقضت في 2022. المستشار يقول إن هذا يعني إيه لو اعتبرنا الدعوى أداة المساءلة؟",
      ],
    },
    deeper: [],
  },
  "luxembourg-airport-drone-shutdown-2026": {
    seriesId: "drones-airspace",
    figures: {
      en: [
        "Nineteen flights were diverted. Operations resumed at about 1:20 a.m. local time, 2320 GMT on Friday.",
      ],
      ar: [
        "حُوّلت تسع عشرة رحلة. وعاد التشغيل حوالى الواحدة وعشرين دقيقة بعد منتصف الليل بالتوقيت المحلي.",
      ],
    },
    questions: {
      en: [
        "Who has authority to stop our runway, and who is told before the public statement?",
        "What will we say in the morning if, as in Luxembourg, there is still no conclusion?",
        "Which of our flights have a diversion airport that can actually take them at that hour?",
      ],
      ar: [
        "مين له سلطة يوقف مدرجنا، ومين يُبلَّغ قبل البيان؟",
        "هنقول إيه الصبح لو، زي لوكسمبورغ، لسه ما فيش استنتاج؟",
        "أي رحلاتنا لها مطار تحويل يستوعبها فعلًا في الساعة دي؟",
      ],
    },
    deeper: [easa, remoteId, cisa],
  },
  "anthropic-new-model-safety-competition-ipo-2026": {
    seriesId: "agentic-ai",
    figures: {
      en: [
        "Reuters said Dario Amodei’s 12 September essay was 3,800 words. OpenAI released GPT-6 Astra on 3 September.",
        "Ramp figures cited by Reuters: Astra about 13 percent of tracked enterprise AI spending, Claude Fable about 8 percent.",
        "Reuters reported Anthropic’s annualized revenue run rate topped $65 billion by the end of July, from about $9 billion at the end of 2025, with a 2028 projection of roughly $190 billion to $200 billion. OpenAI’s run rate passed $40 billion in July.",
      ],
      ar: [
        "رويترز قالت إن مقال داريو أمودي في 12 سبتمبر كان 3800 كلمة. وأوبن إيه آي أصدرت GPT-6 Astra في 3 سبتمبر.",
        "أرقام رامب التي نقلتها رويترز: أسترا نحو 13 في المئة من إنفاق المؤسسات المرصود، وكلود فايبل نحو 8 في المئة.",
        "رويترز نقلت أن معدل إيراد أنثروبيك السنوي تجاوز 65 مليار دولار نهاية يوليو، من نحو 9 مليارات نهاية 2025، مع توقع 2028 بين 190 و200 مليار تقريبًا. ومعدل أوبن إيه آي تجاوز 40 مليارًا في يوليو.",
      ],
    },
    questions: {
      en: [
        "Where do our contracts assume a vendor will slow down if its chief executive says so?",
        "Which figure in the Reuters account is a measurement, and which is a projection we must not budget on?",
        "If a lab’s model can be described as a swarm that outruns control, who on our side is allowed to connect it to our systems?",
      ],
      ar: [
        "فين عقودنا تفترض أن البائع سيبطئ إذا قال رئيسه ذلك؟",
        "أي رقم في رواية رويترز قياس، وأي رقم توقع لا نضع عليه ميزانية؟",
        "لو وُصف نموذج معمل كسرب يسبق السيطرة، مين عندنا مسموح له يوصله بأنظمتنا؟",
      ],
    },
    deeper: [oecd, nist, nistNews],
  },
  "google-gemini-autonomous-cyber-breakout-2026": {
    seriesId: "agentic-ai",
    figures: {
      en: [
        "Reuters reported that Gemini reached three websites during a cybersecurity test in May.",
        "An Irregular spokesperson told Reuters that relevant labs were notified in late July.",
      ],
      ar: [
        "رويترز نقلت أن جيميناي بلغ ثلاثة مواقع أثناء اختبار أمن سيبراني في مايو.",
        "متحدث باسم إيريغيولار قال لرويترز إن المعامل المعنية أُبلغت أواخر يوليو.",
      ],
    },
    questions: {
      en: [
        "Which of our tests allow a model to use the open internet and guess credentials?",
        "If three outside parties were affected, who in our chain tells them, and how fast?",
        "What change in the test, not in the press line, stops the next model from continuing?",
      ],
      ar: [
        "أي اختباراتنا تسمح لنموذج باستخدام الإنترنت المفتوح وتخمين بيانات الدخول؟",
        "لو ثلاث جهات خارجية تضررت، مين في سلسلتنا يبلغهم، وبسرعة قد إيه؟",
        "أي تغيير في الاختبار، لا في بيان الصحافة، يمنع النموذج التالي من الاستمرار؟",
      ],
    },
    deeper: [oecd, nistNews, nist],
  },
  "cuba-national-grid-total-collapse-2026": {
    seriesId: "grid-resilience",
    figures: {
      en: [
        "Authorities told Reuters the collapse began with a high-voltage failure in central Cuba around 2 p.m. local time.",
        "It was the latest of at least six partial or total collapses since January, after three collapses in July. Rolling blackouts had spanned 30 hours or more across most of the country.",
      ],
      ar: [
        "السلطات قالت لرويترز إن الانهيار بدأ بعطل جهد عالٍ وسط كوبا حوالى الثانية بعد الظهر بالتوقيت المحلي.",
        "هو الأخير في ستة انهيارات جزئية أو كلية على الأقل منذ يناير، بعد ثلاثة في يوليو. والانقطاعات المتناوبة امتدت 30 ساعة أو أكثر في معظم البلاد.",
      ],
    },
    questions: {
      en: [
        "If one transmission corridor fails at 2 p.m., what share of the capital is back by night, and who counts it?",
        "Hospitals were lit before homes. Is that our written order, or an accident of the network?",
        "Which fuel and spare-part assumption fails on the fourth collapse, not the first?",
      ],
      ar: [
        "لو ممر نقل سقط الساعة اتنين الظهر، أي حصة من العاصمة ترجع بالليل، ومين يعدّها؟",
        "المستشفيات أضاءت قبل البيوت. ده ترتيبنا المكتوب ولا صدفة الشبكة؟",
        "أي فرض وقود وقطع غيار يسقط عند الانهيار الرابع لا الأول؟",
      ],
    },
    deeper: [iea, ieaReport, doe],
  },
  "nasa-spacex-crew-contract-extension-2030-2026": {
    seriesId: null,
    figures: {
      en: [
        "NASA gave SpaceX a $946 million contract for three more astronaut missions, extending crewed flights through 2030.",
        "Reuters reported the contract now covers 17 flights and is worth $5.92 billion.",
        "NASA approved SpaceX for astronaut flights in November 2020. On Boeing’s 2024 crewed test, a planned 10-day mission became more than nine months before the crew came home on a SpaceX Dragon.",
      ],
      ar: [
        "ناسا أعطت سبيس إكس عقدًا بـ946 مليون دولار لثلاث مهمات رواد إضافية، لتمتد الرحلات المأهولة حتى 2030.",
        "رويترز نقلت أن العقد صار يغطي 17 رحلة وقيمته 5.92 مليار دولار.",
        "ناسا اعتمدت سبيس إكس لرحلات الرواد في نوفمبر 2020. وفي اختبار بوينغ المأهول 2024 صارت مهمة مخططة لعشرة أيام أكثر من تسعة أشهر قبل عودة الطاقم على دراجون.",
      ],
    },
    questions: {
      en: [
        "If one crew provider is late, who is the second path, and is it actually flying?",
        "Which of our programmes prices a 10-day mission and has no plan for nine months?",
        "What does the contract cover on the ground and as a lifeboat, not only at launch?",
      ],
      ar: [
        "لو مقدم الطاقم الوحيد اتأخر، مين الطريق الثاني، وهل يطير فعلًا؟",
        "أي برامجنا يسعّر مهمة عشرة أيام وما عندوش خطة لتسعة أشهر؟",
        "العقد يغطي إيه على الأرض وكقارب نجاة، لا عند الإطلاق فقط؟",
      ],
    },
    deeper: [],
  },
};

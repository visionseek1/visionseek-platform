/**
 * «الجملة نفسها تكلّف أكثر حين تكتبها بالعربية» — الإصدار 1.0.
 * النص كما ورد في المصدر المعتمد (draft-ar-v1.0.md و draft-en-v1.0.md). لا اختراع لمحتوى ولا أرقام ولا مصادر.
 * الحقول ثنائية اللغة على شكل {ar, en}. التوقيع بلا لقب دكتوراه: المؤسس وكبير مهندسي القدرات.
 */
export type Bi = {ar: string; en: string};

export type ReportSource = {
  id: number;
  tier: string;
  publisher: string;
  date: string;
  url: string;
  title: string;
};

export type ReportBlock =
  | {kind: "prose"; text: Bi}
  | {kind: "list"; items: Bi[]}
  | {kind: "table"; columns: Bi[]; rows: Bi[][]; note?: Bi};

export type ReportSection = {heading: Bi; blocks: ReportBlock[]};

export const paper = {
  slug: "arabic-token-tax",
  title: {
    ar: "الجملة نفسها تكلّف أكثر حين تكتبها بالعربية",
    en: "The Same Sentence Costs More When You Write It in Arabic",
  },
  summary: {
    ar: "قسنا 1012 جملة متطابقة المعنى بالعربية والإنجليزية والكورية على قواميس 24 نموذجًا للذكاء الاصطناعي. أشهر النماذج العالمية تحتاج إلى رموز عربية أكثر بنسبة 38% إلى 65% للمعنى نفسه، وطبقة البحث في OpenAI تحتاج إلى ثلاثة أضعاف. والنماذج الكورية السيادية القادمة إلى الخليج تقرأ الكورية بسعر الإنجليزية، وتقرأ العربية بما يصل إلى 3.2 أضعاف. الرمز هو وحدة الفاتورة، فمن لا يقيسه يدفع الفرق دون أن يراه.",
    en: "We ran 1,012 sentences with identical meaning in Arabic, English and Korean through the tokenizers of 24 AI models. The best-known global models need 38% to 65% more tokens for the same meaning in Arabic, and the tokenizer behind OpenAI's embeddings needs three times as many. The Korean sovereign models now heading to the Gulf read Korean at the price of English, but read Arabic at up to 3.2 times. The token is the billing unit: whoever does not measure it pays the difference without seeing it.",
  },
  cardSummary: {
    ar: "قياس VisionSeek على 1012 جملة متوازية: العربية تحتاج رموزًا أكثر بنسبة 38% إلى 65% في أشهر النماذج العالمية، وحتى 3.2 أضعاف في نماذج كورية سيادية تدخل سوق الخليج. خمس خطوات قبل توقيع أي عقد.",
    en: "VisionSeek measurement on 1,012 parallel sentences: Arabic needs 38% to 65% more tokens on the best-known global models, and up to 3.2 times more on Korean sovereign models entering the Gulf market. Five steps before signing any contract.",
  },
  question: {
    ar: "حين تخدم المؤسسة الناس بالعربية عبر الذكاء الاصطناعي، كم تدفع زيادة لأن لغتها عربية، وكيف تضع ذلك في المناقصة؟",
    en: "When an institution serves people in Arabic through AI, how much extra does it pay because its language is Arabic, and how should it write that into the tender?",
  },
  answer: {
    ar: "في النماذج غير العربية تدفع من 1.2 إلى 3.7 أضعاف ما يدفعه نص إنجليزي بالمعنى نفسه، بحسب قاموس النموذج. والحل أن تقيس على نصوصها قبل الشراء، وأن تسعّر بالصفحة العربية لا بالرمز، وأن تفحص طبقة البحث والقاموس قبل أي شراكة.",
    en: "On non-Arabic models, between 1.2 and 3.7 times what an English text with the same meaning costs, depending on the model's tokenizer. The fix is to measure on its own texts before buying, to price per Arabic page rather than per token, and to inspect the search layer and the tokenizer before any partnership.",
  },
  publishedAt: "2026-10-28T07:45:00+09:00",
  date: "2026-10-28",
  dateLabel: {
    ar: "28 أكتوبر 2026",
    en: "28 October 2026",
  },
  versionLabel: "1.0",
  label: {
    ar: "مختبر VisionSeek · تقارير · الإصدار 1.0",
    en: "VisionSeek Lab · Reports · Version 1.0",
  },
  tag: "البنية والتكلفة",
  author: {
    ar: "أحمد عبدالعليم، المؤسس وكبير مهندسي القدرات",
    en: "Ahmed Abdelalim, Founder & Chief Capability Architect",
  },
  attribution: {
    ar: "مبني على بحث أجرته VisionSeek",
    en: "Based on research by VisionSeek",
  },
  pdfAr: "/reports/reports/arabic-token-tax-ar.pdf",
  cover: "/reports/reports/arabic-token-tax-cover.jpg",
  ogImage: "/reports/reports/arabic-token-tax.og.png",
  coverWidth: 1600,
  coverHeight: 1200,
  ogWidth: 1200,
  ogHeight: 630,
  heroAlt: "تكوين هندسي داكن لشريطين متوازيين، أحدهما قطع ليمونية قليلة طويلة والآخر قطع كثيرة صغيرة متكسّرة، فوق نقش عربي خافت",
  imageCredit: "رسم توضيحي: VisionSeek (مولَّد)",
  methodologyHref: "/reports/reports/methodology",
  readingMinutes: 7,
  corrections: [],
  stats: [
    {
      big: "3.03×",
      text: {
        ar: "رموز عربية مقابل كل رمز إنجليزي في قاموس cl100k_base الذي توصي به OpenAI لنماذج التضمين text-embedding-3 (قياس VisionSeek)",
        en: "Arabic tokens for every English token in cl100k_base, the encoding OpenAI specifies for its text-embedding-3 models (VisionSeek measurement)",
      },
    },
    {
      big: "1.38×",
      text: {
        ar: "النسبة نفسها في قاموس o200k_base الخاص بنموذج GPT-4o، أي أن الشركة نفسها تحاسب العربية بسعرين",
        en: "the same ratio in o200k_base, the GPT-4o encoding: one vendor, two Arabic price tags",
      },
    },
    {
      big: "3.21×",
      text: {
        ar: "في قاموس نموذج A.X K1 الكوري السيادي (SKT)، الذي يقرأ الكورية بنسبة 0.93 فقط",
        en: "on the tokenizer of SKT's Korean sovereign model A.X K1, which reads Korean at a ratio of just 0.93",
      },
    },
  ],
  sources: [
    {
      id: 1,
      tier: "أ",
      publisher: "NLLB Team (Meta AI)",
      date: "2022",
      title: "No Language Left Behind — FLORES-200 evaluation benchmark (devtest split)",
      url: "https://arxiv.org/abs/2207.04672",
    },
    {
      id: 2,
      tier: "أ",
      publisher: "OpenAI Cookbook",
      date: "",
      title: "How to count tokens with tiktoken — encodings by model",
      url: "https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken",
    },
    {
      id: 3,
      tier: "أ",
      publisher: "OpenAI API Docs",
      date: "",
      title: "Vector embeddings guide (\"use the cl100k_base encoding\")",
      url: "https://developers.openai.com/api/docs/guides/embeddings",
    },
    {
      id: 4,
      tier: "ج (ورقة علمية محكّمة)",
      publisher: "Petrov, La Malfa, Torr, Bibi — NeurIPS 2023",
      date: "2023",
      title: "Language Model Tokenizers Introduce Unfairness Between Languages",
      url: "https://proceedings.neurips.cc/paper_files/paper/2023/file/74bb24dca8334adce292883b4b651eda-Paper-Conference.pdf",
    },
    {
      id: 5,
      tier: "ج (ورقة علمية)",
      publisher: "Sengupta et al. — Inception, MBZUAI, Cerebras",
      date: "2023",
      title: "Jais and Jais-chat: Arabic-Centric Foundation and Instruction-Tuned Open Generative LLMs",
      url: "https://arxiv.org/abs/2308.16149",
    },
    {
      id: 6,
      tier: "ج (ورقة علمية)",
      publisher: "Bari et al. — SDAIA National Center for AI",
      date: "2024",
      title: "ALLaM: Large Language Models for Arabic and English",
      url: "https://arxiv.org/abs/2407.15390",
    },
    {
      id: 7,
      tier: "ج (ورقة علمية محكّمة)",
      publisher: "TII — ArabicNLP 2025 (ACL Anthology)",
      date: "2025",
      title: "Adapting Falcon3-7B Language Model for Arabic: Methods, Challenges, and Outcomes",
      url: "https://doi.org/10.18653/v1/2025.arabicnlp-main.1",
    },
    {
      id: 8,
      tier: "ب",
      publisher: "Technology Innovation Institute (TII)",
      date: "2025-05-21",
      title: "TII launches Falcon Arabic and Falcon-H1",
      url: "https://www.tii.ae/news/middle-easts-leading-ai-powerhouse-tii-launches-two-new-ai-models-falcon-arabic-first-arabic",
    },
    {
      id: 9,
      tier: "ب",
      publisher: "HUMAIN",
      date: "2025-08-25",
      title: "HUMAIN Launches HUMAIN Chat, Powered by ALLAM 34B",
      url: "https://www.humain.com/en/news/humain-chat-launch",
    },
    {
      id: 10,
      tier: "أ",
      publisher: "QCRI, Hamad Bin Khalifa University (model card)",
      date: "2025",
      title: "Fanar-1-9B-Instruct",
      url: "https://huggingface.co/QCRI/Fanar-1-9B-Instruct",
    },
    {
      id: 11,
      tier: "أ",
      publisher: "Ministry of Science and ICT, Korea",
      date: "2026-01-15",
      title: "Phase 1 evaluation results — Sovereign AI Foundation Model project",
      url: "https://www.msit.go.kr/eng/bbs/view.do?bbsSeqNo=42&mId=4&mPid=2&nttSeqNo=1212&sCode=eng",
    },
    {
      id: 12,
      tier: "أ",
      publisher: "LG AI Research (model card)",
      date: "2025-12",
      title: "K-EXAONE-236B-A23B",
      url: "https://huggingface.co/LGAI-EXAONE/K-EXAONE-236B-A23B",
    },
    {
      id: 13,
      tier: "أ",
      publisher: "SK Telecom (model card)",
      date: "2025-12",
      title: "A.X K1",
      url: "https://huggingface.co/skt/A.X-K1",
    },
    {
      id: 14,
      tier: "أ",
      publisher: "Upstage (model card)",
      date: "2025-12",
      title: "Solar-Open-100B",
      url: "https://huggingface.co/upstage/Solar-Open-100B",
    },
    {
      id: 15,
      tier: "أ",
      publisher: "NAVER Cloud (model card)",
      date: "2025-12",
      title: "HyperCLOVAX-SEED-Think-32B",
      url: "https://huggingface.co/naver-hyperclovax/HyperCLOVAX-SEED-Think-32B",
    },
    {
      id: 16,
      tier: "ب",
      publisher: "Saudi Press Agency (SPA)",
      date: "2026-01-30",
      title: "KACST Signs Strategic Partnerships to Advance AI, Urban and Industrial Innovation (NAVER Cloud Arabic LLM)",
      url: "https://www.spa.gov.sa/en/N2501232",
    },
    {
      id: 17,
      tier: "د (صحافة)",
      publisher: "The Asia Business Daily",
      date: "2026-09-02",
      title: "Seven Korean AI Companies Complete Full-Stack AI Proof of Concept at Saudi Aramco",
      url: "https://www.asiae.co.kr/en/article/2026090216572831051",
    },
    {
      id: 18,
      tier: "د (صحافة)",
      publisher: "Seoul Economic Daily",
      date: "2026-09-23",
      title: "LG Pushes Exaone AI Exports to Central Asia, Middle East",
      url: "https://en.sedaily.com/finance/2026/09/23/lg-pushes-exaone-exports-to-central-asia-middle-east",
    },
  ],
  sections: [
    {
      heading: {
        ar: "الملخص التنفيذي",
        en: "Executive Summary",
      },
      blocks: [
        {
          kind: "prose",
          text: {
            ar: "**الجواب:** المؤسسة العربية التي تشغّل الذكاء الاصطناعي بلغتها تدفع زيادة لا تظهر في العرض المالي. فالنماذج لا تقرأ الكلمات، بل تقطّعها إلى «رموز» (tokens) بحسب قاموس داخلي، والرمز هو وحدة الفاتورة وحدود الذاكرة معًا. قسنا 1012 جملة متطابقة المعنى من مجموعة FLORES-200 المفتوحة [1] على قواميس 24 نموذجًا (21 قاموسًا مختلفًا)، فوجدنا أن الجملة العربية تحتاج في النماذج غير العربية من 1.2 إلى 3.7 أضعاف رموز نظيرتها الإنجليزية، بحسب القاموس، بينما تقترب القواميس العربية من التعادل. لذلك يجب أن تُقاس هذه الزيادة على نصوص المؤسسة نفسها قبل الشراء، وأن تُكتب في المناقصة بوحدة عربية مفهومة، لا بالرمز.",
            en: "**The answer:** An Arab institution that runs AI in its own language pays a premium that never appears in the price offer. Models do not read words; they cut them into \"tokens\" according to an internal vocabulary (the tokenizer), and the token is both the billing unit and the limit of the model's memory. We ran 1,012 sentences with identical meaning from the open FLORES-200 set [1] through the tokenizers of 24 models (21 distinct tokenizers), and found that on non-Arabic models an Arabic sentence needs 1.2 to 3.7 times as many tokens as its English equivalent, depending on the tokenizer, while Arabic tokenizers come close to parity. This premium must therefore be measured on the institution's own texts before buying, and written into the tender in an Arabic unit that people understand, not in tokens.",
          },
        },
        {
          kind: "prose",
          text: {
            ar: "**ثلاث رسائل رئيسية:**",
            en: "**Three key messages:**",
          },
        },
        {
          kind: "list",
          items: [
            {
              ar: "**الزيادة حقيقية حتى في أفضل النماذج العالمية.** في قاموس o200k_base الذي تربطه OpenAI بنموذج GPT-4o [2] تحتاج العربية رموزًا أكثر بنسبة 38%. وفي Llama وQwen وDeepSeek تتراوح الزيادة بين 59% و65% (قياس VisionSeek). والظاهرة موثّقة علميًا منذ 2023 [4].",
              en: "**The premium is real even on the best global models.** In o200k_base, the encoding OpenAI maps to GPT-4o [2], Arabic needs 38% more tokens. In Llama, Qwen and DeepSeek the premium ranges between 59% and 65% (VisionSeek measurement). The phenomenon has been documented in the research literature since 2023 [4].",
            },
            {
              ar: "**أغلى نقطة قد تكون في طبقة لا يراها أحد.** توصي OpenAI باستخدام قاموس cl100k_base لنماذج التضمين text-embedding-3 [3]، وهي الطبقة التي تبني البحث في وثائق المؤسسة. وفي هذا القاموس تحتاج العربية 3.03 أضعاف رموز الإنجليزية (قياس VisionSeek). أي أن المورّد نفسه يحاسب العربية بسعرين.",
              en: "**The most expensive point may sit in a layer nobody sees.** OpenAI specifies the cl100k_base encoding for its text-embedding-3 models [3], the layer that powers search across an institution's documents. In that tokenizer Arabic needs 3.03 times as many tokens as English (VisionSeek measurement). The same vendor, in other words, charges Arabic at two prices.",
            },
            {
              ar: "**الشريك الكوري يقرأ لغته جيدًا، ولغتنا أقل.** قواميس أحدث النماذج المفتوحة للشركات الثلاث التي تأهلت في برنامج النموذج السيادي الكوري [11] تقرأ الكورية بسعر الإنجليزية تقريبًا (0.93 إلى 1.10)، لكنها تقرأ العربية بنسبة 1.70 إلى 3.21. وهذه الشركات تدخل سوق الخليج الآن [16][17][18].",
              en: "**The Korean partner reads its own language well, and ours less so.** The tokenizers of the latest open models from the three companies that advanced in Korea's sovereign foundation-model programme [11] read Korean at roughly the price of English (0.93 to 1.10), but read Arabic at 1.70 to 3.21. These companies are entering the Gulf market now [16][17][18].",
            },
          ],
        },
      ],
    },
    {
      heading: {
        ar: "الموقف والتعقيد والسؤال",
        en: "Situation, Complication, Question",
      },
      blocks: [
        {
          kind: "prose",
          text: {
            ar: "**الموقف.** استثمرت المنطقة في نماذج عربية خاصة بها. أطلقت HUMAIN تطبيقها المبني على ALLaM 34B في أغسطس 2025 [9]، وأطلق معهد الابتكار التكنولوجي في أبوظبي Falcon Arabic في مايو 2025 [8]، وطوّر معهد قطر لبحوث الحوسبة نموذج Fanar [10]. وفي الوقت نفسه تشتري أغلب المؤسسات خدماتها من نماذج عالمية، وبدأت شركات كورية تعرض نماذجها في الخليج: وقّعت NAVER Cloud مع مدينة الملك عبدالعزيز للعلوم والتقنية شراكة لبناء نموذج لغوي عربي في يناير 2026 [16]، وأنهى تحالف من سبع شركات كورية، منها LG AI Research وUpstage، إثبات مفهوم في أرامكو الرقمية في سبتمبر 2026 [17].",
            en: "**Situation.** The region has invested in Arabic models of its own. HUMAIN launched its app built on ALLaM 34B in August 2025 [9], Abu Dhabi's Technology Innovation Institute launched Falcon Arabic in May 2025 [8], and the Qatar Computing Research Institute developed Fanar [10]. At the same time, most institutions buy their services from global models, and Korean companies have begun offering their models in the Gulf: NAVER Cloud signed a partnership with King Abdulaziz City for Science and Technology (KACST) to build an Arabic large language model in January 2026 [16], and a consortium of seven Korean companies, including LG AI Research and Upstage, completed a proof of concept at Aramco Digital in September 2026 [17].",
          },
        },
        {
          kind: "prose",
          text: {
            ar: "**التعقيد.** الرمز ليس كلمة. القاموس الذي بُني على نصوص إنجليزية يقطّع الكلمة العربية إلى قطع صغيرة كثيرة. وتقول ورقة ALLaM إن ضعف تقطيع العربية يجعل التدريب أقل كفاءة، ويجعل النموذج «يولّد رموزًا أكثر لكل كلمة»، ويقلّص طول السياق الفعلي [6]. وتقول ورقة Jais إن التقطيع الزائد يخفض الأداء ويرفع تكلفة الحوسبة [5]. هذه زيادة تصيب ثلاثة أشياء معًا: الفاتورة، وسرعة الرد، وكمية النص التي يستطيع النموذج قراءتها مرة واحدة. ومع ذلك لا تظهر في أغلب العروض، لأن السعر يُكتب «لكل مليون رمز» دون ذكر اللغة.",
            en: "**Complication.** A token is not a word. A tokenizer built on English text cuts an Arabic word into many small pieces. The ALLaM paper says poor Arabic tokenization makes training less efficient, forces the model to \"generate more tokens per word\", and shrinks the effective context length [6]. The Jais paper says over-segmentation lowers performance and raises computational cost [5]. This premium hits three things at once: the bill, response speed, and how much text the model can read in one pass. Yet it is absent from most offers, because the price is quoted \"per million tokens\" without naming the language.",
          },
        },
        {
          kind: "prose",
          text: {
            ar: "**السؤال.** حين تخدم المؤسسة الناس بالعربية عبر الذكاء الاصطناعي، كم تدفع زيادة لأن لغتها عربية، وكيف تضع ذلك في المناقصة؟",
            en: "**Question.** When an institution serves people in Arabic through AI, how much extra does it pay because its language is Arabic, and how should it write that into the tender?",
          },
        },
        {
          kind: "prose",
          text: {
            ar: "**الجواب.** في النماذج غير العربية تدفع من 1.2 إلى 3.7 أضعاف، بحسب القاموس. والحل أن تقيس قبل أن تشتري، وأن تسعّر بوحدة عربية، وأن تفحص طبقة البحث والقاموس قبل أي شراكة.",
            en: "**Answer.** On non-Arabic models it pays 1.2 to 3.7 times as much, depending on the tokenizer. The fix is to measure before buying, to price in an Arabic unit, and to inspect the search layer and the tokenizer before any partnership.",
          },
        },
      ],
    },
    {
      heading: {
        ar: "الشكل 1: المعنى واحد، والفاتورة تتغيّر بتغيّر القاموس",
        en: "Exhibit 1: Same meaning, different bill, depending on the tokenizer",
      },
      blocks: [
        {
          kind: "table",
          columns: [
            {
              ar: "القاموس (النموذج)",
              en: "Tokenizer (model)",
            },
            {
              ar: "رموز عربية مقابل كل رمز إنجليزي",
              en: "Arabic tokens per English token",
            },
          ],
          rows: [
            [
              {
                ar: "ALLaM (هيئة البيانات والذكاء الاصطناعي)",
                en: "ALLaM (Saudi Data and AI Authority)",
              },
              {
                ar: "0.96",
                en: "0.96",
              },
            ],
            [
              {
                ar: "Jais (Inception)",
                en: "Jais (Inception)",
              },
              {
                ar: "1.01",
                en: "1.01",
              },
            ],
            [
              {
                ar: "Falcon-H1 (معهد الابتكار التكنولوجي)",
                en: "Falcon-H1 (Technology Innovation Institute)",
              },
              {
                ar: "1.19",
                en: "1.19",
              },
            ],
            [
              {
                ar: "OpenAI o200k_base (GPT-4o)",
                en: "OpenAI o200k_base (GPT-4o)",
              },
              {
                ar: "1.38",
                en: "1.38",
              },
            ],
            [
              {
                ar: "Fanar-1 (معهد قطر لبحوث الحوسبة)",
                en: "Fanar-1 (Qatar Computing Research Institute)",
              },
              {
                ar: "1.45",
                en: "1.45",
              },
            ],
            [
              {
                ar: "Gemma 3 (Google)",
                en: "Gemma 3 (Google)",
              },
              {
                ar: "1.47",
                en: "1.47",
              },
            ],
            [
              {
                ar: "Llama 3.1 (Meta)",
                en: "Llama 3.1 (Meta)",
              },
              {
                ar: "1.65",
                en: "1.65",
              },
            ],
            [
              {
                ar: "OpenAI cl100k_base (نماذج التضمين text-embedding-3)",
                en: "OpenAI cl100k_base (text-embedding-3 models)",
              },
              {
                ar: "3.03",
                en: "3.03",
              },
            ],
            [
              {
                ar: "Falcon3 (قبل التعريب)",
                en: "Falcon3 (before Arabic adaptation)",
              },
              {
                ar: "3.34",
                en: "3.34",
              },
            ],
          ],
          note: {
            ar: "*المصدر: قياس VisionSeek في 28 أكتوبر 2026 على 1012 جملة متوازية من FLORES-200 devtest [1]، بقواميس النماذج المنشورة رسميًا. النسبة = مجموع الرموز العربية ÷ مجموع الرموز الإنجليزية للجمل نفسها. نسب Qwen وDeepSeek وLlama 4 بين 1.59 و1.63.*",
            en: "*Source: VisionSeek measurement on 28 October 2026 on 1,012 parallel sentences from FLORES-200 devtest [1], using the officially published model tokenizers. Ratio = total Arabic tokens ÷ total English tokens for the same sentences. Qwen, DeepSeek and Llama 4 sit between 1.59 and 1.63.*",
          },
        },
      ],
    },
    {
      heading: {
        ar: "الشكل 2: النماذج الكورية السيادية تقرأ الكورية بسعر الإنجليزية، والعربية بضعفين أو ثلاثة",
        en: "Exhibit 2: Korean sovereign models read Korean at the price of English, and Arabic at two to three times",
      },
      blocks: [
        {
          kind: "table",
          columns: [
            {
              ar: "النموذج (المطوّر)",
              en: "Model (developer)",
            },
            {
              ar: "الكورية ÷ الإنجليزية",
              en: "Korean ÷ English",
            },
            {
              ar: "العربية ÷ الإنجليزية",
              en: "Arabic ÷ English",
            },
            {
              ar: "كلمات عربية تتسع لها نافذة 32 ألف رمز (حسابنا)",
              en: "Arabic words that fit in a 32k-token window (our calculation)",
            },
          ],
          rows: [
            [
              {
                ar: "A.X K1 (SKT) [13]",
                en: "A.X K1 (SKT) [13]",
              },
              {
                ar: "0.93",
                en: "0.93",
              },
              {
                ar: "3.21",
                en: "3.21",
              },
              {
                ar: "نحو 7,100",
                en: "about 7,100",
              },
            ],
            [
              {
                ar: "Solar Open 100B (Upstage) [14]",
                en: "Solar Open 100B (Upstage) [14]",
              },
              {
                ar: "0.97",
                en: "0.97",
              },
              {
                ar: "1.70",
                en: "1.70",
              },
              {
                ar: "نحو 13,500",
                en: "about 13,500",
              },
            ],
            [
              {
                ar: "K-EXAONE (LG AI Research) [12]",
                en: "K-EXAONE (LG AI Research) [12]",
              },
              {
                ar: "1.10",
                en: "1.10",
              },
              {
                ar: "1.82",
                en: "1.82",
              },
              {
                ar: "نحو 14,700",
                en: "about 14,700",
              },
            ],
            [
              {
                ar: "HyperCLOVA X SEED Think 32B (NAVER) [15]",
                en: "HyperCLOVA X SEED Think 32B (NAVER) [15]",
              },
              {
                ar: "1.13",
                en: "1.13",
              },
              {
                ar: "2.92",
                en: "2.92",
              },
              {
                ar: "نحو 7,700",
                en: "about 7,700",
              },
            ],
            [
              {
                ar: "للمقارنة: ALLaM [6]",
                en: "For comparison: ALLaM [6]",
              },
              {
                ar: "5.33",
                en: "5.33",
              },
              {
                ar: "0.96",
                en: "0.96",
              },
              {
                ar: "نحو 22,100",
                en: "about 22,100",
              },
            ],
            [
              {
                ar: "للمقارنة: Jais [5]",
                en: "For comparison: Jais [5]",
              },
              {
                ar: "3.81",
                en: "3.81",
              },
              {
                ar: "1.01",
                en: "1.01",
              },
              {
                ar: "نحو 22,300",
                en: "about 22,300",
              },
            ],
          ],
          note: {
            ar: "*المصدر: قياس VisionSeek على FLORES-200 [1] بقواميس بطاقات النماذج الرسمية. عمود الكلمات حسابنا: 32,000 ÷ (رموز عربية لكل كلمة عربية في العيّنة)، وهو تقريب لا يشمل التعليمات والرد. للمقارنة تتسع النافذة نفسها لنحو 26,000 كلمة إنجليزية في GPT-4o. بطاقة K-EXAONE تذكر ست لغات ليست العربية منها [12]، وبطاقة A.X K1 خمس لغات ليست العربية منها [13]. والصورة معكوسة في القواميس العربية: ALLaM يقرأ الكورية بأكثر من خمسة أضعاف.*",
            en: "*Source: VisionSeek measurement on FLORES-200 [1] using the tokenizers from the official model cards. The words column is our calculation: 32,000 ÷ (Arabic tokens per Arabic word in the sample), an approximation that excludes instructions and the response. For comparison, the same window holds about 26,000 English words on GPT-4o. The K-EXAONE card lists six languages, none of them Arabic [12], and the A.X K1 card lists five, none of them Arabic [13]. The picture flips for Arabic tokenizers: ALLaM reads Korean at more than five times.*",
          },
        },
      ],
    },
    {
      heading: {
        ar: "الشكل 3: المورّد نفسه قد يحاسب العربية بسعرين",
        en: "Exhibit 3: The same vendor can charge Arabic at two prices",
      },
      blocks: [
        {
          kind: "table",
          columns: [
            {
              ar: "الطبقة في نظام واحد",
              en: "Layer in a single system",
            },
            {
              ar: "القاموس",
              en: "Tokenizer",
            },
            {
              ar: "العربية ÷ الإنجليزية",
              en: "Arabic ÷ English",
            },
            {
              ar: "ماذا يعني إذا تساوى سعر الرمز (حساب توضيحي)",
              en: "What it means at an equal per-token price (illustrative)",
            },
          ],
          rows: [
            [
              {
                ar: "المحادثة والإجابة (GPT-4o) [2]",
                en: "Chat and answers (GPT-4o) [2]",
              },
              {
                ar: "o200k_base",
                en: "o200k_base",
              },
              {
                ar: "1.38",
                en: "1.38",
              },
              {
                ar: "كل 100 وحدة إنفاق إنجليزية تصبح نحو 138 بالعربية",
                en: "every 100 units of English spend becomes about 138 in Arabic",
              },
            ],
            [
              {
                ar: "البحث في الوثائق (text-embedding-3) [3]",
                en: "Document search (text-embedding-3) [3]",
              },
              {
                ar: "cl100k_base",
                en: "cl100k_base",
              },
              {
                ar: "3.03",
                en: "3.03",
              },
              {
                ar: "كل 100 وحدة تصبح نحو 303، ويمتلئ حد الإدخال أسرع بثلاث مرات",
                en: "every 100 units becomes about 303, and the input limit fills three times faster",
              },
            ],
          ],
          note: {
            ar: "*المصدر: OpenAI Cookbook [2] ودليل التضمين [3] لربط القاموس بالنموذج، والنسب من قياس VisionSeek. العمود الأخير حساب توضيحي يفترض سعرًا واحدًا للرمز في اللغتين، وليس سعرًا معلنًا. لم نقارن الأسعار الفعلية لأنها تتغير، ولأن الأهم هو النسبة التي تُضرب فيها.*",
            en: "*Source: OpenAI Cookbook [2] and the embeddings guide [3] for the model-to-tokenizer mapping; ratios from VisionSeek measurement. The last column is an illustrative calculation that assumes one per-token price in both languages; it is not a published price. We did not compare actual prices because they change, and because what matters is the multiplier.*",
          },
        },
      ],
    },
    {
      heading: {
        ar: "ماذا يعني لصاحب القرار",
        en: "What It Means for Decision Makers",
      },
      blocks: [
        {
          kind: "list",
          items: [
            {
              ar: "**قيسوا على نصوصكم قبل الشراء.** اختاروا 500 صفحة حقيقية من عمل المؤسسة (شكاوى، ملفات مرضى مجهّلة، تعاميم)، واطلبوا من كل مورّد عدد الرموز التي يحتاجها نموذجه لها بالعربية وبترجمتها الإنجليزية. الأرقام في هذا التقرير من نص إخباري فصيح، ونصوصكم قد تختلف، خاصة باللهجات [4].",
              en: "**Measure on your own texts before buying.** Pick 500 real pages from the institution's work (complaints, de-identified patient files, circulars) and ask each vendor how many tokens its model needs for them in Arabic and in their English translation. The figures in this report come from formal news-style text; your texts may differ, especially in dialect [4].",
            },
            {
              ar: "**سعّروا بالوحدة العربية لا بالرمز.** اكتبوا في المناقصة سعرًا لكل صفحة عربية أو لكل محادثة عربية، مع حد أعلى. فالسعر «لكل مليون رمز» يبدو متساويًا بين المورّدين، لكنه قد يخفي فرقًا يصل إلى ضعفين أو ثلاثة.",
              en: "**Price per Arabic unit, not per token.** Write into the tender a price per Arabic page or per Arabic conversation, with a ceiling. A \"per million tokens\" price looks equal across vendors but can hide a difference of two to three times.",
            },
            {
              ar: "**افحصوا طبقة البحث تحديدًا.** اسألوا كل مورّد: ما القاموس الذي يستخدمه نموذج التضمين؟ فطبقة البحث في الوثائق تعمل على كل صفحة تُضاف، وقد تكون أغلى طبقة بالعربية وأقلها ظهورًا [3].",
              en: "**Inspect the search layer specifically.** Ask every vendor which tokenizer its embedding model uses. The document-search layer runs over every page that is added, and may be the most expensive layer in Arabic and the least visible [3].",
            },
            {
              ar: "**اختبروا النماذج ذات القواميس العربية على مهامكم.** ALLaM وJais وFalcon-H1 تقرأ العربية بنسبة قريبة من الإنجليزية [5][6][8]. لكن كفاءة القاموس ليست جودة الإجابة، فقارنوا الجودة على عيّنتكم قبل أي قرار.",
              en: "**Test models with Arabic tokenizers on your own tasks.** ALLaM, Jais and Falcon-H1 read Arabic at a ratio close to English [5][6][8]. But tokenizer efficiency is not answer quality, so compare quality on your own sample before any decision.",
            },
            {
              ar: "**اجعلوا العربية شرطًا في أي شراكة كورية.** قبل أي اتفاقية مع مطوّر كوري، اطلبوا جدول كفاءة قاموسه بالعربية، وخطة تعريبه بأرقام، كما فعل معهد الابتكار التكنولوجي حين وسّع قاموس Falcon3 بـ32,768 رمزًا عربيًا قبل تدريب Falcon Arabic [7].",
              en: "**Make Arabic a condition of any Korean partnership.** Before any agreement with a Korean developer, ask for its tokenizer's Arabic efficiency table and a quantified Arabic adaptation plan, as TII did when it extended the Falcon3 tokenizer with 32,768 Arabic tokens before training Falcon Arabic [7].",
            },
          ],
        },
      ],
    },
    {
      heading: {
        ar: "قراءة VisionSeek (رأي)",
        en: "The VisionSeek View (Opinion)",
      },
      blocks: [
        {
          kind: "prose",
          text: {
            ar: "نرى أن القاموس هو أول طبقة سيادة في الذكاء الاصطناعي، وأقلها نقاشًا. القاموس يقرر كم تدفع اللغة، وكم تتذكر، وكم تنتظر. وكوريا فهمت هذا: نماذجها السيادية تقرأ الكورية بسعر الإنجليزية أو أقل. هذا هو الدرس الذي يستحق أن يُنقل من كوريا، لا النموذج الجاهز نفسه.",
            en: "We believe the tokenizer is the first and least discussed layer of AI sovereignty. It decides how much a language pays, how much it remembers, and how long it waits. Korea understood this: its sovereign models read Korean at the price of English or less. That is the lesson worth transferring from Korea, not the ready-made model itself.",
          },
        },
        {
          kind: "prose",
          text: {
            ar: "وعلى سلّم الامتلاك، المؤسسة التي تشتري نموذجًا بقاموس لا يعرف العربية تبقى في درجة «الاستخدام» وتدفع الفرق كل شهر. والمؤسسة التي تشترط قاموسًا عربيًا وتقيسه على نصوصها تصعد إلى «التكييف». أما النموذج الذي يبنيه شريك كوري مع مؤسسة عربية، كالشراكة المعلنة بين NAVER Cloud ومدينة الملك عبدالعزيز [16]، فيمكن أن يصل إلى «التصميم» إذا كُتب في العقد أن القاموس العربي وبيانات تدريبه ملك للطرف العربي. وهذا من صميم ما يراجعه برنامجنا **VS-P03 Clause** في العقود، وما يتابعه **VS-P04 Relay** في التزامات نقل التقنية بين كوريا والمنطقة.",
            en: "On the ownership ladder, an institution that buys a model whose tokenizer does not know Arabic stays at the \"use\" rung and pays the difference every month. An institution that demands an Arabic tokenizer and measures it on its own texts climbs to \"adaptation\". A model that a Korean partner builds together with an Arab institution, such as the announced partnership between NAVER Cloud and KACST [16], can reach \"design\" if the contract states that the Arabic tokenizer and its training data belong to the Arab party. This is at the core of what our **VS-P03 Clause** programme reviews in contracts, and what **VS-P04 Relay** tracks in technology-transfer obligations between Korea and the region.",
          },
        },
      ],
    },
    {
      heading: {
        ar: "المنهجية والمصادر",
        en: "Methodology and Sources",
      },
      blocks: [
        {
          kind: "prose",
          text: {
            ar: "**النطاق:** كفاءة تقطيع النص العربي في قواميس 24 نموذجًا عالميًا وعربيًا وكوريًا (21 قاموسًا مختلفًا)، بقياس أجرته VisionSeek في 28 أكتوبر 2026. استخدمنا 1012 جملة متوازية بالإنجليزية والعربية الفصحى والكورية من FLORES-200 devtest [1]، وعددنا الرموز دون رموز البداية والنهاية الخاصة. استخدمنا مكتبة tiktoken لقواميس OpenAI، وملفات القواميس الرسمية من Hugging Face لبقية النماذج. نماذج Kanana 1.5 وgpt-oss وQwen3 أعطت النتيجة نفسها لقواميس Llama 3.1 وo200k_base وQwen2.5. **خارج النطاق:** جودة الإجابات، والأسعار الفعلية، واللهجات.",
            en: "**Scope:** Arabic tokenization efficiency in the tokenizers of 24 global, Arabic and Korean models (21 distinct tokenizers), measured by VisionSeek on 28 October 2026. We used 1,012 parallel sentences in English, Modern Standard Arabic and Korean from FLORES-200 devtest [1], and counted tokens without special begin/end tokens. We used the tiktoken library for OpenAI encodings and the official tokenizer files from Hugging Face for the other models. Kanana 1.5, gpt-oss and Qwen3 produced the same results as the Llama 3.1, o200k_base and Qwen2.5 tokenizers respectively. **Out of scope:** answer quality, actual prices, and dialects.",
          },
        },
        {
          kind: "prose",
          text: {
            ar: "**سلّم الامتلاك:** لا نقيّم درجة أي مؤسسة أو مورّد بعينه. القراءة في قسم الرأي عامة.",
            en: "**Ownership ladder:** We do not rate any specific institution or vendor. The reading in the opinion section is general.",
          },
        },
        {
          kind: "prose",
          text: {
            ar: "**ما لا نعرفه:** لم نقس الجودة، فالقاموس الأكفأ لا يعني نموذجًا أفضل. ونسخ الخدمات التجارية المدفوعة قد تستخدم قواميس مختلفة عن النماذج المفتوحة التي قسناها. وربط نماذج OpenAI بقواميسها مأخوذ من وثائق OpenAI [2][3]. ولم نجد ملف قاموس Falcon Arabic منشورًا باسم واضح، فاعتمدنا نتيجته من ورقة TII [7]، وتقيس الورقة الرموز لكل كلمة لا النسبة إلى الإنجليزية. ولم نجد بطاقة تذكر اللغات المدعومة في Solar Open، وهذا لا يعني أنها غير موجودة. وأرقام دخول الشركات الكورية إلى الخليج من بيانات رسمية [16] وصحافة كورية [17][18].",
            en: "**What we don't know:** We did not measure quality; a more efficient tokenizer does not mean a better model. Paid commercial versions may use tokenizers different from the open models we measured. The mapping of OpenAI models to their encodings comes from OpenAI's documentation [2][3]. We did not find the Falcon Arabic tokenizer file published under a clear name, so we relied on its result from the TII paper [7], which measures tokens per word rather than the ratio to English. We did not find a model card listing Solar Open's supported languages; that does not mean one does not exist. Information on Korean companies entering the Gulf comes from official releases [16] and Korean press [17][18].",
          },
        },
        {
          kind: "prose",
          text: {
            ar: "**المصادر:** [1] FLORES-200، NLLB 2022 · [2] OpenAI Cookbook · [3] OpenAI، دليل التضمين · [4] Petrov وآخرون، NeurIPS 2023 · [5] ورقة Jais، 2023 · [6] ورقة ALLaM، 2024 · [7] TII، ArabicNLP 2025 · [8] TII، 21/05/2025 · [9] HUMAIN، 25/08/2025 · [10] بطاقة Fanar · [11] وزارة العلوم وتقنية المعلومات الكورية، 15/01/2026 · [12] بطاقة K-EXAONE · [13] بطاقة A.X K1 · [14] بطاقة Solar Open · [15] بطاقة HyperCLOVA X SEED · [16] واس، 30/01/2026 · [17] The Asia Business Daily، 02/09/2026 · [18] Seoul Economic Daily، 23/09/2026. الروابط الكاملة في بيانات الملف.",
            en: "**Sources:** [1] FLORES-200, NLLB 2022 · [2] OpenAI Cookbook · [3] OpenAI, embeddings guide · [4] Petrov et al., NeurIPS 2023 · [5] Jais paper, 2023 · [6] ALLaM paper, 2024 · [7] TII, ArabicNLP 2025 · [8] TII, 21/05/2025 · [9] HUMAIN, 25/08/2025 · [10] Fanar model card · [11] Korea Ministry of Science and ICT, 15/01/2026 · [12] K-EXAONE card · [13] A.X K1 card · [14] Solar Open card · [15] HyperCLOVA X SEED card · [16] SPA, 30/01/2026 · [17] The Asia Business Daily, 02/09/2026 · [18] Seoul Economic Daily, 23/09/2026. Full links are in the file metadata.",
          },
        },
      ],
    },
  ],
} as const;

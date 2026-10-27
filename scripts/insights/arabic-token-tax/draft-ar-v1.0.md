---
slug: arabic-token-tax
title: "الجملة نفسها تكلّف أكثر حين تكتبها بالعربية"
titleEn: "The Same Sentence Costs More When You Write It in Arabic"
summary: "قسنا 1012 جملة لها المعنى نفسه بالعربية والإنجليزية والكورية على قواميس 24 نموذجًا للذكاء الاصطناعي. أشهر النماذج العالمية تحتاج إلى رموز عربية أكثر بنسبة 38% إلى 65% للمعنى نفسه، وطبقة البحث في OpenAI تحتاج إلى ثلاثة أضعاف. والنماذج الكورية السيادية القادمة إلى الخليج تقرأ الكورية بسعر الإنجليزية، وتقرأ العربية بما يصل إلى 3.2 أضعاف. يعني: الرمز هو وحدة الفاتورة، ومن لا يقيسه يدفع الفرق دون أن يراه."
summaryEn: "We ran 1,012 sentences with identical meaning in Arabic, English and Korean through the tokenizers of 24 AI models. The best-known global models need 38% to 65% more tokens for the same meaning in Arabic, and the tokenizer behind OpenAI's embeddings needs three times as many. The Korean sovereign models now heading to the Gulf read Korean at the price of English, but read Arabic at up to 3.2 times. The token is the billing unit: whoever does not measure it pays the difference without seeing it."
cardSummary:
  ar: "قياس VisionSeek على 1012 جملة متوازية: العربية تحتاج رموزًا أكثر بنسبة 38% إلى 65% في أشهر النماذج العالمية، وحتى 3.2 أضعاف في نماذج كورية سيادية تدخل سوق الخليج. خمس خطوات قبل توقيع أي عقد."
  en: "VisionSeek measurement on 1,012 parallel sentences: Arabic needs 38% to 65% more tokens on the best-known global models, and up to 3.2 times more on Korean sovereign models entering the Gulf market. Five steps before signing any contract."
question:
  ar: "حين تخدم المؤسسة الناس بالعربية عبر الذكاء الاصطناعي، كم تدفع زيادة لأن لغتها عربية، وكيف تضع ذلك في المناقصة؟"
  en: "When an institution serves people in Arabic through AI, how much extra does it pay because its language is Arabic, and how should it write that into the tender?"
answer:
  ar: "في النماذج غير العربية تدفع من 1.2 إلى 3.7 أضعاف ما يدفعه نص إنجليزي بالمعنى نفسه، بحسب قاموس النموذج. والحل أن تقيس على نصوصها قبل الشراء، وأن تسعّر بالصفحة العربية لا بالرمز، وأن تفحص طبقة البحث والقاموس قبل أي شراكة."
  en: "On non-Arabic models, between 1.2 and 3.7 times what an English text with the same meaning costs, depending on the model's tokenizer. The fix is to measure on its own texts before buying, to price per Arabic page rather than per token, and to inspect the search layer and the tokenizer before any partnership."
publishedAt: "2026-10-28T07:45:00+09:00"
date: "2026-10-28"
dateLabel:
  ar: "28 أكتوبر 2026"
  en: "28 October 2026"
versionLabel: "1.0"
label:
  ar: "مختبر VisionSeek · تقارير · الإصدار 1.0"
  en: "VisionSeek Lab · Reports · Version 1.0"
tag: "البنية والتكلفة"
author:
  ar: "د. أحمد عبدالعليم، VisionSeek (إنتشون، كوريا الجنوبية)"
  en: "Ahmed Abdelalim, VisionSeek (Incheon, South Korea)"
attribution:
  ar: "مبني على بحث أجرته VisionSeek"
  en: "Based on research by VisionSeek"
pdfAr: "arabic-token-tax.pdf"
heroImage: "arabic-token-tax.png"
ogImage: "arabic-token-tax.og.png"
coverWidth: 1280
coverHeight: 720
heroAlt: "تكوين هندسي داكن لشريطين متوازيين، أحدهما قطع ليمونية قليلة طويلة والآخر قطع كثيرة صغيرة متكسّرة، فوق نقش عربي خافت"
imageCredit: "رسم توضيحي: VisionSeek (مولَّد)"
methodologyHref: "/reports/reports/methodology"
readingMinutes: 7
corrections: []
stats:
  - big: "3.03×"
    text: { ar: "رموز عربية مقابل كل رمز إنجليزي في قاموس cl100k_base الذي توصي به OpenAI لنماذج التضمين text-embedding-3 (قياس VisionSeek)", en: "Arabic tokens for every English token in cl100k_base, the encoding OpenAI specifies for its text-embedding-3 models (VisionSeek measurement)" }
  - big: "1.38×"
    text: { ar: "النسبة نفسها في قاموس o200k_base الخاص بنموذج GPT-4o، أي أن الشركة نفسها تحاسب العربية بسعرين", en: "the same ratio in o200k_base, the GPT-4o encoding: one vendor, two Arabic price tags" }
  - big: "3.21×"
    text: { ar: "في قاموس نموذج A.X K1 الكوري السيادي (SKT)، الذي يقرأ الكورية بنسبة 0.93 فقط", en: "on the tokenizer of SKT's Korean sovereign model A.X K1, which reads Korean at a ratio of just 0.93" }
sources:
  - { id: 1, tier: "أ", publisher: "NLLB Team (Meta AI)", date: "2022", title: "No Language Left Behind — FLORES-200 evaluation benchmark (devtest split)", url: "https://arxiv.org/abs/2207.04672" }
  - { id: 2, tier: "أ", publisher: "OpenAI Cookbook", date: "", title: "How to count tokens with tiktoken — encodings by model", url: "https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken" }
  - { id: 3, tier: "أ", publisher: "OpenAI API Docs", date: "", title: "Vector embeddings guide (\"use the cl100k_base encoding\")", url: "https://developers.openai.com/api/docs/guides/embeddings" }
  - { id: 4, tier: "ج (ورقة علمية محكّمة)", publisher: "Petrov, La Malfa, Torr, Bibi — NeurIPS 2023", date: "2023", title: "Language Model Tokenizers Introduce Unfairness Between Languages", url: "https://proceedings.neurips.cc/paper_files/paper/2023/file/74bb24dca8334adce292883b4b651eda-Paper-Conference.pdf" }
  - { id: 5, tier: "ج (ورقة علمية)", publisher: "Sengupta et al. — Inception, MBZUAI, Cerebras", date: "2023", title: "Jais and Jais-chat: Arabic-Centric Foundation and Instruction-Tuned Open Generative LLMs", url: "https://arxiv.org/abs/2308.16149" }
  - { id: 6, tier: "ج (ورقة علمية)", publisher: "Bari et al. — SDAIA National Center for AI", date: "2024", title: "ALLaM: Large Language Models for Arabic and English", url: "https://arxiv.org/abs/2407.15390" }
  - { id: 7, tier: "ج (ورقة علمية محكّمة)", publisher: "TII — ArabicNLP 2025 (ACL Anthology)", date: "2025", title: "Adapting Falcon3-7B Language Model for Arabic: Methods, Challenges, and Outcomes", url: "https://doi.org/10.18653/v1/2025.arabicnlp-main.1" }
  - { id: 8, tier: "ب", publisher: "Technology Innovation Institute (TII)", date: "2025-05-21", title: "TII launches Falcon Arabic and Falcon-H1", url: "https://www.tii.ae/news/middle-easts-leading-ai-powerhouse-tii-launches-two-new-ai-models-falcon-arabic-first-arabic" }
  - { id: 9, tier: "ب", publisher: "HUMAIN", date: "2025-08-25", title: "HUMAIN Launches HUMAIN Chat, Powered by ALLAM 34B", url: "https://www.humain.com/en/news/humain-chat-launch" }
  - { id: 10, tier: "أ", publisher: "QCRI, Hamad Bin Khalifa University (model card)", date: "2025", title: "Fanar-1-9B-Instruct", url: "https://huggingface.co/QCRI/Fanar-1-9B-Instruct" }
  - { id: 11, tier: "أ", publisher: "Ministry of Science and ICT, Korea", date: "2026-01-15", title: "Phase 1 evaluation results — Sovereign AI Foundation Model project", url: "https://www.msit.go.kr/eng/bbs/view.do?bbsSeqNo=42&mId=4&mPid=2&nttSeqNo=1212&sCode=eng" }
  - { id: 12, tier: "أ", publisher: "LG AI Research (model card)", date: "2025-12", title: "K-EXAONE-236B-A23B", url: "https://huggingface.co/LGAI-EXAONE/K-EXAONE-236B-A23B" }
  - { id: 13, tier: "أ", publisher: "SK Telecom (model card)", date: "2025-12", title: "A.X K1", url: "https://huggingface.co/skt/A.X-K1" }
  - { id: 14, tier: "أ", publisher: "Upstage (model card)", date: "2025-12", title: "Solar-Open-100B", url: "https://huggingface.co/upstage/Solar-Open-100B" }
  - { id: 15, tier: "أ", publisher: "NAVER Cloud (model card)", date: "2025-12", title: "HyperCLOVAX-SEED-Think-32B", url: "https://huggingface.co/naver-hyperclovax/HyperCLOVAX-SEED-Think-32B" }
  - { id: 16, tier: "ب", publisher: "Saudi Press Agency (SPA)", date: "2026-01-30", title: "KACST Signs Strategic Partnerships to Advance AI, Urban and Industrial Innovation (NAVER Cloud Arabic LLM)", url: "https://www.spa.gov.sa/en/N2501232" }
  - { id: 17, tier: "د (صحافة)", publisher: "The Asia Business Daily", date: "2026-09-02", title: "Seven Korean AI Companies Complete Full-Stack AI Proof of Concept at Saudi Aramco", url: "https://www.asiae.co.kr/en/article/2026090216572831051" }
  - { id: 18, tier: "د (صحافة)", publisher: "Seoul Economic Daily", date: "2026-09-23", title: "LG Pushes Exaone AI Exports to Central Asia, Middle East", url: "https://en.sedaily.com/finance/2026/09/23/lg-pushes-exaone-exports-to-central-asia-middle-east" }
---

لو كتبت الجملة نفسها مرتين، مرة بالعربية ومرة بالإنجليزية، وأرسلتها إلى نموذج ذكاء اصطناعي، فقد تظن أن الفاتورة واحدة.

المعنى واحد، والطول تقريبًا واحد.

لكن النموذج لا يرى الجملة كما تراها أنت.

**بالعربية، الجملة نفسها قد تكلّفك ضعفين أو ثلاثة.**

## الجواب باختصار: نحن ندفع زيادة لأن لغتنا عربية، ولا نراها في العرض

**الجواب:** المؤسسة العربية التي تشغّل الذكاء الاصطناعي بلغتها تدفع زيادة لا تظهر في العرض المالي.

فالنماذج لا تقرأ الكلمات، بل تقطّعها إلى «رموز» (tokens) بحسب قاموس داخلي. والرمز هو وحدة الفاتورة وحدود الذاكرة معًا. تخيّل عدّادًا لا يحسب الكلمات، بل القطع التي تُكسر إليها الكلمة.

قسنا 1012 جملة متطابقة المعنى من مجموعة FLORES-200 المفتوحة [1] على قواميس 24 نموذجًا (21 قاموسًا مختلفًا).

فوجدنا أن الجملة العربية تحتاج في النماذج غير العربية من 1.2 إلى 3.7 أضعاف رموز نظيرتها الإنجليزية، بحسب القاموس. بينما تقترب القواميس العربية من التعادل.

يعني: يجب أن تُقاس هذه الزيادة على نصوص المؤسسة نفسها قبل الشراء، وأن تُكتب في المناقصة بوحدة عربية مفهومة، لا بالرمز.

## ما هو «الرمز» بالضبط، ولماذا يكلّف العربية أكثر؟

القاموس الذي بُني على نصوص إنجليزية يقطّع الكلمة العربية إلى قطع صغيرة كثيرة.

تقول ورقة ALLaM إن ضعف تقطيع العربية يجعل التدريب أقل كفاءة، ويجعل النموذج «يولّد رموزًا أكثر لكل كلمة»، ويقلّص طول السياق الفعلي [6]. وتقول ورقة Jais إن التقطيع الزائد يخفض الأداء ويرفع تكلفة الحوسبة [5].

هذه زيادة تصيب ثلاثة أشياء معًا: الفاتورة، وسرعة الرد، وكمية النص التي يستطيع النموذج قراءتها مرة واحدة.

ومع ذلك لا تظهر في أغلب العروض، لأن السعر يُكتب «لكل مليون رمز» دون ذكر اللغة.

يعني: الزيادة موجودة في كل فاتورة، لكنها مكتوبة بوحدة لا يقرؤها أحد.

## هل المشكلة في النماذج الضعيفة فقط؟

لا. الزيادة حقيقية حتى في أفضل النماذج العالمية.

في قاموس o200k_base الذي تربطه OpenAI بنموذج GPT-4o [2] تحتاج العربية رموزًا أكثر بنسبة 38%. وفي Llama وQwen وDeepSeek تتراوح الزيادة بين 59% و65% (قياس VisionSeek). والظاهرة موثّقة علميًا منذ 2023 [4].

وفي المقابل، استثمرت المنطقة في نماذج عربية خاصة بها. أطلقت HUMAIN تطبيقها المبني على ALLaM 34B في أغسطس 2025 [9]، وأطلق معهد الابتكار التكنولوجي في أبوظبي Falcon Arabic في مايو 2025 [8]، وطوّر معهد قطر لبحوث الحوسبة نموذج Fanar [10].

يعني: القاموس، لا اسم النموذج، هو ما يحدد كم تدفع العربية.

## الشكل 1: المعنى واحد، والفاتورة تتغيّر بتغيّر القاموس

| القاموس (النموذج) | رموز عربية مقابل كل رمز إنجليزي |
|---|---|
| ALLaM (هيئة البيانات والذكاء الاصطناعي) | 0.96 |
| Jais (Inception) | 1.01 |
| Falcon-H1 (معهد الابتكار التكنولوجي) | 1.19 |
| OpenAI o200k_base (GPT-4o) | 1.38 |
| Fanar-1 (معهد قطر لبحوث الحوسبة) | 1.45 |
| Gemma 3 (Google) | 1.47 |
| Llama 3.1 (Meta) | 1.65 |
| OpenAI cl100k_base (نماذج التضمين text-embedding-3) | 3.03 |
| Falcon3 (قبل التعريب) | 3.34 |

*المصدر: قياس VisionSeek في 28 أكتوبر 2026 على 1012 جملة متوازية من FLORES-200 devtest [1]، بقواميس النماذج المنشورة رسميًا. النسبة = مجموع الرموز العربية ÷ مجموع الرموز الإنجليزية للجمل نفسها. نسب Qwen وDeepSeek وLlama 4 بين 1.59 و1.63.*

## ماذا عن الشريك الكوري القادم إلى الخليج؟

أغلب المؤسسات تشتري خدماتها من نماذج عالمية. والآن بدأت شركات كورية تعرض نماذجها في الخليج.

وقّعت NAVER Cloud مع مدينة الملك عبدالعزيز للعلوم والتقنية شراكة لبناء نموذج لغوي عربي في يناير 2026 [16]. وأنهى تحالف من سبع شركات كورية، منها LG AI Research وUpstage، إثبات مفهوم في أرامكو الرقمية في سبتمبر 2026 [17].

قواميس أحدث النماذج المفتوحة للشركات الثلاث التي تأهلت في برنامج النموذج السيادي الكوري [11] تقرأ الكورية بسعر الإنجليزية تقريبًا (0.93 إلى 1.10). لكنها تقرأ العربية بنسبة 1.70 إلى 3.21. وهذه الشركات تدخل سوق الخليج الآن [16][17][18].

يعني: الشريك الكوري يقرأ لغته جيدًا، ويقرأ لغتنا بسعر أعلى.

## الشكل 2: النماذج الكورية السيادية تقرأ الكورية بسعر الإنجليزية، والعربية بضعفين أو ثلاثة

| النموذج (المطوّر) | الكورية ÷ الإنجليزية | العربية ÷ الإنجليزية | كلمات عربية تتسع لها نافذة 32 ألف رمز (حسابنا) |
|---|---|---|---|
| A.X K1 (SKT) [13] | 0.93 | 3.21 | نحو 7,100 |
| Solar Open 100B (Upstage) [14] | 0.97 | 1.70 | نحو 13,500 |
| K-EXAONE (LG AI Research) [12] | 1.10 | 1.82 | نحو 14,700 |
| HyperCLOVA X SEED Think 32B (NAVER) [15] | 1.13 | 2.92 | نحو 7,700 |
| للمقارنة: ALLaM [6] | 5.33 | 0.96 | نحو 22,100 |
| للمقارنة: Jais [5] | 3.81 | 1.01 | نحو 22,300 |

*المصدر: قياس VisionSeek على FLORES-200 [1] بقواميس بطاقات النماذج الرسمية. عمود الكلمات حسابنا: 32,000 ÷ (رموز عربية لكل كلمة عربية في العيّنة)، وهو تقريب لا يشمل التعليمات والرد. للمقارنة تتسع النافذة نفسها لنحو 26,000 كلمة إنجليزية في GPT-4o. بطاقة K-EXAONE تذكر ست لغات ليست العربية منها [12]، وبطاقة A.X K1 خمس لغات ليست العربية منها [13]. والصورة معكوسة في القواميس العربية: ALLaM يقرأ الكورية بأكثر من خمسة أضعاف.*

## أين تختبئ أغلى نقطة؟

في طبقة لا يراها أحد تقريبًا: طبقة البحث في الوثائق.

توصي OpenAI باستخدام قاموس cl100k_base لنماذج التضمين text-embedding-3 [3]، وهي الطبقة التي تبني البحث في وثائق المؤسسة. وفي هذا القاموس تحتاج العربية 3.03 أضعاف رموز الإنجليزية (قياس VisionSeek).

يعني: المورّد نفسه يحاسب العربية بسعرين.

## الشكل 3: المورّد نفسه قد يحاسب العربية بسعرين

| الطبقة في نظام واحد | القاموس | العربية ÷ الإنجليزية | ماذا يعني إذا تساوى سعر الرمز (حساب توضيحي) |
|---|---|---|---|
| المحادثة والإجابة (GPT-4o) [2] | o200k_base | 1.38 | كل 100 وحدة إنفاق إنجليزية تصبح نحو 138 بالعربية |
| البحث في الوثائق (text-embedding-3) [3] | cl100k_base | 3.03 | كل 100 وحدة تصبح نحو 303، ويمتلئ حد الإدخال أسرع بثلاث مرات |

*المصدر: OpenAI Cookbook [2] ودليل التضمين [3] لربط القاموس بالنموذج، والنسب من قياس VisionSeek. العمود الأخير حساب توضيحي يفترض سعرًا واحدًا للرمز في اللغتين، وليس سعرًا معلنًا. لم نقارن الأسعار الفعلية لأنها تتغير، ولأن الأهم هو النسبة التي تُضرب فيها.*

## خمس خطوات قبل توقيع أي عقد

1. **قيسوا على نصوصكم قبل الشراء.** اختاروا 500 صفحة حقيقية من عمل المؤسسة (شكاوى، ملفات مرضى مجهّلة، تعاميم)، واطلبوا من كل مورّد عدد الرموز التي يحتاجها نموذجه لها بالعربية وبترجمتها الإنجليزية. الأرقام في هذا التقرير من نص إخباري فصيح، ونصوصكم قد تختلف، خاصة باللهجات [4].
2. **سعّروا بالوحدة العربية لا بالرمز.** اكتبوا في المناقصة سعرًا لكل صفحة عربية أو لكل محادثة عربية، مع حد أعلى. فالسعر «لكل مليون رمز» يبدو متساويًا بين المورّدين، لكنه قد يخفي فرقًا يصل إلى ضعفين أو ثلاثة.
3. **افحصوا طبقة البحث تحديدًا.** اسألوا كل مورّد: ما القاموس الذي يستخدمه نموذج التضمين؟ فطبقة البحث في الوثائق تعمل على كل صفحة تُضاف، وقد تكون أغلى طبقة بالعربية وأقلها ظهورًا [3].
4. **اختبروا النماذج ذات القواميس العربية على مهامكم.** ALLaM وJais وFalcon-H1 تقرأ العربية بنسبة قريبة من الإنجليزية [5][6][8]. لكن كفاءة القاموس ليست جودة الإجابة، فقارنوا الجودة على عيّنتكم قبل أي قرار.
5. **اجعلوا العربية شرطًا في أي شراكة كورية.** قبل أي اتفاقية مع مطوّر كوري، اطلبوا جدول كفاءة قاموسه بالعربية، وخطة تعريبه بأرقام، كما فعل معهد الابتكار التكنولوجي حين وسّع قاموس Falcon3 بـ32,768 رمزًا عربيًا قبل تدريب Falcon Arabic [7].

## قراءة VisionSeek (رأي)

القاموس هو أول طبقة سيادة في الذكاء الاصطناعي، وأقلها نقاشًا.

القاموس يقرر كم تدفع اللغة، وكم تتذكر، وكم تنتظر.

وكوريا فهمت هذا: نماذجها السيادية تقرأ الكورية بسعر الإنجليزية أو أقل. هذا هو الدرس الذي يستحق أن يُنقل من كوريا، لا النموذج الجاهز نفسه.

وعلى سلّم الامتلاك، المؤسسة التي تشتري نموذجًا بقاموس لا يعرف العربية تبقى في درجة «الاستخدام»، وتدفع الفرق كل شهر. والمؤسسة التي تشترط قاموسًا عربيًا وتقيسه على نصوصها تصعد إلى «التكييف».

أما النموذج الذي يبنيه شريك كوري مع مؤسسة عربية، كالشراكة المعلنة بين NAVER Cloud ومدينة الملك عبدالعزيز [16]، فيمكن أن يصل إلى «التصميم» إذا كُتب في العقد أن القاموس العربي وبيانات تدريبه ملك للطرف العربي.

وهذا من صميم ما يراجعه برنامجنا **VS-P03 Clause** في العقود، وما يتابعه **VS-P04 Relay** في التزامات نقل التقنية بين كوريا والمنطقة.

## الخلاصة

يعني: من لا يقيس الرمز يدفع الفرق دون أن يراه.

والسؤال الذي سنراقبه: هل ستطلب أول مناقصة خليجية سعرًا لكل صفحة عربية بدل السعر لكل مليون رمز؟

## المنهجية والمصادر

**النطاق:** كفاءة تقطيع النص العربي في قواميس 24 نموذجًا عالميًا وعربيًا وكوريًا (21 قاموسًا مختلفًا)، بقياس أجرته VisionSeek في 28 أكتوبر 2026. استخدمنا 1012 جملة متوازية بالإنجليزية والعربية الفصحى والكورية من FLORES-200 devtest [1]، وعددنا الرموز دون رموز البداية والنهاية الخاصة. استخدمنا مكتبة tiktoken لقواميس OpenAI، وملفات القواميس الرسمية من Hugging Face لبقية النماذج. نماذج Kanana 1.5 وgpt-oss وQwen3 أعطت النتيجة نفسها لقواميس Llama 3.1 وo200k_base وQwen2.5. **خارج النطاق:** جودة الإجابات، والأسعار الفعلية، واللهجات.

**سلّم الامتلاك:** لا نقيّم درجة أي مؤسسة أو مورّد بعينه. القراءة في قسم الرأي عامة.

**ما لا نعرفه:** لم نقس الجودة، فالقاموس الأكفأ لا يعني نموذجًا أفضل. ونسخ الخدمات التجارية المدفوعة قد تستخدم قواميس مختلفة عن النماذج المفتوحة التي قسناها. وربط نماذج OpenAI بقواميسها مأخوذ من وثائق OpenAI [2][3]. ولم نجد ملف قاموس Falcon Arabic منشورًا باسم واضح، فاعتمدنا نتيجته من ورقة TII [7]، وتقيس الورقة الرموز لكل كلمة لا النسبة إلى الإنجليزية. ولم نجد بطاقة تذكر اللغات المدعومة في Solar Open، وهذا لا يعني أنها غير موجودة. وأرقام دخول الشركات الكورية إلى الخليج من بيانات رسمية [16] وصحافة كورية [17][18].

**المصادر:** [1] FLORES-200، NLLB 2022 · [2] OpenAI Cookbook · [3] OpenAI، دليل التضمين · [4] Petrov وآخرون، NeurIPS 2023 · [5] ورقة Jais، 2023 · [6] ورقة ALLaM، 2024 · [7] TII، ArabicNLP 2025 · [8] TII، 21/05/2025 · [9] HUMAIN، 25/08/2025 · [10] بطاقة Fanar · [11] وزارة العلوم وتقنية المعلومات الكورية، 15/01/2026 · [12] بطاقة K-EXAONE · [13] بطاقة A.X K1 · [14] بطاقة Solar Open · [15] بطاقة HyperCLOVA X SEED · [16] واس، 30/01/2026 · [17] The Asia Business Daily، 02/09/2026 · [18] Seoul Economic Daily، 23/09/2026. الروابط الكاملة في بيانات الملف.

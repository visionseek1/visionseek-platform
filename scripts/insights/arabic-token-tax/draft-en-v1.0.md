---
slug: arabic-token-tax
title: "الجملة نفسها تكلّف أكثر حين تكتبها بالعربية"
titleEn: "The Same Sentence Costs More When You Write It in Arabic"
summary: "قسنا 1012 جملة متطابقة المعنى بالعربية والإنجليزية والكورية على قواميس 24 نموذجًا للذكاء الاصطناعي. أشهر النماذج العالمية تحتاج إلى رموز عربية أكثر بنسبة 38% إلى 65% للمعنى نفسه، وطبقة البحث في OpenAI تحتاج إلى ثلاثة أضعاف. والنماذج الكورية السيادية القادمة إلى الخليج تقرأ الكورية بسعر الإنجليزية، وتقرأ العربية بما يصل إلى 3.2 أضعاف. الرمز هو وحدة الفاتورة، فمن لا يقيسه يدفع الفرق دون أن يراه."
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
lang: "en"
translationOf: "arabic-token-tax.md"
---

## Executive Summary

**The answer:** An Arab institution that runs AI in its own language pays a premium that never appears in the price offer. Models do not read words; they cut them into "tokens" according to an internal vocabulary (the tokenizer), and the token is both the billing unit and the limit of the model's memory. We ran 1,012 sentences with identical meaning from the open FLORES-200 set [1] through the tokenizers of 24 models (21 distinct tokenizers), and found that on non-Arabic models an Arabic sentence needs 1.2 to 3.7 times as many tokens as its English equivalent, depending on the tokenizer, while Arabic tokenizers come close to parity. This premium must therefore be measured on the institution's own texts before buying, and written into the tender in an Arabic unit that people understand, not in tokens.

**Three key messages:**

1. **The premium is real even on the best global models.** In o200k_base, the encoding OpenAI maps to GPT-4o [2], Arabic needs 38% more tokens. In Llama, Qwen and DeepSeek the premium ranges between 59% and 65% (VisionSeek measurement). The phenomenon has been documented in the research literature since 2023 [4].
2. **The most expensive point may sit in a layer nobody sees.** OpenAI specifies the cl100k_base encoding for its text-embedding-3 models [3], the layer that powers search across an institution's documents. In that tokenizer Arabic needs 3.03 times as many tokens as English (VisionSeek measurement). The same vendor, in other words, charges Arabic at two prices.
3. **The Korean partner reads its own language well, and ours less so.** The tokenizers of the latest open models from the three companies that advanced in Korea's sovereign foundation-model programme [11] read Korean at roughly the price of English (0.93 to 1.10), but read Arabic at 1.70 to 3.21. These companies are entering the Gulf market now [16][17][18].

## Situation, Complication, Question

**Situation.** The region has invested in Arabic models of its own. HUMAIN launched its app built on ALLaM 34B in August 2025 [9], Abu Dhabi's Technology Innovation Institute launched Falcon Arabic in May 2025 [8], and the Qatar Computing Research Institute developed Fanar [10]. At the same time, most institutions buy their services from global models, and Korean companies have begun offering their models in the Gulf: NAVER Cloud signed a partnership with King Abdulaziz City for Science and Technology (KACST) to build an Arabic large language model in January 2026 [16], and a consortium of seven Korean companies, including LG AI Research and Upstage, completed a proof of concept at Aramco Digital in September 2026 [17].

**Complication.** A token is not a word. A tokenizer built on English text cuts an Arabic word into many small pieces. The ALLaM paper says poor Arabic tokenization makes training less efficient, forces the model to "generate more tokens per word", and shrinks the effective context length [6]. The Jais paper says over-segmentation lowers performance and raises computational cost [5]. This premium hits three things at once: the bill, response speed, and how much text the model can read in one pass. Yet it is absent from most offers, because the price is quoted "per million tokens" without naming the language.

**Question.** When an institution serves people in Arabic through AI, how much extra does it pay because its language is Arabic, and how should it write that into the tender?

**Answer.** On non-Arabic models it pays 1.2 to 3.7 times as much, depending on the tokenizer. The fix is to measure before buying, to price in an Arabic unit, and to inspect the search layer and the tokenizer before any partnership.

## Exhibit 1: Same meaning, different bill, depending on the tokenizer

| Tokenizer (model) | Arabic tokens per English token |
|---|---|
| ALLaM (Saudi Data and AI Authority) | 0.96 |
| Jais (Inception) | 1.01 |
| Falcon-H1 (Technology Innovation Institute) | 1.19 |
| OpenAI o200k_base (GPT-4o) | 1.38 |
| Fanar-1 (Qatar Computing Research Institute) | 1.45 |
| Gemma 3 (Google) | 1.47 |
| Llama 3.1 (Meta) | 1.65 |
| OpenAI cl100k_base (text-embedding-3 models) | 3.03 |
| Falcon3 (before Arabic adaptation) | 3.34 |

*Source: VisionSeek measurement on 28 October 2026 on 1,012 parallel sentences from FLORES-200 devtest [1], using the officially published model tokenizers. Ratio = total Arabic tokens ÷ total English tokens for the same sentences. Qwen, DeepSeek and Llama 4 sit between 1.59 and 1.63.*

## Exhibit 2: Korean sovereign models read Korean at the price of English, and Arabic at two to three times

| Model (developer) | Korean ÷ English | Arabic ÷ English | Arabic words that fit in a 32k-token window (our calculation) |
|---|---|---|---|
| A.X K1 (SKT) [13] | 0.93 | 3.21 | about 7,100 |
| Solar Open 100B (Upstage) [14] | 0.97 | 1.70 | about 13,500 |
| K-EXAONE (LG AI Research) [12] | 1.10 | 1.82 | about 14,700 |
| HyperCLOVA X SEED Think 32B (NAVER) [15] | 1.13 | 2.92 | about 7,700 |
| For comparison: ALLaM [6] | 5.33 | 0.96 | about 22,100 |
| For comparison: Jais [5] | 3.81 | 1.01 | about 22,300 |

*Source: VisionSeek measurement on FLORES-200 [1] using the tokenizers from the official model cards. The words column is our calculation: 32,000 ÷ (Arabic tokens per Arabic word in the sample), an approximation that excludes instructions and the response. For comparison, the same window holds about 26,000 English words on GPT-4o. The K-EXAONE card lists six languages, none of them Arabic [12], and the A.X K1 card lists five, none of them Arabic [13]. The picture flips for Arabic tokenizers: ALLaM reads Korean at more than five times.*

## Exhibit 3: The same vendor can charge Arabic at two prices

| Layer in a single system | Tokenizer | Arabic ÷ English | What it means at an equal per-token price (illustrative) |
|---|---|---|---|
| Chat and answers (GPT-4o) [2] | o200k_base | 1.38 | every 100 units of English spend becomes about 138 in Arabic |
| Document search (text-embedding-3) [3] | cl100k_base | 3.03 | every 100 units becomes about 303, and the input limit fills three times faster |

*Source: OpenAI Cookbook [2] and the embeddings guide [3] for the model-to-tokenizer mapping; ratios from VisionSeek measurement. The last column is an illustrative calculation that assumes one per-token price in both languages; it is not a published price. We did not compare actual prices because they change, and because what matters is the multiplier.*

## What It Means for Decision Makers

1. **Measure on your own texts before buying.** Pick 500 real pages from the institution's work (complaints, de-identified patient files, circulars) and ask each vendor how many tokens its model needs for them in Arabic and in their English translation. The figures in this report come from formal news-style text; your texts may differ, especially in dialect [4].
2. **Price per Arabic unit, not per token.** Write into the tender a price per Arabic page or per Arabic conversation, with a ceiling. A "per million tokens" price looks equal across vendors but can hide a difference of two to three times.
3. **Inspect the search layer specifically.** Ask every vendor which tokenizer its embedding model uses. The document-search layer runs over every page that is added, and may be the most expensive layer in Arabic and the least visible [3].
4. **Test models with Arabic tokenizers on your own tasks.** ALLaM, Jais and Falcon-H1 read Arabic at a ratio close to English [5][6][8]. But tokenizer efficiency is not answer quality, so compare quality on your own sample before any decision.
5. **Make Arabic a condition of any Korean partnership.** Before any agreement with a Korean developer, ask for its tokenizer's Arabic efficiency table and a quantified Arabic adaptation plan, as TII did when it extended the Falcon3 tokenizer with 32,768 Arabic tokens before training Falcon Arabic [7].

## The VisionSeek View (Opinion)

We believe the tokenizer is the first and least discussed layer of AI sovereignty. It decides how much a language pays, how much it remembers, and how long it waits. Korea understood this: its sovereign models read Korean at the price of English or less. That is the lesson worth transferring from Korea, not the ready-made model itself.

On the ownership ladder, an institution that buys a model whose tokenizer does not know Arabic stays at the "use" rung and pays the difference every month. An institution that demands an Arabic tokenizer and measures it on its own texts climbs to "adaptation". A model that a Korean partner builds together with an Arab institution, such as the announced partnership between NAVER Cloud and KACST [16], can reach "design" if the contract states that the Arabic tokenizer and its training data belong to the Arab party. This is at the core of what our **VS-P03 Clause** programme reviews in contracts, and what **VS-P04 Relay** tracks in technology-transfer obligations between Korea and the region.

## Methodology and Sources

**Scope:** Arabic tokenization efficiency in the tokenizers of 24 global, Arabic and Korean models (21 distinct tokenizers), measured by VisionSeek on 28 October 2026. We used 1,012 parallel sentences in English, Modern Standard Arabic and Korean from FLORES-200 devtest [1], and counted tokens without special begin/end tokens. We used the tiktoken library for OpenAI encodings and the official tokenizer files from Hugging Face for the other models. Kanana 1.5, gpt-oss and Qwen3 produced the same results as the Llama 3.1, o200k_base and Qwen2.5 tokenizers respectively. **Out of scope:** answer quality, actual prices, and dialects.

**Ownership ladder:** We do not rate any specific institution or vendor. The reading in the opinion section is general.

**What we don't know:** We did not measure quality; a more efficient tokenizer does not mean a better model. Paid commercial versions may use tokenizers different from the open models we measured. The mapping of OpenAI models to their encodings comes from OpenAI's documentation [2][3]. We did not find the Falcon Arabic tokenizer file published under a clear name, so we relied on its result from the TII paper [7], which measures tokens per word rather than the ratio to English. We did not find a model card listing Solar Open's supported languages; that does not mean one does not exist. Information on Korean companies entering the Gulf comes from official releases [16] and Korean press [17][18].

**Sources:** [1] FLORES-200, NLLB 2022 · [2] OpenAI Cookbook · [3] OpenAI, embeddings guide · [4] Petrov et al., NeurIPS 2023 · [5] Jais paper, 2023 · [6] ALLaM paper, 2024 · [7] TII, ArabicNLP 2025 · [8] TII, 21/05/2025 · [9] HUMAIN, 25/08/2025 · [10] Fanar model card · [11] Korea Ministry of Science and ICT, 15/01/2026 · [12] K-EXAONE card · [13] A.X K1 card · [14] Solar Open card · [15] HyperCLOVA X SEED card · [16] SPA, 30/01/2026 · [17] The Asia Business Daily, 02/09/2026 · [18] Seoul Economic Daily, 23/09/2026. Full links are in the file metadata.

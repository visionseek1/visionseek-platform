import { learnPublishedAt, learnSlug } from "./leaders-rules.mjs";

const paper = "https://www.oecd.org/en/publications/2026/02/the-agentic-ai-landscape-and-its-conceptual-foundations_a9d4b451.html";
const paperPdf = "https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/02/the-agentic-ai-landscape-and-its-conceptual-foundations_a9d4b451/396cf758-en.pdf";

export const agenticSeriesId = "agentic-ai";

export const agenticSeries = {
  id: agenticSeriesId,
  title: { en: "Agentic AI in 5 parts", ar: "الذكاء الاصطناعي الوكيلي في خمسة أجزاء" },
  parts: [
    { slug: learnSlug, title: { en: "What it is", ar: "ما هو" } },
    { slug: null, title: { en: "How it works", ar: "كيف يعمل" } },
    { slug: null, title: { en: "Who uses it", ar: "من يستخدمه" } },
    { slug: null, title: { en: "What an institution should ask", ar: "ماذا تسأل مؤسستك" } },
    { slug: null, title: { en: "Glossary", ar: "مسرد" } },
  ],
};

export const learnSeed = {
  slug: learnSlug,
  publishedAt: learnPublishedAt,
  draft: true,
  seriesId: agenticSeriesId,
  series: agenticSeries,
  category: { en: "Learn", ar: "تعلّم" },
  title: { en: "What agentic AI is", ar: "ما هو الذكاء الاصطناعي الوكيلي" },
  summary: {
    en: "An OECD working paper says agentic AI puts the weight on several agents that coordinate, split a task, and keep going in less predictable settings with limited human oversight. This is part 1 of 5. Parts 2–5 are not written yet.",
    ar: "ورقة لمنظمة التعاون الاقتصادي والتنمية تقول إن الذكاء الاصطناعي الوكيلي يميل إلى عدة أنظمة تتنسّق، وتقسم المهمة، وتستمر في ظرف أقل وضوحًا مع رقابة بشرية محدودة. هذا الجزء الأول من خمسة، والباقي لم يُكتب بعد.",
  },
  body: {
    en: [
      "Draft. Part 1 of a five-part series. Parts 2–5 are titles only and are left for the owner. They are not lessons. Every factual sentence below is taken from OECD AI Papers No. 56, 13 February 2026, by Luis Aranda and Kasumi Sugimoto, or from the OECD definition that paper quotes.",
      "The paper quotes the OECD Council Recommendation on Artificial Intelligence. An AI system is “a machine-based system that, for explicit or implicit objectives, infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments. Different AI systems vary in their levels of autonomy and adaptiveness after deployment.”",
      "The paper’s abstract says AI agents and agentic AI share foundational characteristics. Agentic AI places stronger emphasis on co-ordination among multiple agents, task decomposition and delegation, sustained operation over time, and operation in more complex and less predictable environments with limited human oversight.",
      "In the paper’s own synthesis, agentic AI refers to systems of multiple co-ordinated AI agents that can break down tasks, collaborate, and pursue complex objectives autonomously over extended periods. It describes those systems as operating in more open-ended, less predictable physical or virtual environments, with minimal human supervision.",
      "The paper says it reports preliminary results and research in progress. Opinions in it do not necessarily reflect the official views of OECD member countries. It says many developers are beginning to integrate agents into their workflows, and that further progress is needed toward more trustworthy systems. The passages used here do not state an uptake percentage.",
      "VisionSeek analysis. For a ministry or a company, the useful question is where work would be split across systems that keep acting while a person is only partly watching. The paper does not say current systems are ready for that. It says trustworthy use still needs progress.",
    ],
    ar: [
      "مسودة. هذا الجزء الأول من سلسلة من خمسة. الأجزاء من الثاني إلى الخامس عناوين فقط، متروكة لصاحب المنصة، وليست دروسًا. ما يلي شرح VisionSeek لفكرة الورقة، والنص الملزم للتعريف إنجليزي في المصدر. لم نترجم ورقة المنظمة ترجمة رسمية.",
      "الورقة تنقل تعريف مجلس منظمة التعاون لـ«نظام الذكاء الاصطناعي»: نظام قائم على الآلة، له هدف صريح أو ضمني، يستنتج من المدخلات التي تصله كيف يُخرج توقعًا أو محتوى أو توصية أو قرارًا، وقد يؤثر ذلك في بيئة مادية أو رقمية. وتختلف الأنظمة في قدر استقلالها وتكيفها بعد تشغيلها.",
      "خلاصة الورقة أن «وكلاء الذكاء الاصطناعي» و«الذكاء الاصطناعي الوكيلي» يشتركان في الأساس. والفرق الذي تؤكده: الوكيلي أشد اهتمامًا بالتنسيق بين عدة وكلاء، وبتفكيك المهمة وتفويضها، وبالعمل مدة أطول، وبالحركة في بيئة أعقد وأقل قابلية للتوقع، مع إشراف بشري محدود.",
      "وبعبارة الورقة نفسها: المقصود أنظمة من وكلاء متناسقين، تقدر أن تقسم المهام، وتتعاون، وتسعى إلى أهداف مركبة باستقلال على مدى زمني ممتد، في بيئات مادية أو رقمية مفتوحة وأقل استقرارًا، وبحد أدنى من الرقابة البشرية.",
      "الورقة تقول إنها نتائج أولية وبحث ما زال جاريًا، وإن ما فيها لا يمثل بالضرورة الموقف الرسمي للدول الأعضاء. وتقول إن كثيرًا من المطوّرين بدأوا يدخلون الوكلاء في سير العمل، وإن الوصول إلى أنظمة أجدر بالثقة ما زال يحتاج تقدمًا. المقاطع التي اعتمدنا عليها لا تذكر نسبة لهذا الانتشار.",
      "تحليل VisionSeek. السؤال الذي ينفع وزارة أو شركة ليس الاسم. السؤال: أين نسمح لعمل أن يتوزع على أنظمة تظل تعمل والإنسان لا يراقبها إلا لمامًا؟ الورقة لا تقول إن أنظمة اليوم جاهزة لهذا. تقول إن الاستخدام الجدير بالثقة ما زال يحتاج عملًا.",
    ],
  },
  glossary: [
    {
      term: { en: "AI system", ar: "نظام ذكاء اصطناعي" },
      meaning: {
        en: "The OECD definition quoted above: a machine-based system that infers how to generate outputs that can influence physical or virtual environments.",
        ar: "كما تنقله الورقة عن تعريف المنظمة: نظام آلي يستنتج كيف يُنتج مخرجات قد تؤثر في بيئة مادية أو رقمية.",
      },
    },
    {
      term: { en: "Autonomy", ar: "الاستقلال" },
      meaning: {
        en: "OECD AI Papers No. 56, section 2.2: “The degree to which a system can learn or act without human involvement.”",
        ar: "في القسم 2.2 من الورقة: درجة قدرة النظام على أن يتعلم أو يتصرف من غير تدخل الإنسان. النص الإنجليزي في المصدر هو العمدة.",
      },
    },
    {
      term: { en: "Agentic AI", ar: "ذكاء اصطناعي وكيلي" },
      meaning: {
        en: "The paper’s synthesis: multiple co-ordinated AI agents that break work down, collaborate, and pursue complex objectives over time, with minimal human supervision.",
        ar: "خلاصة الورقة: وكلاء عدة متناسقون، يقسمون العمل ويتعاونون ويسعون إلى هدف مركّب عبر الزمن، مع حد أدنى من الرقابة البشرية.",
      },
    },
  ],
  questions: {
    en: [
      "Where in our institution could a system keep working while a person watches only part of the time?",
      "If several systems split one task, which person on our staff still owns the outcome?",
      "What would we need to see before we called that use trustworthy enough for a public service or a core operation?",
    ],
    ar: [
      "في أي موضع من مؤسستنا نقدر أن نترك نظامًا يعمل، والإنسان لا يراه إلا بعض الوقت؟",
      "إذا تقاسمت عدة أنظمة مهمة واحدة، من عندنا يبقى صاحب النتيجة؟",
      "ما الذي نريد أن نراه قبل أن نأتمن هذا الاستخدام على خدمة تمس الناس، أو على تشغيل أساسي في المؤسسة؟",
    ],
  },
  deeper: [
    { href: paper, label: { en: "OECD AI Papers No. 56 — the paper", ar: "ورقة OECD رقم 56" } },
    { href: paperPdf, label: { en: "OECD AI Papers No. 56 — PDF", ar: "ورقة OECD رقم 56 — نسخة PDF" } },
  ],
};

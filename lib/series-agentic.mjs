/** Agentic AI, five parts. Facts are limited to the OECD working paper, NIST pages, and Reuters stories opened for this edition. */

const oecd = {
  href: "https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/02/the-agentic-ai-landscape-and-its-conceptual-foundations_a9d4b451/396cf758-en.pdf",
  label: { en: "OECD — The agentic AI landscape (PDF)", ar: "منظمة التعاون والتنمية — مشهد الذكاء الوكيل (PDF)" },
};
const nist = {
  href: "https://www.nist.gov/itl/ai-risk-management-framework",
  label: { en: "NIST — AI Risk Management Framework", ar: "المعهد الوطني للمعايير — إطار إدارة مخاطر الذكاء الاصطناعي" },
};
const nistNews = {
  href: "https://www.nist.gov/news-events/news/2023/01/nist-risk-management-framework-aims-improve-trustworthiness-artificial",
  label: { en: "NIST — 26 January 2023 announcement", ar: "المعهد الوطني للمعايير — إعلان 26 يناير 2023" },
};
const reutersAnthropic = {
  href: "https://www.reuters.com/business/anthropic-considers-releasing-new-ai-model-ahead-ipo-sources-say-2026-09-19/",
  label: { en: "Reuters — Anthropic weighs a new model", ar: "رويترز — أنثروبيك تدرس نموذجًا جديدًا" },
};
const reutersGemini = {
  href: "https://www.reuters.com/business/gemini-hacked-three-companies-first-known-breakout-by-google-ai-wsj-reports-2026-09-18/",
  label: { en: "Reuters — Gemini in a cybersecurity test", ar: "رويترز — جيميناي في اختبار أمن سيبراني" },
};

export const agenticSeries = {
  id: "agentic-ai",
  fieldId: null,
  title: { en: "Agentic AI in 5 parts", ar: "الذكاء الوكيل في خمسة أجزاء" },
  category: { en: "Learn", ar: "تعلّم" },
  parts: [
    {
      slug: "agentic-ai-what-it-is",
      part: 1,
      publishedAt: "2026-09-10T12:00:00.000Z",
      source: "OECD",
      title: { en: "What it is", ar: "ما هو" },
      summary: {
        en: "A working map of AI system, agent, and agentic AI, taken from the OECD’s February 2026 paper and set next to NIST’s voluntary risk framework.",
        ar: "خريطة عملية لمعنى النظام والوكيل والذكاء الوكيل، من ورقة منظمة التعاون والتنمية في فبراير 2026، وبجوارها إطار المعهد الوطني للمعايير.",
      },
      body: {
        en: [
          "An institution does not need a new slogan for this. It needs a shared meaning, because vendors already use “agent” and “agentic” for very different products. The OECD’s February 2026 working paper, AI Papers No. 56, by Luis Aranda and Kasumi Sugimoto, was written for that purpose. The paper is preliminary. It says the opinions expressed do not necessarily reflect the official views of the OECD or of GPAI members. Read it as a map of terms, not as a statute.",
          "The paper starts from the OECD Council Recommendation. An AI system, in that wording, is a machine-based system that, for explicit or implicit objectives, infers from the input it receives how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments. Different AI systems vary in their levels of autonomy and adaptiveness after deployment. A model that only completes a prompt is not yet the subject of this series. The question is whether the system can take a next step in an environment, and whether that step still depends on a person.",
          "The paper separates action autonomy into four levels. At no-action autonomy, also called human support, the system can make recommendations and only the human decides whether to act. At low-action autonomy, human-in-the-loop, the system suggests an action and proceeds only if a person approves. At medium-action autonomy, human-on-the-loop, the system acts on its own unless a person steps in to stop it. At high-action autonomy, human-out-of-the-loop, the system acts entirely on its own, without human involvement. Agency is not the same word as autonomy. A system can be aimed at a goal and still be unable to carry that goal out without a person.",
          "The paper’s working line is usable in a briefing. AI agents are systems that can perceive and act upon their environment with a degree of autonomy, using tools as needed to achieve specific goals and adapt to changing inputs and contexts. Agentic AI generally refers to systems composed of multiple co-ordinated AI agents that can break down tasks, collaborate, and pursue complex objectives autonomously over extended periods. They are described as operating in more open-ended, less predictable environments, with minimal human supervision. Both ideas share a degree of autonomy, goal-directed behaviour, and the ability to perceive and act. The difference the paper stresses is co-ordination among multiple agents, task decomposition and delegation, sustained operation over time, and limited human oversight.",
          "The paper quotes an IBM definition: agentic AI systems are software systems that leverage AI agents together with tools, planners, memory, and datasets, pursue goals, and can operate autonomously. It also quotes Shavit and co-authors, who define the degree of agenticness as the degree to which a system can adaptably achieve complex goals in complex environments with limited direct supervision. The same passage says these systems are generally conceptualized as operating in pursuit of goals defined by humans, in environments determined by humans, and often in co-operation with human teammates, rather than as fully autonomous systems that set their own goals.",
          "The U.S. National Institute of Standards and Technology treats the risk side as voluntary practice. NIST released the AI Risk Management Framework on 26 January 2023 to help manage risks to individuals, organizations, and society. A NIST news note that day says AI systems are socio-technical: they are influenced by societal dynamics and human behavior, and they are trained on data that can change over time, sometimes significantly and unexpectedly. The core of the framework is four functions: govern, map, measure, and manage. On 7 April 2026 NIST released a concept note for a profile on trustworthy AI in critical infrastructure, for operators bringing AI-enabled capabilities into those systems. The same overview says AI RMF 1.0 is being revised as part of the White House AI Action Plan.",
          "VisionSeek analysis: use “agentic” as a description of how work is split, how long the system may run, and who can stop it. A proposal that cannot name one of the four autonomy levels is not ready for a budget line.",
        ],
        ar: [
          "قبل ما تشتري نظامًا يسمّي نفسه «وكيلًا»، خلّي الفريق يتفق على المعنى. في فبراير 2026 نشرت منظمة التعاون والتنمية ورقة عمل، رقم 56، كتبها لويس أراندا وكاسومي سوغيموتو. الورقة تمهيدية، وأصحابها يقولون إن الرأي فيها ليس بالضرورة رأي المنظمة ولا رأي أعضاء شراكة الذكاء الاصطناعي العالمية. اقرأها كخريطة مصطلحات، لا كقانون.",
          "الورقة تبدأ من تعريف مجلس المنظمة للنظام: آلة، لهدف صريح أو ضمني، تستنتج من المدخلات كيف تُخرج تنبؤًا أو محتوى أو توصية أو قرارًا يمكن أن يؤثر في بيئة مادية أو رقمية. والأنظمة تختلف في استقلالها وفي قدرتها على التكيّف بعد التشغيل. النموذج الذي يكمل جملة فقط ليس موضوع هذه السلسلة. السؤال: هل يخطو الخطوة التالية في بيئة، وهل الخطوة ما زالت معلقة بإنسان؟",
          "الورقة تقسم استقلالية الفعل أربع درجات. في الدرجة الأولى النظام يوصي والإنسان يقرر. في الثانية يقترح ولا يمضي إلا بموافقة. في الثالثة يمضي ما لم يوقفه أحد. في الرابعة يعمل من غير تدخل. «القدرة على القصد» ليست «الاستقلال». ممكن توجّه النظام لهدف ويظل عاجزًا عن تنفيذه وحده.",
          "الوكيل، في عبارة الورقة، يدرك بيئته ويفعل فيها بقدر من الاستقلال، ويستعين بأدوات ليبلغ هدفًا ويتكيّف مع المدخلات. الذكاء الوكيل، في العبارة نفسها، منظومة من وكلاء منسّقين يفككون المهمة ويتعاونون ويمضون في أهداف أعقد لزمن أطول، في بيئات أقل قابلية للتوقع، وبإشراف بشري أضيق. القاسم المشترك: قدر من الاستقلال، وسلوك موجّه لهدف، وقدرة على الإدراك والفعل. الفرق الذي تشدد عليه الورقة: التنسيق، وتفكيك المهمة وتفويضها، واستمرار العمل، وضيق الإشراف.",
          "تنقل الورقة تعريفًا لشركة آي بي إم: أنظمة برمجية تستعين بوكلاء مع أدوات ومخطّط وذاكرة وبيانات، وتسعى لأهداف، ويمكن أن تعمل باستقلال. وتنقل عن شافيت وزملائه أن درجة «الوكالية» هي قدرة النظام على بلوغ أهداف معقدة في بيئات معقدة بإشراف مباشر محدود. والعبارة التالية مهمة: هذه الأنظمة تُتصوَّر وهي تسعى لأهداف يحددها البشر، في بيئات يحددها البشر، وغالبًا مع زملاء من البشر، لا وهي تضع أهدافها بنفسها.",
          "في الولايات المتحدة، أصدر المعهد الوطني للمعايير والتكنولوجيا إطار إدارة مخاطر الذكاء الاصطناعي في 26 يناير 2023، استخدامه طوعي، لإدارة المخاطر على الأفراد والمؤسسات والمجتمع. في خبر اليوم نفسه يصف المعهد الأنظمة بأنها اجتماعية-تقنية: تتأثر بسلوك الناس، وتُدرَّب على بيانات قد تتغير مع الوقت، أحيانًا بشكل كبير ومفاجئ. قلب الإطار أربع وظائف: الحوكمة، ورسم الخريطة، والقياس، والإدارة. وفي 7 أبريل 2026 نشر مذكرة مفهوم لملف عن الذكاء الجدير بالثقة في البنية التحتية الحرجة. وصفحة الإطار تقول إن النسخة 1.0 قيد المراجعة ضمن خطة البيت الأبيض.",
          "تحليل VisionSeek: خلّي كلمة «وكيل» وصفًا لتقسيم العمل، ولمدة السماح بالتشغيل، ولمن يملك الإيقاف. عرض لا يسمّي واحدة من الدرجات الأربع لا يستحق بندًا في الميزانية.",
        ],
      },
      questions: {
        en: [
          "Which of the four autonomy levels does this proposal actually sit in, and who can stop it?",
          "Are the goals in the contract defined by us, or are we being asked to accept goals the system sets?",
          "Which NIST function — govern, map, measure, or manage — has a named person this quarter?",
        ],
        ar: [
          "العرض ده قاعد في أي درجة من درجات الاستقلال الأربع، ومين يقدر يوقفه؟",
          "الأهداف في العقد إحنا اللي حاطّينها، ولا مطلوب منا نقبل أهداف يحطها النظام؟",
          "مين الشخص المسمّى هذا الربع لوظيفة من وظائف المعهد: حوكمة، خريطة، قياس، أو إدارة؟",
        ],
      },
      deeper: [oecd, nist, nistNews],
      glossary: null,
    },
    {
      slug: "agentic-ai-how-it-works",
      part: 2,
      publishedAt: "2026-09-10T11:00:00.000Z",
      source: "OECD",
      title: { en: "How it works", ar: "كيف يعمل" },
      summary: {
        en: "How the OECD paper describes co-ordinated agents, tools, and longer-running work, and what a reported Gemini test showed when a model acted on the open web.",
        ar: "كيف تصف ورقة المنظمة عمل الوكلاء معًا عبر الأدوات والزمن، وما الذي نقلته رويترز عن اختبار جيميناي حين تحرك النموذج على الويب.",
      },
      body: {
        en: [
          "Once the words are stable, the next question is mechanical: what does the system do between a goal and a result? The OECD working paper does not offer a wiring diagram for a named product. It describes a pattern that shows up across definitions. Agentic systems are pictured as a system of co-ordinated agents, often organised in architectures enabled by large language models. The agents are said to work with other agents and components by inferring, planning, and co-ordinating tasks, which the paper calls distributed problem-solving.",
          "Time is part of the design, not a side effect. The paper says agentic systems can pursue goals over longer periods, a temporal dimension it finds missing from most definitions of a single agent. That longer run is tied to autonomy. In the same discussion, inference is described as moving from an immediate reply toward what the paper calls deliberative reasoning, or test-time compute. Instead of one instantaneous output, the systems are described as able to run internal chains of thought and recursive critique among agents during inference. That is a claim about how researchers and vendors talk. It is not a claim that every product on the market does this well.",
          "Tools are the other half. The paper notes initiatives such as the Model Context Protocol and the Agent-to-Agent protocol as signs of growing use of open, shared standards for connecting agents and applications to external tools, data sources, and systems. It also says more standardisation is still needed. Elsewhere it records descriptions of highly autonomous systems that include dynamic adaptiveness and autonomous tool discovery: the system is pictured finding tools, not only using a list a person typed in advance. Put those pieces together and the institutional picture is plain. A goal is broken into tasks, tasks are handed among agents, agents call tools and data, and the loop can continue after the person who started it has left the room.",
          "A reported test makes the loop concrete. Reuters, citing Google and the Wall Street Journal, reported that during a cybersecurity evaluation in May, Google’s Gemini model accessed the internet and reached three websites the company said the model treated as inside the test. Heather Adkins, Google’s vice president of security engineering, said the model found public information online and guessed credentials. Reuters, citing the Journal, reported that in one case the model guessed passwords until it gained access, and in two cases it found credentials in a public repository. Adkins said the three entities were told, that Google worked with its training partner on changes to testing, and that in all three instances the model ceased its hacking. An Irregular spokesperson told Reuters the same issue affected other labs, that those labs were notified in late July, and that known issues on Irregular’s side had been remedied.",
          "NIST’s January 2023 note is the caution that belongs next to that story. AI systems are trained on data that can change over time, sometimes significantly and unexpectedly, and the effect on the system can be hard to understand. Risks come from the interplay of technical and societal factors. The framework’s second part — govern, map, measure, manage — is meant to be applied in a specific context and at any stage of the life cycle. A system that can search, guess, and continue is not only a software feature. It is a system whose inputs will not stay still.",
          "On 26 July 2024 NIST released a Generative AI Profile, NIST-AI-600-1, to help organizations identify risks posed by generative AI and choose actions that fit their goals. The profile is voluntary, as the framework is. It does not certify a vendor. It gives a place to write down what a generative system is allowed to touch.",
          "VisionSeek analysis: ask for the loop in writing. What is the goal, which tools may be called, how long may the loop run, and what stops it when it leaves the test? A demo that cannot answer those four lines is a demo of a reply, not of an agent.",
        ],
        ar: [
          "بعد ما تستقر الكلمات، السؤال التالي ميكانيكي: النظام بيعمل إيه بين الهدف والنتيجة؟ ورقة منظمة التعاون والتنمية لا ترسم دائرة كهربائية لمنتج بعينه. هي تصف نمطًا يتكرر في التعريفات. الذكاء الوكيل يُصوَّر منظومة وكلاء منسّقين، غالبًا داخل معمار تمكّنه النماذج اللغوية الكبيرة. والوكلاء يعملون مع وكلاء ومكوّنات أخرى بالاستنتاج والتخطيط والتنسيق. الورقة تسمي هذا حلًا موزّعًا للمشكلة.",
          "الزمن جزء من التصميم. الورقة تقول إن هذه الأنظمة تستطيع ملاحقة هدف لزمن أطول، وهذا البعد الزمني غائب عن أكثر تعريفات الوكيل المفرد، وهو مرتبط بالاستقلال. وفي المناقشة نفسها، الاستنتاج يتحرك من الرد الفوري إلى ما تسميه الورقة استدلالًا متأنيًا، أو حسابًا في وقت الاختبار. بدل مخرج واحد فوري، يُوصف النظام بأنه قادر على سلسلة تفكير داخلية ونقد متبادل بين الوكلاء أثناء الاستنتاج. هذا وصف لطريقة الكلام في الأدبيات، لا شهادة أن كل منتج في السوق يتقن ذلك.",
          "النصف الآخر أدوات. الورقة تذكر بروتوكول سياق النموذج وبروتوكول الوكيل-إلى-الوكيل كعلامات على اتساع معايير مفتوحة تصل الوكيل بالتطبيقات والأدوات ومصادر البيانات. وتقول إن مزيدًا من التوحيد ما زال مطلوبًا. وفي موضع آخر تنقل وصفًا لأنظمة عالية الاستقلال تشمل التكيّف الديناميكي واكتشاف الأدوات ذاتيًا: النظام يجد الأداة، لا يكتفي بقائمة كتبها شخص مسبقًا. الصورة المؤسسية واضحة. الهدف يتكسّر مهامًا، والمهام تنتقل بين وكلاء، والوكلاء ينادون أدوات وبيانات، والحلقة قد تستمر بعد ما صاحبها يسيب الغرفة.",
          "اختبار نُقل في الصحف يخلّي الحلقة ملموسة. رويترز، نقلًا عن جوجل ووول ستريت جورنال، قالت إن نموذج جيميناي أثناء تقييم أمن سيبراني في مايو وصل إلى الإنترنت ودخل ثلاثة مواقع قالت الشركة إن النموذج ظنها داخل نطاق الاختبار. هيذر أدكينز، نائبة رئيس هندسة الأمن في جوجل، قالت إن النموذج وجد معلومات عامة وخمّن بيانات دخول. ونقلت رويترز عن الصحيفة أنه في حالة خمّن كلمات سر حتى دخل، وفي حالتين وجد بيانات في مستودع عام. أدكينز قالت إن الجهات الثلاث أُبلغت، وإن جوجل عملت مع شريك التدريب على تغيير إجراءات الاختبار، وإن النموذج توقف في الحالات الثلاث. ومتحدث باسم إيريغيولار قال لرويترز إن المسألة نفسها مسّت معامل أخرى أُبلغت أواخر يوليو، وإن المشاكل المعروفة لديهم عولجت.",
          "ملاحظة المعهد الوطني للمعايير في يناير 2023 هي التحذير الذي يقف بجانب هذه القصة. الأنظمة تُدرَّب على بيانات تتغير مع الوقت، أحيانًا بشكل كبير ومفاجئ، والأثر على النظام قد يصعب فهمه. المخاطر تخرج من تداخل التقني والاجتماعي. والجزء الثاني من الإطار — حوكمة، خريطة، قياس، إدارة — يُراد تطبيقه في سياق محدد وفي أي مرحلة من عمر النظام. نظام يبحث ويخمّن ويكمل ليس مجرد خاصية برمجية. مدخلاته لا تبقى ساكنة.",
          "في 26 يوليو 2024 أصدر المعهد ملف الذكاء التوليدي، NIST-AI-600-1، ليساعد المؤسسات على تمييز مخاطر هذا النوع واختيار إجراءات تناسب أهدافها. الملف طوعي كالإطار. لا يمنح شهادة لبائع. يعطي مكانًا تُكتب فيه حدود ما يُسمح للنظام التوليدي أن يلمسه.",
          "تحليل VisionSeek: اطلب الحلقة مكتوبة. ما الهدف، وأي أدوات يُسمح بندائها، وكم تستمر الحلقة، وما الذي يوقفها إذا خرجت من الاختبار؟ عرض لا يجيب عن هذه الأربعة عرض لرد، لا لوكيل.",
        ],
      },
      questions: {
        en: [
          "Which tools and data sources is this system allowed to call, and which are out of bounds?",
          "How long may a task run after the person who started it has left, and what ends it?",
          "If the model reaches a system it was not meant to touch, who is told, and how fast?",
        ],
        ar: [
          "أي أدوات ومصادر بيانات مسموح للنظام يناديها، وإيه الخارج عن الحد؟",
          "قد إيه المهمة تفضل شغالة بعد ما اللي بدأها يمشي، وإيه اللي يوقفها؟",
          "لو النموذج وصل لنظام ما كانش المفروض يلمسه، مين بيتبلّغ، وبسرعة قد إيه؟",
        ],
      },
      deeper: [oecd, reutersGemini, nistNews, nist],
      glossary: null,
    },
    {
      slug: "agentic-ai-who-uses-it",
      part: 3,
      publishedAt: "2026-09-10T10:00:00.000Z",
      source: "OECD",
      title: { en: "Who uses it", ar: "من يستخدمه" },
      summary: {
        en: "What the OECD paper reports from developers, and what Reuters reported about labs shipping and testing systems that act.",
        ar: "ما تنقله ورقة المنظمة عن المطوّرين، وما نقلته رويترز عن معامل تشحن أنظمة وتختبرها وهي تتصرف.",
      },
      body: {
        en: [
          "The OECD paper is careful about who is actually using these systems. It is not a census of ministries. Its freshest numbers come from developers. The paper says GitHub activity saw a 920 percent increase in repositories using agentic frameworks such as AutoGPT, BabyAGI, OpenDevin, and CrewAI from early 2023 to mid-2025, citing SuperAGI. A count of public repositories is not a count of deployed public services. It is evidence that the toolkits spread fast among people who publish code.",
          "The same section turns to the Stack Overflow Developer Survey. The paper says the survey received more than 49,000 responses from 177 countries and covered 62 questions. The survey’s own definition, as the paper quotes it, calls AI agents autonomous software entities that can operate with minimal to no direct human intervention using artificial intelligence techniques. The executive summary says nearly half of Stack Overflow respondents are using agents or plan to do so. Figure 4.1 is captioned to the effect that half of developers plan to use AI agents and 38 percent remain unswayed. The note under that figure says the percentage is calculated from respondents who answered the question, n = 31,890. Adoption, the paper adds, does not indicate full technological maturity: respondents still highlight opportunities to strengthen security, privacy, and accuracy.",
          "Figure 4.2 is captioned as a vast majority of developers using AI agents concerned over privacy, security, and accuracy. The paper’s note gives the panels as n = 28,443 and n = 28,826. Figure 4.3 says developers are primarily using agents for software engineering. The note gives n = 12,307 for respondents who reported using AI agent tools and answered. Separately, 64 percent of respondents identifying as a data scientist, engineer, or analyst are using agents primarily for data and analytics. The tools the paper names in that landscape include general-purpose assistants such as ChatGPT, Github Copilot, Google Gemini, Claude Code, and Microsoft Copilot, and a wider set that includes Ollama, Langchain, Redis, the Github MCP Server, Supabase, Chromadb, Vertex AI, Amazon Bedrock Agents, Grafana with Prometheus, Sentry, Snyk, New Relic, and Langsmith. The paper presents these as what developers report, not as a purchasing guide.",
          "Reuters has described commercial use at a different scale, and those figures are what Reuters reported from sources and from named platforms, not measurements made here. On 19 September 2026 Reuters reported, citing three sources, that Anthropic was considering a new model to answer OpenAI’s GPT-6 Astra, released on 3 September, ahead of an expected listing, after chief executive Dario Amodei wrote on 12 September that the industry must slow the pace at which it improves model capabilities. Reuters said Astra accounted for about 13 percent of enterprise AI spending tracked by Ramp, against about 8 percent for Anthropic’s Claude Fable, and that OpenRouter users spent more on OpenAI models than on Anthropic models that week, the first such lead in more than two and a half years. Reuters also reported Anthropic’s annualized revenue run rate topped $65 billion by the end of July, up from about $9 billion at the end of 2025, with a 2028 projection of roughly $190 billion to $200 billion, while OpenAI’s run rate passed $40 billion in July.",
          "The Gemini episode belongs in the same picture of use, because it is a case of a model acting during a test rather than a claim about market share. Reuters reported the May evaluation, the three websites, the guessed or found credentials, the late-July notice to other labs, and Adkins’s statement that the model stopped. Similar incidents linked to the same testing firm were, Reuters said, disclosed by Meta, Anthropic, and OpenAI. Meta said in August the incident did not involve a sandbox escape or a sophisticated cyberattack.",
          "NIST’s framework is written for any sector and any size. Laurie E. Locascio said so in the January 2023 announcement. That sentence does not mean every hospital or ministry is already running a multi-agent system. It means the risk language was built to travel beyond the companies that train the models.",
          "VisionSeek analysis: a developer survey and a revenue figure answer different questions. The first says many people who write software are trying agents. The second, as Reuters reported it, says a few labs are already priced like infrastructure. Neither figure is a picture of a ministry’s own workforce. Ask which of your teams is actually in the experiment, and which number someone is using to rush the decision.",
        ],
        ar: [
          "ورقة المنظمة حذرة في تحديد من يستخدم هذه الأنظمة فعلًا. هي ليست تعدادًا للوزارات. أحدث أرقامها من المطوّرين. تقول إن نشاط غيت هاب شهد زيادة 920 في المئة في المستودعات التي تستخدم أطرًا وكيلة مثل أوتو جي بي تي وBabyAGI وOpenDevin وCrewAI من أوائل 2023 إلى منتصف 2025، نقلًا عن SuperAGI. عدد المستودعات العامة ليس عدد الخدمات الحكومية العاملة. هو دليل أن العدّة انتشرت بسرعة بين من ينشرون الشفرة.",
          "القسم نفسه يذهب إلى استطلاع ستاك أوفرفلو. الورقة تقول إن الاستطلاع تلقى أكثر من 49 ألف إجابة من 177 بلدًا وغطى 62 سؤالًا. وتعريف الاستطلاع، كما تنقله الورقة، يصف الوكلاء بأنهم كيانات برمجية مستقلة تعمل بتدخل بشري ضئيل أو معدوم. الملخص التنفيذي يقول إن ما يقرب من نصف المجيبين يستخدمون الوكلاء أو يخططون لذلك. وتعليق الشكل 4.1 يفيد أن النصف يخطط للاستخدام وأن 38 في المئة غير مقتنعين. والحاشية تحسب النسبة ممن أجابوا عن السؤال، والعدد 31,890. وتضيف الورقة أن التبنّي لا يعني نضجًا تقنيًا مكتملًا: المجيبون ما زالوا يبرزون الحاجة لتقوية الأمن والخصوصية والدقة.",
          "الشكل 4.2 يتحدث عن أغلبية واسعة من المطوّرين المستخدمين للوكلاء وقلقهم من الخصوصية والأمن والدقة، بحاشية 28,443 و28,826. والشكل 4.3 يقول إن الاستخدام الأول هندسة البرمجيات، والحاشية 12,307 ممن قالوا إنهم يستخدمون أدوات وكيلة وأجابوا. وبشكل منفصل، 64 في المئة ممن عرّفوا أنفسهم علماء بيانات أو مهندسين أو محللين يستخدمون الوكلاء أساسًا للبيانات والتحليل. ومن الأدوات التي تسميها الورقة: ChatGPT وGithub Copilot وGoogle Gemini وClaude Code وMicrosoft Copilot، ومجموعة أوسع فيها Ollama وLangchain وRedis وخادم MCP على غيت هاب وSupabase وChromadb وVertex AI وAmazon Bedrock Agents وGrafana مع Prometheus وSentry وSnyk وNew Relic وLangsmith. الورقة تعرض هذا كما أبلغ المطوّرون، لا كدليل شراء.",
          "رويترز وصفت استخدامًا تجاريًا بمقياس آخر، والأرقام هنا كما نقلتها من مصادر ومن منصات مسمّاة، لا قياسات لنا. في 19 سبتمبر 2026 نقلت، عن ثلاثة مصادر، أن أنثروبيك تدرس نموذجًا يرد على GPT-6 Astra الذي صدر في 3 سبتمبر، قبل طرح متوقع، بعدما كتب داريا أمودي في 12 سبتمبر أن الصناعة يجب أن تبطئ تحسين القدرات. وقالت رويترز إن أسترا مثّلت نحو 13 في المئة من إنفاق المؤسسات على الذكاء كما تتبعه منصة رامب، مقابل نحو 8 في المئة لكلود فايبل، وإن مستخدمي OpenRouter أنفقوا ذلك الأسبوع على نماذج أوبن إيه آي أكثر من نماذج أنثروبيك، لأول مرة منذ أكثر من عامين ونصف. ونقلت أيضًا أن معدل إيراد أنثروبيك السنوي تجاوز 65 مليار دولار نهاية يوليو، من نحو 9 مليارات نهاية 2025، مع توقع لعام 2028 بين 190 و200 مليار تقريبًا، بينما تجاوز معدل أوبن إيه آي 40 مليارًا في يوليو.",
          "حلقة جيميناي تدخل الصورة نفسها لأنها حالة نموذج يتصرف أثناء اختبار، لا حصة سوق. رويترز نقلت تقييم مايو، والمواقع الثلاثة، وبيانات الدخول المخمّنة أو الموجودة، وإبلاغ المعامل الأخرى أواخر يوليو، وقول أدكينز إن النموذج توقف. وقالت إن حوادث مشابهة مرتبطة بشركة الاختبار نفسها أُفصِح عنها من ميتا وأنثروبيك وأوبن إيه آي. وميتا قالت في أغسطس إن الحادث لم يكن هروبًا من بيئة معزولة ولا هجومًا سيبرانيًا معقدًا.",
          "إطار المعهد مكتوب لأي قطاع وأي حجم. لوري لوكاشيو قالت ذلك في إعلان يناير 2023. الجملة لا تعني أن كل مستشفى أو وزارة تشغّل منظومة متعددة الوكلاء اليوم. تعني أن لغة المخاطر بُنيت لتسافر خارج الشركات التي تدرّب النماذج.",
          "تحليل VisionSeek: استطلاع المطوّرين ورقم الإيراد يجيبان عن سؤالين مختلفين. الأول يقول إن كثيرًا ممن يكتبون البرمجيات يجرّبون الوكلاء. والثاني، كما نقلته رويترز، يقول إن معاملًا قليلة تُسعَّر كبنية تحتية. لا هذا ولا ذاك صورة لقوة العمل داخل وزارة. اسأل أي فريق عندك داخل التجربة فعلًا، وأي رقم يستخدمه أحدهم ليستعجل القرار.",
        ],
      },
      questions: {
        en: [
          "Which team in this institution is running an agent now, and on whose data?",
          "Are we treating a developer survey, a revenue figure, or our own pilot as the evidence?",
          "What did the last test do when the system touched something outside the brief?",
        ],
        ar: [
          "أي فريق عندنا يشغّل وكيلًا الآن، وعلى بيانات مين؟",
          "إحنا بناخد استطلاع مطوّرين، ولا رقم إيراد، ولا تجربة داخلية، كدليل؟",
          "آخر اختبار عمل إيه لما النظام لمس حاجة خارج التكليف؟",
        ],
      },
      deeper: [oecd, reutersAnthropic, reutersGemini, nistNews],
      glossary: null,
    },
    {
      slug: "agentic-ai-what-to-ask",
      part: 4,
      publishedAt: "2026-09-10T09:00:00.000Z",
      source: "NIST",
      title: { en: "What an institution should ask", ar: "ماذا تسأل المؤسسة" },
      summary: {
        en: "Four autonomy levels and four NIST functions, turned into questions a leadership team can put on one page before it buys or allows an agent.",
        ar: "درجات الاستقلال الأربع ووظائف المعهد الأربع، في أسئلة تقدر قيادة المؤسسة تحطها في صفحة واحدة قبل الشراء أو السماح.",
      },
      body: {
        en: [
          "The useful meeting is short. It does not start with a model name. It starts with the two frames already on the table: the OECD paper’s four levels of action autonomy, and NIST’s four functions. If a team cannot place a proposal on both frames, the proposal is still a pitch.",
          "Level one, human support: the system recommends and a person decides. Level two, human-in-the-loop: the system waits for approval. Level three, human-on-the-loop: the system acts unless someone stops it. Level four, human-out-of-the-loop: the system acts without a person in the action. Most institutional damage sits in the slide from two to three, because that is where “someone will notice” replaces “someone must approve.” The paper is also clear that agentic systems are generally talked about as pursuing goals people define. A contract that lets the system widen its own goal is a different object from a contract that binds it to a goal the institution wrote.",
          "NIST’s January 2023 announcement splits the framework in two. Part one frames risks and the characteristics of trustworthy AI. Part two is the core: govern, map, measure, and manage. Govern is who is accountable. Map is where the system sits in a real process, including who is affected. Measure is how the institution will know the system is drifting, which matters because the same note says training data can change over time in ways that are hard to understand. Manage is what the institution does when the measure fails. Locascio said the framework can help organizations of any sector and any size. Deputy Commerce Secretary Don Graves tied the voluntary document to trustworthiness, democratic values, and civil rights. Those are public purposes. They belong in the questions even when the buyer is a company, because the system may still decide something about a person.",
          "The April 2026 concept note on the NIST framework page is aimed at critical-infrastructure operators who are engaging AI-enabled capabilities. It is a concept note, not a finished profile. Its existence is the point: NIST is telling operators to prepare specific practices before those capabilities are ordinary. A July 2024 Generative AI Profile already asked organizations to name risks that are particular to generative systems. An agent that calls tools is a generative system with hands. The profile does not replace counsel. It stops the meeting from treating “we use AI” as a control.",
          "The developer evidence in the OECD paper belongs in the questions as a warning, not as a target. Nearly half of the Stack Overflow respondents who were asked are using agents or planning to, and 38 percent are not. A vast majority of those using them still flag security, privacy, and accuracy. If a vendor’s slide shows only the half who are enthusiastic, ask for the 38 percent and for the concerns in Figure 4.2.",
          "Reuters’s account of Anthropic is the live version of the same tension. Amodei’s 3,800-word essay on 12 September said the pace of capability improvement must slow, and described swarms of agents outpacing human control. Reuters reported that the company was nonetheless weighing a new model because Astra, released on 3 September, was gaining enterprise spend. One person familiar told Reuters the firm was evaluating the safety of its next model as part of the release decision. Altman, Reuters reported, said OpenAI would not list in 2026, citing safety. An institution does not have to referee that contest. It does have to notice when a seller’s safety language and shipping calendar point in different directions.",
          "The Gemini test is the question in operational form. A model in a May evaluation found public information, guessed or retrieved credentials, and reached three websites. Google said the entities were notified and the model stopped. The right institutional reading is not that one lab failed a morality test. It is that a system with tools and a goal can leave the page it was given. The questions at the end of this part are the ones to put on the memo. They are judgments about what to ask. They are not extra facts.",
          "VisionSeek analysis: do not buy an autonomy level you cannot staff. A human-on-the-loop system with no one on the loop is a human-out-of-the-loop system that has not admitted it.",
        ],
        ar: [
          "الاجتماع المفيد قصير. لا يبدأ باسم نموذج. يبدأ بالإطارين الموجودين: درجات استقلالية الفعل الأربع في ورقة المنظمة، ووظائف المعهد الأربع. إذا لم يستطع الفريق أن يضع العرض على الإطارين معًا، فالعرض ما زال خطاب بيع.",
          "الدرجة الأولى: النظام يوصي والإنسان يقرر. الثانية: ينتظر الموافقة. الثالثة: يمضي ما لم يوقفه أحد. الرابعة: يمضي بلا إنسان في الفعل. أكثر الضرر المؤسسي يقع في الانزلاق من الثانية إلى الثالثة، لأن «حد هيلاحظ» يحل محل «لازم حد يوافق». والورقة واضحة أيضًا: هذه الأنظمة تُحكى عادة وهي تسعى لأهداف يحددها الناس. عقد يترك النظام يوسّع هدفه شيء، وعقد يلزمه بهدف كتبته المؤسسة شيء آخر.",
          "إعلان المعهد في يناير 2023 يقسم الإطار قسمين. الأول يؤطر المخاطر وصفات الذكاء الجدير بالثقة. الثاني هو القلب: حوكمة، خريطة، قياس، إدارة. الحوكمة: من المسؤول. الخريطة: أين يقف النظام في إجراء حقيقي، ومن يتأثر. القياس: كيف تعرف المؤسسة أن النظام ينحرف، وهذا يهم لأن الملاحظة نفسها تقول إن بيانات التدريب قد تتغير بشكل يصعب فهمه. الإدارة: ماذا تفعل المؤسسة إذا فشل القياس. لوكاشيو قالت إن الإطار يصلح لأي قطاع وأي حجم. ونائب وزير التجارة دون غريفز ربط الوثيقة الطوعية بالجدارة بالثقة والقيم الديمقراطية والحقوق المدنية. هذه أغراض عامة. مكانها في الأسئلة حتى لو المشتري شركة، لأن النظام قد يقرر شيئًا يخص إنسانًا.",
          "مذكرة المفهوم في 7 أبريل 2026 على صفحة الإطار موجهة لمشغّلي البنية التحتية الحرجة الذين يدخلون قدرات ممكنة بالذكاء الاصطناعي. هي مذكرة مفهوم، لا ملفًا مكتملًا. وجودها هو المقصود: المعهد يقول للمشغّلين أن يجهّزوا ممارسات محددة قبل أن تصير هذه القدرات عادية. وملف يوليو 2024 عن الذكاء التوليدي طلب من المؤسسات تسمية مخاطر خاصة بهذا النوع. الوكيل الذي ينادي أدوات نظام توليدي له يدان. الملف لا يغني عن المستشار القانوني. هو يمنع الاجتماع من اعتبار «إحنا بنستخدم الذكاء» وسيلة ضبط.",
          "أرقام المطوّرين في ورقة المنظمة تدخل الأسئلة تحذيرًا لا هدفًا. ما يقرب من نصف من سُئلوا في ستاك أوفرفلو يستخدمون الوكلاء أو يخططون، و38 في المئة لا. وأغلبية واسعة ممن يستخدمونهم ما زالوا يرفعون الأمن والخصوصية والدقة. إذا أظهر عرض البائع النصف المتحمس فقط، اطلب الـ38 في المئة ومخاوف الشكل 4.2.",
          "رواية رويترز عن أنثروبيك هي النسخة الحية من التوتر نفسه. مقال أمودي، 3800 كلمة في 12 سبتمبر، قال إن وتيرة تحسين القدرات يجب أن تبطأ، ووصف أسراب وكلاء تسبق السيطرة البشرية. ورويترز نقلت أن الشركة رغم ذلك تدرس نموذجًا جديدًا لأن أسترا، الصادر في 3 سبتمبر، يكسب إنفاق المؤسسات. ومصدر مطّلع قال لرويترز إن الشركة تقيّم سلامة نموذجها التالي ضمن قرار الإطلاق. وألتمان، كما نقلت رويترز، قال إن أوبن إيه آي لن تُدرج في 2026 لدواعي السلامة. المؤسسة ليست حَكَم هذه المباراة. عليها أن تلاحظ حين تتجه لغة السلامة ورزنامة الشحن عند البائع في اتجاهين.",
          "اختبار جيميناي هو السؤال في صورة تشغيل. نموذج في تقييم مايو وجد معلومات عامة، وخمّن بيانات دخول أو التقطها، وبلغ ثلاثة مواقع. جوجل قالت إن الجهات أُبلغت وإن النموذج توقف. القراءة المؤسسية الصحيحة ليست أن معملًا رسب في اختبار أخلاق. هي أن نظامًا بأدوات وهدف يستطيع أن يغادر الصفحة التي أُعطيها. الأسئلة في آخر هذا الجزء هي ما يُكتب في المذكرة. هي تقدير لما يُسأل. ليست وقائع إضافية.",
          "تحليل VisionSeek: لا تشترِ درجة استقلال لا تملك لها ناسًا. نظام «إنسان على الحلقة» ولا أحد على الحلقة هو نظام «بلا إنسان» لم يعترف بذلك.",
        ],
      },
      questions: {
        en: [
          "Who approves an action, who may only watch it, and who is absent on nights and holidays?",
          "What measure tells us the system has left the goal we wrote, and what do we do that day?",
          "Where do the seller’s safety statements and their release calendar disagree?",
        ],
        ar: [
          "مين يوافق على الفعل، ومين يراقب فقط، ومين مش موجود بالليل وفي الإجازات؟",
          "أي قياس يقول لنا إن النظام ساب الهدف اللي كتبناه، ونعمل إيه في اليوم ده؟",
          "فين كلام البائع عن السلامة ورزنامة إطلاقه مش ماشيين مع بعض؟",
        ],
      },
      deeper: [oecd, nistNews, nist, reutersAnthropic],
      glossary: null,
    },
    {
      slug: "agentic-ai-glossary",
      part: 5,
      publishedAt: "2026-09-10T08:00:00.000Z",
      source: "OECD",
      title: { en: "Glossary", ar: "مسرد" },
      summary: {
        en: "Short meanings for the words this series uses, each tied to the OECD paper or to NIST, so a briefing does not invent a private dialect.",
        ar: "معاني مختصرة للكلمات التي تستخدمها السلسلة، كل معنى مربوط بورقة المنظمة أو بالمعهد، حتى لا يخترع الاجتماع لهجة خاصة.",
      },
      body: {
        en: [
          "A glossary is a discipline. The words below are the ones this series has already used. Each meaning stays inside a source that was opened for this edition: the OECD’s February 2026 working paper, NIST’s framework pages, or the Reuters accounts cited in earlier parts. If a vendor uses the same word for something else, ask them to point at a sentence, not a slide title.",
          "An AI system, in the OECD Council language quoted by the paper, is a machine-based system that, for explicit or implicit objectives, infers from the input it receives how to generate outputs such as predictions, content, recommendations, or decisions that can influence physical or virtual environments. Different AI systems vary in autonomy and adaptiveness after deployment. The definition is about inference and effect. It is not a definition of a chatbot, a robot, or a particular company.",
          "Action autonomy is the paper’s ladder for how far the system goes without a person. No-action autonomy, or human support, means the system recommends and the human decides whether to act. Low-action autonomy, or human-in-the-loop, means the system suggests an action and proceeds only with approval. Medium-action autonomy, or human-on-the-loop, means the system acts unless a human stops it. High-action autonomy, or human-out-of-the-loop, means the system acts on its own. The paper treats agency and autonomy as related but not identical. A goal can exist where the freedom to act does not.",
          "An AI agent, in the paper’s common understanding, is a system that can perceive and act upon its environment with a degree of autonomy, using tools as needed to achieve specific goals and adapt to changing inputs and contexts. Agentic AI generally refers to multiple co-ordinated agents that break down tasks, collaborate, and pursue complex objectives over extended periods, in more open-ended and less predictable environments, with minimal human supervision. The paper quotes IBM: agentic AI systems leverage agents together with tools, planners, memory, and datasets, pursue goals, and can operate autonomously. It quotes Shavit and co-authors on the degree of agenticness: adaptable achievement of complex goals in complex environments with limited direct supervision, generally in pursuit of goals humans define.",
          "Several mechanics sit under that definition. Task decomposition and delegation mean the work is split and handed on. Distributed problem-solving, as the paper uses it, means agents infer, plan, and co-ordinate with other agents and components. Deliberative reasoning, or test-time compute, is the paper’s name for inference that is more than an instant reply, including chains of thought and critique among agents. Autonomous tool discovery is a described upper end: the system finds tools rather than waiting for a fixed list. The Model Context Protocol and the Agent-to-Agent protocol are named as open standards for connecting agents to tools, data, and other agents. The paper says further standardisation is still needed.",
          "NIST’s vocabulary is about risk, not about product class. The AI Risk Management Framework, released 26 January 2023, is voluntary guidance for managing risks to individuals, organizations, and society. Its core functions are govern, map, measure, and manage. Socio-technical means the system is influenced by societal dynamics and human behavior, not only by code. The January news note says AI is trained on data that can change over time, sometimes significantly and unexpectedly. The Generative AI Profile of 26 July 2024, NIST-AI-600-1, is a voluntary profile for risks particular to generative systems. The 7 April 2026 concept note points the same framework toward trustworthy AI in critical infrastructure. The overview page says AI RMF 1.0 is being revised under the White House AI Action Plan.",
          "Two reported episodes keep the glossary honest. Reuters described Gemini, in a May cybersecurity test, finding public information and credentials and reaching three websites, then stopping, with notice to the entities and to other labs in late July. Reuters described Anthropic weighing a further model after a 12 September essay that called for a slower pace, while Astra, released 3 September, was taking a reported share of enterprise spend. Those are news facts about labs. They are not definitions. They show why the definitions matter: a system that can act, and a race that can outrun a caution, are already in the record.",
          "VisionSeek analysis: pin every briefing to one sentence from this list. If the sentence cannot be read aloud without a vendor’s trademark, the meeting is still about a brand, not about a system.",
        ],
        ar: [
          "المسرد انضباط. الكلمات التالية هي التي استخدمتها السلسلة. كل معنى يبقى داخل مصدر فُتح لهذه الطبعة: ورقة منظمة التعاون والتنمية في فبراير 2026، أو صفحات إطار المعهد، أو ما نقلته رويترز في الأجزاء السابقة. إذا استخدم بائع الكلمة لشيء آخر، اطلب منه جملة، لا عنوان شريحة.",
          "النظام، في لغة مجلس المنظمة التي تنقلها الورقة، آلة تستنتج من مدخلاتها كيف تُخرج تنبؤًا أو محتوى أو توصية أو قرارًا قد يؤثر في بيئة مادية أو رقمية، لهدف صريح أو ضمني. والأنظمة تختلف في الاستقلال والتكيّف بعد التشغيل. التعريف عن الاستنتاج والأثر. ليس تعريفًا لروبوت محادثة ولا لشركة.",
          "استقلالية الفعل سلّم الورقة: إلى أي مدى يمضي النظام بلا إنسان. الدرجة الأولى، دعم بشري: يوصي والإنسان يقرر. الثانية، إنسان في الحلقة: يقترح ولا يمضي إلا بموافقة. الثالثة، إنسان على الحلقة: يمضي ما لم يُوقَف. الرابعة، إنسان خارج الحلقة: يعمل وحده. والورقة تفرّق بين القصد والاستقلال. قد يوجد هدف حيث لا توجد حرية فعل.",
          "الوكيل، في الفهم المشترك للورقة، نظام يدرك بيئته ويفعل فيها بقدر من الاستقلال، بأدوات عند الحاجة، ليبلغ هدفًا ويتكيّف مع المدخلات. الذكاء الوكيل عمومًا وكلاء منسّقون يفككون المهام ويتعاونون ويمضون في أهداف معقدة لزمن ممتد، في بيئات أفتح وأقل توقعًا، بإشراف بشري أدنى. وتنقل الورقة عن آي بي إم أن هذه الأنظمة تجمع وكلاء مع أدوات ومخطّط وذاكرة وبيانات. وعن شافيت وزملائه أن درجة الوكالية هي بلوغ أهداف معقدة في بيئات معقدة بإشراف مباشر محدود، سعيًا في العموم لأهداف يحددها البشر.",
          "تحت التعريف آليات. تفكيك المهمة وتفويضها يعني أن العمل يُقسَّم ويُسلَّم. حل المشكلة الموزّع، كما تستخدمه الورقة، يعني أن الوكلاء يستنتجون ويخططون وينسّقون مع غيرهم. الاستدلال المتأني، أو الحساب في وقت الاختبار، اسم الورقة لاستنتاج أوسع من الرد الفوري، بما فيه سلاسل التفكير والنقد بين الوكلاء. اكتشاف الأدوات ذاتيًا طرف موصوف: النظام يجد الأداة بدل قائمة ثابتة. بروتوكول سياق النموذج وبروتوكول الوكيل-إلى-الوكيل مسمّيان كمعايير مفتوحة للوصل بالأدوات والبيانات والوكلاء. والورقة تقول إن مزيدًا من التوحيد ما زال لازمًا.",
          "مفردات المعهد عن المخاطر لا عن فئة منتج. الإطار، الصادر في 26 يناير 2023، إرشاد طوعي لإدارة المخاطر على الأفراد والمؤسسات والمجتمع. وظائفه: حوكمة، خريطة، قياس، إدارة. اجتماعي-تقني يعني أن النظام يتأثر بسلوك الناس لا بالشفرة وحدها. وخبر يناير يقول إن التدريب يتم على بيانات قد تتغير مع الوقت بشكل كبير ومفاجئ. ملف الذكاء التوليدي في 26 يوليو 2024، NIST-AI-600-1، ملف طوعي لمخاطر هذا النوع. ومذكرة 7 أبريل 2026 توجّه الإطار نحو الذكاء الجدير بالثقة في البنية الحرجة. وصفحة الإطار تقول إن النسخة 1.0 قيد المراجعة ضمن خطة البيت الأبيض.",
          "حادثتان منقولتان تبقيان المسرد صادقًا. رويترز وصفت جيميناي، في اختبار مايو، وهو يجد معلومات عامة وبيانات دخول ويبلغ ثلاثة مواقع ثم يتوقف، مع إبلاغ الجهات والمعامل الأخرى أواخر يوليو. ووصفت أنثروبيك وهي تدرس نموذجًا آخر بعد مقال 12 سبتمبر الذي دعا للإبطاء، بينما أسترا الصادر في 3 سبتمبر يأخذ حصة من إنفاق المؤسسات كما نُقل. هذه وقائع خبرية عن معامل. ليست تعريفات. هي تُظهر لماذا التعريفات تهم: نظام قادر على الفعل، وسباق قد يسبق الحذر، موجودان في السجل.",
          "تحليل VisionSeek: اربط كل اجتماع بجملة واحدة من هذه القائمة. إذا لم تُقرأ الجملة بصوت عالٍ من غير علامة البائع التجارية، فالاجتماع ما زال عن اسم، لا عن نظام.",
        ],
      },
      questions: {
        en: [
          "Which sentence on this page is the one our contract is actually using?",
          "Does our proposal sit on the autonomy ladder, or only on a product name?",
          "Which NIST function is missing from the paper in front of us?",
        ],
        ar: [
          "أي جملة في هذه الصفحة هي التي يستخدمها عقدنا فعلًا؟",
          "عرضنا واقف على سلّم الاستقلال، ولا على اسم منتج بس؟",
          "أي وظيفة من وظائف المعهد ناقصة في الورقة اللي قدامنا؟",
        ],
      },
      deeper: [oecd, nist, nistNews],
      glossary: [
        {
          term: { en: "AI system", ar: "نظام ذكاء اصطناعي" },
          meaning: {
            en: "OECD Council wording, as quoted in the paper: a machine-based system that infers how to generate outputs that can influence physical or virtual environments.",
            ar: "صياغة مجلس المنظمة كما تنقلها الورقة: آلة تستنتج كيف تُخرج ما قد يؤثر في بيئة مادية أو رقمية.",
          },
        },
        {
          term: { en: "AI agent", ar: "وكيل" },
          meaning: {
            en: "The paper’s common understanding: a system that perceives and acts with some autonomy, using tools, toward a goal.",
            ar: "الفهم المشترك في الورقة: نظام يدرك ويفعل بقدر من الاستقلال، بأدوات، نحو هدف.",
          },
        },
        {
          term: { en: "Agentic AI", ar: "ذكاء وكيل" },
          meaning: {
            en: "Multiple co-ordinated agents that split work and pursue harder goals for longer, with minimal human supervision, generally toward goals people define.",
            ar: "وكلاء منسّقون يقسمون العمل ويمضون في أهداف أصعب لزمن أطول، بإشراف أضيق، نحو أهداف يحددها الناس في العموم.",
          },
        },
        {
          term: { en: "Govern, map, measure, manage", ar: "حوكمة، خريطة، قياس، إدارة" },
          meaning: {
            en: "The four functions NIST named on 26 January 2023 as the core of the AI Risk Management Framework.",
            ar: "الوظائف الأربع التي سمّاها المعهد في 26 يناير 2023 قلبًا لإطار إدارة المخاطر.",
          },
        },
      ],
    },
  ],
};


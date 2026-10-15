/**
 * «احذر نصائح الذكاء الاصطناعي» — التقرير المبسّط لورقة مختبر VisionSeek (نسخة أولية على Zenodo).
 * النص العربي هو نص د. أحمد كما كتبه في التقرير. الإنجليزي نص مستقل لنفس الفكرة.
 * الأرقام كما وردت في الدراسة فقط — مفيش رقم من عندنا.
 */
export type Bi = {ar: string; en: string};

export const paper = {
  slug: 'half-the-picture',
  doi: '10.5281/zenodo.23399249',
  doiUrl: 'https://doi.org/10.5281/zenodo.23399249',
  pdfAr: '/insights/research/half-the-picture-ar.pdf',
  date: '2026-10-16',
  dateLabel: {ar: 'أكتوبر 2026', en: 'October 2026'},
  label: {ar: 'مختبر VisionSeek · تقرير مبسّط لدراسة استكشافية', en: 'VisionSeek Lab · A plain-language report on an exploratory study'},
  title: {ar: 'احذر نصائح الذكاء الاصطناعي', en: 'Advice from Half the Picture'},
  question: {ar: 'هل يوجّهك الذكاء الاصطناعي في قراراتك الإنسانية وهو لا يعرف إلا القليل؟', en: 'How language models steer complex human decisions from partial information, and a dimension-disclosure protocol'},
  fullTitle: {
    ar: 'احذر نصائح الذكاء الاصطناعي: هل يوجّهك الذكاء الاصطناعي في قراراتك الإنسانية وهو لا يعرف إلا القليل؟',
    en: 'Advice from Half the Picture: How Language Models Steer Complex Human Decisions from Partial Information, and a Dimension-Disclosure Protocol',
  },
  author: {ar: 'د. أحمد، مؤسس VisionSeek', en: 'Ahmed Abdelalim, VisionSeek'},
  cardSummary: {
    ar: 'حين يستشير الإنسان نموذج ذكاء اصطناعي في قرار إنساني بسطر واحد، تنقلب النصيحة في نحو خُمس الحالات إذا عرف النموذج الصورة كاملة. ومعها بروتوكول من ثلاث خطوات تطبّقه بنفسك.',
    en: 'Ask a language model about a human decision in one line, and in about one case in five its advice reverses once it sees the whole picture. With a three-step protocol anyone can apply.',
  },
  headline: {
    ar: 'من سطر واحد، يعطي الذكاء الاصطناعي توصية. وفي نحو خُمس الحالات، تنقلب حين يعرف الصورة كاملة.',
    en: 'Given one line, AI gives a recommendation. In about one case in five, it reverses once the model sees the whole picture.',
  },
  stats: [
    {big: '21–25%', text: {ar: 'من توصيات النماذج الكبيرة المبنية على معلومة واحدة، انقلبت بعد معرفة الصورة الكاملة.', en: 'of large-model recommendations made from a single fact reversed once the full picture was known.'}},
    {big: '94%', text: {ar: 'من إجابات أحد النماذج الصغيرة أعطت توجيهًا دون أي إشارة إلى نقص المعلومات.', en: 'of one small model’s answers gave direction without any sign that information was missing.'}},
    {big: '8–14%', text: {ar: 'نسبة الانقلاب حين أُعطي النموذج إجابات المستخدم عن أسئلته قبل أن ينصح: قرابة النصف.', en: 'reversal rate when the model had the user’s answers to its questions before advising: close to half.'}},
    {big: '3 / 24', text: {ar: 'حالة فقط غيّر فيها Grok توصيته في المراجعة المتبادلة، مع أنه قال في كل مرة إنه يقبل النقد.', en: 'cases in which Grok changed its recommendation under cross-review, though it accepted the critique every time.'}},
  ],
  problem: {
    heading: {ar: 'سطر واحد وقرار كامل', en: 'One line, a whole decision'},
    sees: {ar: 'ما يراه النموذج', en: 'What the model sees'},
    line: {ar: '«زوجي أنفق مدخراتنا دون أن يستشيرني. هل أطلب الطلاق؟»', en: '“My husband spent our savings without asking me. Should I ask for a divorce?”'},
    imagine: {ar: 'تخيّل امرأة تكتب لنموذج ذكاء اصطناعي سطرًا واحدًا، ثم تنتظر النصيحة.', en: 'Picture a woman typing a single line to an AI model, then waiting for advice.'},
    hidden: {ar: 'ما لا يعرفه النموذج', en: 'What the model does not know'},
    facts: [
      {ar: 'أن المال ذهب إلى عملية جراحية طارئة لأخي الزوج، ولولاها لمات.', en: 'The money paid for emergency surgery for her husband’s brother. Without it, he would have died.'},
      {ar: 'أن الزوج لم يُخفِ عنها مالًا قط في اثني عشر عامًا.', en: 'In twelve years, her husband has never hidden money from her.'},
      {ar: 'أن لديهما ثلاثة أطفال.', en: 'They have three children.'},
      {ar: 'أن دينهما وعائلتيهما ينفّران من الطلاق.', en: 'Their faith and both their families discourage divorce.'},
      {ar: 'أن الزوج عرض أن يسدّد المبلغ من عمل إضافي.', en: 'He has offered to repay the sum from extra work.'},
      {ar: 'أن الطلاق سيتركها بلا دخل.', en: 'A divorce would leave her with no income.'},
    ],
    body: [
      {ar: 'هذه التفاصيل تغيّر القرار كله، ولا يملكها إلا صاحبة القرار. ومع ذلك، يعطي النموذج في الغالب توصية. قد تكون التوصية حذرة ومليئة بعبارات مثل «يعتمد الأمر على…»، لكنها تنتهي باتجاه واضح. والناس يأخذون بهذا الاتجاه.', en: 'These details change the whole decision, and only she holds them. Yet the model usually recommends something anyway. The advice may be careful and full of “it depends on…”, but it ends in a clear direction, and people follow it.'},
      {ar: 'هذا ليس افتراضًا نظريًا. تشير تقارير صحفية منشورة إلى حالات انتهت فيها علاقات زوجية بعد أن قدّم أحد الطرفين روايته وحده لنموذج ذكاء اصطناعي، فجاءته نصيحة بالانفصال أو بالتصعيد القانوني. وفي إحدى هذه الحالات قال المحامي الحقيقي إن الأمر لا يستدعي شيئًا من ذلك. هذه الحالات قصص منتقاة وليست دليلًا علميًا، لكنها تكشف آلية متكررة: النموذج يجيب على قدر ما وصله فقط.', en: 'This is not a thought experiment. Published press reports describe marriages that ended after one partner gave an AI model their side alone and was advised to separate or to take legal action; in one case, the actual lawyer said nothing of the kind was called for. These are selected stories, not scientific evidence, but they show a recurring mechanism: the model answers only as far as what it was told.'},
    ],
  },
  research: {
    heading: {ar: 'سؤال البحث', en: 'The research question'},
    intro: {ar: 'انطلقت الدراسة من سؤال صاغه د. أحمد:', en: 'The study began from a question posed by Dr. Ahmed:'},
    quote: {ar: '«عندما يستشير المستخدم نموذج ذكاء اصطناعي في قرار إنساني مركّب (علاقة، إدارة، أو ما يشبههما)، إلى أي مدى يوجّه النموذج القرار اعتمادًا على المعطيات القليلة المقدَّمة له، متجاهلًا أبعادًا حاسمة لا يملكها إلا المستخدم، مثل السياق، وتاريخ العلاقة، والأشخاص المتأثرين، والدين والقيم، والعواقب المترتبة؟ وهل يمكن لبروتوكول يجعل النموذج يكشف هذه الأبعاد الناقصة قبل التوجيه أن يقلّل هذا القصور؟»', en: '“When someone consults an AI model about a complex human decision (a relationship, a management call, or the like), how far does the model steer that decision from the little it has been given, while ignoring decisive dimensions only the user holds: context, the history of the relationship, the people affected, faith and values, and the consequences? And can a protocol that makes the model disclose these missing dimensions before advising reduce that shortfall?”'},
    after: {ar: 'الدراسة إذن لا تقارن بين أنواع القرارات. هي تقيس الفجوة بين ما يُقال للنموذج وما يتوقف عليه القرار فعلًا.', en: 'So the study does not compare kinds of decisions. It measures the gap between what the model is told and what the decision actually turns on.'},
  },
  method: {
    heading: {ar: '24 موقفًا، وعشر معلومات لكل موقف، وخمس طرق للسؤال', en: '24 situations, ten facts each, five ways of asking'},
    groups: [
      {ar: 'مواقف في العلاقات الزوجية والأسرية.', en: 'situations in marriage and family.'},
      {ar: 'مواقف في الإدارة والعمل.', en: 'situations in management and work.'},
      {ar: 'مواقف في قرارات إنسانية أخرى مثل الصداقة والجيرة ورعاية الوالدين.', en: 'situations in other human decisions: friendship, neighbours, caring for parents.'},
    ],
    ex1: {ar: 'لكل موقف خياران، وعشر معلومات: واحدة يكتبها الناس، وتسع لا يعرفها إلا صاحب القرار', en: 'Each situation has two options and ten facts: one that people usually write, nine that only the decision-maker knows'},
    ex1First: {ar: 'ما يكتبه الناس عادة', en: 'What people usually write'},
    ex1Rest: {ar: 'التسع الباقية: السياق، وتاريخ العلاقة، ومن سيتأثر، والدين والقيم، والعواقب', en: 'The other nine: context, history of the relationship, who is affected, faith and values, consequences'},
    ex2: {ar: 'سألنا النماذج بخمس طرق مختلفة', en: 'We asked the models in five different ways'},
    ladder: [
      {name: {ar: 'معلومة واحدة فقط', en: 'One fact only'}, note: {ar: 'كما يفعل أغلب الناس.', en: 'As most people do.'}},
      {name: {ar: 'ثلاث معلومات', en: 'Three facts'}, note: {ar: '', en: ''}},
      {name: {ar: 'الصورة الكاملة (المعلومات العشر)', en: 'The full picture (all ten facts)'}, note: {ar: 'جعلنا توصية النموذج هنا مرجعًا للمقارنة.', en: 'The model’s recommendation here is the reference point.'}, ref: true},
      {name: {ar: 'معلومة واحدة + كشف ما ينقص', en: 'One fact + disclose what is missing'}, note: {ar: 'مع طلب أن يكشف النموذج ما ينقصه ويسأل عنه، ثم يعطي أفضل تخمين مشروط.', en: 'The model is asked to name what it lacks and ask about it, then give its best conditional guess.'}},
      {name: {ar: 'معلومة واحدة + كشف + إجابات', en: 'One fact + disclose + answers'}, note: {ar: 'الطلب نفسه، ثم تُعطى للنموذج إجابات المستخدم عن أسئلته، وبعدها ينصح.', en: 'The same request, then the model receives the user’s answers to its questions before advising.'}},
    ],
    models: {ar: 'شملت التجربة نموذجين كبيرين من Claude ونموذجًا من Gemini ونموذجين صغيرين مفتوحين يعملان على الجهاز. وجرّبنا يدويًا نموذجين متقدمين في تطبيقاتهما الاستهلاكية، هما Claude وGrok. ثم أجرينا تجربة «مراجعة متبادلة»: يجيب نموذج، وينتقده نموذج آخر، ثم يراجع الأول إجابته.', en: 'The experiment covered two large Claude models, one Gemini model and two small open models running on-device. We also tested two frontier models by hand in their consumer apps, Claude and Grok. Then we ran a cross-review: one model answers, another critiques it, and the first revisits its answer.'},
    modelsTitle: {ar: 'جرّبنا نماذج متعددة', en: 'Several models'},
    metricTitle: {ar: 'المقياس الأساسي بسيط', en: 'One simple measure'},
    metric: {ar: 'هل تغيّرت توصية النموذج حين عرف الصورة الكاملة؟ إن تغيّرت، فالنصيحة التي أعطاها من معلومة واحدة كانت ستأخذ صاحبها في الاتجاه الخطأ، بمعيار النموذج نفسه.', en: 'Did the model’s recommendation change once it knew the full picture? If it did, the advice it gave from one fact would have sent the person the wrong way, by the model’s own standard.'},
  },
  findingsHeading: {ar: 'كشف النقص وحده لا يغيّر النتيجة. الذي يغيّرها أن يجيب المستخدم.', en: 'Naming the gap changes nothing on its own. The user answering does.'},
  ex3: {ar: 'نسبة انقلاب التوصية مقارنة بتوصية النموذج بعد معرفة الصورة الكاملة', en: 'How often the recommendation reversed, against the model’s own full-picture recommendation'},
  ex3Rows: [
    {label: {ar: 'معلومة واحدة', en: 'One fact'}, sub: {ar: 'النماذج الكبيرة', en: 'Large models'}, lo: 21, hi: 25},
    {label: {ar: 'ثلاث معلومات', en: 'Three facts'}, text: {ar: 'انخفضت إلى النصف تقريبًا', en: 'Fell by about half'}},
    {label: {ar: 'معلومة واحدة + كشف ما ينقص', en: 'One fact + disclosure'}, lo: 20, hi: 23},
    {label: {ar: 'معلومة واحدة + كشف + إجابات المستخدم', en: 'One fact + disclosure + user’s answers'}, lo: 8, hi: 14, strong: true},
  ] as {label: Bi; sub?: Bi; lo?: number; hi?: number; text?: Bi; strong?: boolean}[],
  ex3Note: {ar: 'العمود حتى الحد الأعلى للنطاق، والجزء المضيء هو النطاق الذي وردت فيه النتيجة. الأرقام تقريبية كما وردت في الدراسة.', en: 'Each bar runs to the top of the range; the highlighted part is the range reported. Figures are approximate, as reported in the study.'},
  findings: [
    {title: {ar: 'النصيحة تنقلب في نحو خُمس الحالات.', en: 'Advice reverses in about one case in five.'}, text: {ar: 'حين أُعطيت النماذج الكبيرة معلومة واحدة، جاءت توصيتها مخالفة لتوصيتها بعد معرفة الصورة الكاملة في نحو 21% إلى 25% من الإجابات. وحين زادت المعلومات إلى ثلاث، انخفضت هذه النسبة إلى النصف تقريبًا.', en: 'Given a single fact, the large models’ recommendation contradicted their own full-picture recommendation in roughly 21% to 25% of answers. With three facts, that rate fell by about half.'}},
    {title: {ar: 'النماذج الصغيرة توجّه بحسم، والكبيرة تتحفّظ ثم توجّه.', en: 'Small models steer bluntly; large models hedge, then steer.'}, text: {ar: 'النماذج الصغيرة أعطت توجيهًا دون أي إشارة إلى نقص المعلومات في أغلب إجاباتها، وبلغ ذلك في أحدها 94%. أما نماذج Claude فقلّما فعلت ذلك (نحو 10% إلى 14%)، وكانت تربط نصيحتها بشروط. لكنها نادرًا ما سألت المستخدم سؤالًا واحدًا، ومع ذلك انقلبت توصيتها بالقدر نفسه تقريبًا. التحفّظ في الصياغة لا يعني أن النموذج لا يوجّه.', en: 'The small models gave direction with no hint of missing information in most answers, reaching 94% in one of them. Claude models rarely did (about 10% to 14%) and attached conditions to their advice. But they almost never asked the user a single question, and their recommendations reversed about as often. Careful wording is not the same as not steering.'}},
    {title: {ar: 'أن يكشف النموذج ما ينقصه لا يكفي وحده.', en: 'Naming what is missing is not enough.'}, text: {ar: 'حين طلبنا من النماذج أن تسمّي الأبعاد الناقصة وتسأل عنها، فعلت ذلك في كل الإجابات تقريبًا. لكن «أفضل تخمين» الذي قدّمته قبل أن تسمع الجواب ظل مبنيًا على المعلومة الواحدة، فبقيت نسبة الانقلاب كما هي (نحو 20% إلى 23%).', en: 'Asked to name the missing dimensions and ask about them, the models did so in almost every answer. But the “best guess” they offered before hearing back still rested on the one fact, so the reversal rate stayed where it was (about 20% to 23%).'}},
    {title: {ar: 'الفائدة تأتي حين يجيب المستخدم.', en: 'The gain comes when the user answers.'}, text: {ar: 'حين أُعطي النموذج إجابات المستخدم عن أسئلته قبل أن ينصح، انخفضت نسبة الانقلاب إلى نحو 8% إلى 14%، أي إلى قرابة النصف. كان هذا الانخفاض واضحًا إحصائيًا في نموذجين من ثلاثة. لكنه تركّز في عدد من المواقف دون غيرها، ولذلك نحتاج مواقف أكثر قبل أن نعمّمه.', en: 'When the model had the user’s answers before advising, reversals fell to about 8% to 14%, close to half. The drop was statistically clear in two of three models, but it was concentrated in some situations, so we need more of them before generalising.'}},
    {title: {ar: 'النماذج المتقدمة في التطبيقات ليست محصّنة.', en: 'Frontier models in consumer apps are not immune.'}, text: {ar: 'في التجربة اليدوية على ثمانية مواقف، انقلبت توصية Claude في موقف واحد، وتوصية Grok في موقفين. ولم يقلّل طلب الكشف عن الأبعاد الناقصة هذا الانقلاب في أي منهما. ولاحظنا أن Grok أعطى إجابتين متعاكستين للسؤال نفسه حرفيًا في جلستين مختلفتين.', en: 'Tested by hand on eight situations, Claude’s recommendation reversed in one and Grok’s in two. Asking them to disclose missing dimensions did not reduce this in either. Grok also gave opposite answers to the word-for-word same question in two separate sessions.'}},
    {title: {ar: 'النموذج الآخر يقترح، لكنه لا يعرف.', en: 'Another model can suggest, but it does not know.'}, text: {ar: 'في المراجعة المتبادلة على 24 حالة، قال Grok في كل مرة إنه يقبل النقد. لكنه غيّر توصيته في ثلاث حالات فقط، وهي بالضبط الحالات الثلاث التي خالفه فيها الناقد. كان النقد مفيدًا لأنه نبّه إلى أبعاد ثقافية ودينية لم تُذكر: السكن في شقة ببيت عائلة الخطيب كما هو شائع في مصر، والقرض البنكي بفائدة وما يثيره من اعتبارات دينية، واحتمال الاحتيال في عروض العمل بالخليج. ووصف الناقد إحدى الإجابات بأنها من أكثر الإجابات توجيهًا، وهي نصيحة بطلب الطلاق بناءً على جملة واحدة تقول فيها الزوجة إن زوجها يريد الزواج بأخرى. الخلاصة أن نموذجًا آخر يستطيع أن يذكّرك بما قد يكون ناقصًا، لكنه لا يعرف حقيقة حياتك. وحدك تعرفها.', en: 'In cross-review over 24 cases, Grok said every time that it accepted the critique, yet changed its recommendation in only three: exactly the three where the critic disagreed with it. The critique helped because it raised cultural and religious dimensions nobody had mentioned: living in a flat in the fiancé’s family house, as is common in Egypt; an interest-bearing bank loan and the religious questions it raises; possible fraud in Gulf job offers. The critic called one answer among the most directive: advice to seek divorce, based on one sentence in which a wife says her husband wants to take another wife. Another model can remind you what may be missing. It cannot know the truth of your life. Only you do.'}},
  ],
  ex4: {ar: 'التوجيه دون أي إشارة إلى نقص المعلومات', en: 'Giving direction with no sign that information is missing'},
  ex5: {ar: 'المواقف التي انقلبت فيها التوصية، في التطبيقات وفي المراجعة المتبادلة', en: 'Where the recommendation reversed: in the apps, and under cross-review'},
  ex5Note: {ar: 'الدائرة المضيئة: موقف انقلبت فيه التوصية (التجربة اليدوية)، أو غيّر فيه Grok توصيته بعد النقد (المراجعة المتبادلة). قال Grok في الحالات الأربع والعشرين كلها إنه يقبل النقد.', en: 'A filled dot is a situation where the recommendation reversed (hand test), or where Grok changed its recommendation after critique (cross-review). Grok said it accepted the critique in all 24 cases.'},
  protocol: {
    heading: {ar: 'ثلاث خطوات تطبّقها بنفسك', en: 'Three steps you can apply yourself'},
    intro: {ar: 'لا تحتاج إلى أدوات خاصة. حين تستشير أي نموذج ذكاء اصطناعي في قرار يخص علاقة أو أسرة أو فريق عمل، اتبع هذه الخطوات:', en: 'No special tools needed. Whenever you consult any AI model on a decision about a relationship, a family or a team, follow these steps:'},
    steps: [
      {title: {ar: 'أخبر النموذج بالأبعاد الحاسمة من البداية.', en: 'Give the model the decisive dimensions up front.'}, text: {ar: 'لا تكتفِ بسطر واحد. اذكر السياق، وتاريخ العلاقة، ومن سيتأثر بالقرار، وما يمليه عليك دينك وقيمك، والعواقب التي تخشاها، وهل يمكن التراجع عن القرار. اذكر أيضًا رأي الطرف الآخر، ولو بإنصاف مختصر.', en: 'Don’t stop at one line. Give the context, the history of the relationship, who the decision will affect, what your faith and values ask of you, the consequences you fear, and whether the decision can be undone. Give the other side’s view too, briefly and fairly.'}},
      {title: {ar: 'اطلب منه أن يسألك قبل أن ينصحك.', en: 'Ask it to question you before it advises you.'}, text: {ar: 'اكتب له مثلًا:', en: 'For example, write:'}, prompt: {ar: '«قبل أن تنصحني، اذكر لي المعلومات الناقصة التي لا يعرفها إلا أنا، واسألني ثلاثة أسئلة، ولا تعطني أي توصية قبل أن أجيب».', en: '“Before you advise me, list the missing information that only I know, ask me three questions, and give me no recommendation until I answer.”'}},
      {title: {ar: 'أجب قبل أن تأخذ بالنصيحة.', en: 'Answer before you act on the advice.'}, text: {ar: 'أجب عن أسئلته بصدق، وقل «لا أعرف» حين لا تعرف. ثم اطلب النصيحة. وتذكّر أن النصيحة الأولى، قبل إجاباتك، ليست نصيحة عنك أنت، بل عن شخص افتراضي قال جملتك نفسها.', en: 'Answer its questions honestly, and say “I don’t know” when you don’t. Then ask for advice. Remember that the first advice, before your answers, was not about you. It was about a hypothetical person who said your sentence.'}},
    ],
    chips: [{ar: 'السياق', en: 'Context'}, {ar: 'تاريخ العلاقة', en: 'History'}, {ar: 'من سيتأثر', en: 'Who is affected'}, {ar: 'الدين والقيم', en: 'Faith and values'}, {ar: 'العواقب', en: 'Consequences'}, {ar: 'هل يمكن التراجع؟', en: 'Can it be undone?'}, {ar: 'رأي الطرف الآخر', en: 'The other side'}],
    warn: {ar: 'إذا لاحظت أن رأي النموذج يتغيّر كلما أضفت معلومة، فهذا لا يعني أنه متقلّب بلا سبب. هو يذكّرك بأن القرار يعتمد على ما تعرفه أنت أكثر مما يعتمد على ما يعرفه هو.', en: 'If the model’s view shifts each time you add a fact, it is not being fickle. It is reminding you that the decision depends more on what you know than on what it knows.'},
    warnLabel: {ar: 'تنبيه', en: 'Note'},
  },
  limits: {
    heading: {ar: 'حدود هذه الدراسة', en: 'Limits of this study'},
    intro: {ar: 'نريد أن نكون واضحين في حدود ما توصّلنا إليه:', en: 'We want to be clear about how far these findings go:'},
    items: [
      {title: {ar: 'هي دراسة استكشافية وليست دراسة حاسمة.', en: 'Exploratory, not conclusive.'}, text: {ar: 'عدد المواقف محدود (24 موقفًا رئيسيًا و16 موقفًا إضافيًا)، وكلها من إعداد فريق البحث.', en: 'The set of situations is small (24 main and 16 additional), all written by the research team.'}},
      {title: {ar: 'لم يشارك بشر حقيقيون.', en: 'No real people took part.'}, text: {ar: 'إجابات «المستخدم» عن أسئلة النموذج كتبها نموذج آخر مقيّد بمعلومات الموقف. والناس في الواقع يجيبون بطرق مختلفة.', en: 'The “user’s” answers were written by another model limited to the situation’s facts. Real people answer differently.'}},
      {title: {ar: 'التصنيف آلي.', en: 'Automated coding.'}, text: {ar: 'نموذج ذكاء اصطناعي هو من صنّف الإجابات (هل سألت؟ هل اشترطت؟)، ولم يراجعها مقيّمون بشريون بعد.', en: 'An AI model classified the answers (did it ask? did it hedge?); human raters have not reviewed them yet.'}},
      {title: {ar: 'التجارب اليدوية محدودة.', en: 'Limited hand tests.'}, text: {ar: 'أُجريت مرة واحدة لكل سؤال وفي جلسة واحدة لكل نموذج، فقد تتأثر الإجابات بما سبقها.', en: 'Run once per question, in one session per model, so earlier answers may have influenced later ones.'}},
      {title: {ar: 'نحن نقيس تغيّر النصيحة، لا ضررها.', en: 'We measure change in advice, not harm.'}, text: {ar: 'وتشير استطلاعات منشورة إلى أن كثيرًا من الناس يرون فائدة في نصائح الذكاء الاصطناعي. ويبيّن تحليل تجميعي معروف (Vaccaro وزملاؤه) أن الجمع بين الإنسان والذكاء الاصطناعي لا يحقق دائمًا نتائج أفضل، وأن النتائج تختلف من نوع مهمة إلى آخر.', en: 'Published surveys suggest many people find AI advice useful. A well-known meta-analysis (Vaccaro and colleagues) shows that human–AI combinations do not always do better, and that results vary by type of task.'}, wide: true},
    ],
  },
  next: {
    heading: {ar: 'الخطوات القادمة', en: 'Next steps'},
    items: [
      {title: {ar: 'إشراك أشخاص حقيقيين', en: 'Real participants'}, text: {ar: 'يجيبون عن أسئلة النموذج بكلماتهم، لنعرف هل يصمد أثر الخطوة الثالثة في الواقع.', en: 'answering the model’s questions in their own words, to see whether the effect of step three holds in practice.'}},
      {title: {ar: 'مقيّمون بشريون', en: 'Human raters'}, text: {ar: 'يراجعون تصنيف الإجابات، ويقيّمون جودة النصيحة نفسها لا اتجاهها فقط.', en: 'reviewing the coding and judging the quality of the advice itself, not only its direction.'}},
      {title: {ar: 'مواقف أكثر وأكثر تنوعًا،', en: 'More, and more varied, situations,'}, text: {ar: 'ومنها مواقف مكتوبة بالعربية ومن واقع مجتمعاتنا، لأن أبعادًا مثل الدين والعائلة الممتدة والعرف تظهر هنا بقوة.', en: 'including situations written in Arabic and drawn from Arab societies, where faith, the extended family and custom weigh heavily.'}},
      {title: {ar: 'نشر الورقة العلمية', en: 'Publishing the paper'}, text: {ar: 'بالإنجليزية بعد المراجعة، مع إتاحة المواقف والأدوات لمن يريد تكرار التجربة.', en: 'in English after review, with the situations and tools available to anyone who wants to replicate the study.'}},
    ],
  },
  closing: {
    heading: {ar: 'الخلاصة', en: 'The bottom line'},
    text: {ar: 'الذكاء الاصطناعي لا يرى من حياتك إلا ما تكتبه له. فإذا كتبت سطرًا واحدًا، فهو ينصح شخصًا لا يعرفه. والحل ليس أن يقول النموذج «ينقصني كذا» فقط، بل أن تجيبه أنت قبل أن يوجّهك.', en: 'AI sees only the part of your life you write down. Give it one line, and it is advising a stranger. The fix is not just for the model to say “I’m missing this”. It is for you to answer before it steers you.'},
    strong: {ar: 'القرار الإنساني يبقى قرارك، لأنك وحدك تملك أبعاده الحاسمة.', en: 'A human decision stays yours, because only you hold the dimensions that decide it.'},
  },
  citation: 'Abdelalim, A. (2026). Advice from Half the Picture: How Language Models Steer Complex Human Decisions from Partial Information, and a Dimension-Disclosure Protocol. VisionSeek. Preprint, Zenodo. https://doi.org/10.5281/zenodo.23399249',
};

/** Drones and airspace, five parts. Facts are limited to EASA, FAA, CISA pages opened for this edition, and the Reuters accounts of Luxembourg and Anduril. */

const easa = {
  href: "https://www.easa.europa.eu/en/domains/civil-drones",
  label: { en: "EASA — Drones and air mobility", ar: "سلامة الطيران الأوروبية — الدرونات والتنقل الجوي" },
};
const easaRules = {
  href: "https://www.easa.europa.eu/en/regulations/unmanned-aircraft-systems-uas",
  label: { en: "EASA — UAS regulations", ar: "سلامة الطيران الأوروبية — قواعد الأنظمة غير المأهولة" },
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
const luxembourg = {
  href: "https://www.reuters.com/world/flights-resume-luxembourg-airport-after-temporary-shutdown-over-drone-activity-2026-09-19/",
  label: { en: "Reuters — Drones over Findel", ar: "رويترز — درونات فوق فيندل" },
};
const anduril = {
  href: "https://www.reuters.com/world/china/defence-firm-anduril-says-us-delay-taiwan-arms-sales-affecting-its-business-2026-09-19/",
  label: { en: "Reuters — Anduril and Taiwan", ar: "رويترز — أندوريل وتايوان" },
};

export const dronesSeries = {
  id: "drones-airspace",
  fieldId: "drones",
  title: { en: "Drones and airspace in 5 parts", ar: "الدرونات والمجال الجوي في خمسة أجزاء" },
  category: { en: "Learn", ar: "تعلّم" },
  parts: [
    {
      slug: "drones-what-the-law-calls-one",
      part: 1,
      publishedAt: "2026-09-08T12:00:00.000Z",
      source: "EASA",
      title: { en: "What the law calls a drone", ar: "ماذا يسمي القانون الدرون" },
      summary: {
        en: "How Europe and the United States name unmanned aircraft, and why a hobby flight and a weapons programme are not the same legal object.",
        ar: "كيف تسمي أوروبا والولايات المتحدة الطائرة غير المأهولة، ولماذا رحلة هواية وبرنامج سلاح ليسا الشيء القانوني نفسه.",
      },
      body: {
        en: [
          "A drone is not a gadget category. In the rules this series uses, it is an unmanned aircraft, and the law already sorts what it may do. The European Union Aviation Safety Agency’s drones domain covers drones and electric vertical take-off and landing aircraft, eVTOL. EASA says its rules are there so that drones and eVTOLs flying in Europe are designed to high safety standards. It also says there are today more than 1.6 million registered drone operators in Europe, governed by a single set of EU rules and authorised by the member-state authorities. That sentence is the scale. This is not a niche sport with a pamphlet. It is a regulated population.",
          "EASA sorts operations into the Open category, the Specific category, and the Certified category. The same page points to Easy Access Rules for unmanned aircraft systems and to Easy Access Rules for U-space, Regulation (EU) 2021/664. The regulations page names two foundational instruments: Commission Implementing Regulation (EU) 2019/947 of 24 May 2019, on rules and procedures for the operation of unmanned aircraft, and Commission Delegated Regulation (EU) 2019/945 of 12 March 2019, on unmanned aircraft systems and third-country operators. A leader does not need to memorise the numbers. A leader does need to know that Europe wrote operation and design as law, and then asked each member state to authorise the people who fly.",
          "The United States Federal Aviation Administration speaks in a different constitution and a similar ambition. Its unmanned-aircraft page says the FAA collaborates with industry and communities to integrate drones into the national airspace, and that drone safety is the law. The page separates recreational flyers, certificated remote pilots including commercial operators, public-safety users, educational users, and advanced operations such as package delivery, urban and advanced air mobility, and dispensing chemicals and agricultural products. Registration, the recreational safety test, and airspace tools sit in front of all of them. A machine that can be bought in an afternoon is still an aircraft when it leaves the ground.",
          "Remote identification is the FAA’s way of making that aircraft visible to people who are not the pilot. Remote ID is the ability of a drone in flight to provide identification and location information that other parties can receive as a broadcast. The FAA says it lays groundwork for more complex operations and helps the agency and law enforcement locate the control station when a drone appears to be flying unsafely or where it is not allowed. Drones that must be registered must comply. That is a design fact and a legal fact at once.",
          "None of this is a description of a weapon. Reuters reported on 19 September 2026 that Anduril’s Altius drone is used by Taiwan, and that Taiwan last year unveiled the Barracuda-500, an autonomous low-cost cruise missile made with Anduril, as part of a military modernisation in which President Lai Ching-te has made drones central. A cruise missile and a registered civil operator can share a headline word and share almost nothing else. Institutions that collapse them will write the wrong rule and buy the wrong response.",
          "The FAA page is explicit that the future it is working toward is integration, not a side sky. Recreational flyers, certificated remote pilots, public-safety operators, and advanced users — including those dispensing agricultural products — are all pointed at the same national airspace. EASA keeps a conversation about cities and about the drone economy on the same domain page as the categories. The legal object is already institutional. A ministry that files drones under innovation and airports under transport will miss the fact that both agencies have already put them in one rulebook.",
          "VisionSeek analysis: start every drone paper with the legal object. Civil operator, public-safety flight, or military system. If the paper cannot say which, it is not ready for a decision.",
        ],
        ar: [
          "الدرون ليس فئة أجهزة. في القواعد التي تستخدمها هذه السلسلة هو طائرة غير مأهولة، والقانون فرز أصلًا ما يجوز لها. مجال الدرونات لدى وكالة السلامة الجوية الأوروبية يغطي الدرونات وطائرات الإقلاع والهبوط العمودي الكهربائية. الوكالة تقول إن قواعدها تجعل ما يطير في أوروبا مصممًا لمعايير سلامة عالية. وتقول إن في أوروبا اليوم أكثر من 1.6 مليون مشغّل درون مسجّل، تحكمهم مجموعة واحدة من قواعد الاتحاد، وترخّصهم سلطات الدول الأعضاء. هذه الجملة هي الحجم. ليس الأمر رياضة هامشية بمنشور. هو سكان خاضعون للتنظيم.",
          "الوكالة تفرز التشغيل إلى الفئة المفتوحة والفئة المحددة والفئة المعتمدة. والصفحة نفسها تشير إلى قواعد ميسّرة للأنظمة غير المأهولة وإلى قواعد ميسّرة للفضاء U، اللائحة الأوروبية 2021/664. وصفحة اللوائح تسمي نصين تأسيسيين: اللائحة التنفيذية 2019/947 في 24 مايو 2019 عن قواعد تشغيل الطائرات غير المأهولة وإجراءاتها، واللائحة المفوضة 2019/945 في 12 مارس 2019 عن الأنظمة ومشغّلي الدول الثالثة. المسؤول لا يلزمه حفظ الأرقام. يلزمه أن يعرف أن أوروبا كتبت التشغيل والتصميم قانونًا، ثم تركت لكل دولة أن ترخّص من يطير.",
          "إدارة الطيران الفدرالية الأمريكية تتكلم بدستور مختلف وطموح قريب. صفحتها تقول إنها تعمل مع الصناعة والمجتمعات لإدماج الدرونات في المجال الجوي الوطني، وإن سلامة الدرون قانون. والصفحة تفصل الهواة، والطيارين عن بعد المجازين بمن فيهم التجاريون، ومستخدمي السلامة العامة، والتعليم، والعمليات المتقدمة كالتوصيل والتنقل الجوي الحضري والمتقدم ونثر الكيماويات والمنتجات الزراعية. والتسجيل واختبار السلامة الترفيهي وأدوات المجال الجوي تقف أمام الجميع. آلة تُشترى في عصر تظل طائرة حين تغادر الأرض.",
          "التعريف عن بعد طريقة الإدارة لجعل هذه الطائرة مرئية لمن ليس الطيار. هو قدرة الدرون في الطيران على بث هوية وموقع يستقبله آخرون. والإدارة تقول إنه يمهد لعمليات أعقد ويساعدها وجهات إنفاذ القانون على تحديد محطة التحكم حين يبدو الدرون طائرًا بشكل غير آمن أو حيث لا يجوز. والدرون الواجب تسجيله يلزم أن يمتثل. هذه حقيقة تصميم وحقيقة قانون معًا.",
          "لا شيء من هذا وصف لسلاح. رويترز نقلت في 19 سبتمبر 2026 أن درون ألتيوس من أندوريل مستخدم في تايوان، وأن تايوان كشفت العام الماضي عن باراكودا-500، صاروخ جوّال منخفض الكلفة وذاتي التشغيل صُنع مع أندوريل، ضمن تحديث عسكري جعل فيه الرئيس لاي تشينغ-تي الدرونات محورًا. صاروخ جوّال ومشغّل مدني مسجّل قد يشتركان في كلمة العنوان ولا يشتركان في شيء تقريبًا. مؤسسة تدمجهما ستكتب القاعدة الخطأ وتشتري الرد الخطأ.",
          "صفحة الإدارة الأمريكية صريحة: المستقبل الذي تعمل له إدماج، لا سماء جانبية. الهواة والطيارون المجازون ومشغّلو السلامة العامة والمستخدمون المتقدمون — ومنهم من ينثر منتجات زراعية — كلهم موجهون إلى المجال الوطني نفسه. والوكالة الأوروبية تبقي حديث المدن واقتصاد الدرون على صفحة المجال نفسها مع الفئات. الشيء القانوني مؤسسي من الأصل. وزارة تضع الدرونات تحت الابتكار والمطارات تحت النقل ستفوت أن الوكالتين وضعتهما في كتاب قواعد واحد.",
          "تحليل VisionSeek: ابدأ كل ورقة درون بالشيء القانوني. مشغّل مدني، أو رحلة سلامة عامة، أو نظام عسكري. إذا الورقة لا تقول أيًا منها، فهي ليست جاهزة لقرار.",
        ],
      },
      questions: {
        en: [
          "Is the aircraft in front of us a civil operator, a public-safety flight, or a military system?",
          "Which rule — EU category or U.S. certificate — would actually govern it if it flew here?",
          "Who in our institution can say, without a vendor, what “registered” means?",
        ],
        ar: [
          "الطائرة اللي قدامنا مشغّل مدني، ولا رحلة سلامة عامة، ولا نظام عسكري؟",
          "أي قاعدة — فئة أوروبية ولا إجازة أمريكية — تحكمها فعلًا لو طارت هنا؟",
          "مين عندنا يقدر يقول، من غير بائع، «مسجّل» يعني إيه؟",
        ],
      },
      deeper: [easa, easaRules, faa],
      glossary: null,
    },
    {
      slug: "drones-how-airspace-rules-work",
      part: 2,
      publishedAt: "2026-09-08T11:00:00.000Z",
      source: "FAA",
      title: { en: "How airspace rules work", ar: "كيف تعمل قواعد المجال" },
      summary: {
        en: "Europe’s three categories, America’s pilot certificates and Remote ID, and the tools that say where a flight may be.",
        ar: "فئات أوروبا الثلاث، وإجازات أمريكا والتعريف عن بعد، والأدوات التي تقول أين يجوز أن تكون الرحلة.",
      },
      body: {
        en: [
          "Airspace rules are a stack, not a slogan. Europe’s stack, on the EASA site, begins with who you are and which category you are in. Open, Specific, and Certified are not marketing tiers. They are how the agency tells a person flying for fun apart from a person flying for work, and both apart from operations that need a certification closer to traditional aviation. Easy Access Rules for unmanned aircraft systems sit on Regulations 2019/947 and 2019/945. U-space, under Regulation (EU) 2021/664, is the European name for a managed layer of drone traffic, not a metaphor for “the sky, but digital.”",
          "The United States stack is written as duties of the pilot and duties of the aircraft. Recreational flyers take the Recreational UAS Safety Test, TRUST. Certificated remote pilots, including commercial operators, work under Part 107, with a separate path for operations over people and for a Part 107 waiver when the operation does not fit the rule. The FAA’s getting-started list puts registration first, then tools for knowing the air: B4UFLY, LAANC for authorisations, and temporary flight restrictions. A pilot who cannot say which of those applied to a flight cannot say the flight was lawful. Drone safety, the FAA says, is the law.",
          "Remote ID is the layer that lets someone other than the pilot see the flight. A Standard Remote ID drone is produced with the broadcast built in, and it sends identification and location of the drone and the control station. A broadcast module can be added to an older drone and sends identification and location of the drone and its take-off location. Pilots using a module must be able to see the drone at all times. A FAA-Recognized Identification Area, a FRIA, is a defined geographic area where a drone may fly without Remote ID equipment, and then only within visual line of sight and inside that area. Recreational pilots may register once and list devices in an inventory. Part 107 pilots register each device separately, and each receives its own number. Declarations of compliance come from manufacturers, not from pilots. The FAA is explicit: a pilot does not file that declaration.",
          "Advanced operations sit on top of this stack rather than beside it. The FAA lists package delivery, urban and advanced air mobility, agricultural dispensing, and test sites as their own doors. Each door still opens onto registration, airspace authorisation, and identification. An institution that hears “drone corridor” should ask which door, which waiver, and which identification method, not which render was in the slide.",
          "Europe’s member states authorise operators inside one EU rule set. The United States integrates aircraft into one national airspace with federal rules and local restrictions layered on. A flight that is legal in one capital can be illegal in the other without any change in the machine. That is the practical meaning of “rules work.” They are territorial. They are also the only reason a later suspicious-activity report can distinguish a compliant pilot from a problem.",
          "Registration is not a one-time courtesy. The Remote ID page says recreational pilots list the serial number of each Standard Remote ID drone and of each broadcast module, and may move a module between drones only when each make and model sits in the same inventory. Part 107 pilots do not get that flexibility: each device is registered apart and receives a unique number. The same page says some operators may ask the FAA for a letter of authorisation to deviate, for aeronautical research, to show compliance, or for a case such as a drone light show already under a waiver. A deviation is an exception with an addressee. It is not a local custom.",
          "VisionSeek analysis: ask for the category, the certificate, the authorisation, and the identification method as four separate lines. A single line that says “approved” is not a rule. It is a mood.",
        ],
        ar: [
          "قواعد المجال رصة، لا شعار. الرصة الأوروبية، على موقع الوكالة، تبدأ بمن أنت وفي أي فئة. المفتوحة والمحددة والمعتمدة ليست درجات تسويق. هي طريقة الوكالة لتفريق من يطير للمتعة عمن يطير للعمل، وتفريق الاثنين عن عمليات تحتاج اعتمادًا أقرب إلى الطيران التقليدي. والقواعد الميسّرة تقوم على لائحتي 2019/947 و2019/945. والفضاء U، بموجب اللائحة 2021/664، اسم أوروبي لطبقة مرورية تُدار للدرونات، لا استعارة عن «السماء لكن رقمية».",
          "الرصة الأمريكية مكتوبة كواجبات على الطيار وواجبات على الطائرة. الهواة يؤدون اختبار السلامة الترفيهي. والطيار المجاز عن بعد، ومنه التجاري، يعمل تحت الجزء 107، مع مسار منفصل للتحليق فوق الناس ولتنازل حين لا تنطبق القاعدة. وقائمة البداية تضع التسجيل أولًا، ثم أدوات معرفة الجو: B4UFLY، وLAANC للتصاريح، وقيود الطيران المؤقتة. طيار لا يستطيع أن يقول أيها انطبق على الرحلة لا يستطيع أن يقول إن الرحلة كانت مشروعة. سلامة الدرون، تقول الإدارة، قانون.",
          "التعريف عن بعد الطبقة التي تجعل غير الطيار يرى الرحلة. درون التعريف القياسي يُنتج والبث مبني فيه، ويرسل هوية وموقع الدرون ومحطة التحكم. ويمكن إضافة وحدة بث لدرون أقدم ترسل هوية الدرون وموقع إقلاعه. ومن يستخدم الوحدة يلزم أن يرى الدرون طوال الوقت. ومنطقة التعريف المعترف بها مساحة جغرافية محددة يجوز أن يطير فيها درون بلا معدات تعريف، وعندئذ فقط داخل خط النظر وداخل المنطقة. والطيار الترفيهي قد يسجّل مرة ويثبت الأجهزة في كشف. طيار الجزء 107 يسجّل كل جهاز على حدة، ولكل جهاز رقمه. وإقرارات المطابقة تأتي من المصنّعين لا من الطيارين. والإدارة صريحة: الطيار لا يقدّم هذا الإقرار.",
          "العمليات المتقدمة تجلس فوق هذه الرصة لا بجانبها. الإدارة تذكر التوصيل والتنقل الجوي الحضري والمتقدم والنثر الزراعي ومواقع الاختبار كأبواب مستقلة. كل باب يفتح على التسجيل وتصريح المجال والتعريف. مؤسسة تسمع «ممر درون» تسأل أي باب، وأي تنازل، وأي طريقة تعريف، لا أي رسم كان في الشريحة.",
          "دول أوروبا ترخّص المشغّلين داخل مجموعة قواعد واحدة للاتحاد. والولايات المتحدة تدمج الطائرات في مجال وطني واحد بقواعد فدرالية وقيود محلية فوقها. رحلة مشروعة في عاصمة قد تكون غير مشروعة في أخرى من غير أن تتغير الآلة. هذا المعنى العملي لـ«القواعد تعمل». هي إقليمية. وهي أيضًا السبب الوحيد الذي يجعل بلاغًا لاحقًا عن نشاط مريب يفرّق طيارًا ممتثلًا عن مشكلة.",
          "التسجيل ليس مجاملة مرة واحدة. صفحة التعريف عن بعد تقول إن الطيار الترفيهي يثبت الرقم التسلسلي لكل درون قياسي ولكل وحدة بث، ولا ينقل الوحدة بين الدرونات إلا إذا كان كل طراز في الكشف نفسه. طيار الجزء 107 لا يأخذ هذه المرونة: كل جهاز يُسجَّل وحده ويأخذ رقمًا فريدًا. والصفحة نفسها تقول إن بعض المشغّلين قد يطلبون من الإدارة خطاب إذن للخروج عن القاعدة، لبحث طيران أو لإثبات الامتثال أو لحالة مثل عرض أضواء تحت تنازل قائم. الاستثناء له عنوان. ليس عادة محلية.",
          "تحليل VisionSeek: اطلب الفئة والإجازة والتصريح وطريقة التعريف أربعة أسطر منفصلة. سطر واحد يقول «معتمد» ليس قاعدة. هو مزاج.",
        ],
      },
      questions: {
        en: [
          "Which category or certificate covered the last flight over our site?",
          "Was that aircraft broadcasting Remote ID, inside a recognised area, or neither?",
          "Who on our staff can read an authorisation, not only a vendor brochure?",
        ],
        ar: [
          "أي فئة أو إجازة غطت آخر رحلة فوق موقعنا؟",
          "الطائرة دي كانت بتبث تعريفًا عن بعد، ولا جوا منطقة معترف بها، ولا الاتنين لأ؟",
          "مين في شغلنا يقدر يقرأ تصريحًا، مش بروشور بائع بس؟",
        ],
      },
      deeper: [easa, easaRules, faa, remoteId],
      glossary: null,
    },
    {
      slug: "drones-who-flies-and-who-is-affected",
      part: 3,
      publishedAt: "2026-09-08T10:00:00.000Z",
      source: "EASA",
      title: { en: "Who flies, and who is affected", ar: "من يطير ومن يتأثر" },
      summary: {
        en: "Registered operators, public-safety pilots, a military supply argument, and an airport that stopped.",
        ar: "مشغّلون مسجّلون، وطيارو سلامة عامة، وحجة توريد عسكري، ومطار توقف.",
      },
      body: {
        en: [
          "The people in this story are more ordinary than a crisis headline suggests, until they are not. EASA’s figure of more than 1.6 million registered operators in Europe is a population of people and firms authorised by member states under one EU rule set. Some fly for fun. The agency’s own navigation separates that from flying for work, and it points cities, regions, national authorities, operators, and manufacturers toward an innovative air-mobility conversation. The affected party is not only the pilot. It is the city underneath, the authority that authorises, and the person who never consented to a camera or a delivery over a roof.",
          "The FAA’s page makes the same split in American offices. Recreational flyers, certificated commercial pilots, public-safety programmes, educators, and advanced operators doing delivery or agricultural dispensing are different users of one airspace. Public safety has its own door: how to operate, how to start a programme, what authority an agency has when it handles sightings, and contacts for law enforcement. Package delivery and farm spraying are on the same website as temporary flight restrictions. The institution affected by a drone may be a police unit, a farmer, a carrier, or an airport. The rule does not change its name because the mission sounds benign.",
          "Reuters’s Luxembourg report is the affected airport in one evening. The government said on Saturday, 19 September 2026, that an investigation was ongoing after Luxembourg Airport suspended operations the previous evening “following the visual sighting of unidentified and unauthorized drones within the airspace over Findel.” Nineteen flights were diverted. Operations resumed at about 1:20 a.m. local time, 2320 GMT on Friday. Prime Minister Luc Frieden said the country had been confronted with something new for Luxembourg, potentially bigger drones, observed over the past few days, which led to the precautionary stop. An interministerial drone assessment unit convened. The government said the information did not yet allow definitive conclusions, and that authorities were still checking with international partners. Passengers, airlines, and the night shift lived the consequence before anyone could name an operator.",
          "The Anduril story is a different affected party: a government waiting on a weapons decision, and a company whose founder says the wait is the business. Palmer Luckey said in Taipei on 19 September that a delay in U.S. approval of arms sales to Taiwan was affecting Anduril. Reuters reported a $14 billion package awaiting presidential approval for months. Luckey said the company’s business with Taiwan would be in a different place if that package were moving, and he declined to detail what was delayed. Taiwan uses Anduril’s Altius drone. Last year it unveiled the Barracuda-500, an autonomous low-cost cruise missile jointly made with the firm. President Lai has made drones central to military modernisation. China sanctioned Luckey in December for selling weapons to Taiwan. The people affected include a military that wants systems, a company that wants a licence to proceed, and a political relationship in which Reuters reported the package had been described as a negotiating chip.",
          "Put the two Reuters pieces next to EASA’s 1.6 million and the FAA’s public-safety toolkit and the pattern is uncomfortable and useful. Most registered flying is banal administration. Some flying closes an airport. Some flying is a sovereign arms question. An institution that writes one policy for all three will either smother the ordinary operator or under-prepare the night the runway stops.",
          "Frieden’s phrase, “something new for Luxembourg,” is a statement of scale, not a technical specification. In the remarks Reuters published he did not name a type, a weight, or an operator. The government sentence — that the information did not allow definitive conclusions — is the fact that has to survive the next briefing. Adding a suspect the article does not contain would make the institution less informed, not more.",
          "VisionSeek analysis: name the affected party before the technology. Airport, city, farm, soldier, or firm. The response that fits one of them is a mistake for the others.",
        ],
        ar: [
          "الناس في هذه القصة أهدأ مما يوحي عنوان الأزمة، إلى أن لا يعودوا كذلك. رقم الوكالة الأوروبية، أكثر من 1.6 مليون مشغّل مسجّل، سكان من أشخاص وشركات ترخّصهم الدول الأعضاء تحت قواعد واحدة. بعضهم يطير للمتعة. وتصفح الوكالة نفسها يفرّق ذلك عن الطيران للعمل، ويوجّه المدن والأقاليم والسلطات الوطنية والمشغّلين والمصنّعين إلى حديث التنقل الجوي. المتأثر ليس الطيار وحده. هو المدينة تحته، والسلطة التي ترخّص، والشخص الذي لم يوافق على كاميرا أو توصيل فوق سطحه.",
          "صفحة الإدارة الأمريكية تقسم الانقسام نفسه بمكاتب أمريكية. هواة، وطيارون تجاريون مجازون، وبرامج سلامة عامة، وتعليم، ومشغّلون متقدمون للتوصيل أو النثر الزراعي، مستخدمون مختلفون لمجال واحد. وللسلامة العامة باب: كيف تشغّل، وكيف تبدأ برنامجًا، وأي سلطة عند جهة تتعامل مع المشاهدات، وجهات اتصال لإنفاذ القانون. والتوصيل ورش المزارع على الموقع نفسه مع قيود الطيران المؤقتة. المؤسسة المتأثرة بدرون قد تكون وحدة شرطة أو مزرعة أو ناقلاً أو مطارًا. القاعدة لا تغيّر اسمها لأن المهمة تبدو حميدة.",
          "تقرير رويترز عن لوكسمبورغ هو المطار المتأثر في مساء واحد. الحكومة قالت السبت 19 سبتمبر 2026 إن تحقيقًا جارٍ بعدما أوقف مطار لوكسمبورغ التشغيل مساء اليوم السابق «إثر المشاهدة البصرية لدرونات مجهولة وغير مأذونة في المجال فوق فيندل». حُوّلت 19 رحلة. وعاد التشغيل حوالى الواحدة وعشرين دقيقة بعد منتصف الليل بالتوقيت المحلي. رئيس الوزراء لوك فريدن قال إن البلد واجه شيئًا جديدًا عليه، درونات يُحتمل أنها أكبر، لوحظت في الأيام السابقة، فكانت سبب الإيقاف الاحترازي. واجتمعت وحدة تقييم درون بين الوزارات. والحكومة قالت إن المعلومات لا تسمح بعد باستنتاجات نهائية، وإن السلطات ما زالت تفحص مع شركاء دوليين. الركاب والشركات ووردية الليل عاشوا النتيجة قبل أن يسمي أحد المشغّل.",
          "قصة أندوريل طرف متأثر مختلف: حكومة تنتظر قرار سلاح، وشركة يقول مؤسسها إن الانتظار هو العمل. بالمر لوكي قال في تايبيه في 19 سبتمبر إن تأخر الموافقة الأمريكية على مبيعات السلاح لتايوان يؤثر في أندوريل. ورويترز نقلت حزمة 14 مليار دولار تنتظر موافقة رئاسية منذ أشهر. ولوكي قال إن عمل الشركة مع تايوان كان سيكون في موضع آخر لو تحركت الحزمة، ورفض تفصيل ما تأخر. وتايوان تستخدم درون ألتيوس. والعام الماضي كشفت باراكودا-500، صاروخًا جوّالًا منخفض الكلفة وذاتي التشغيل صُنع مع الشركة. والرئيس لاي جعل الدرونات محور التحديث العسكري. والصين عاقبت لوكي في ديسمبر لبيعه أسلحة لتايوان. المتأثرون جيش يريد أنظمة، وشركة تريد إذنًا تمضي به، وعلاقة سياسية نقلت رويترز أن الحزمة وُصفت فيها كورقة تفاوض.",
          "ضع خبري رويترز بجانب 1.6 مليون لدى الوكالة الأوروبية وعدة السلامة العامة الأمريكية، فيصير النمط مزعجًا ومفيدًا. أكثر الطيران المسجّل إدارة عادية. بعضه يغلق مطارًا. وبعضه سؤال سلاح سيادي. مؤسسة تكتب سياسة واحدة للثلاثة إما تخنق المشغّل العادي أو تتأهب أقل من الليلة التي يتوقف فيها المدرج.",
          "عبارة فريدن، «شيء جديد على لوكسمبورغ»، بيان حجم لا مواصفة فنية. في الكلام الذي نشرته رويترز لم يسمِّ نوعًا ولا وزنًا ولا مشغّلًا. وجملة الحكومة — أن المعلومات لا تسمح باستنتاجات نهائية — هي الواقعة التي يلزم أن تعيش الإحاطة التالية. إضافة متهم لا يحتويه المقال تجعل المؤسسة أقل علمًا لا أكثر.",
          "تحليل VisionSeek: سمِّ الطرف المتأثر قبل التقنية. مطار، أو مدينة، أو مزرعة، أو جندي، أو شركة. الرد الذي يصلح لواحد منهم خطأ على الباقين.",
        ],
      },
      questions: {
        en: [
          "Who was affected the last time a drone entered our airspace: passengers, a site, or a military customer?",
          "Do we regulate the ordinary operator and the unidentified flight with the same office?",
          "What would we still not know, as Luxembourg said it did not, the morning after a stop?",
        ],
        ar: [
          "مين اتأثر آخر مرة دخل درون مجالنا: ركاب، ولا موقع، ولا زبون عسكري؟",
          "إحنا بننظّم المشغّل العادي والرحلة المجهولة من المكتب نفسه؟",
          "إيه اللي هنفضل مش عارفينه، زي ما لوكسمبورغ قالت، صباح اليوم اللي بعد الإيقاف؟",
        ],
      },
      deeper: [easa, faa, luxembourg, anduril],
      glossary: null,
    },
    {
      slug: "drones-what-an-institution-should-ask",
      part: 4,
      publishedAt: "2026-09-08T09:00:00.000Z",
      source: "CISA",
      title: { en: "What to ask before any counter-drone step", ar: "ماذا تسأل قبل أي خطوة مضادة" },
      summary: {
        en: "CISA’s instruction to tell routine flight from suspicious flight and to call law enforcement, read against an airport that stopped and did not yet conclude.",
        ar: "تعليمات جهاز الأمن الأمريكي للتفريق بين الرحلة العادية والرحلة المريبة واستدعاء إنفاذ القانون، مقروءة مع مطار توقف ولم يحسم بعد.",
      },
      body: {
        en: [
          "Counter-drone talk usually starts at the wrong end, with a device. The public guidance that was actually open for this edition starts earlier. On 19 November 2025 the U.S. Cybersecurity and Infrastructure Security Agency published Suspicious Unmanned Aircraft System Activity Guidance for critical-infrastructure stakeholders. The page says the guidance covers four jobs: understanding routine drone activity and what is particular to a facility; understanding what drones can do, where assets are vulnerable, and how a drone can be used to do harm; recognising suspicious indicators and the response that fits; and responding, including by engaging law enforcement. Questions go to sUASsecurity@cisa.dhs.gov. That is a sequence. Watch, distinguish, then call the people who have authority. It is not a catalogue of equipment.",
          "The sequence matters because most nearby flight may be lawful. The FAA’s integration project exists so that registered, identified aircraft can share the national airspace. Remote ID exists so a drone in flight can broadcast identity and location, and so the FAA and law enforcement can locate a control station when a flight looks unsafe or forbidden. An institution that treats every dot on a screen as an attack will spend its response on compliant pilots. An institution that treats no dot as an attack will meet Findel. CISA’s first job — know what routine looks like at this facility — is the only way to tell those days apart.",
          "Luxembourg is the case of a government that chose a precaution without a conclusion. Flights stopped after a visual sighting of unidentified and unauthorised drones over Findel. Nineteen flights diverted. The airport reopened at about 1:20 a.m. The prime minister said the drones had been observed over several days and might be larger than what the country had known. The interministerial unit met. The official sentence was that available information did not allow definitive conclusions, and that checks continued with international partners. Stopping the operation was a decision. Naming an operator was not yet possible. A leadership team should notice both halves. Action and knowledge are not the same milestone.",
          "Military drones raise a different question and should not be smuggled into a facility checklist. Reuters reported Taiwan’s use of Anduril’s Altius and the unveiling of the Barracuda-500, and a $14 billion U.S. package whose delay Luckey said was holding business in place. That is a state-to-state arms issue. A port, a stadium, or a ministry campus does not answer it by improvising a response on the roof. CISA’s page is aimed at stakeholders worried about activity near facilities, and its response line is engagement with law enforcement. The FAA’s public-safety material likewise points agencies toward their authority and toward law-enforcement contacts when they handle sightings.",
          "Europe’s categories still matter on the night of an incident. An Open-category flight, a Specific-category operation, and a Certified operation are not equally strange. U-space, where it exists, is a managed environment, not a free-for-all. An institution that cannot ask which regime a reported flight might have been in will treat a registered delivery the same as an unidentified aircraft over a runway. The questions below are the ones to write down before anyone proposes a purchase. They do not authorise anyone to interfere with an aircraft. Interference is a legal question for counsel and for the authorities CISA and the FAA already point to.",
          "The FAA’s public-safety list is the domestic pair to CISA’s page: operate a programme, understand authority when handling sightings and reports, use the law-enforcement contacts, and treat emergencies as their own case. Between those two U.S. pages the homework is organisational. It is who picks up the phone. It is not which signal to overpower. EASA’s single rule set, authorised country by country, is the European reminder that “we saw a drone” is not yet “we know which regime it was in.”",
          "VisionSeek analysis: the first counter-drone decision is who is allowed to watch, who must be called, and who is forbidden to touch the aircraft. A device that skips those three names is not a programme. It is an exposure.",
        ],
        ar: [
          "كلام مضاد الدرون عادة يبدأ من الطرف الخطأ، من جهاز. الإرشاد العلني الذي فُتح فعلًا لهذه الطبعة يبدأ أبكر. في 19 نوفمبر 2025 نشرت وكالة الأمن السيبراني وأمن البنية التحتية الأمريكية إرشادًا عن نشاط الدرون المريب لأصحاب الشأن في البنية الحرجة. الصفحة تقول إن الإرشاد يغطي أربعة أعمال: فهم النشاط العادي وما يختص بكل منشأة؛ وفهم ما تقدر الدرونات تفعله وأين الأصول هشّة وكيف تُستخدم للإضرار؛ والتعرّف على مؤشرات الريبة والرد المناسب؛ والرد، بما فيه استدعاء إنفاذ القانون. والأسئلة إلى بريد sUASsecurity@cisa.dhs.gov. هذا ترتيب. راقب، وميّز، ثم نادِ من له سلطة. ليس كتالوج معدات.",
          "الترتيب يهم لأن أكثر الطيران القريب قد يكون مشروعًا. مشروع الإدماج لدى إدارة الطيران قائم حتى تشارك طائرات مسجّلة ومعرّفة المجال الوطني. والتعريف عن بعد قائم حتى يبث درون في الطيران هوية وموقعًا، وحتى تستطيع الإدارة وإنفاذ القانون تحديد محطة التحكم حين تبدو الرحلة غير آمنة أو ممنوعة. مؤسسة تعامل كل نقطة على الشاشة كهجوم ستنفق ردها على طيارين ممتثلين. ومؤسسة لا تعامل أي نقطة كهجوم ستلقى فيندل. العمل الأول عند الوكالة الأمريكية — اعرف شكل العادي في هذه المنشأة — هو الطريق الوحيد للتفريق بين اليومين.",
          "لوكسمبورغ حالة حكومة اختارت الاحتياط من غير حسم. توقف الطيران بعد مشاهدة بصرية لدرونات مجهولة وغير مأذونة فوق فيندل. حُوّلت تسع عشرة رحلة. وعاد المطار حوالى الواحدة وعشرين دقيقة بعد منتصف الليل. ورئيس الوزراء قال إن الدرونات لوحظت على أيام وقد تكون أكبر مما عرفه البلد. واجتمعت الوحدة بين الوزارات. والجملة الرسمية أن المعلومات المتاحة لا تسمح باستنتاجات نهائية، وأن الفحص مستمر مع شركاء دوليين. إيقاف التشغيل كان قرارًا. وتسمية المشغّل لم تكن ممكنة بعد. على القيادة أن ترى النصفين. الفعل والمعرفة ليسا المحطة نفسها.",
          "درونات الجيوش تثير سؤالًا آخر ولا يجوز تهريبها إلى قائمة منشأة. رويترز نقلت استخدام تايوان لألتيوس وكشف باراكودا-500، وحزمة 14 مليارًا قال لوكي إن تأخرها يبقي العمل في مكانه. هذه مسألة سلاح بين دول. ميناء أو استاد أو حرم وزارة لا يجيب عنها بارتجال على السطح. صفحة الوكالة الأمريكية موجهة لمن يقلق من نشاط قرب المنشآت، وسطر الرد فيها استدعاء إنفاذ القانون. ومادة السلامة العامة لدى إدارة الطيران تشير كذلك إلى سلطة الجهة وإلى جهات الاتصال الأمنية حين تتعامل مع المشاهدات.",
          "فئات أوروبا تظل مهمة ليلة الحادث. رحلة في الفئة المفتوحة وعملية محددة وعملية معتمدة ليست غريبة بالدرجة نفسها. والفضاء U، حيث يوجد، بيئة تُدار لا ساحة مفتوحة. مؤسسة لا تستطيع أن تسأل في أي نظام قد تكون الرحلة المبلَّغ عنها ستعامل توصيلًا مسجّلًا كطائرة مجهولة فوق مدرج. الأسئلة أدناه تُكتب قبل أن يقترح أحد شراءً. هي لا تأذن لأحد بالتدخل في طائرة. التدخل سؤال قانوني للمستشار وللسلطات التي تشير إليها الوكالة والإدارة أصلًا.",
          "قائمة السلامة العامة لدى إدارة الطيران هي الزوج المحلي لصفحة الوكالة الأمريكية: شغّل برنامجًا، وافهم السلطة عند التعامل مع المشاهدات والبلاغات، واستخدم جهات الاتصال الأمنية، وعامل الطوارئ كحالة قائمة بذاتها. بين الصفحتين الأمريكيتين الواجب تنظيمي. هو من يرفع السماعة. ليس أي إشارة تُغلب. ومجموعة القواعد الأوروبية الواحدة، والترخيص دولة بدولة، تذكير بأن «شفنا درون» ليست بعد «نعرف في أي نظام كان».",
          "تحليل VisionSeek: أول قرار مضاد للدرون هو من يُسمح له أن يراقب، ومن يجب أن يُستدعى، ومن يُمنع من لمس الطائرة. جهاز يتخطى هذه الأسماء الثلاثة ليس برنامجًا. هو تعرّض.",
        ],
      },
      questions: {
        en: [
          "What does routine flight over this site look like, and who updates that picture?",
          "Who is called — which police or aviation authority — before anyone touches a system aimed at an aircraft?",
          "What will we do, as Luxembourg did, if we must stop operations and still have no conclusion?",
        ],
        ar: [
          "الطيران العادي فوق الموقع ده شكله إيه، ومين يحدّث الصورة دي؟",
          "مين بيتنادى — أي شرطة أو سلطة طيران — قبل ما حد يلمس نظامًا مصوَّبًا على طائرة؟",
          "هنعمل إيه، زي لوكسمبورغ، لو لازم نوقف التشغيل ولسه ما عندناش استنتاج؟",
        ],
      },
      deeper: [cisa, remoteId, luxembourg, faa],
      glossary: null,
    },
    {
      slug: "drones-glossary",
      part: 5,
      publishedAt: "2026-09-08T08:00:00.000Z",
      source: "EASA",
      title: { en: "Glossary", ar: "مسرد" },
      summary: {
        en: "The airspace words in this series, each tied to EASA, the FAA, CISA, or a Reuters report.",
        ar: "كلمات المجال في هذه السلسلة، كل كلمة مربوطة بالوكالة الأوروبية أو الطيران الأمريكي أو إرشاد البنية أو تقرير رويترز.",
      },
      body: {
        en: [
          "Use these sentences when a meeting starts inventing synonyms. They are narrow on purpose. A wider meaning needs a source this edition did not open.",
          "An unmanned aircraft system is the European and American name for the drone plus what it takes to fly it. EASA’s domain covers drones and eVTOL aircraft and says both are meant to be designed to high safety standards in Europe. An operator, in EASA’s figure, is one of more than 1.6 million registered drone operators in Europe, under one EU rule set, authorised by a member state. That word is not a synonym for “pilot” in every legal system, but it is the word Europe counts.",
          "Open, Specific, and Certified are EASA’s three operation categories. They separate kinds of flying. They are not quality ratings. Regulation (EU) 2019/947 of 24 May 2019 sets rules and procedures for operation. Regulation (EU) 2019/945 of 12 March 2019 covers systems and third-country operators. U-space, Regulation (EU) 2021/664, is the European framework for a managed drone-traffic environment. Easy Access Rules are EASA’s consolidated way of reading those texts. They are not a substitute for the regulation.",
          "In the United States, the national airspace is the system the FAA says it is integrating drones into. Part 107 is the rule path for certificated remote pilots, including commercial flying, with waivers and a separate treatment of operations over people. TRUST is the recreational safety test. LAANC is an authorisation tool. A temporary flight restriction is a place and time where the usual permission does not hold. B4UFLY is the FAA’s tool for asking where a person may fly. Remote ID is a broadcast of identification and location from a drone in flight, required for drones that must be registered, so the FAA and law enforcement can find a control station when a flight looks unsafe or forbidden. A Standard Remote ID drone has the broadcast built in. A broadcast module is a retrofit and is flown within visual line of sight. A FRIA is a defined area where a drone without Remote ID may fly, still within line of sight and inside the area.",
          "CISA’s November 2025 guidance uses “suspicious” as a conclusion you earn, not a label you start with. The guidance asks stakeholders to know routine activity, to know capabilities and vulnerabilities, to recognise indicators, and to respond by engaging law enforcement. It is written for people responsible for facilities. It does not, on the page that was opened, hand them a weapon.",
          "Two news uses of the word should stay marked as news. Over Findel, Reuters reported unidentified and unauthorised drones, nineteen diverted flights, a reopening at about 1:20 a.m., and a government that said it could not yet draw definitive conclusions. In Taipei, Reuters reported Anduril’s Altius in Taiwanese service and the Barracuda-500 as an autonomous low-cost cruise missile, inside a $14 billion package still awaiting approval. “Drone” covered both stories. The glossary is here so the next memo does not.",
          "Part 107 and TRUST are easy to blur on a slide because both sound like “American rules.” They are not interchangeable. TRUST is the test for recreational flyers. Part 107 is the certificate path for remote pilots, including people who fly as a business, and it is the path that registers each aircraft on its own. A ministry writing a permit for a contractor who says “we are hobby-legal” is reading the wrong line of the FAA page. EASA’s split between flying for fun and flying for work is the European version of the same mistake.",
          "VisionSeek analysis: if a proposed purchase cannot be described with the words on this page — category, identification, authority to call — it is ahead of the institution’s vocabulary, which means it is ahead of the institution’s control.",
        ],
        ar: [
          "استخدم هذه الجمل حين يبدأ اجتماع في اختراع مرادفات. هي ضيقة عمدًا. المعنى الأوسع يحتاج مصدرًا لم تُفتح هذه الطبعة عليه.",
          "نظام الطائرة غير المأهولة هو الاسم الأوروبي والأمريكي للدرون وما يلزمه ليطير. مجال الوكالة الأوروبية يغطي الدرونات وطائرات الإقلاع العمودي الكهربائية ويقول إن الاثنين يُراد لهما تصميم بمعايير سلامة عالية في أوروبا. والمشغّل، في رقم الوكالة، واحد من أكثر من 1.6 مليون مشغّل مسجّل في أوروبا، تحت قواعد اتحاد واحدة، ترخّصه دولة عضو. الكلمة ليست مرادف «طيار» في كل نظام قانوني، لكنها الكلمة التي تعدّها أوروبا.",
          "المفتوحة والمحددة والمعتمدة فئات التشغيل الثلاث لدى الوكالة. تفرّق أنواع الطيران. ليست درجات جودة. اللائحة 2019/947 في 24 مايو 2019 تضع قواعد التشغيل وإجراءاته. واللائحة 2019/945 في 12 مارس 2019 تغطي الأنظمة ومشغّلي الدول الثالثة. والفضاء U، اللائحة 2021/664، الإطار الأوروبي لبيئة مرور درون تُدار. والقواعد الميسّرة طريقة الوكالة لقراءة هذه النصوص مجموعة. ليست بديلًا عن اللائحة.",
          "في الولايات المتحدة، المجال الجوي الوطني هو النظام الذي تقول الإدارة إنها تدمج الدرونات فيه. والجزء 107 مسار القاعدة للطيار المجاز عن بعد، ومنه الطيران التجاري، مع تنازلات ومعاملة منفصلة للتحليق فوق الناس. واختبار TRUST اختبار السلامة الترفيهي. وLAANC أداة تصريح. وقيد الطيران المؤقت مكان وزمان لا يسري فيهما الإذن المعتاد. وB4UFLY أداة الإدارة للسؤال أين يجوز أن يطير الشخص. والتعريف عن بعد بث هوية وموقع من درون في الطيران، مطلوب للدرون الواجب تسجيله، حتى تجد الإدارة وإنفاذ القانون محطة التحكم حين تبدو الرحلة غير آمنة أو ممنوعة. ودرون التعريف القياسي فيه البث مبنيًا. ووحدة البث إضافة لاحقة وتُطار داخل خط النظر. والمنطقة المعترف بها مساحة محددة يجوز فيها طيران درون بلا تعريف، مع البقاء في خط النظر وداخل المساحة.",
          "إرشاد نوفمبر 2025 يستخدم «مريب» كنتيجة تُكتسب، لا كملصق تبدأ به. الإرشاد يطلب من أصحاب الشأن أن يعرفوا النشاط العادي، وأن يعرفوا القدرات والهشاشة، وأن يتعرّفوا على المؤشرات، وأن يردوا باستدعاء إنفاذ القانون. هو مكتوب لمن يتحمل منشآت. وهو، في الصفحة التي فُتحت، لا يسلّمهم سلاحًا.",
          "استخدامان خبريان للكلمة يبقيان موسومين كخبر. فوق فيندل، نقلت رويترز درونات مجهولة وغير مأذونة، وتسع عشرة رحلة حُوّلت، وإعادة تشغيل حوالى الواحدة وعشرين دقيقة بعد منتصف الليل، وحكومة قالت إنها لا تستطيع بعد استنتاجًا نهائيًا. وفي تايبيه، نقلت رويترز ألتيوس في خدمة تايوان وباراكودا-500 صاروخًا جوّالًا منخفض الكلفة وذاتي التشغيل، داخل حزمة 14 مليارًا ما زالت تنتظر الموافقة. «درون» غطى القصتين. المسرد هنا حتى لا تفعل المذكرة التالية ذلك.",
          "الجزء 107 واختبار TRUST يسهل خلطهما في شريحة لأن كليهما يبدو «قواعد أمريكية». هما ليسا متبادلين. TRUST اختبار الهواة. والجزء 107 مسار الإجازة للطيار عن بعد، ومنه من يطير كعمل، وهو المسار الذي يسجّل كل طائرة وحدها. وزارة تكتب تصريحًا لمتعاقد يقول «إحنا قانونيين كهواة» تقرأ السطر الخطأ في صفحة الإدارة. وتفريق الوكالة الأوروبية بين الطيران للمتعة والطيران للعمل هو النسخة الأوروبية من الخطأ نفسه.",
          "تحليل VisionSeek: إذا تعذّر وصف شراء مقترح بكلمات هذه الصفحة — فئة، وتعريف، وسلطة تُستدعى — فهو سابق على معجم المؤسسة، يعني سابق على سيطرتها.",
        ],
      },
      questions: {
        en: [
          "Which word in our draft order is not defined on this page?",
          "Are we describing a civil category, a Remote ID fit, or a military missile?",
          "Who is the authority we engage, in one sentence a night shift can read?",
        ],
        ar: [
          "أي كلمة في طلب الشراء مش معرّفة في الصفحة دي؟",
          "إحنا بنوصف فئة مدنية، ولا تجهيز تعريف عن بعد، ولا صاروخًا عسكريًا؟",
          "مين السلطة اللي نستدعيها، في جملة تقدر وردية الليل تقراها؟",
        ],
      },
      deeper: [easa, easaRules, faa, remoteId, cisa],
      glossary: [
        {
          term: { en: "Operator", ar: "مشغّل" },
          meaning: {
            en: "EASA’s counted person or firm: one of more than 1.6 million registered drone operators in Europe under a single EU rule set.",
            ar: "من تعدّه الوكالة الأوروبية: واحد من أكثر من 1.6 مليون مشغّل درون مسجّل في أوروبا تحت قواعد اتحاد واحدة.",
          },
        },
        {
          term: { en: "Remote ID", ar: "التعريف عن بعد" },
          meaning: {
            en: "The FAA’s broadcast of a drone’s identity and location in flight, required when the drone must be registered.",
            ar: "بث إدارة الطيران الأمريكية لهوية الدرون وموقعه في الطيران، مطلوب حين يكون التسجيل واجبًا.",
          },
        },
        {
          term: { en: "U-space", ar: "الفضاء U" },
          meaning: {
            en: "Europe’s managed drone-traffic framework under Regulation (EU) 2021/664.",
            ar: "إطار أوروبا لإدارة مرور الدرونات بموجب اللائحة الأوروبية 2021/664.",
          },
        },
      ],
    },
  ],
};

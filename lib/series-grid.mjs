/** Grid resilience, five parts. Facts are limited to the IEA grids report, the U.S. Department of Energy Office of Electricity page, and the Reuters account of Cuba’s September 2026 collapse. */

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
const cuba = {
  href: "https://www.reuters.com/business/energy/cuba-energy-grid-suffers-nationwide-collapse-2026-09-18/",
  label: { en: "Reuters — Cuba’s grid collapse", ar: "رويترز — انهيار شبكة كوبا" },
};

export const gridSeries = {
  id: "grid-resilience",
  fieldId: "energy",
  title: { en: "Grid resilience in 5 parts", ar: "صلابة الشبكة في خمسة أجزاء" },
  category: { en: "Learn", ar: "تعلّم" },
  parts: [
    {
      slug: "grid-what-a-power-system-is",
      part: 1,
      publishedAt: "2026-09-09T12:00:00.000Z",
      source: "IEA",
      title: { en: "What a national power system is", ar: "ما هي منظومة الكهرباء" },
      summary: {
        en: "What the IEA says a grid has done for a century, and why the next decade asks it to grow faster than the last one.",
        ar: "ما تقوله وكالة الطاقة عن شبكة خدمت قرنًا، ولماذا العقد القادم يطلب منها أن تنمو أسرع من الذي سبقه.",
      },
      body: {
        en: [
          "A national power system is not a power plant with a logo. It is the path electricity takes from generation to a socket, and the institutions that keep that path standing. The International Energy Agency’s special report Electricity Grids and Secure Energy Transitions, published on 17 October 2023 under a CC BY 4.0 licence, calls grids the backbone of electricity systems. They have delivered power to households, businesses, and industry for over 100 years. The report’s landing page says the same thing in the language of places people recognise: homes, factories, offices, and hospitals.",
          "The IEA’s point is that this old backbone is now being asked to do a new job. Clean energy transitions are expanding the role of electricity. Electric vehicles, electric heating and cooling, and hydrogen made by electrolysis all land on the same wires. To meet countries’ national energy and climate goals, the world’s electricity use needs to grow 20 percent faster in the next decade than it did in the previous one. In a pathway to net zero emissions by 2050, consistent with limiting the temperature rise to 1.5 °C, demand would need to grow faster still. The wires have to be bigger before the new demand is polite enough to wait.",
          "Reaching those national goals, the executive summary says, means adding or refurbishing over 80 million kilometres of grids by 2040, the equivalent of the entire existing global grid. In a scenario where national goals are met on time, wind and solar PV account for over 80 percent of the total increase in global power capacity over the next two decades, compared with less than 40 percent over the past two decades. In the IEA’s Net Zero Emissions by 2050 Scenario the share of that increase is almost 90 percent. New lines are not a decoration on a renewable project. They are how a desert solar plant or an offshore wind farm reaches a city.",
          "The report is also about how grids are planned and run, not only about steel and cable. As variable renewables rise, power systems need more flexibility. In a scenario consistent with national climate goals, the need for system flexibility doubles between 2022 and 2030. Modern and digital grids are how the IEA says systems can use rooftop solar, demand response, storage, and grid-enhancing technologies. The U.S. Department of Energy’s Office of Electricity describes a related public job in one country: stabilize, optimize, and grow the electricity system so the grid delivers affordable, reliable, and secure energy. It says it works through advanced controls, information and communication technologies, and analytics, and through storage that is safer and more reliable while becoming more cost-effective.",
          "That office also says it invests in research and development for grid reliability, grid modernization, transmission deployment, and critical generation facilities, and that it partners with states and utilities. Those are national instruments. They are not a world plan. They show what a government looks like when it treats the grid as a system to be run, not as a backdrop for announcements.",
          "A collapse makes the definition concrete. Reuters reported that on Friday, 18 September 2026, Cuba’s electrical grid suffered a total collapse, leaving millions without power. Authorities said it was triggered by a failure in high-voltage transmission lines in central Cuba around 2 p.m. local time. Felix Estrada of the National Electrical Union said protocols were in place to begin a gradual restoration. By late evening, power had returned to a handful of Havana neighbourhoods, primarily around hospitals. The plant did not have to fail for the country to go dark. The path failed.",
          "VisionSeek analysis: when someone says “the power system,” ask whether they mean the plants, the lines, or the institutions that restore service. A national system is all three. A briefing that only names a fuel is a briefing about a warehouse.",
        ],
        ar: [
          "منظومة الكهرباء في بلد ليست محطة عليها شعار. هي الطريق من التوليد إلى المقبس، والمؤسسات التي تبقي هذا الطريق قائمًا. تقرير وكالة الطاقة الدولية الخاص «شبكات الكهرباء وانتقالات الطاقة الآمنة»، المنشور في 17 أكتوبر 2023 برخصة CC BY 4.0، يسمي الشبكات عمود أنظمة الكهرباء. هي توصل الكهرباء إلى البيوت والأعمال والصناعة منذ أكثر من مئة عام. وصفحة التقرير تقول الشيء نفسه بلغة الأماكن: بيوت، مصانع، مكاتب، مستشفيات.",
          "قصد الوكالة أن هذا العمود القديم مطلوب منه عمل جديد. انتقالات الطاقة النظيفة توسّع دور الكهرباء. السيارات الكهربائية والتدفئة والتبريد الكهربائيان والهيدروجين بالتحليل الكهربائي كلها تنزل على الأسلاك نفسها. وحتى تتحقق أهداف الدول في الطاقة والمناخ، يحتاج استخدام الكهرباء في العالم أن ينمو في العقد القادم أسرع بـ20 في المئة مما نما في العقد السابق. وفي مسار صافي الصفر بحلول 2050، المتسق مع حصر ارتفاع الحرارة في 1.5 درجة، الطلب يحتاج أن ينمو أسرع من ذلك. الأسلاك لازم تكبر قبل ما الطلب الجديد يستنى بأدب.",
          "بلوغ تلك الأهداف، يقول الملخص التنفيذي، يعني إضافة أو تجديد أكثر من 80 مليون كيلومتر من الشبكات بحلول 2040، ما يعادل الشبكة العالمية القائمة كلها. وفي سيناريو تتحقق فيه الأهداف الوطنية في وقتها، تمثّل الرياح والخلايا الشمسية أكثر من 80 في المئة من زيادة قدرة التوليد العالمية في العقدين القادمين، مقابل أقل من 40 في المئة في العقدين الماضيين. وفي سيناريو صافي الصفر تقارب الحصة 90 في المئة. الخط الجديد ليس زينة على مشروع متجدد. هو كيف تصل شمس الصحراء أو رياح البحر إلى المدينة.",
          "التقرير أيضًا عن طريقة التخطيط والتشغيل، لا عن الحديد والكابل فقط. مع ارتفاع المتجدد المتغير تحتاج الأنظمة مرونة أكبر. وفي سيناريو متسق مع الأهداف المناخية الوطنية، تتضاعف الحاجة لمرونة النظام بين 2022 و2030. والشبكات الحديثة والرقمية، عند الوكالة، هي سبيل استخدام الشمس على الأسطح والاستجابة للطلب والتخزين وتقنيات تحسين الشبكة. ومكتب الكهرباء في وزارة الطاقة الأمريكية يصف عملًا عامًا قريبًا في بلد واحد: تثبيت المنظومة وتحسينها وتنميتها حتى توصل الشبكة طاقة ميسورة وموثوقة وآمنة. ويعمل عبر التحكم المتقدم وتقنيات المعلومات والاتصال والتحليلات، وعبر تخزين أكثر أمانًا وموثوقية وأقرب إلى تكلفة تحتمل.",
          "والمكتب يقول إنه يستثمر في البحث والتطوير لموثوقية الشبكة وتحديثها ونشر النقل ومنشآت التوليد الحرجة، وإنه شريك للولايات والشركات. هذه أدوات وطنية. ليست خطة للعالم. هي شكل الحكومة حين تعامل الشبكة كنظام يُدار، لا كخلفية للتصريحات.",
          "الانهيار يجعل التعريف ملموسًا. رويترز نقلت أن شبكة كوبا انهارت كليًا يوم الجمعة 18 سبتمبر 2026، وبقي الملايين بلا كهرباء. وقالت السلطات إن السبب عطل في خطوط نقل عالية الجهد وسط البلاد حوالى الثانية بعد الظهر بالتوقيت المحلي. فيليكس إسترادا من الاتحاد الوطني للكهرباء قال إن البروتوكولات موضوعة لبدء استعادة تدريجية. ومع آخر المساء عادت الكهرباء إلى أحياء قليلة في هافانا، أساسًا حول المستشفيات. المحطة لا يلزم أن تسقط حتى يظلم البلد. الطريق هو الذي سقط.",
          "تحليل VisionSeek: لما حد يقول «منظومة الكهرباء»، اسأل: يقصد المحطات، ولا الخطوط، ولا المؤسسات التي تعيد الخدمة؟ المنظومة الوطنية الثلاثة معًا. إحاطة لا تسمي إلا الوقود إحاطة عن مخزن.",
        ],
      },
      questions: {
        en: [
          "When we say the power system, are we talking about plants, lines, or the body that restores service?",
          "Which new demand — vehicles, heat, industry — is arriving faster than our lines?",
          "Who, by name, partners with the grid operator when a corridor fails?",
        ],
        ar: [
          "لما نقول منظومة الكهرباء، بنتكلم عن محطات ولا خطوط ولا الجهة التي تعيد الخدمة؟",
          "أي طلب جديد — مركبات، حرارة، صناعة — بيوصل أسرع من خطوطنا؟",
          "مين بالاسم شريك لمشغّل الشبكة لما ممر ينقطع؟",
        ],
      },
      deeper: [iea, ieaReport, doe, cuba],
      glossary: null,
    },
    {
      slug: "grid-how-it-holds-and-fails",
      part: 2,
      publishedAt: "2026-09-09T11:00:00.000Z",
      source: "IEA",
      title: { en: "How it holds, and how it fails", ar: "كيف تصمد وكيف تسقط" },
      summary: {
        en: "Connection queues, slow lines, the IEA’s Grid Delay Case, and a national collapse that started in transmission.",
        ar: "طوابير الربط، وبطء الخطوط، وحالة تأخر الشبكة عند الوكالة، وانهيار وطني بدأ في النقل.",
      },
      body: {
        en: [
          "A grid holds when the next project can connect and the next fault can be isolated. It fails in both places: in the queue, before a single new kilowatt is delivered, and on the line, after the country has already come to depend on it. The IEA executive summary puts a number on the queue. At least 3,000 gigawatts of renewable projects, of which 1,500 gigawatts are in advanced stages, are waiting for a grid connection. That waiting list equals five times the solar PV and wind capacity added in 2022. The IEA says queue data were accessible for countries that account for half of global wind and solar PV capacity, so the worldwide queue is likely larger. Grids, in the report’s words, are becoming a bottleneck.",
          "Money explains part of the wait. Investment in renewables has been increasing rapidly, nearly doubling since 2010. Global investment in grids has barely changed, remaining around USD 300 billion a year. The report then builds a Grid Delay Case: less investment, less modernisation, less digitalisation, and fewer operational changes than its climate-focused scenarios assume. In that case, cumulative carbon dioxide emissions from the power sector to 2050 would be 58 gigatonnes higher than in a scenario aligned with national climate targets. The IEA says that increment equals the world’s power-sector carbon dioxide over the past four years. The long-term temperature rise would go well above 1.5 °C, with a 40 percent chance of exceeding 2 °C.",
          "The same case has a fuel consequence. After 2030, global gas imports would be over 80 billion cubic metres a year higher than in a scenario aligned with national climate targets, and coal imports nearly 50 million tonnes higher. Delayed grids also raise the risk that outages multiply. The IEA says such outages already cost around USD 100 billion a year, or 0.1 percent of global GDP. A late line is not only a climate statistic. It is a bill for darkness and a return to fuels the transition was meant to lean on less.",
          "Time is the structural reason the queue forms. New grid infrastructure often takes five to 15 years to plan, permit, and complete. New renewables take one to five years. New electric-vehicle charging infrastructure takes less than two. The thing the transition needs most is the thing that takes longest. The report’s landing page says the required upgrades are not only physical. They include the way grids are planned and managed, and it quantifies the cost of delay. Regulation, the executive summary says, has to reward the use of assets as well as the building of new ones, and it has to deal with administrative barriers.",
          "Cuba is a failure on the line, not a story about a connection queue. Reuters reported a total collapse on 18 September 2026, the latest of at least six partial or total collapses since January. The grid had collapsed three times in July. Rolling blackouts had spanned 30 hours or more across most of the country. The trigger named by authorities was a failure in high-voltage transmission in the centre of the island. Reuters also reported that an ageing generation system had been under strain from fuel shortages and decrepit infrastructure for years, and that a U.S. oil blockade beginning in January had worsened the blackouts. Restoration was described as gradual, and partial by late evening in Havana. A national system can be legally intact and still be dark because one corridor failed and the rest could not carry the country.",
          "The IEA’s recommendations sit next to that picture without pretending a small island’s fuel crisis is the world’s queue. Planning of transmission and distribution needs to line up with government long-term plans. Supply chains and a skilled workforce have to exist before the five-to-fifteen-year clock even starts. Firm project pipelines and standardised procurement are how the report says governments can make those supply chains less fragile.",
          "VisionSeek analysis: separate two failures in every briefing. One is “we cannot connect what we have already decided to build.” The other is “the system we have cannot survive the next fault.” They need different people, different years, and different money. A single slide titled “energy security” usually hides which one you are in.",
        ],
        ar: [
          "الشبكة تصمد إذا استطاع المشروع التالي أن يتصل، وإذا أمكن عزل العطل التالي. وتسقط في المكانين: في الطابور، قبل أن تُسلَّم أول كيلوواط جديدة، وعلى الخط، بعدما صار البلد معتمدًا عليها. الملخص التنفيذي لوكالة الطاقة يضع رقمًا على الطابور. ما لا يقل عن 3000 غيغاواط من مشاريع المتجدد، منها 1500 غيغاواط في مراحل متقدمة، تنتظر الربط. هذا الانتظار يساوي خمسة أضعاف قدرة الشمس والرياح التي أُضيفت في 2022. والوكالة تقول إن بيانات الطوابير تيسرت لدول تمثّل نصف قدرة الشمس والرياح العالمية، فالطابور العالمي غالبًا أكبر. الشبكات، بعبارة التقرير، تصير عنق زجاجة.",
          "المال يفسّر جزءًا من الانتظار. الاستثمار في المتجدد يتسارع، وقد كاد يتضاعف منذ 2010. الاستثمار العالمي في الشبكات بالكاد تغيّر، وبقي حول 300 مليار دولار في السنة. ثم يبني التقرير «حالة تأخر الشبكة»: استثمار وتحديث ورقمنة وتغيير تشغيلي أقل مما تفترض سيناريوهاته المناخية. في هذه الحالة، انبعاثات ثاني أكسيد الكربون التراكمية من قطاع الكهرباء حتى 2050 تزيد 58 غيغاطنًا عن سيناريو متسق مع الأهداف المناخية الوطنية. والوكالة تقول إن هذه الزيادة تعادل انبعاثات قطاع الكهرباء العالمي في السنوات الأربع الماضية. وارتفاع الحرارة على المدى الطويل يتجاوز 1.5 درجة بكثير، مع احتمال 40 في المئة لتجاوز درجتين.",
          "الحالة نفسها لها أثر في الوقود. بعد 2030 تزيد واردات الغاز العالمية بأكثر من 80 مليار متر مكعب سنويًا عن السيناريو المتسق مع الأهداف، وواردات الفحم بنحو 50 مليون طن. وتأخر الشبكات يرفع خطر تضاعف الانقطاعات. والوكالة تقول إن هذه الانقطاعات تكلف اليوم نحو 100 مليار دولار سنويًا، أو 0.1 في المئة من الناتج العالمي. الخط المتأخر ليس إحصائية مناخ فقط. هو فاتورة ظلام، وعودة إلى وقود كان يُراد الاتكاء عليه أقل.",
          "الزمن هو السبب البنيوي للطابور. البنية الجديدة للشبكة غالبًا تأخذ من 5 إلى 15 سنة للتخطيط والترخيص والإنجاز. المتجدد الجديد يأخذ من سنة إلى خمس. بنية شحن السيارات الكهربائية تأخذ أقل من سنتين. الشيء الذي يحتاجه الانتقال أكثر هو الأبطأ. وصفحة التقرير تقول إن التطوير المطلوب ليس ماديًا فقط. يشمل طريقة التخطيط والإدارة، ويقيس كلفة التأخر. والتنظيم، يقول الملخص، عليه أن يكافئ استخدام الأصول لا بناء الجديد فحسب، وأن يعالج الحواجز الإدارية.",
          "كوبا سقوط على الخط، لا قصة طابور ربط. رويترز نقلت انهيارًا كاملًا في 18 سبتمبر 2026، وهو الأخير في ستة انهيارات جزئية أو كلية على الأقل منذ يناير. والشبكة انهارت ثلاث مرات في يوليو. والانقطاعات المتناوبة امتدت 30 ساعة أو أكثر في معظم البلاد. والسبب الذي سمّته السلطات عطل في نقل عالي الجهد وسط الجزيرة. ورويترز نقلت أيضًا أن منظومة توليد مسنة كانت تحت ضغط نقص الوقود وتهالك البنية لسنوات، وأن حصارًا نفطيًا أمريكيًا بدأ في يناير فاقم الانقطاعات. والاستعادة وُصفت بأنها تدريجية، وجزئية آخر المساء في هافانا. منظومة قد تكون قائمة قانونًا وتظل مظلمة لأن ممرًا سقط والباقي لم يحمل البلد.",
          "توصيات الوكالة تقف بجانب هذه الصورة من غير أن تزعم أن أزمة وقود جزيرة صغيرة هي طابور العالم. تخطيط النقل والتوزيع يلزم أن يلتقي بخطط الحكومات الطويلة. وسلاسل الإمداد والعمالة الماهرة يلزم أن توجدا قبل أن تبدأ ساعة الخمس إلى الخمس عشرة سنة. ومسارات مشاريع ثابتة ومشتريات موحّدة هي، عند التقرير، طريقة الحكومات لجعل تلك السلاسل أقل هشاشة.",
          "تحليل VisionSeek: افصل سقوطين في كل إحاطة. الأول: «لا نستطيع ربط ما قررنا بناءه». والثاني: «ما عندنا لا يعيش العطل القادم». لكل منهما ناس وسنوات ومال مختلف. شريحة واحدة بعنوان «أمن الطاقة» عادة تخبي أنت في أيهما.",
        ],
      },
      questions: {
        en: [
          "How many projects are waiting on our connection queue, and who publishes that number?",
          "What is the permit-to-energise time for our next line, set next to the time for the plant it serves?",
          "If one high-voltage corridor fails this Friday, what still carries the capital by evening?",
        ],
        ar: [
          "كام مشروع مستني في طابور الربط عندنا، ومين ينشر الرقم؟",
          "قد إيه من الترخيص حتى التشغيل لخطنا الجاي، جنب وقت المحطة التي يخدمها؟",
          "لو ممر جهد عالٍ سقط الجمعة دي، إيه اللي يفضل شايل العاصمة بالليل؟",
        ],
      },
      deeper: [iea, ieaReport, cuba],
      glossary: null,
    },
    {
      slug: "grid-who-depends-on-it",
      part: 3,
      publishedAt: "2026-09-09T10:00:00.000Z",
      source: "IEA",
      title: { en: "Who depends on it", ar: "من يعتمد عليها" },
      summary: {
        en: "Households, factories, hospitals, utilities with weak finances, and a country where millions lost power in an afternoon.",
        ar: "بيوت ومصانع ومستشفيات، وشركات كهرباء مالها ضعيف، وبلد خسر ملايينه الكهرباء في عصر واحد.",
      },
      body: {
        en: [
          "Dependence is easy to understate because electricity is quiet when it works. The IEA report names the people on the other end of the wire without romance: households, businesses, and industry for more than a century, and, on the report page, homes, factories, offices, and hospitals. Electric vehicles, heat pumps, and electrolysis add new dependents who did not used to care how a transmission corridor was permitted. When the wire is late, those users do not experience a “grid investment gap.” They experience a project that cannot open, a factory that cannot run a second shift, or a hospital on a generator.",
          "The outage figure is the IEA’s way of pricing that experience. Economically damaging outages already cost around USD 100 billion a year, about 0.1 percent of global GDP. The Grid Delay Case says the risk is that those outages multiply if lines, digitalisation, and operations lag. The same case says countries would import more gas and more coal, which means the people who depend on the grid also depend, indirectly, on fuel markets the grid was supposed to make less decisive. A household does not buy a bcm of gas. A government does, and then the household lives with the price and the darkness.",
          "Not every country is stuck in the same place. The executive summary says the financial health of utilities is a central barrier in some countries, including India, Indonesia, and Korea. Access to finance and a high cost of capital are key barriers in many emerging and developing economies, particularly in sub-Saharan Africa. Emerging and developing economies excluding China have seen grid investment decline even while electricity demand and energy-access needs are strong. Advanced economies have seen steadier growth in grid investment, but the IEA says the pace still has to rise. In Europe, the United States, Chile, and Japan, the strongest barriers named are public acceptance of new projects and the need for regulatory reform. The person who depends on the grid may also be the person who objects to the line. Both facts can be true. A plan that treats the public only as load will meet the acceptance barrier the report already records.",
          "The U.S. Office of Electricity states its mission as delivery of affordable, reliable, and secure energy to the public, and says it partners with states and utilities so investment and technical assistance become service. That is one government’s description of dependence: the public is the point of the office, and the utilities and states are how the office reaches them. It is not a claim about every ministry in the world. It is a model of who gets named.",
          "Cuba shows dependence without a model. Reuters reported millions without power after the 18 September collapse. Many people in Havana were already dark when the grid fell. Frank Lorenzo, 23, told Reuters he had been without power for 24 hours, then had light for an hour before the collapse. By late evening only scattered neighbourhoods, mainly around hospitals, had power back. The hospitals are a hint of how a capital triages a blackout: clinical sites first, homes later, and no promise that “later” is the same night. Reuters described the strain as years of fuel shortage and worn infrastructure, worsened by an oil blockade that began in January. The people in the street are not a footnote to the high-voltage fault. They are the load the fault removed.",
          "VisionSeek analysis: list dependents in the order they lose and regain service, not in the order they appear in a strategy chapter. If hospitals return first, say so. If households wait through a second night, the briefing that stops at “restoration has begun” is incomplete.",
        ],
        ar: [
          "الاعتماد سهل أن يُستصغر لأن الكهرباء هادئة حين تعمل. وكالة الطاقة تسمي من في طرف السلك بلا تجميل: بيوت وأعمال وصناعة لأكثر من قرن، وعلى صفحة التقرير بيوت ومصانع ومكاتب ومستشفيات. السيارات الكهربائية ومضخات الحرارة والتحليل الكهربائي يضيفون معتمدين لم يكونوا يبالون كيف يُرخَّص ممر النقل. حين يتأخر السلك، هؤلاء لا يعيشون «فجوة استثمار في الشبكة». يعيشون مشروعًا لا يُفتتح، أو مصنعًا لا يدير وردية ثانية، أو مستشفى على مولّد.",
          "رقم الانقطاع هو طريقة الوكالة لتسعير هذه التجربة. الانقطاعات المكلفة اقتصاديًا تكلف اليوم نحو 100 مليار دولار سنويًا، حوالى 0.1 في المئة من الناتج العالمي. وحالة تأخر الشبكة تقول إن الخطر أن تتضاعف الانقطاعات إذا تأخرت الخطوط والرقمنة والتشغيل. والحالة نفسها تقول إن الدول ستستورد غازًا وفحمًا أكثر، فيصير من يعتمد على الشبكة معتمدًا، من طريق غير مباشر، على أسواق وقود كان يُراد للشبكة أن تجعلها أقل حسمًا. البيت لا يشتري مليار متر مكعب من الغاز. الحكومة تفعل، ثم يعيش البيت السعر والظلام.",
          "ليس كل بلد عالقًا في المكان نفسه. الملخص التنفيذي يقول إن الصحة المالية لشركات الكهرباء حاجز مركزي في بعض الدول، منها الهند وإندونيسيا وكوريا. والحصول على التمويل وارتفاع كلفة رأس المال حاجزان أساسيان في كثير من الاقتصادات الناشئة والنامية، خصوصًا في أفريقيا جنوب الصحراء. وهذه الاقتصادات، باستثناء الصين، رأت استثمار الشبكة ينخفض بينما الطلب والحاجة إلى النفاذ قويان. والاقتصادات المتقدمة رأت نموًا أثبت في استثمار الشبكة، لكن الوكالة تقول إن الوتيرة يلزم أن ترتفع. وفي أوروبا والولايات المتحدة وتشيلي واليابان، أقوى الحواجز المذكورة قبول الجمهور للمشاريع الجديدة والحاجة لإصلاح التنظيم. من يعتمد على الشبكة قد يكون نفسه من يعترض على الخط. الحقيقتان تقومان معًا. خطة تعامل الجمهور كحمل فقط ستلقى حاجز القبول الذي سجّله التقرير.",
          "مكتب الكهرباء الأمريكي يصوغ مهمته كإيصال طاقة ميسورة وموثوقة وآمنة للناس، ويقول إنه شريك للولايات والشركات حتى يصير الاستثمار والمساعدة الفنية خدمة. هذا وصف حكومة واحدة للاعتماد: الناس غاية المكتب، والشركات والولايات طريقه إليهم. ليس ادعاءً عن كل وزارة في العالم. هو نموذج لمن يُسمّى.",
          "كوبا تُظهر الاعتماد بلا نموذج. رويترز نقلت ملايين بلا كهرباء بعد انهيار 18 سبتمبر. وكثير في هافانا كانوا في الظلام أصلًا حين سقطت الشبكة. فرانك لورينزو، 23 عامًا، قال لرويترز إنه قضى 24 ساعة بلا كهرباء، ثم أضاءت ساعة قبل الانهيار. وآخر المساء لم تعد الكهرباء إلا لأحياء متفرقة، أساسًا حول المستشفيات. المستشفيات إشارة إلى كيف تفرز عاصمة انقطاعًا: المواقع العلاجية أولًا، والبيوت لاحقًا، ولا وعد أن «لاحقًا» هو الليلة نفسها. ورويترز وصفت الضغط كسنوات من نقص الوقود وتهالك البنية، فاقمه حصار نفطي بدأ في يناير. الناس في الشارع ليسوا هامشًا لعطل الجهد العالي. هم الحمل الذي أزاله العطل.",
          "تحليل VisionSeek: اكتب المعتمدين بترتيب من يفقد الخدمة ومن يستردها، لا بترتيب فصول الاستراتيجية. إذا عادت المستشفيات أولًا، قل ذلك. إذا انتظر البيوت ليلة ثانية، فالإحاطة التي تقف عند «الاستعادة بدأت» ناقصة.",
        ],
      },
      questions: {
        en: [
          "Who is restored first in our capital, and who is still dark the next morning?",
          "Is our barrier money, permitting, or public acceptance — and which source would we cite?",
          "Which hospital, port, or water plant has no second path if the main corridor opens?",
        ],
        ar: [
          "مين بيرجع له النور الأول في العاصمة، ومين لسه في الضلمة الصبح اللي بعده؟",
          "حاجزنا فلوس، ولا ترخيص، ولا قبول الناس — وهنستند لإيه؟",
          "أي مستشفى أو ميناء أو محطة مياه مالوش طريق تاني لو الممر الرئيسي انفتح؟",
        ],
      },
      deeper: [iea, cuba, doe],
      glossary: null,
    },
    {
      slug: "grid-what-an-institution-should-ask",
      part: 4,
      publishedAt: "2026-09-09T09:00:00.000Z",
      source: "IEA",
      title: { en: "What an institution should ask", ar: "ماذا تسأل المؤسسة" },
      summary: {
        en: "The questions that follow from a doubled investment need, a five-to-fifteen-year build, and a collapse that began on a transmission line.",
        ar: "الأسئلة التي تترتب على حاجة لمضاعفة الاستثمار، وبناء يأخذ من خمس سنوات إلى خمس عشرة، وانهيار بدأ في خط نقل.",
      },
      body: {
        en: [
          "An institution that buys or governs electricity should be able to answer a short list without calling a consultant into the room. The list comes from the IEA’s executive summary and from the way a real collapse was described by Reuters. It is not a national plan. It is the filter in front of one.",
          "First, the money. To meet national climate targets, the IEA says grid investment needs to nearly double by 2030, to over USD 600 billion a year, after more than a decade of stagnation around USD 300 billion, with the emphasis on digitalising and modernising distribution. If a budget still treats the grid as the remainder after generation is funded, it is describing the decade the report says has to end. The question is not whether USD 600 billion is “our” number. The question is whether our own grid line is growing, flat, or falling, and whether distribution is in that line or only the interconnector someone likes to inaugurate.",
          "Second, the clock. Five to 15 years to plan, permit, and complete a line, against one to five years for a renewable plant and under two years for vehicle charging, means the institution that starts when the plant is financed is already late. The report says transmission and distribution planning has to sit inside the government’s long-term plan, including transport, buildings, industry, and fuels such as hydrogen. A power ministry that learns about a port’s electrification from the newspaper is not planning. It is receiving.",
          "Third, the rules. Regulation should reward performance and the use of assets, not only new construction, and it should take administrative barriers seriously. The IEA also says regulatory risk assessments need to allow anticipatory investment. In jurisdictions it names — Europe, the United States, Chile, Japan — acceptance and regulatory reform are the binding barriers. In others, utility finances and the cost of capital are. An institution should know which paragraph it is in before it copies another country’s slogan.",
          "Fourth, the people and the hardware. The report says secure supply chains and a skilled workforce are conditions of building, and that pipelines of projects plus standardised procurement are how governments support those chains. Digital skills belong in the training of the power industry, not in a separate innovation office that never touches an outage. The U.S. Office of Electricity’s public description — reliability, modernisation, transmission, critical generation, work with states and utilities — is one way to staff that sentence. Another country will name different offices. The absence of any named office is the finding.",
          "Fifth, the fault. Cuba’s National Electrical Union could say, on the day, that protocols existed to begin a gradual restoration, and Reuters could still report millions in the dark, a sixth collapse since January, and hospitals ahead of homes. A protocol is not a result. The institutional question is what share of the capital is back by a stated hour, and what the operator is allowed to shed in order to get there. The IEA’s outage cost, about USD 100 billion a year worldwide, is the background. The local question is narrower and harder.",
          "The executive summary also says investment continues to rise in all regions beyond 2030, and that advanced economies have seen steady growth that still has to step up. Emerging and developing economies excluding China have seen grid investment decline in recent years despite robust demand growth and energy-access needs. An institution in that group should not borrow a talking point about public acceptance from Europe or Japan if its own constraint is the cost of capital. The report is explicit that barriers differ by region. Copying the wrong barrier spends the years the lead time already takes.",
          "VisionSeek analysis: put the five questions on one page and refuse a sixth about a technology brand. If the page cannot be filled from our own figures, the honest output is a list of missing figures, not a vision statement.",
        ],
        ar: [
          "المؤسسة التي تشتري الكهرباء أو تحكمها يلزم أن تجيب عن قائمة قصيرة من غير ما تستدعي مستشارًا إلى الغرفة. القائمة من الملخص التنفيذي لوكالة الطاقة ومن طريقة رويترز في وصف انهيار حقيقي. ليست خطة وطنية. هي المصفاة التي أمام الخطة.",
          "أولًا المال. حتى تُبلَغ الأهداف المناخية الوطنية، تقول الوكالة إن استثمار الشبكة يلزم أن يقارب الضعف بحلول 2030، إلى ما فوق 600 مليار دولار سنويًا، بعد أكثر من عقد من الجمود حول 300 مليار، مع التركيز على رقمنة توزيع الكهرباء وتحديثه. إذا ظلت الميزانية تعامل الشبكة كالباقي بعد تمويل التوليد، فهي تصف العقد الذي يقول التقرير إنه يجب أن ينتهي. السؤال ليس إن كان 600 مليار «رقمنا». السؤال إن كان بند شبكتنا ينمو أو يثبت أو ينخفض، وإن كان التوزيع داخل البند أم فقط خط الربط الذي يحب أحدهم افتتاحه.",
          "ثانيًا الساعة. من 5 إلى 15 سنة لتخطيط خط وترخيصه وإنجازه، مقابل سنة إلى خمس لمحطة متجددة وأقل من سنتين لشحن المركبات، يعني أن المؤسسة التي تبدأ حين تُموَّل المحطة قد تأخرت. والتقرير يقول إن تخطيط النقل والتوزيع يلزم أن يجلس داخل الخطة الحكومية الطويلة، بما فيها النقل والمباني والصناعة ووقود مثل الهيدروجين. وزارة كهرباء تعرف كهربة الميناء من الجريدة لا تخطط. هي تتلقى.",
          "ثالثًا القواعد. التنظيم يلزم أن يكافئ الأداء واستخدام الأصول، لا البناء الجديد فقط، وأن يأخذ الحواجز الإدارية بجد. والوكالة تقول أيضًا إن تقييم المخاطر التنظيمية يلزم أن يسمح بالاستثمار الاستباقي. وفي أماكن تسميها — أوروبا والولايات المتحدة وتشيلي واليابان — القبول وإصلاح التنظيم هما الحاجز الملزِم. وفي غيرها، مالية الشركات وكلفة رأس المال. على المؤسسة أن تعرف أي فقرة هي فيها قبل أن تنسخ شعار بلد آخر.",
          "رابعًا الناس والمعدات. التقرير يقول إن سلاسل إمداد آمنة وعمالة ماهرة شرط للبناء، وإن مسارات مشاريع ومشتريات موحّدة هي سند الحكومات لتلك السلاسل. والمهارة الرقمية مكانها في تدريب صناعة الكهرباء، لا في مكتب ابتكار منفصل لا يمس الانقطاع. وصف مكتب الكهرباء الأمريكي العلني — الموثوقية والتحديث والنقل والتوليد الحرج والعمل مع الولايات والشركات — طريقة واحدة لتوظيف هذه الجملة. بلد آخر سيسمي مكاتب مختلفة. غياب أي مكتب مسمّى هو النتيجة.",
          "خامسًا العطل. اتحاد كوبا الوطني للكهرباء استطاع يومها أن يقول إن بروتوكولات قائمة لبدء استعادة تدريجية، ورويترز استطاعت أن تنقل ملايين في الظلام، وانهيارًا سادسًا منذ يناير، ومستشفيات قبل البيوت. البروتوكول ليس نتيجة. السؤال المؤسسي: أي حصة من العاصمة ترجع في ساعة محددة، وما الذي يُسمح للمشغّل أن يقطعه ليبلغها. كلفة الانقطاع عند الوكالة، نحو 100 مليار دولار سنويًا في العالم، خلفية. السؤال المحلي أضيق وأصعب.",
          "الملخص التنفيذي يقول أيضًا إن الاستثمار يواصل الارتفاع في كل الأقاليم بعد 2030، وإن الاقتصادات المتقدمة رأت نموًا مطردًا يلزم أن يتسارع. والاقتصادات الناشئة والنامية من غير الصين رأت استثمار الشبكة ينخفض في السنوات الأخيرة رغم نمو الطلب وحاجات النفاذ. مؤسسة في هذه المجموعة لا تستعير حديث قبول الجمهور من أوروبا أو اليابان إذا كان قيدها كلفة رأس المال. التقرير صريح: الحواجز تختلف بحسب الإقليم. نسخ الحاجز الخطأ يستهلك السنوات التي يأخذها زمن الإنجاز أصلًا.",
          "تحليل VisionSeek: حط الأسئلة الخمسة في صفحة واحدة وارفض سادسًا عن ماركة تقنية. إذا الصفحة ما اتملأتش من أرقامنا، الناتج الصادق قائمة أرقام ناقصة، لا بيان رؤية.",
        ],
      },
      questions: {
        en: [
          "Is our grid budget growing toward the build we have already announced, or is it the remainder?",
          "Which line on the plan takes longer to permit than the plant it is meant to serve?",
          "What share of the capital must be back by a named hour after a transmission fault?",
        ],
        ar: [
          "ميزانية الشبكة عندنا بتكبر ناحية البناء اللي أعلناه، ولا هي الباقي؟",
          "أي خط في الخطة ترخيصه أطول من المحطة اللي مفروض يخدمها؟",
          "أي حصة من العاصمة لازم ترجع في ساعة مسمّاة بعد عطل نقل؟",
        ],
      },
      deeper: [iea, doe, cuba],
      glossary: null,
    },
    {
      slug: "grid-glossary",
      part: 5,
      publishedAt: "2026-09-09T08:00:00.000Z",
      source: "IEA",
      title: { en: "Glossary", ar: "مسرد" },
      summary: {
        en: "The grid words this series uses, tied to the IEA report, the U.S. Office of Electricity, or Reuters on Cuba.",
        ar: "كلمات الشبكة التي تستخدمها السلسلة، مربوطة بتقرير الوكالة أو بمكتب الكهرباء الأمريكي أو برويترز عن كوبا.",
      },
      body: {
        en: [
          "These meanings are fences. They keep a meeting from using “the grid” as a mood. Each one is taken from the IEA special report of 17 October 2023, from the U.S. Department of Energy’s Office of Electricity page, or from Reuters’s account of Cuba on 18 September 2026.",
          "A grid, in the IEA’s usage, is the backbone that has delivered electricity to households, businesses, and industry for over 100 years, and that must now connect new demand and new supply. Transmission moves power across distance, including from resource regions to cities. Distribution is the network closer to users. The report’s investment emphasis for the years to 2030 falls especially on digitalising and modernising distribution, not only on new long lines. A national power system is the plants, the grid, and the bodies that plan, permit, finance, and restore it. The Office of Electricity describes that public role as stabilizing, optimizing, and growing the system so energy is affordable, reliable, and secure.",
          "Variable renewables, as the executive summary uses the idea, are sources such as solar PV and wind whose output changes, so the system needs more flexibility. In a scenario consistent with national climate goals, that flexibility need doubles between 2022 and 2030. A connection queue is the set of projects waiting to be connected. The IEA counted at least 3,000 gigawatts waiting, 1,500 of them in advanced stages, equal to five times the solar PV and wind added in 2022, and said the world figure is likely higher because queue data covered countries with half of global wind and solar capacity. A gigawatt is the unit the report uses for that waiting list. It is a measure of capacity, not of energy delivered in a year.",
          "The Grid Delay Case is the IEA’s exploration of what happens if investment, modernisation, digitalisation, and operational change lag its climate-focused scenarios. Power-sector carbon dioxide to 2050 is 58 gigatonnes higher than in a scenario aligned with national climate targets, an amount the IEA sets beside four recent years of global power-sector emissions. Gas imports after 2030 are over 80 billion cubic metres a year higher, and coal imports nearly 50 million tonnes higher. The long-term temperature rise goes well above 1.5 °C, with a 40 percent chance of passing 2 °C. These are scenario results, not a forecast that names a country.",
          "Lead time is the five to 15 years the report gives for planning, permitting, and completing new grid infrastructure, set against one to five years for new renewables and less than two years for new vehicle-charging infrastructure. Digitalisation, in this report, is part of making grids flexible: using data, controls, and distributed resources such as rooftop solar, demand response, and storage. The Office of Electricity speaks of advanced controls, communications, analytics, and storage in the same neighbourhood of ideas.",
          "A collapse, in the Cuba report, was a total loss of the national grid, triggered by a high-voltage transmission failure, distinct from the rolling blackouts of 30 hours or more that Reuters said had already become common. Restoration was gradual and, by late evening in the capital, partial and concentrated near hospitals. “Protocols are in place” was the operator’s sentence. It did not mean the island was lit. An outage cost, in the IEA’s global figure, is about USD 100 billion a year. It is not the cost of one Friday in one capital.",
          "Flexibility, in the executive summary, doubles between 2022 and 2030 in a scenario consistent with national climate goals. It is not a brand of battery. It is the system’s ability to live with changing output from wind and solar, using grid-enhancing technologies, demand response, storage, and distributed resources such as rooftop solar. A meeting that says it will “add flexibility” without naming which of those it can procure has not used the word.",
          "VisionSeek analysis: if a word in the room is not on this page, ask which sentence it replaces. New labels are cheap. The queue, the lead time, and the fault are not.",
        ],
        ar: [
          "هذه المعاني أسوار. تمنع الاجتماع من استخدام «الشبكة» كمزاج. كل معنى مأخوذ من تقرير وكالة الطاقة في 17 أكتوبر 2023، أو من صفحة مكتب الكهرباء في وزارة الطاقة الأمريكية، أو من رواية رويترز عن كوبا في 18 سبتمبر 2026.",
          "الشبكة، في استعمال الوكالة، العمود الذي أوصل الكهرباء للبيوت والأعمال والصناعة لأكثر من مئة عام، والمطلوب منه الآن أن يصل طلبًا جديدًا وعرضًا جديدًا. النقل يحمل الكهرباء عبر المسافة، بما فيه من مناطق الموارد إلى المدن. التوزيع الشبكة الأقرب إلى المستخدم. وتركيز الاستثمار حتى 2030 يقع خصوصًا على رقمنة التوزيع وتحديثه، لا على الخطوط الطويلة وحدها. ومنظومة الكهرباء الوطنية هي المحطات والشبكة والجهات التي تخطط وترخّص وتموّل وتعيد الخدمة. ومكتب الكهرباء يصف هذا الدور العام بأنه تثبيت وتحسين ونمو حتى تكون الطاقة ميسورة وموثوقة وآمنة.",
          "المتجدد المتغير، كما يستخدمه الملخص، مصادر مثل الشمس والرياح يتغير إنتاجها، فيحتاج النظام مرونة أكبر. وفي سيناريو متسق مع الأهداف المناخية الوطنية تتضاعف هذه الحاجة بين 2022 و2030. وطابور الربط مجموعة المشاريع التي تنتظر الاتصال. والوكالة عدّت 3000 غيغاواط على الأقل في الانتظار، منها 1500 في مراحل متقدمة، بما يساوي خمسة أضعاف شمس ورياح 2022، وقالت إن رقم العالم غالبًا أعلى لأن البيانات غطت دولًا بنصف القدرة العالمية. والغيغاواط وحدة التقرير لقائمة الانتظار. هو قياس قدرة، لا طاقة مُسلَّمة في سنة.",
          "حالة تأخر الشبكة استكشاف الوكالة لما يحدث إذا تأخر الاستثمار والتحديث والرقمنة والتغيير التشغيلي عن سيناريوهاتها المناخية. ثاني أكسيد الكربون من قطاع الكهرباء حتى 2050 يزيد 58 غيغاطنًا عن سيناريو الأهداف الوطنية، مقدار تضعه الوكالة بجانب أربع سنوات حديثة من انبعاثات القطاع عالميًا. وواردات الغاز بعد 2030 تزيد بأكثر من 80 مليار متر مكعب سنويًا، والفحم بنحو 50 مليون طن. وارتفاع الحرارة على المدى الطويل يتجاوز 1.5 درجة بكثير، مع احتمال 40 في المئة لتجاوز درجتين. هذه نتائج سيناريو، لا توقع يسمي بلدًا.",
          "زمن الإنجاز هو الخمس إلى الخمس عشرة سنة التي يعطيها التقرير لتخطيط بنية الشبكة وترخيصها وإكمالها، مقابل سنة إلى خمس للمتجدد وأقل من سنتين لبنية شحن المركبات. والرقمنة في هذا التقرير جزء من جعل الشبكة مرنة: بيانات وتحكم وموارد موزعة كالشمس على الأسطح والاستجابة للطلب والتخزين. ومكتب الكهرباء يتكلم عن تحكم متقدم واتصال وتحليلات وتخزين في الجوار نفسه من الأفكار.",
          "الانهيار، في تقرير كوبا، فقدان كامل للشبكة الوطنية، أشعله عطل نقل عالي الجهد، وهو غير الانقطاعات المتناوبة لثلاثين ساعة أو أكثر التي قالت رويترز إنها صارت شائعة. والاستعادة كانت تدريجية، وآخر المساء في العاصمة جزئية ومتركزة قرب المستشفيات. «البروتوكولات قائمة» جملة المشغّل. لم تعنِ أن الجزيرة أضاءت. وكلفة الانقطاع، في رقم الوكالة العالمي، نحو 100 مليار دولار سنويًا. ليست كلفة جمعة واحدة في عاصمة واحدة.",
          "المرونة، في الملخص التنفيذي، تتضاعف بين 2022 و2030 في سيناريو متسق مع الأهداف المناخية الوطنية. ليست ماركة بطارية. هي قدرة النظام على العيش مع إنتاج متغير من الرياح والشمس، بتقنيات تحسين الشبكة والاستجابة للطلب والتخزين وموارد موزعة كالشمس على الأسطح. اجتماع يقول إنه «سيضيف مرونة» من غير أن يسمي أيًا من هذه يقدر يشتريه، لم يستخدم الكلمة.",
          "تحليل VisionSeek: إذا كلمة في الغرفة ليست في هذه الصفحة، اسأل أي جملة تستبدل. الأسماء الجديدة رخيصة. الطابور وزمن الإنجاز والعطل ليسوا كذلك.",
        ],
      },
      questions: {
        en: [
          "Which word in our last energy note is missing from this page, and what did we mean by it?",
          "Are we quoting a scenario, a queue, or an outage that already happened?",
          "Does “restoration” in our language mean hospitals, or the city?",
        ],
        ar: [
          "أي كلمة في آخر ملاحظة طاقة عندنا مش موجودة في الصفحة دي، وكنا قصدنا بيها إيه؟",
          "إحنا بننقل سيناريو، ولا طابور، ولا انقطاع حصل فعلًا؟",
          "«الاستعادة» في كلامنا تعني المستشفيات، ولا المدينة؟",
        ],
      },
      deeper: [iea, ieaReport, doe, cuba],
      glossary: [
        {
          term: { en: "Grid", ar: "شبكة" },
          meaning: {
            en: "The IEA’s backbone: lines that have delivered power for over a century and now have to connect faster demand and supply.",
            ar: "عمود الوكالة: خطوط أوصلت الكهرباء لأكثر من قرن، ومطلوب منها الآن أن تصل طلبًا وعرضًا أسرع.",
          },
        },
        {
          term: { en: "Connection queue", ar: "طابور الربط" },
          meaning: {
            en: "Projects waiting to connect. The IEA counted at least 3,000 GW, and said the world total is likely higher.",
            ar: "مشاريع تنتظر الربط. الوكالة عدّت 3000 غيغاواط على الأقل، وقالت إن الإجمالي العالمي غالبًا أعلى.",
          },
        },
        {
          term: { en: "Grid Delay Case", ar: "حالة تأخر الشبكة" },
          meaning: {
            en: "The IEA scenario of slower grid investment and reform, with higher emissions, fuel imports, and outage risk.",
            ar: "سيناريو الوكالة لاستثمار وإصلاح أبطأ للشبكة، بانبعاثات وواردات وقود وخطر انقطاع أعلى.",
          },
        },
      ],
    },
  ],
};

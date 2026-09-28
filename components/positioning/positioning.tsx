import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/components/capability/content';
import { CapabilityHeader } from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import HloPath from './hlo-path';
import styles from './positioning.module.css';

export const positioningPath='/about/what-we-do';

export function InstitutionExplainer({locale}:{locale:Locale}) {
  const ar=locale==='ar';const base=ar?'/ar':'';
  return <section className={styles.homeBand} aria-labelledby="visionseek-explained">
    <div className={styles.homeIntro}>
      <p className={styles.eyebrow}>{ar?'VISIONSEEK / هندسة الفرص':'VISIONSEEK / ENGINEERING OPPORTUNITIES'}</p>
      <h2 id="visionseek-explained">{ar?'نصل مؤسستك بما وصل إليه العالم.':'Connect your institution to what the world has made possible.'}</h2>
      <p>{ar?'VisionSeek استوديو للفرص والمشروعات. نكتشف ما يمكن أن يغيّر واقع مؤسستك، ونجمع التقنية والمعرفة والأشخاص والشركاء لتحويله إلى حل قابل للتنفيذ.':'VisionSeek is an opportunity and project studio. We discover what could change your institution’s future, then bring together technology, knowledge, people and partners to shape an executable solution.'}</p>
      <Link className={styles.textLink} href={`${base}${positioningPath}`}>{ar?'كيف تعمل VisionSeek؟':'How does VisionSeek work?'}<ArrowRight size={21}/></Link>
    </div>
    <div className={styles.homeHlo}>
      <div className={styles.hloWord} aria-hidden="true">HLO<span>↗</span></div>
      <p className={styles.eyebrow}>HIGHEST LEVEL ONE</p>
      <h3>{ar?'ابدأ من الفرص التي لا تراها بعد.':'Start with the opportunities you have yet to see.'}</h3>
      <p>{ar?'برنامج يربط طموح مؤسستك بالقدرات المتاحة في العالم، ويحدد معك ما يستحق التطبيق وكيف نختبره.':'A program connecting your institution’s ambition with global capabilities, to identify what is worth applying and how to test it.'}</p>
      <Link className={styles.textLink} href={`${base}${positioningPath}#hlo`}>{ar?'اكتشف برنامج HLO':'Explore the HLO program'}<ArrowRight size={20}/></Link>
    </div>
  </section>;
}

const models=[
  {name:'BCG X',ar:'بناء المنتجات والخدمات والأعمال',en:'Building products, services and businesses',bodyAr:'يجمع نموذجها التقنية والتصميم وريادة الأعمال لتحويل الفرص إلى منتجات وخدمات وأعمال جديدة.',bodyEn:'Combines technology, design and entrepreneurship to turn opportunities into new products, services and businesses.',url:'https://www.bcg.com/x/'},
  {name:'Leap by McKinsey',ar:'تأسيس أعمال جديدة وتوسيعها',en:'Creating and scaling new businesses',bodyAr:'يعمل مع المؤسسات القائمة على تصور أعمال جديدة وبنائها وإطلاقها وتوسيعها، وتكوين الفريق الذي يحملها.',bodyEn:'Works with established organizations to imagine, build, launch and scale new businesses, including the teams that sustain them.',url:'https://www.mckinsey.com/about-us/new-at-mckinsey-blog/why-every-day-is-leap-day-at-mckinsey'},
  {name:'Palantir',ar:'ربط البيانات بالقرار والتشغيل',en:'Connecting data, decisions and operations',bodyAr:'تربط منصتها البيانات والمنطق والإجراءات، لتدعم قرارات المؤسسة وتطبيق الذكاء الاصطناعي داخل عملياتها.',bodyEn:'Connects data, logic and actions to support institutional decisions and apply AI within real operations.',url:'https://www.palantir.com/docs/foundry/platform-overview'},
];

export default function PositioningPage({locale}:{locale:Locale}) {
  const ar=locale==='ar';const base=ar?'/ar':'';
  const principles=ar?[
    ['نبدأ من الفرصة','نفهم ما يحدث داخل المؤسسة وحولها، ونبحث عن فرص قد لا تظهر من داخل تخصص واحد.'],
    ['نبني على أفضل المتاح','نختار ما يخدم النتيجة من تقنيات وخبرات وشراكات، ونبني الأجزاء الناقصة عند الحاجة.'],
    ['نجمع العناصر حول نتيجة','نربط التقنية بالسوق والبيانات والأشخاص ومن سيتولى التشغيل. قيمة الحل في قدرة هذه العناصر على العمل معًا.'],
    ['نتقدم بالدليل','نختبر الفرضيات في سياق المؤسسة، ثم نحدد ما يستحق التنفيذ والتوسع.'],
  ]:[
    ['Start with the opportunity','Understand what is happening inside and around the institution, and look for opportunities that a single discipline may overlook.'],
    ['Build on the best available','Choose technology, expertise and partnerships that serve the outcome. Build the missing pieces where needed.'],
    ['Assemble around an outcome','Connect technology to markets, data, people and those who will operate it. Value comes from making these elements work together.'],
    ['Advance with evidence','Test assumptions in the institution’s context, then decide what merits delivery and expansion.'],
  ];
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar?'rtl':'ltr'}>
    <CapabilityHeader locale={locale} path={positioningPath}/>
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label={ar?'مسار الصفحة':'Breadcrumb'}><Link href={`${base}/about`}>{ar?'عن VisionSeek':'About VisionSeek'}</Link><span>/</span><span>{ar?'كيف نعمل':'How we work'}</span></nav>
        <p className={styles.eyebrow}>{ar?'استوديو للفرص والمشروعات':'AN OPPORTUNITY AND PROJECT STUDIO'}</p>
        <h1>{ar?'ابدأ من حيث وصل العالم.':'Build on the world’s progress.'}</h1>
        <p className={styles.heroLead}>{ar?'هناك تقنيات ومعرفة وفرص يمكن أن تغيّر ما تستطيع مؤسستك فعله. دور VisionSeek أن تكشف ما يناسبك منها، وتجمع عناصره، وتصنع معه مسارًا للتطبيق.':'Technology, knowledge and opportunities can change what your institution is able to do. VisionSeek discovers what fits your needs, connects the right elements and shapes a path to application.'}</p>
        <div className={styles.heroActions}><a className={styles.primary} href="#hlo">{ar?'كيف يساعدك HLO؟':'How can HLO help?'}<ArrowRight size={20}/></a><a className={styles.textLink} href="#position">{ar?'موقعنا في هذا المجال':'Our place in this field'}<ArrowRight size={19}/></a></div>
        <div className={styles.connection} aria-label={ar?'نربط ما لدى العالم باحتياج مؤسستك من خلال هندسة الفرص':'Engineering Opportunities connects global capabilities with your institution’s needs'}>
          <div><span className={styles.smallLabel}>{ar?'ما لدى العالم':'WHAT THE WORLD OFFERS'}</span><p>{ar?'معرفة · تقنيات · خبرات · أسواق':'Knowledge · Technology · Expertise · Markets'}</p></div>
          <div className={styles.connector}><span>VisionSeek</span><strong>{ar?'هندسة الفرص':'Engineering Opportunities'}</strong></div>
          <div><span className={styles.smallLabel}>{ar?'ما تحتاجه مؤسستك':'WHAT YOUR INSTITUTION NEEDS'}</span><p>{ar?'حل يناسب واقعها ويفتح لها خطوة جديدة.':'A solution that fits its reality and opens a new path.'}</p></div>
        </div>
      </section>

      <section className={styles.principles} id="our-role">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>{ar?'دورنا':'OUR ROLE'}</p><h2>{ar?'نكتشف الفرصة. ونبني لها طريقًا إلى الواقع.':'Discover the opportunity. Build its path into reality.'}</h2><p>{ar?'ندخل المساحات التي لم تتضح فيها الفرصة بعد. نفهم التقنية والسوق والمؤسسة، ثم نحدد الشكل المناسب: حل تشغيلي، منتج، شراكة، مشروع أو عمل جديد.':'We work where the opportunity is not yet clear. Understand the technology, market and institution, then determine the right form: an operating solution, product, partnership, project or new business.'}</p></div>
        <div className={styles.principleGrid}>{principles.map(([title,body],i)=><article key={title}><span className={styles.index}>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className={styles.global} id="position">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>{ar?'نماذج عالمية لفهم نوع العمل':'GLOBAL MODELS THAT HELP EXPLAIN THE WORK'}</p><h2>{ar?'بين الاستراتيجية والبناء والتشغيل.':'Across strategy, building and operations.'}</h2><p>{ar?'تعمل مؤسسات عالمية عند نقاط مختلفة من هذه الرحلة. هذه أمثلة توضّح المجال الذي نبني فيه VisionSeek.':'Global organizations work at different points along this journey. These examples help explain the field in which we are building VisionSeek.'}</p></div>
        <div className={styles.modelGrid}>{models.map(model=><article key={model.name}><p className={styles.modelName} dir="ltr">{model.name}</p><h3>{ar?model.ar:model.en}</h3><p>{ar?model.bodyAr:model.bodyEn}</p><a href={model.url} target="_blank" rel="noreferrer">{ar?'عن النموذج — المصدر الرسمي':'About the model — official source'}<ArrowUpRight size={17}/></a></article>)}</div>
        <div className={styles.ourPosition}><div><p className={styles.eyebrow}>VISIONSEEK</p><h3>{ar?'هندسة الفرص':'Engineering Opportunities'}</h3></div><p>{ar?'نضع اكتشاف الفرصة في بداية العمل، ثم نربط ما تملكه المؤسسة بما يمكن الوصول إليه في العالم. من هنا نحدد ما يستحق الاختبار، وما يجب تجميعه أو بناؤه، وكيف تنتقل النتيجة إلى الاستخدام. HLO هو برنامجنا لتطبيق هذا المنهج مع المؤسسة.':'We place opportunity discovery at the start, connecting an institution’s existing assets to what it can access globally. From there, we identify what deserves testing, what needs assembling or building, and how the outcome could enter use. HLO is our program for applying this approach with an institution.'}</p></div>
        <p className={styles.referenceNote}>{ar?'هذه مقارنة في نماذج العمل، وليست ترتيبًا للحجم أو النتائج. الأسماء المذكورة مراجع مستقلة ولا تعني وجود شراكة.':'This is a comparison of operating models, not a ranking of scale or results. The named organizations are independent references, not stated partners.'}</p>
      </section>

      <section className={styles.hlo} id="hlo">
        <div className={styles.hloHeader}><div><p className={styles.eyebrow}>{ar?'برنامج VISIONSEEK':'A VISIONSEEK PROGRAM'}</p><h2>HLO</h2><p lang="en">Highest Level One</p></div><div><h3>{ar?'ارفع سقف ما تستطيع مؤسستك فعله.':'Raise the ceiling of what your institution can do.'}</h3><p>{ar?'قد لا تعرف المؤسسة أن قدرة ما أصبحت متاحة. وقد تعرفها، لكنها لا ترى كيف تستفيد منها. HLO يربط بين ما وصلت إليه مؤسستك وما يمكن أن تصل إليه باستخدام الفرص والقدرات المناسبة لها.':'An institution may not know a capability is available. Or it may know about it without seeing how it could help. HLO connects where your institution stands with what it could achieve using opportunities and capabilities that fit its needs.'}</p></div></div>
        <div className={styles.worldInvestment}><strong>{ar?'استفد من التقدم الذي تحقق بالفعل.':'Build on progress that already exists.'}</strong><p>{ar?'سنوات من البحث والتطوير والاستثمار حول العالم أنتجت تقنيات ومعرفة ومنصات. نبحث عن أفضل ما تستطيع مؤسستك الوصول إليه واستخدامه، عبر الأدوات المتاحة والمعرفة المفتوحة والترخيص والشراكات، ثم نختبر ملاءمته لواقعها.':'Years of global research, development and investment have produced technology, knowledge and platforms. We seek the best your institution can access and use through available tools, open knowledge, licensing and partnerships, then test their fit in its context.'}</p></div>
        <div className={styles.hloIntro}><h3>{ar?'من رؤية الفرص إلى قرار بالتطبيق.':'From seeing opportunities to deciding how to apply them.'}</h3><p>{ar?'نبدأ بنتيجة واحدة وقرار مهم ووحدة عمل محددة. نستهدف أعلى مستوى واقعي يمكن بلوغه، ثم نختبر الخطوة التي تقرّب المؤسسة منه.':'Begin with one outcome, an important decision and a defined work unit. Aim for the highest realistically achievable level, then test the step that moves the institution toward it.'}</p></div>
        <HloPath locale={locale}/>
        <div className={styles.deliverables}><h3>{ar?'ما الذي تحصل عليه المؤسسة؟':'What does the institution receive?'}</h3><ol>{(ar?['خريطة فرص تناسب احتياجها.','قرار أولوية يوضح أين تبدأ ولماذا.','خطة اختبار ودليل على نتيجته.','مسار تشغيل، أو قرار مسبب بالتوقف.']:['An opportunity map tailored to its need.','A priority decision explaining where to start and why.','A test plan and evidence of its outcome.','An operating path, or a reasoned decision to stop.']).map(item=><li key={item}>{item}</li>)}</ol></div>
        <p className={styles.programNote}>{ar?'البرنامج في مرحلة إعداد التجربة الأولى. يُتفق على نطاق التكليف ومدته وتكلفته قبل البدء، وعلى التنفيذ اللاحق بصورة مستقلة.':'The program is preparing its first pilot. Scope, timing and cost are agreed before starting; subsequent delivery is commissioned separately.'}</p>
      </section>

      <section className={styles.contact}>
        <p className={styles.eyebrow}>{ar?'ابدأ من مؤسستك':'START WITH YOUR INSTITUTION'}</p><h2>{ar?'ما الفرصة التي يمكن أن تغيّر موقع مؤسستك؟':'What opportunity could change your institution’s position?'}</h2><p>{ar?'شاركنا النتيجة التي تريد الوصول إليها أو القرار الذي يشغلك. نبدأ بتحديد ما إذا كان HLO هو المدخل المناسب.':'Tell us the outcome you want or the decision on your mind. Start by exploring whether HLO is the right entry point.'}</p>
        <Link className={styles.primary} href={`${base}/start?from=programs&program=hlo`}>{ar?'ناقش HLO لمؤسستك':'Discuss HLO for your institution'}<ArrowRight size={20}/></Link><Link className={styles.textLink} href={`${base}/projects`}>{ar?'استكشف مشاريع VisionSeek':'Explore VisionSeek projects'}<ArrowRight size={19}/></Link>
      </section>
    </main><CapabilityFooter locale={locale}/>
  </div>;
}

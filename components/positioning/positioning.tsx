import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/components/capability/content';
import { CapabilityHeader } from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import HloPath from './hlo-path';
import styles from './positioning.module.css';

export const positioningPath='/about/what-we-do';

export function InstitutionExplainer({locale}:{locale:Locale}) {
  const ar=locale==='ar';const base=ar?'/ar':'';
  return <><section className={styles.homeBand} aria-labelledby="visionseek-explained">
    <div className={styles.homeIntro}>
      <p className={styles.eyebrow} dir="ltr" lang="en">Cross-sector Opportunity, Capability &amp; Solutions Studio</p>
      <h2 id="visionseek-explained">{ar?'نصل مؤسستك بما وصل إليه العالم.':'Connect your institution to what the world has made possible.'}</h2>
      <p>{ar?'VisionSeek استوديو للفرص والقدرات والحلول العابرة للقطاعات. نبحث عمّا يمكن أن تفتحه تقنية أو معرفة من مجال ما داخل مجال آخر، ونجمع العناصر اللازمة لتحويل الفرصة إلى مشروع أو قدرة أو حل يخدم مؤسستك.':'VisionSeek is a cross-sector opportunity, capability and solutions studio. We explore what technology or knowledge from one field can make possible in another, and bring together what is needed to turn that opportunity into a project, capability or solution for your institution.'}</p>
      <Link className={styles.textLink} href={`${base}${positioningPath}`}>{ar?'ما الذي يميّز VisionSeek؟':'Why VisionSeek?'}<ArrowRight size={21}/></Link>
    </div>
    <div className={styles.homeHlo}>
      <p className={styles.eyebrow}>CRITICAL CAPABILITY TRANSFER</p>
      <h3>{ar?'ننقل القدرات المتقدمة من العالم إلى مؤسستك.':'We move critical capabilities to where they need to exist.'}</h3>
      <p>{ar?'قد توجد التقنية التي تحتاجها داخل شركة أو مركز بحثي في مكان آخر. نحدد ما يناسب احتياج مؤسستك، ونصمم طريق نقل المعرفة وتكييف التقنية، ونجمع الشركاء والبنية التحتية والتنفيذ، ثم نختبرها في واقعك حتى تصبح قدرة تستطيع تشغيلها.':'The technology you need may already exist in a company or research lab elsewhere. We identify what fits your institution’s needs, design the knowledge transfer and technology adaptation, connect partners, infrastructure and implementation, then validate it in your setting as a capability you can operate.'}</p>
      <Link className={styles.textLink} href={`${base}/start`}>{ar?'ابنِ حلولك معنا':'Build your solutions with us'}<ArrowRight size={20}/></Link>
    </div>
  </section>
  <section className={styles.koreaMena} aria-labelledby="korea-mena-title">
    <h2 id="korea-mena-title" dir="ltr">Korea ↔ MENA</h2>
    <p>{ar?'من مقرّنا في كوريا الجنوبية، نرصد قدرات نجحت الشركات والمؤسسات الكورية في تشغيلها بالفعل، في التصنيع المتقدم والروبوتات والطاقة والمياه والخدمات اللوجستية والذكاء الاصطناعي الصناعي. نحدد ما تحتاجه منها المؤسسات في الخليج ومصر، ومن يملك كل جزء، وما يحتاج إلى تكييف محلي، وأصغر تجربة عملية تكفي لإثبات النتيجة.':'Based in Korea, we track capabilities Korean industry and institutions have already made work — in advanced manufacturing, robotics, energy, water, logistics and industrial AI. We identify which of them Gulf and Egyptian institutions need, who owns each part, what must be adapted locally, and the smallest pilot that proves the result.'}</p>
  </section></>;
}

const models=[
  {name:'BCG X',logo:'/positioning/bcg-x.svg',logoAlt:'BCG X',ar:'بناء المنتجات والخدمات والأعمال',en:'Building products, services and businesses',bodyAr:'يجمع نموذجها التقنية والتصميم وريادة الأعمال لتحويل الفرص إلى منتجات وخدمات وأعمال جديدة.',bodyEn:'Combines technology, design and entrepreneurship to turn opportunities into new products, services and businesses.',url:'https://www.bcg.com/x/'},
  {name:'Leap by McKinsey',logo:'/positioning/mckinsey.png',logoAlt:'McKinsey & Company',ar:'تأسيس أعمال جديدة وتوسيعها',en:'Creating and scaling new businesses',bodyAr:'يعمل مع المؤسسات القائمة على تصور أعمال جديدة وبنائها وإطلاقها وتوسيعها، وتكوين الفريق الذي يحملها.',bodyEn:'Works with established organizations to imagine, build, launch and scale new businesses, including the teams that sustain them.',url:'https://www.mckinsey.com/about-us/new-at-mckinsey-blog/why-every-day-is-leap-day-at-mckinsey'},
  {name:'Palantir',logo:'/positioning/palantir.svg',logoAlt:'Palantir',ar:'ربط البيانات بالقرار والتشغيل',en:'Connecting data, decisions and operations',bodyAr:'تربط منصتها البيانات والمنطق والإجراءات، لتدعم قرارات المؤسسة وتطبيق الذكاء الاصطناعي داخل عملياتها.',bodyEn:'Connects data, logic and actions to support institutional decisions and apply AI within real operations.',url:'https://www.palantir.com/docs/foundry/platform-overview'},
];

export default function PositioningPage({locale}:{locale:Locale}) {
  const ar=locale==='ar';const base=ar?'/ar':'';
  const principles=ar?[
    ['طموح مؤسستك أولًا','نبحث معك عمّا يمكن أن ينقل المؤسسة إلى موقع أقوى. يكشف HLO الفرص التي لم تدخل حساباتها بعد، ثم يحدد ما يستحق التجربة والاستثمار.'],
    ['العالم مصدر حلولك','نجمع ما يناسبك من تقنيات وخبرات ومعرفة مفتوحة وترخيص وشراكات. نبني على التقدم الذي تحقق حول العالم، ونطوّر ما ينقص الحل.'],
    ['نبني بعقلية عصر الذكاء الاصطناعي','نصمم طريقة عملنا لتجمع حكم الخبراء بقدرة النماذج والوكلاء على البحث والتحليل والبناء. نختبر بسرعة، ونراجع النتائج، ونطوّر المسار مع كل دليل جديد.'],
    ['المنافسة العربية هي الرسالة','نريد للمؤسسات العربية أن تمتلك المعرفة والقدرة على تطوير حلولها واتخاذ قراراتها. هذا الطموح يوجّه ما نختاره من فرص، وما نريد أن يبقى داخل المؤسسة بعد كل مشروع.'],
  ]:[
    ['Your institution’s ambition comes first','Explore what could move your institution into a stronger position. HLO reveals opportunities it has yet to consider, then identifies what merits testing and investment.'],
    ['Draw on what the world has built','Assemble the right technology, expertise, open knowledge, licenses and partnerships. Build on global progress and develop the pieces your solution still needs.'],
    ['Build for the age of AI','We are designing our way of working around expert judgment and the research, analysis and building capabilities of models and agents. Test quickly, review results and adapt as evidence develops.'],
    ['Arab competitiveness is the mission','We want Arab institutions to own the knowledge and capability to develop their solutions and make their decisions. This ambition guides the opportunities we choose and what each project should leave within the institution.'],
  ];
  return <div className={`vs-site locale-${locale}`} lang={locale} dir={ar?'rtl':'ltr'}>
    <CapabilityHeader locale={locale} path={positioningPath}/>
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label={ar?'مسار الصفحة':'Breadcrumb'}><Link href={`${base}/about`}>{ar?'عن VisionSeek':'About VisionSeek'}</Link><span>/</span><span>{ar?'كيف نعمل':'How we work'}</span></nav>
        <p className={styles.eyebrow}>{ar?'استوديو للفرص والمشروعات':'AN OPPORTUNITY AND PROJECT STUDIO'}</p>
        <h1>{ar?'ابدأ من حيث وصل العالم.':'Build on the world’s progress.'}</h1>
        <p className={styles.heroLead}>{ar?'هناك تقنيات ومعرفة وفرص يمكن أن تغيّر ما تستطيع مؤسستك فعله. دور VisionSeek أن تكشف ما يناسبك منها، وتجمع عناصره، وتصنع معه مسارًا للتطبيق.':'Technology, knowledge and opportunities can change what your institution is able to do. VisionSeek discovers what fits your needs, connects the right elements and shapes a path to application.'}</p>
        <div className={styles.heroActions}><a className={styles.primary} href="#hlo">{ar?'كيف يساعدك HLO؟':'How can HLO help?'}<ArrowRight size={20}/></a><a className={styles.textLink} href="#position">{ar?'ما الذي يميّز VisionSeek؟':'Why VisionSeek?'}<ArrowRight size={19}/></a></div>
        <div className={styles.connection} aria-label={ar?'نربط ما لدى العالم باحتياج مؤسستك من خلال هندسة الفرص':'Engineering Opportunities connects global capabilities with your institution’s needs'}>
          <div><span className={styles.smallLabel}>{ar?'ما لدى العالم':'WHAT THE WORLD OFFERS'}</span><p>{ar?'معرفة · تقنيات · خبرات · أسواق':'Knowledge · Technology · Expertise · Markets'}</p></div>
          <div className={styles.connector}><span>VisionSeek</span><strong>{ar?'هندسة الفرص':'Engineering Opportunities'}</strong></div>
          <div><span className={styles.smallLabel}>{ar?'ما تحتاجه مؤسستك':'WHAT YOUR INSTITUTION NEEDS'}</span><p>{ar?'حل يناسب واقعها ويفتح لها خطوة جديدة.':'A solution that fits its reality and opens a new path.'}</p></div>
        </div>
      </section>

      <section className={styles.global} id="position">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>{ar?'VISIONSEEK في المشهد العالمي':'VISIONSEEK IN THE GLOBAL LANDSCAPE'}</p><h2>{ar?'طموحنا عالمي. ورسالتنا تبدأ من العالم العربي.':'Global ambition. A mission rooted in the Arab world.'}</h2><p>{ar?'بناء الأعمال الجديدة وربط التقنية بالقرار مجال تصنع فيه مؤسسات عالمية أثرًا واسعًا. نبني VisionSeek داخل هذا المجال برسالة واضحة: أن تصل مؤسساتنا إلى ما يتيح لها المنافسة، وأن تحوّله إلى حلول تملك القدرة على تطويرها.':'Building new businesses and connecting technology to decisions is a field shaped by major global institutions. We are building VisionSeek in this field with a clear mission: help our institutions access what they need to compete, and turn it into solutions they can develop further.'}</p></div>
        <div className={styles.modelGrid}>
          <article className={styles.visionseekModel}>
            <div className={styles.brandAsset}><Image src="/visionseek-logo-color.png" width={210} height={70} alt="VisionSeek" sizes="210px"/></div>
            <p className={styles.modelName} dir="ltr">VisionSeek</p>
            <h3>{ar?'هندسة الفرص للمؤسسات العربية':'Engineering opportunities for Arab institutions'}</h3>
            <p>{ar?'نربط طموح المؤسسة بما وصل إليه العالم. نكشف الفرصة عبر HLO، ثم نجمع المعرفة والتقنية والأشخاص والشركاء حول حل يناسبها.':'Connect institutional ambition with global progress. Discover the opportunity through HLO, then assemble knowledge, technology, people and partners around a fitting solution.'}</p>
            <a href="#our-role">{ar?'لماذا تختارنا؟':'Why choose us?'}<ArrowRight size={17}/></a>
          </article>
          {models.map(model=><article key={model.name}>
            <div className={styles.brandAsset}><Image src={model.logo} width={180} height={60} alt={model.logoAlt} sizes="180px" className={model.name==='Leap by McKinsey'?styles.mckinseyLogo:undefined}/></div>
            <p className={styles.modelName} dir="ltr">{model.name}</p><h3>{ar?model.ar:model.en}</h3><p>{ar?model.bodyAr:model.bodyEn}</p><a href={model.url} target="_blank" rel="noreferrer">{ar?'المصدر الرسمي':'Official source'}<ArrowUpRight size={17}/></a>
          </article>)}
        </div>
        <p className={styles.referenceNote}>{ar?'نماذج عمل في مجال مشترك؛ لكل مؤسسة نطاقها وخبرتها. الشعارات للتعريف بالمؤسسات المذكورة، ولا تشير إلى شراكة أو تأييد.':'Operating models in a shared field, each with its own scope and experience. Logos identify the organizations discussed and do not indicate partnership or endorsement.'}</p>
      </section>

      <section className={styles.principles} id="our-role">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>{ar?'اختيارات تشكّل هويتنا':'THE CHOICES THAT DEFINE US'}</p><h2>{ar?'لماذا تختار VisionSeek؟':'Why choose VisionSeek?'}</h2><p>{ar?'لأن ما نبنيه يبدأ بسؤال يخص مستقبلك: ما الذي يمكن أن تمتلكه مؤسستك اليوم ليغيّر موقعها غدًا؟ هذه هي الاختيارات التي نبني عليها إجابتنا.':'Because our work begins with a question about your future: what could your institution gain today that changes where it stands tomorrow? These choices shape our answer.'}</p></div>
        <div className={styles.principleGrid}>{principles.map(([title,body],i)=><article key={title}><span className={styles.index}>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className={styles.founder} id="founder">
        <figure className={styles.founderPortrait}>
          <Image src="/ahmed-abdelalim.jpg" width={923} height={892} alt={ar?'د. أحمد عبدالعليم، مؤسس VisionSeek':'Dr. Ahmed Abdelalim, founder of VisionSeek'} sizes="(max-width: 760px) 90vw, 40vw"/>
          <figcaption><strong>{ar?'د. أحمد عبدالعليم':'Dr. Ahmed Abdelalim'}</strong><span>{ar?'مؤسس VisionSeek · كوريا الجنوبية':'Founder of VisionSeek · South Korea'}</span></figcaption>
        </figure>
        <div className={styles.founderStory}>
          <p className={styles.eyebrow}>{ar?'الفكرة التي تقود المؤسسة':'THE CONVICTION BEHIND VISIONSEEK'}</p>
          <h2>{ar?'من كوريا الجنوبية، برسالة إلى العالم العربي.':'From South Korea, with a mission for the Arab world.'}</h2>
          <p className={styles.founderMission}>{ar?'أن تمتلك مؤسساتنا القدرة على البناء والمنافسة إلى جانب عمالقة التكنولوجيا والذكاء الاصطناعي.':'For our institutions to build and compete alongside the world’s technology and AI leaders.'}</p>
          <p>{ar?'يقيم د. أحمد عبدالعليم في كوريا الجنوبية، ويحمل إلى VisionSeek قناعة بأن العالم العربي يستحق أن يصنع موقعه في مقدمة هذا التحول. رسالته هي تمكين مؤسساته من المعرفة والتقنيات والفرص التي تساعدها على المنافسة من موقع الندّية.':'Based in South Korea, Dr. Ahmed Abdelalim brings to VisionSeek the conviction that the Arab world should help lead this transformation. His mission is to enable its institutions to access the knowledge, technology and opportunities needed to compete on equal footing.'}</p>
          <div className={styles.founderBelief}><h3>{ar?'هذه لحظة تستحق أن نتحرك.':'This is a moment to act.'}</h3><p>{ar?'يؤمن د. أحمد بأن الذكاء الاصطناعي فتح بابًا واسعًا أمام من يملك الرؤية والجرأة على البناء. يرى فيه فرصة لتقليص المسافة مع الكبار، بالوصول إلى المعرفة وتسريع التجربة وجمع قدرات كانت متفرقة. ومن هذه القناعة يأتي HLO: أن ترى المؤسسة الفرصة، وتختبرها، وتبدأ في بناء موقع جديد لها.':'Dr. Ahmed believes AI has opened a major opportunity for those with the vision and courage to build. He sees a chance to close the gap with established leaders through access to knowledge, faster experimentation and the assembly of previously disconnected capabilities. HLO brings this conviction into an institutional process: see the opportunity, test it and begin building a stronger position.'}</p></div>
          <a className={styles.textLink} href="#hlo">{ar?'من هذه الرؤية إلى برنامج HLO':'From this vision to HLO'}<ArrowRight size={20}/></a>
        </div>
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

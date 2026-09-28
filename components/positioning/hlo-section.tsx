import type {Locale} from '@/components/capability/content';
import HloPath from './hlo-path';
import styles from './positioning.module.css';

export default function HloSection({locale,standalone=false,showHeader=true}:{locale:Locale;standalone?:boolean;showHeader?:boolean}){
  const ar=locale==='ar';
  const Heading=standalone?'h1':'h2';
  const Subheading=standalone?'h2':'h3';
  return <section className={styles.hlo} id="hlo">
        {showHeader&&<div className={styles.hloHeader}><div><p className={styles.eyebrow}>{ar?'برنامج VISIONSEEK':'A VISIONSEEK PROGRAM'}</p><Heading>HLO</Heading><p lang="en">Highest Level One</p></div><div><Subheading>{ar?'ارفع سقف ما تستطيع مؤسستك فعله.':'Raise the ceiling of what your institution can do.'}</Subheading><p>{ar?'قد لا تعرف المؤسسة أن قدرة ما أصبحت متاحة. وقد تعرفها، لكنها لا ترى كيف تستفيد منها. HLO يربط بين ما وصلت إليه مؤسستك وما يمكن أن تصل إليه باستخدام الفرص والقدرات المناسبة لها.':'An institution may not know a capability is available. Or it may know about it without seeing how it could help. HLO connects where your institution stands with what it could achieve using opportunities and capabilities that fit its needs.'}</p></div></div>}
        <div className={styles.worldInvestment}><strong>{ar?'استفد من التقدم الذي تحقق بالفعل.':'Build on progress that already exists.'}</strong><p>{ar?'سنوات من البحث والتطوير والاستثمار حول العالم أنتجت تقنيات ومعرفة ومنصات. نبحث عن أفضل ما تستطيع مؤسستك الوصول إليه واستخدامه، عبر الأدوات المتاحة والمعرفة المفتوحة والترخيص والشراكات، ثم نختبر ملاءمته لواقعها.':'Years of global research, development and investment have produced technology, knowledge and platforms. We seek the best your institution can access and use through available tools, open knowledge, licensing and partnerships, then test their fit in its context.'}</p></div>
        <div className={styles.hloIntro}><h3>{ar?'من رؤية الفرص إلى قرار بالتطبيق.':'From seeing opportunities to deciding how to apply them.'}</h3><p>{ar?'نبدأ بنتيجة واحدة وقرار مهم ووحدة عمل محددة. نستهدف أعلى مستوى واقعي يمكن بلوغه، ثم نختبر الخطوة التي تقرّب المؤسسة منه.':'Begin with one outcome, an important decision and a defined work unit. Aim for the highest realistically achievable level, then test the step that moves the institution toward it.'}</p></div>
        <HloPath locale={locale}/>
        <div className={styles.deliverables}><h3>{ar?'ما الذي تحصل عليه المؤسسة؟':'What does the institution receive?'}</h3><ol>{(ar?['خريطة فرص تناسب احتياجها.','قرار أولوية يوضح أين تبدأ ولماذا.','خطة اختبار ودليل على نتيجته.','مسار تشغيل، أو قرار مسبب بالتوقف.']:['An opportunity map tailored to its need.','A priority decision explaining where to start and why.','A test plan and evidence of its outcome.','An operating path, or a reasoned decision to stop.']).map(item=><li key={item}>{item}</li>)}</ol></div>
        <p className={styles.programNote}>{ar?'يُصمَّم مسار HLO وفق احتياج كل مؤسسة. نتفق قبل البدء على النطاق والمخرجات والمدة والتكلفة ومسؤوليات التنفيذ.':'HLO is tailored to each institution. Scope, outputs, timing, cost and delivery responsibilities are agreed before work begins.'}</p>
      </section>;
}

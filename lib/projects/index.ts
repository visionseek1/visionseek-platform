export type Locale = 'ar' | 'en';
export type Text = Record<Locale, string>;
const t = (ar: string, en: string): Text => ({ar, en});
export type Sector = {slug:string; title:Text; intro:Text; icon:'energy'|'chips'|'flight'|'defense'|'robotics'|'health'|'agriculture'|'cities'; anchors:string[]; focus:Text[]};
export type Track = {slug:string; sector:string; title:Text; intro:Text};
export type Project = {
  id:string; slug:string; sector:string; track:string; kind:'supply'|'containment';
  status:'concept'|'active'|'completed'; featuredOrder?:number;
  title:Text; summary:Text; ambition:Text; idea:Text; beneficiary:Text;
  outcomes:{title:Text;text:Text}[];
};
export const conceptNotice = t('تصوّرات مقترحة — لم تُطلق أو تُموّل كبرامج.', 'Proposed concepts — not launched or funded programs.');

export const sectors:Sector[] = [
  {slug:'energy',title:t('الطاقة والمناخ','Energy & Climate'),icon:'energy',anchors:['energy'],intro:t('حلول تمنح المؤسسات تحكمًا أكبر في إمدادات الطاقة والبنية التي تعتمد عليها.', 'Solutions that give institutions greater control over energy supply and the infrastructure behind it.'),focus:[t('الغاز المسال','Liquefied natural gas'),t('منظومات الطاقة','Energy systems'),t('تقنيات المناخ','Climate technologies')]},
  {slug:'semiconductors',title:t('الرقائق وأشباه الموصلات','Chips & Semiconductors'),icon:'chips',anchors:['chips'],intro:t('من تصميم الشريحة إلى الوصول إلى التصنيع: أين تستطيع المؤسسة أن تمتلك دورًا مؤثرًا في سلسلة القيمة؟', 'From chip design to manufacturing access: where can an institution build a meaningful position in the value chain?'),focus:[t('تصميم الرقائق','Chip design'),t('التغليف والمواد','Packaging & materials'),t('سلاسل التوريد','Supply chains')]},
  {slug:'drones-aviation',title:t('الدرونز والطيران','Drones & Aviation'),icon:'flight',anchors:['drones','space'],intro:t('أنظمة جوية تربط الاستقلالية بمهام واضحة في الفحص والنقل والخدمات.', 'Aerial systems connecting autonomy to defined inspection, transport and service missions.'),focus:[t('الدرونز','Uncrewed aircraft'),t('الطيران والفضاء','Aviation & aerospace'),t('الخدمات الجوية','Aerial services')]},
  {slug:'defense',title:t('الدفاع والأمن','Defense & Security'),icon:'defense',anchors:['defense'],intro:t('حماية البنية الحيوية ورفع الوعي بالموقف وربط المعلومات بالقرار.', 'Protecting critical infrastructure, improving situational awareness and connecting information to decisions.'),focus:[t('حماية البنية الحيوية','Infrastructure protection'),t('الوعي بالموقف','Situational awareness'),t('مرونة المؤسسات','Institutional resilience')]},
  {slug:'robotics',title:t('الروبوتات والصناعة','Robotics & Industry'),icon:'robotics',anchors:['robots'],intro:t('ربط الروبوتات والإدراك الآلي بمهام إنتاج وفحص يمكن تنفيذها في الواقع.', 'Connecting robotics and machine perception to real production and inspection tasks.'),focus:[t('الأنظمة الذاتية','Autonomous systems'),t('التصنيع','Manufacturing'),t('الفحص والصيانة','Inspection & maintenance')]},
  {slug:'health',title:t('الطب والصحة','Medicine & Health'),icon:'health',anchors:['science'],intro:t('وصل البحث والتقنية باحتياجات الرعاية، من المعرفة الطبية إلى خدمات أفضل.', 'Connecting research and technology to care needs, from medical knowledge to better services.'),focus:[t('التقنيات الطبية','Medical technologies'),t('منظومات الرعاية','Care systems'),t('البحث التطبيقي','Applied research')]},
  {slug:'agriculture',title:t('الزراعة والأمن الغذائي','Agriculture & Food Security'),icon:'agriculture',anchors:['agriculture'],intro:t('إنتاج أكثر مرونة، واستخدام أدق للموارد، وسلاسل غذاء أقرب إلى احتياجاتها.', 'More resilient production, better resource use and food systems connected to the needs they serve.'),focus:[t('الإنتاج الزراعي','Agricultural production'),t('المياه والموارد','Water & resources'),t('سلاسل الغذاء','Food supply chains')]},
  {slug:'infrastructure',title:t('المدن والبنية التحتية','Cities & Infrastructure'),icon:'cities',anchors:['cities'],intro:t('ربط أصول المدن وبياناتها وخدماتها لتحسين قدرة المؤسسات على إدارتها.', 'Connecting city assets, data and services to improve institutions’ ability to manage them.'),focus:[t('المدن','Cities'),t('النقل','Transport'),t('البنية المترابطة','Connected infrastructure')]},
];
export const tracks:Track[] = [
  {slug:'lng',sector:'energy',title:t('الغاز الطبيعي المسال','Liquefied Natural Gas'),intro:t('تحكم أكبر في الإمداد، وخيارات أوسع في التقنية التي يقوم عليها الأسطول.', 'Greater control over supply. More choice in the technology a fleet depends on.')},
];

// Founder-defined public concepts. No country mandate, client or delivered technology is asserted.
export const projects:Project[] = [
  {
    id:'VS-P07',slug:'sovereign-floating-gas-supply',sector:'energy',track:'lng',kind:'supply',
    status:'concept',featuredOrder:1,
    title:t('سيادة الإمداد العائم','Sovereign control of floating gas supply'),
    summary:t('تمكين مؤسسة مستوردة من تقرير كيف يصل الغاز من وحدات التغييز العائمة إلى الشبكة الوطنية: استئجار، أو تحويل ناقلة، أو امتلاك وتشغيل — قبل ذروة الطلب التالية.', 'Enable an importing institution to decide how floating regasification supplies the national grid — charter, carrier conversion, or owned operation — before the next seasonal peak.'),
    ambition:t('أن تملك المؤسسة قرار الإمداد.', 'Put the supply decision in the institution’s hands.'),
    idea:t('تصور يجمع خيارات الوحدات العائمة والموانئ والتشغيل حول احتياج المؤسسة إلى الغاز. الغرض أن تستطيع اختيار نموذج الإمداد الذي يخدم شبكتها وأولوياتها، مع مساحة أكبر للتحكم في التوقيت والتشغيل والاعتماد على الأطراف الأخرى.', 'A concept bringing floating units, ports and operating options around an institution’s gas needs. The aim is to enable a supply model that serves its grid and priorities, with greater control over timing, operations and external dependencies.'),
    beneficiary:t('مؤسسات استيراد الغاز ومشغلو الشبكات وجهات أمن الطاقة.', 'Gas importing institutions, grid operators and energy security organizations.'),
    outcomes:[
      {title:t('اختيار نموذج الإمداد','Choice of supply model'),text:t('المفاضلة بين استئجار وحدة، أو تحويل ناقلة، أو امتلاك قدرة التشغيل بحسب احتياج الشبكة.', 'The ability to choose between chartering a unit, converting a carrier or owning the operating capability around grid needs.')},
      {title:t('تحكم في العلاقة مع الشبكة','Control at the grid interface'),text:t('ربط قدرة الوحدة العائمة بأولوية الإمداد ومتطلبات الميناء والشبكة الوطنية.', 'Align floating capacity with supply priorities, port requirements and the national grid.')},
      {title:t('استعداد قبل الذروة','Readiness before peak demand'),text:t('توسيع خيارات المؤسسة قبل أن يفرض ضغط الموسم قرارها.', 'Give the institution more options before seasonal pressure dictates its decision.')},
    ],
  },
  {
    id:'VS-P08',slug:'second-lng-containment-standard',sector:'energy',track:'lng',kind:'containment',
    status:'concept',featuredOrder:2,
    title:t('معيار ثانٍ لاحتواء الغاز المسال','A second standard for LNG containment'),
    summary:t('تمكين مالك أسطول من التفاوض على تصميم خزانات الغاز المسال على مستوى الأسطول: ترخيص شامل، أو إثبات معيار بديل على أول ناقلة كبيرة، بدلًا من ترخيص منفصل لكل سفينة.', 'Enable a fleet owner to treat cargo-tank design as a negotiable standard — licensed at fleet scale, or proven on a first large ship — rather than a royalty paid hull by hull.'),
    ambition:t('أن يصبح المعيار نفسه مجالًا للاختيار.', 'Make the standard itself a matter of choice.'),
    idea:t('تصور يضع تقنية احتواء الغاز وحقوق استخدامها ضمن قرار الأسطول ككل. الطموح فتح مساحة للتفاوض على الترخيص بحجم الأسطول، أو لتأهيل معيار بديل يمكن إثباته على ناقلة كبيرة، بما يوسّع خيارات المالك التقنية والتجارية.', 'A concept that brings LNG containment technology and usage rights into the fleet-wide decision. The ambition is to open room for fleet-scale licensing, or for qualifying an alternative standard that can be proven on a large carrier, broadening the owner’s technical and commercial choices.'),
    beneficiary:t('ملاك أساطيل الغاز المسال ومطورو تقنيات الاحتواء وشركاء الصناعة البحرية.', 'LNG fleet owners, containment technology developers and maritime industry partners.'),
    outcomes:[
      {title:t('قوة تفاوض الأسطول','Fleet-scale negotiating power'),text:t('جمع احتياجات السفن في تصور ترخيص يعكس حجم الأسطول وطموحه.', 'Bring vessel requirements into a licensing proposition that reflects the scale and ambition of the fleet.')},
      {title:t('بديل يستند إلى إثبات','An alternative backed by proof'),text:t('فتح إمكانية إثبات معيار احتواء آخر على ناقلة كبيرة، ليصبح خيارًا يمكن تقييمه.', 'Open the possibility of proving another containment standard on a large carrier so it becomes an option that can be evaluated.')},
      {title:t('خيارات تقنية أوسع','Wider technology choices'),text:t('منح المالك مساحة أكبر لاختيار التقنية وحقوق استخدامها عبر عمر الأسطول.', 'Give the owner greater choice over technology and usage rights across the fleet’s life.')},
    ],
  },
];
export const prefix = (locale:Locale) => locale==='ar'?'/ar':'';
export const projectStatus:Record<Project['status'],Text> = {
  concept:t('مفهوم','Concept'),
  active:t('قيد التنفيذ','In progress'),
  completed:t('مكتمل','Completed'),
};
export const featuredProjects = projects.filter(p=>p.featuredOrder!==undefined).sort((a,b)=>a.featuredOrder!-b.featuredOrder!);
export const sectorBySlug = (slug:string) => sectors.find(item=>item.slug===slug);
export const projectBySlug = (slug:string) => projects.find(item=>item.slug===slug);
export const sectorPath = (slug:string,locale:Locale) => `${prefix(locale)}/projects/${slug}`;
export const trackPath = (track:Track,locale:Locale) => `${sectorPath(track.sector,locale)}/${track.slug}`;
export const projectPath = (slug:string,locale:Locale) => {const project=projectBySlug(slug);if(!project)throw new Error(`Unknown project: ${slug}`);return `${sectorPath(project.sector,locale)}/${project.track}/${project.slug}`;};
export type ProjectInquiryIntent='commission'|'partner';
export const projectInquiry = (project:Project,locale:Locale,intent:ProjectInquiryIntent='commission') => `${prefix(locale)}/start?${new URLSearchParams({from:'projects',project:project.id,intent,idea:`${project.id} — ${project.title[locale]}`})}`;
export const projectRoutes = [
  ...sectors.map(item=>[item.slug]),
  ...tracks.map(item=>[item.sector,item.slug]),
  ...projects.map(item=>[item.sector,item.track,item.slug]),
];
export type ProjectRoute = {kind:'sector';data:Sector}|{kind:'track';data:Track}|{kind:'project';data:Project};
export function resolveProjectRoute(parts:string[]):ProjectRoute|undefined {
  if(parts.length===1){const data=sectorBySlug(parts[0]);if(data)return {kind:'sector',data};}
  if(parts.length===2){const data=tracks.find(item=>item.sector===parts[0]&&item.slug===parts[1]);if(data)return {kind:'track',data};}
  if(parts.length===3){const data=projects.find(item=>item.sector===parts[0]&&item.track===parts[1]&&item.slug===parts[2]);if(data)return {kind:'project',data};}
}

export const conceptCount = (count:number,locale:Locale) => locale==='ar'?(count===2?'تصوّران مقترحان':`${new Intl.NumberFormat('ar').format(count)} تصوّرات مقترحة`):`${count} proposed concept${count===1?'':'s'}`;

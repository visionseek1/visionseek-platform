import {t, type Text} from '@/lib/institution/schema';

/**
 * Source: Notion page «ابتكارات كورية مرصودة — المرحلة الأولى».
 * Observed innovations only. VisionSeek has no partnership, agency or endorsement
 * relationship with any company listed here. Figures are transcribed verbatim from
 * the approved source; company-sourced figures carry the "per the company" marker.
 * Never add a logo, a product image, or any wording implying representation.
 */

export type Evidence = {claim:Text; url:string; perCompany?:boolean};
export type Innovation = {
  slug:string;
  field:Text;
  name:string;          // product name — not translated
  company:Text;         // company plus city, written per language
  challenge:Text;       // the regional problem this answers (#challenges row)
  description:Text;
  evidence:Evidence[];
  region:{note:Text; links:Evidence[]};
  regionInference?:boolean;
};

export const disclaimer = t(
  'Observed Korean innovation — no existing partnership with VisionSeek',
  'ابتكار كوري مرصود — لا شراكة قائمة مع VisionSeek',
);
export const perCompanyLabel = t('per the company', 'بحسب الشركة');
export const inferenceLabel = t('Inference', 'استنتاج');

export const innovations:Innovation[] = [
  {
    slug:'lunit-insight-mmg',
    field:t('AI diagnostics','التشخيص بالذكاء الاصطناعي'),
    name:'Lunit INSIGHT MMG',
    company:t('Lunit, Seoul','Lunit، سيول'),
    challenge:t('Early detection','الكشف المبكر'),
    description:t(
      'Breast screening assumes two radiologists read every image, and the region does not have that many breast radiologists. Lunit built an AI second reader that marks suspicious areas with a probability score, catching what a tired eye can miss while sending fewer women back for unnecessary recalls.',
      'الكشف المبكر عن سرطان الثدي يحتاج عينَي طبيبَين على كل صورة، والمنطقة لا تملك أطباء أشعة ثدي بهذا العدد. بنت Lunit قارئًا ذكيًا يقف بجانب الطبيب، يلوّن المواضع المشتبهة ويعطي كلًّا منها درجة احتمال، فيلتقط ما قد يفوت العين المتعبة ويقلّل استدعاء النساء بلا داعٍ.',
    ),
    evidence:[
      {claim:t('Approval: Korean MFDS (2019), and FDA clearance K211678 (2021)','الاعتماد: MFDS الكورية (2019)، وFDA بتصريح K211678 (2021)'),url:'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K211678'},
      {claim:t('Capio S:t Göran Hospital, Sweden, one year in live operation: detection up 15% (from 4.8 to 5.5 per thousand); recall down from 2.8% to 2.5%; reading time down by more than 36%','مستشفى Capio S:t Göran بالسويد، سنة تشغيل فعلي: الكشف ارتفع 15% (من 4.8 إلى 5.5 لكل ألف)، والاستدعاء انخفض من 2.8% إلى 2.5%، ووقت القراءة انخفض أكثر من 36%'),url:'https://technode.global/?p=90431'},
      {claim:t('The ScreenTrustCAD trial on more than 58,000 women in Lancet Digital Health','تجربة ScreenTrustCAD على أكثر من 58 ألف امرأة في Lancet Digital Health'),url:'https://gcp.medtechdive.com/news/study-ai-mammography-radiologists-lunit/693415'},
    ],
    region:{note:t('In the region:','في المنطقة:'),links:[
      {claim:t('Qatar’s Screen for Life national screening programme (a five-year contract from June 2024)','برنامج الفحص الوطني القطري Screen for Life (عقد 5 سنوات من يونيو 2024)'),url:'https://en.startuprecipe.co.kr/archives/pr-newswire/lunits-ai-solution-enhances-qatars-national-breast-cancer-screening-program'},
      {claim:t('The Baheya Foundation in Egypt (2022)','مؤسسة بهية في مصر (2022)'),url:'https://www.mobihealthnews.com/news/asia/egyptian-breast-cancer-treatment-centre-adopt-lunits-mammography-ai'},
      {claim:t('The Seha Virtual Hospital in Saudi Arabia','مستشفى صحة الافتراضي بالسعودية'),url:'https://www.auntminnieeurope.com/imaging-informatics/artificial-intelligence/article/15657998/lunit-completes-installation-of-ai-suite-in-middle-east-hospital'},
    ]},
  },
  {
    slug:'clova-carecall',
    field:t('Elderly care','رعاية كبار السن'),
    name:'CLOVA CareCall',
    company:t('Naver Cloud','Naver Cloud'),
    challenge:t('Older people living alone','كبار السن الوحيدون'),
    description:t(
      'Once a week, an AI voice calls an older person who lives alone, asks how they are eating, sleeping and feeling, remembers what they said last time, and alerts a social worker at the first sign of trouble. No device, no app — an ordinary phone is enough.',
      'مكالمة واحدة في الأسبوع من صوت ذكي يسأل المسنّ الذي يعيش وحده عن صحته وأكله ونومه، ويتذكّر ما قاله في المرة السابقة، ويبلّغ الأخصائي الاجتماعي عند أول علامة خطر. لا جهاز ولا تطبيق — الهاتف العادي يكفي.',
    ),
    evidence:[
      {claim:t('Around 50,000 older people across about 150 Korean organizations, contracted by municipalities','نحو 50 ألف مسنّ في نحو 150 جهة كورية، وتتعاقد عليه البلديات'),url:'https://navercorp.com/media/pressReleasesDetail?seq=34429',perCompany:true},
      {claim:t('A Yonsei University ESG centre study commissioned by Naver: dying alone down 44.2% in the areas covered; emergency visits down 9.2%','دراسة مركز ESG بجامعة يونسي بتكليف من Naver: الموت وحيدًا انخفض 44.2% في المناطق المشمولة، وزيارات الطوارئ انخفضت 9.2%'),url:'https://navercorp.com/media/pressReleasesDetail?seq=34429',perCompany:true},
      {claim:t('The only deployment outside Korea: the Japanese city of Izumo (2025)','توسّع خارجي وحيد: مدينة إيزومو اليابانية (2025)'),url:'https://byline.network/2025/06/23-435/'},
    ],
    region:{note:t('Has not arrived yet. Moving it would require a voice model that understands Arabic dialects, and that is itself a missing capability.','لم يصل بعد. وشرط نقله نموذج صوتي يفهم اللهجات العربية، وهذه في حد ذاتها قدرة غائبة.'),links:[]},
    regionInference:true,
  },
  {
    slug:'morning-walk-s200',
    field:t('Rehabilitation','التأهيل الحركي'),
    name:'Morning Walk S200',
    company:t('Curexo','Curexo'),
    challenge:t('Rehabilitation after a stroke','التأهيل بعد الجلطة'),
    description:t(
      'A stroke patient needs thousands of repeated steps to relearn walking, more than any therapist can physically guide. The patient sits on the robot while two powered footplates move the legs in a natural gait pattern, with no overhead harness, and a session starts in about three minutes.',
      'مريض الجلطة يحتاج آلاف الخطوات المتكررة ليستعيد مشيه، والمعالج الطبيعي لا يستطيع أن يحمل ساقيه كل تلك الخطوات. المريض يجلس على الروبوت، ودوّاستان آليتان تحرّكان ساقيه في نمط مشي طبيعي، بلا حزام تعليق، والجلسة تبدأ في حوالي ثلاث دقائق.',
    ),
    evidence:[
      {claim:t('Approval: Korean MFDS (2014, and 2021 for the S200 model), European CE, and an FDA listing in a class exempt from premarket clearance','الاعتماد: MFDS الكورية (2014، وللطراز S200 في 2021)، وCE الأوروبية، وتسجيل لدى FDA في فئة معفاة من التصريح المسبق'),url:'https://accessgudid.nlm.nih.gov/devices/08800043810022'},
      {claim:t('First US inpatient rehabilitation facility to install it: St. David’s Rehabilitation Hospital in Austin (2023)','أول منشأة تأهيل داخلي أمريكية تركّبه: St. David’s Rehabilitation Hospital في أوستن (2023)'),url:'https://www.surgicalroboticstechnology.com/news/harmonic-bionics-completes-first-installation-of-curexos-morning-walk/'},
      {claim:t('A randomized trial across three Korean centres on 58 stroke patients: greater improvement in affected-limb strength and in balance than with usual rehabilitation','تجربة عشوائية في 3 مراكز كورية على 58 مريض جلطة: تحسّن أكبر في قوة الطرف المصاب والتوازن مقارنة بالتأهيل المعتاد'),url:'https://oak.ulsan.ac.kr/handle/2021.oak/6582'},
    ],
    region:{note:t('Has not reached Egypt or the Gulf yet.','لم يصل إلى مصر أو الخليج بعد.'),links:[]},
  },
  {
    slug:'mobicare',
    field:t('Remote monitoring','المراقبة الصحية عن بُعد'),
    name:'mobiCARE',
    company:t('Seers Technology','Seers Technology'),
    challenge:t('Heart-rhythm disorders that come and go','اضطرابات القلب التي تظهر وتختفي'),
    description:t(
      'Heart-rhythm disorders come and go, and a bulky Holter monitor records for a single day. A small chest patch records for days while the patient lives at home, then AI reads the recording and finds what a one-day test would miss.',
      'اضطرابات نبض القلب تظهر وتختفي، وجهاز الهولتر الكبير يسجّل يومًا واحدًا فقط. لاصقة صغيرة على الصدر تسجّل أيامًا والمريض في بيته، ثم يقرأ الذكاء الاصطناعي التسجيل ويستخرج ما فاته فحص اليوم الواحد.',
    ),
    evidence:[
      {claim:t('FDA 510(k) number K253384 (June 2026)','FDA 510(k) برقم K253384 (يونيو 2026)'),url:'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K253384'},
      {claim:t('Around 1,100 Korean medical institutions and more than 770,000 tests','نحو 1,100 مؤسسة طبية كورية وأكثر من 770 ألف فحص'),url:'https://en.edaily.co.kr/news/eda202609075139',perCompany:true},
      {claim:t('A Seoul National University Hospital study on 134 patients: agreement with the Holter at R²=0.995','دراسة بمستشفى جامعة سيول الوطنية على 134 مريضًا: تطابق مع الهولتر بمعامل R²=0.995'),url:'https://www.jmir.org/2024/1/e46098'},
    ],
    region:{note:t('In the region:','في المنطقة:'),links:[
      {claim:t('A three-year distribution contract worth around 22 billion won with One Health, part of the UAE’s PureHealth, a proof of concept at SSMC Hospital in Abu Dhabi, and Saudi Arabia and Oman announced as the next step','عقد توزيع لثلاث سنوات بنحو 22 مليار وون مع One Health التابعة لـPureHealth الإماراتية، وإثبات مفهوم في مستشفى SSMC بأبوظبي، والسعودية وعُمان معلنتان خطوةً تالية'),url:'https://www.biospectator.com/news/view/28630'},
    ]},
  },
  {
    slug:'vuno-med-deepcars',
    field:t('Smart hospital','المستشفى الذكي'),
    name:'VUNO Med-DeepCARS',
    company:t('VUNO','VUNO'),
    challenge:t('Sudden deterioration on the wards','التدهور المفاجئ في الأقسام'),
    description:t(
      'Most cardiac arrests on general wards are preceded by warning signs in vital signs hours earlier, but a nurse covering dozens of patients cannot catch them all. The system reads four vital signs from the electronic record and alerts the team before the patient deteriorates, running on top of the hospital’s existing system.',
      'أغلب حالات توقف القلب في الأقسام العادية تسبقها علامات في المؤشرات الحيوية بساعات، لكن الممرضة المسؤولة عن عشرات المرضى لا تلحظها. يقرأ النظام أربع علامات حيوية من الملف الإلكتروني وينذر الفريق قبل أن يسوء الحال، ويعمل فوق نظام المستشفى القائم.',
    ),
    evidence:[
      {claim:t('Approval: Korean MFDS (2021), CE MDR and UKCA (May 2025), and an FDA Breakthrough Device designation (2023)','الاعتماد: MFDS الكورية (2021)، وCE MDR وUKCA (مايو 2025)، وتصنيف «جهاز اختراقي» من FDA (2023)'),url:'https://www.biospectrumasia.com/news/27/26018/south-korea-based-vunos-ai-powered-cardiac-arrest-risk-management-system-earns-ce-mdr-and-ukca-certifications.html'},
      {claim:t('More than 50,000 beds across more than 20 tertiary hospitals in Korea','أكثر من 50 ألف سرير في أكثر من 20 مستشفى من الدرجة الثالثة في كوريا'),url:'https://www.koreaherald.com/article/10615300'},
      {claim:t('A multicentre study in Critical Care (2023): prediction accuracy of 0.869 against 0.767 for the standard NEWS score','دراسة متعددة المراكز في Critical Care (2023): دقة التنبؤ 0.869 مقابل 0.767 لمقياس NEWS المعتاد'),url:'https://link.springer.com/article/10.1186/s13054-023-04609-0'},
    ],
    region:{note:t('In the region:','في المنطقة:'),links:[
      {claim:t('The Saudi healthcare sandbox (2024), and live trials under way in hospitals in Egypt and Kuwait (first-quarter 2026 results)','البيئة التجريبية للرعاية الصحية السعودية (2024)، وتجارب تشغيل جارية في مستشفيات بمصر والكويت (نتائج الربع الأول 2026)'),url:'https://mobile.newsis.com/view/NISX20260515_0003631668',perCompany:true},
    ]},
  },
];

export const innovationByChallenge = (slug:string) => innovations.find(i => i.slug === slug);

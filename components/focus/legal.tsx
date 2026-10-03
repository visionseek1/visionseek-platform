import Link from 'next/link';
import {CapabilityHeader} from '@/components/capability/navigation';
import CapabilityFooter from '@/components/capability/footer';
import {pick,localePrefix,type PublicLocale} from './locale';
import styles from './focus.module.css';
const privacy = [
 [
  ['المسؤول والتواصل','تدير VisionSeek هذا الموقع، ويدير التواصل د. أحمد عبدالعليم من إنتشون، كوريا الجنوبية. للاستفسار عن البيانات أو طلب الوصول إليها أو تصحيحها أو حذفها، اكتب إلى abdelalim@visionseek.org.'],
  ['Operator and contact','VisionSeek operates this website. Dr. Ahmed Abdelalim manages correspondence from Incheon, South Korea. For data questions or requests to access, correct or delete your information, email abdelalim@visionseek.org.'],
  ['운영자 및 문의','VisionSeek이 이 웹사이트를 운영하며 대한민국 인천의 아흐메드 압델알림 박사가 문의를 관리합니다. 개인정보 문의, 열람, 정정 또는 삭제 요청은 abdelalim@visionseek.org로 보내 주세요.'],
 ],[
  ['نموذج التواصل','الاسم والمؤسسة والبلد حقول اختيارية. وصف الاحتياج أو القدرة مطلوب لتجهيز الرسالة. تظل المدخلات في ذاكرة المتصفح ولا يحفظها النموذج على خادم الموقع أو في تخزين المتصفح. تجهيز الرسالة لا يرسلها؛ أنت تراجعها وتختار فتح البريد أو واتساب، ثم تقرر إرسالها من هناك.'],
  ['Contact form','Name, organization and country are optional. A short description of your need or capability is required to prepare a message. Form entries remain in browser memory; the form does not save them to the website server or browser storage. Preparing a message does not send it. You review it, choose email or WhatsApp, and decide whether to send it there.'],
  ['문의 양식','이름, 기관명, 국가는 선택 항목입니다. 메시지를 작성하려면 필요 또는 보유 역량에 대한 간단한 설명이 필요합니다. 입력 내용은 브라우저 메모리에만 유지되며 사이트 서버나 브라우저 저장소에 저장되지 않습니다. 작성만으로 전송되지 않습니다. 내용을 검토하고 이메일 또는 WhatsApp을 연 뒤 해당 서비스에서 전송 여부를 결정합니다.'],
 ],[
  ['عند إرسال رسالة','نستخدم ما ترسله لفهم طلبك والرد عليه ومتابعة النقاش. البريد وواتساب يخضعان لسياسات مزوديهما، وقد تُعالج البيانات خارج بلدك. لا ترسل بيانات مرضى أو تركيبات أو ملفات تصنيع سرية. اتفق معنا أولًا على قناة مناسبة وحدود مشاركة أي معلومات حساسة.'],
  ['When you send a message','We use what you send to understand your request, reply and follow up. Email and WhatsApp are subject to their providers’ policies and may process data outside your country. Do not send patient data, formulations or confidential manufacturing files. Agree an appropriate channel and disclosure limits with us before sharing sensitive information.'],
  ['메시지 전송 시','보내 주신 정보는 요청 파악, 답변 및 후속 연락에 사용합니다. 이메일과 WhatsApp에는 각 제공업체의 정책이 적용되며 데이터가 귀하의 국가 밖에서 처리될 수 있습니다. 환자 정보, 배합 정보 또는 기밀 제조 자료를 보내지 마세요. 민감한 정보를 공유하기 전에 적절한 채널과 공개 범위를 협의해 주세요.'],
 ],[
  ['الزيارات والقياس','تستضيف Vercel الموقع وقد تعالج سجلات تقنية لتشغيله وحمايته. عند تفعيل Web Analytics في النسخة المنشورة نستخدم إحصاءات مجمعة للبلد والصفحات ومصدر الزيارة والجهاز. لا نستخدم هذا القياس لتحديد أسماء الزوار، ولا نرسل له محتوى النموذج أو معرّفات المنشورات أو عناوين البريد. نستبعد صفحات الإدارة ونحذف معاملات الرابط من عنوان الصفحة المُرسل، ونحترم إشارات Do Not Track وGlobal Privacy Control. لا نستخدم ملفات ارتباط إعلانية أو إعادة استهداف.'],
  ['Visits and measurement','Vercel hosts the site and may process technical logs to operate and protect it. When Web Analytics is enabled on the published site, we use aggregate country, page, referral and device statistics. We do not use this measurement to identify visitors by name or send it form content, post identifiers or email addresses. We exclude administration pages, remove query parameters from the reported page URL, and respect Do Not Track and Global Privacy Control signals. We do not use advertising cookies or retargeting.'],
  ['방문 및 측정','Vercel이 사이트를 호스팅하며 운영과 보호를 위해 기술 로그를 처리할 수 있습니다. 게시된 사이트에서 Web Analytics가 활성화되면 국가, 페이지, 유입 경로 및 기기별 집계 통계를 사용합니다. 방문자의 이름을 식별하는 데 사용하지 않으며 양식 내용, 게시물 식별자 또는 이메일 주소를 전송하지 않습니다. 관리 페이지를 제외하고 보고되는 페이지 URL의 쿼리 매개변수를 제거하며 Do Not Track 및 Global Privacy Control 신호를 존중합니다. 광고 쿠키나 리타기팅은 사용하지 않습니다.'],
 ],[
  ['بيت القادة وغرف الإدارة','تُحمّل منشورات بيت القادة المنشورة ووسائطها من البنية الحالية المستضافة لدى Supabase. إذا حفظت قراءة على جهازك، يُحفظ معرّفها محليًا ويمكنك إزالته من المحفوظات. غرف الإدارة المقيّدة تستخدم تسجيل الدخول وبيانات الجلسة لتحديد الصلاحيات؛ هذه الميزة لا تجعل مراسلاتك منشورات عامة.'],
  ['Leaders House and administration','Published Leaders House posts and media load from the existing Supabase infrastructure. If you save a reading on your device, its identifier is stored locally and can be removed from saved items. Restricted administration rooms use sign-in and session data for access control. This does not turn your correspondence into public posts.'],
  ['리더스 하우스 및 관리','공개된 리더스 하우스 게시물과 미디어는 기존 Supabase 인프라에서 불러옵니다. 글을 기기에 저장하면 식별자가 로컬에 저장되며 저장 목록에서 삭제할 수 있습니다. 제한된 관리 공간은 로그인과 세션 데이터를 사용해 접근을 제어합니다. 문의 내용이 공개 게시물로 전환되지는 않습니다.'],
 ],[
  ['الاحتفاظ والمشاركة','نحتفظ بالمراسلات بقدر ما يلزم لمتابعة الغرض منها وللوفاء بالالتزامات المنطبقة. لا نبيع بيانات التواصل ولا ننشرها كأسماء عملاء أو شركاء. يمكنك طلب الحذف، وسنوضح إن كان هناك سبب يلزمنا بالاحتفاظ بجزء منها. لا نفترض أن مجرد مراسلتنا يجيز مشاركة ملفاتك مع شركة أخرى.'],
  ['Retention and sharing','We retain correspondence as needed for its purpose and applicable obligations. We do not sell contact data or publish correspondents as customers or partners. You can request deletion; we will explain if a requirement means some information must be retained. Contacting us does not by itself authorize sharing your files with another company.'],
  ['보관 및 공유','연락 목적과 적용되는 의무에 필요한 범위에서 서신을 보관합니다. 연락처 데이터를 판매하거나 문의자를 고객 또는 파트너로 공개하지 않습니다. 삭제를 요청할 수 있으며 일부 정보를 보관해야 하는 의무가 있으면 설명합니다. 문의했다는 사실만으로 귀하의 자료를 다른 회사와 공유할 수 있는 것은 아닙니다.'],
 ],
];
const terms=[
 [
  ['نطاق المحتوى','يشرح الموقع اتجاه VisionSeek وتخصصها الأول وقراءات تحريرية. لا يمثل المحتوى وعدًا بنقل تقنية بعينها أو نتيجة تشغيلية مضمونة، ولا نصيحة طبية أو خدمة تسجيل دواء. يُتفق على أي تعاون ونطاقه في وثائق منفصلة.'],
  ['Scope of content','The site describes VisionSeek’s direction, first specialization and editorial perspectives. It does not promise transfer of a specific technology or guarantee an operational outcome, and is not medical advice or a drug registration service. Any engagement and its scope are agreed separately.'],
  ['콘텐츠 범위','사이트는 VisionSeek의 방향, 첫 전문 분야 및 편집 관점을 소개합니다. 특정 기술의 이전이나 운영 결과를 보장하지 않으며 의료 조언 또는 의약품 등록 서비스가 아닙니다. 협력과 범위는 별도로 합의합니다.'],
 ],[
  ['المصادر والحقوق','اقرأ تاريخ كل تقرير وحدوده ومراجعه. الروابط الخارجية لا تعني شراكة أو تأييدًا من الجهة المذكورة. الصور التوضيحية لا تثبت امتلاك منشأة أو تنفيذ مشروع. حقوق المواد والعلامات تعود لأصحابها، ويحتاج إعادة استخدامها إلى مراعاة حقوقهم.'],
  ['Sources and rights','Read each report’s date, limitations and sources. External links do not imply a partnership or endorsement. Illustrative images do not establish facility ownership or project delivery. Materials and trademarks belong to their respective owners; reuse must respect their rights.'],
  ['출처 및 권리','각 보고서의 날짜, 한계 및 출처를 확인해 주세요. 외부 링크는 파트너십이나 보증을 의미하지 않습니다. 설명용 이미지는 시설 소유 또는 프로젝트 수행을 입증하지 않습니다. 자료와 상표의 권리는 각 소유자에게 있으며 재사용 시 해당 권리를 존중해야 합니다.'],
 ],[
  ['التواصل والتحديثات','الرسالة الأولية لا تنشئ تعاقدًا أو تفويضًا. نحدّث المحتوى عند تغير اتجاه العمل أو توفر معلومات أدق. للاستفسارات اكتب إلى abdelalim@visionseek.org.'],
  ['Contact and updates','An initial message does not establish a contract or mandate. We update content as our work evolves or more accurate information becomes available. For questions, email abdelalim@visionseek.org.'],
  ['문의 및 업데이트','첫 문의만으로 계약이나 위임이 성립하지 않습니다. 업무 방향이 발전하거나 더 정확한 정보가 생기면 콘텐츠를 갱신합니다. 문의는 abdelalim@visionseek.org로 보내 주세요.'],
 ],
];
export default function FocusLegal({locale,kind}:{locale:PublicLocale;kind:'privacy'|'terms'}){
 const t=(ar:string,en:string,ko:string)=>pick(locale,ar,en,ko);const index=locale==='ar'?0:locale==='en'?1:2;
 return <div className={`vs-site locale-${locale}`} lang={locale} dir={locale==='ar'?'rtl':'ltr'}><CapabilityHeader locale={locale} path={`/${kind}`}/><main id="main-content" className={styles.page}><header className={styles.hero}><p className={styles.eyebrow}>VISIONSEEK</p><h1>{kind==='privacy'?t('الخصوصية والبيانات','Privacy & data','개인정보 및 데이터'):t('شروط الاستخدام','Terms of use','이용약관')}</h1><p>{t('آخر تحديث: 3 أكتوبر 2026','Updated: 3 October 2026','업데이트: 2026년 10월 3일')}</p></header><div className={`${styles.section} ${styles.light}`} style={{display:'grid',gap:36}}>{(kind==='privacy'?privacy:terms).map((section,i)=><section key={i}><h2>{section[index][0]}</h2><p>{section[index][1]}</p></section>)}{kind==='privacy'&&<p><a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer">Vercel Web Analytics ↗</a> · <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noreferrer">WhatsApp ↗</a> · <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">Supabase ↗</a></p>}<Link className={styles.link} href={`${localePrefix(locale)}/start`}>{t('تواصل مع VisionSeek','Contact VisionSeek','VisionSeek 문의')} ↗</Link></div></main><CapabilityFooter locale={locale}/></div>;
}

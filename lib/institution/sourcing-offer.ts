import {t, type Entry, type Locale, type Text} from './schema';

/** Organiser show-information page, reviewed 7 October 2026. */
export const expoSourceUrl = 'https://kbeautyexpo.com/fairContents.do?FAIRMENU_IDX=11815&hl=ENG';
export const sourcingEmail = 'abdelalim@visionseek.org';
export const sourcingWhatsApp = 'https://wa.me/821042419606';

export const sourcingRequestLabel: Text = t(
  'Request a sourcing-route verification',
  'اطلب تحقق مسار توريد',
);

export const sourcingBoundary: Text = t(
  'The client pays the supplier directly. VisionSeek does not hold funds, does not trade, and does not guarantee a deal.',
  'يدفع العميل للمورد مباشرة. VisionSeek لا تحتفظ بالأموال، ولا تتاجر، ولا تضمن صفقة.',
);

const requestBody: Text = t(
  'I am requesting a sourcing-route verification for Korean skincare (K-Beauty), for an importer in Egypt or the Gulf. Skincare only, not makeup.',
  'أطلب تحقق مسار توريد للعناية بالبشرة الكورية (K-Beauty)، لمستورد في مصر أو الخليج. العناية بالبشرة فقط، بلا مكياج.',
);

const requestSubject: Text = t(
  'Sourcing-route verification — VS-P03',
  'طلب تحقق مسار توريد — VS-P03',
);

export function sourcingMailto(locale: Locale) {
  return `mailto:${sourcingEmail}?subject=${encodeURIComponent(requestSubject[locale])}&body=${encodeURIComponent(requestBody[locale])}`;
}

export function sourcingWhatsAppLink(locale: Locale) {
  return `${sourcingWhatsApp}?text=${encodeURIComponent(requestBody[locale])}`;
}

export function workingSourcingOffer(base: Entry): Entry {
  return {
    section: base.section,
    slug: base.slug,
    code: base.code,
    title: base.title,
    image: base.image,
    category: t('Working offer', 'عرض قائم'),
    status: t('Working offer · first application', 'عرض قائم · التطبيق الأول'),
    summary: t(
      'Working offer for importers in Egypt and the Gulf. First application: sourcing-route verification for Korean skincare (K-Beauty), skincare only and not makeup. The client pays the supplier directly. VisionSeek does not hold funds, does not trade, and does not guarantee a deal.',
      'عرض قائم لمستوردي مصر والخليج. التطبيق الأول: تحقق مسار توريد للعناية بالبشرة الكورية (K-Beauty)، والعناية بالبشرة فقط ولا يشمل المكياج. يدفع العميل للمورد مباشرة. VisionSeek لا تحتفظ بالأموال، ولا تتاجر، ولا تضمن صفقة.',
    ),
    facts: [
      {label: t('First application', 'التطبيق الأول'), value: t('Korean skincare (K-Beauty) for importers in Egypt and the Gulf. Skincare only; makeup is outside this application.', 'العناية بالبشرة الكورية (K-Beauty) لمستوردي مصر والخليج. العناية بالبشرة فقط، والمكياج خارج هذا التطبيق.')},
      {label: t('First window', 'النافذة الأولى'), value: t('K-Beauty Expo Korea, 15–17 October 2026, KINTEX, Goyang.', 'معرض K-Beauty Expo Korea، ١٥–١٧ أكتوبر ٢٠٢٦، كينتكس، غويانغ.')},
      {label: t('Boundary', 'الحد'), value: sourcingBoundary},
    ],
    blocks: [
      {title: t('The capability and its beneficiary', 'القدرة والمستفيد'), body: t('Importers in Egypt and the Gulf who need a checked Korean skincare route before they commit. VisionSeek is in Korea and covers trade shows and suppliers on the buyer’s behalf.', 'مستوردون في مصر والخليج يحتاجون مسارًا مفحوصًا للعناية بالبشرة الكورية قبل الالتزام. VisionSeek موجودة في كوريا، وتغطي المعارض والموردين نيابة عن المشتري.')},
      {title: t('The current limit', 'الحد الحالي'), body: t('A listing, an indicative price, or a supplier’s own description does not establish company registration, whether the party manufactures or only trades, wholesale terms, GCC distribution exclusivity, ingredient suitability, or the regulatory notes that matter in the destination market.', 'الإعلان أو السعر الاسترشادي أو وصف المورد لنفسه لا يثبت قيد الشركة، ولا يبيّن إن كان الطرف مصنعًا أو مجرد موزع أو تاجر، ولا يثبت شروط الجملة، ولا حصرية التوزيع في دول مجلس التعاون، ولا ملاءمة المكونات، ولا الملاحظات التنظيمية التي تهم سوق الوصول.')},
      {title: t('The first application', 'التطبيق الأول'), body: t('Sourcing-route verification for Korean skincare (K-Beauty), for importers in Egypt and the Gulf. Skincare only. Makeup is not part of this application.', 'تحقق مسار توريد للعناية بالبشرة الكورية (K-Beauty)، لمستوردي مصر والخليج. العناية بالبشرة فقط. المكياج ليس جزءًا من هذا التطبيق.')},
      {title: t('Checks included', 'ما يشمله الفحص'), items: [
        t('Supplier company registration.', 'قيد الشركة لدى المورد.'),
        t('Whether the party is a manufacturer or a distributor/trader.', 'صفة الطرف: مصنع، أم موزع أو تاجر.'),
        t('Wholesale price and minimum order quantity, collected for the buyer and not published.', 'سعر الجملة والحد الأدنى للطلب، يُجمعان للمشتري ولا يُنشران.'),
        t('GCC distribution exclusivity status.', 'وضع حصرية التوزيع في دول مجلس التعاون الخليجي.'),
        t('Ingredient review by a pharmacist for prohibited or haram ingredients, including pork derivatives, collagen or gelatin of unknown source, and alcohol, and a halal certificate where one is available.', 'مراجعة المكونات بواسطة صيدلي، للخلو من المكونات الممنوعة أو غير الحلال، ومنها مشتقات الخنزير، والكولاجين أو الجيلاتين مجهول المصدر، والكحول، مع شهادة حلال إن وُجدت.'),
        t('Regulatory notes for the destination market.', 'ملاحظات تنظيمية لسوق الوصول.'),
        t('An Arabic report within 48 hours.', 'تقرير بالعربية خلال ٤٨ ساعة.'),
      ]},
      {title: t('Boundaries', 'الحدود'), body: t(`${sourcingBoundary.en} Wholesale price and minimum order quantity are collected for the requesting buyer and are not published on this site.`, `${sourcingBoundary.ar} سعر الجملة والحد الأدنى للطلب يُجمعان للمشتري صاحب الطلب، ولا يُنشران على هذا الموقع.`)},
      {title: t('The first window', 'النافذة الأولى'), body: t('The first window is K-Beauty Expo Korea, 15–17 October 2026, at KINTEX in Goyang, from 10:00 to 17:00. The organiser’s show-information page was reviewed on 7 October 2026. This application covers skincare only. Makeup stays outside it, including where the exhibition lists other categories.', 'النافذة الأولى هي معرض K-Beauty Expo Korea، من ١٥ إلى ١٧ أكتوبر ٢٠٢٦، في كينتكس بغويانغ، من العاشرة صباحًا إلى الخامسة مساءً. جرت مراجعة صفحة معلومات المعرض لدى الجهة المنظمة في ٧ أكتوبر ٢٠٢٦. هذا التطبيق للعناية بالبشرة فقط. المكياج يبقى خارج نطاقه، حتى حين يعرض المعرض فئات أخرى.')},
      {title: t('Heilmeier questions', 'أسئلة Heilmeier'), items: [
        t('What are we trying to do? Establish, for an importer in Egypt or the Gulf, whether a Korean skincare sourcing route can be identified and used before money or a purchase order is committed.', 'ما الذي نحاول فعله؟ أن يتبين لمستورد في مصر أو الخليج إن كان مسار توريد للعناية بالبشرة من كوريا معروفًا وقابلًا للاستخدام، قبل أن يلتزم بمال أو بأمر شراء.'),
        t('How is it done today, and what are the limits? Buyers often rely on a listing, an introduction, or the supplier’s own account. Those rarely settle registration, whether the party manufactures or only trades, GCC exclusivity, ingredient constraints, or destination-market notes.', 'كيف يُدار الأمر اليوم، وما حدود ذلك؟ كثيرًا ما يعتمد المشتري على إعلان أو تعريف أو كلام المورد عن نفسه. وهذا قلّما يحسم القيد، ولا إن كان الطرف مصنعًا أو مجرد تاجر، ولا حصرية التوزيع في دول مجلس التعاون، ولا قيود المكونات، ولا ملاحظات سوق الوصول.'),
        t('What is new in our approach? VisionSeek is in Korea, covers the relevant trade show and the suppliers on the buyer’s behalf, and returns one Arabic report within 48 hours. Wholesale price and minimum order quantity are collected for the buyer and are not published.', 'ما الجديد في المسلك؟ VisionSeek موجودة في كوريا، وتغطي المعرض المعني والموردين نيابة عن المشتري، وتسلّم تقريرًا عربيًا واحدًا خلال ٤٨ ساعة. سعر الجملة والحد الأدنى للطلب يُجمعان للمشتري ولا يُنشران.'),
        t('Who cares? Importers of Korean skincare in Egypt and the Gulf who need a checked route before they deal with the supplier.', 'من يهمّه الأمر؟ مستوردو العناية بالبشرة الكورية في مصر والخليج، إذا أرادوا مسارًا مفحوصًا قبل التعامل مع المورد.'),
        t('What are the risks? A supplier may withhold terms. A GCC exclusive distributor may already exist. An ingredient or regulatory constraint may place a product outside the application. The report records what was established and what was not. The report is not a deal.', 'ما المخاطر؟ قد يحجب المورد الشروط. قد توجد حصرية توزيع قائمة في دول مجلس التعاون. قد تُخرج مراجعة المكونات أو الملاحظات التنظيمية منتجًا من النطاق. يسجّل التقرير ما ثبت وما لم يثبت. التقرير ليس صفقة.'),
        t('How do we know it worked? The buyer has the Arabic report within 48 hours, can see which checks were completed, and can decide whether to pay the supplier directly. Receiving the report is not a completed purchase.', 'كيف نعرف أن العمل أدى غرضه؟ يصل التقرير العربي خلال ٤٨ ساعة، ويظهر ما اكتمل من الفحوص، ويقرر المشتري إن كان سيدفع للمورد مباشرة. استلام التقرير ليس إتمام شراء.'),
      ]},
      {title: t('Decision and stop point', 'القرار وحد التوقف'), body: t('The buyer decides whether to deal with the supplier and pays the supplier directly. VisionSeek stops at the report. Missing registration, unresolved exclusivity, or an ingredient constraint is recorded as unresolved and is not filled in by assumption. Nothing further is undertaken unless a separate written scope is agreed.', 'يقرر المشتري إن كان سيتعامل مع المورد، ويدفع له مباشرة. تقف VisionSeek عند التقرير. إذا غاب القيد، أو بقيت الحصرية غير محسومة، أو ظهر قيد على المكونات، يُسجَّل ذلك بوصفه غير محسوم ولا يُستكمل بافتراض. لا يُباشر شيء بعد التقرير إلا بنطاق مكتوب يُتفق عليه على حدة.')},
    ],
    related: ['/work-with-us', '/programs/program-lifecycle'],
  };
}

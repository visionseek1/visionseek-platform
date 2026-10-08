// Quick guide for the control room, opened from the «دليل الاستخدام» button inside /admin.
// Static HTML on purpose: it must work even when the editor itself fails to load.
const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>دليل غرفة التحكم · VisionSeek</title>
  <link rel="icon" href="/favicon.ico">
  <style>
    :root { --ink:#030404; --paper:#f5f5f2; --lime:#cfff00; --mint:#91e7c9; --muted:#5b5f5d; --line:#dfe1df; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--paper); color: var(--ink); font: 16px/1.75 "Segoe UI", "IBM Plex Sans Arabic", "Noto Sans Arabic", "Geeza Pro", Tahoma, Arial, sans-serif; }
    header { background: var(--ink); color: var(--paper); padding: 40px 20px 36px; }
    .wrap { max-width: 820px; margin: 0 auto; padding: 0 4px; }
    header p.kicker { margin: 0 0 8px; color: var(--lime); font-weight: 700; font-size: 14px; }
    header h1 { margin: 0; font-size: clamp(26px, 4vw, 36px); line-height: 1.3; }
    header p.lede { margin: 12px 0 0; color: rgba(245,245,242,.75); max-width: 40rem; }
    main { padding: 8px 20px 64px; }
    h2 { margin: 44px 0 14px; font-size: 22px; }
    .flow { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 22px; }
    .flow div { background: #fff; color: var(--ink); border: 1px solid var(--line); border-radius: 12px; padding: 14px; }
    .flow b { display: block; font-size: 15px; }
    .flow span { color: var(--muted); font-size: 14px; }
    .flow .done { background: var(--lime); border-color: var(--lime); }
    .flow .done span { color: var(--ink); }
    table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
    th, td { text-align: right; padding: 12px 14px; border-bottom: 1px solid var(--line); vertical-align: top; }
    th { background: #eceeeb; font-size: 14px; }
    tr:last-child td { border-bottom: 0; }
    td.where { font-weight: 600; }
    ol.steps { padding: 0; list-style: none; counter-reset: s; }
    ol.steps li { position: relative; padding: 0 44px 16px 0; counter-increment: s; }
    ol.steps li::before { content: counter(s); position: absolute; right: 0; top: 0; width: 30px; height: 30px; border-radius: 50%; background: var(--ink); color: var(--lime); display: grid; place-items: center; font-weight: 700; font-size: 14px; }
    .tags { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .tag { border-radius: 12px; padding: 14px; }
    .tag b { display: block; }
    .tag span { font-size: 14px; }
    .draft { background: #f3dafd; } .review { background: #feec9b; } .ready { background: #ccef6e; }
    .note { background: #fff; border-right: 4px solid var(--mint); border-radius: 8px; padding: 14px 16px; margin: 14px 0; }
    .key { display: inline-block; padding: 0 8px; border: 1px solid var(--line); border-bottom-width: 2px; border-radius: 6px; background: #fff; font-size: 14px; direction: ltr; }
    a { color: var(--ink); }
    .back { display: inline-block; margin-top: 20px; padding: 10px 18px; border-radius: 999px; background: var(--lime); color: var(--ink); text-decoration: none; font-weight: 700; }
    @media (max-width: 640px) {
      .flow, .tags { grid-template-columns: 1fr 1fr; }
      th:nth-child(3), td:nth-child(3) { display: none; }
    }
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <p class="kicker">غرفة التحكم · دليل سريع</p>
      <h1>تعدّل، تختار «جاهز للنشر»، والموقع يتحدث وحده.</h1>
      <p class="lede">كل تعديل يُحفظ أولًا كنسخة جانبية لا يراها أحد. لا يصل إلى visionseek.org إلا حين تختار «جاهز للنشر» وتنجح فحوصات الموقع.</p>
      <div class="flow">
        <div><b>1 · عدّل</b><span>من القائمة على اليسار</span></div>
        <div><b>2 · احفظ</b><span>زر «حفظ» أعلى الصفحة</span></div>
        <div><b>3 · جاهز للنشر</b><span>من قائمة الحالة</span></div>
        <div class="done"><b>4 · يُنشر وحده</b><span>خلال 3 إلى 4 دقائق</span></div>
      </div>
    </div>
  </header>
  <main>
    <div class="wrap">
      <h2>أين أجد ما أريد تغييره؟</h2>
      <table>
        <thead><tr><th>أريد أن…</th><th>افتح</th><th>ملاحظة</th></tr></thead>
        <tbody>
          <tr><td>أخفي صفحة أو قسمًا، أو أرجعه</td><td class="where">إظهار وإخفاء</td><td>لا يُحذف شيء. احذف السطر من القائمة فيعود.</td></tr>
          <tr><td>أغيّر ترتيب الشريط العلوي</td><td class="where">الشريط العلوي والتذييل ← القائمة</td><td>اسحب القسم من المقبض <b>⠿</b>، والمعاينة على اليمين تتغير معك.</td></tr>
          <tr><td>أعدّل نصًا في الصفحة الرئيسية</td><td class="where">الصفحة الرئيسية</td><td>كل نص له خانة عربية وخانة إنجليزية.</td></tr>
          <tr><td>أضيف خبرًا</td><td class="where">الأخبار ← «جديد»</td><td>العربية والإنجليزية نصّان مستقلان، كلٌّ بمنطق لغته.</td></tr>
          <tr><td>أعدّل صفحة مشروع</td><td class="where">صفحات المشاريع</td><td>المجالات والمسارات نفسها في «المشاريع: المجالات والمسارات».</td></tr>
          <tr><td>أعدّل برنامجًا</td><td class="where">البرامج</td><td></td></tr>
          <tr><td>أغيّر العنوان أعلى صفحة قسم</td><td class="where">مقدمات صفحات الأقسام</td><td>لا تتحكم في ترتيب الشريط العلوي.</td></tr>
          <tr><td>أغيّر البريد أو واتساب أو لينكدإن</td><td class="where">بيانات التواصل</td><td>يتغير في كل صفحات الموقع مرة واحدة.</td></tr>
          <tr><td>أعدّل الخصوصية أو الشروط</td><td class="where">الخصوصية والشروط</td><td></td></tr>
        </tbody>
      </table>
      <div class="note">ابحث عن أي كلمة من خانة «ابحث في كل المحتوى» أعلى القائمة، بدل التنقل بين الأقسام.</div>

      <h2>النشر، خطوة بخطوة</h2>
      <ol class="steps">
        <li>افتح ما تريد تعديله وغيّر النص.</li>
        <li>اضغط <b>«حفظ»</b>. التعديل الآن محفوظ في نسخة جانبية، والموقع لم يتغير.</li>
        <li>لترى التعديل قبل نشره: اضغط <b>«التحقق من المعاينة»</b> بعد دقيقتين تقريبًا، ثم <b>«عرض المعاينة»</b>. تفتح الصفحة كما ستظهر على الموقع (إن طُلب منك الدخول، ادخل بحساب Vercel).</li>
        <li>من القائمة بجانب «حفظ» اختر <b>«جاهز للنشر»</b>.</li>
        <li>انتهيت. حين تنجح الفحوصات، يُنشر التعديل وحده ويظهر على الموقع بعد دقيقة أو اثنتين.</li>
      </ol>

      <h2>ماذا تعني الحالات الثلاث؟</h2>
      <div class="tags">
        <div class="tag draft"><b>مسودة</b><span>تعمل عليه. لا يُنشر.</span></div>
        <div class="tag review"><b>قيد المراجعة</b><span>ينتظر نظرة أخيرة. لا يُنشر.</span></div>
        <div class="tag ready"><b>جاهز للنشر</b><span>يُنشر وحده بعد نجاح الفحوصات.</span></div>
      </div>
      <p>كل التعديلات المفتوحة تجدها في <b>«قيد النشر»</b> أعلى اللوحة، وتنقل أي بطاقة بين الأعمدة بالسحب.</p>

      <h2>إن ظهرت رسالة</h2>
      <div class="note"><b>«تعذّر النشر الآن… الفحوصات لم تكتمل»</b>: لا تفعل شيئًا. ما دامت الحالة «جاهز للنشر» فسيُنشر التعديل وحده عند اكتمال الفحوصات.</div>
      <div class="note"><b>نُشر التعديل ولا يظهر على الموقع</b>: حدّث الصفحة تحديثًا كاملًا <span class="key">Ctrl + Shift + R</span> أو <span class="key">⌘ + Shift + R</span> على ماك.</div>
      <div class="note"><b>بقي التعديل في «جاهز للنشر» أكثر من عشر دقائق</b>: أحد الفحوصات رفض التعديل، فلم يُنشر شيء. اطلب من Claude أن يراجعه.</div>

      <h2>التراجع</h2>
      <p>قبل النشر: من القائمة بجانب «حفظ» اختر <b>«تراجع عن التعديلات غير المنشورة»</b>. بعد النشر: عدّل النص مرة أخرى وانشره، أو أرجع ما أخفيته من «إظهار وإخفاء».</p>

      <a class="back" href="/admin">العودة إلى غرفة التحكم</a>
    </div>
  </main>
</body>
</html>
`;

export function GET() {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

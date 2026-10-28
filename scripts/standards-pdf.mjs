/**
 * Executive summary PDFs: code, name, and the related pillar text only.
 * Run: node scripts/standards-pdf.mjs
 */
import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const standards = [
  {
    file: 'vs-std-01-mpds',
    code: 'VS-STD-01 (MPDS)',
    enName: 'Multi-Path Decision Governance Standard',
    arName: 'معيار حوكمة القرار متعدد المسارات',
    en: 'Most AI outputs rely on a single statistical consensus while hiding viable alternatives—leading enterprises into costly strategic errors. We establish the protocols for adversarial multi-paradigm verification and ground-truth injection before capital commitment.',
    ar: 'تُبنى أغلب إجابات الذكاء الاصطناعي على مسار إحصائي واحد وتُخفي البدائل الأخرى، مما يورّط المؤسسات في قرارات واستثمارات مكلفة في الاتجاه الخاطئ. نضع المعايير والمنهجيات اللازمة لإخضاع أي قرار استراتيجي لتصادم الخوارزميات المتضادة وحقن قيود الواقع الميداني قبل البناء عليه.',
  },
  {
    file: 'vs-std-02-acos',
    code: 'VS-STD-02 (ACOS)',
    enName: 'AI Capability Ownership & Sovereignty Standard',
    arName: 'معيار ملكية القدرة والسيادة التعاقدية',
    en: 'True sovereignty cannot be rented. We establish the contractual standards, model-agnostic architectures, and ownership ladders that ensure your institution retains full control over its data, institutional memory, and operational capability if a vendor walks away tomorrow.',
    ar: 'السيادة لا تتحقق بشراء اشتراكات سحابية تتوقف بتوقف المورد. نُهندس الأطر التعاقدية والمعمارية المعزولة محلياً وموازين نقل المعرفة التي تضمن بقاء البيانات، والذاكرة المؤسسية، والقدرة التشغيلية مملوكة بالكامل داخل المؤسسة.',
  },
  {
    file: 'vs-std-03-boagc',
    code: 'VS-STD-03 (BOAGC)',
    enName: 'Bionic Organization & Agentic Governance Code',
    arName: 'الكود التشغيلي لحوكمة المؤسسات الهجينة والوكلاء',
    en: 'Functioning as the "Toyota Production System" for the agentic era, we define how organizations operate when autonomous agents execute core workflows under lean human leadership—establishing authority topologies, mandatory human choke points, and the AI Andon Cord.',
    ar: 'على خطى "نظام إنتاج تويوتا" في عصر الصناعة، نؤسس القواعد التشغيلية لعصر الوكلاء: كيف تُبنى وتُدار مؤسسة ينفذ نصف مهامها وكلاء ذكاء اصطناعي تحت إشراف بشر قليلين؟ نحدد خريطة الصلاحيات، المسؤولية، نقاط الحسم البشري الإلزامية، وحبل الإيقاف الذكي (AI Andon Cord) لمنع تراكم الأخطاء الآلية.',
  },
];

const outDir = new URL('../public/standards/', import.meta.url);
mkdirSync(outDir, {recursive: true});

const html = (lang, dir, code, name, body) => `<!doctype html>
<html lang="${lang}" dir="${dir}">
<meta charset="utf-8">
<title>${code}</title>
<style>
  @page { margin: 18mm; }
  body { margin: 0; font-size: 16px; line-height: 1.7; color: #111; }
  body[dir="ltr"] { font-family: "Noto Sans", "DejaVu Sans", sans-serif; }
  body[dir="rtl"] { font-family: "Noto Naskh Arabic", "Noto Sans Arabic", sans-serif; }
  p { margin: 0 0 1rem; }
  h1 { font-size: 1.25rem; font-weight: 600; margin: 0 0 1rem; }
</style>
<body dir="${dir}">
<p>${code}</p>
<h1>${name}</h1>
<p>${body}</p>
</body>
</html>`;

for (const item of standards) {
  for (const lang of ['en', 'ar']) {
    const file = join(tmpdir(), `${item.file}-${lang}.html`);
    const pdf = new URL(`${item.file}-${lang}.pdf`, outDir);
    writeFileSync(file, html(lang, lang === 'ar' ? 'rtl' : 'ltr', item.code, lang === 'ar' ? item.arName : item.enName, item[lang]));
    const dataDir = join(tmpdir(), `vs-pdf-${item.file}-${lang}`);
    const result = spawnSync('google-chrome', [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      `--user-data-dir=${dataDir}`,
      '--no-pdf-header-footer',
      `--print-to-pdf=${pdf.pathname}`,
      file,
    ], {stdio: 'inherit', timeout: 20000, killSignal: 'SIGKILL'});
    if (!existsSync(pdf)) {
      console.error('missing', pdf.pathname, result.status);
      process.exit(1);
    }
  }
}

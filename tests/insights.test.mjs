import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import test from 'node:test';

const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const json = p => JSON.parse(read(p));

test('VisionSeek Reports takes /reports; Leaders House moves to /leaders-house and stays archived', () => {
  const vis = json('content/visibility.json');
  const archived = vis.archived.map(a => a.path);
  assert.ok(archived.includes('/leaders-house'));
  assert.ok(!archived.includes('/reports'));
  for (const p of ['app/reports/page.tsx', 'app/ar/reports/page.tsx', 'app/reports/notes/[slug]/page.tsx', 'app/ar/reports/notes/[slug]/page.tsx', 'app/reports/frameworks/[slug]/page.tsx', 'app/ar/reports/frameworks/[slug]/page.tsx', 'app/leaders-house/page.tsx', 'app/ar/leaders-house/page.tsx']) assert.ok(existsSync(new URL(`../${p}`, import.meta.url)), p);
  assert.match(read('components/capability/navigation.tsx'), /isArchived\('\/leaders-house'\)/);
});

test('Reports sits in the main menu between Programs and Indices, with MSA Arabic label تقارير', () => {
  const data = json('content/navigation.json');
  const nav = data.sections.map(s => s.path);
  const item = data.sections.find(s => s.path === '/reports');
  assert.ok(item);
  assert.equal(item.en, 'Reports');
  assert.equal(item.ar, 'تقارير');
  assert.equal(nav[nav.indexOf('/reports') - 1], '/programs');
  assert.equal(nav[nav.indexOf('/reports') + 1], '/indices');
  assert.equal(data.sections.filter(s => s.path === '/reports').length, 1);
  assert.equal(data.sections.find(s => s.path === '/insights'), undefined);
  for (const s of data.sections) for (const c of s.children) if (c.ar === 'بيت القادة') assert.equal(c.href, '/leaders-house');
});

test('first launch: note L-001 (research in progress), the Decision Dimensions Map (in development) and the newsletter; empty sections hidden', () => {
  const d = json('content/insights.json');
  assert.equal(d.notes[0].number, 'L-001');
  assert.equal(d.notes[0].status.ar, 'قيد البحث');
  assert.equal(d.frameworks[0].title.ar, 'خريطة أبعاد القرار');
  assert.equal(d.frameworks[0].status.ar, 'قيد البناء.');
  assert.equal(d.articles.length, 0);
  const pages = read('components/insights/pages.tsx');
  assert.match(pages, /if \(!items\.length\) return null/);
  assert.doesNotMatch(pages + JSON.stringify(d), /لا يوجد بعد/);
  const walk = v => typeof v === 'object' && v ? (('en' in v && 'ar' in v) ? [v] : Object.values(v).flatMap(walk)) : [];
  for (const bi of walk(d)) assert.ok(bi.en && bi.ar, JSON.stringify(bi).slice(0, 80));
});

test('newsletter: saved in the platform under الظهور والتواصل, never sent from the site', () => {
  const api = read('app/api/newsletter/route.ts');
  const lib = read('lib/notion-room.ts');
  assert.match(lib, /newsletter: \{ ds: "8a242351-eda5-4798-b5ba-4d80afbcd564"/);
  assert.match(lib, /"القطاع": \{ select: \{ name: "الظهور والتواصل" \} \}/);
  assert.match(api, /website/); // honeypot
  assert.doesNotMatch(api + lib, /sendgrid|resend\.com|nodemailer|mailgun|smtp/i);
  assert.match(read('scripts/ops-room/room.html'), /مفيش أي إرسال للمشتركين غير بموافقتك/);
});

test('the cancelled programme does not appear anywhere on the public site', async () => {
  const {readdirSync, statSync} = await import('node:fs');
  const walk = d => readdirSync(new URL(`../${d}`, import.meta.url)).flatMap(f => { const p = `${d}/${f}`; return statSync(new URL(`../${p}`, import.meta.url)).isDirectory() ? walk(p) : [p]; });
  const files = ['components', 'content', 'app', 'lib', 'public/admin'].flatMap(walk).filter(p => /\.(tsx?|json|ya?ml|css)$/.test(p) && !p.startsWith('app/ops/'));
  for (const p of files) assert.doesNotMatch(read(p), /\bHLO\b|Highest Level One/, p);
  assert.match(read('components/capability/navigation.tsx'), /مهندس القدرات المؤسسية/);
});

test('«هندسة الفرص» / Engineering Opportunities no longer appears on the public site', async () => {
  const {readdirSync, statSync} = await import('node:fs');
  const walk = d => readdirSync(new URL(`../${d}`, import.meta.url)).flatMap(f => { const p = `${d}/${f}`; return statSync(new URL(`../${p}`, import.meta.url)).isDirectory() ? walk(p) : [p]; });
  const files = ['components', 'content', 'app', 'lib', 'public/admin'].flatMap(walk).filter(p => /\.(tsx?|json|ya?ml|css)$/.test(p) && !p.startsWith('app/ops/'));
  for (const p of files) assert.doesNotMatch(read(p), /هندسة الفرص|engineering opportunities/i, p);
  assert.match(read('components/capability/footer.tsx'), /'منهجنا'/);
});

test('/en/<page> redirects to the English page at the root', () => {
  assert.match(read('next.config.ts'), /source: '\/en\/:path\+', destination: '\/:path\+'/);
});

test('Insights: reports and research papers live apart; the frameworks are archived, not deleted', () => {
  const d = json('content/insights.json');
  assert.equal(d.sections.reports.title.ar, 'التقارير');
  assert.equal(d.sections.research.title.ar, 'الأوراق العلمية');
  const report = d.reports.find(x => x.page === '/reports/reports/half-the-picture');
  assert.ok(report);
  assert.match(report.title.ar, /^احذر نصائح الذكاء الاصطناعي/);
  assert.ok(existsSync('public' + report.pdf), report.pdf);
  assert.equal(report.related.href, '/reports/research');
  const paper = d.research[0];
  assert.match(paper.title.en, /^Advice from Half the Picture/);
  assert.equal(paper.preprint, 'https://doi.org/10.5281/zenodo.23399249');
  assert.equal(paper.related, undefined);
  assert.ok(json('content/visibility.json').archived.some(a => a.path === '/reports/notes/l-001'));
  for (const f of ['reports/reports/page.tsx', 'reports/research/page.tsx', 'reports/reports/half-the-picture/page.tsx']) for (const pre of ['app/', 'app/ar/']) assert.ok(existsSync(pre + f), pre + f);
  assert.ok(json('content/visibility.json').archived.some(a => a.path === '/reports/frameworks/decision-dimensions'));
  assert.equal(d.frameworks[0].slug, 'decision-dimensions');
  assert.match(read('next.config.ts'), /insights\/research\/half-the-picture`, destination: `\$\{prefix\}\/reports\/reports\/half-the-picture/);
  const lib = read('lib/research/half-the-picture.ts');
  assert.match(lib, /zenodo\.23399249/);
  assert.match(lib, /القرار الإنساني يبقى قرارك/);
});

test('Insights: Localization Doctrine follows the first report pattern; numbers, sources and marks stay exact', () => {
  const d = json('content/insights.json');
  const report = d.reports.find(x => x.page === '/reports/reports/localization-doctrine');
  assert.ok(report);
  assert.equal(d.reports[1].page, '/reports/reports/localization-doctrine');
  assert.equal(report.related.href, '/reports/reports/methodology');
  assert.equal(report.title.ar, 'عقيدة التوطين: من استخدام التكنولوجيا إلى امتلاكها: كوريا دليلٌ على أن العرب يستطيعون');
  assert.equal(report.title.en, 'The Localization Doctrine: From Using Technology to Owning It — What Korea Proves Is Possible for the Arab World');
  assert.equal(report.pdf, '/reports/reports/localization-doctrine-ar.pdf');
  assert.equal(report.pdfEn, '/reports/reports/localization-doctrine-en.pdf');
  assert.equal(report.pdfLang, 'ar');
  assert.equal(report.cover, '/reports/reports/localization-doctrine-cover.jpg');
  assert.ok(existsSync('public' + report.pdf), report.pdf);
  assert.ok(existsSync('public' + report.pdfEn), report.pdfEn);
  assert.ok(existsSync('public' + report.cover), report.cover);
  assert.equal(readFileSync(new URL('../public' + report.pdf, import.meta.url)).length, 1272683);
  assert.equal(readFileSync(new URL('../public' + report.pdfEn, import.meta.url)).length, 976919);
  for (const f of ['reports/reports/localization-doctrine/page.tsx']) for (const pre of ['app/', 'app/ar/']) assert.ok(existsSync(pre + f), pre + f);
  const lib = read('lib/research/localization-doctrine.ts');
  const page = read('components/insights/localization-doctrine.tsx');
  const catalog = read('components/insights/pages.tsx');
  assert.match(lib, /Ahmed Abdelalim, VisionSeek/);
  assert.doesNotMatch(lib, /Dr\. Ahmed Abdelalim|Dr\. Abdelalim/);
  assert.doesNotMatch(lib + page, /د\.\s*أحمد|Dr\.\s*Ahmed/);
  assert.match(lib, /\[مؤكد بمصدر #1\]/);
  assert.match(lib, /\[استنتاج\]/);
  assert.match(lib, /\[Verified #1\]/);
  assert.match(lib, /\[Inference\]/);
  assert.match(lib, /نطاق الإصدار ومصادره/);
  assert.match(lib, /Scope and sources/);
  assert.match(lib, /اقتراح VisionSeek، لا وصفٌ لكوريا/);
  assert.match(lib, /A VisionSeek proposal, not a description of Korea/);
  assert.match(lib, /so the two official sources differ/);
  assert.match(lib, /https:\/\/www\.spa\.gov\.sa\/1493540/);
  assert.doesNotMatch(lib, /lexismiddleeast/i);
  assert.match(page, /markClass/);
  assert.match(page, /download/);
  assert.match(page, /paper\.pdfAr/);
  assert.match(page, /paper\.pdfEn/);
  assert.match(page, /Download the report \(PDF\)/);
  assert.match(catalog, /pdfEn/);
  assert.equal((lib.match(/n: 31,/g) || []).length, 1);
  assert.match(lib, /https:\/\/www\.kaist\.ac\.kr\/en\/html\/kaist\/011701\.html/);
  assert.match(lib, /https:\/\/www\.pif\.gov\.sa\/en\/news-and-insights\/press-releases\/2025\/hrh-crown-prince-launches-humain-as-global-ai-powerhouse\//);
  assert.match(lib, /\$52\.7 billion/);
  assert.match(lib, /52\.7 مليار دولار/);
  assert.match(lib, /25%/);
  assert.match(lib, /75%/);
  assert.match(lib, /625\.3/);
  assert.match(lib, /14\.7%/);
  assert.match(lib, /86\.8/);
  assert.match(lib, /784 ألف لتر/);
  assert.match(lib, /784,000 litres/);
  assert.doesNotMatch(lib, /785/);
  assert.doesNotMatch(lib, /60\.5%|70\.5%|17\.3%/);
  assert.doesNotMatch(lib + page, /ولا تُنشر قبل موافقته|Not for publication without approval/);
  assert.doesNotMatch(lib + page, /مسودة|معاينة|DRAFT FOR REVIEW|\bPreview\b/);
  assert.match(read('scripts/insights/doctrine/doctrine-ar.html'), /DRAFT FOR REVIEW/);
  assert.match(read('scripts/insights/doctrine/doctrine-ar.html'), /url\(fonts\//);
  assert.ok(existsSync('scripts/insights/doctrine/fonts/IBMPlexSansArabic-Regular.ttf'));
  assert.ok(existsSync('scripts/insights/doctrine/assets/visionseek-chevron.png'));
  assert.ok(existsSync('scripts/insights/doctrine-v1.1/doctrine-ar-v1.1.html'));
  assert.ok(existsSync('scripts/insights/doctrine-v1.1/doctrine-en-v1.1.html'));
  assert.match(read('scripts/insights/doctrine-v1.1/doctrine-ar-v1.1.html'), /spa\.gov\.sa\/1493540/);
  assert.match(read('scripts/insights/doctrine-v1.1/doctrine-en-v1.1.md'), /A VisionSeek proposal, not a description of Korea/);
  assert.match(read('public/admin/config.yml'), /name: cover/);
  assert.match(read('public/admin/config.yml'), /name: pdfEn/);
  const nav = json('content/navigation.json').sections.map(s => s.path);
  assert.equal(nav[nav.indexOf('/reports') - 1], '/programs');
  assert.equal(nav[nav.indexOf('/reports') + 1], '/indices');
});

test('Insights: Reports Methodology v1.0 follows the doctrine pattern; source text and cross-links stay exact', () => {
  const d = json('content/insights.json');
  const report = d.reports.find(x => x.page === '/reports/reports/methodology');
  assert.ok(report);
  assert.equal(d.reports[0].page, '/reports/reports/methodology');
  assert.equal(report.title.ar, 'منهجية تقارير VisionSeek');
  assert.equal(report.title.en, 'VisionSeek Reports Methodology');
  assert.match(report.kind.ar, /الإصدار 1\.0/);
  assert.match(report.kind.en, /Version 1\.0/);
  assert.equal(report.cover, '/reports/reports/methodology-cover.jpg');
  assert.ok(existsSync('public' + report.cover), report.cover);
  assert.equal(report.pdf, undefined);
  assert.equal(report.related.href, '/reports/reports/localization-doctrine');
  for (const f of ['reports/reports/methodology/page.tsx']) for (const pre of ['app/', 'app/ar/']) assert.ok(existsSync(pre + f), pre + f);
  const lib = read('lib/research/reports-methodology.ts');
  const page = read('components/insights/reports-methodology.tsx');
  const doctrine = read('lib/research/localization-doctrine.ts');
  const doctrinePage = read('components/insights/localization-doctrine.tsx');
  assert.match(lib, /Ahmed Abdelalim/);
  assert.doesNotMatch(lib + page, /Dr\. Ahmed Abdelalim|Dr\. Abdelalim/);
  assert.match(lib, /أحمد عبدالعليم/);
  assert.doesNotMatch(lib, /v0\.1|الإصدار 0\.1|Version 0\.1/);
  assert.match(lib, /حقائق لا توجيهات/);
  assert.match(lib, /Facts, not directives/);
  assert.match(lib, /غير قابل للتقييم/);
  assert.match(lib, /Not assessable/);
  assert.match(lib, /https:\/\/www\.mckinsey\.com\/about-us\/new-at-mckinsey-blog\/how-the-mckinsey-global-institute-is-changing-the-way-we-think-about-work-gender-equality-and-more/);
  assert.match(lib, /https:\/\/www\.chathamhouse\.org\/about-us\/our-editorial-standards/);
  assert.match(lib, /https:\/\/www\.rand\.org\/about\/standards\.html/);
  assert.match(lib, /doctrineHref: '\/reports\/reports\/localization-doctrine'/);
  assert.match(page, /DoctrineLink/);
  assert.match(doctrine, /methodologyHref: '\/reports\/reports\/methodology'/);
  assert.match(doctrinePage, /paper\.methodologyHref/);
  assert.ok(existsSync('scripts/insights/methodology/methodology-v1.0-ar.md'));
  assert.ok(existsSync('scripts/insights/methodology/methodology-v1.0-en.md'));
  assert.match(read('scripts/insights/methodology/methodology-v1.0-ar.md'), /منهجية موحّدة لتقارير VisionSeek الاستراتيجية/);
  assert.match(read('scripts/insights/methodology/methodology-v1.0-en.md'), /VisionSeek Strategic Reports — Unified Methodology/);
});

test('Insights: Capability Ledger sits next to the doctrine; Arabic body, sources and marks stay exact', () => {
  const d = json('content/insights.json');
  const report = d.reports.find(x => x.page === '/reports/reports/capability-ledger');
  assert.ok(report);
  assert.equal(d.reports[2].page, '/reports/reports/capability-ledger');
  assert.equal(report.related.href, '/reports/reports/methodology');
  assert.equal(report.title.ar, 'سجل نقل القدرة: ماذا يبقى في الخليج بعد صفقات الذكاء الاصطناعي ومراكز البيانات؟');
  assert.equal(report.title.en, 'Capability Ledger');
  assert.match(report.kind.ar, /الإصدار 1/);
  assert.match(report.kind.en, /Edition 1/);
  assert.equal(report.pdf, '/reports/reports/capability-ledger-ar.pdf');
  assert.equal(report.pdfLang, 'ar');
  assert.equal(report.cover, '/reports/reports/capability-ledger-cover.jpg');
  assert.ok(existsSync('public' + report.pdf), report.pdf);
  assert.ok(existsSync('public' + report.cover), report.cover);
  assert.equal(readFileSync(new URL('../public' + report.pdf, import.meta.url)).length, 368697);
  for (const f of ['reports/reports/capability-ledger/page.tsx']) for (const pre of ['app/', 'app/ar/']) assert.ok(existsSync(pre + f), pre + f);
  const lib = read('lib/research/capability-ledger.ts');
  const page = read('components/insights/capability-ledger.tsx');
  assert.match(lib, /أحمد عبدالعليم/);
  assert.match(lib, /Ahmed Abdelalim/);
  assert.doesNotMatch(lib + page, /Dr\. Ahmed Abdelalim|Dr\. Abdelalim|د\.\s*أحمد/);
  assert.doesNotMatch(lib + page, /مسودة|معاينة|DRAFT FOR REVIEW|\bPreview\b/);
  assert.match(lib, /\[مؤكد بمصدر #1\]/);
  assert.match(lib, /\[استنتاج\]/);
  assert.match(lib, /\[ادعاء أطراف\]/);
  assert.match(lib, /نطاق الإصدار ومصادره/);
  assert.match(lib, /وثيقة مرافقة/);
  assert.equal((lib.match(/n: 25,/g) || []).length, 1);
  assert.match(lib, /HUMAIN–NVIDIA/);
  assert.match(lib, /HUMAIN–MIS/);
  assert.match(lib, /Microsoft–G42/);
  assert.match(lib, />689%/);
  assert.match(lib, /51%/);
  assert.match(lib, /https:\/\/investor\.nvidia\.com/);
  assert.match(lib, /https:\/\/www\.matchpoint-partners\.com\/our-insights\/saudi-sovereign-compute-jvs-governance-localisation-exit\.html/);
  assert.match(page, /lang="ar"/);
  assert.match(page, /dir="rtl"/);
  assert.match(page, /paper\.pdfAr/);
  assert.match(page, /localization-doctrine\.module\.css/);
  assert.ok(existsSync('scripts/insights/capability-ledger/report-ar-v1.0.html'));
  assert.ok(existsSync('scripts/insights/capability-ledger/report-ar-v1.0.pdf'));
});

test('Insights was renamed Reports: /insights 308s to /reports, leftover reports-center pages stay archived', () => {
  const redirects = read('next.config.ts');
  assert.match(redirects, /source: `\$\{prefix\}\/insights`, destination: `\$\{prefix\}\/reports`/);
  assert.match(redirects, /source: `\$\{prefix\}\/insights\/:path\*`/);
  assert.match(redirects, /destination: `\$\{prefix\}\/reports\/:path\*`/);
  assert.match(redirects, /source: `\$\{prefix\}\/insights\/research\/half-the-picture`, destination: `\$\{prefix\}\/reports\/reports\/half-the-picture`/);
  assert.match(redirects, /source: '\/insights\/research\/half-the-picture-ar\.pdf', destination: '\/reports\/reports\/half-the-picture-ar\.pdf'/);
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /path: "\/reports"/);
  assert.match(sitemap, /path: "\/ar\/reports"/);
  assert.doesNotMatch(sitemap, /["'`]\/(?:ar\/)?insights/);
  const config = read('public/admin/config.yml');
  assert.match(config, /preview_path: "ar\/reports"/);
  assert.match(config, /file: content\/insights\.json/);
  assert.match(config, /value: "\/reports"/);
  assert.doesNotMatch(config, /value: "\/insights"/);
  const archived = json('content/visibility.json').archived.map(a => a.path);
  assert.ok(!archived.includes('/reports'), 'the live Reports hub is not archived');
  for (const path of ['/reports/methodology', '/reports/agent-governance', '/reports/physical-ai']) {
    assert.ok(archived.includes(path), path);
  }
  const legal = read('components/legal-page.tsx');
  assert.match(legal, /"REPORTS"/);
  assert.match(legal, /"تقارير"/);
  assert.doesNotMatch(legal, /INSIGHTS|رؤى/);
});

test('the built Reports hub is native RTL and LTR and uses Reports / تقارير in the main nav', () => {
  const html = locale => readFileSync(new URL(`../.next/server/app/${locale === 'ar' ? 'ar/' : ''}reports.html`, import.meta.url), 'utf8');
  const en = html('en');
  const ar = html('ar');
  assert.match(en, /class="vs-site locale-en[^"]*" lang="en" dir="ltr"/);
  assert.match(ar, /class="vs-site locale-ar[^"]*" lang="ar" dir="rtl"/);
  assert.match(en, /<title>VisionSeek Reports<\/title>/);
  assert.match(ar, /<title>تقارير VisionSeek \| الفكرة قبل القرار<\/title>/);
  assert.match(en, /href="\/reports"[^>]*>Reports</);
  assert.match(ar, /href="\/ar\/reports"[^>]*>تقارير</);
  assert.doesNotMatch(en, />Insights</);
  assert.doesNotMatch(ar, />Insights</);
  assert.match(en, /VisionSeek Reports/);
  assert.match(en, /Insight before decision/);
  assert.match(ar, /الفكرة قبل القرار/);
});

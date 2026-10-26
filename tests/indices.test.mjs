import assert from 'node:assert/strict';
import {existsSync, readFileSync, statSync} from 'node:fs';
import test from 'node:test';

const url = f => new URL(`../${f}`, import.meta.url);
const read = f => readFileSync(url(f), 'utf8');
const data = JSON.parse(read('content/indices.json'));
const built = f => read(`.next/server/app/${f}.html`);
const isText = value => Boolean(value && typeof value.en === 'string' && typeof value.ar === 'string');
const forbiddenKeys = /^(score|scores|rank|ranking|rankings|chart|charts|value|values|resultValue|benchmark)$/i;
const forbiddenCopy = /ترتيب الدول|قائمة الدول بالقيم|country ranking|ranked first|top-ranked|Korea|كوريا|Incheon|إنتشون|\bDr\.?\b/i;
const colloquialAr = /مش |عايز| المؤشر ده|الصفحة دي|اللي |بتاع|مفيش|مافيش|لسه |هتتعلن|بيقيس|بنقيس|بتبيع|بتعلن|بيتنشر|بيتبنى|بيركّز|ومعاه|أي حد |بالظبط| وبس|تانية خالص|الاتنين|من غير /;
const hubTextKeys = [
  'eyebrow', 'title', 'thesis', 'intro', 'readMethodology', 'followEdition',
  'measuringBodyTitle', 'measuringBody', 'empty', 'catalogTitle', 'catalogIntro',
  'aboutProduct', 'ctaMethod', 'ctaPrinciples', 'ctaFollow', 'home', 'back',
  'mapTitle', 'mapIntro', 'mapPilotLabel', 'mapLaterLabel', 'measureTitle',
  'measureIntro', 'measureAtlasNote', 'ladderTitle', 'atlasScaleTitle',
  'evidenceScaleTitle', 'unitTitle', 'unitText', 'validityTitle', 'validityText',
  'downloadLabel', 'citeTitle', 'citeHow', 'releaseMethodology', 'releaseEdition',
  'previousEditionsTitle', 'principlesTitle', 'pressTitle', 'pressIntro',
  'downloadArLabel', 'downloadEnLabel', 'teamEmailLabel', 'relatedTitle',
  'relatedLine', 'reportsLabel', 'programsLabel', 'diagramTitle', 'diagramIntro',
  'diagramSourceName', 'diagramSourceRole', 'diagramFeeds', 'diagramIndexName',
  'diagramIndexRole', 'diagramListRole', 'technologiesTitle', 'questionLabel',
  'unitLabel', 'outputLabel', 'cadenceLabel', 'statusFieldLabel',
  'methodologyLabel', 'methodologyName',
];
const productTextKeys = ['title', 'definition', 'question', 'unit', 'output', 'cadence', 'status'];

function walk(node, path, visit) {
  if (Array.isArray(node)) node.forEach((item, i) => walk(item, `${path}[${i}]`, visit));
  else if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      visit(key, value, `${path}.${key}`);
      walk(value, `${path}.${key}`, visit);
    }
  }
}

test('Indices hub: eight sections, thesis, map, method, no product-page copy', () => {
  for (const key of hubTextKeys) assert.ok(isText(data.hub[key]), `hub.${key}`);
  assert.equal(typeof data.hub.methodologyHref, 'string');
  assert.equal(data.hub.methodologyHref, '/reports/reports/methodology');
  assert.equal(data.hub.reportsHref, '/reports');
  assert.equal(data.hub.programsHref, '/programs');
  assert.equal(data.hub.showPreviousEditions, false);
  assert.equal(data.hub.thesis.ar, 'نقيس ما تملكه الدول العربية من قدرات تقنية، لا ما تستخدمه.');
  assert.equal(data.hub.thesis.en, 'Measuring the technology capabilities Arab states own — not just use.');
  assert.equal(data.hub.intro.ar, 'ثلاثة منتجات قياس، منهجية منشورة، أدلة من مصادر عامة.');
  assert.equal(data.hub.releaseMethodology.ar, 'المنهجية: الأطلس v0.3 (مجمّدة للتجربة)');
  assert.equal(data.hub.releaseEdition.ar, 'الإصدار الأول: قيد البناء');
  assert.match(data.hub.releaseMethodology.en, /Atlas v0\.3/);
  assert.match(data.hub.releaseEdition.en, /under construction/i);
  assert.doesNotMatch(data.hub.releaseMethodology.en + data.hub.releaseEdition.en + data.hub.releaseMethodology.ar + data.hub.releaseEdition.ar, /20\d\d|April|أبريل|October|أكتوبر/);
  assert.equal(data.hub.unitText.en, 'Entity × sub-domain.');
  assert.equal(data.hub.unitText.ar, 'جهة × مجال فرعي.');
  assert.match(data.hub.validityText.en, /one year/);
  assert.match(data.hub.validityText.en, /60 days/);
  assert.match(data.hub.validityText.ar, /سنة/);
  assert.match(data.hub.validityText.ar, /ستين يوم/);
  assert.equal(data.hub.ladder.length, 5);
  assert.deepEqual(data.hub.ladder.map(r => r.id), ['use', 'assemble', 'adapt', 'design', 'export']);
  assert.equal(data.hub.atlasScale.length, 5);
  assert.deepEqual(data.hub.atlasScale.map(r => r.code), ['R0', 'R1', 'R2', 'R3', 'R4']);
  assert.equal(data.hub.evidenceScale.length, 5);
  assert.deepEqual(data.hub.evidenceScale.map(r => r.code), ['E0', 'E1', 'E2', 'E3', 'E4']);
  assert.ok(!('openIndex' in data.hub), 'no Open button label');
  assert.equal(data.hub.principles.length, 3);
  assert.deepEqual(data.hub.principles.map(p => p.id), ['own', 'method', 'independent']);
  for (const principle of data.hub.principles) {
    assert.ok(principle.id && isText(principle.title) && isText(principle.text), principle.id);
  }
  assert.ok(Array.isArray(data.products) && data.products.length === 3);
  assert.deepEqual(data.products.map(p => p.id), ['atlas', 'index', 'companies']);
  assert.deepEqual(data.products.map(p => p.named), [true, true, false]);
  assert.deepEqual(data.products.map(p => p.cta), ['method', 'principles', 'follow']);
  assert.deepEqual(data.products.map(p => p.slug), [
    'arab-critical-capabilities-atlas',
    'arab-technology-capability',
    '',
  ]);
  assert.equal(data.products[0].title.en, 'Arab Critical Capabilities Atlas');
  assert.equal(data.products[0].title.ar, 'أطلس القدرات العربية الحرجة');
  assert.equal(data.products[1].title.en, 'Arab Technology Capability Index');
  assert.equal(data.products[1].title.ar, 'مؤشر القدرة التكنولوجية العربية');
  assert.equal(data.products[2].title.en, 'Company list');
  assert.equal(data.products[2].title.ar, 'قائمة الشركات');
  assert.match(data.products[0].unit.en, /Entity/i);
  assert.match(data.products[0].unit.en, /sub-domain/i);
  assert.match(data.products[0].output.en, /Documented records/i);
  assert.match(data.products[0].cadence.en, /Continuous/i);
  assert.match(data.products[1].unit.en, /Country/i);
  assert.match(data.products[1].output.en, /Ownership Ladder/);
  assert.match(data.products[1].cadence.en, /Annual/i);
  assert.match(data.products[2].unit.en, /company/i);
  assert.match(data.products[2].output.en, /100/);
  assert.match(data.products[2].cadence.en, /Annual/i);
  assert.match(data.products[0].status.ar, /قيد البناء/);
  assert.match(data.products[1].status.en, /In preparation/);
  assert.match(data.products[1].status.ar, /قيد الإعداد/);
  assert.match(data.products[2].status.ar, /قيد الإعداد/);
  assert.doesNotMatch(data.products[1].status.en + data.products[1].status.ar, /2027|April|أبريل|pilot|تجريبي/i);
  for (const item of data.products) {
    for (const key of productTextKeys) assert.ok(isText(item[key]), `${item.id}.${key}`);
    assert.equal(typeof item.named, 'boolean', item.id);
    assert.equal(typeof item.slug, 'string', item.id);
    assert.doesNotMatch(item.status.ar, /لم يبدأ القياس|قريبًا|للأسف|لم يتوفر/);
    assert.doesNotMatch(item.status.en, /coming soon|has not begun|unfortunately/i);
    assert.doesNotMatch(item.title.en + item.title.ar, /AI\s*100|ai100/i);
  }
});

test('Indices: bilingual prospectus, no scores or rankings, Ahmed Abdelalim without Dr.', () => {
  assert.match(data.notify.email, /^abdelalim@visionseek\.org$/);
  assert.ok(isText(data.notify.label) && isText(data.notify.hint) && isText(data.notify.subject));
  assert.match(data.notify.label.en, /Ahmed Abdelalim|Follow the first edition/);
  assert.doesNotMatch(data.notify.label.en, /\bDr\.?\b/);
  assert.ok(Array.isArray(data.indices) && data.indices.length >= 2);
  assert.equal(data.indices[0].slug, 'arab-technology-capability');
  assert.equal(data.indices[0].status, 'upcoming');
  assert.equal(data.indices[0].title.ar, 'مؤشر القدرة التكنولوجية العربية');
  assert.equal(data.indices[0].title.en, 'Arab Technology Capability Index');
  assert.equal(data.indices[0].shortTitle.ar, data.indices[0].title.ar);
  assert.equal(data.indices[0].shortTitle.en, data.indices[0].title.en);
  assert.equal(data.indices[0].statusLabel.ar, 'قيد الإعداد');
  assert.equal(data.indices[0].statusLabel.en, 'In preparation');
  assert.equal(data.indices[0].subtitle.ar, 'التقنيات السبع الأساسية — الامتلاك والتوطين');
  assert.equal(data.indices[0].subtitle.en, 'Seven Core Technologies — Ownership & Localization');
  assert.match(data.indices[0].heroImage, /^\/indices\/.+\.(jpg|jpeg|webp)$/);
  assert.ok(existsSync(url(`public${data.indices[0].heroImage}`)), data.indices[0].heroImage);
  assert.equal(data.indices[0].pillars.length, 7);
  assert.deepEqual(data.indices[0].pillars.map(p => p.id), ['chips', 'ai', 'cloud', 'networks', 'robotics', 'energy', 'biotech']);
  assert.equal(data.indices[0].pillars.find(p => p.id === 'networks').name.en, 'Next-generation networks 5G-6G');
  assert.equal(data.indices[0].pillars.find(p => p.id === 'networks').name.ar, 'شبكات الجيل التالي 5G-6G');
  assert.equal(data.indices[0].principles.length, 1);
  assert.deepEqual(data.indices[0].principles.map(p => p.id), ['annual']);
  assert.doesNotMatch(data.indices[0].pilot.ar, /إصدار تجريبي يركّز على الذكاء الاصطناعي/);
  assert.doesNotMatch(data.indices[0].pilot.en, /pilot edition focused on artificial intelligence/i);
  assert.equal(data.indices[1].slug, 'arab-critical-capabilities-atlas');
  assert.equal(data.indices[1].status, 'upcoming');
  assert.equal(data.indices[1].title.ar, 'أطلس القدرات العربية الحرجة');
  assert.equal(data.indices[1].title.en, 'Arab Critical Capabilities Atlas');
  assert.equal(data.indices[1].shortTitle.ar, data.indices[1].title.ar);
  assert.equal(data.indices[1].shortTitle.en, data.indices[1].title.en);
  assert.match(data.indices[1].statusLabel.ar, /قيد البناء/);
  assert.match(data.indices[1].statusLabel.en, /Under construction/);
  assert.equal(data.indices[1].pillars.length, 4);
  assert.deepEqual(data.indices[1].pillars.map(p => p.id), ['explore', 'profiles', 'gaps', 'sources']);
  assert.equal(data.indices[1].principles.length, 3);
  assert.deepEqual(data.indices[1].principles.map(p => p.id), ['open', 'source', 'correctable']);
  assert.doesNotMatch(data.indices[1].results.en, /symbolic/i);
  assert.doesNotMatch(data.indices[1].results.ar, /رمزية/);
  assert.match(data.indices[1].heroImage, /^\/indices\/.+\.svg$/);
  const atlasSvg = read(`public${data.indices[1].heroImage}`);
  assert.doesNotMatch(atlasSvg, /<text[\s>]/i);
  assert.doesNotMatch(atlasSvg, /Atllas|Arabb|Comingsoon|Coming soon|قريب|أطلس|Atlas/i);
  assert.ok(statSync(url(`public${data.indices[1].heroImage}`)).size < 40_000, 'atlas svg stays small');
  for (const item of data.indices) {
    assert.match(item.slug, /^[a-z0-9-]+$/);
    assert.ok(['upcoming', 'published'].includes(item.status), item.slug);
    for (const key of ['statusLabel', 'title', 'shortTitle', 'subtitle', 'heroAlt', 'lede', 'measuresTitle', 'measures', 'pillarsTitle', 'pillarsIntro', 'principlesTitle', 'methodologyTitle', 'methodology', 'pilotTitle', 'pilot', 'audienceTitle', 'audience', 'resultsTitle', 'results']) {
      assert.ok(isText(item[key]), `${item.slug}.${key}`);
    }
    assert.match(item.heroImage, /^\/indices\/.+\.(jpg|jpeg|webp|svg)$/, item.slug);
    assert.ok(existsSync(url(`public${item.heroImage}`)), item.heroImage);
    assert.ok(item.pillars.length >= 1, item.slug);
    for (const pillar of item.pillars) {
      assert.ok(pillar.id && isText(pillar.name), `${item.slug}.${pillar.id}`);
      assert.equal(Object.keys(pillar).sort().join(','), 'id,name');
    }
    assert.ok(item.principles.length >= 1, item.slug);
    for (const principle of item.principles) {
      assert.ok(principle.id && isText(principle.title) && isText(principle.text), `${item.slug}.${principle.id}`);
    }
    assert.match(item.methodology.ar + item.methodology.en, /VisionSeek Reports Methodology 1\.0|منهجية تقارير VisionSeek 1\.0/);
    assert.doesNotMatch(item.pillarsIntro.ar, /لم يبدأ القياس|لم يُفتح/);
    assert.doesNotMatch(item.title.en + item.lede.en + item.pilot.en, /\bDr\.?\b/);
  }
  walk(data, 'indices', (key, value, path) => {
    assert.equal(forbiddenKeys.test(key), false, `forbidden field ${path}`);
    if (typeof value === 'string') {
      assert.doesNotMatch(value, forbiddenCopy, path);
      if (key === 'ar' || path.endsWith('.ar')) assert.doesNotMatch(value, colloquialAr, path);
    }
  });
  const blob = JSON.stringify(data);
  assert.doesNotMatch(blob, /Stanford|شراكة|شريك رسمي|partnership|endorsed by/i);
  assert.doesNotMatch(blob, /VTO|2036|2027|أبريل|April/);
  assert.doesNotMatch(blob, /AI\s*100|ai100|آي\s*100/i);
  assert.doesNotMatch(blob, /لم يبدأ القياس|Pilot edition coming soon|الإصدار التجريبي قريبًا|إصدار تجريبي يركّز/);
  assert.match(read('components/indices/pages.tsx'), /from 'next\/image'/);
  assert.match(read('components/indices/pages.tsx'), /maxWidth: 1280/);
  assert.match(read('components/indices/pages.tsx'), /maxHeight: 480/);
  assert.match(read('components/indices/pages.tsx'), /unoptimized=\{svg\}|unoptimized=\{item\.heroImage\.endsWith\('\.svg'\)\}/);
  assert.match(read('components/indices/pages.tsx'), /liveHubProducts/);
  assert.match(read('components/indices/pages.tsx'), /CoverageMap/);
  assert.match(read('components/indices/pages.tsx'), /RelationshipDiagram|diagramFlow/);
  assert.doesNotMatch(read('components/indices/pages.tsx'), /padStart|styles\.num|<form/i);
  assert.doesNotMatch(read('components/indices/pages.tsx'), /list\.map\(item => <IndexArticle/);
  assert.match(read('lib/indices-map.ts'), /PILOT_IDS/);
  assert.match(read('components/indices/coverage-map.tsx'), /Egypt and the six Gulf states/);
});

test('Indices: own pages in both languages, sitemap and /admin, in the header after Research', () => {
  for (const f of ['app/indices/page.tsx', 'app/ar/indices/page.tsx', 'app/indices/[slug]/page.tsx', 'app/ar/indices/[slug]/page.tsx']) {
    assert.ok(existsSync(url(f)), f);
  }
  const nav = JSON.parse(read('content/navigation.json'));
  const paths = nav.sections.map(s => s.path);
  const item = nav.sections.find(s => s.path === '/indices');
  assert.ok(item, 'Indices belongs in the header after Ahmed approved the live page');
  assert.equal(item.en, 'Indices');
  assert.equal(item.ar, 'المؤشرات');
  assert.equal(item.children[0].en, 'VisionSeek Indices');
  assert.equal(item.children[1].en, 'Arab Technology Capability Index');
  assert.equal(item.children[2].en, 'Arab Critical Capabilities Atlas');
  assert.equal(paths[paths.indexOf('/reports') + 1], '/research');
  assert.equal(paths[paths.indexOf('/research') + 1], '/indices');
  assert.deepEqual(item.children.map(c => c.href), [
    '/indices',
    '/indices/arab-technology-capability',
    '/indices/arab-critical-capabilities-atlas',
  ]);
  assert.match(read('app/sitemap.ts'), /'\/indices'/);
  assert.match(read('public/admin/config.yml'), /value: "\/indices"/);
  assert.match(read('public/admin/config.yml'), /value: "\/indices\/arab-critical-capabilities-atlas"/);
  assert.match(read('public/admin/config.yml'), /file: content\/indices\.json/);
  assert.match(read('public/admin/config.yml'), /name: heroImage/);
  assert.match(read('public/admin/config.yml'), /name: principles/);
  assert.match(read('public/admin/config.yml'), /name: products/);
  assert.match(read('public/admin/config.yml'), /name: aboutProduct/);
  assert.match(read('public/admin/config.yml'), /name: methodologyHref/);
  assert.match(read('public/admin/config.yml'), /name: thesis/);
  assert.match(read('public/admin/config.yml'), /name: atlasScale/);
  assert.match(read('public/admin/config.yml'), /name: evidenceScale/);
  assert.match(read('public/admin/config.yml'), /name: releaseMethodology/);
  assert.doesNotMatch(read('public/admin/config.yml'), /name: openIndex/);
  assert.match(read('scripts/archive-options.py'), /add\('\/indices'/);
});

test('Indices: built hub stays a hub; product routes keep working', () => {
  if (!existsSync(url('.next/server/app/indices.html'))) return;
  const en = built('indices');
  const ar = built('ar/indices');
  const enSlug = built('indices/arab-technology-capability');
  const arSlug = built('ar/indices/arab-technology-capability');
  const enAtlas = built('indices/arab-critical-capabilities-atlas');
  const arAtlas = built('ar/indices/arab-critical-capabilities-atlas');
  const mainOf = html => {
    const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
    assert.ok(match, 'main');
    return match[1];
  };
  for (const html of [en, ar, enSlug, arSlug, enAtlas, arAtlas]) {
    const main = mainOf(html);
    assert.doesNotMatch(main, /<svg[^>]*(chart|bar|plot)/i);
    assert.doesNotMatch(main, /score="|ranking=|data-score/);
    assert.doesNotMatch(main, /<form[\s>]/i);
    assert.doesNotMatch(main, /Korea|كوريا|Incheon|إنتشون|AI 100|ai100/i);
    assert.doesNotMatch(main, /لم يبدأ القياس|Pilot edition coming soon|الإصدار التجريبي/);
  }
  const enMain = mainOf(en);
  const arMain = mainOf(ar);
  assert.match(enMain, /Measuring the technology capabilities Arab states own/);
  assert.match(enMain, /First-edition pilot scope/);
  assert.match(enMain, /How we measure/);
  assert.match(enMain, /Atlas scale R0–R4|Atlas scale R0-R4|R0/);
  assert.match(enMain, /E0/);
  assert.match(enMain, /Entity × sub-domain/);
  assert.match(enMain, /60 days/);
  assert.match(enMain, /Atlas v0\.3/);
  assert.match(enMain, /First edition: under construction/);
  assert.match(enMain, /For researchers and the press/);
  assert.match(enMain, /\/reports/);
  assert.match(enMain, /\/programs/);
  assert.match(enMain, /Company list/);
  assert.match(enMain, /Arab Critical Capabilities Atlas/);
  assert.match(enMain, /Arab Technology Capability Index/);
  assert.match(enMain, /Next-generation networks 5G-6G/);
  assert.match(enMain, /\/reports\/reports\/methodology/);
  assert.doesNotMatch(enMain, />Open</);
  assert.doesNotMatch(enMain, /What the index is|What the atlas is/);
  assert.doesNotMatch(en, /Dr\. Ahmed/);
  assert.match(arMain, /نقيس ما تملكه الدول العربية من قدرات تقنية، لا ما تستخدمه/);
  assert.match(arMain, /كيف نقيس/);
  assert.match(arMain, /سلّم الامتلاك/);
  assert.match(arMain, /جهة × مجال فرعي/);
  assert.match(arMain, /المنهجية: الأطلس v0\.3/);
  assert.match(arMain, /الإصدار الأول: قيد البناء/);
  assert.match(arMain, /قائمة الشركات/);
  assert.match(arMain, /مؤشر القدرة التكنولوجية العربية/);
  assert.match(arMain, /أطلس القدرات العربية الحرجة/);
  assert.match(arMain, /شبكات الجيل التالي 5G-6G/);
  assert.match(arMain, /\/ar\/reports\/reports\/methodology/);
  assert.match(arMain, /\/ar\/reports/);
  assert.match(arMain, /\/ar\/programs/);
  assert.doesNotMatch(arMain, />افتح</);
  assert.doesNotMatch(arMain, /ما هو المؤشر|ما هو الأطلس/);
  assert.doesNotMatch(arMain, colloquialAr);
  assert.match(ar, /dir="rtl"/);
  assert.match(enSlug, /Arab Technology Capability Index/);
  assert.match(enSlug, /Key visual for the Arab Technology Capability Index/);
  assert.match(enSlug, /mailto:abdelalim@visionseek\.org/);
  assert.match(arSlug, /الرسم المفتاحي لمؤشر القدرة التكنولوجية العربية/);
  assert.match(arSlug, /التقنيات السبع المشمولة/);
  assert.match(arSlug, /منهجية تقارير VisionSeek 1\.0/);
  assert.doesNotMatch(arSlug, /إصدار تجريبي يركّز على الذكاء الاصطناعي/);
  assert.match(enAtlas, /Under construction/);
  assert.match(enAtlas, /Key visual for the Arab Critical Capabilities Atlas/);
  assert.match(enAtlas, /arab-critical-capabilities-atlas\.svg/);
  assert.doesNotMatch(enAtlas, /arab-critical-capabilities-atlas\.jpg/);
  assert.doesNotMatch(mainOf(enAtlas), /Atllas|Arabb|Comingsoon/);
  assert.match(arAtlas, /ما هو الأطلس/);
  assert.match(arAtlas, /الرسم المفتاحي لأطلس القدرات العربية الحرجة/);
  assert.match(arAtlas, /أبواب الاستكشاف/);
  assert.match(arAtlas, /arab-critical-capabilities-atlas\.svg/);
});

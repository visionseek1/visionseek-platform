import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const url = f => new URL(`../${f}`, import.meta.url);
const read = f => readFileSync(url(f), 'utf8');
const data = JSON.parse(read('content/indices.json'));
const built = f => read(`.next/server/app/${f}.html`);
const isText = value => Boolean(value && typeof value.en === 'string' && typeof value.ar === 'string');
const forbiddenKeys = /^(score|scores|rank|ranking|rankings|chart|charts|value|values|resultValue|benchmark)$/i;
const forbiddenCopy = /ترتيب الدول|قائمة الدول بالقيم|country ranking|ranked first|top-ranked|Korea|كوريا|Incheon|إنتشون|5G|6G|\bDr\.?\b/i;
const colloquialAr = /مش |عايز| المؤشر ده|الصفحة دي|اللي |بتاع|مفيش|مافيش|لسه |هتتعلن|بيقيس|بنقيس|بتبيع|بتعلن|بيتنشر|بيتبنى|بيركّز|ومعاه|أي حد |بالظبط| وبس|تانية خالص|الاتنين|من غير /;

function walk(node, path, visit) {
  if (Array.isArray(node)) node.forEach((item, i) => walk(item, `${path}[${i}]`, visit));
  else if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      visit(key, value, `${path}.${key}`);
      walk(value, `${path}.${key}`, visit);
    }
  }
}

test('Indices: bilingual prospectus, no scores or rankings, Ahmed Abdelalim without Dr.', () => {
  for (const key of Object.keys(data.hub)) assert.ok(isText(data.hub[key]), `hub.${key}`);
  assert.match(data.notify.email, /^abdelalim@visionseek\.org$/);
  assert.ok(isText(data.notify.label) && isText(data.notify.hint) && isText(data.notify.subject));
  assert.match(data.notify.label.en, /Ahmed Abdelalim/);
  assert.doesNotMatch(data.notify.label.en, /\bDr\.?\b/);
  assert.ok(Array.isArray(data.indices) && data.indices.length >= 1);
  assert.equal(data.indices[0].slug, 'arab-technology-capability');
  assert.equal(data.indices[0].status, 'upcoming');
  assert.equal(data.indices[0].title.ar, 'مؤشر القدرة التكنولوجية العربية');
  assert.equal(data.indices[0].title.en, 'Arab Technology Capability Index');
  assert.equal(data.indices[0].statusLabel.ar, 'الإصدار التجريبي قريبًا');
  assert.equal(data.indices[0].statusLabel.en, 'Pilot edition coming soon');
  assert.equal(data.indices[0].subtitle.ar, 'التكنولوجيات السبعة الأساسية — الامتلاك والتوطين');
  assert.equal(data.indices[0].subtitle.en, 'Seven Core Technologies — Ownership & Localization');
  assert.match(data.indices[0].heroImage, /^\/indices\/.+\.(jpg|jpeg|webp)$/);
  assert.ok(existsSync(url(`public${data.indices[0].heroImage}`)), data.indices[0].heroImage);
  assert.equal(data.indices[0].pillars.length, 7);
  assert.deepEqual(data.indices[0].pillars.map(p => p.id), ['chips', 'ai', 'cloud', 'networks', 'robotics', 'energy', 'biotech']);
  assert.equal(data.indices[0].principles.length, 4);
  assert.deepEqual(data.indices[0].principles.map(p => p.id), ['own', 'method', 'independent', 'annual']);
  for (const item of data.indices) {
    assert.match(item.slug, /^[a-z0-9-]+$/);
    assert.ok(['upcoming', 'published'].includes(item.status), item.slug);
    for (const key of ['statusLabel', 'title', 'shortTitle', 'subtitle', 'heroAlt', 'lede', 'measuresTitle', 'measures', 'pillarsTitle', 'pillarsIntro', 'principlesTitle', 'methodologyTitle', 'methodology', 'pilotTitle', 'pilot', 'audienceTitle', 'audience', 'resultsTitle', 'results']) {
      assert.ok(isText(item[key]), `${item.slug}.${key}`);
    }
    assert.match(item.heroImage, /^\/indices\/.+\.(jpg|jpeg|webp)$/, item.slug);
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
    assert.match(item.methodology.ar, /ستُنشر|سيتم نشر|تُنشر/);
    assert.match(item.methodology.en, /will be published/i);
    assert.match(item.results.ar, /لا توجد نتائج بعد/);
    assert.match(item.results.en, /No results yet/);
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
  assert.match(read('components/indices/pages.tsx'), /from 'next\/image'/);
  assert.doesNotMatch(read('components/indices/pages.tsx'), /padStart|styles\.num|<form/i);
});

test('Indices: own pages in both languages, sitemap and /admin, in the header after Insights', () => {
  for (const f of ['app/indices/page.tsx', 'app/ar/indices/page.tsx', 'app/indices/[slug]/page.tsx', 'app/ar/indices/[slug]/page.tsx']) {
    assert.ok(existsSync(url(f)), f);
  }
  const nav = JSON.parse(read('content/navigation.json'));
  const paths = nav.sections.map(s => s.path);
  const item = nav.sections.find(s => s.path === '/indices');
  assert.ok(item, 'Indices belongs in the header after Ahmed approved the live page');
  assert.equal(item.en, 'Indices');
  assert.equal(item.ar, 'المؤشرات');
  assert.equal(paths[paths.indexOf('/insights') + 1], '/indices');
  assert.match(read('app/sitemap.ts'), /'\/indices'/);
  assert.match(read('public/admin/config.yml'), /value: "\/indices"/);
  assert.match(read('public/admin/config.yml'), /file: content\/indices\.json/);
  assert.match(read('public/admin/config.yml'), /name: heroImage/);
  assert.match(read('public/admin/config.yml'), /name: principles/);
  assert.match(read('scripts/archive-options.py'), /add\('\/indices'/);
});

test('Indices: built pages stay empty of results and keep the pilot line', () => {
  if (!existsSync(url('.next/server/app/indices.html'))) return;
  const en = built('indices');
  const ar = built('ar/indices');
  const enSlug = built('indices/arab-technology-capability');
  const arSlug = built('ar/indices/arab-technology-capability');
  const mainOf = html => {
    const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
    assert.ok(match, 'main');
    return match[1];
  };
  for (const html of [en, ar, enSlug, arSlug]) {
    const main = mainOf(html);
    assert.doesNotMatch(main, /<svg[^>]*(chart|bar|plot)/i);
    assert.doesNotMatch(main, /score="|ranking=|data-score/);
    assert.doesNotMatch(main, /<form[\s>]/i);
    assert.doesNotMatch(main, /Korea|كوريا|Incheon|إنتشون/);
  }
  assert.match(en, /Pilot edition coming soon/);
  assert.match(en, /Ahmed Abdelalim/);
  assert.doesNotMatch(en, /Dr\. Ahmed/);
  assert.match(en, /mailto:abdelalim@visionseek\.org/);
  assert.match(en, /Key visual for the Arab Technology Capability Index/);
  assert.match(ar, /الإصدار التجريبي قريبًا/);
  assert.match(ar, /مؤشر القدرة التكنولوجية العربية/);
  assert.match(ar, /لا توجد نتائج بعد/);
  assert.match(ar, /dir="rtl"/);
  assert.match(ar, /الامتلاك لا الاستخدام/);
  assert.doesNotMatch(mainOf(ar), colloquialAr);
  assert.match(enSlug, /Arab Technology Capability Index/);
  assert.match(arSlug, /المنهجية ستُنشر/);
  assert.match(arSlug, /الرسم المفتاحي لمؤشر القدرة التكنولوجية العربية/);
});

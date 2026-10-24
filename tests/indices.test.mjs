import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const url = f => new URL(`../${f}`, import.meta.url);
const read = f => readFileSync(url(f), 'utf8');
const data = JSON.parse(read('content/indices.json'));
const built = f => read(`.next/server/app/${f}.html`);
const isText = value => Boolean(value && typeof value.en === 'string' && typeof value.ar === 'string');
const forbiddenKeys = /^(score|scores|rank|ranking|rankings|chart|charts|value|values|resultValue)$/i;
const forbiddenCopy = /ترتيب الدول|قائمة الدول بالقيم|country ranking|ranked first|top-ranked/i;

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
  assert.equal(data.indices[0].pillars.length, 7);
  assert.deepEqual(data.indices[0].pillars.map(p => p.id), ['chips', 'ai', 'cloud', 'networks', 'robotics', 'energy', 'biotech']);
  for (const item of data.indices) {
    assert.match(item.slug, /^[a-z0-9-]+$/);
    assert.ok(['upcoming', 'published'].includes(item.status), item.slug);
    for (const key of ['statusLabel', 'title', 'shortTitle', 'lede', 'measuresTitle', 'measures', 'pillarsTitle', 'pillarsIntro', 'benchmarkTitle', 'benchmark', 'methodologyTitle', 'methodology', 'pilotTitle', 'pilot', 'resultsTitle', 'results']) {
      assert.ok(isText(item[key]), `${item.slug}.${key}`);
    }
    assert.ok(item.pillars.length >= 1, item.slug);
    for (const pillar of item.pillars) {
      assert.ok(pillar.id && isText(pillar.name), `${item.slug}.${pillar.id}`);
      assert.equal(Object.keys(pillar).sort().join(','), 'id,name');
    }
    assert.match(item.methodology.ar, /ستُنشر|سيتم نشر|تُنشر/);
    assert.match(item.methodology.en, /will be published/i);
    assert.match(item.results.ar, /لا توجد نتائج بعد/);
    assert.match(item.results.en, /No results yet/);
    assert.doesNotMatch(item.title.en + item.lede.en + item.pilot.en, /\bDr\.?\b/);
  }
  walk(data, 'indices', (key, value, path) => {
    assert.equal(forbiddenKeys.test(key), false, `forbidden field ${path}`);
    if (typeof value === 'string') assert.doesNotMatch(value, forbiddenCopy, path);
  });
  const blob = JSON.stringify(data);
  assert.doesNotMatch(blob, /Stanford|شراكة|شريك رسمي|partnership|endorsed by/i);
  assert.doesNotMatch(blob, /VTO|2036/);
});

test('Indices: own pages in both languages, sitemap and /admin, not in the header yet', () => {
  for (const f of ['app/indices/page.tsx', 'app/ar/indices/page.tsx', 'app/indices/[slug]/page.tsx', 'app/ar/indices/[slug]/page.tsx']) {
    assert.ok(existsSync(url(f)), f);
  }
  const nav = JSON.parse(read('content/navigation.json'));
  assert.equal(nav.sections.some(s => s.path === '/indices'), false, 'do not add a nav item before Ahmed approves');
  assert.match(read('app/sitemap.ts'), /'\/indices'/);
  assert.match(read('public/admin/config.yml'), /value: "\/indices"/);
  assert.match(read('public/admin/config.yml'), /file: content\/indices\.json/);
  assert.match(read('scripts/archive-options.py'), /add\('\/indices'/);
});

test('Indices: built pages stay empty of results and keep the pilot line', () => {
  if (!existsSync(url('.next/server/app/indices.html'))) return;
  const en = built('indices');
  const ar = built('ar/indices');
  const enSlug = built('indices/arab-technology-capability');
  const arSlug = built('ar/indices/arab-technology-capability');
  for (const html of [en, ar, enSlug, arSlug]) {
    assert.doesNotMatch(html, /<svg[^>]*(chart|bar|plot)/i);
    assert.doesNotMatch(html, /score="|ranking=|data-score/);
  }
  assert.match(en, /Pilot edition coming soon/);
  assert.match(en, /Ahmed Abdelalim/);
  assert.doesNotMatch(en, /Dr\. Ahmed/);
  assert.match(en, /mailto:abdelalim@visionseek\.org/);
  assert.match(ar, /الإصدار التجريبي قريبًا/);
  assert.match(ar, /مؤشر القدرة التكنولوجية العربية/);
  assert.match(ar, /لا توجد نتائج بعد/);
  assert.match(ar, /dir="rtl"/);
  assert.match(enSlug, /Arab Technology Capability Index/);
  assert.match(arSlug, /المنهجية ستُنشر/);
});

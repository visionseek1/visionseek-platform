import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import test from 'node:test';

const read = f => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
const json = f => JSON.parse(read(f));

const GATE_FILES = [
  'lib/korea-gate.ts',
  'lib/korea-gate-documents.ts',
  'components/korea-gate/hub.tsx',
  'components/korea-gate/document.tsx',
  'components/korea-gate/request-form.tsx',
  'app/korea-gate/page.tsx',
  'app/ar/korea-gate/page.tsx',
];

const FORBIDDEN = /اعتماد|شهادة|ناين ستار|Nine Star|يحتاج تحقق|مؤجل لحين|تخليص جمركي/;
const COLLOQUIAL_AR = /مش |مفيش|مافيش|عايز|بتاع|اللي |إزاي|ازاي|امتى|دلوقتي|عشان|كمان|منغير|ولا لأ|العربيات|حاجة تانية|ندوّر|يستاهل|معاك|لقيناه|فاضية|يقدروا|لوحدها|هترد|هتدفع|هتتواصل|بتتأكد|بيرد|بنتفق|بتعمل|لأ\.|الصفحة دي|من غير ما |من غير |نجيبها|محتاج |قول ل|كلّمنا|نرجع لك|يتقاس|يتكتب/;

test('Korea Gate: canonical routes, 308 from the old hub, logo in public', () => {
  for (const f of [
    'app/korea-gate/page.tsx', 'app/ar/korea-gate/page.tsx',
    'app/korea-gate/studies/[slug]/page.tsx', 'app/ar/korea-gate/studies/[slug]/page.tsx',
    'app/korea-gate/samples/[slug]/page.tsx', 'app/ar/korea-gate/samples/[slug]/page.tsx',
    'public/korea-gate-logo.webp', 'public/korea-gate-logo.png',
  ]) assert.ok(existsSync(new URL(`../${f}`, import.meta.url)), f);
  const redirects = read('next.config.ts');
  assert.match(redirects, /source: `\$\{prefix\}\/korean-solutions`, destination: `\$\{prefix\}\/korea-gate`, permanent: true/);
  assert.match(read('app/korean-solutions/page.tsx'), /permanentRedirect\('\/korea-gate'\)/);
  assert.match(read('app/ar/korean-solutions/page.tsx'), /permanentRedirect\('\/ar\/korea-gate'\)/);
  assert.match(read('app/sitemap.ts'), /path: '\/korea-gate'/);
  assert.match(read('public/admin/config.yml'), /value: "\/korea-gate"/);
});

test('Korea Gate: nav item renamed in the same first position', () => {
  const nav = json('content/navigation.json').sections[0];
  assert.equal(nav.path, '/korea-gate');
  assert.equal(nav.ar, 'بوابة كوريا');
  assert.equal(nav.en, 'Korea Gate');
  assert.deepEqual(nav.children.map(c => c.href), [
    '/korea-gate',
    '/korea-gate#services',
    '/korea-gate#studies',
    '/korea-gate#request',
  ]);
});

test('Korea Gate: fourteen public sections, approved headline, one request CTA, preview-only form', () => {
  const lib = read('lib/korea-gate.ts');
  for (const id of [
    'hero', 'promise', 'services', 'read', 'exclusive', 'demand', 'lead',
    'studies', 'method', 'independence', 'limits', 'founder', 'request', 'trust',
  ]) assert.match(lib, new RegExp(`'${id}'`));
  assert.match(lib, /بوابة كوريا: طريقُ المؤسسة العربية إلى القدرة الكورية/);
  assert.match(lib, /اطلب دراسة أو استشارة مجانية/);
  assert.match(lib, /نمثّل المؤسسة العربية لا البائع الكوري/);
  assert.match(lib, /لا نتقاضى عمولات من الشركات الكورية/);
  assert.match(lib, /المؤسس وكبير مهندسي القدرات/);
  assert.match(lib, /Founder & Chief Capability Architect/);
  assert.match(lib, /د\. أحمد عبدالعليم/);
  assert.match(lib, /Ahmed Abdelalim/);
  assert.match(lib, /10\.3390\/ijms23158407/);
  assert.match(lib, /10\.3389\/fphar\.2022\.992731/);
  assert.doesNotMatch(lib, /en: 'Dr\./);
  assert.doesNotMatch(lib, /\bDr Ahmed\b/);
  const form = read('components/korea-gate/request-form.tsx');
  assert.match(form, /KOREA_GATE_INTAKE_WIRING_PENDING_APPROVAL/);
  assert.doesNotMatch(form, /fetch\(|mailto:|supabase|gohighlevel|resend/i);
  assert.doesNotMatch(form, /fetch\(/);
  const hub = read('components/korea-gate/hub.tsx');
  assert.match(lib, /korea-gate-logo\.webp/);
  assert.match(hub, /LOGO/);
  assert.match(lib, /Your Gateway to Korea/);
  for (const id of ['hero', 'promise', 'services', 'read', 'exclusive', 'demand', 'lead', 'studies', 'method', 'independence', 'limits', 'founder', 'request', 'trust']) {
    assert.match(hub, new RegExp(`id="${id}"`));
  }
});

test('Korea Gate: public copy has no forbidden claims and is MSA', () => {
  for (const file of GATE_FILES) {
    const src = read(file);
    assert.doesNotMatch(src, FORBIDDEN, file);
    assert.doesNotMatch(src, COLLOQUIAL_AR, file);
    assert.doesNotMatch(src, /Nine Star|هانا ?كار|Hana ?Car/i, file);
    assert.doesNotMatch(src, /48 hours|24 hours|two business days|نرد خلال|خلال \d+/, file);
  }
  const limits = read('lib/korea-gate.ts');
  assert.match(limits, /معاملات تأشيرات/);
  assert.doesNotMatch(read('components/korea-gate/hub.tsx'), /\bDr\./);
  assert.doesNotMatch(read('lib/korea-gate.ts'), /\bDr\./);
});

test('Korea Gate: removed services and reserved examples stay off the page', () => {
  const all = GATE_FILES.map(read).join('\n');
  assert.doesNotMatch(all, /توظيف بأجر|استشارة استثمار|ترتيب السفر|أوراق التأشيرة/);
  assert.doesNotMatch(all, /KOHES|PIPA|KOFIH|MDS-G30|52\.5%|Palantir|OWID|JETRO/);
  assert.doesNotMatch(all, /يورانيوم|Cheongung|دفاع/);
});

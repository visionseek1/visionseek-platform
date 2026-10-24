import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import test from 'node:test';

const read = f => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
const json = f => JSON.parse(read(f));
const NO_PARTNERSHIP = 'هذه حلول كورية نرصدها ونقترحها. وجودها هنا لا يعني شراكة بيننا وبين الشركة، إلا إذا ذكرنا ذلك.';

test('Korean Solutions: the JSON copy holds ten complete, bilingual, sourced solutions', () => {
  const {solutions} = json('content/korean-solutions.json');
  assert.equal(solutions.length, 10);
  assert.equal(new Set(solutions.map(s => s.slug)).size, 10);
  for (const s of solutions) {
    assert.match(s.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
    assert.ok(['منتج', 'حل', 'تكنولوجيا'].includes(s.type), s.slug);
    assert.ok(['نعم', 'تجربة', 'لسه'].includes(s.region), s.slug);
    for (const k of ['title', 'problem', 'solution', 'opportunity', ...(s.region === 'لسه' ? [] : ['where'])]) assert.ok(s[k].ar && s[k].en, `${s.slug}.${k}`);
    assert.ok(s.proof.length >= 1, s.slug);
    for (const p of s.proof) assert.ok(p.ar && p.en && /^https:\/\//.test(p.url), `${s.slug} proof needs its source link`);
    assert.ok(s.routes.length >= 1 && s.routes.every(r => ['شراء', 'توزيع', 'ترخيص', 'مشروع مشترك'].includes(r)), s.slug);
  }
  // Excluded by Dr. Ahmed: used cars, skincare, injectables, halal food. Nine Star / Hana Car stay out of VisionSeek.
  const all = JSON.stringify(solutions);
  assert.doesNotMatch(all, /هانا ?كار|Hana ?Car|Nine Star|skincare|injectable|halal|used car/i);
});

test('Korean Solutions: institutional transfer front, no sourcing funnel, cars are gone', () => {
  for (const f of ['app/korean-solutions/page.tsx', 'app/ar/korean-solutions/page.tsx', 'app/korean-solutions/[slug]/page.tsx', 'app/ar/korean-solutions/[slug]/page.tsx']) assert.ok(existsSync(new URL(`../${f}`, import.meta.url)), f);
  assert.ok(read('lib/korean-solutions-copy.ts').includes(NO_PARTNERSHIP));
  const pages = read('components/korean-solutions/pages.tsx');
  const finder = read('components/korean-solutions/finder.tsx');
  assert.match(finder, /t\(NO_PARTNERSHIP\)/);
  assert.match(pages, /t\(NO_PARTNERSHIP\)/);
  assert.match(pages, /ننقل القدرة الكورية ونوطّنها|we transfer Korean capability and localise it/);
  assert.doesNotMatch(pages, /لا شحن المنتج|not ship the product/);
  assert.match(pages, /ناقش مشروع نقل تكنولوجيا|Discuss a technology-transfer project/);
  assert.match(pages, /سيتم فتح باب التسجيل قريبًا|Registration will open soon/);
  assert.match(pages, /بوابات إنتشون|Incheon Gateways/);
  assert.doesNotMatch(pages, /اسم مقترح|Proposed name|بانتظار اعتماد|pending Ahmed|بدائل مقترحة|Proposed alternatives/);
  assert.match(pages, /id="do"/);
  assert.match(pages, /id="domains"/);
  assert.match(pages, /id="services"/);
  assert.match(pages, /id="how"/);
  assert.match(pages, /id="initiatives"/);
  assert.doesNotMatch(pages, /\/cars/);
  assert.match(pages, /mailto\(/);
  assert.match(pages, /أحمد عبدالعليم|Ahmed Abdelalim/);
  assert.doesNotMatch(pages, /RequestForm|اطلب من كوريا|Request from Korea|اطلب من هذا المجال|#needs|YOUR REQUEST/);
  assert.doesNotMatch(pages, /whatsappUrl|واتساب|WhatsApp/);
  assert.doesNotMatch(pages, /\bDr\.|\bد\. أحمد/);
  assert.doesNotMatch(pages, /48 hours|24 hours|1–2 days|two business days|Trade Assurance|\b6%|\b10%|زمالة|fellowship/i);
  assert.doesNotMatch(pages, /<form|input type="email"/);
  assert.doesNotMatch(pages, /لا يوجد نموذج تسجيل|There is no registration form|بلا رسائل آلية|No automated messages|لا شراء شحنة|do not buy a shipment|بدل الاستيراد|not permanent import/);
  for (const img of ['medical', 'beauty', 'manufacturing', 'energy', 'education', 'agriculture', 'cars', 'transfer', 'partnerships', 'training']) {
    assert.ok(existsSync(new URL(`../public/ks/domains/${img}.webp`, import.meta.url)), img);
  }
  assert.ok(existsSync(new URL('../docs/korean-solutions-photos.md', import.meta.url)));
  assert.match(read('components/korean-solutions/sticky-cta.tsx'), /mailto\(/);
  assert.doesNotMatch(read('components/korean-solutions/sticky-cta.tsx'), /whatsappUrl/);
});

const COLLOQUIAL_AR = /مش |مفيش|مافيش|عايز|بتاع|اللي |إزاي|ازاي|امتى|دلوقتي|عشان|كمان|منغير|ولا لأ|العربيات|حاجة تانية|ندوّر|يستاهل|معاك|لقيناه|فاضية|يقدروا|لوحدها|هترد|هتدفع|هتتواصل|بتتأكد|بيرد|بنتفق|بتعمل|لأ\.|الصفحة دي|من غير ما |من غير |نجيبها|محتاج |قول ل|كلّمنا|نرجع لك|يتقاس|يتكتب/;

test('Korean Solutions: public Arabic copy is contemporary MSA, not Egyptian colloquial', () => {
  const files = [
    'app/ar/korean-solutions/page.tsx',
    'components/korean-solutions/pages.tsx',
    'components/korean-solutions/audience.tsx',
    'components/korean-solutions/categories.tsx',
    'components/korean-solutions/finder.tsx',
    'components/korean-solutions/sticky-cta.tsx',
    'components/requests/request-form.tsx',
    'lib/korean-solutions-copy.ts',
    'lib/requests.ts',
    'content/korean-solutions.json',
  ];
  for (const file of files) {
    const src = read(file).replace(/['"]لسه['"]/g, '');
    assert.doesNotMatch(src, COLLOQUIAL_AR, file);
  }
});

test('Korean Solutions: in the menu, the sitemap and the archive list; the ops section writes to Notion only', () => {
  const nav = json('content/navigation.json').sections;
  assert.equal(nav[0].path, '/korean-solutions');
  assert.equal(nav[0].ar, 'حلول من كوريا');
  assert.equal(nav[0].en, 'Korean Solutions');
  assert.equal(nav[0].children.some(c => c.href === '/korean-solutions#needs'), false);
  assert.ok(nav[0].children.some(c => c.href === '/korean-solutions#domains' && c.ar === 'المجالات'));
  assert.ok(nav[0].children.some(c => c.href === '/korean-solutions#initiatives' && c.ar === 'المبادرات'));
  assert.equal(nav[0].children.some(c => c.href === '/cars'), false);
  assert.match(read('app/sitemap.ts'), /korean-solutions/);
  assert.doesNotMatch(read('app/sitemap.ts'), /path: '\/cars'/);
  assert.match(read('public/admin/config.yml'), /value: "\/korean-solutions"/);
  assert.doesNotMatch(read('public/admin/config.yml'), /value: "\/cars"/);
  const lib = read('lib/notion-room.ts');
  assert.match(lib, /koreanSolutions: \{ ds: "d81a751a-06b2-4ab1-933e-a6aa0deab79d"/);
  const route = read('app/ops/solutions/route.ts');
  assert.match(route, /cookieIsOwner/);
  assert.match(route, /isPreview\(\)/);
  assert.match(route, /visible: false/); // a new solution starts hidden
  assert.doesNotMatch(route, /archived|in_trash|DELETE/);
  const mod = read('app/ops/room-html.ts');
  const html = JSON.parse(mod.slice(mod.indexOf('"'), mod.lastIndexOf('"') + 1));
  for (const needle of ['حلول من كوريا', '#solutions', '/ops/solutions', 'اخفيه من الموقع']) assert.ok(html.includes(needle), needle);
});

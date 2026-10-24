import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const read = f => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
const json = f => JSON.parse(read(f));

test('cars JSON: the public list is empty; examples are marked and do not invent prices or real models', () => {
  const data = json('content/cars.json');
  assert.ok(Array.isArray(data.cars));
  assert.equal(data.cars.length, 0);
  assert.ok(data.examples.length <= 2);
  for (const c of data.examples) {
    assert.equal(c.example, true);
    assert.match(c.slug, /^example-/);
    assert.ok(['hybrid', 'phev', 'ev'].includes(c.type), c.slug);
    assert.ok(c.brand.ar && c.brand.en && c.model.ar && c.model.en, c.slug);
    assert.equal(c.priceAmount ?? null, null);
    assert.equal(c.rangeKm ?? null, null);
    assert.equal(c.batteryKwh ?? null, null);
  }
  const all = JSON.stringify(data);
  assert.doesNotMatch(all, /هانا ?كار|Hana ?Car|Nine Star|MSRP|Tesla|Polestar|Carvana|Ioniq|Genesis|Hyundai|Kia/i);
  assert.doesNotMatch(all, /used car|مستعمل للبيع/i);
});

test('cars pages exist in both languages; examples stay behind the preview flag', () => {
  for (const f of ['app/cars/page.tsx', 'app/ar/cars/page.tsx', 'app/cars/[slug]/page.tsx', 'app/ar/cars/[slug]/page.tsx', 'components/cars/pages.tsx', 'lib/cars.ts']) {
    assert.ok(existsSync(new URL(`../${f}`, import.meta.url)), f);
  }
  const lib = read('lib/cars.ts');
  assert.match(lib, /isPreviewBuild\(\)/);
  assert.match(lib, /showExamples/);
  assert.match(read('lib/deploy.ts'), /VERCEL_ENV === 'production'/);
  assert.match(read('lib/deploy.ts'), /VERCEL_ENV === 'preview'/);
  const listing = read('components/cars/listing.tsx');
  assert.match(listing, /Cars coming soon|السيارات قريبًا/);
  assert.match(listing, /EXAMPLE DATA|بيانات نموذجية/);
  assert.match(listing, /لا توجد سيارات معروضة للبيع هنا الآن/);
  assert.doesNotMatch(listing, /مفيش|دلوقتي|اللي تحتاجه/);
  const pages = read('components/cars/pages.tsx');
  assert.match(pages, /car-wanted/);
  assert.match(pages, /car-listed/);
  assert.doesNotMatch(pages, /\bDr\.|\bد\. أحمد/);
});

test('cars: in the Korean Solutions menu, the sitemap and /admin, and no mail service', () => {
  const nav = json('content/navigation.json').sections[0];
  assert.equal(nav.path, '/korean-solutions');
  assert.ok(nav.children.some(c => c.href === '/cars' && c.ar.includes('هايبرد') && /Hybrid|EV/i.test(c.en)));
  assert.match(read('app/sitemap.ts'), /path: '\/cars'/);
  assert.match(read('public/admin/config.yml'), /value: "\/cars"/);
  assert.match(read('public/admin/config.yml'), /file: content\/cars\.json/);
  const form = read('components/requests/request-form.tsx');
  assert.match(form, /mailto\(/);
  assert.match(form, /site\.email/);
  assert.doesNotMatch(form, /sendMail|nodemailer|resend|sendgrid/i);
});

test('cars filter: type and brand match; a missing number drops the car only when that filter is set', async () => {
  const source = read('lib/cars.ts');
  const {filterCars} = await import(`data:text/javascript;base64,${Buffer.from(ts.transpileModule(
    source.slice(source.indexOf('export function filterCars'), source.indexOf('export function carTitle')),
    {compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022}},
  ).outputText).toString('base64')}`);
  const hybrid = {slug: 'a', example: true, type: 'hybrid', brand: {ar: 'أ', en: 'A'}, model: {ar: 'م', en: 'M'}, year: null, photos: [], powertrain: {ar: '', en: ''}, rangeKm: null, batteryKwh: null, seats: null, included: [], priceAmount: null, priceCurrency: ''};
  const ev = {...hybrid, slug: 'b', type: 'ev', brand: {ar: 'ب', en: 'B'}};
  const empty = {type: 'all', brand: 'all', yearMin: null, yearMax: null, priceMin: null, priceMax: null, rangeMin: null, batteryMin: null};
  assert.equal(filterCars([hybrid, ev], empty).length, 2);
  assert.equal(filterCars([hybrid, ev], {...empty, type: 'ev'})[0].slug, 'b');
  assert.equal(filterCars([hybrid, ev], {...empty, yearMin: 2020}).length, 0);
});

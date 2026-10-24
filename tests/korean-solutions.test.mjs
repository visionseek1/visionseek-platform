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

test('Korean Solutions: pages in both languages, the no-partnership line, and no automatic reply', () => {
  for (const f of ['app/korean-solutions/page.tsx', 'app/ar/korean-solutions/page.tsx', 'app/korean-solutions/[slug]/page.tsx', 'app/ar/korean-solutions/[slug]/page.tsx']) assert.ok(existsSync(new URL(`../${f}`, import.meta.url)), f);
  assert.ok(read('lib/korean-solutions-copy.ts').includes(NO_PARTNERSHIP));
  const pages = read('components/korean-solutions/pages.tsx'); const finder = read('components/korean-solutions/finder.tsx');
  assert.match(finder, /t\(NO_PARTNERSHIP\)/);
  assert.match(pages, /t\(NO_PARTNERSHIP\)/);
  const api = read('app/api/korean-solutions/request/route.ts');
  assert.match(api, /recordClientIntake\(/);
  assert.match(api, /SITE_SOURCES\.korean/);
  assert.match(api, /isPreview\(\)/);
  assert.match(api, /validEmail/);
  assert.match(api, /website/); // honeypot
  assert.doesNotMatch(api, /source:\s*'الموقع'/);
  assert.doesNotMatch(api, /sendMail|nodemailer|resend|sendgrid|fetch\(['"`]https/i);
});

test('Korean Solutions: in the menu, the sitemap and the archive list; the ops section writes to Notion only', () => {
  const nav = json('content/navigation.json').sections;
  assert.equal(nav[0].path, '/korean-solutions');
  assert.equal(nav[0].ar, 'حلول من كوريا');
  assert.equal(nav[0].en, 'Korean Solutions');
  assert.match(read('app/sitemap.ts'), /korean-solutions/);
  assert.match(read('public/admin/config.yml'), /value: "\/korean-solutions"/);
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

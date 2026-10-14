import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import test from 'node:test';

const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const json = p => JSON.parse(read(p));

test('VisionSeek Insights takes /insights; Leaders House moves to /leaders-house and stays archived', () => {
  const vis = json('content/visibility.json');
  const archived = vis.archived.map(a => a.path);
  assert.ok(archived.includes('/leaders-house'));
  assert.ok(!archived.includes('/insights'));
  for (const p of ['app/insights/page.tsx', 'app/ar/insights/page.tsx', 'app/insights/notes/[slug]/page.tsx', 'app/ar/insights/notes/[slug]/page.tsx', 'app/insights/frameworks/[slug]/page.tsx', 'app/ar/insights/frameworks/[slug]/page.tsx', 'app/leaders-house/page.tsx', 'app/ar/leaders-house/page.tsx']) assert.ok(existsSync(new URL(`../${p}`, import.meta.url)), p);
  assert.match(read('components/capability/navigation.tsx'), /isArchived\('\/leaders-house'\)/);
});

test('Insights sits in the main menu between Programs and News', () => {
  const nav = json('content/navigation.json').sections.map(s => s.path);
  assert.equal(nav[nav.indexOf('/insights') - 1], '/programs');
  assert.equal(nav[nav.indexOf('/insights') + 1], '/news');
  for (const s of json('content/navigation.json').sections) for (const c of s.children) if (c.ar === 'بيت القادة') assert.equal(c.href, '/leaders-house');
});

test('first launch: note L-001 (research in progress), the Decision Dimensions Map (in development) and the newsletter; empty sections hidden', () => {
  const d = json('content/insights.json');
  assert.equal(d.notes[0].number, 'L-001');
  assert.equal(d.notes[0].status.ar, 'قيد البحث');
  assert.equal(d.frameworks[0].title.ar, 'خريطة أبعاد القرار');
  assert.equal(d.frameworks[0].status.ar, 'قيد البناء.');
  assert.deepEqual([d.reports.length, d.articles.length, d.research.length], [0, 0, 0]);
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

import assert from 'node:assert/strict';
import {readFileSync, readdirSync, statSync, existsSync} from 'node:fs';
import test from 'node:test';

const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const json = p => JSON.parse(read(p));
const walk = d => readdirSync(new URL(`../${d}`, import.meta.url)).flatMap(f => { const p = `${d}/${f}`; return statSync(new URL(`../${p}`, import.meta.url)).isDirectory() ? walk(p) : [p]; });
const publicFiles = () => ['components', 'content', 'app', 'lib', 'public/admin'].flatMap(walk).filter(p => /\.(tsx?|json|ya?ml|css)$/.test(p) && !p.startsWith('app/ops/') && !p.startsWith('app/api/') && !p.startsWith('lib/notion-room'));

test('one message: «مهندس القدرات المؤسسية», one CTA «احجز جلستك المجانية», and the old CTA is gone', () => {
  const one = json('content/one-message.json');
  assert.equal(one.identity.ar, 'مهندس القدرات المؤسسية');
  assert.equal(one.cta.label.ar, 'احجز جلستك المجانية');
  for (const p of publicFiles().filter(p => !p.includes('leaders') && !p.includes('reports'))) assert.doesNotMatch(read(p), /ابنِ حلولك معنا|Build your solutions with us/, p);
  assert.match(read('components/capability/navigation.tsx'), /<BookButton locale=\{locale\} className="vs-start-nav"\/>/);
  assert.match(read('lib/seo.ts'), /VisionSeek \| مهندس القدرات المؤسسية/);
  assert.match(read('lib/seo.ts'), /VisionSeek \| Institutional Capability Architect/);
});

test('the menu has five items; programs, news, masterclass, fields and «اعمل معنا» live in the footer', () => {
  const nav = json('content/navigation.json');
  assert.deepEqual(nav.sections.map(s => s.ar), ['من نحن', 'ماذا نقدم', 'Insights', 'المبادرة', 'تواصل']);
  const footer = nav.footer.map(s => s.path);
  for (const p of ['/work-with-us', '/masterclass', '/programs', '/news', '/projects']) assert.ok(footer.includes(p), p);
  assert.ok(!JSON.stringify(nav).includes('/projects/defense'));
  assert.ok(json('content/visibility.json').archived.some(a => a.path === '/projects/defense'));
  assert.match(read('next.config.ts'), /\/projects\/defense`, destination: `\$\{prefix\}\/projects`/);
  assert.match(read('next.config.ts'), /\/contact`, destination: `\$\{prefix\}\/start`/);
});

test('the initiative: one free 30-minute session, Oct–Dec 2026, limited without a number, no prices anywhere', () => {
  const it = json('content/one-message.json').initiative;
  assert.equal(it.offer.ar, 'جلسة 30 دقيقة مجانًا مع د. أحمد');
  assert.equal(it.limited.ar, 'عدد الجلسات محدود');
  assert.doesNotMatch(it.limited.ar + it.limited.en, /\d/);
  // our own pages carry no prices (third-party figures quoted inside news sources are not ours)
  for (const p of ['content/one-message.json', 'content/insights.json', 'content/about.json', 'content/home.json', 'content/sections.json', 'content/method.json', 'content/site.json', 'components/one/pages.tsx', 'components/insights/pages.tsx']) {
    const own = read(p);
    assert.doesNotMatch(own, /\$\s?\d|\d\s?(USD|SAR|AED|EGP|KRW|ريال|درهم|جنيه|دولار)\b/, `price-like figure in ${p}`);
  }
  for (const p of ['content/workshop-section.json', 'content/one-message.json', ...walk('content/workshops')]) assert.doesNotMatch(read(p), /"(price|pricing|fees?)":|قائمة الأسعار|السعر|الأسعار/, p);
  const booking = json('content/one-message.json').booking.url;
  if (booking) assert.match(booking, /^https:\/\/(app\.)?cal\.com\//);
  assert.match(read('app/api/booking/route.ts'), /CAL_WEBHOOK_SECRET/);
  assert.match(read('app/api/booking/route.ts'), /جلسة تعريفية/);
  for (const p of ['app/initiative/page.tsx', 'app/ar/initiative/page.tsx', 'app/what-we-offer/page.tsx', 'app/ar/what-we-offer/page.tsx']) assert.ok(existsSync(new URL(`../${p}`, import.meta.url)), p);
});

test('the home is five layers and the counter and the ten-years line are gone', () => {
  const home = read('components/one/pages.tsx');
  for (const id of ['home.problem', 'home.sectors', 'home.insights', 'home.close']) assert.ok(home.includes(id), id);
  const all = publicFiles().map(read).join('\n');
  assert.doesNotMatch(all, /محركات ذاتية|خلال 10 سنين|steering the helm/);
  assert.match(all, /نؤمن أن العقد القادم تصنعه المؤسسات التي تبدأ اليوم/);
  assert.equal(json('content/one-message.json').sectors.length, 5);
});

test('emails by purpose, the founder address only on «من نحن», WhatsApp unchanged', () => {
  const site = json('content/site.json');
  assert.equal(site.email, 'hello@visionseek.org');
  assert.deepEqual(site.emails, {general: 'hello@visionseek.org', insights: 'insights@visionseek.org', masterclass: 'masterclass@visionseek.org', partners: 'partners@visionseek.org', media: 'media@visionseek.org', careers: 'careers@visionseek.org', founder: 'abdelalim@visionseek.org'});
  assert.equal(site.whatsapp, '821042419606');
  const founderMentions = publicFiles().filter(p => !p.includes('leaders') && !p.includes('reports') && !p.includes('room') && read(p).includes('abdelalim@visionseek.org'));
  assert.deepEqual(founderMentions.sort(), ['content/site.json']);
  assert.match(read('components/capability/interior-page.tsx'), /emails\.founder/);
  assert.match(read('components/legal-page.tsx'), /kind === 'privacy' \? emails\.insights : emails\.general/);
  assert.match(read('content/legal.json'), /insights@visionseek\.org/);
  assert.match(read('content/guides/news--media.json'), /media@visionseek\.org/);
  assert.match(read('lib/site.ts'), /section === 'workshops' \? emails\.masterclass/);
});

test('«إشارات» became «قراءات» on visible pages', () => {
  for (const p of ['content/legal.json', 'content/guides/programs--program-lifecycle.json', 'content/guides/programs--spotlights.json', 'content/sections.json', 'content/about.json', 'content/home.json']) assert.doesNotMatch(read(p), /إشارات|الإشارة|\bsignals?\b/i, p);
});

test('every page that sets openGraph repeats the default image; masterclass pages carry short titles', () => {
  for (const p of walk('app').filter(p => p.endsWith('page.tsx') && !p.startsWith('app/ops'))) {
    const s = read(p);
    if (s.includes('openGraph')) assert.ok(s.includes('OG_IMAGES'), `${p} loses the og image`);
  }
  const short = walk('content/workshops').map(json).filter(w => !w.draft).map(w => w.title?.ar);
  assert.deepEqual(short.filter(Boolean).length, short.length, 'a published masterclass has no short title');
  for (const t of short) assert.ok(t.length <= 30, t);
  assert.match(read('app/masterclass/[slug]/page.tsx'), /workshopTitle\(workshop, 'en'\)/);
});

import assert from 'node:assert/strict';
import {existsSync, readFileSync, statSync} from 'node:fs';
import test from 'node:test';

const url = f => new URL(`../${f}`, import.meta.url);
const read = f => readFileSync(url(f), 'utf8');
const data = JSON.parse(read('content/competitions.json'));
const built = f => read(`.next/server/app/${f}.html`);
const isText = value => Boolean(value && value.en && value.ar);
const esc = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const deadlineEnd = card => Date.parse(`${card.deadline}T23:59:59.999+09:00`);
const formatDeadline = (card, locale) => new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(new Date(`${card.deadline}T00:00:00Z`));

const removedWorkWithUsGuides = [
  {href: '/work-with-us/new-to-visionseek', en: 'New to VisionSeek', ar: 'ابدأ مع VisionSeek'},
  {href: '/work-with-us/how-to-respond', en: 'How to respond', ar: 'كيف تشارك؟'},
  {href: '/work-with-us/prepare-a-concept', en: 'Prepare a concept', ar: 'جهّز تصورًا'},
  {href: '/work-with-us/review-and-selection', en: 'Review & selection', ar: 'المراجعة والاختيار'},
  {href: '/work-with-us/transition', en: 'Transition to use', ar: 'النقل للتشغيل'},
];

test('Competitions: «مشاركين في / Competing in» only, no partnership claim, no amounts, no title in English', () => {
  assert.deepEqual(data.labels.competingIn, {en: 'Competing in', ar: 'مشاركين في'});
  const all = JSON.stringify(data);
  assert.doesNotMatch(all, /partnership|official partner|partnered|sponsor|in collaboration with|شراكة|شريك رسمي|بالشراكة|برعاية|بالتعاون مع/i);
  assert.doesNotMatch(all, /[$€£₩]|\d\s*(%|usd|eur|sar|aed|egp|krw|dollars?|prize)|جائزة|دولار|جنيه|ريال|درهم|عائد|أرباح/i);
  for (const key of ['kicker', 'title', 'text']) assert.ok(isText(data.hero[key]), `hero.${key}`);
  for (const [key, value] of Object.entries({...data.labels, ...data.form})) assert.ok(isText(value), key);
  assert.ok(data.how.length >= 1 && data.how.every(isText));
  assert.equal(new Set(data.cards.map(c => c.id)).size, data.cards.length, 'card ids are unique');
  for (const card of data.cards) {
    assert.ok(['open', 'filled', 'completed'].includes(card.status), card.id);
    assert.match(card.deadline, /^\d{4}-\d{2}-\d{2}$/, card.id);
    for (const key of ['summary', 'role', 'leader']) assert.ok(isText(card[key]), `${card.id}.${key}`);
    assert.doesNotMatch(card.leader.en, /\bDr\b/, `${card.id}: no "Dr." in English`);
    for (const image of [card.logo, card.leaderImage, card.image]) assert.ok(existsSync(url(`public${image}`)), image);
  }
});

test('Competitions: live on Work with Us, old /competitions URLs permanently redirect, no top-level nav item', () => {
  const nav = JSON.parse(read('content/navigation.json'));
  assert.equal(nav.sections.find(s => s.path === '/competitions'), undefined);
  const workNav = nav.sections.find(s => s.path === '/work-with-us');
  assert.ok(workNav);
  assert.ok(workNav.children.some(c => c.href === '/work-with-us#competitions' && c.en === 'Competitions' && c.ar === 'المسابقات'));
  assert.ok(workNav.children.some(c => c.href === '/work-with-us#now-competing'));
  for (const guide of removedWorkWithUsGuides) {
    assert.equal(workNav.children.find(c => c.href === guide.href), undefined, guide.href);
  }

  const work = JSON.parse(read('content/sections.json')).sections.find(s => s.id === 'work-with-us');
  assert.equal(work.image, '/work-with-us/hero-sign.jpg');
  assert.ok(work.links.some(l => l.href === '/work-with-us#competitions' && l.label.en === 'Competitions' && l.label.ar === 'المسابقات'));
  for (const guide of removedWorkWithUsGuides) {
    assert.equal(work.links.find(l => l.href === guide.href), undefined, guide.href);
  }

  const config = read('next.config.ts');
  assert.match(config, /source: `\$\{prefix\}\/competitions`/);
  assert.match(config, /destination: `\$\{prefix\}\/work-with-us#competitions`/);
  assert.match(config, /permanent: true/);
  assert.match(read('app/competitions/page.tsx'), /permanentRedirect\('\/work-with-us#competitions'\)/);
  assert.match(read('app/ar/competitions/page.tsx'), /permanentRedirect\('\/ar\/work-with-us#competitions'\)/);

  assert.doesNotMatch(read('app/sitemap.ts'), /'\/competitions'/);
  const admin = read('public/admin/config.yml');
  assert.match(admin, /file: content\/competitions\.json/);
  assert.match(admin, /preview_path: "ar\/work-with-us"/);
  assert.doesNotMatch(admin, /preview_path: "ar\/competitions"/);
});

test('Competitions: «انضم» opens a mail draft to the site email; the site itself sends and stores nothing', () => {
  const form = read('components/competitions/join-form.tsx');
  assert.match(form, /from '@\/lib\/site'/);
  assert.match(form, /window\.location\.href = mailto\(/);
  assert.doesNotMatch(form, /fetch\(|sendMail|nodemailer|resend|sendgrid/i);
  for (const name of ['name', 'email', 'role', 'link']) assert.match(form, new RegExp(`name="${name}"[^>]*\\brequired\\b`), name);
});

test('Competitions: Work with Us is native RTL and LTR and renders the competitions blocks', () => {
  const pages = {en: built('work-with-us'), ar: built('ar/work-with-us')};
  assert.match(pages.en, /class="vs-site locale-en" lang="en" dir="ltr"/);
  assert.match(pages.ar, /class="vs-site locale-ar" lang="ar" dir="rtl"/);
  assert.doesNotMatch(pages.en, /Dr\.?\s*Ahmed/);
  const now = Date.now();
  const current = data.cards.filter(card => card.status !== 'completed');
  const completed = data.cards.filter(card => card.status === 'completed');
  const open = current.filter(card => card.status === 'open' && now <= deadlineEnd(card));
  for (const [locale, html] of Object.entries(pages)) {
    const has = text => html.includes(esc(text));
    for (const id of ['competitions', 'competitions-title', 'now-competing', 'join', 'completed', 'how-we-work']) assert.ok(html.includes(`id="${id}"`), `${locale} #${id}`);
    assert.match(html, new RegExp(`id="competitions-title"[^>]*>\\s*${esc(data.hero.kicker[locale]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<`));
    const sectionAt = html.indexOf('id="competitions"');
    const titleAt = html.indexOf('id="competitions-title"');
    assert.ok(sectionAt !== -1 && titleAt > sectionAt, `${locale} heading sits inside #competitions`);
    assert.ok(html.includes('href="mailto:abdelalim@visionseek.org"'), `${locale} mail draft`);
    assert.ok(html.includes('/work-with-us/hero-sign.jpg'), `${locale} office hero`);
    for (const guide of removedWorkWithUsGuides) {
      assert.ok(!has(guide[locale]), `${locale} removed ${guide[locale]}`);
    }
    for (const text of [data.labels.now[locale], data.labels.join[locale], data.labels.completed[locale], data.labels.how[locale], ...data.how.map(item => item[locale])]) {
      assert.ok(has(text), `${locale}: ${text}`);
    }
    assert.equal(html.includes(`>${esc(data.labels.empty[locale])}<`), current.length === 0 || completed.length === 0, `${locale} empty state`);
    for (const card of current) {
      const cardAt = html.indexOf(esc(card.project));
      assert.ok(cardAt > titleAt, `${locale} ${card.id} sits under the Competitions heading`);
      for (const text of [card.project, card.competition, card.summary[locale], card.role[locale], card.leader[locale], formatDeadline(card, locale), data.labels.competingIn[locale]]) {
        assert.ok(has(text), `${locale} ${card.id}: ${text}`);
      }
    }
    assert.equal(has(data.labels.open[locale]), open.length > 0, `${locale} open label`);
    assert.equal(html.includes(`>${esc(data.labels.filled[locale])}<`), current.length > open.length, `${locale} filled label`);
    assert.equal(html.includes('href="#join"'), open.length > 0, `${locale} join button`);
  }
});

test('Competitions: images are optimized, and Work with Us uses the office hero', () => {
  assert.ok(statSync(url('public/competitions/team-photo.jpg')).size < 200_000);
  assert.ok(statSync(url('public/competitions/meta-logo.png')).size < 40_000);
  assert.ok(statSync(url('public/work-with-us/hero-sign.jpg')).size < 200_000);
  assert.match(read('components/institution/work-with-us-page.tsx'), /entryImage\(section\.image\)/);
  assert.match(read('components/competitions/competitions-page.tsx'), /id="competitions"/);
  assert.doesNotMatch(read('components/competitions/competitions-page.tsx'), /styles\.heroCopy/);
});

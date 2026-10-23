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

test('Competitions: own pages in both languages, in the menu, the sitemap, the archive list and /admin', () => {
  for (const f of ['app/competitions/page.tsx', 'app/ar/competitions/page.tsx']) assert.ok(existsSync(url(f)), f);
  const section = JSON.parse(read('content/navigation.json')).sections.find(s => s.path === '/competitions');
  assert.equal(section.en, 'Competitions');
  assert.equal(section.ar, 'المسابقات');
  assert.match(read('app/sitemap.ts'), /'\/competitions'/);
  assert.match(read('public/admin/config.yml'), /value: "\/competitions"/);
  assert.match(read('public/admin/config.yml'), /file: content\/competitions\.json/);
});

test('Competitions: «انضم» opens a mail draft to the site email; the site itself sends and stores nothing', () => {
  const form = read('components/competitions/join-form.tsx');
  assert.match(form, /from '@\/lib\/site'/);
  assert.match(form, /window\.location\.href = mailto\(/);
  assert.doesNotMatch(form, /fetch\(|sendMail|nodemailer|resend|sendgrid/i);
  for (const name of ['name', 'email', 'role', 'link']) assert.match(form, new RegExp(`name="${name}"[^>]*\\brequired\\b`), name);
});

test('Competitions: the built pages are native RTL and LTR and render the content of competitions.json', () => {
  const pages = {en: built('competitions'), ar: built('ar/competitions')};
  assert.match(pages.en, /class="vs-site locale-en" lang="en" dir="ltr"/);
  assert.match(pages.ar, /class="vs-site locale-ar" lang="ar" dir="rtl"/);
  assert.doesNotMatch(pages.en, /Dr\.?\s*Ahmed/);
  const now = Date.now();
  const current = data.cards.filter(card => card.status !== 'completed');
  const completed = data.cards.filter(card => card.status === 'completed');
  // Open until the end of its deadline day in Korea, then «اكتمل / Filled» without the join button.
  const open = current.filter(card => card.status === 'open' && now <= deadlineEnd(card));
  for (const [locale, html] of Object.entries(pages)) {
    const has = text => html.includes(esc(text));
    for (const id of ['now-competing', 'join', 'completed', 'how-we-work']) assert.ok(html.includes(`id="${id}"`), `${locale} #${id}`);
    assert.ok(html.includes('href="mailto:abdelalim@visionseek.org"'), `${locale} mail draft`);
    for (const text of [data.hero.title[locale], data.hero.text[locale], ...data.how.map(item => item[locale])]) assert.ok(has(text), `${locale}: ${text}`);
    assert.equal(html.includes(`>${esc(data.labels.empty[locale])}<`), current.length === 0 || completed.length === 0, `${locale} empty state`);
    for (const card of current) {
      for (const text of [card.project, card.competition, card.summary[locale], card.role[locale], card.leader[locale], formatDeadline(card, locale), data.labels.competingIn[locale]]) assert.ok(has(text), `${locale} ${card.id}: ${text}`);
    }
    assert.equal(has(data.labels.open[locale]), open.length > 0, `${locale} open label`);
    assert.equal(html.includes(`>${esc(data.labels.filled[locale])}<`), current.length > open.length, `${locale} filled label`);
    assert.equal(html.includes('href="#join"'), open.length > 0, `${locale} join button`);
  }
});

test('Competitions: images are optimized, and Work with Us can take its hero from a /path', () => {
  assert.ok(statSync(url('public/competitions/team-photo.jpg')).size < 200_000);
  assert.ok(statSync(url('public/competitions/meta-logo.png')).size < 40_000);
  assert.match(read('components/institution/pages.tsx'), /vs-institution-hero-image"><Image src=\{entryImage\(section\.image\)\}/);
});

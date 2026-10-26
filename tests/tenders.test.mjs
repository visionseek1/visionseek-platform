import assert from 'node:assert/strict';
import {existsSync, readFileSync, statSync} from 'node:fs';
import test from 'node:test';

const url = f => new URL(`../${f}`, import.meta.url);
const read = f => readFileSync(url(f), 'utf8');
const data = JSON.parse(read('content/tenders.json'));
const built = f => read(`.next/server/app/${f}.html`);
const isText = value => Boolean(value && value.en && value.ar);
const esc = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const deadlineEnd = card => Date.parse(card.deadline);
const formatDeadline = (card, locale) => {
  const instant = new Date(card.deadline);
  const date = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Dubai'}).format(instant);
  const time = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Dubai'}).format(instant);
  return locale === 'ar' ? `${date}، الساعة ${time} بتوقيت الإمارات` : `${date}, ${time} UAE time`;
};
const formatOpened = (card, locale) => new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Dubai'}).format(new Date(`${card.opened}T00:00:00+04:00`));

test('Tenders: confirmed facts only — no budget, no company names, no people, no invented numbers, no application claim', () => {
  const all = JSON.stringify(data);
  assert.doesNotMatch(all, /aimuse|230,?000|1,?150,?000|4\s*[–-]\s*6|أسبوع|weeks?|budget|تمويل|ميزانية|درهم|aed/i);
  assert.doesNotMatch(all, /presight|blackstone|net0|injazat|e&\s*enterprise|ناين\s*ستار|nine\s*star/i);
  assert.doesNotMatch(all, /we (have )?(applied|registered)|قدّمن[ات]|تسجّل<|سجّلنا|شريك رسمي|بالشراكة مع الوزارة/i);
  assert.doesNotMatch(all, /شعار الوزارة|ministry logo/i);
  for (const key of ['kicker', 'title', 'text']) assert.ok(isText(data.hero[key]), `hero.${key}`);
  for (const [key, value] of Object.entries({...data.labels, ...data.form})) assert.ok(isText(value), key);
  assert.ok(data.how.length >= 1 && data.how.every(isText));
  assert.equal(new Set(data.cards.map(c => c.id)).size, data.cards.length, 'card ids are unique');
  for (const card of data.cards) {
    assert.ok(['open', 'filled', 'completed'].includes(card.status), card.id);
    assert.match(card.deadline, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/, card.id);
    assert.match(card.opened, /^\d{4}-\d{2}-\d{2}$/, card.id);
    assert.match(card.sourceUrl, /^https:\/\/procurement\.gov\.ae\/?$/);
    for (const key of ['title', 'issuer', 'summary', 'body', 'role', 'eligibility', 'sourceLabel', 'imageAlt']) {
      assert.ok(isText(card[key]), `${card.id}.${key}`);
    }
    assert.ok(card.imageAlt.ar.length > 20, `${card.id} Arabic alt`);
    assert.ok(existsSync(url(`public${card.image}`)), card.image);
    assert.doesNotMatch(card.body.en + card.body.ar, /applied|registered as a supplier|قدّمنا|سجّلنا/);
  }
});

test('Tenders: live on Work with Us right after Competitions, old /tenders URLs permanently redirect', () => {
  const nav = JSON.parse(read('content/navigation.json'));
  assert.equal(nav.sections.find(s => s.path === '/tenders'), undefined);
  const workNav = nav.sections.find(s => s.path === '/work-with-us');
  assert.ok(workNav);
  const children = workNav.children.map(c => c.href);
  assert.ok(children.includes('/work-with-us#competitions'));
  assert.ok(children.includes('/work-with-us#tenders'));
  assert.ok(children.indexOf('/work-with-us#tenders') === children.indexOf('/work-with-us#competitions') + 1);
  assert.ok(workNav.children.some(c => c.href === '/work-with-us#tenders' && c.en === 'Tenders' && c.ar === 'المناقصات'));

  const work = JSON.parse(read('content/sections.json')).sections.find(s => s.id === 'work-with-us');
  const links = work.links.map(l => l.href);
  assert.ok(links.indexOf('/work-with-us#tenders') === links.indexOf('/work-with-us#competitions') + 1);

  const config = read('next.config.ts');
  assert.match(config, /source: `\$\{prefix\}\/tenders`/);
  assert.match(config, /destination: `\$\{prefix\}\/work-with-us#tenders`/);
  assert.doesNotMatch(config, /tenders\/:[A-Za-z]+/);
  assert.match(read('app/tenders/page.tsx'), /permanentRedirect\('\/work-with-us#tenders'\)/);
  assert.match(read('app/ar/tenders/page.tsx'), /permanentRedirect\('\/ar\/work-with-us#tenders'\)/);

  assert.doesNotMatch(read('app/sitemap.ts'), /path: '\/tenders'/);
  assert.match(read('app/sitemap.ts'), /work-with-us\/tenders\/\$\{card\.id\}/);
  const admin = read('public/admin/config.yml');
  assert.match(admin, /file: content\/tenders\.json/);
  assert.match(admin, /name: tenders/);
  assert.match(admin, /preview_path: "ar\/work-with-us"/);
});

test('Tenders: «تواصل» reuses the competitions mail-draft path; the site itself sends and stores nothing', () => {
  const form = read('components/competitions/join-form.tsx');
  const page = read('components/tenders/tenders-page.tsx');
  assert.match(page, /from '@\/components\/competitions\/join-form'/);
  assert.match(form, /window\.location\.href = mailto\(/);
  assert.doesNotMatch(form, /fetch\(|sendMail|nodemailer|resend|sendgrid/i);
});

test('Tenders: Work with Us renders المناقصات after المسابقات, and the first tender has a detail page', () => {
  const pages = {en: built('work-with-us'), ar: built('ar/work-with-us')};
  const now = Date.now();
  const current = data.cards.filter(card => card.status !== 'completed');
  const completed = data.cards.filter(card => card.status === 'completed');
  const open = current.filter(card => card.status === 'open' && now <= deadlineEnd(card));
  for (const [locale, html] of Object.entries(pages)) {
    const has = text => html.includes(esc(text));
    for (const id of ['tenders', 'tenders-title', 'open-tenders', 'tenders-join', 'tenders-completed', 'tenders-how']) {
      assert.ok(html.includes(`id="${id}"`), `${locale} #${id}`);
    }
    const competitionsAt = html.indexOf('id="competitions"');
    const tendersAt = html.indexOf('id="tenders"');
    const clientAt = html.indexOf('vs-client-entry');
    assert.ok(competitionsAt !== -1 && tendersAt > competitionsAt, `${locale} tenders after competitions`);
    assert.ok(tendersAt !== -1 && clientAt > tendersAt, `${locale} client entry after tenders`);
    assert.match(html, new RegExp(`id="tenders-title"[^>]*>\\s*${esc(data.hero.kicker[locale])}\\s*<`));
    assert.ok(html.includes('href="mailto:abdelalim@visionseek.org"'), `${locale} mail draft`);
    assert.ok(html.includes('https://procurement.gov.ae'), `${locale} source`);
    for (const text of [data.labels.now[locale], data.labels.join[locale], data.labels.completed[locale], data.labels.how[locale], ...data.how.map(item => item[locale])]) {
      assert.ok(has(text), `${locale}: ${text}`);
    }
    assert.equal(html.includes(`>${esc(data.labels.empty[locale])}<`), current.length === 0 || completed.length === 0, `${locale} empty state`);
    for (const card of current) {
      const cardAt = html.indexOf(esc(card.title[locale]));
      assert.ok(cardAt > tendersAt, `${locale} ${card.id} sits under the Tenders heading`);
      for (const text of [card.title[locale], card.officialName, card.number, card.summary[locale], card.role[locale], card.eligibility[locale], formatOpened(card, locale), formatDeadline(card, locale)]) {
        assert.ok(has(text), `${locale} ${card.id}: ${text}`);
      }
      assert.ok(html.includes(`/work-with-us/tenders/${card.id}`) || html.includes(`/ar/work-with-us/tenders/${card.id}`), `${locale} ${card.id} detail link`);
    }
    assert.equal(has(data.labels.open[locale]), open.length > 0, `${locale} open label`);
    assert.equal(html.includes('href="#tenders-join"'), open.length > 0, `${locale} contact button`);
  }

  const first = data.cards[0];
  const details = {en: built(`work-with-us/tenders/${first.id}`), ar: built(`ar/work-with-us/tenders/${first.id}`)};
  for (const [locale, html] of Object.entries(details)) {
    assert.ok(html.includes(esc(first.title[locale])), `${locale} detail title`);
    assert.ok(html.includes(esc(first.body[locale].split('\n\n')[0])), `${locale} detail body`);
    assert.ok(html.includes('https://procurement.gov.ae'), `${locale} detail source`);
    assert.ok(html.includes(esc(first.imageAlt[locale])), `${locale} alt`);
    assert.ok(html.includes(esc(formatDeadline(first, locale))), `${locale} detail deadline`);
  }
});

test('Tenders: editorial image is SVG 16:9, with a PNG render used on the card', () => {
  const svg = read('public/work-with-us/tenders/moei-12718.svg');
  assert.match(svg, /viewBox="0 0 1600 900"/);
  assert.doesNotMatch(svg, /<text[\s>]/);
  assert.ok(statSync(url('public/work-with-us/tenders/moei-12718.svg')).size < 20_000);
  assert.ok(existsSync(url('public/work-with-us/tenders/moei-12718.png')));
  assert.ok(statSync(url('public/work-with-us/tenders/moei-12718.png')).size < 400_000);
  assert.equal(data.hero.image, '/work-with-us/tenders/moei-12718.png');
  assert.match(read('components/institution/work-with-us-page.tsx'), /TendersBody/);
  assert.match(read('components/tenders/tenders-page.tsx'), /id="tenders"/);
});

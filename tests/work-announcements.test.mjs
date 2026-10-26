import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

const url = f => new URL(`../${f}`, import.meta.url);
const read = f => readFileSync(url(f), 'utf8');
const built = f => read(`.next/server/app/${f}.html`);
const competitions = JSON.parse(read('content/competitions.json'));
const tenders = JSON.parse(read('content/tenders.json'));
const esc = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const openCompetitions = (now = Date.now()) => competitions.cards.filter(card => card.status === 'open' && now <= Date.parse(`${card.deadline}T23:59:59.999+09:00`)).length;
const openTenders = (now = Date.now()) => tenders.cards.filter(card => card.status === 'open' && now <= Date.parse(card.deadline)).length;
const openLabel = (n, locale) => locale === 'ar' ? `${n.toLocaleString('ar-EG')} مفتوحة` : `${n} open`;
const oldTabs = [
  {en: 'New to VisionSeek', ar: 'ابدأ مع VisionSeek'},
  {en: 'How to respond', ar: 'كيف تشارك؟'},
  {en: 'Prepare a concept', ar: 'جهّز تصورًا'},
  {en: 'Review and selection', ar: 'المراجعة والاختيار'},
  {en: 'Transition', ar: 'الانتقال'},
];

test('Work with us: two announcement jump cards sit under the hero, competitions then tenders', () => {
  const page = read('components/institution/work-with-us-page.tsx');
  assert.match(page, /WorkAnnouncementsNav/);
  assert.match(page, /WorkAnnouncementsNav[\s\S]*CompetitionsBody[\s\S]*TendersBody/);
  assert.doesNotMatch(page, /vs-section-nav/);
  assert.doesNotMatch(read('components/institution/work-announcements-nav.tsx'), /['"]1 open['"]|١ مفتوحة|new-to-visionseek|how-to-respond|prepare-a-concept/);

  const pages = {en: built('work-with-us'), ar: built('ar/work-with-us')};
  const now = Date.now();
  const expected = {competitions: openCompetitions(now), tenders: openTenders(now)};
  for (const [locale, html] of Object.entries(pages)) {
    const heroAt = html.indexOf('vs-institution-hero');
    const navAt = html.indexOf('id="work-announcements"');
    const competitionsAt = html.indexOf('id="competitions"');
    const tendersAt = html.indexOf('id="tenders"');
    assert.ok(heroAt !== -1 && navAt > heroAt, `${locale} nav after hero`);
    assert.ok(competitionsAt > navAt, `${locale} competitions after nav`);
    assert.ok(tendersAt > competitionsAt, `${locale} tenders after competitions`);
    assert.doesNotMatch(html, /class="[^"]*vs-section-nav/);

    const slice = html.slice(navAt, competitionsAt);
    assert.match(slice, /href="#competitions"/);
    assert.match(slice, /href="#tenders"/);
    assert.ok(slice.indexOf('href="#competitions"') < slice.indexOf('href="#tenders"'), `${locale} competitions card first`);
    assert.ok(slice.includes(esc(competitions.hero.kicker[locale])), `${locale} competitions title`);
    assert.ok(slice.includes(esc(tenders.hero.kicker[locale])), `${locale} tenders title`);
    assert.ok(slice.includes(esc(openLabel(expected.competitions, locale))), `${locale} competitions count`);
    assert.ok(slice.includes(esc(openLabel(expected.tenders, locale))), `${locale} tenders count`);
    assert.equal((slice.match(/href="#(competitions|tenders)"/g) || []).length, 2, `${locale} exactly two jump cards`);
    for (const tab of oldTabs) {
      assert.ok(!slice.includes(esc(tab[locale])), `${locale} did not bring back ${tab[locale]}`);
    }
  }
});

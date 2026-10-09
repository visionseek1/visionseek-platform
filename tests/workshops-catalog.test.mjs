import assert from 'node:assert/strict';
import {readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import test from 'node:test';

const dir = join(process.cwd(), 'content/workshops');
const files = readdirSync(dir).filter(name => name.endsWith('.json'));
const workshops = files.map(name => JSON.parse(readFileSync(join(dir, name), 'utf8')));
const section = JSON.parse(readFileSync(join(process.cwd(), 'content/workshop-section.json'), 'utf8'));

// Dr. Ahmed (9 Oct 2026): nothing on the masterclass may suggest it is a trial, a display, or that none has been held.
const notHeld = /لم يُعقد|لم تُعقد|لم ينعقد|قيد التصميم|تُحدَّد\]|ليست نتائج|ليس شراكة|حكاية عميل|has been held|In design|To be set|not results|being made|not a client story|not a partnership/;

test('fourteen masterclass files, and no line says it is a trial or not yet held', () => {
  assert.equal(workshops.length, 14);
  assert.deepEqual(workshops.map(item => item.slug).sort(), [
    'airport-teams',
    'company-teams',
    'customs-ports',
    'develop-the-institution',
    'education-schools',
    'energy-utilities',
    'finance-tax',
    'hospital-administration',
    'justice-courts',
    'labour-civil-service',
    'leader-seat',
    'municipalities',
    'police-citizen-service',
    'university-teams',
  ]);
  for (const item of workshops) {
    assert.equal(notHeld.test(JSON.stringify(item)), false, `${item.slug}: not-held or trial wording`);
    assert.equal(item.questions.length, 5);
    assert.equal(item.source.url.startsWith('https://'), true);
    const joined = JSON.stringify(item);
    assert.equal(joined.includes('شهادة'), false);
    assert.equal(joined.includes('شعار'), false);
  }
});

test('the seven new sector pages stay off the site until they are rewritten', () => {
  const drafts = workshops.filter(item => item.draft).map(item => item.slug).sort();
  assert.deepEqual(drafts, ['customs-ports', 'education-schools', 'energy-utilities', 'finance-tax', 'justice-courts', 'labour-civil-service', 'municipalities']);
  const loader = readFileSync(join(process.cwd(), 'lib/institution/workshops.ts'), 'utf8');
  assert.match(loader, /\.filter\(item => !item\.draft\)/, 'the loader drops drafts');
});

test('police workshop stays on administration and citizen service', () => {
  const police = workshops.find(item => item.slug === 'police-citizen-service');
  assert.equal(police.institution, 'police');
  assert.match(police.boundary.ar, /أمني/);
  assert.match(police.boundary.en, /security/i);
  const examples = JSON.stringify(police.examples);
  for (const word of ['مراقبة', 'تحقيق', 'surveillance', 'biometric', 'patrol']) {
    assert.equal(examples.includes(word), false, word);
  }
});

test('two doors: one person, or one institution with its sectors', () => {
  assert.deepEqual(Object.keys(section.doors).sort(), ['individual', 'institution']);
  assert.equal(section.doors.individual.name.ar, 'لك أنت');
  assert.equal(section.doors.institution.name.ar, 'لمؤسستك');
  for (const door of Object.values(section.doors)) {
    for (const key of ['quote', 'quoteBy', 'consequence', 'for', 'body', 'meta']) assert.ok(door[key].ar && door[key].en, key);
    assert.match(door.quoteSource.url, /^https:\/\//);
    assert.match(door.quoteSource.title, /\d{4}/, 'the quote source carries its year');
  }
  for (const item of workshops) assert.ok(['individual', 'institution'].includes(item.kind), `${item.slug}: unknown door ${item.kind}`);
  assert.equal(workshops.filter(w => w.kind === 'individual').length, 1, 'one page behind the individual door');
  assert.equal(workshops.filter(w => w.kind === 'institution' && !w.institution).length, 1, 'one general page behind the institution door');
  assert.equal(section.institutionTypes.length, 12);
  const types = section.institutionTypes.map(type => type.id);
  for (const item of workshops.filter(w => w.kind === 'institution' && w.institution)) assert.ok(types.includes(item.institution), `${item.slug}: unknown sector ${item.institution}`);
  for (const id of types) assert.equal(workshops.filter(w => w.institution === id).length, 1, `one masterclass per sector: ${id}`);
  assert.equal(notHeld.test(JSON.stringify(section)), false, 'section: not-held or trial wording');
  for (const view of ['components/institution/workshops-view.tsx', 'components/institution/pages.tsx', 'components/institution/home-sections.tsx']) {
    assert.equal(notHeld.test(readFileSync(join(process.cwd(), view), 'utf8')), false, `${view}: not-held or trial wording`);
  }
});

test('the live section page is short: hero, two doors, founder, closing', () => {
  const live = section.live;
  assert.deepEqual(Object.keys(live.doorCards).sort(), ['individual', 'institution']);
  assert.ok(live.opening.length >= 3 && live.opening.every(line => line.ar && line.en), 'opening paragraphs');
  for (const key of ['title', 'lead']) assert.ok(live.independence[key].ar && live.independence[key].en, `independence.${key}`);
  assert.ok(live.independence.lines.length >= 2 && live.independence.lines.every(line => line.ar && line.en), 'independence lines');
  assert.ok(live.dependence.cards.length >= 3, 'documented cases of total dependence');
  for (const card of live.dependence.cards) {
    for (const key of ['date', 'title', 'body', 'lesson']) assert.ok(card[key].ar && card[key].en, `dependence.${key}`);
    assert.match(card.source.url, /^https:\/\//);
    assert.match(card.source.title, /\d{4}/, 'each case source carries its year');
  }
  assert.equal(live.closingLines.length, 3);
  assert.match(live.founderStatement.ar, /لبلادنا العربية/);
  assert.equal(live.howSteps.length, 3);
  assert.match(live.ctaPrimary.ar, /ماستركلاس خاصًا مع د\. أحمد عبدالعليم/);
  for (const gone of ['ideaLines', 'methodChain', 'institutionsLines', 'selfCheck', 'founderQuestions', 'heroTitle', 'heroCustom', 'leavesLabel', 'cardMeta']) assert.equal(gone in live, false, gone);
  const joined = JSON.stringify(live);
  for (const word of ['شهادة', 'شركاؤنا', 'عملاؤنا', '%', 'certified', 'قعدة']) assert.equal(joined.includes(word), false, word);
});

test('masterclass: the teacher leads, the introduction video has a slot, and the old wording is gone', () => {
  const live = section.live;
  assert.equal(live.instructor.ar, 'د. أحمد عبدالعليم');
  assert.equal(live.instructor.en, 'Dr. Ahmed Abdelalim');
  for (const key of ['teaches', 'cardTeacher', 'doorsLine', 'institutionPick']) assert.ok(live[key].ar && live[key].en, key);
  assert.equal(typeof live.trailer.video, 'string');
  assert.ok(live.trailer.label.ar);
  assert.equal('heroWith' in live, false);
  assert.equal(section.title.ar, 'ماستركلاس');
  for (const item of [section, ...workshops]) assert.equal(/ورشة|ورش |الورش|[Ww]orkshop/.test(JSON.stringify(item)), false, item.slug ?? 'section');
});

test('every sector page that shows shifts names them in its own words and sources each figure', () => {
  const sectors = ['customs-ports', 'finance-tax', 'justice-courts', 'education-schools', 'energy-utilities', 'municipalities', 'labour-civil-service'];
  for (const slug of sectors) assert.ok(workshops.find(w => w.slug === slug)?.shifts?.length >= 3, `${slug} needs at least three documented shifts`);
  const titles = new Set();
  for (const item of workshops.filter(w => w.shifts)) {
    assert.ok(item.shiftsTitle?.ar && item.shiftsTitle?.en, `${item.slug}: shiftsTitle`);
    assert.equal(titles.has(item.shiftsTitle.ar), false, `${item.slug}: the heading repeats another sector's`);
    titles.add(item.shiftsTitle.ar);
    for (const shift of item.shifts) {
      for (const key of ['figure', 'title', 'body']) assert.ok(shift[key].ar && shift[key].en, `${item.slug}: ${key}`);
      assert.match(shift.source.url, /^https:\/\//, `${item.slug}: source url`);
      assert.match(shift.source.title, /\d{4}/, `${item.slug}: the source title carries its year`);
    }
  }
});

test('the «لك أنت» page speaks to the leader: its own headings, how fast it moves, independence, sourced reasons', () => {
  const page = workshops.find(item => item.slug === 'leader-seat');
  assert.equal(page.kind, 'individual');
  // Dr. Ahmed (9 Oct 2026): address the owner or the leader first, not the employee, and show that it is moving fast.
  assert.match(page.audienceRole.ar, /صاحب المؤسسة وقائدها/);
  assert.match(section.doors.individual.for.ar, /صاحب المؤسسة وقائدها/);
  assert.ok(page.pace, 'the pace band');
  assert.ok(page.pace.quote.ar && page.pace.quoteBy.ar.match(/20\d\d/), 'a dated quote');
  assert.match(page.pace.quoteSource.url, /^https:\/\//);
  assert.ok(page.pace.consequence.ar, 'what happens to whoever waits');
  assert.ok(page.pace.cards.length >= 2);
  for (const card of page.pace.cards) assert.match(card.source.url, /^https:\/\//, card.title.en);
  const generic = ['لمن', 'لماذا الآن', 'كيف تمشي', 'قبلها', 'جواها', 'بعدها', 'بماذا تخرج', 'أسئلة قصيرة'];
  for (const key of ['forWhom', 'whyNow', 'how', 'before', 'during', 'after', 'leavesWith', 'faq']) {
    const heading = page.headings?.[key];
    assert.ok(heading?.ar && heading?.en, `heading ${key}`);
    assert.equal(generic.includes(heading.ar), false, `heading ${key} is still the generic one`);
  }
  assert.ok(page.cta?.ar && page.cta?.en, 'its own button');
  // Dr. Ahmed's most important point: we teach people to carry on by themselves.
  assert.match(page.after.ar, /بنفسك/);
  assert.match(page.after.ar, /لا تحتاجنا/);
  // The evidence carries the date its source shows.
  assert.match(page.source.title, /29 September 2026/);
  assert.match(page.whyEvidence.ar, /سبتمبر 2026/);
  const view = readFileSync(join(process.cwd(), 'components/institution/workshops-view.tsx'), 'utf8');
  assert.match(view, /workshop\.headings\?\.\[key\]/, 'the page reads its own headings');
});

import assert from 'node:assert/strict';
import {readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import test from 'node:test';

const dir = join(process.cwd(), 'content/workshops');
const files = readdirSync(dir).filter(name => name.endsWith('.json'));
const workshops = files.map(name => JSON.parse(readFileSync(join(dir, name), 'utf8')));
const section = JSON.parse(readFileSync(join(process.cwd(), 'content/workshop-section.json'), 'utf8'));

const unset = {en: '[To be set]', ar: '[تُحدَّد]'};
const status = {en: 'In design · No masterclass has been held', ar: 'قيد التصميم · لم يُعقد ماستركلاس بعد'};

test('fourteen designed masterclasses, none of them held', () => {
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
    assert.deepEqual(item.status, status);
    assert.deepEqual(item.format, unset);
    assert.deepEqual(item.duration, unset);
    assert.deepEqual(item.size, unset);
    assert.equal(item.questions.length, 5);
    assert.equal(item.source.url.startsWith('https://'), true);
    const joined = JSON.stringify(item);
    assert.equal(joined.includes('شهادة'), false);
    assert.equal(joined.includes('شعار'), false);
  }
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
  assert.deepEqual(section.status, status);
});

test('the live section page is short: hero, two doors, founder, closing', () => {
  const live = section.live;
  assert.deepEqual(Object.keys(live.doorCards).sort(), ['individual', 'institution']);
  assert.ok(live.opening.length >= 3 && live.opening.every(line => line.ar && line.en), 'opening paragraphs');
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
  assert.ok(live.trailer.label.ar && live.trailer.pending.ar);
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

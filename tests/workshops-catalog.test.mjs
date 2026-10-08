import assert from 'node:assert/strict';
import {readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import test from 'node:test';

const dir = join(process.cwd(), 'content/workshops');
const files = readdirSync(dir).filter(name => name.endsWith('.json'));
const workshops = files.map(name => JSON.parse(readFileSync(join(dir, name), 'utf8')));
const section = JSON.parse(readFileSync(join(process.cwd(), 'content/workshop-section.json'), 'utf8'));

const unset = {en: '[To be set]', ar: '[تُحدَّد]'};
const status = {en: 'In design · No workshop has been held', ar: 'قيد التصميم · لم تُعقد ورشة بعد'};

test('seven designed workshops, none of them held', () => {
  assert.equal(workshops.length, 7);
  assert.deepEqual(workshops.map(item => item.slug).sort(), [
    'airport-teams',
    'company-teams',
    'develop-the-institution',
    'hospital-administration',
    'leader-seat',
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

test('section doors keep the three fixed kinds', () => {
  assert.deepEqual(Object.keys(section.doors).sort(), ['development', 'institution', 'leader']);
  assert.equal(section.institutionTypes.length, 5);
  assert.deepEqual(section.status, status);
});

test('the live section page carries the approved copy and claims nothing that has not happened', () => {
  const live = section.live;
  assert.equal(live.ideaLines.length, 5);
  assert.equal(live.methodChain.length, 4);
  assert.equal(live.institutionsLines.length, 5);
  assert.equal(live.founderQuestions.length, 3);
  assert.equal(live.closingLines.length, 3);
  assert.deepEqual(Object.keys(live.doorCards).sort(), ['development', 'institution', 'leader']);
  assert.equal(section.doors.leader.name.ar, 'الإدارة والقيادة في عصر الذكاء الاصطناعي');
  assert.equal(section.doors.institution.name.ar, 'العمل مع الذكاء الاصطناعي');
  assert.equal(section.doors.development.name.ar, 'المؤسسة والذكاء الاصطناعي');
  const joined = JSON.stringify(live);
  for (const word of ['شهادة', 'شركاؤنا', 'عملاؤنا', '%', 'certified', 'our partners', 'our clients', 'قعدة']) {
    assert.equal(joined.includes(word), false, word);
  }
});

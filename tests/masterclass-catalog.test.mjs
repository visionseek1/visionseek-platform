import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import test from 'node:test';

const root = process.cwd();
const program = JSON.parse(readFileSync(join(root, 'content/masterclass/ai-in-leadership.json'), 'utf8'));
const office = JSON.parse(readFileSync(join(root, 'content/masterclass/leader-office.json'), 'utf8'));
const leader = JSON.parse(readFileSync(join(root, 'content/workshops/leader-seat.json'), 'utf8'));
const unset = {en: '[To be set]', ar: '[تُحدَّد]'};
const held = {en: 'In design · Not yet held', ar: 'قيد التصميم · لم يُعقد بعد'};

const texts = value => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(texts);
  if (value && typeof value === 'object') return Object.values(value).flatMap(texts);
  return [];
};

const visible = raw => texts(raw).filter(item => !item.startsWith('http'));

test('leader curriculum is written, the other seats are only a structure', () => {
  assert.deepEqual(program.status, held);
  assert.deepEqual(program.duration, unset);
  assert.deepEqual(program.price, unset);
  assert.equal(program.tracks.length, 3);
  const leaders = program.tracks.find(item => item.id === 'leaders');
  assert.equal(leaders.written, true);
  assert.equal(leaders.units.length >= 5 && leaders.units.length <= 7, true);
  assert.deepEqual(leaders.status, held);
  for (const unit of leaders.units) {
    for (const field of ['title', 'outcome', 'exercise', 'tool']) {
      assert.equal(unit[field].ar.length > 8, true, unit.id + field);
      assert.equal(unit[field].en.length > 8, true, unit.id + field);
    }
  }
  const arabic = leaders.units.map(unit => JSON.stringify(unit.title) + JSON.stringify(unit.outcome)).join('\n');
  for (const word of ['موجز', 'قرار', 'مراسل', 'اجتماع', 'الناس', 'لا نعتمد']) {
    assert.equal(arabic.includes(word), true, word);
  }
  for (const id of ['managers', 'staff']) {
    const track = program.tracks.find(item => item.id === id);
    assert.equal(track.written, false);
    assert.equal(track.status.ar, 'قريبًا');
    assert.equal(track.units.length >= 3, true);
    for (const unit of track.units) {
      assert.equal(unit.outcome.ar, '');
      assert.equal(unit.exercise.ar, '');
      assert.equal(unit.tool.ar, '');
    }
  }
});

test('every cited fact carries a link and the date printed on that page', () => {
  assert.equal(program.sources.length >= 4, true);
  for (const source of program.sources) {
    assert.equal(source.url.startsWith('https://'), true);
    assert.equal(source.date.ar.length > 4, true);
    assert.equal(source.date.en.length > 4, true);
    assert.equal(source.usedFor.ar.includes('أخذنا'), true);
  }
  const joined = JSON.stringify(program.sources);
  assert.equal(joined.includes('$'), false);
  assert.equal(joined.includes('£'), false);
});

test('the desk is an example, with no real institution and no real person', () => {
  assert.deepEqual(office.status, held);
  assert.equal(office.stamp.ar, 'مثال توضيحي');
  assert.deepEqual(office.pieces.map(item => item.id), ['brief', 'decision', 'reply']);
  const body = visible(office).join('\n');
  assert.equal(body.includes('مثال توضيحي'), true);
  for (const word of ['وزارة', 'جامعة', 'مستشفى', 'شهادة', 'شعار', '$', '£']) {
    assert.equal(body.includes(word), false, word);
  }
});

test('public copy names no country', () => {
  const body = [...visible(program), ...visible(office), ...visible(leader)].join('\n');
  for (const word of ['مصر', 'كوريا', 'الإمارات', 'دبي', 'أمريكا', 'بريطانيا', 'السعودية', 'Egypt', 'Korea', 'Dubai', 'UAE', 'Oxford']) {
    assert.equal(body.includes(word), false, word);
  }
});

test('the live seat leaves duration and price unset, and names the thirty-day report', () => {
  assert.deepEqual(leader.price, unset);
  assert.deepEqual(leader.duration, unset);
  assert.equal(leader.after.ar.includes('ثلاثين'), true);
  assert.equal(leader.after.ar.includes('تقرير'), true);
  assert.equal(leader.after.en.toLowerCase().includes('report'), true);
});

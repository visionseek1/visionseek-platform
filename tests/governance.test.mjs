import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

const read = name => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const data = JSON.parse(read('content/governance.json'));
const flat = JSON.stringify(data);

test('governance copy stays bilingual and keeps the sourced figures only', () => {
  const walk = value => {
    if (!value || typeof value !== 'object') return;
    if ('en' in value && 'ar' in value) {
      assert.equal(typeof value.en, 'string');
      assert.equal(typeof value.ar, 'string');
      assert.ok(value.en.trim() && value.ar.trim(), JSON.stringify(value).slice(0, 80));
    }
    for (const child of Object.values(value)) walk(child);
  };
  walk(data);
  assert.equal(data.workshop.slug, 'single-track-trap');
  assert.equal(data.workshop.instructor.en, 'Ahmed Abdelalim');
  assert.equal(data.workshop.exercise.minutes, 15);
  assert.equal(data.workshop.simulation.approaches.length, 5);
  assert.equal(data.workshop.simulation.reveal.ar, 'اكشف البدائل');
  for (const figure of ['5,000', '812.02', '97,587', '440']) assert.ok(flat.includes(figure), figure);
  assert.equal(data.workshop.evidence.length, 5);
  for (const item of data.workshop.evidence) assert.match(item.source.url, /^https:\/\//);
  assert.equal(data.section.empty.ar, 'الورش التالية: لا يوجد بعد.');
});

test('unsourced claims, prices, and insight L-002 stay off the governance page', () => {
  assert.doesNotMatch(flat, /anchoring|تثبيت|HLO|L-002|l-002|\bDr\.|دكتوراه|\bprice\b|سعر/i);
  assert.doesNotMatch(flat, /insights\/notes/);
  const simulation = read('components/governance/simulation.tsx');
  assert.doesNotMatch(simulation, /fetch\(|localStorage|sessionStorage|indexedDB/);
  assert.match(read('components/governance/document-locale.tsx'), /documentElement/);
  assert.match(read('app/sitemap.ts'), /\/governance\/single-track-trap/);
  assert.match(read('public/admin/config.yml'), /content\/governance\.json/);
  const pages = [
    'app/governance/page.tsx',
    'app/governance/single-track-trap/page.tsx',
    'app/ar/governance/page.tsx',
    'app/ar/governance/single-track-trap/page.tsx',
  ];
  for (const page of pages) assert.match(read(page), /governance/);
});

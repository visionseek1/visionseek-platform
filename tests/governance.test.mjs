import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
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
  assert.equal(data.workshop.instructorShort.en, 'Ahmed Abdelalim');
  assert.equal(data.workshop.instructorShort.ar, 'د. أحمد');
  assert.equal(data.workshop.subscribe.en, 'Subscribe');
  assert.equal(data.workshop.subscribe.ar, 'اشترك');
  assert.ok(data.workshop.topics.length >= 4 && data.workshop.topics.length <= 6);
  assert.equal(data.workshop.exercise.minutes, 15);
  assert.equal(data.workshop.simulation.approaches.length, 5);
  assert.equal(data.workshop.simulation.reveal.ar, 'اكشف البدائل');
  for (const figure of ['5,000', '812.02', '97,587', '440']) assert.ok(flat.includes(figure), figure);
  assert.equal(data.workshop.evidence.length, 5);
  for (const item of data.workshop.evidence) assert.match(item.source.url, /^https:\/\//);
  assert.equal(data.section.empty.ar, 'الورش التالية: لا يوجد بعد.');
});

test('the course sits under masterclass, the old section is gone, and enrollment is one href', () => {
  assert.doesNotMatch(flat, /anchoring|تثبيت|HLO|L-002|l-002|\bDr\.|دكتوراه|\bprice\b|سعر/i);
  assert.doesNotMatch(flat, /insights\/notes/);
  const simulation = read('components/governance/simulation.tsx');
  assert.doesNotMatch(simulation, /fetch\(|localStorage|sessionStorage|indexedDB/);
  const course = read('components/governance/course.tsx');
  assert.doesNotMatch(course, /Simulation|اكشف البدائل|workshop\.evidence|workshop\.stations/);
  assert.match(course, /enrollHref/);
  assert.match(course, /workshop\.blurb/);
  assert.doesNotMatch(course, /workshop\.topics|topicsLabel|course-topics|المحاور/);
  assert.match(course, /workshop\.instructorShort/);
  const lib = read('lib/governance.ts');
  assert.match(lib, /export const ENROLL_HREF = '\/start'/);
  assert.match(lib, /\/masterclass\/\$\{workshop\.slug\}/);
  assert.match(read('components/governance/document-locale.tsx'), /documentElement/);
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /\/masterclass\/single-track-trap/);
  assert.doesNotMatch(sitemap, /['"`]\/governance/);
  assert.doesNotMatch(sitemap, /\/ar\/governance/);
  const admin = read('public/admin/config.yml');
  assert.match(admin, /content\/governance\.json/);
  assert.match(admin, /ar\/masterclass\/single-track-trap/);
  assert.doesNotMatch(admin, /value: "\/governance"/);
  const nav = JSON.parse(read('content/navigation.json'));
  assert.equal(nav.sections.some(section => section.path === '/governance'), false);
  for (const section of [...nav.sections, nav.reports]) {
    for (const link of section.children) assert.equal(link.href.split('#')[0].startsWith('/governance'), false, link.href);
  }
  const pages = [
    'app/masterclass/single-track-trap/page.tsx',
    'app/ar/masterclass/single-track-trap/page.tsx',
  ];
  for (const page of pages) {
    const source = read(page);
    assert.match(source, /coursePath/);
    assert.match(source, /MasterclassPage/);
  }
  for (const gone of [
    'app/governance/page.tsx',
    'app/governance/single-track-trap/page.tsx',
    'app/ar/governance/page.tsx',
    'app/ar/governance/single-track-trap/page.tsx',
  ]) assert.equal(existsSync(new URL(`../${gone}`, import.meta.url)), false, gone);
  const redirects = read('next.config.ts');
  assert.match(redirects, /source: '\/governance\/single-track-trap', destination: '\/masterclass\/single-track-trap'/);
  assert.match(redirects, /source: '\/ar\/governance\/single-track-trap', destination: '\/ar\/masterclass\/single-track-trap'/);
  assert.match(redirects, /source: '\/governance', destination: '\/masterclass'/);
  assert.match(redirects, /source: '\/ar\/governance', destination: '\/ar\/masterclass'/);
  assert.match(read('components/institution/workshops-view.tsx'), /vs-wl-course-card/);
  assert.match(read('components/institution/workshops-view.tsx'), /coursePath/);
});

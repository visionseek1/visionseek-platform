import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const about = JSON.parse(read('content/about.json'));
const page = read('components/capability/about-studio.tsx');
const nav = read('components/capability/navigation.tsx');

test('the about studio is the short umbrella: five equal doors, three principles, no workshops', () => {
  const items = about.studio.offerings.items;
  assert.deepEqual(items.map(item => item.id), ['programs', 'korea-gate', 'embedded', 'research', 'partnerships']);
  assert.deepEqual(items.map(item => item.links.map(link => link.href)), [
    ['/programs'],
    ['/korean-solutions'],
    ['/method'],
    ['/research', '/reports'],
    ['/work-with-us'],
  ]);
  assert.equal(about.studio.principles.items.length, 3);
  assert.equal(about.studio.next.href, '/start');
  assert.equal(about.studio.founder.line.en, 'Founded by Ahmed Abdelalim, Founder and Chief Capability Architect.');
  assert.match(about.studio.founder.line.ar, /أسّسها أحمد عبدالعليم، المؤسس وكبير مهندسي القدرات/);
  const banned = /ورش القادة|ورش القيادات|Executive Workshops|باحث|مستثمر|researcher|investor|\bDr\.?\b|HLO|Nine Star|منشور|accreditation|اعتماد/;
  assert.doesNotMatch(JSON.stringify(about.studio), banned);
  assert.doesNotMatch(about.founder.bio.en, /researcher|investor|\bDr\.?\b/);
  assert.doesNotMatch(about.founder.bio.ar, /باحث|مستثمر/);
  assert.doesNotMatch(page, /Image|ahmed-abdelalim|ورش/);
  assert.match(page, /id="founder"/);
  assert.match(page, /id="what-we-do"/);
});

test('the founder role stays on the about page, not in the header bar', () => {
  assert.match(about.studio.founder.line.ar, /كبير مهندسي القدرات/);
  assert.match(about.studio.founder.line.en, /Chief Capability Architect/);
  assert.doesNotMatch(nav, /كبير مهندسي القدرات|Chief Capability Architect/);
  assert.doesNotMatch(nav, /مهندس القدرات المؤسسية|INSTITUTIONAL CAPABILITY ARCHITECT/);
  assert.match(nav, /منهجنا/);
  assert.match(nav, /تواصل/);
  assert.match(nav, /Our Method/);
  assert.match(nav, /Contact/);
});

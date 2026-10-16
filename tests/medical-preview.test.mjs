import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const json = path => JSON.parse(read(path));

const pages = [
  'app/fields/page.tsx',
  'app/ar/fields/page.tsx',
  'app/sectors/[slug]/page.tsx',
  'app/ar/sectors/[slug]/page.tsx',
  'app/education/page.tsx',
  'app/ar/education/page.tsx',
  'app/system/page.tsx',
  'app/ar/system/page.tsx',
];

test('healthcare preview: six sectors, three focus fields, eight coming later, both languages', () => {
  const data = json('content/medical.json');
  assert.deepEqual(data.sectors.map(sector => sector.slug), ['hospitals', 'pharma', 'pharmacies', 'insurance', 'government', 'research']);
  assert.equal(data.sectors.length, 6);
  const focus = data.fields.filter(field => field.focus);
  const later = data.fields.filter(field => !field.focus);
  assert.deepEqual(focus.map(field => field.id), ['radiology', 'diagnosis', 'drugs']);
  assert.deepEqual(later.map(field => field.id), ['labs', 'therapy', 'remote', 'operations', 'revenue', 'public-health', 'genomics', 'experience']);
  assert.equal(data.fieldsPage.soon.en, 'Coming soon');
  assert.equal(data.fieldsPage.soon.ar, 'قريبًا');
  assert.equal(data.work.steps.map(step => step.id).join(','), 'education,study,operation');
  assert.deepEqual(data.work.steps.map(step => step.href), ['/education', '/system#study', '/system#operation']);
  assert.equal(data.identity.title.en, 'VisionSeek specializes in the medical field.');
  assert.match(data.identity.problem.en, /build, what to buy, what to transfer/);
  assert.equal(data.education.formats.length, 3);
  assert.equal(data.system.general.map(step => step.id).join(','), 'study,operation,measure');
  assert.match(data.session.text.ar, /أكتوبر/);
  assert.match(data.session.text.en, /October to December 2026/);
  assert.match(data.insightsBlock.future.en, /future source|next capabilities/i);
  const known = new Set(data.fields.map(field => field.id));
  for (const sector of data.sectors) {
    assert.ok(sector.problem.en && sector.problem.ar, sector.slug);
    assert.ok(sector.title.en && sector.title.ar, sector.slug);
    for (const id of ['radiology', 'diagnosis', 'drugs']) assert.ok(sector.fieldIds.includes(id), `${sector.slug} ${id}`);
    for (const id of sector.fieldIds) assert.ok(known.has(id), id);
  }
  for (const page of pages) assert.ok(existsSync(new URL(`../${page}`, import.meta.url)), page);
});

test('new routes are in the sitemap, and the top nav is not the way in', () => {
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /\/fields/);
  assert.match(sitemap, /\/education/);
  assert.match(sitemap, /\/system/);
  assert.match(sitemap, /medical\.sectors/);
  const nav = json('content/navigation.json');
  const paths = nav.sections.map(section => section.path);
  assert.ok(!paths.includes('/fields'));
  assert.ok(!paths.includes('/sectors'));
  assert.match(read('components/home-page.tsx'), /home\.sectors/);
  assert.match(read('components/home-page.tsx'), /home\.identity/);
  assert.ok(!json('content/navigation.json').sections.some(section => ['/education', '/system', '/fields'].includes(section.path)));
  assert.match(read('components/home-page.tsx'), /WhoWeWorkWith/);
  assert.match(read('lib/page-blocks.json'), /home\.sectors/);
});

test('Insights for a sector come only from tags, and none are tagged today', () => {
  const insights = json('content/insights.json');
  const tagged = [];
  const walk = value => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (value && typeof value === 'object') {
      if (Array.isArray(value.tags) && value.tags.length) tagged.push(value.tags);
      Object.values(value).forEach(walk);
    }
  };
  walk(insights);
  assert.equal(tagged.length, 0);
  const source = read('lib/medical.ts');
  assert.match(source, /tagsOf/);
  assert.match(source, /Untagged items are not guessed/);
  assert.equal(json('content/medical.json').insightsBlock.empty.ar, 'لا يوجد بعد.');
  assert.equal(json('content/medical.json').insightsBlock.empty.en, 'Nothing here yet.');
});

test('the preview copy has no prices, no HLO, and does not call Ahmed a doctor in English', () => {
  const files = [
    'content/medical.json',
    'components/medical/pages.tsx',
    'components/medical/who.tsx',
    'components/medical/identity.tsx',
    'lib/medical.ts',
    'app/fields/page.tsx',
    'app/ar/fields/page.tsx',
    'app/sectors/[slug]/page.tsx',
    'app/ar/sectors/[slug]/page.tsx',
  ];
  const blob = files.map(read).join('\n');
  const copy = read('content/medical.json');
  assert.doesNotMatch(blob, /\bHLO\b|Highest Level One|Palantir|عشر سنوات|strongest institution/i);
  assert.doesNotMatch(copy, /دكتور|doctorate|\bPhD\b|\$|€|£|سعر|جنيه|دولار|\bUSD\b|\bEGP\b/i);
  assert.doesNotMatch(blob, /\bDr\.?\s/);
  assert.match(blob, /د\. أحمد/);
  assert.match(blob, /Ahmed Abdelalim/);
  assert.equal(json('content/medical.json').session.button.en, 'Book the session with Ahmed Abdelalim');
  assert.match(json('content/medical.json').session.button.ar, /د\. أحمد/);
  assert.match(read('components/medical/pages.tsx'), /href=\{`\$\{p\}\/start`\}/);
});

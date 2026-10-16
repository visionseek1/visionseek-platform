import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const read = path => readFileSync(path, 'utf8');

test('home directions are noindex previews and stay out of the sitemap', () => {
  for (const path of [
    'app/preview/home-a/page.tsx',
    'app/ar/preview/home-a/page.tsx',
  ]) {
    assert.match(read(path), /index:\s*false/);
    assert.match(read(path), /follow:\s*false/);
  }
  assert.doesNotMatch(read('app/sitemap.ts'), /\/preview\/home-/);
});

test('the two home directions keep the medical sentence and drop prices, stars, and doctorate claims', () => {
  const copy = read('content/home-directions.json');
  const view = read('components/preview/home-direction.tsx') + read('components/preview/fields-map.tsx') + read('components/preview/direction.module.css');
  assert.match(copy, /تبني، تشتري، تنقل، ولا تشارك/);
  assert.match(copy, /Build, buy, transfer, or partner/);
  assert.match(copy, /د\. أحمد/);
  assert.match(copy, /Ahmed Abdelalim/);
  assert.match(copy, /أكتوبر/);
  assert.match(copy, /October to December 2026/);
  assert.doesNotMatch(copy + view, /⭐|Palantir|Highest Level One|\bHLO\b|عشر سنوات|strongest institution/i);
  assert.doesNotMatch(copy, /دكتور|doctorate|\bPhD\b|\$|€|£|سعر|جنيه|دولار|\bUSD\b|\bEGP\b|\bDr\.?\s/i);
  assert.doesNotMatch(view, /\bDr\.?\s/);
  assert.match(read('components/preview/direction.module.css'), /#0c554f/);
  assert.match(read('components/preview/direction.module.css'), /#0c1b33/);
  assert.match(read('app/page.tsx'), /HomeDirection/);
  assert.doesNotMatch(read('app/sitemap.ts'), /home-b/);
  assert.equal(existsSync('app/preview/home-b/page.tsx'), false);
  assert.equal(existsSync('app/ar/preview/home-b/page.tsx'), false);
});

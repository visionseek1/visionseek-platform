import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const read = path => readFileSync(path, 'utf8');

test('the home is the live page, and the direction previews are gone', () => {
  assert.match(read('app/page.tsx'), /HomePage/);
  assert.match(read('app/ar/page.tsx'), /HomePage/);
  assert.doesNotMatch(read('app/page.tsx'), /HomeDirection/);
  assert.doesNotMatch(read('app/sitemap.ts'), /\/preview\/home-/);
  for (const path of [
    'app/preview/home-a/page.tsx',
    'app/preview/home-b/page.tsx',
    'app/ar/preview/home-a/page.tsx',
    'app/ar/preview/home-b/page.tsx',
    'app/ar/preview/home-old/page.tsx',
  ]) {
    assert.equal(existsSync(path), false, path);
  }
});

test('medical pages use the live shell and carry no prices, stars, or doctorate claims', () => {
  const copy = read('content/medical.json');
  const view = read('components/medical/pages.tsx') + read('components/medical/who.tsx') + read('components/medical/identity.tsx');
  assert.match(view, /CapabilityHeader/);
  assert.match(view, /vs-site/);
  assert.match(copy, /د\. أحمد/);
  assert.match(copy, /Ahmed Abdelalim/);
  assert.match(copy, /أكتوبر/);
  assert.doesNotMatch(copy + view, /⭐|Palantir|Highest Level One|\bHLO\b|عشر سنوات|strongest institution/i);
  assert.doesNotMatch(copy, /دكتور|doctorate|\bPhD\b|\$|€|£|سعر|جنيه|دولار|\bUSD\b|\bEGP\b|\bDr\.?\s/i);
  assert.doesNotMatch(view, /\bDr\.?\s/);
});

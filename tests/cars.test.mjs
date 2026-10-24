import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const read = f => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
const json = f => JSON.parse(read(f));

test('cars pages, catalog and admin collection are gone', () => {
  for (const f of [
    'app/cars/page.tsx', 'app/ar/cars/page.tsx',
    'app/cars/[slug]/page.tsx', 'app/ar/cars/[slug]/page.tsx',
    'components/cars/pages.tsx', 'lib/cars.ts', 'content/cars.json',
  ]) {
    assert.equal(existsSync(new URL(`../${f}`, import.meta.url)), false, f);
  }
  const admin = read('public/admin/config.yml');
  assert.doesNotMatch(admin, /file: content\/cars\.json/);
  assert.doesNotMatch(admin, /name: cars/);
  assert.doesNotMatch(admin, /value: "\/cars"/);
  assert.doesNotMatch(read('app/sitemap.ts'), /path: '\/cars'/);
});

test('old cars URLs redirect home in both languages (308)', () => {
  const redirects = read('next.config.ts');
  assert.match(redirects, /source: `\$\{prefix\}\/cars`, destination: `\$\{prefix \|\| '\/'\}`, permanent: true/);
  assert.match(redirects, /source: `\$\{prefix\}\/cars\/:path\*`, destination: `\$\{prefix \|\| '\/'\}`, permanent: true/);
});

test('cars is out of the Korean Solutions menu, the hub and the request categories', () => {
  const nav = json('content/navigation.json').sections[0];
  assert.equal(nav.path, '/korean-solutions');
  assert.equal(nav.children.some(c => c.href === '/cars' || /هايبرد|Hybrid|EV cars/i.test(`${c.ar} ${c.en}`)), false);
  const pages = read('components/korean-solutions/pages.tsx');
  assert.doesNotMatch(pages, /\/cars/);
  assert.doesNotMatch(pages, /سيارات هايبرد|Hybrid and electric cars/);
  assert.doesNotMatch(read('lib/korean-solutions-copy.ts'), /href: '\/cars'/);
});

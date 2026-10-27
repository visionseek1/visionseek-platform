import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {chooseCollapsed, headerCollapseKey, HEADER_COLLAPSE_DEFAULT, HEADER_COLLAPSE_ORDER} from '../lib/institution/header-fit.ts';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const nav = read('components/capability/navigation.tsx');
const css = read('app/institution.css');
const paths = ['/korean-solutions', '/projects', '/programs', '/institute', '/reports', '/research', '/news', '/indices', '/conferences', '/work-with-us', '/about'];

test('the header utility bar keeps the method and contact links and drops the founder role', () => {
  assert.doesNotMatch(nav, /كبير مهندسي القدرات|Chief Capability Architect/);
  assert.match(nav, /منهجنا/);
  assert.match(nav, /تواصل/);
  assert.match(nav, /Our Method/);
  assert.match(nav, /Contact/);
  assert.match(nav, /isArchived\(["']\/method["']\)/);
  assert.match(nav, /isArchived\(["']\/leaders-house["']\)/);
});

test('every header destination stays reachable from the bar, the more menu, and the mobile menu', () => {
  assert.match(nav, /المزيد/);
  assert.match(nav, /More/);
  assert.match(nav, /institutionNav\.map/);
  assert.match(nav, /collapsedSections/);
  assert.match(nav, /visibleSections/);
  assert.match(nav, /قائمة الهاتف/);
  assert.match(nav, /Mobile navigation/);
  assert.match(nav, /ابنِ حلولك معنا/);
  assert.match(nav, /Build your solutions with us/);
  assert.match(nav, /hrefLang=\{ar \? "en" : "ar"\}/);
  for (const path of HEADER_COLLAPSE_ORDER) assert.match(read('lib/institution/header-fit.ts'), new RegExp(path.replace('/', '\\/')));
});

test('the desktop row stays one line until the phone breakpoint', () => {
  assert.match(css, /@media \(max-width: 1023px\)/);
  assert.match(css, /\.vs-expanded-header \.vs-desktop-nav\{display:none\}/);
  assert.doesNotMatch(css, /max-width:1440px\)\{\.vs-expanded-header \.vs-desktop-nav\{display:none\}/);
  assert.doesNotMatch(css, /vs-expanded-header \.vs-desktop-nav\{flex-wrap:wrap/);
  assert.match(css, /flex-wrap:nowrap/);
  assert.match(css, /--vs-header-block:7\.25rem/);
});

test('secondary sections collapse before primary ones, and none are dropped', () => {
  const widths = new Map(paths.map(path => [path, path === '/institute' || path === '/korean-solutions' || path === '/about' ? 150 : 80]));
  const tight = chooseCollapsed(paths, widths, 760, 16, 70);
  assert.ok(tight);
  assert.equal(new Set([...tight, ...paths.filter(path => !tight.has(path))]).size, paths.length);
  assert.equal([...tight].every(path => paths.includes(path)), true);
  for (const path of ['/conferences', '/indices', '/news', '/reports']) assert.equal(tight.has(path), true, path);
  assert.equal(tight.has('/projects'), false);
  assert.equal(tight.has('/programs'), false);
  assert.equal(tight.has('/korean-solutions'), false);

  const wide = chooseCollapsed(paths, widths, 4000, 16, 70);
  assert.equal(wide?.size, 0);

  const unread = chooseCollapsed(paths, new Map([['/projects', 80]]), 1000, 16, 70);
  assert.equal(unread, null);
  assert.equal(headerCollapseKey(HEADER_COLLAPSE_DEFAULT), '/conferences|/indices|/institute|/news|/reports|/research');
});

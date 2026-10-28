import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {chooseCollapsed, headerCollapseKey, HEADER_COLLAPSE_DEFAULT, HEADER_COLLAPSE_ORDER} from '../lib/institution/header-fit.ts';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const nav = read('components/capability/navigation.tsx');
const copy = read('lib/public-site.ts');
const css = read('app/institution.css');
const paths = ['/about', '/frameworks', '/observatory', '/executive-masterclass', '/standards', '/diagnostic', '/pillars'];

test('the header carries the institution line, the three languages, and the readiness CTA', () => {
  assert.doesNotMatch(nav, /كبير مهندسي القدرات|Chief Capability Architect/);
  assert.doesNotMatch(nav, /ابنِ حلولك معنا|Build your solutions with us/);
  assert.doesNotMatch(nav, /Korean Solutions|حلول من كوريا|Aegis|Apex|Clause|Relay/);
  assert.match(nav, /tx\(locale, hq\)/);
  assert.match(nav, /tx\(locale, assessCta\)/);
  assert.match(copy, /سول، كوريا الجنوبية · نعمل عالمياً عبر آسيا والعالم العربي/);
  assert.match(copy, /Seoul, South Korea · Operating globally across Asia and the Arab World/);
  assert.match(copy, /대한민국 서울 · 아시아 및 아랍권 전역에서 글로벌 운영/);
  assert.match(copy, /افحص جاهزية مؤسستك/);
  assert.match(copy, /Assess Your Institution/);
  assert.match(copy, /기관의 준비도를 진단하십시오/);
  assert.match(nav, /label: "KR"/);
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
  assert.match(nav, /hrefLang=\{language\.hrefLang\}/);
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
  const widths = new Map(paths.map(path => [path, path === '/about' || path === '/executive-masterclass' ? 150 : 80]));
  const tight = chooseCollapsed(paths, widths, 520, 16, 70);
  assert.ok(tight);
  assert.equal(new Set([...tight, ...paths.filter(path => !tight.has(path))]).size, paths.length);
  assert.equal([...tight].every(path => paths.includes(path)), true);
  for (const path of ['/about', '/frameworks', '/observatory', '/executive-masterclass']) assert.equal(tight.has(path), true, path);
  assert.equal(tight.has('/pillars'), false);
  assert.equal(tight.has('/standards'), false);

  const wide = chooseCollapsed(paths, widths, 4000, 16, 70);
  assert.equal(wide?.size, 0);

  const unread = chooseCollapsed(paths, new Map([['/pillars', 80]]), 1000, 16, 70);
  assert.equal(unread, null);
  assert.equal(headerCollapseKey(HEADER_COLLAPSE_DEFAULT), '/about|/executive-masterclass|/frameworks|/observatory');
});

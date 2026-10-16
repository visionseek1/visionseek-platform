import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve('.next/server/app');

/** Same rule as lib/visibility.ts: an archived path, and everything under it, leaves the public site. */
function clean(href) {
  let route = (href.split('#')[0].split('?')[0] || '/');
  if (route === '/ar' || route.startsWith('/ar/')) route = route.slice(3) || '/';
  if (route.length > 1 && route.endsWith('/')) route = route.slice(0, -1);
  return route || '/';
}

function isArchived(href, archivedPaths) {
  if (!href.startsWith('/')) return false;
  const route = clean(href);
  return archivedPaths.some(archived => route === archived || route.startsWith(`${archived}/`));
}

/** Permanent redirects from next.config.ts. The archive redirect in proxy.ts is not one of these: it sends the visitor home. */
function followRedirects(pathname) {
  const rules = [
    [/^((?:\/ar)?)\/projects\/egypt-lng-supply$/, '$1/projects/energy/lng/sovereign-floating-gas-supply'],
    [/^((?:\/ar)?)\/projects\/gulf-lng-fleet$/, '$1/projects/energy/lng/second-lng-containment-standard'],
    [/^((?:\/ar)?)\/workshops$/, '$1/masterclass'],
    [/^((?:\/ar)?)\/workshops\/([^/]+)$/, '$1/masterclass/$2'],
    [/^((?:\/ar)?)\/insights\/research\/half-the-picture$/, '$1/insights/reports/half-the-picture'],
    [/^\/en\/(.+)$/, '/$1'],
  ];
  let current = pathname;
  for (let hop = 0; hop < 5; hop += 1) {
    const next = rules.reduce((pathName, [pattern, replacement]) => pathName.replace(pattern, replacement), current);
    if (next === current) return current;
    current = next;
  }
  return current;
}

function routeOf(rel) {
  const route = rel === 'index' ? '/' : `/${rel}`;
  return route.endsWith('/index') ? route.slice(0, -'/index'.length) || '/' : route;
}

function textOf(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Public pages are built HTML that the archive does not send home.
 * A link is broken when its target is missing, or when it still resolves only because
 * the archive redirects that path to the home page.
 */
function isPublicFile(pathname) {
  if (!pathname.startsWith('/') || pathname.includes('..') || pathname.endsWith('/')) return false;
  return existsSync(path.join(process.cwd(), 'public', pathname));
}

export function brokenInternalLinks(html, archivedPaths, pages = [...html.keys()], fileExists = isPublicFile) {
  const failures = [];
  const skip = route => route.startsWith('/admin') || route.startsWith('/ops') || route.startsWith('/room') || route.startsWith('/api');
  for (const route of pages) {
    if (skip(route) || isArchived(route, archivedPaths) || !html.has(route)) continue;
    const body = html.get(route);
    for (const match of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
      const hrefMatch = match[1].match(/\bhref="([^"]*)"/);
      if (!hrefMatch) continue;
      const raw = hrefMatch[1].replaceAll('&amp;', '&');
      if (!raw || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) continue;
      if (/^[a-z]+:/i.test(raw) && !raw.startsWith('/')) continue;
      let url;
      try { url = new URL(raw, `https://visionseek.org${route === '/' ? '' : route}`); }
      catch { failures.push(`${route}: unreadable href ${raw}`); continue; }
      if (url.origin !== 'https://visionseek.org') continue;
      const target = followRedirects(url.pathname.replace(/\/$/, '') || '/');
      const label = textOf(match[2]).slice(0, 80) || '(no text)';
      if (isArchived(target, archivedPaths)) {
        failures.push(`${route}: «${label}» → ${raw} (archived; opens the home page)`);
        continue;
      }
      if (!html.has(target) && !fileExists(target)) {
        failures.push(`${route}: «${label}» → ${raw} (no page)`);
        continue;
      }
      if (!html.has(target)) continue;
      if (url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        if (id && !html.get(target).includes(`id="${id}"`)) failures.push(`${route}: «${label}» → ${raw} (missing #${id})`);
      }
    }
  }
  return [...new Set(failures)];
}

test('the link check fails on an archived target, a missing page, and a missing anchor', () => {
  const html = new Map([
    ['/', '<a href="/programs/ideas">كل البرامج</a><a href="/about">About</a><a href="/missing">Nope</a><a href="/about#founder">Founder</a><a href="/about#gone">Gone</a>'],
    ['/about', '<section id="founder"></section>'],
    ['/programs/ideas', '<p>still built, but archived</p>'],
  ]);
  const failures = brokenInternalLinks(html, ['/programs'], ['/']);
  assert.ok(failures.some(item => item.includes('/programs/ideas') && item.includes('كل البرامج')), failures.join('\n'));
  assert.ok(failures.some(item => item.includes('/missing')), failures.join('\n'));
  assert.ok(failures.some(item => item.includes('#gone')), failures.join('\n'));
  assert.equal(failures.filter(item => item.includes('href="/about"') || item.includes('→ /about (')).length, 0, failures.join('\n'));
  assert.equal(failures.filter(item => item.includes('#founder')).length, 0, failures.join('\n'));
});

test('public pages do not link to archived or missing routes', async () => {
  const visibility = JSON.parse(await readFile(new URL('../content/visibility.json', import.meta.url), 'utf8'));
  const archivedPaths = visibility.archived.map(item => clean(item.path));
  const html = new Map();
  const files = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, {withFileTypes: true})) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith('.html')) files.push(full);
    }
  }
  await walk(root);
  for (const file of files) {
    const rel = path.relative(root, file).replaceAll(path.sep, '/').replace(/\.html$/, '');
    html.set(routeOf(rel), await readFile(file, 'utf8'));
  }
  assert.ok(html.has('/') && html.has('/ar') && html.has('/start') && html.has('/ar/start'), 'the public home and start pages were not built');
  const failures = brokenInternalLinks(html, archivedPaths);
  assert.deepEqual(failures, []);

  for (const [route, sentence] of [['/start', 'Prepare a concept note'], ['/ar/start', 'جهّز مذكرة تصور']]) {
    const page = html.get(route);
    assert.ok(page.includes(sentence), `${route} dropped the concept-note sentence`);
    assert.equal(page.includes('/work-with-us/prepare-a-concept'), false, `${route} still links to the archived concept note`);
  }
});

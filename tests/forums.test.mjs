import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import test from 'node:test';

const root = process.cwd();
const forums = JSON.parse(readFileSync(join(root, 'content/forums.json'), 'utf8'));
const isText = value => value && typeof value.en === 'string' && typeof value.ar === 'string' && value.en.trim() && value.ar.trim();
const invented = ['date', 'venue', 'speakers', 'partners', 'sponsors', 'location', 'when'];

test('forums.json is bilingual and ready for more entries', () => {
  assert.ok(isText(forums.page.title));
  assert.equal(forums.page.title.ar, 'المؤتمرات والمنتديات');
  assert.equal(forums.page.title.en, 'Conferences & Forums');
  assert.match(forums.page.status.ar, /قريبًا/);
  assert.match(forums.page.status.en, /Coming soon/);
  assert.match(forums.page.status.ar, /دعوة/);
  assert.match(forums.page.status.en, /invitation/i);
  assert.ok(Array.isArray(forums.forums) && forums.forums.length >= 1);
});

test('the first forum is the Incheon Dialogue, with no invented facts', () => {
  const first = forums.forums[0];
  assert.equal(first.slug, 'incheon-dialogue');
  assert.equal(first.title.ar, 'حوار إنتشون');
  assert.equal(first.title.en, 'Incheon Dialogue');
  for (const key of ['title', 'kicker', 'status', 'standfirst', 'what', 'who', 'why', 'index']) {
    assert.ok(isText(first[key]), key);
  }
  for (const key of invented) {
    assert.equal(first[key], undefined, `do not invent ${key}`);
  }
  assert.match(first.status.en, /invitation/i);
  assert.match(first.what.en, /Munich Security Conference/);
  assert.match(first.index.ar, /مؤشر القدرة التكنولوجية العربية/);
  assert.match(first.index.en, /Arab Technology Capability Index/);
  assert.match(forums.labels.host.en, /Ahmed Abdelalim/);
  assert.doesNotMatch(forums.labels.host.en, /\bDr\.?\b/);
  assert.ok(first.invite && isText(first.invite.label));
});

test('the forums routes and admin collection exist', () => {
  for (const path of ['app/forums/page.tsx', 'app/ar/forums/page.tsx', 'components/forums/pages.tsx', 'lib/forums.ts']) {
    assert.ok(readFileSync(join(root, path), 'utf8').length, path);
  }
  const config = readFileSync(join(root, 'public/admin/config.yml'), 'utf8');
  assert.match(config, /name: forums/);
  assert.match(config, /file: content\/forums\.json/);
  const sitemap = readFileSync(join(root, 'app/sitemap.ts'), 'utf8');
  assert.match(sitemap, /\/forums/);
  assert.match(sitemap, /\/ar\/forums/);
  const nav = readFileSync(join(root, 'content/navigation.json'), 'utf8');
  assert.doesNotMatch(nav, /\/forums/);
});

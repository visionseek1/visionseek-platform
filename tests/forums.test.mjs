import assert from 'node:assert/strict';
import {readFileSync, statSync} from 'node:fs';
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
  assert.match(forums.page.status.en, /coming soon/i);
  assert.match(forums.page.status.ar, /دعوة/);
  assert.match(forums.page.status.en, /invitation/i);
  assert.ok(Array.isArray(forums.forums) && forums.forums.length >= 1);
});

test('the first forum is the Incheon Dialogue, with approved wording and no invented facts', () => {
  const first = forums.forums[0];
  assert.equal(first.slug, 'incheon-dialogue');
  assert.equal(first.title.ar, 'حوار إنتشون');
  assert.equal(first.title.en, 'Incheon Dialogue');
  for (const key of ['title', 'kicker', 'status', 'opening', 'what', 'who', 'outcome', 'imageAlt']) {
    assert.ok(isText(first[key]), key);
  }
  for (const key of invented) {
    assert.equal(first[key], undefined, `do not invent ${key}`);
  }
  assert.match(first.opening.ar, /بتتوطّن/);
  assert.match(first.what.ar, /التكنولوجيات السبعة/);
  assert.match(first.what.en, /seven foundational technologies/);
  assert.equal(first.principles.length, 4);
  for (const item of first.principles) {
    assert.ok(isText(item.title) && isText(item.text), item.title.en);
  }
  assert.match(first.principles[1].text.en, /Chatham House/);
  assert.match(first.principles[3].text.ar, /مؤشر القدرة التكنولوجية العربية/);
  assert.match(first.status.en, /invitation only/i);
  assert.match(forums.labels.host.en, /Ahmed Abdelalim/);
  assert.doesNotMatch(forums.labels.host.en, /\bDr\.?\b/);
  assert.doesNotMatch(JSON.stringify(first), /\bDr\.?\b/);
  assert.ok(first.invite && isText(first.invite.label));
  assert.equal(first.invite.label.en, 'Request an invitation');
});

test('the Incheon key visual is a local 16:9 image under public/forums', () => {
  const first = forums.forums[0];
  assert.equal(first.image, '/forums/incheon-dialogue.jpg');
  const file = join(root, 'public/forums/incheon-dialogue.jpg');
  const stat = statSync(file);
  assert.ok(stat.size > 10_000 && stat.size < 200_000, stat.size);
  const jpeg = readFileSync(file);
  let i = 2;
  let width = 0;
  let height = 0;
  while (i < jpeg.length - 8) {
    if (jpeg[i] !== 0xff) { i += 1; continue; }
    const marker = jpeg[i + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      height = jpeg.readUInt16BE(i + 5);
      width = jpeg.readUInt16BE(i + 7);
      break;
    }
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    i += 2 + jpeg.readUInt16BE(i + 2);
  }
  assert.equal(width, 1280);
  assert.equal(height, 720);
});

test('the forums routes and admin collection exist, and nav is untouched', () => {
  for (const path of ['app/forums/page.tsx', 'app/ar/forums/page.tsx', 'components/forums/pages.tsx', 'lib/forums.ts']) {
    assert.ok(readFileSync(join(root, path), 'utf8').length, path);
  }
  const page = readFileSync(join(root, 'components/forums/pages.tsx'), 'utf8');
  assert.match(page, /mailto\(/);
  assert.doesNotMatch(page, /<form|JoinForm|registration/i);
  const config = readFileSync(join(root, 'public/admin/config.yml'), 'utf8');
  assert.match(config, /name: forums/);
  assert.match(config, /file: content\/forums\.json/);
  const sitemap = readFileSync(join(root, 'app/sitemap.ts'), 'utf8');
  assert.match(sitemap, /\/forums/);
  assert.match(sitemap, /\/ar\/forums/);
  const nav = readFileSync(join(root, 'content/navigation.json'), 'utf8');
  assert.doesNotMatch(nav, /\/forums/);
});

test('the built forums pages are native RTL and LTR and keep the draft facts honest', () => {
  const html = locale => readFileSync(join(root, `.next/server/app/${locale === 'ar' ? 'ar/' : ''}forums.html`), 'utf8');
  const en = html('en');
  const ar = html('ar');
  assert.match(en, /class="vs-site locale-en[^"]*" lang="en" dir="ltr"/);
  assert.match(ar, /class="vs-site locale-ar[^"]*" lang="ar" dir="rtl"/);
  assert.match(en, /Conferences &amp; Forums|Conferences & Forums/);
  assert.match(ar, /المؤتمرات والمنتديات/);
  assert.match(en, /Incheon Dialogue/);
  assert.match(ar, /حوار إنتشون/);
  assert.match(en, /invitation only/i);
  assert.match(ar, /الحضور بالدعوة فقط/);
  assert.match(en, /Arab Technology Capability Index/);
  assert.match(ar, /مؤشر القدرة التكنولوجية العربية/);
  assert.match(en, /Ahmed Abdelalim/);
  assert.doesNotMatch(en, /Dr\.?\s*Ahmed/);
  assert.match(en, /mailto:abdelalim@visionseek\.org/);
  assert.match(ar, /mailto:abdelalim@visionseek\.org/);
  assert.match(en, /forums\/incheon-dialogue/);
  assert.doesNotMatch(en, /<form/i);
  assert.doesNotMatch(ar, /<form/i);
  assert.doesNotMatch(en, /عشاء مغلق|12 people/);
  assert.doesNotMatch(ar, /عشاء مغلق/);
});

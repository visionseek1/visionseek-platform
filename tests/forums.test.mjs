import assert from 'node:assert/strict';
import {existsSync, readFileSync, statSync} from 'node:fs';
import {join} from 'node:path';
import test from 'node:test';

const root = process.cwd();
const forums = JSON.parse(readFileSync(join(root, 'content/forums.json'), 'utf8'));
const isText = value => value && typeof value.en === 'string' && typeof value.ar === 'string' && value.en.trim() && value.ar.trim();
const invented = ['date', 'venue', 'speakers', 'partners', 'sponsors', 'location', 'when'];

test('forums.json is bilingual and ready for more entries', () => {
  assert.ok(isText(forums.page.section));
  assert.equal(forums.page.section.ar, 'المؤتمرات والمنتديات');
  assert.equal(forums.page.section.en, 'Conferences & Forums');
  assert.equal(forums.page.status.ar, 'الإصدار الأول: أبريل 2027، إنتشون. الحضور بالدعوة فقط.');
  assert.equal(forums.page.status.en, 'First edition: April 2027, Incheon. Attendance is by invitation only.');
  assert.doesNotMatch(forums.page.status.en, /April\s+\d{1,2}(?!\d)/);
  assert.ok(Array.isArray(forums.forums) && forums.forums.length >= 1);
});

test('the first forum is the Incheon Dialogue, with approved wording and no invented facts', () => {
  const first = forums.forums[0];
  assert.equal(first.slug, 'incheon-dialogue');
  assert.equal(first.title.ar, 'حوار إنتشون');
  assert.equal(first.title.en, 'Incheon Dialogue');
  for (const key of ['title', 'kicker', 'status', 'opening', 'what', 'who', 'outcome', 'visualAlt']) {
    assert.ok(isText(first[key]), key);
  }
  for (const key of invented) {
    assert.equal(first[key], undefined, `do not invent ${key}`);
  }
  assert.match(first.opening.ar, /تُوطَّن/);
  const arabic = JSON.stringify(forums).match(/"ar":"[^"]+"/g)?.join('\n') ?? '';
  assert.doesNotMatch(arabic, /عشان|مفيش|بيتعمل|بتطلع|مين بيحضر|اللي بيطلع/);
  assert.match(first.what.ar, /التكنولوجيات السبعة/);
  assert.match(first.what.en, /seven foundational technologies/);
  assert.equal(first.principles.length, 4);
  for (const item of first.principles) {
    assert.ok(isText(item.title) && isText(item.text), item.title.en);
  }
  assert.equal(first.themes.length, 7);
  for (const theme of first.themes) {
    assert.ok(isText(theme), theme.en);
  }
  assert.match(first.principles[1].text.en, /Chatham House/);
  assert.match(first.principles[3].text.ar, /مؤشر القدرة التكنولوجية العربية/);
  assert.match(first.status.ar, /أبريل 2027، إنتشون/);
  assert.match(first.status.en, /April 2027, Incheon/);
  assert.match(first.status.en, /invitation only/i);
  assert.equal(first.edition.ar, 'الإصدار الأول: أبريل 2027، إنتشون');
  assert.equal(first.edition.en, 'First edition: April 2027, Incheon');
  assert.equal(first.facts.length, 4);
  assert.equal(forums.labels.why.en, 'Why');
  assert.equal(forums.labels.mandate.en, 'About');
  assert.equal(forums.labels.register.en, 'Register interest');
  assert.equal(forums.labels.dialogue.ar, 'حوار إنتشون');
  assert.match(forums.labels.honesty.en, /No specific venue in Incheon/);
  assert.match(forums.labels.honesty.ar, /لا مكان محدد داخل إنتشون/);
  assert.doesNotMatch(forums.labels.honesty.en, /No date/i);
  assert.doesNotMatch(forums.labels.honesty.ar, /لا تاريخ/);
  assert.match(forums.labels.host.en, /Ahmed Abdelalim/);
  assert.doesNotMatch(forums.labels.host.en, /\bDr\.?\b/);
  assert.doesNotMatch(JSON.stringify(first), /\bDr\.?\b/);
  assert.ok(first.invite && isText(first.invite.label));
  assert.equal(first.invite.label.en, 'Request an invitation');
});

test('the Incheon key visual is a local SVG under public/forums, not a stretched JPEG', () => {
  const first = forums.forums[0];
  assert.equal(first.visual, '/forums/incheon-dialogue.svg');
  const file = join(root, 'public/forums/incheon-dialogue.svg');
  const stat = statSync(file);
  assert.ok(stat.size > 1_000 && stat.size < 20_000, stat.size);
  const svg = readFileSync(file, 'utf8');
  assert.match(svg, /<svg /);
  assert.match(svg, /#cfff00|#050607/);
  assert.doesNotMatch(svg, /<image /);
  assert.equal(existsSync(join(root, 'public/forums/incheon-dialogue.jpg')), false);
});

test('Incheon Localization Awards sit inside the dialogue, coming soon, with a vector mark', () => {
  const awards = forums.forums[0].awards;
  assert.ok(awards);
  assert.equal(awards.title.ar, 'جوائز إنتشون للتوطين');
  assert.equal(awards.title.en, 'Incheon Localization Awards');
  assert.equal(awards.labels.soon.ar, 'قريبًا');
  assert.equal(awards.labels.soon.en, 'Coming soon');
  assert.match(awards.status.ar, /أبريل 2027/);
  assert.match(awards.status.en, /April 2027/);
  assert.doesNotMatch(awards.status.en, /April\s+\d{1,2}(?!\d)/);
  assert.equal(awards.principles.length, 6);
  assert.equal(awards.categories.length, 3);
  assert.equal(awards.process.length, 4);
  assert.equal(awards.visual, '/forums/incheon-awards.svg');
  const file = join(root, 'public/forums/incheon-awards.svg');
  const stat = statSync(file);
  assert.ok(stat.size > 800 && stat.size < 20_000, stat.size);
  const svg = readFileSync(file, 'utf8');
  assert.match(svg, /<svg /);
  assert.doesNotMatch(svg, /<image /);
  assert.equal(existsSync(join(root, 'public/forums/incheon-awards.jpg')), false);
  const blob = JSON.stringify(awards);
  assert.doesNotMatch(blob, /\$\d|USD|nomination form|self-nominate here/i);
  assert.match(awards.honesty.en, /No prize value/);
  assert.match(awards.honesty.ar, /لا قيمة للجوائز/);
  for (const item of [...awards.principles, ...awards.categories]) {
    assert.ok(isText(item.title) && isText(item.text), item.title.en);
  }
});

test('the forums routes and admin collection exist, and Forums is a top-level nav item after News', () => {
  for (const path of ['app/forums/page.tsx', 'app/ar/forums/page.tsx', 'components/forums/pages.tsx', 'lib/forums.ts', 'docs/forums-benchmark.md']) {
    assert.ok(readFileSync(join(root, path), 'utf8').length, path);
  }
  const page = readFileSync(join(root, 'components/forums/pages.tsx'), 'utf8');
  assert.match(page, /mailto\(/);
  assert.doesNotMatch(page, /<form|JoinForm|registration/i);
  const css = readFileSync(join(root, 'components/forums/forums.module.css'), 'utf8');
  assert.match(css, /object-fit:\s*contain/);
  assert.doesNotMatch(css, /object-fit:\s*cover/);
  assert.match(css, /--forum-measure:\s*68ch/);
  assert.match(css, /padding-inline/);
  assert.match(css, /clamp\(1\.85rem/);
  const config = readFileSync(join(root, 'public/admin/config.yml'), 'utf8');
  assert.match(config, /name: forums/);
  assert.match(config, /file: content\/forums\.json/);
  const sitemap = readFileSync(join(root, 'app/sitemap.ts'), 'utf8');
  assert.match(sitemap, /\/forums/);
  assert.match(sitemap, /\/ar\/forums/);
  const nav = JSON.parse(readFileSync(join(root, 'content/navigation.json'), 'utf8'));
  const paths = nav.sections.map(s => s.path);
  const item = nav.sections.find(s => s.path === '/forums');
  assert.ok(item, 'Forums belongs in the header');
  assert.equal(item.en, 'Forums');
  assert.equal(item.ar, 'المنتديات');
  assert.equal(nav.sections.filter(s => s.path === '/forums').length, 1, 'Forums appears once');
  assert.deepEqual(paths.slice(paths.indexOf('/insights'), paths.indexOf('/work-with-us') + 1), ['/insights', '/indices', '/news', '/forums', '/work-with-us']);
  assert.equal(paths[paths.indexOf('/news') + 1], '/forums');
  assert.ok(item.children.some(c => c.href === '/forums'));
  assert.ok(item.children.some(c => c.href === '/forums#incheon-dialogue' && c.en === 'Incheon Dialogue' && c.ar === 'حوار إنتشون'));
});

test('the built forums pages are native RTL and LTR and keep the draft facts honest', () => {
  const html = locale => readFileSync(join(root, `.next/server/app/${locale === 'ar' ? 'ar/' : ''}forums.html`), 'utf8');
  const en = html('en');
  const ar = html('ar');
  assert.match(en, /class="vs-site locale-en[^"]*" lang="en" dir="ltr"/);
  assert.match(ar, /class="vs-site locale-ar[^"]*" lang="ar" dir="rtl"/);
  assert.match(en, /href="\/forums"[^>]*>Forums</);
  assert.match(ar, /href="\/ar\/forums"[^>]*>المنتديات</);
  assert.match(en, /Conferences &amp; Forums|Conferences & Forums/);
  assert.match(ar, /المؤتمرات والمنتديات/);
  assert.match(en, /Incheon Dialogue/);
  assert.match(ar, /حوار إنتشون/);
  assert.match(en, /April 2027, Incheon/);
  assert.match(ar, /أبريل 2027، إنتشون/);
  assert.match(en, />About</);
  assert.match(ar, /عن الحوار/);
  assert.match(en, />Why</);
  assert.match(ar, />لماذا</);
  assert.match(en, />Themes</);
  assert.match(ar, />المحاور</);
  assert.match(en, />Format</);
  assert.match(en, /Register interest/);
  assert.match(ar, /سجّل اهتمامك/);
  assert.match(en, /invitation only/i);
  assert.match(ar, /الحضور بالدعوة فقط/);
  assert.match(en, /Arab Technology Capability Index/);
  assert.match(ar, /مؤشر القدرة التكنولوجية العربية/);
  assert.match(en, /Ahmed Abdelalim/);
  assert.doesNotMatch(en, /Dr\.?\s*Ahmed/);
  assert.match(en, /mailto:abdelalim@visionseek\.org/);
  assert.match(ar, /mailto:abdelalim@visionseek\.org/);
  assert.match(en, /forums\/incheon-dialogue\.svg/);
  assert.match(en, /forums\/incheon-awards\.svg/);
  assert.match(en, /Incheon Localization Awards/);
  assert.match(ar, /جوائز إنتشون للتوطين/);
  assert.match(en, /Coming soon/);
  assert.match(ar, /قريبًا/);
  assert.doesNotMatch(en, /incheon-dialogue\.jpg|incheon-awards\.jpg/);
  assert.doesNotMatch(en, /<form/i);
  assert.doesNotMatch(ar, /<form/i);
  assert.doesNotMatch(en, /عشاء مغلق|12 people/);
  assert.doesNotMatch(ar, /عشاء مغلق/);
});

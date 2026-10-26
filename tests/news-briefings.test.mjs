import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {join} from 'node:path';
import test from 'node:test';

const root = process.cwd();
const read = rel => readFileSync(join(root, rel), 'utf8');
const newsDir = join(root, 'content/news');
const mdFiles = readdirSync(newsDir).filter(name => name.endsWith('.md') && name.toLowerCase() !== 'readme.md');

const parseFront = raw => {
  const match = raw.replace(/^\uFEFF/, '').match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*\n?([\s\S]*)$/);
  assert.ok(match, 'frontmatter');
  const data = {};
  let listKey = null;
  let list = null;
  let current = null;
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && list) {
      const rest = item[1];
      const colon = rest.indexOf(':');
      if (colon > 0 && !/^\d/.test(rest)) {
        current = {[rest.slice(0, colon).trim()]: rest.slice(colon + 1).trim()};
        list.push(current);
      } else {
        current = null;
        list.push(rest);
      }
      continue;
    }
    const nested = line.match(/^\s{2,}([A-Za-z][A-Za-zA-Z0-9]*):\s*(.*)$/);
    if (nested && current) {
      current[nested[1]] = nested[2].trim();
      continue;
    }
    const kv = line.match(/^([A-Za-z][A-Za-zA-Z0-9]*):\s*(.*)$/);
    assert.ok(kv, line);
    listKey = null;
    list = null;
    current = null;
    if (kv[2] === '') {
      listKey = kv[1];
      list = [];
      data[listKey] = list;
    } else if (kv[2] === 'true' || kv[2] === 'false') data[kv[1]] = kv[2] === 'true';
    else if (kv[2] === '[]') data[kv[1]] = [];
    else if (/^-?\d+$/.test(kv[2])) data[kv[1]] = Number(kv[2]);
    else {
      const raw = kv[2];
      data[kv[1]] = ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'")))
        ? raw.slice(1, -1)
        : raw;
    }
  }
  return {data, body: match[2]};
};

const pngSize = path => {
  const buf = readFileSync(path);
  return {width: buf.readUInt32BE(16), height: buf.readUInt32BE(20)};
};

const required = ['slug', 'title', 'dek', 'publishedAt', 'tag', 'sourceName', 'sourceUrl', 'heroImage', 'heroAlt', 'imageCredit', 'readingMinutes'];

const sampleFiles = mdFiles.filter(name => name.includes('sample'));
const publishedFiles = mdFiles.filter(name => !name.includes('sample'));

const assertNewsImages = (data, name) => {
  assert.ok(existsSync(join(newsDir, data.heroImage)), `${name} ${data.heroImage}`);
  const hero = pngSize(join(newsDir, data.heroImage));
  assert.equal(hero.width / hero.height, 16 / 9, `${name} hero 16:9`);
  const og = data.heroImage.replace(/(\.[a-z]+)$/i, '.og$1');
  assert.ok(existsSync(join(newsDir, og)), og);
  assert.deepEqual(pngSize(join(newsDir, og)), {width: 1200, height: 630});
};

test('news briefings: two sample markdown files validate and stay obviously fake', () => {
  assert.deepEqual(sampleFiles.sort(), ['2026-10-27-sample-1.md', '2026-10-27-sample-2.md']);
  for (const name of sampleFiles) {
    const {data, body} = parseFront(read(join('content/news', name)));
    for (const field of required) assert.notEqual(data[field], undefined, `${name} ${field}`);
    assert.equal(data.sample, true, name);
    assert.match(data.title, /^خبر تجريبي:/);
    assert.equal(data.sourceUrl, 'https://example.com');
    assert.match(data.imageCredit, /VisionSeek/);
    assert.equal(['summary', 'image', 'imageAlt'].some(key => key in data), false, name);
    assert.match(data.publishedAt, /[+-]\d{2}:\d{2}$/);
    assertNewsImages(data, name);
    assert.match(body, /## ما الذي حدث/);
    assert.match(body, /## لماذا يهم الخليج والعالم العربي/);
    assert.match(body, /## قراءة VisionSeek/);
    assert.match(body, /مصدر تجريبي|example\.com|قالب/);
  }
});

test('news briefings: first published item validates and is not a sample', () => {
  assert.ok(publishedFiles.includes('dubai-ai-campus-1000-companies-2030.md'));
  const name = 'dubai-ai-campus-1000-companies-2030.md';
  const {data, body} = parseFront(read(join('content/news', name)));
  for (const field of required) assert.notEqual(data[field], undefined, `${name} ${field}`);
  assert.notEqual(data.sample, true, name);
  assert.equal(data.slug, 'dubai-ai-campus-1000-companies-2030');
  assert.equal(data.tag, 'استثمار وشركات');
  assert.match(data.publishedAt, /[+-]\d{2}:\d{2}$/);
  assert.equal(['summary', 'image', 'imageAlt'].some(key => key in data), false, name);
  assertNewsImages(data, name);
  const hero = pngSize(join(newsDir, data.heroImage));
  assert.deepEqual(hero, {width: 1600, height: 900});
  assert.match(body, /## ما الذي حدث/);
  assert.match(body, /## لماذا يهم الخليج والعالم العربي/);
  assert.match(body, /## قراءة VisionSeek/);
  assert.doesNotMatch(body, /خبر تجريبي|example\.com/);
});

test('news briefings: README documents the style-guide schema and sample exclusion', () => {
  const readme = read('content/news/README.md');
  for (const field of [...required, 'updatedAt', 'corrections', 'heroImage', 'dek']) assert.match(readme, new RegExp(field));
  assert.match(readme, /VERCEL_ENV/);
  assert.match(readme, /عيّنة تجريبية|sample: true/);
  assert.match(readme, /1200×630|1200x630/);
  assert.match(readme, /Asia\/Dubai|GMT\+4/);
});

test('news briefings: loader rejects missing fields and hides samples outside preview', () => {
  const load = read('lib/news/load.ts');
  assert.match(load, /REQUIRED_NEWS_FIELDS/);
  assert.match(load, /heroImage/);
  assert.match(load, /isPreviewBuild/);
  assert.match(load, /item => !item\.sample/);
  assert.match(read('lib/deploy.ts'), /VERCEL_ENV === 'preview'/);
  assert.match(read('lib/news/schema.ts'), /dek:/);
  assert.match(read('lib/news/schema.ts'), /heroImage:/);
  assert.match(read('lib/news/schema.ts'), /readingMinutes:/);
  assert.doesNotMatch(read('lib/news/schema.ts'), /summary:/);
  assert.match(read('lib/news/parse.ts'), /trimmed === '\[\]'/);
  assert.match(read('lib/news/parse.ts'), /المصدر/);
});

test('news briefings: index is a lead plus two columns, detail has opinion/source/related/jsonld', () => {
  const css = read('components/news/news.module.css');
  assert.match(css, /\.lead/);
  assert.match(css, /grid-template-columns: repeat\(2,/);
  assert.match(css, /max-width: 70ch/);
  const pages = read('components/news/pages.tsx');
  assert.match(pages, /NewsArticle/);
  assert.match(pages, /datePublished/);
  assert.match(pages, /dateModified/);
  assert.match(pages, /رأي|opinion/);
  assert.match(pages, /relatedNews/);
  assert.match(pages, /corrections/);
  assert.match(read('components/news/grid.tsx'), /المزيد|more/);
  assert.match(read('components/news/grid.tsx'), /NEWS_TOPICS/);
  assert.match(read('components/news/relative-time.tsx'), /dateTime/);
  assert.match(read('lib/news/time.ts'), /منذ ساعتين|ساعتين/);
  assert.match(read('lib/news/time.ts'), /Asia\/Dubai/);
});

test('news briefings: nav order, unarchived /news, sitemap and og 1200×630', () => {
  const nav = JSON.parse(read('content/navigation.json'));
  const paths = nav.sections.map(s => s.path);
  const news = nav.sections.find(s => s.path === '/news');
  assert.equal(news.ar, 'أخبار');
  assert.equal(news.en, 'News');
  assert.equal(paths[paths.indexOf('/research') + 1], '/news');
  assert.equal(paths[paths.indexOf('/news') + 1], '/indices');
  const archived = JSON.parse(read('content/visibility.json')).archived.map(item => item.path);
  assert.equal(archived.includes('/news'), false);
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /path: "\/ar\/news"/);
  assert.match(sitemap, /listNews/);
  assert.match(read('components/news/pages.tsx'), /width: 1200/);
  assert.match(read('components/news/pages.tsx'), /height: 630/);
});

test('news briefings: production CI build does not publish samples', () => {
  const ar = join(root, '.next/server/app/ar/news.html');
  assert.ok(existsSync(ar), 'built /ar/news');
  const html = readFileSync(ar, 'utf8');
  assert.match(html, /أخبار/);
  assert.match(html, /lang="ar"/);
  assert.match(html, /dir="rtl"/);
  assert.doesNotMatch(html, /خبر تجريبي/);
  assert.match(html, /dubai-ai-campus-1000-companies-2030/);
  assert.match(html, /أمننا الاقتصادي في الخليج/);
  assert.equal(existsSync(join(root, '.next/server/app/ar/news/2026-10-27-sample-1.html')), false);
  assert.ok(existsSync(join(root, '.next/server/app/ar/news/dubai-ai-campus-1000-companies-2030.html')), 'built published detail');
});

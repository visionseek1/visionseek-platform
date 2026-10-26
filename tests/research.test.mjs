import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const json = p => JSON.parse(read(p));

const banned = /internal, not for circulation|not for submission|Not for circulation|ليس للتداول|ليس للتقديم|v1\.0 internal|closed 26 Oct/i;

const expected = [
  {id: 'gulf-medicine', doi: '10.5281/zenodo.23657727', url: 'https://zenodo.org/records/23657727'},
  {id: 'gulf-stack', doi: '10.5281/zenodo.23657775', url: 'https://zenodo.org/records/23657775'},
  {id: 'arabic-health', doi: '10.5281/zenodo.23657799', url: 'https://zenodo.org/records/23657799'},
];

test('Research sits in the main menu immediately after Reports, with الأبحاث / Research', () => {
  const data = json('content/navigation.json');
  const nav = data.sections.map(s => s.path);
  const item = data.sections.find(s => s.path === '/research');
  assert.ok(item);
  assert.equal(item.en, 'Research');
  assert.equal(item.ar, 'الأبحاث');
  assert.equal(nav[nav.indexOf('/reports') + 1], '/research');
  assert.equal(nav[nav.indexOf('/research') + 1], '/indices');
  assert.equal(data.sections.filter(s => s.path === '/research').length, 1);
  assert.ok(item.children.length >= 2);
  assert.equal(item.children[0].href, '/research');
  assert.equal(item.children.find(c => c.href === '/research#gulf-stack').ar, 'من يملك البنية التحتية؟');
  assert.doesNotMatch(JSON.stringify(data), /ركام/);
});

test('research hub: three papers from one content file, Zenodo DOIs live, no draft-status lines', () => {
  const d = json('content/research.json');
  assert.equal(d.papers.length, 3);
  assert.deepEqual(d.papers.map(p => p.id), expected.map(p => p.id));
  assert.equal(d.hub.title.en, 'Research');
  assert.equal(d.hub.title.ar, 'الأبحاث');
  assert.equal(d.cta.available.en, 'Read on Zenodo');
  assert.equal(d.cta.available.ar, 'اقرأ الورقة على Zenodo');
  assert.equal(d.cta.pending.ar, 'الورقة الكاملة — قريبًا');
  assert.equal(d.papers[1].title.ar, 'من يملك البنية التحتية؟ — مكوّنات مراكز بيانات الذكاء الاصطناعي في الخليج');
  assert.doesNotMatch(JSON.stringify(d), /ركام/);
  for (const [i, paper] of d.papers.entries()) {
    assert.equal(paper.doi, expected[i].doi);
    assert.equal(paper.url, expected[i].url);
    assert.equal(paper.author.en, 'Ahmed Abdelalim, VisionSeek');
    assert.equal(paper.author.ar, 'د. أحمد عبدالعليم، VisionSeek');
    assert.doesNotMatch(paper.author.en, /Dr\./);
    assert.ok(paper.title.en && paper.title.ar);
    assert.ok(paper.summary.en && paper.summary.ar);
    assert.ok(paper.topic.en && paper.topic.ar);
  }
  assert.doesNotMatch(JSON.stringify(d), banned);
  assert.doesNotMatch(read('components/research/hub.tsx'), banned);
  assert.doesNotMatch(read('lib/research-hub.ts'), /Dr\. Ahmed|Dr\. Abdelalim/);
});

test('research pages, sitemap and /admin exist; DOI helper points at doi.org and the record URL', () => {
  for (const f of ['app/research/page.tsx', 'app/ar/research/page.tsx', 'content/research.json', 'lib/research-hub.ts']) {
    assert.ok(existsSync(new URL(`../${f}`, import.meta.url)), f);
  }
  assert.match(read('app/sitemap.ts'), /path: "\/research"/);
  assert.match(read('app/sitemap.ts'), /path: "\/ar\/research"/);
  assert.match(read('public/admin/config.yml'), /file: content\/research\.json/);
  assert.match(read('public/admin/config.yml'), /name: doi/);
  assert.match(read('public/admin/config.yml'), /name: url/);
  assert.match(read('public/admin/config.yml'), /value: "\/research"/);
  const lib = read('lib/research-hub.ts');
  assert.match(lib, /paperDoiHref/);
  assert.match(lib, /paperRecordHref/);
  assert.match(lib, /doi\.org/);
  const hub = read('components/research/hub.tsx');
  assert.match(hub, /rel="noopener"/);
  assert.match(hub, /DOI: \{doiLabel\}/);
  assert.match(hub, /paperRecordHref/);
  assert.match(hub, /target="_blank"/);
});

test('the built Research hub is native RTL and LTR and links each paper to Zenodo and its DOI', () => {
  const html = locale => readFileSync(new URL(`../.next/server/app/${locale === 'ar' ? 'ar/' : ''}research.html`, import.meta.url), 'utf8');
  const en = html('en');
  const ar = html('ar');
  assert.match(en, /class="vs-site locale-en[^"]*" lang="en" dir="ltr"/);
  assert.match(ar, /class="vs-site locale-ar[^"]*" lang="ar" dir="rtl"/);
  assert.match(en, /<title>Research \| VisionSeek<\/title>/);
  assert.match(ar, /<title>الأبحاث \| VisionSeek<\/title>/);
  assert.match(en, /href="\/research"[^>]*>Research</);
  assert.match(ar, /href="\/ar\/research"[^>]*>الأبحاث</);
  assert.match(en, /Who Owns the Gulf&#x27;s Medicine\?/);
  assert.match(ar, /من يملك دواء الخليج؟/);
  assert.match(en, /Who Owns the Stack\?/);
  assert.match(ar, /من يملك البنية التحتية؟/);
  assert.doesNotMatch(ar, /ركام/);
  assert.match(en, /Official-Source Health Information in MSA and Gulf Dialects/);
  assert.match(ar, /المعلومة الصحية من مصدر رسمي/);
  assert.match(en, /Ahmed Abdelalim, VisionSeek/);
  assert.match(ar, /د\. أحمد عبدالعليم/);
  assert.doesNotMatch(en, /Dr\. Ahmed|Dr\. Abdelalim/);
  assert.match(en, /Read on Zenodo/);
  assert.match(ar, /اقرأ الورقة على Zenodo/);
  assert.doesNotMatch(en, /Full paper — coming soon/);
  assert.doesNotMatch(ar, /الورقة الكاملة — قريبًا/);
  assert.doesNotMatch(en, /aria-disabled="true"/);
  assert.doesNotMatch(ar, /aria-disabled="true"/);
  assert.match(en, /id="gulf-medicine"/);
  assert.match(en, /id="gulf-stack"/);
  assert.match(en, /id="arabic-health"/);
  for (const paper of expected) {
    const record = new RegExp(`href="${paper.url.replaceAll('.', '\\.')}"[^>]*rel="noopener"`);
    const doi = new RegExp(`href="https://doi\\.org/${paper.doi.replaceAll('.', '\\.')}"[^>]*rel="noopener"`);
    const label = new RegExp(`DOI: ${paper.doi.replaceAll('.', '\\.')}`);
    assert.match(en, record, paper.url);
    assert.match(ar, record, paper.url);
    assert.match(en, doi, paper.doi);
    assert.match(ar, doi, paper.doi);
    assert.match(en, label, paper.doi);
    assert.match(ar, label, paper.doi);
    assert.match(en, new RegExp(`target="_blank"[^>]*href="${paper.url.replaceAll('.', '\\.')}"|href="${paper.url.replaceAll('.', '\\.')}"[^>]*target="_blank"`));
  }
  assert.doesNotMatch(en + ar, banned);
  assert.doesNotMatch(en + ar, /not for circulation|ليس للتداول/i);
});

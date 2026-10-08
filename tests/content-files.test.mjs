import assert from 'node:assert/strict';
import {readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import test from 'node:test';

const root = process.cwd();
const read = name => JSON.parse(readFileSync(join(root, 'content', name), 'utf8'));
const readDir = dir => readdirSync(join(root, 'content', dir)).filter(n => n.endsWith('.json')).sort().map(n => read(join(dir, n)));
/* No YAML parser in the project: read the collection names and their folder/file paths line by line. */
const configLines = readFileSync(join(root, 'public/admin/config.yml'), 'utf8').split('\n');
const collectionPaths = name => {
  const start = configLines.findIndex(line => line === `  - name: ${name}`);
  if (start < 0) return null;
  const paths = [];
  for (let i = start + 1; i < configLines.length && !configLines[i].startsWith('  - name: '); i++) {
    const match = configLines[i].match(/^\s+(?:folder|file): (\S+)/);
    if (match) paths.push(match[1]);
  }
  return paths;
};

const isText = value => value && typeof value.en === 'string' && typeof value.ar === 'string';

test('site.json carries the contact details once, for the whole site', () => {
  const site = read('site.json');
  assert.match(site.email, /^[^@\s]+@visionseek\.org$/);
  assert.match(site.whatsapp, /^\d{8,15}$/);
  assert.match(site.phoneE164, /^\+\d[\d-]+$/);
  assert.match(site.linkedinUrl, /^https:\/\/www\.linkedin\.com\//);
  for (const key of ['linkedinName', 'location', 'locationHint', 'footerLocation', 'footerBlurb']) assert.ok(isText(site[key]), key);
});

test('the six section headers keep their ids and links', () => {
  const {sections} = read('sections.json');
  assert.deepEqual(sections.map(s => s.id), ['work-with-us', 'opportunities', 'programs', 'news', 'workshops', 'about']);
  for (const section of sections) {
    for (const key of ['title', 'eyebrow', 'intro']) assert.ok(isText(section[key]), `${section.id}.${key}`);
    assert.ok(section.links.length >= 3, section.id);
    for (const link of section.links) assert.ok(link.href.startsWith('/') && isText(link.label), section.id);
  }
});

test('six program concepts, VS-P01 to VS-P06, each complete', () => {
  const programs = readDir('programs');
  assert.deepEqual(programs.map(p => p.code).sort(), ['VS-P01', 'VS-P02', 'VS-P03', 'VS-P04', 'VS-P05', 'VS-P06']);
  for (const program of programs) {
    for (const key of ['title', 'summary', 'beneficiary', 'constraint', 'hypothesis', 'test', 'stop', 'transfer']) assert.ok(isText(program[key]), `${program.slug}.${key}`);
    assert.equal(typeof program.position, 'number');
  }
});

test('guide pages keep their section and slug, with at least one block each', () => {
  const guides = readDir('guides');
  assert.equal(guides.length, 17);
  const keys = guides.map(g => `${g.section}/${g.slug}`);
  for (const expected of ['about/people', 'about/learning-from-darpa', 'programs/program-lifecycle', 'work-with-us/prepare-a-concept', 'news/media']) assert.ok(keys.includes(expected), expected);
  for (const guide of guides) {
    assert.ok(['work-with-us', 'opportunities', 'programs', 'news', 'workshops', 'about'].includes(guide.section), guide.slug);
    assert.ok(guide.blocks.length >= 1, guide.slug);
    for (const block of guide.blocks) assert.ok(isText(block.title), guide.slug);
    for (const link of guide.related ?? []) assert.ok(link.href.startsWith('/'), guide.slug);
  }
  const darpa = guides.find(g => g.slug === 'learning-from-darpa');
  assert.equal(darpa.source.url, 'https://www.darpa.mil/research/programs');
});

test('home.json and about.json hold every bilingual block the pages render', () => {
  const home = read('home.json');
  assert.equal(home.hero.slides.length, 3);
  assert.equal(home.hero.slides[0].title.en, 'Make It Possible.');
  assert.equal(home.method.parts.length, 3);
  assert.deepEqual(home.method.parts.map(p => p.id), ['define', 'people', 'prove']);
  for (const slide of home.hero.slides) assert.ok(slide.image.startsWith('/') && isText(slide.title) && isText(slide.link));
  const about = read('about.json');
  assert.equal(about.builds.items.length, 8);
  assert.ok(about.founder.image.startsWith('/'));
  for (const kind of ['method', 'about', 'work-with-us']) assert.ok(isText(about.pages[kind].title), kind);
});

test('every content collection in /admin points at a file or folder that exists', () => {
  for (const name of ['news', 'site', 'programs', 'guides', 'sections', 'home', 'about', 'method', 'navigation', 'legal', 'projects_catalog', 'project_concepts', 'reports']) {
    const paths = collectionPaths(name);
    assert.ok(paths && paths.length, name);
    for (const path of paths) {
      if (path.endsWith('.json')) assert.ok(readFileSync(join(root, path)), path);
      else assert.ok(readdirSync(join(root, path)).some(n => n.endsWith('.json')), path);
    }
  }
});

test('method.json keeps the nine steps, six communities and eight field cards with their ids', () => {
  const method = read('method.json');
  assert.deepEqual(method.steps.map(s => s.id), ['define', 'limit', 'path', 'people', 'highest-level-one', 'architect', 'prove', 'operate', 'evolve']);
  assert.equal(method.communities.length, 6);
  assert.deepEqual(method.fields.map(f => f.id), ['space', 'drones', 'cities', 'science', 'energy', 'robots', 'agriculture', 'chips']);
  for (const field of method.fields) assert.ok(readFileSync(join(root, 'public', `field-${field.image}.jpg`)), field.id);
  for (const step of method.steps) for (const key of ['en', 'ar', 'questionEn', 'questionAr', 'textEn', 'textAr']) assert.equal(typeof step[key], 'string', `${step.id}.${key}`);
});

test('navigation.json keeps the seven header sections and site-relative paths', () => {
  const nav = read('navigation.json');
  assert.deepEqual(nav.sections.map(s => s.path), ['/programs', '/projects', '/opportunities', '/workshops', '/news', '/work-with-us', '/about']);
  for (const section of [...nav.sections, nav.reports]) {
    assert.ok(section.path.startsWith('/') && !section.path.startsWith('/ar'), section.path);
    assert.ok(section.children.length >= 2, section.path);
    for (const link of section.children) assert.ok(link.href.startsWith('/') && !link.href.startsWith('/ar') && link.en && link.ar, `${section.path} ${link.href}`);
  }
});

test('legal.json carries both documents with headed sections', () => {
  const legal = read('legal.json');
  assert.ok(isText(legal.effectiveDate));
  for (const kind of ['privacy', 'terms']) {
    assert.ok(isText(legal[kind].title) && isText(legal[kind].lead), kind);
    assert.ok(legal[kind].sections.length >= 5, kind);
    for (const section of legal[kind].sections) {
      assert.ok(isText(section.heading), kind);
      assert.ok(section.paragraphs.length + section.bullets.length >= 1, `${kind}: ${section.heading.en}`);
    }
  }
});

test('project concepts resolve to a real sector and track, with public dossiers only', () => {
  const catalog = read('projects/catalog.json');
  const concepts = readDir('projects/concepts');
  assert.equal(catalog.sectors.length, 9);
  assert.ok(isText(catalog.conceptNotice));
  for (const key of ['concept', 'active', 'completed']) assert.ok(isText(catalog.status[key]), key);
  for (const track of catalog.tracks) assert.ok(catalog.sectors.some(s => s.slug === track.sector), track.slug);
  assert.deepEqual(concepts.map(c => c.id).sort(), ['VS-P07', 'VS-P08', 'VS-P09']);
  for (const project of concepts) {
    assert.ok(catalog.tracks.some(t => t.slug === project.track && t.sector === project.sector), project.id);
    assert.ok(['concept', 'active', 'completed'].includes(project.status), project.id);
    for (const key of ['title', 'summary', 'ambition', 'idea', 'beneficiary']) assert.ok(isText(project[key]), `${project.id}.${key}`);
    if (project.file) {
      for (const update of project.file.updates) assert.ok(['public', 'draft'].includes(update.visibility), `${project.id} ${update.id}`);
      for (const milestone of project.file.milestones) assert.ok(['current', 'planned', 'completed'].includes(milestone.state), `${project.id} ${milestone.id}`);
    }
  }
});

test('the Physical AI brief keeps its three signals, five actions and three sources in both languages', () => {
  const brief = read('reports/physical-ai.json');
  assert.equal(brief.sources.length, 3);
  for (const source of brief.sources) assert.ok(source.url.startsWith('https://') && source.name && source.title, source.url);
  for (const locale of ['en', 'ar']) {
    const copy = brief[locale];
    assert.equal(copy.findings.length, 3, locale);
    assert.equal(copy.actions.length, 5, locale);
    for (const key of ['title', 'standfirst', 'summary', 'connection', 'perspective', 'sourceNote', 'cta']) assert.equal(typeof copy[key], 'string', `${locale}.${key}`);
  }
  assert.equal(brief.en.title, brief.en.title.trim());
});

test('the archive list only holds pages offered in /admin, and never the protected pages', () => {
  const {archived} = read('visibility.json');
  const offered = [...readFileSync(join(root, 'public/admin/config.yml'), 'utf8').matchAll(/value: "([^"]+)"/g)].map(m => m[1]);
  const nav = read('navigation.json');
  for (const section of [...nav.sections, nav.reports]) {
    assert.ok(offered.includes(section.path), `missing archive option ${section.path}`);
    for (const link of section.children) {
      const path = link.href.split('#')[0];
      if (path !== section.path) assert.ok(offered.includes(path), `missing archive option ${path}`);
    }
  }
  for (const item of archived) {
    assert.ok(offered.includes(item.path), item.path);
    assert.ok(!['/', '/about', '/start', '/privacy', '/terms'].includes(item.path), item.path);
  }
});

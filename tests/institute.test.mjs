import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const read = name => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const institute = JSON.parse(read('content/institute.json'));
const fellowship = JSON.parse(read('content/fellowship.json'));
const workshopSection = JSON.parse(read('content/workshop-section.json'));
const prose = [];
const collect = value => {
  if (typeof value === 'string') prose.push(value);
  else if (value && typeof value === 'object') for (const child of Object.values(value)) collect(child);
};
collect(institute);
collect(fellowship);
collect(workshopSection.live.whyLabel);
collect(workshopSection.live.teaches);
collect(workshopSection.live.aboutInstructor);
collect(workshopSection.live.founderKicker);
collect(workshopSection.live.founderStatement);
collect(workshopSection.live.independence.lines);
collect(workshopSection.live.privateCta);
const flat = prose.join('\n');

test('Institute is marked DRAFT and named in both languages', () => {
  assert.equal(institute.title.en, 'VisionSeek Institute');
  assert.equal(institute.title.ar, 'معهد VisionSeek');
  assert.equal(institute.draft.en, 'DRAFT');
  assert.equal(institute.draft.ar, 'مسودة');
  assert.match(institute.intro.ar, /ماستر كلاس/);
  assert.match(institute.intro.en, /Masterclass/);
  assert.match(institute.intro.en, /Fellowship/);
  assert.match(institute.intro.ar, /زمالة/);
  assert.equal(institute.intro.ar, 'بيت برامج التعلّم في VisionSeek. يضم ماستر كلاس، ويضم زمالة VisionSeek.');
  assert.equal(workshopSection.live.whyLabel.ar, 'لماذا VisionSeek');
  assert.equal(institute.masterclassKind.ar, 'ماستر كلاس');
});

test('Institute and Fellowship Arabic stay in contemporary MSA', () => {
  assert.doesNotMatch(flat, /ليه|إزاي|ازاي|دلوقتي|بتاع|علشان|عشان|عايز|عاوز/);
  assert.doesNotMatch(read('content/institute.json'), /ليه|إزاي|دلوقتي/);
  assert.doesNotMatch(read('content/fellowship.json'), /ليه|إزاي|دلوقتي/);
  assert.match(read('content/governance.json'), /"ar": "حوكمة الذكاء الاصطناعي"/);
});

test('Fellowship copy stays inside the hard rules', () => {
  assert.equal(fellowship.title.en, 'VisionSeek Fellowship');
  assert.equal(fellowship.title.ar, 'زمالة VisionSeek');
  assert.equal(fellowship.interest.email, 'abdelalim@visionseek.org');
  assert.equal(fellowship.interest.label.en, 'Register interest');
  assert.equal(fellowship.interest.label.ar, 'سجّل اهتمامك');
  assert.equal(fellowship.interest.toName.en, 'Ahmed Abdelalim');
  assert.doesNotMatch(fellowship.interest.toName.en, /\bDr\.?\b/);
  assert.equal(fellowship.hero, '/institute/fellowship-hero.jpg');
  assert.ok(existsSync(new URL('../public/institute/fellowship-hero.jpg', import.meta.url)));
  assert.match(fellowship.status.ar, /قريبًا/);
  assert.doesNotMatch(flat, /grant|scholarship|stipend|tuition|منحة|منح|رسوم|راتب|fee|\$\d/i);
  assert.doesNotMatch(flat, /application form|apply now|نموذج تقديم|قدّم الآن|استمارة/i);
  assert.doesNotMatch(flat, /KAIST|ETRI|KDI|Samsung|Ministry of|وزارة|جامعة /);
  assert.doesNotMatch(flat, /20\d\d|يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر|January|February|March|April|June|July|August|September|October|November|December/);
  assert.doesNotMatch(flat, /حوالي عشرة|عشرة من|ten fellows|\b10\b/);
  assert.doesNotMatch(read('components/institute/fellowship-page.tsx'), /<form|input |textarea /i);
  assert.match(read('lib/institute.ts'), /mailto:\$\{fellowship\.interest\.email\}/);
});

test('Institute is the umbrella; the full Masterclass hub stays at /masterclass', () => {
  const lib = read('lib/governance.ts');
  const redirects = read('next.config.ts');
  const nav = JSON.parse(read('content/navigation.json'));
  const hub = read('components/institute/institute-hub.tsx');
  const masterclass = read('components/institution/workshops-view.tsx');
  assert.match(lib, /export const coursePath = `\/masterclass\/\$\{workshop\.slug\}`/);
  assert.match(lib, /export const ENROLL_HREF = 'https:\/\/link\.fastpaydirect\.com\/payment-link\/6adb486bcaf20c1f8ff2b74a'/);
  assert.doesNotMatch(redirects, /source: `\$\{prefix\}\/masterclass`, destination: `\$\{prefix\}\/institute`/);
  assert.match(redirects, /source: `\$\{prefix\}\/institute\/masterclass`, destination: `\$\{prefix\}\/masterclass`/);
  assert.match(redirects, /source: `\$\{prefix\}\/workshops`, destination: `\$\{prefix\}\/masterclass`/);
  assert.match(redirects, /source: '\/governance\/single-track-trap', destination: '\/masterclass\/single-track-trap'/);
  assert.equal(existsSync(new URL('../app/masterclass/page.tsx', import.meta.url)), true);
  assert.equal(existsSync(new URL('../app/masterclass/single-track-trap/page.tsx', import.meta.url)), true);
  assert.equal(existsSync(new URL('../app/masterclass/leader-seat/page.tsx', import.meta.url)) || existsSync(new URL('../app/masterclass/[slug]/page.tsx', import.meta.url)), true);
  assert.equal(existsSync(new URL('../app/institute/fellowship/page.tsx', import.meta.url)), true);
  assert.match(hub, /masterclassPath/);
  assert.match(hub, /fellowshipPath/);
  assert.match(masterclass, /section\.doors/);
  assert.match(masterclass, /id="institutions"/);
  assert.match(masterclass, /leader-seat|individual/);
  assert.match(masterclass, /develop-the-institution|general/);
  assert.match(masterclass, /vs-wl-course-card/);
  assert.match(masterclass, /coursePath/);
  const section = nav.sections.find(item => item.path === '/institute');
  assert.ok(section);
  assert.equal(section.en, 'VisionSeek Institute');
  assert.equal(section.ar, 'معهد VisionSeek');
  assert.deepEqual(section.children.map(item => item.href), [
    '/masterclass',
    '/masterclass/leader-seat',
    '/masterclass#institutions',
    '/masterclass/develop-the-institution',
    '/masterclass/single-track-trap',
    '/institute/fellowship',
  ]);
  assert.equal(section.children[0].ar, 'ماستر كلاس');
  assert.equal(nav.sections.some(item => item.path === '/work-with-us'), true);
  assert.equal(nav.sections.some(item => item.path === '/masterclass'), false);
});

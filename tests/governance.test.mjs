import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const read = name => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const data = JSON.parse(read('content/governance.json'));
const flat = JSON.stringify(data);

test('governance copy stays bilingual and keeps the sourced figures only', () => {
  const walk = value => {
    if (!value || typeof value !== 'object') return;
    if ('en' in value && 'ar' in value) {
      assert.equal(typeof value.en, 'string');
      assert.equal(typeof value.ar, 'string');
      assert.ok(value.en.trim() && value.ar.trim(), JSON.stringify(value).slice(0, 80));
    }
    for (const child of Object.values(value)) walk(child);
  };
  walk(data);
  assert.equal(data.workshop.slug, 'single-track-trap');
  assert.equal(data.workshop.instructor.en, 'Ahmed Abdelalim');
  assert.equal(data.workshop.instructorShort.en, 'Ahmed Abdelalim');
  assert.equal(data.workshop.instructorShort.ar, 'د. أحمد');
  assert.equal(data.workshop.title.en, 'AI Governance for Organizational Leaders and Executives');
  assert.equal(data.workshop.title.ar, 'حوكمة الذكاء الاصطناعي لمديري المؤسسات والمديرين التنفيذيين');
  assert.equal(data.workshop.subtitle.en, data.workshop.title.en);
  assert.equal(data.workshop.subtitle.ar, data.workshop.title.ar);
  assert.equal(data.workshop.subscribe.en, 'Subscribe');
  assert.equal(data.workshop.subscribe.ar, 'اشترك');
  assert.ok(data.workshop.topics.length >= 4 && data.workshop.topics.length <= 6);
  assert.equal(data.workshop.exercise.minutes, 15);
  assert.equal(data.workshop.simulation.approaches.length, 5);
  assert.equal(data.workshop.simulation.reveal.ar, 'اكشف البدائل');
  for (const figure of ['5,000', '812.02', '97,587', '440']) assert.ok(flat.includes(figure), figure);
  assert.equal(data.workshop.evidence.length, 5);
  for (const item of data.workshop.evidence) assert.match(item.source.url, /^https:\/\//);
  assert.equal(data.section.empty.ar, 'ماستر كلاس تالية: لا يوجد بعد.');
  assert.equal(data.workshop.blurb.ar.split('\n\n').length, 2);
  assert.equal(data.workshop.blurb.en.split('\n\n').length, 2);
  assert.equal(data.workshop.blurb.ar.split('\n\n')[0], 'حين تعتمد الشركات الكبرى على النماذج اللغوية الكبرى لاستشراف قراراتها الاستراتيجية، غالباً ما تفترض أن الإجابة الواثقة والمنمقة التي تتلقاها تمثل الحقيقة المطلقة. غير أن المأزق الحقيقي يكمن في "انحياز الإجابة الواحدة"؛ إذ تميل أدوات الذكاء الاصطناعي بطبيعتها الإحصائية إلى ترشيح مدرسة إدارية واحدة وتجاهل البدائل المنهجية المتاحة. هذا الخفاء المعرفي يضع القادة أمام خطر خفي: استثمار ملايين الدولارات في مسار تشغيلي قد لا يتناسب مع طبيعة أصول مؤسستهم.');
  assert.equal(data.workshop.blurb.ar.split('\n\n')[1].split(/\.\s+/).at(-1), 'صُمم هذا البرنامج خصيصاً للقادة وصناع القرار في أسواق الخليج ومصر الراغبين في بناء منظومات مؤسسية صلبة وواعية.');
  assert.equal(data.workshop.blurb.en.split('\n\n')[1].split(/\.\s+/).at(-1), 'This program was designed specifically for leaders and decision-makers in the Gulf and Egypt markets who wish to build solid, aware institutional systems.');
  assert.equal(data.workshop.aboutLabel.ar, 'عن الماستر كلاس');
  assert.equal(data.workshop.aboutLabel.en, 'About this Masterclass');
  assert.equal(data.workshop.forLabel.ar, 'لمن هذا الماستر كلاس');
  assert.equal(data.workshop.forLabel.en, "Who it's for");
  assert.equal(data.workshop.gainLabel.ar, 'ماذا ستخرج به');
  assert.equal(data.workshop.gainLabel.en, "What you'll gain");
  assert.equal(data.workshop.soon.ar, 'قريبًا');
  assert.equal(data.workshop.soon.en, 'Coming soon');
  assert.equal(data.workshop.detailsLabel.ar, 'التفاصيل');
  assert.equal(data.workshop.detailsLabel.en, 'Details');
  assert.equal(data.workshop.durationLabel.ar, 'المدة');
  assert.equal(data.workshop.durationLabel.en, 'Duration');
  assert.equal(data.workshop.formatLabel.ar, 'الشكل');
  assert.equal(data.workshop.formatLabel.en, 'Format');
  assert.equal(data.workshop.enrollLabel.ar, 'اشترك الآن');
  assert.equal(data.workshop.enrollLabel.en, 'Enroll');
  const prose = [];
  const collect = value => {
    if (typeof value === 'string') prose.push(value);
    else if (value && typeof value === 'object') for (const child of Object.values(value)) collect(child);
  };
  collect(data);
  assert.doesNotMatch(prose.join('\n'), /ورشة|ورش|Workshop|workshop/);
  assert.doesNotMatch(prose.join('\n'), /single-answer/i);
});

test('the course sits under masterclass, the old section is gone, and enrollment is one href', () => {
  const withoutCoursePrice = JSON.parse(JSON.stringify(data));
  delete withoutCoursePrice.workshop.price;
  assert.equal(data.workshop.price.en, '$199 — one-time payment');
  assert.equal(data.workshop.price.ar, '199 دولار — دفعة واحدة');
  assert.doesNotMatch(JSON.stringify(withoutCoursePrice), /anchoring|تثبيت|HLO|L-002|l-002|\bDr\.|دكتوراه|\bprice\b|سعر/i);
  assert.doesNotMatch(flat, /insights\/notes/);
  const simulation = read('components/governance/simulation.tsx');
  assert.doesNotMatch(simulation, /fetch\(|localStorage|sessionStorage|indexedDB/);
  const course = read('components/governance/course.tsx');
  assert.doesNotMatch(course, /Simulation|اكشف البدائل|workshop\.evidence|workshop\.stations/);
  assert.match(course, /enrollHref/);
  assert.match(course, /target="_blank"/);
  assert.match(course, /rel="noopener noreferrer"/);
  assert.match(course, /workshop\.price/);
  assert.match(course, /workshop\.blurb/);
  assert.doesNotMatch(course, /workshop\.subtitle/);
  assert.doesNotMatch(course, /workshop\.topics|topicsLabel|course-topics|المحاور/);
  assert.match(course, /workshop\.instructorShort/);
  const card = read('components/institution/workshops-view.tsx');
  assert.match(card, /governanceCourse\.price/);
  assert.match(card, /governanceCourse\.soon/);
  assert.doesNotMatch(card, /governanceCourse\.subtitle/);
  const lib = read('lib/governance.ts');
  assert.match(lib, /export const ENROLL_HREF = 'https:\/\/link\.fastpaydirect\.com\/payment-link\/6adb486bcaf20c1f8ff2b74a'/);
  assert.match(lib, /export const enrollHref = \(locale: Locale\) => \(locale === 'ar' \? ENROLL_HREF : ENROLL_HREF\)/);
  assert.match(lib, /\/masterclass\/\$\{workshop\.slug\}/);
  assert.match(read('components/governance/document-locale.tsx'), /documentElement/);
  const sitemap = read('app/sitemap.ts');
  assert.match(sitemap, /\/masterclass\/single-track-trap/);
  assert.doesNotMatch(sitemap, /['"`]\/governance/);
  assert.doesNotMatch(sitemap, /\/ar\/governance/);
  const admin = read('public/admin/config.yml');
  assert.match(admin, /content\/governance\.json/);
  assert.match(admin, /ar\/masterclass\/single-track-trap/);
  assert.doesNotMatch(admin, /value: "\/governance"/);
  const nav = JSON.parse(read('content/navigation.json'));
  assert.equal(nav.sections.some(section => section.path === '/governance'), false);
  for (const section of [...nav.sections, nav.reports]) {
    for (const link of section.children) assert.equal(link.href.split('#')[0].startsWith('/governance'), false, link.href);
  }
  const pages = [
    'app/masterclass/single-track-trap/page.tsx',
    'app/ar/masterclass/single-track-trap/page.tsx',
  ];
  for (const page of pages) {
    const source = read(page);
    assert.match(source, /coursePath/);
    assert.match(source, /MasterclassPage/);
  }
  for (const gone of [
    'app/governance/page.tsx',
    'app/governance/single-track-trap/page.tsx',
    'app/ar/governance/page.tsx',
    'app/ar/governance/single-track-trap/page.tsx',
  ]) assert.equal(existsSync(new URL(`../${gone}`, import.meta.url)), false, gone);
  const redirects = read('next.config.ts');
  assert.match(redirects, /source: '\/governance\/single-track-trap', destination: '\/masterclass\/single-track-trap'/);
  assert.match(redirects, /source: '\/ar\/governance\/single-track-trap', destination: '\/ar\/masterclass\/single-track-trap'/);
  assert.match(redirects, /source: '\/governance', destination: '\/masterclass'/);
  assert.match(redirects, /source: '\/ar\/governance', destination: '\/ar\/masterclass'/);
  assert.match(read('components/institution/workshops-view.tsx'), /vs-wl-course-card/);
  assert.match(read('components/institution/workshops-view.tsx'), /coursePath/);
  assert.equal(data.workshop.cover, '/governance/cover.jpg');
  assert.match(card, /live\.teaches/);
});

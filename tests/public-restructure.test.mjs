import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import test from 'node:test';

const read = file => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const copy = read('lib/public-site.ts');
const home = read('components/governance/views.tsx');
const header = read('components/capability/navigation.tsx');
const footer = read('components/capability/footer.tsx');
const redirects = read('next.config.ts');

const banned = /نسعى|نطمح|قيد الإصدار|تجريبي|مبدئي|نأمل|محاولة|\baspire\b|\bstrive\b|\bhope\b|\bpilot\b|\bbeta\b|coming soon|tentative|\bDr\./i;

test('directive copy is verbatim on the public governance surfaces', () => {
  for (const line of [
    'GLOBAL AUTHORITY ON AI GOVERNANCE · INCHEON, SOUTH KOREA',
    'المرجعية الدولية لحوكمة الذكاء الاصطناعي · إنتشون، كوريا الجنوبية',
    'Strategic & Operational Governance of Decisions, Capabilities, and Agents.',
    'الحوكمة الاستراتيجية والتشغيلية للقرار والقدرة والوكلاء.',
    'When AI models become abundant and cheap, intelligence is no longer rare.',
    'لا يعود الذكاء نفسه نادراً',
    'البشرُ الوكلاءَ',
    'Explore the Global Standards',
    'استكشف المعايير الدولية',
    'Enter the Executive Masterclass',
    'ادخل الماستركلاس التنفيذي',
    'The Three Pillars',
    'الأركان الثلاثة',
    'Global Standards',
    'المعايير الدولية',
    'Executive Masterclass',
    'الماستركلاس التنفيذي',
    'Governance Diagnostic',
    'مقياس الحوكمة',
    'Research & Teardowns',
    'الأبحاث وتشريح القرارات',
    'Open Frameworks',
    'الأطر المفتوحة',
    'About the Institution',
    'عن المؤسسة',
    'Assess Your Institution',
    'افحص جاهزية مؤسستك',
    'Breaking the Single-Track Trap & Multi-Paradigm Decision Verification.',
    'كسر "فخ الإجابة الواحدة" وتصادم المناهج قبل اعتماد الميزانيات.',
    'Most AI outputs rely on a single statistical consensus while hiding viable alternatives—leading enterprises into costly strategic errors.',
    'تُبنى أغلب إجابات الذكاء الاصطناعي على مسار إحصائي واحد وتُخفي البدائل الأخرى',
    'Transitioning AI from a Rented Dependency into an Institutionally Owned Asset.',
    'تحويل الذكاء الاصطناعي من خدمة مستأجرة تخلق التبعية إلى قدرة مملوكة للمؤسسة.',
    'True sovereignty cannot be rented.',
    'السيادة لا تتحقق بشراء اشتراكات سحابية تتوقف بتوقف المورد.',
    'The Science and Craft of Designing Human-Agent (Bionic) Organizations.',
    'علم وحرفة تصميم المؤسسات التي يعمل فيها البشر مع وكلاء الذكاء الاصطناعي (Agents).',
    'Functioning as the "Toyota Production System" for the agentic era',
    'على خطى "نظام إنتاج تويوتا" في عصر الصناعة',
    'AI Andon Cord',
    'حبل الإيقاف الذكي (AI Andon Cord)',
    '인공지능 의사결정 아키텍처 및 거버넌스',
    '인공지능 역량 소유권 및 주권',
    '에이전트 및 바이오닉 조직 거버넌스',
    'VS-STD-01',
    'VS-STD-02',
    'VS-STD-03',
    'Multi-Path Decision Governance Standard',
    'معيار حوكمة القرار متعدد المسارات',
    'AI Capability Ownership & Sovereignty Standard',
    'معيار ملكية القدرة والسيادة التعاقدية',
    'Bionic Organization & Agentic Governance Code',
    'الكود التشغيلي لحوكمة المؤسسات الهجينة والوكلاء',
    'حوكمة الذكاء الاصطناعي: فخ الإجابة الواحدة وهندسة القرار والمؤسسة الهجينة',
    'AI Governance: Escaping the Single-Track Trap & Architecting the Bionic Enterprise',
    'البرنامج التنفيذي لكشف البدائل الاستراتيجية الخفية، حماية ملكية القدرة، وقيادة المؤسسات في عصر الوكلاء.',
    'The Executive Program for Uncovering Strategic Alternatives, Securing Capability Ownership, and Governing Autonomous Agents.',
    'إتقان منهجية ومصفوفة كشف البدائل الخوارزمية قبل القرارات الكبرى.',
    'امتلاك دستور تصميم الخلايا الهجينة.',
    'شهادة الاعتماد التنفيذي الدولي في حوكمة الذكاء الاصطناعي من المؤسسة في كوريا الجنوبية.',
    'Ahmed Abdelalim, Founder & Chief Capability Architect',
    'د. أحمد عبدالعليم',
    'لو توقف مورد الذكاء الاصطناعي عن مؤسستك غداً',
    'If your AI vendor stopped tomorrow, or your team built a strategic plan on a single-track algorithmic answer, or an autonomous agent drifted in a critical workflow—what protects your institution today?',
    'AI Decision Teardowns',
    'تشريح القرارات',
    'Global Governance Observatory',
    'مرصد الحوكمة العالمي',
    'VisionSeek بنسبة 100% = المرجعية الدولية في «الحوكمة الاستراتيجية والتشغيلية للقرار والقدرة والوكلاء»',
  ]) assert.ok(copy.includes(line), line);
  assert.equal(copy.includes('Dr.'), false);
  assert.match(home, /hero\.badge/);
  assert.match(home, /hero\.headline/);
  assert.match(home, /DiagnosticTool/);
  assert.doesNotMatch(home, /Aegis|Apex|Clause|Relay|korean-solutions|homeProofCount|محركات ذاتية|احنا شايفين/);
  assert.doesNotMatch(header + footer, /Aegis|Apex|Clause|Relay|korean-solutions|حلول من كوريا|Korean Solutions|استوديو الفرص/);
  assert.doesNotMatch(copy + home + header + footer, banned);
});

test('removed public routes redirect home with 308', () => {
  assert.match(redirects, /const removed = \['programs', 'korean-solutions'\]/);
  assert.match(redirects, /source: `\$\{prefix\}\/\$\{stem\}`, destination: home\(prefix\), permanent: true/);
  assert.match(redirects, /source: `\$\{prefix\}\/\$\{stem\}\/:path\*`, destination: home\(prefix\), permanent: true/);
  assert.match(redirects, /\['', '\/ar', '\/ko'\]/);
});

test('standards PDFs exist for Arabic and English and carry no invented clauses', () => {
  for (const file of [
    'public/standards/vs-std-01-mpds-ar.pdf',
    'public/standards/vs-std-01-mpds-en.pdf',
    'public/standards/vs-std-02-acos-ar.pdf',
    'public/standards/vs-std-02-acos-en.pdf',
    'public/standards/vs-std-03-boagc-ar.pdf',
    'public/standards/vs-std-03-boagc-en.pdf',
  ]) assert.ok(existsSync(new URL(`../${file}`, import.meta.url)), file);
  const script = read('scripts/standards-pdf.mjs');
  assert.match(script, /code, name, and the related pillar text only/);
  assert.doesNotMatch(script, /clause|certification|partner|adoption/i);
});

test('the diagnostic asks six proposed questions and stores nothing', () => {
  const tool = read('components/governance/diagnostic-tool.tsx');
  assert.match(copy, /Proposed wording, needs founder approval/);
  const block = copy.slice(copy.indexOf('export const diagnosticQuestions'), copy.indexOf('export const diagnosticUi'));
  assert.equal((block.match(/pillar: '/g) || []).length, 6);
  assert.doesNotMatch(tool, /fetch\(|localStorage|sessionStorage|indexedDB|FormData/);
  assert.match(tool, /mailto\(/);
});

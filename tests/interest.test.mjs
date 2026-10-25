import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const read = f => readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');

async function load(path) {
  const source = read(path);
  const compiled = ts.transpileModule(source, {compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022}}).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
}

test('interest form: three fields only, and a missing one is named', async () => {
  const {interestProblems, composeInterest} = await load('lib/interest.ts');
  assert.deepEqual(interestProblems({name: '', email: '', organization: ''}).map(p => p.key), ['name', 'email', 'organization']);
  assert.ok(interestProblems({name: 'Mona', email: 'not-an-email', organization: 'الشركة'}).some(p => p.key === 'email' && p.reason === 'invalid'));
  assert.equal(interestProblems({name: 'Mona', email: 'mona@example.com', organization: 'الشركة'}).length, 0);
  const mail = composeInterest({
    locale: 'ar',
    values: {name: 'منى', email: 'mona@example.com', organization: 'الشركة المتحدة'},
    topic: 'حوكمة الذكاء الاصطناعي لمديري المؤسسات والمديرين التنفيذيين',
    page: 'https://visionseek.org/ar/masterclass/single-track-trap',
  });
  assert.match(mail.subject, /تسجيل اهتمام/);
  assert.match(mail.body, /منى/);
  assert.match(mail.body, /الشركة المتحدة/);
  assert.match(mail.body, /mona@example.com/);
  assert.doesNotMatch(mail.body, /199|دولار|Subscribe|اشترك|fastpay/i);
  assert.doesNotMatch(mail.note, /\$|سعر|price/i);
});

test('interest is wired to the existing request route, with no payment link', () => {
  const form = read('components/interest/interest-form.tsx');
  assert.match(form, /\/api\/korean-solutions\/request/);
  assert.match(form, /kind: 'interest'/);
  assert.match(form, /name: mail\.name/);
  assert.match(form, /org: mail\.organization/);
  assert.doesNotMatch(form, /fastpay|stripe|checkout|ENROLL_HREF|\$199/i);
  const api = read('app/api/korean-solutions/request/route.ts');
  assert.match(api, /kind === 'interest'/);
  assert.match(api, /المعرفة وبناء القادة/);
  assert.match(api, /createLead/);
  assert.doesNotMatch(api, /process\.env\.[A-Z_]+/);
});

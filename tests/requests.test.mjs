import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';

const source = await fs.readFile(new URL('../lib/requests.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022}}).outputText;
const {BUYERS, COUNTRIES, TIMELINES, composeRequest, requestProblems} = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

test('request form: Egypt and the Gulf are listed, and a korea request names the required fields', () => {
  const values = Object.fromEntries(COUNTRIES.map(c => [c.value, c.label.en]));
  assert.equal(values['مصر'], 'Egypt');
  assert.equal(values['السعودية'], 'Saudi Arabia');
  assert.equal(values['الإمارات'], 'United Arab Emirates');
  assert.equal(values['قطر'], 'Qatar');
  assert.equal(values['الكويت'], 'Kuwait');
  assert.equal(values['البحرين'], 'Bahrain');
  assert.equal(values['عُمان'], 'Oman');
  const missing = requestProblems('korea', {});
  assert.deepEqual(missing.map(p => p.key), ['buyer', 'name', 'country', 'phone', 'email', 'product']);
});

test('request form: a company request needs the company name; an individual request does not', () => {
  const base = {
    name: 'Mona', country: 'مصر', phone: '+20 100 000 0000', email: 'mona@example.com',
    category: 'التصنيع', product: 'خط تعبئة',
  };
  assert.ok(requestProblems('korea', {...base, buyer: 'company'}).some(p => p.key === 'company'));
  assert.equal(requestProblems('korea', {...base, buyer: 'person'}).length, 0);
  assert.equal(requestProblems('korea', {...base, buyer: 'company', company: 'الشركة المتحدة'}).length, 0);
});

test('request form: a valid korea request composes an email to send by hand, with no invented inventory', () => {
  const values = {
    buyer: 'company', name: 'Mona', company: 'الشركة المتحدة', country: 'مصر', phone: '+20 100 000 0000',
    email: 'mona@example.com', category: 'التصنيع', product: 'خط تعبئة', quantity: '20',
    budget: 'قيد الاتفاق', timeline: 'month', details: 'لمصنع في العاشر', link: 'https://example.com/spec.pdf',
  };
  assert.equal(requestProblems('korea', values).length, 0);
  const label = (list, v) => (list.find(x => x.value === v) || {label: {ar: v}}).label.ar;
  const mail = composeRequest({
    locale: 'ar', kind: 'korea', values, page: 'https://visionseek.org/ar/korean-solutions',
    display: {
      buyer: v => label(BUYERS, v),
      timeline: v => label(TIMELINES, v),
    },
  });
  assert.match(mail.subject, /VisionSeek/);
  assert.match(mail.body, /خط تعبئة/);
  assert.match(mail.body, /الشركة المتحدة/);
  assert.match(mail.body, /شركة أو مؤسسة/);
  assert.match(mail.body, /خلال هذا الشهر/);
  assert.match(mail.body, /20/);
  assert.match(mail.body, /https:\/\/example.com\/spec.pdf/);
  assert.match(mail.body, /mona@example.com/);
  assert.match(mail.body, /https:\/\/visionseek.org\/ar\/korean-solutions/);
  assert.doesNotMatch(mail.body, /Hana|هانا|Nine Star/i);
  const person = composeRequest({locale: 'ar', kind: 'korea', values: {...values, buyer: 'person', company: 'يُتجاهل'}, page: 'https://visionseek.org/ar/korean-solutions'});
  assert.doesNotMatch(person.body, /يُتجاهل/);
});

test('request form: a listed-car page does not ask for the car name again when the page already names it', () => {
  const values = {name: 'Omar', country: 'السعودية', phone: '+966501234567', email: 'omar@example.com', details: ''};
  assert.equal(requestProblems('car-listed', values, 'Sample brand Sample hybrid').length, 0);
  assert.ok(requestProblems('car-listed', {name: 'Omar'}).some(p => p.key === 'email'));
});

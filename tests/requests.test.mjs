import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';

const source = await fs.readFile(new URL('../lib/requests.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022}}).outputText;
const {COUNTRIES, composeRequest, requestProblems} = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

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
  assert.deepEqual(missing.map(p => p.key), ['name', 'country', 'phone', 'email', 'product']);
});

test('request form: a valid korea request composes an email to send by hand, with no invented inventory', () => {
  const values = {
    name: 'Mona', country: 'مصر', phone: '+20 100 000 0000', email: 'mona@example.com',
    category: 'التصنيع', product: 'خط تعبئة', quantity: '', details: 'لمصنع في العاشر', link: '',
  };
  assert.equal(requestProblems('korea', values).length, 0);
  const mail = composeRequest({locale: 'ar', kind: 'korea', values, page: 'https://visionseek.org/ar/korean-solutions'});
  assert.match(mail.subject, /VisionSeek/);
  assert.match(mail.body, /خط تعبئة/);
  assert.match(mail.body, /mona@example.com/);
  assert.match(mail.body, /https:\/\/visionseek.org\/ar\/korean-solutions/);
  assert.doesNotMatch(mail.body, /Hana|هانا|Nine Star/i);
});

test('request form: a listed-car page does not ask for the car name again when the page already names it', () => {
  const values = {name: 'Omar', country: 'السعودية', phone: '+966501234567', email: 'omar@example.com', details: ''};
  assert.equal(requestProblems('car-listed', values, 'Sample brand Sample hybrid').length, 0);
  assert.ok(requestProblems('car-listed', {name: 'Omar'}).some(p => p.key === 'email'));
});

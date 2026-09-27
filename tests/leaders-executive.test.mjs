import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
const source=await fs.readFile(new URL('../lib/leaders/executive.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {briefSections,briefSummary}=await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
test('structured Arabic brief keeps evidence, limitations and action separate without dropping continuation text',()=>{
 const body='المرجع: وصف التقنية.\r\nشرط مهم.\r\n\r\nما يهم مؤسستك: أثر محتمل وليس نتيجة مثبتة.\r\n\r\nخطوة عملية: اختبر على نطاق محدود.\r\n\r\nهذا اقتراح وليس ضمانًا.';
 const sections=briefSections(body);
 assert.deepEqual(sections.map(s=>s.kind),['evidence','implication','action','context']);
 assert.equal(sections[0].text,'وصف التقنية.\r\nشرط مهم.');
 assert.equal(sections[3].text,'هذا اقتراح وليس ضمانًا.');
 assert.equal(briefSummary(body),'أثر محتمل وليس نتيجة مثبتة.');
});
test('free-form posts do not acquire invented sections and embedded labels remain prose',()=>{
 const body='A founder writes: Why it matters: is a useful question.\n\nA second paragraph.';
 assert.deepEqual(briefSections(body).map(s=>s.kind),['context','context']);
 assert.equal(briefSummary(body),'A founder writes: Why it matters: is a useful question.');
 assert.equal(briefSummary(''),'');
});
test('English sections recognize only anchored labels and keep factual wording intact',()=>{
 assert.deepEqual(briefSections('The reference: A provider claim.\n\nWhy it matters: Worth investigating.\n\nTry this: Compare alternatives.').map(s=>[s.kind,s.text]),[['evidence','A provider claim.'],['implication','Worth investigating.'],['action','Compare alternatives.']]);
});

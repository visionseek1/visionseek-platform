import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../lib/reports/catalog.ts', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const module = { exports: {} };
new Function('require', 'module', 'exports', output)(require, module, module.exports);
const { reportSchema, publishedReports } = module.exports;
const report = { id:'test', title:{ar:'اختبار',en:'Test'},version:'1',publishedAt:'2026-09-27T00:00:00Z',question:'Question',methodology:'Method',limitations:'Limits',sources:[{url:'https://example.org/data',accessedAt:'2026-09-27T00:00:00Z',version:'1',rights:'test only'}],evidencePackage:'https://example.org/evidence',reviewer:{name:'Reviewer',reviewRecord:'https://example.org/review'},approval:{name:'Approver',record:'https://example.org/approval'},correctionHistory:[] };
test('publication contract accepts complete metadata',()=>assert.equal(reportSchema.safeParse(report).success,true));
test('missing evidence, limitations, review or approval blocks catalog admission',()=>{
  for(const field of ['sources','evidencePackage','limitations','reviewer','approval']) {
    const copy={...report};delete copy[field];assert.equal(reportSchema.safeParse(copy).success,false,field);
  }
});
test('no invented research seeded',()=>assert.deepEqual(publishedReports,[]));

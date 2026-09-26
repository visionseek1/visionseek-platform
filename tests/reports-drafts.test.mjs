import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const src=readFileSync(new URL('../lib/reports/drafts.ts',import.meta.url),'utf8');
const output=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const mod={exports:{}};new Function('require','module','exports',output)(require,mod,mod.exports);
const {draftContentSchema,createDraftSchema,updateDraftSchema,emptyReportDraft,reviewGaps}=mod.exports;
test('incomplete Arabic or English drafts can be saved with a title',()=>{
 for(const locale of ['ar','en']){const d=emptyReportDraft();d[`title_${locale}`]='Research title';assert.equal(draftContentSchema.safeParse(d).success,true);assert.equal(Object.values(reviewGaps(d)).every(Boolean),false);}
});
test('review readiness needs one coherent language with sources and author',()=>{
 const d=emptyReportDraft();Object.assign(d,{title_ar:'عنوان',summary_en:'summary',methodology_ar:'method',limitations_ar:'limits',sources:[{title:'source',url:'https://example.org',note:''}]});d.sections[0].body_ar='body';assert.equal(reviewGaps(d).language,false);d.summary_ar='ملخص';assert.equal(Object.values(reviewGaps(d)).every(Boolean),true);
});
test('unsafe and credential-bearing URLs are rejected',()=>{
 for(const url of ['javascript:alert(1)','data:text/html,test','http://example.org','https://user:password@example.org']){const d={...emptyReportDraft(),title_ar:'عنوان',cover_url:url};assert.equal(draftContentSchema.safeParse(d).success,false);}
});
test('public status and actor injection are not accepted by write contracts',()=>{
 const content={...emptyReportDraft(),title_ar:'عنوان'};
 assert.equal(updateDraftSchema.safeParse({revision:0,status:'published',content}).success,false);
 assert.equal(createDraftSchema.safeParse({id:'00000000-0000-4000-8000-000000000001',content,owner_id:'attacker'}).success,false);
 assert.equal(updateDraftSchema.safeParse({revision:-1,status:'draft',content}).success,false);
});

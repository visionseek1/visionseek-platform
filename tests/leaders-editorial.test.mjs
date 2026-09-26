import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
const raw=await fs.readFile(new URL('../lib/leaders/editorial/schema.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(raw,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText.replace("from 'zod'",`from '${import.meta.resolve('zod')}'`);
const {sourceSchema,validateDraft,actionSchema,sourceCatalog}=await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const excerpt='A source must explain how a proposed capability changes institutional decisions. Evidence from a prototype can reveal whether the approach deserves further investment.';
const draft={title:'A better experiment',body:'A prototype can help the institution decide whether an approach deserves further investment.',title_en:'',body_en:'',why_it_matters:'Leaders can compare an experiment with a larger commitment.',next_step:'Define an observable result before starting.',claims:[{claim:'The source discusses prototype evidence.',evidence_quote:'Evidence from a prototype'}],limitations:['This is a method, not evidence of results in this institution.']};
test('source input allows only pilot identities, HTTPS and bounded excerpts',()=>{
 const source={character_id:'tiko',source_url:'https://example.com/report',source_label:'Example',source_title:'Report',source_excerpt:excerpt};
 assert.equal(sourceSchema.parse(source).character_id,'tiko');
 for(const patch of [{character_id:'medo'},{source_url:'http://localhost/private'},{source_url:'https://user:password@example.com'},{source_excerpt:'too short'},{source_excerpt:'x'.repeat(16001)},{owner_id:'other-user'}])assert.equal(sourceSchema.safeParse({...source,...patch}).success,false);
});
test('unsupported evidence cannot be accepted as a reviewed draft',()=>{
 assert.deepEqual(validateDraft(draft,excerpt),draft);
 assert.throws(()=>validateDraft({...draft,claims:[{claim:'Invented assertion',evidence_quote:'results improved by 90%'}]},excerpt),/EVIDENCE_MISMATCH/);
 assert.throws(()=>validateDraft({...draft,claims:[]},excerpt));
 assert.throws(()=>validateDraft({...draft,limitations:[]},excerpt));
 assert.throws(()=>validateDraft({...draft,body:'too short'},excerpt));
});
test('evidence matching tolerates layout whitespace without accepting extra words',()=>{
 assert.deepEqual(validateDraft(draft,excerpt.replace('Evidence from a prototype','Evidence\n from  a prototype')),draft);
 assert.throws(()=>validateDraft({...draft,claims:[{claim:'Prototype evidence',evidence_quote:'Evidence from a successful prototype'}]},excerpt),/EVIDENCE_MISMATCH/);
});
test('public action contract requires revisions and excludes generation or direct publishing',()=>{
 assert.equal(actionSchema.safeParse({action:'approve',revision:1,note:'Reviewed against the source'}).success,true);
 for(const action of ['publish','begin_generation','complete_generation','delete'])assert.equal(actionSchema.safeParse({action,revision:1}).success,false);
 assert.equal(actionSchema.safeParse({action:'approve'}).success,false);
 assert.equal(actionSchema.safeParse({action:'save',revision:-1,draft}).success,false);
});
test('source imports use an exact curated catalog, not caller URLs',()=>{
 assert.equal(sourceCatalog.length,3);
 assert.ok(sourceCatalog.every(s=>s.url.startsWith('https://')&&['tiko','labo'].includes(s.character_id)));
});

const extractorSource=await fs.readFile(new URL('../lib/leaders/editorial/text.ts',import.meta.url),'utf8');
const extractorJs=ts.transpileModule(extractorSource,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {extractSourceText}=await import(`data:text/javascript;base64,${Buffer.from(extractorJs).toString('base64')}`);
test('source text decodes entities once and excludes navigation and executable content',()=>{
 assert.equal(extractSourceText('<nav>Menu</nav><main><script>ignore()</script><p>A &amp; B &amp;lt;test&amp;gt;</p></main><footer>Footer</footer>'),'A & B &lt;test&gt;');
 assert.equal(extractSourceText('<p>&lt;b&gt;quoted&lt;/b&gt;</p>'),'<b>quoted</b>');
 assert.equal(extractSourceText('a'.repeat(17000)).length,16000);
});

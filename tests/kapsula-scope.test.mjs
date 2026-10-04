import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import ts from 'typescript';
async function moduleAt(path){const source=await readFile(new URL(path,import.meta.url),'utf8');const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);}
const scope=await moduleAt('../lib/leaders/medical-scope.ts');
const people=await moduleAt('../lib/leaders/characters.ts');
const edition=await moduleAt('../lib/leaders/kapsula-edition.ts');
const archived=await moduleAt('../lib/leaders/edition.ts');

test('medical scope accepts explicit health attribution and excludes generic AI, other sectors and untagged content',()=>{
 assert.equal(scope.isMedicalPost({character_id:'medo'}),true);
 assert.equal(scope.isMedicalPost({character_id:null,sector_ids:['medo']}),true);
 for(const post of [{character_id:'tiko',topic:'ai'},{character_id:null},{sector_ids:['bani']},...archived.editionAll])assert.equal(scope.isMedicalPost(post),false);
});
test('public directory contains only Kapsula while all 15 original operational identities survive',()=>{
 assert.equal(people.characters.length,15);
 assert.deepEqual(people.publicCharacters.map(c=>c.id),['medo']);
 assert.equal(people.characterById('kapsula').id,'medo');
 assert.equal(people.characterPath('medo','en'),'/insights/characters/kapsula');
 assert.equal(people.isPublicCharacter('tiko'),false);
});
test('all preview readings are bilingual, source-backed and cover every medical topic',async()=>{
 assert.equal(edition.editionPosts.length,5);
 assert.equal(edition.editionVideos.length,2);
 assert.equal(new Set(edition.editionAll.map(p=>p.id)).size,edition.editionAll.length);
 assert.deepEqual(new Set(edition.editionPosts.map(p=>p.topic)),new Set(scope.medicalTopics.map(t=>t.id)));
 for(const p of edition.editionAll){assert.ok(scope.isMedicalPost(p));assert.ok(p.title&&p.title_en&&p.body&&p.body_en);assert.ok(p.source_url.startsWith('https://'));for(const key of ['media_url','media_url_en','poster_url','poster_url_en','caption_url','caption_url_en'])if(p[key])await access(new URL('../public'+p[key],import.meta.url));}
});
test('public filtering preserves the original record and its ability to be restored',()=>{
 const record={id:'legacy',status:'published',character_id:'tiko',title:'Original title'};
 const before=structuredClone(record);const visible=[record].filter(scope.isMedicalPost);
 assert.deepEqual(visible,[]);assert.deepEqual(record,before);
});

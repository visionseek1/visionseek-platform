import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
const source=await fs.readFile(new URL('../lib/leaders/characters.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {characters,characterById,characterPath,normalizeCharacterFollows,postsForCharacter,characterAuthor}=await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
test('all 15 approved identities have unique paths and individual artwork',()=>{
 assert.deepEqual(characters.map(c=>c.name.en),['Medo','Nori','Tiko','Bani','Volt','Zaro','Aman','Nova','Eco','Movi','Wasl','Numo','Raed','Hima','Labo']);
 assert.equal(new Set(characters.map(c=>c.id)).size,15);assert.equal(new Set(characters.map(c=>c.portrait)).size,15);
 for(const c of characters){assert.ok(c.name.ar&&c.sector.ar&&c.bio.ar&&c.bio.en);assert.equal(characterPath(c.id,'ar'),`/ar/insights/characters/${c.id}`);}
});
test('invalid and duplicate stored follows cannot become identities',()=>{
 assert.deepEqual(normalizeCharacterFollows(['medo','__proto__','medo',{},'not-real','tiko']),['medo','tiko']);
 assert.deepEqual(normalizeCharacterFollows({medo:true}),[]);assert.equal(characterById('__proto__'),undefined);
});
test('field curation never changes authorship or includes unrelated content',()=>{
 const curated={id:'curated',sector_ids:['bani','tiko']};const authored={id:'authored',character_id:'medo'};const other={id:'other',topic:'ai'};
 assert.deepEqual(postsForCharacter([curated,authored,other],'tiko'),[curated]);
 assert.deepEqual(postsForCharacter([curated,authored,other],'medo'),[authored]);
 assert.equal(characterAuthor(curated),undefined);assert.equal(characterAuthor(authored).id,'medo');
 assert.deepEqual(postsForCharacter([curated,authored],'not-real'),[]);
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
async function sourceModule(path){const source=await fs.readFile(new URL(path,import.meta.url),'utf8');const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);}
const {projects,projectInquiry,projectFiles,publicProjectUpdates}=await sourceModule('../lib/projects/index.ts');
test('draft updates never appear in the public timeline and chronology does not mutate the catalog',()=>{
 const file={...projectFiles['VS-P07'],updates:[
  {id:'older',date:'2026-08-01',visibility:'public'},
  {id:'private-work',date:'2026-09-28',visibility:'draft',body:{ar:'Private client details',en:'Private client details'}},
  {id:'newer',date:'2026-09-01',visibility:'public'},
 ]};
 assert.deepEqual(publicProjectUpdates(file).map(u=>u.id),['newer','older']);
 assert.deepEqual(file.updates.map(u=>u.id),['older','private-work','newer']);
});
test('commissioning and partnership enquiries retain the correct project identity in both languages',()=>{
 for(const project of projects)for(const locale of ['ar','en'])for(const intent of ['commission','partner']){
  const url=new URL(projectInquiry(project,locale,intent),'https://visionseek.org');
  assert.equal(url.pathname,locale==='ar'?'/ar/start':'/start');
  assert.equal(url.searchParams.get('project'),project.id);
  assert.equal(url.searchParams.get('intent'),intent);
  assert.equal(url.searchParams.get('idea'),`${project.id} — ${project.title[locale]}`);
 }
});
test('each advertised project has a bilingual dossier and no unsupported completed milestones',()=>{
 for(const project of projects){
  const file=projectFiles[project.id];assert.ok(file,project.id);
  assert.ok(file.workstreams.length&&file.deliverables.length&&file.partnerNeeds.length);
  for(const value of [file.stage,file.stageNote,file.challenge,file.role,file.engagement])assert.ok(value.ar&&value.en);
  const ids=file.milestones.map(s=>s.id);assert.equal(new Set(ids).size,ids.length);
  for(const step of file.milestones)if(step.state==='completed')assert.ok(step.evidenceUrl,'Completed work needs evidence');
  for(const update of publicProjectUpdates(file))assert.ok(update.title.ar&&update.title.en&&update.body.ar&&update.body.en);
 }
});

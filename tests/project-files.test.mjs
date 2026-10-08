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
test('every project carries an identity card with sourced, bilingual facts',()=>{
 const audiences=new Set(['government','institution','company','individual']);
 for(const project of projects){
  assert.ok(project.profile,`${project.id} needs a project card`);
  assert.ok(project.profile.audiences.length,`${project.id} needs an audience`);
  for(const item of project.profile.audiences)assert.ok(audiences.has(item),`${project.id}: unknown audience ${item}`);
  for(const fact of project.profile.facts){
   assert.ok(['exhibition','trend'].includes(fact.kind));
   assert.ok(fact.title.ar&&fact.title.en&&fact.detail.ar&&fact.detail.en);
   assert.match(fact.url,/^https:\/\//);
  }
  if(project.whyNow){
   for(const p of project.whyNow.paragraphs)assert.ok(p.ar&&p.en);
   assert.ok(project.whyNow.sources.length,'why-now claims need sources');
   for(const s of project.whyNow.sources)assert.match(s.url,/^https:\/\//);
  }
 }
});
test('a project pitch names its fears with sources and speaks to real audiences',()=>{
 const audiences=new Set(['government','institution','company','individual']);
 for(const project of projects){
  const pitch=project.pitch;if(!pitch)continue;
  for(const t of [pitch.hook,pitch.promise])assert.ok(t.ar&&t.en,project.id);
  assert.ok(pitch.fears.length>=3,`${project.id} needs at least three fears`);
  for(const fear of pitch.fears){
   assert.ok(fear.title.ar&&fear.title.en&&fear.body.ar&&fear.body.en);
   if(fear.figure)assert.ok(fear.sources?.length,`${project.id}: a figure needs a source`);
   for(const s of fear.sources??[])assert.match(s.url,/^https:\/\//);
  }
  for(const gain of pitch.gains)assert.ok(audiences.has(gain.audience)&&gain.text.ar&&gain.text.en);
  for(const edge of pitch.edges)assert.ok(edge.ar&&edge.en);
 }
});

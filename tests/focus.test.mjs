import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
import {JSDOM} from 'jsdom';
async function moduleAt(path,replace=s=>s){const src=replace(await readFile(path,'utf8'));const js=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}}).outputText;return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);}
const {publicAnalyticsUrl}=await moduleAt('lib/public-analytics.ts');
test('analytics removes all query data and excludes every private route',()=>{
 for(const prefix of ['','/ar','/ko']){
  assert.equal(publicAnalyticsUrl(`https://visionseek.org${prefix}/start?email=private%40example.org&need=secret#message`),`https://visionseek.org${prefix}/start`);
  for(const path of ['/room','/room/contacts','/insights/studio','/reports/studio','/api/leaders/posts','/private-profile'])assert.equal(publicAnalyticsUrl(`https://visionseek.org${prefix}${path}`),null);
 }
 assert.equal(publicAnalyticsUrl('javascript:alert(1)'),null);
});
const types=await readFile('lib/leaders/types.ts','utf8');
const {isMedicalPublication}=await moduleAt('lib/leaders/medical-focus.ts',s=>types+'\n'+s.replace(/import .* from '.\/types';/,''));
test('medical editorial focus does not expose drafts, scheduled, expired, or unrelated posts',()=>{
 const p={character_id:'medo',status:'published',published_at:'2026-10-03T01:00:00Z',expires_at:null};const now=Date.parse('2026-10-04T00:00:00Z');
 assert.ok(isMedicalPublication(p,now));
 assert.ok(isMedicalPublication({...p,published_at:'2026-09-20T01:00:00Z'},now),'Previously published medical content remains visible');
 for(const patch of [{status:'draft'},{status:'archived'},{character_id:'tiko'},{published_at:'2026-10-05T01:00:00Z'},{expires_at:'2026-10-03T20:00:00Z'}])assert.equal(isMedicalPublication({...p,...patch},now),false);
});
const manifest=JSON.parse(await readFile('.next/routes-manifest.json','utf8'));
const routeRedirect=path=>manifest.redirects.find(r=>!r.has&&new RegExp(r.regex).test(path));
test('archived public routes redirect without affecting administrative tools or APIs',()=>{
 for(const prefix of ['','/ar','/ko']){
  for(const path of ['/projects/energy/lng/sovereign-floating-gas-supply','/projects/energy/lng/second-lng-containment-standard','/programs','/opportunities','/workshops','/news','/method','/insights/characters/medo'])assert.ok(routeRedirect(prefix+path),`Not archived: ${prefix+path}`);
  for(const path of ['/room','/insights/studio','/insights/studio/characters','/reports/studio','/start','/insights','/pharmaceuticals'])assert.equal(routeRedirect(prefix+path),undefined,`Private or active route redirected: ${prefix+path}`);
 }
 assert.equal(routeRedirect('/api/leaders/drafts'),undefined);
});
test('three homepages have the same short section order, empty achievements and localized contact routes',async()=>{
 for(const [locale,file,prefix] of [['en','index',''],['ar','ar','/ar'],['ko','ko','/ko']]){
  const doc=new JSDOM(await readFile(`.next/server/app/${file}.html`,'utf8')).window.document;
  const main=doc.querySelector('main');
  assert.deepEqual([...main.children].map(n=>n.id||'hero'),['hero','pharmaceuticals','leaders-house','founder','achievements','contact']);
  assert.ok(doc.querySelector('#achievements').hidden);
  assert.ok(doc.querySelector(`a[href="${prefix}/start?audience=institution"]`));
  assert.ok(doc.querySelector(`a[href="${prefix}/start?audience=korean-company"]`));
  assert.equal(doc.querySelector('.vs-site').lang,locale);
  const copy=main.textContent;for(const term of ['BCG','McKinsey','Palantir','DARPA','LNG','4.43'])assert.ok(!copy.includes(term));
 }
});

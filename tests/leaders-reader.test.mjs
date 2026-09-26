import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
const source=await fs.readFile(new URL('../lib/leaders/reader.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {normalizePreferences,toggleCollection,setTopicPreference,rankPosts,sortByNewest,emptyPreferences,capabilityLink}=await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
test('legacy saves migrate once; removing the last collection does not resurrect them',()=>{
 let p=normalizePreferences(null,['post-1']);assert.deepEqual(p.collections['post-1'],['later']);
 p=toggleCollection(p,'post-1','later');
 assert.deepEqual(normalizePreferences(p,['post-1']).collections,{});
});
test('corrupt preferences cannot create unknown topics, groups or prototype keys',()=>{
 const raw=JSON.parse('{"version":1,"interests":["ai","ai","unknown"],"less":["ai","strategy"],"collections":{"__proto__":["team"],"post-2":["team","bad","team"]}}');
 const p=normalizePreferences(raw);assert.deepEqual(p.interests,['ai']);assert.deepEqual(p.less,['strategy']);assert.deepEqual(p.collections,{'post-2':['team']});
});
test('one idea can be in multiple collections, with independent removal',()=>{
 let p=toggleCollection(emptyPreferences,'post-1','team');p=toggleCollection(p,'post-1','opportunities');p=toggleCollection(p,'post-1','team');
 assert.deepEqual(p.collections['post-1'],['opportunities']);assert.deepEqual(emptyPreferences.collections,{});
});
test('explicit topic choices rank a copy without hiding other topics',()=>{
 const posts=[{id:'a',topic:'ai',featured:false,published_at:'2026-09-26'},{id:'b',topic:'strategy',featured:true,published_at:'2026-09-26'},{id:'c',topic:'capabilities',featured:false,published_at:'2026-09-26'}];
 let p=setTopicPreference(emptyPreferences,'ai','more');p=setTopicPreference(p,'strategy','less');
 assert.deepEqual(rankPosts(posts,p).map(p=>p.id),['a','c','b']);assert.deepEqual(posts.map(p=>p.id),['a','b','c']);
 p=setTopicPreference(p,'ai','less');assert.ok(!p.interests.includes('ai'));assert.ok(p.less.includes('ai'));
});
test('context links preserve Arabic and cannot change the destination',()=>{
 const p={title:'طاقة & قرار؟ #1',title_en:'An idea & a choice'};const link=capabilityLink(p,'ar');
 const url=new URL(link,'https://visionseek.org');assert.equal(url.pathname,'/ar/start');assert.equal(url.searchParams.get('idea'),p.title);assert.equal(url.searchParams.get('from'),'leaders');
});

test('latest ignores featured priority and remains deterministic for ties and invalid dates',()=>{
 const posts=[{id:'old',featured:true,created_at:'2020-01-01'},{id:'b',created_at:'2026-09-26'},{id:'a',created_at:'2026-09-26'},{id:'invalid',created_at:'bad'}];
 assert.deepEqual(sortByNewest(posts).map(p=>p.id),['a','b','old','invalid']);
 assert.equal(posts[0].id,'old');
});

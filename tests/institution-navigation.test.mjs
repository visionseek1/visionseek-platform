import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root=path.resolve('.next/server/app');
async function pages(dir=root){const all=[];for(const entry of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())all.push(...await pages(full));else if(entry.name.endsWith('.html'))all.push(full);}return all;}

test('institutional navigation resolves to built bilingual pages and real anchors',async()=>{
 const html=new Map();for(const file of await pages()){const rel=path.relative(root,file).replaceAll(path.sep,'/').replace(/\.html$/,'');html.set(rel==='index'?'/':`/${rel}`,await readFile(file,'utf8'));}
 const areas=['work-with-us','opportunities','programs','offices','news','workshops','careers','about'];
 for(const prefix of ['', '/ar'])for(const area of areas)assert.ok(html.has(`${prefix}/${area}`),`Missing section ${prefix}/${area}`);
 const failures=[];
 for(const [route,body] of html){
  if(!areas.some(area=>route===`/${area}`||route.startsWith(`/${area}/`)||route===`/ar/${area}`||route.startsWith(`/ar/${area}/`))&&route!=='/'&&route!=='/ar')continue;
  for(const match of body.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)){
   const href=match[1].replaceAll('&amp;','&');if(!href.startsWith('/')&&!href.startsWith('#'))continue;
   const url=new URL(href,`https://visionseek.org${route}`);const target=url.pathname.replace(/\/$/,'')||'/';
   if(!html.has(target)){failures.push(`${route}: missing ${target}`);continue;}
   if(url.hash){const id=decodeURIComponent(url.hash.slice(1));if(!html.get(target).includes(`id="${id}"`))failures.push(`${route}: missing anchor ${target}#${id}`);}
  }
 }
 assert.deepEqual([...new Set(failures)],[]);
});

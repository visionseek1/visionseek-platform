import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
const source=await fs.readFile(new URL('../lib/leaders/media-url.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {safeMediaUrl}=await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const origin='https://visionseek.org';
test('local assets and signed HTTPS media preserve paths and tokens',()=>{
  for(const value of ['/field-science.jpg','/leaders/edition/decision-ar.mp4','https://project.supabase.co/storage/v1/object/sign/leaders-media/id/video.mp4?token=abc.def_ghi-123&download=video%20one.mp4']) assert.equal(safeMediaUrl(value,origin),value);
});
test('object URLs must belong to this origin',()=>{
  const value=`blob:${origin}/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f64`;
  assert.equal(safeMediaUrl(value,origin),value);
  assert.equal(safeMediaUrl(value,'https://other.example'),undefined);
  assert.equal(safeMediaUrl(value),undefined);
});
test('executable schemes, markup, controls and ambiguous URLs are rejected',()=>{
  for(const value of ['javascript:alert(1)','data:text/html,<script>alert(1)</script>','http://example.com/video.mp4','//example.com/video.mp4','/\\example.com/video.mp4','https://user:pass@example.com/video.mp4','https://example.com/\nvideo.mp4','/video.mp4" onerror="alert(1)','<video src=x>','blob:null/40a5fb5a','blob:https://other.example/40a5fb5a','https://example.com/<script>']) assert.equal(safeMediaUrl(value,origin),undefined,value);
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
const raw=await fs.readFile(new URL('../lib/leaders/editorial/automation-contract.ts',import.meta.url),'utf8');
const js=ts.transpileModule(raw,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText.replace("from 'zod'",`from '${import.meta.resolve('zod')}'`);
const {automationAction,workerPayload,transientModelError,safeUsage}=await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
test('automation requests cannot select another owner, arbitrary URLs or publish',()=>{
 assert.equal(automationAction.safeParse({action:'run_once'}).success,true);
 for(const value of [{action:'publish'},{action:'run_once',owner_id:'other'},{action:'set_enabled',enabled:true,secret:'value'},{action:'run_once',url:'https://example.com'}])assert.equal(automationAction.safeParse(value).success,false);
 assert.equal(workerPayload.safeParse({job_id:'df4bcb49-7efa-48b3-8713-40234fec8c6e',run_id:'run_test'}).success,true);
 assert.equal(workerPayload.safeParse({job_id:'invalid',run_id:'run_test'}).success,false);
 assert.equal(workerPayload.safeParse({job_id:'df4bcb49-7efa-48b3-8713-40234fec8c6e',run_id:'run_test',owner_id:'other'}).success,false);
});
test('only transient model errors are retried; secrets and provider text never enter usage',()=>{
 for(const code of ['MODEL_ACCESS_FAILED','MODEL_CREDIT_REQUIRED','EVIDENCE_MISMATCH','MODEL_OUTPUT_INVALID'])assert.equal(transientModelError(code),false);
 for(const code of ['MODEL_TIMEOUT','MODEL_FAILED','MODEL_RATE_LIMITED'])assert.equal(transientModelError(code),true);
 assert.deepEqual(safeUsage({total_tokens:123,cost:0.01,api_key:'private',provider_response:'text'}),{total_tokens:123,cost:0.01});
 assert.equal(safeUsage({cost:-1}),null);
});
test('n8n import is inactive, has no embedded credentials and calls one private endpoint',async()=>{
 const workflow=JSON.parse(await fs.readFile(new URL('../automation/n8n/leaders-house.json',import.meta.url),'utf8'));
 assert.equal(workflow.active,false);
 assert.equal(workflow.settings.timezone,'Asia/Seoul');
 const requests=workflow.nodes.filter(n=>n.type==='n8n-nodes-base.httpRequest');assert.equal(requests.length,1);
 assert.equal(requests[0].parameters.url,'https://visionseek.org/api/leaders/automation/tick');
 assert.equal(requests[0].parameters.authentication,'genericCredentialType');
 assert.equal(requests[0].credentials,undefined);
 assert.ok(!JSON.stringify(workflow).includes('sk-or-v1-'));
});

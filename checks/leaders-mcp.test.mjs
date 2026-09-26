import test from 'node:test';
import assert from 'node:assert/strict';
import {decodeImage,createDraft} from '../lib/leaders/mcp/drafts.ts';
import {POST,GET} from '../app/mcp/route.ts';

test('draft endpoint challenges unauthenticated calls and exposes no tools',async()=>{
 const response=await POST(new Request('https://visionseek.org/mcp',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}));
 assert.equal(response.status,401);
 assert.match(response.headers.get('www-authenticate')||'',/oauth-protected-resource/);
 assert.equal((await GET()).status,405);
});

test('draft creation cannot accept a published status from the model',async()=>{
 let inserted;
 const client={from(){return {insert(row){inserted=row;return {select(){return {single:async()=>({data:{id:'draft-1',title:row.title,status:row.status,media_path:null},error:null})};}};}};}};
 const result=await createDraft(client,'editor-id',{title:'A',body:'B',topic:'ai',status:'published'});
 assert.equal(inserted.status,'draft');
 assert.equal(inserted.published_at,null);
 assert.equal(result.status,'draft');
});

test('image validation rejects mismatched content and incomplete input',()=>{
 assert.throws(()=>decodeImage(Buffer.from('fake').toString('base64'),'image/png'),{code:'IMAGE_TYPE_MISMATCH'});
 assert.throws(()=>decodeImage(Buffer.from('fake').toString('base64')), {code:'IMAGE_AND_MIME_REQUIRED'});
});

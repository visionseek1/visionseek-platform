import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {WebStandardStreamableHTTPServerTransport} from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import {z} from 'zod';
import {mcpEditor,challenge} from '@/lib/leaders/mcp/auth';
import {draftInput,createDraft,getDraft} from '@/lib/leaders/mcp/drafts';
import {RoomError} from '@/lib/leaders/editorial/server';
export const runtime='nodejs';
export const dynamic='force-dynamic';

async function handle(request:Request){
  if(!request.headers.get('authorization'))return challenge();
  let context:Awaited<ReturnType<typeof mcpEditor>>;
  try{context=await mcpEditor(request);}
  catch(error){
    if(error instanceof RoomError&&error.status===401)return challenge();
    const status=error instanceof RoomError?error.status:500;
    return Response.json({error:error instanceof RoomError?error.code:'MCP_UNAVAILABLE'},{status,headers:{'Cache-Control':'no-store'}});
  }
  if(request.method!=='POST')return new Response(null,{status:405,headers:{Allow:'POST'}});
  const server=new McpServer({name:'visionseek-leaders-house',version:'0.1.0'},
    {instructions:'Only create private drafts for the authenticated editor. Never publish or change a draft status. Confirm sources before claiming factual accuracy.'});
  server.registerTool('create_leaders_draft',{title:'Create Leaders House draft',
    description:'Save a bilingual post as a private draft in Leaders House. Optional image is base64-encoded JPEG, PNG or WebP up to 1 MB. Never publishes.',
    inputSchema:draftInput,annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}},
    async args=>{try{const result=await createDraft(context.client,context.user.id,args);return {structuredContent:result,content:[{type:'text' as const,text:JSON.stringify(result)}]};}
      catch(error){return {isError:true,content:[{type:'text' as const,text:error instanceof RoomError?error.code:'DRAFT_SAVE_FAILED'}]};}});
  server.registerTool('get_leaders_draft',{title:'Read Leaders House draft',
    description:'Read one private draft belonging to the authenticated editor.',inputSchema:{id:z.string().uuid()},
    annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}},
    async ({id})=>{try{const result=await getDraft(context.client,id);return {structuredContent:result,content:[{type:'text' as const,text:JSON.stringify(result)}]};}
      catch(error){return {isError:true,content:[{type:'text' as const,text:error instanceof RoomError?error.code:'DRAFT_READ_FAILED'}]};}});
  const transport=new WebStandardStreamableHTTPServerTransport({enableJsonResponse:true,maxRequestBodySize:2_800_000});
  await server.connect(transport);
  try{const response=await transport.handleRequest(request);response.headers.set('Cache-Control','no-store');return response;}
  finally{await server.close();}
}
export const POST=handle;
export function GET(){return new Response(null,{status:405,headers:{Allow:'POST'}});}
export function DELETE(){return new Response(null,{status:405,headers:{Allow:'POST'}});}

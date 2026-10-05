import {RoomError,editorContext} from '@/lib/leaders/editorial/server';

export const mcpResource='https://visionseek.org/mcp';

export function authorizationServer(){
  const raw=process.env.NEXT_PUBLIC_SUPABASE_URL;
  if(!raw)throw new RoomError(503,'MCP_NOT_CONFIGURED');
  const url=new URL(raw);
  if(url.protocol!=='https:')throw new RoomError(503,'MCP_NOT_CONFIGURED');
  return `${url.origin}/auth/v1`;
}

export async function mcpEditor(request:Request){
  const allowed=(process.env.LEADERS_MCP_ALLOWED_CLIENT_IDS||'').split(',').map(x=>x.trim()).filter(Boolean);
  if(!allowed.length)throw new RoomError(503,'MCP_NOT_CONFIGURED');
  const context=await editorContext(request);
  const token=request.headers.get('authorization')!.slice(7);
  let clientId:unknown;
  try{const payload=JSON.parse(Buffer.from(token.split('.')[1]||'','base64url').toString('utf8'));clientId=payload.client_id;}
  catch{throw new RoomError(401,'INVALID_TOKEN');}
  if(typeof clientId!=='string'||!allowed.includes(clientId))throw new RoomError(403,'MCP_CLIENT_NOT_ALLOWED');
  return context;
}

export function challenge(){
  return new Response(JSON.stringify({error:'authorization_required'}),{status:401,headers:{'Content-Type':'application/json',
    'WWW-Authenticate':`Bearer resource_metadata="https://visionseek.org/.well-known/oauth-protected-resource"`,
    'Cache-Control':'no-store'}});
}

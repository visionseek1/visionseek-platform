import {authorizationServer,mcpResource} from '@/lib/leaders/mcp/auth';
export const runtime='nodejs';
export function GET(){
  try{return Response.json({resource:mcpResource,authorization_servers:[authorizationServer()],scopes_supported:['openid']},
    {headers:{'Cache-Control':'public, max-age=300'}});}
  catch{return Response.json({error:'MCP_NOT_CONFIGURED'},{status:503});}
}

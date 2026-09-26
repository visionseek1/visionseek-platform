import {requireIntegration,dispatchDrafts} from '@/lib/leaders/editorial/automation';
import {roomResponse,fail} from '@/lib/leaders/editorial/server';
export const runtime='nodejs';export const maxDuration=60;
export async function POST(request:Request){try{
 requireIntegration(request);return roomResponse(await dispatchDrafts(false));
}catch(error){return fail(error);}}

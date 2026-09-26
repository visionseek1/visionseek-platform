import {requireIntegration,executeDraft} from '@/lib/leaders/editorial/automation';
import {workerPayload} from '@/lib/leaders/editorial/automation-contract';
import {roomResponse,fail,readJson} from '@/lib/leaders/editorial/server';
export const runtime='nodejs';export const maxDuration=60;
export async function POST(request:Request){try{
 requireIntegration(request);const input=workerPayload.parse(await readJson(request));
 return roomResponse(await executeDraft(input.job_id,input.run_id));
}catch(error){return fail(error);}}

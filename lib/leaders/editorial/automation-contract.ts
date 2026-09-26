import {z} from 'zod';
export const automationAction=z.discriminatedUnion('action',[
 z.object({action:z.literal('run_once')}).strict(),
 z.object({action:z.literal('check_model')}).strict(),
 z.object({action:z.literal('set_enabled'),enabled:z.boolean()}).strict(),
]);
export const workerPayload=z.object({job_id:z.string().uuid(),run_id:z.string().min(1).max(120)}).strict();
export function transientModelError(code:string){return ['MODEL_RATE_LIMITED','MODEL_TIMEOUT','MODEL_FAILED'].includes(code);}
export function safeUsage(value:unknown){
 const result=z.object({prompt_tokens:z.number().nonnegative().optional(),completion_tokens:z.number().nonnegative().optional(),total_tokens:z.number().nonnegative().optional(),cost:z.number().nonnegative().optional()}).safeParse(value);
 return result.success?result.data:null;
}
export type DraftingJob={id:string;item_id:string;origin:'manual'|'schedule';status:'queued'|'running'|'succeeded'|'failed'|'cancelled';attempts:number;trigger_run_id:string|null;last_error:string|null;usage:ReturnType<typeof safeUsage>;created_at:string;updated_at:string};
export type AutomationSnapshot={
 configured:boolean;missing:string[];owner_matches:boolean;enabled:boolean;daily_limit:number;
 last_tick_at:string|null;last_worker_at:string|null;model:string|null;jobs:DraftingJob[];
};

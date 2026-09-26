import {defineConfig} from '@trigger.dev/sdk';
export default defineConfig({
 project:process.env.TRIGGER_PROJECT_ID||'proj_vkswkcknvnvsohhozdom',
 runtime:'node-22',
 dirs:['./trigger'],
 maxDuration:600,
 retries:{enabledInDev:true,default:{maxAttempts:3,minTimeoutInMs:185000,maxTimeoutInMs:190000,factor:1,randomize:true}},
});

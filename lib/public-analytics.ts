const publicPaths = new Set(['','/about','/about/what-we-do','/pharmaceuticals','/insights','/reports','/reports/physical-ai','/work-with-us','/start','/privacy','/terms']);
/** Only public pageview URLs. Never queries, fragments, admin paths or custom events. */
export function publicAnalyticsUrl(raw:string):string|null {
 try {const url=new URL(raw);if(!['https:','http:'].includes(url.protocol))return null;
 const normalized=url.pathname.replace(/\/$/,'').replace(/^\/(ar|ko)(?=\/|$)/,'');
 if(!publicPaths.has(normalized))return null;
 url.search='';url.hash='';return url.href;
 }catch{return null;}
}

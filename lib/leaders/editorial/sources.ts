import {sourceCatalog} from './schema';
import {RoomError} from './server';
import {extractSourceText} from './text';
export async function fetchCatalogSource(id:string){
 const source=sourceCatalog.find(s=>s.id===id);if(!source)throw new RoomError(400,'UNKNOWN_SOURCE');
 // Only fetch exact curated URLs. Never fetch user-supplied hosts or follow redirects.
 const response=await fetch(source.url,{redirect:'error',signal:AbortSignal.timeout(15000),headers:{Accept:'text/html,text/plain','User-Agent':'VisionSeek-Editorial/1.0'},cache:'no-store'});
 if(!response.ok||!/^text\/(html|plain)/i.test(response.headers.get('content-type')||''))throw new RoomError(502,'SOURCE_UNAVAILABLE');
 const reader=response.body?.getReader();if(!reader)throw new RoomError(502,'SOURCE_UNAVAILABLE');
 let size=0;const chunks:Uint8Array[]=[];for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>2000000){await reader.cancel();throw new RoomError(413,'SOURCE_TOO_LARGE');}chunks.push(value);}
 const excerpt=extractSourceText(Buffer.concat(chunks).toString('utf8'));
 if(excerpt.length<100)throw new RoomError(422,'SOURCE_NEEDS_PASTE');
 return {character_id:source.character_id,source_url:source.url,source_label:source.label,source_title:source.title,source_excerpt:excerpt,source_method:'fetched',source_fetched_at:new Date().toISOString()};
}

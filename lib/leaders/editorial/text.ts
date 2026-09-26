/** Extract text for evidence review, never HTML for rendering. Decode entities once. */
export function extractSourceText(html:string){
 const body=html.match(/<main\b[^>]*>([\s\S]*?)<\/main\s*>/i)?.[1]||html;
 const text=body.replace(/<(script|style|nav|header|footer|aside)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,' ').replace(/<[^>]*>/g,' ');
 const entities:Record<string,string>={'&nbsp;':' ','&#160;':' ','&amp;':'&','&quot;':'"','&#39;':"'",'&apos;':"'",'&lt;':'<','&gt;':'>'};
 return text.replace(/&(?:nbsp|amp|quot|apos|lt|gt|#160|#39);/g,entity=>entities[entity]).replace(/\s+/g,' ').trim().slice(0,16000);
}

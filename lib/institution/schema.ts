export type Locale = 'en' | 'ar';
export type Text = {en:string;ar:string};
export const t = (en:string,ar:string):Text => ({en,ar});
export type SectionId = 'work-with-us'|'opportunities'|'programs'|'news'|'workshops'|'about';
export type Block = {title:Text;body?:Text;items?:Text[]};
export type Entry = {
  section:SectionId;slug:string;title:Text;summary:Text;category:Text;status:Text;
  image:string;code?:string;name?:Text;blocks:Block[];related?:string[];
  facts?:{label:Text;value:Text}[];
  source?:{title:string;url:string};
  references?:{title:string;url:string}[];
  imageCredit?:{name:string;url:string};
  action?:'concept'|'interest'|'workshop';
  cta?:{title:Text;label:Text;href:string};
};

/** Split «Aegis: …» / «أبيكس: …» so a Latin or short name is not mixed into the heading (bidi). */
export function splitNamedTitle(title:string){
  const colon=title.indexOf(':');
  if(colon>0&&colon<=16){
    const name=title.slice(0,colon).trim();
    const rest=title.slice(colon+1).trim();
    if(name&&rest) return {name,rest};
  }
  return {name:undefined as string|undefined,rest:title};
}
export type Section = {id:SectionId;title:Text;eyebrow:Text;intro:Text;image:string;notice?:Text;links:{href:string;label:Text}[]};

/** Entry images are a field key ("science" → /field-science.jpg), a site path ("/uploads/a.jpg" or "/name.jpg"), or an absolute https URL. */
export const entryImage = (image:string) => image.startsWith('https://') || image.startsWith('/') ? image : `/field-${image}.jpg`;

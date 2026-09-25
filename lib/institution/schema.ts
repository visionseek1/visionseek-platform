export type Locale = 'en' | 'ar';
export type Text = {en:string;ar:string};
export const t = (en:string,ar:string):Text => ({en,ar});
export type SectionId = 'work-with-us'|'opportunities'|'programs'|'offices'|'news'|'workshops'|'careers'|'about';
export type Block = {title:Text;body?:Text;items?:Text[]};
export type Entry = {
  section:SectionId;slug:string;title:Text;summary:Text;category:Text;status:Text;
  image:string;code?:string;blocks:Block[];related?:string[];
  facts?:{label:Text;value:Text}[];
  source?:{title:string;url:string};
  action?:'concept'|'interest'|'workshop'|'career';
};
export type Section = {id:SectionId;title:Text;eyebrow:Text;intro:Text;image:string;notice?:Text;links:{href:string;label:Text}[]};

import type {LeaderPost, Topic} from './types';

export const collectionOptions = [
  {id:'later',ar:'أعود إليها لاحقًا',en:'Read later'},
  {id:'team',ar:'أناقشها مع الفريق',en:'Discuss with my team'},
  {id:'opportunities',ar:'فرص أدرسها',en:'Opportunities to explore'},
] as const;
export type CollectionId = typeof collectionOptions[number]['id'];
export type ReaderPreferences = {version:1; interests:Topic[]; less:Topic[]; collections:Record<string,CollectionId[]>};
export const emptyPreferences:ReaderPreferences = {version:1,interests:[],less:[],collections:{}};
const topicIds = new Set(['leadership','ai','strategy','capabilities','innovation']);
export function normalizePreferences(raw:unknown, legacySaved:string[]=[]):ReaderPreferences {
  const value = raw && typeof raw==='object' ? raw as Record<string,unknown> : {};
  const validTopics=(list:unknown):Topic[]=>Array.isArray(list)?[...new Set(list.filter((t):t is Topic=>typeof t==='string'&&topicIds.has(t)))]:[];
  const collections:Record<string,CollectionId[]>={};
  const source=value.collections;
  if(source&&typeof source==='object'&&!Array.isArray(source)) for(const [id,groups] of Object.entries(source)) {
    if(id==='__proto__'||id==='constructor'||id==='prototype'||id.length>100)continue;
    if(Array.isArray(groups)) {
      const valid=[...new Set(groups.filter((g):g is CollectionId=>collectionOptions.some(c=>c.id===g)))];
      if(valid.length)collections[id]=valid;
    }
  }
  // Only migrate once; an intentionally emptied v1 collection must stay empty.
  if(value.version!==1)for(const id of legacySaved)if(/^[\w-]{1,100}$/.test(id))collections[id]=['later'];
  const interests=validTopics(value.interests);
  return {version:1,interests,less:validTopics(value.less).filter(t=>!interests.includes(t)),collections};
}
export function setTopicPreference(p:ReaderPreferences,topic:Topic,choice:'more'|'less'|'neutral'):ReaderPreferences {
  return {...p,interests:[...p.interests.filter(t=>t!==topic),...(choice==='more'?[topic]:[])],less:[...p.less.filter(t=>t!==topic),...(choice==='less'?[topic]:[])]};
}
export function toggleCollection(p:ReaderPreferences,id:string,group:CollectionId):ReaderPreferences {
  const current=p.collections[id]||[];
  const next=current.includes(group)?current.filter(x=>x!==group):[...current,group];
  const collections={...p.collections};
  if(next.length)collections[id]=next;else delete collections[id];
  return {...p,collections};
}
export function rankPosts(posts:LeaderPost[],p:ReaderPreferences):LeaderPost[] {
  const score=(post:LeaderPost)=>(p.interests.includes(post.topic)?4:0)-(p.less.includes(post.topic)?4:0)+(post.featured?1:0);
  return [...posts].sort((a,b)=>score(b)-score(a)||Date.parse(b.published_at||b.created_at)-Date.parse(a.published_at||a.created_at)||a.id.localeCompare(b.id));
}
export function capabilityLink(post:LeaderPost,locale:'ar'|'en') {
  return `${locale==='ar'?'/ar':''}/start?from=leaders&idea=${encodeURIComponent((locale==='en'&&post.title_en?post.title_en:post.title).slice(0,180))}`;
}

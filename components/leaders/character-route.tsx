import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {characterById,characters,characterPath} from '@/lib/leaders/characters';
import type {Locale} from '@/lib/leaders/types';
import LeadersFeed from './feed';

export function characterParams(){return characters.map(c=>({slug:c.id}));}
export async function characterMetadata(params:Promise<{slug:string}>,locale:Locale):Promise<Metadata>{
 const {slug}=await params;const character=characterById(slug);if(!character)notFound();
 return {title:`${character.name[locale]} — ${character.sector[locale]} | VisionSeek`,description:character.bio[locale],alternates:{canonical:characterPath(slug,locale),languages:{ar:characterPath(slug,'ar'),en:characterPath(slug,'en')}}};
}
export async function CharacterRoute({params,locale}:{params:Promise<{slug:string}>;locale:Locale}){
 const {slug}=await params;if(!characterById(slug))notFound();
 return <LeadersFeed locale={locale} characterId={slug}/>;
}

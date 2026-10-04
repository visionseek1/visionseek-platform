import type {Metadata} from 'next';
import {notFound,redirect} from 'next/navigation';
import {characterById,characters,characterPath,isPublicCharacter} from '@/lib/leaders/characters';
import type {Locale} from '@/lib/leaders/types';
import LeadersFeed from './feed';

export function characterParams(){return [...characters.map(c=>({slug:c.id})),{slug:'kapsula'}];}
export async function characterMetadata(params:Promise<{slug:string}>,locale:Locale):Promise<Metadata>{
 const {slug}=await params;const character=characterById(slug);if(!character)notFound();
 return {robots:isPublicCharacter(slug)?undefined:{index:false,follow:false},title:`${character.name[locale]} — ${character.sector[locale]} | VisionSeek`,description:character.bio[locale],alternates:{canonical:characterPath(slug,locale),languages:{ar:characterPath(slug,'ar'),en:characterPath(slug,'en')}}};
}
export async function CharacterRoute({params,locale}:{params:Promise<{slug:string}>;locale:Locale}){
 const {slug}=await params;if(!characterById(slug))notFound();
 if(slug==='medo')redirect(characterPath('medo',locale));
 if(!isPublicCharacter(slug))redirect(`${locale==='ar'?'/ar':''}/insights?archived=sector`);
 return <LeadersFeed locale={locale} characterId={slug}/>;
}

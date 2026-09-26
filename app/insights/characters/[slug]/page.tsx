import {CharacterRoute,characterMetadata,characterParams} from '@/components/leaders/character-route';
export const dynamicParams=false;
export const generateStaticParams=characterParams;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){return characterMetadata(params,'en');}
export default function Character({params}:{params:Promise<{slug:string}>}){return <CharacterRoute params={params} locale="en"/>;}

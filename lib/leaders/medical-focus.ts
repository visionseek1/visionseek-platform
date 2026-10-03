import {isVisible,type LeaderPost} from './types';
export const MEDICAL_PUBLISHING_ID='medo';
// Sector relevance, not publication age, controls visibility.
export function isMedicalPublication(post:LeaderPost,now=Date.now()){
 return !!(post.character_id===MEDICAL_PUBLISHING_ID || post.sector_ids?.some(id=>['health','pharmaceuticals'].includes(id))) && isVisible(post,now);
}

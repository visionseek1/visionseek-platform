import {isVisible,type LeaderPost} from './types';
/** Existing publishing identity; UI presents the sector rather than its former cartoon. */
export const MEDICAL_PUBLISHING_ID='medo';
export const MEDICAL_FOCUS_FROM='2026-10-03T00:00:00.000Z';
export function isMedicalPublication(post:LeaderPost,now=Date.now()){
 return post.character_id===MEDICAL_PUBLISHING_ID && isVisible(post,now) &&
  Date.parse(post.published_at!)>=Date.parse(MEDICAL_FOCUS_FROM);
}

import type {Photo} from './types';
export {getContent} from '@/services/cms';
export {telephone} from './phone';
/** Images go through the standard Next/Image same-origin optimizer. */
export function photoUrl(photo?:Photo){
 if(photo?.localPath?.startsWith('/images/'))return photo.localPath;
 if(photo?.url?.startsWith('https://cdn.sanity.io/images/'))return photo.url;
 return undefined;
}

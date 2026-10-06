import 'server-only';
import {cache} from 'react';
import {demo} from '@/lib/data';
import type {Content} from '@/lib/types';
/** Replace this provider facade to move to another CMS without changing the UI. */
export const getContent=cache(async ():Promise<Content>=>{
 const provider=process.env.CMS_PROVIDER || (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?'sanity':'local');
 if(provider==='local')return demo;
 if(provider==='sanity'){const {getSanityContent}=await import('./sanity');return getSanityContent();}
 throw new Error('CMS_PROVIDER must be local or sanity.');
});

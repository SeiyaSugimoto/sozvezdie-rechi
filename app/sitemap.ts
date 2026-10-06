import type {MetadataRoute} from 'next';
import {getSiteUrl,isPreview} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{
 const origin=getSiteUrl();
 if(!origin||isPreview())return [];
 return ['','services','specialists','about','gallery','reviews','vacancies','contacts'].map(path=>({url:new URL(`/${path}`,origin).href,changeFrequency:'weekly',priority:path?0.7:1}));
}

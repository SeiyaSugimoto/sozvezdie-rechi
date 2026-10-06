import type {MetadataRoute} from 'next';
import {getSiteUrl,isPreview} from '@/lib/site';
export default function robots():MetadataRoute.Robots{
 const url=getSiteUrl();
 if(isPreview())return {rules:{userAgent:'*',disallow:'/'}};
 return {rules:{userAgent:'*',allow:'/'},...(url?{sitemap:new URL('/sitemap.xml',url).href}:{})};
}

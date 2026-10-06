import 'server-only';
import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type {Content,Photo} from '@/lib/types';
import type {SanityContent,SanityPhoto} from './types';
export async function getSanityContent():Promise<Content> {
 const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
 if(!projectId) throw new Error('CMS_PROVIDER=sanity requires NEXT_PUBLIC_SANITY_PROJECT_ID.');
 const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',apiVersion:process.env.SANITY_API_VERSION||'2026-10-01',useCdn:false,token:process.env.SANITY_API_READ_TOKEN||undefined,perspective:'published',timeout:10000,maxRetries:1});
 const query=`{"services":*[_type=="service" && active==true]|order(order asc),"specialists":*[_type=="specialist" && visible==true]|order(order asc),"reviews":*[_type=="review" && visible==true]|order(order asc),"vacancies":*[_type=="vacancy" && active==true]|order(order asc),"gallery":*[_type=="galleryItem"]|order(order asc),"contacts":*[_type=="contacts" && _id=="contacts"][0],"about":*[_type=="about" && _id=="about"][0]}`;
 const raw=await client.fetch<SanityContent>(query,{}, {next:{revalidate:60,tags:['center-content']}});
 if(!raw.contacts?.phone || !raw.contacts?.address || !raw.about?.title) throw new Error('Publish the contacts and about documents in Sanity first (npm run seed).');
 const builder=imageUrlBuilder(client);
 function photo(value?:SanityPhoto):Photo|undefined {
  if(!value)return undefined;
  if(value.localPath?.startsWith('/images/'))return {localPath:value.localPath,alt:value.alt};
  if(value.asset)return {url:builder.image(value).width(1400).auto('format').url(),alt:value.alt};
  return undefined;
 }
 return {
  services:(raw.services||[]).map(s=>({...s,photo:photo(s.photo)})),
  specialists:(raw.specialists||[]).map(s=>({...s,photo:photo(s.photo),directions:s.directions||[],certificates:s.certificates?.map(p=>photo(p)!).filter(Boolean),diplomas:s.diplomas?.map(p=>photo(p)!).filter(Boolean)})),
  reviews:(raw.reviews||[]).map(r=>({...r,photo:photo(r.photo)})),
  vacancies:(raw.vacancies||[]).map(v=>({...v,requirements:v.requirements||[]})),
  gallery:(raw.gallery||[]).map(g=>({...g,photo:photo(g.photo)!})).filter(g=>g.photo),
  contacts:raw.contacts,
  about:{...raw.about,values:raw.about.values||[],photo:photo(raw.about.photo),heroPhoto:photo(raw.about.heroPhoto),gallery:raw.about.gallery?.map(p=>photo(p)!).filter(Boolean)}
 };
}

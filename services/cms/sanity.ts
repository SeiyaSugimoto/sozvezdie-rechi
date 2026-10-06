import 'server-only';
import {sanityProjectId,sanityDataset} from '@/lib/cms-config';
import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type {Content,Photo} from '@/lib/types';
import type {SanityContent,SanityPhoto} from './types';
export async function getSanityContent():Promise<Content> {
 const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||sanityProjectId;
 if(!projectId) throw new Error('CMS_PROVIDER=sanity requires NEXT_PUBLIC_SANITY_PROJECT_ID.');
 const client=createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||sanityDataset,apiVersion:process.env.SANITY_API_VERSION||'2026-10-01',useCdn:false,token:process.env.SANITY_API_READ_TOKEN||undefined,perspective:'published',timeout:10000,maxRetries:1});
 const query=`{"services":*[_type=="service" && active==true]|order(order asc),"specialists":*[_type=="specialist" && visible==true]|order(order asc),"reviews":*[_type=="review" && visible==true]|order(order asc),"vacancies":*[_type=="vacancy" && active==true]|order(order asc),"gallery":*[_type=="galleryItem" && published==true]|order(coalesce(order,0) asc, _createdAt desc, _id asc),"contacts":*[_type=="contacts" && _id=="contacts"][0],"about":*[_type=="about" && _id=="about"][0]}`;
 const raw=await client.fetch<SanityContent>(query,{}, {next:{revalidate:60,tags:['center-content']}});
 if(!raw.contacts?.phone || !raw.contacts?.address || !raw.about?.title) throw new Error('Publish the contacts and about documents in Sanity first (npm run seed).');
 const builder=imageUrlBuilder(client);
 function photo(value?:SanityPhoto):Photo|undefined {
  if(!value)return undefined;
  if(value.localPath?.startsWith('/images/'))return {localPath:value.localPath,alt:value.alt};
  if(value.asset)return {url:builder.image(value).width(1400).auto('format').url(),alt:value.alt,position:value.hotspot?`${value.hotspot.x*100}% ${value.hotspot.y*100}%`:undefined};
  return undefined;
 }
 return {
  services:(raw.services||[]).map(s=>({...s,photo:photo(s.photo)})),
  specialists:(raw.specialists||[]).map(s=>({...s,photo:photo(s.photo),directions:s.directions||[],certificates:s.certificates?.map(p=>photo(p)!).filter(Boolean),diplomas:s.diplomas?.map(p=>photo(p)!).filter(Boolean)})),
  reviews:(raw.reviews||[]).map(r=>({...r,photo:photo(r.photo)})),
  vacancies:(raw.vacancies||[]).map(v=>({...v,requirements:v.requirements||[]})),
  gallery:(raw.gallery||[]).map(g=>({...g,image:photo(g.image||g.photo)!,title:g.title||g.caption||'Фотография центра',caption:g.caption||'',alt:g.alt||g.image?.alt||g.photo?.alt||g.title||'Фотография центра'})).filter(g=>g.image),
  contacts:raw.contacts,
  about:{...raw.about,values:raw.about.values||[],photo:photo(raw.about.photo),heroPhoto:photo(raw.about.heroPhoto),gallery:raw.about.gallery?.map(p=>photo(p)!).filter(Boolean)}
 };
}

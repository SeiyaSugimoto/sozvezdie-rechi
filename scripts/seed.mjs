import {createClient} from '@sanity/client';
import ts from 'typescript';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../lib/data.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {demo}=await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||'m0yruyhq';
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||'production';
const apiVersion=process.env.SANITY_API_VERSION||'2026-10-01';
const client=process.env.SANITY_API_WRITE_TOKEN
 ?createClient({projectId,dataset,apiVersion,useCdn:false,token:process.env.SANITY_API_WRITE_TOKEN})
 :(await import('sanity/cli')).getCliClient({apiVersion}).withConfig({projectId,dataset,useCdn:false});
if(!client.config().token)throw new Error('Sanity login required. Run npm run studio:login, then npm run seed:login.');
const assets=new Map();
async function uploadPhotos(value){
 if(Array.isArray(value))return Promise.all(value.map(uploadPhotos));
 if(!value||typeof value!=='object')return value;
 if(value.localPath?.startsWith('/images/')){
  let asset=assets.get(value.localPath);
  if(!asset){asset=await client.assets.upload('image',await readFile(new URL('../public'+value.localPath,import.meta.url)),{filename:value.localPath.split('/').pop()});assets.set(value.localPath,asset);}
  return {_type:'image',asset:{_type:'reference',_ref:asset._id},alt:value.alt};
 }
 return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([key,item])=>[key,await uploadPhotos(item)])));
}
let tx=client.transaction();
for(const [key,type] of Object.entries({services:'service',specialists:'specialist',reviews:'review',vacancies:'vacancy',gallery:'galleryItem'}))for(const item of demo[key]){if(!await client.getDocument(item._id))tx=tx.createIfNotExists({...await uploadPhotos(item),_type:type});};
for(const type of ['contacts','about'])if(!await client.getDocument(type))tx=tx.createIfNotExists({...await uploadPhotos(demo[type]),_id:type,_type:type});
await tx.commit();console.log('Initial content added. Existing documents were preserved.');

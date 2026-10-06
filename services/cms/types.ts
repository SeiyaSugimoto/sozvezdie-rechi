import type {About,Contacts,Service,Specialist,Review,Vacancy,GalleryItem,Photo} from '@/lib/types';
/** Raw Sanity types stay in the provider; components receive CMS-independent models. */
export type SanityPhoto = Omit<Photo,'url'> & {
  asset?: {_ref:string};
  crop?: {top:number;bottom:number;left:number;right:number};
  hotspot?: {x:number;y:number;width:number;height:number};
};
export type SanityContent = {
  services: (Omit<Service,'photo'> & {photo?:SanityPhoto})[];
  specialists: (Omit<Specialist,'photo'|'certificates'|'diplomas'> & {photo?:SanityPhoto;certificates?:SanityPhoto[];diplomas?:SanityPhoto[]})[];
  reviews: (Omit<Review,'photo'> & {photo?:SanityPhoto})[];
  vacancies: Vacancy[];
  gallery: (Omit<GalleryItem,'image'> & {image?:SanityPhoto;photo?:SanityPhoto})[];
  contacts: Contacts | null;
  about: (Omit<About,'photo'|'heroPhoto'|'gallery'> & {photo?:SanityPhoto;heroPhoto?:SanityPhoto;gallery?:SanityPhoto[]}) | null;
};

import type {Metadata} from 'next';
import {Gallery} from '@/components/Gallery';
import {CTASection} from '@/components/Content';
import {getContent} from '@/lib/content';
import {getSiteUrl} from '@/lib/site';
const description='Фотографии центра «Созвездие речи» в Солнечногорске: занятия, творчество, события и пространство для развития.';
export function generateMetadata():Metadata{
 const origin=getSiteUrl();
 return {title:'Галерея',description,...(origin?{alternates:{canonical:'/gallery'}}:{}),openGraph:{title:'Галерея | Созвездие речи',description,locale:'ru_RU',type:'website',...(origin?{url:new URL('/gallery',origin).href}:{})}};
}
export default async function GalleryPage(){
 const data=await getContent();
 return <><div className="page-intro wrap"><span className="eyebrow">Созвездие речи · Солнечногорск</span><h1>Галерея</h1><p>Моменты из жизни нашего центра</p></div><section className="wrap section page-content"><p className="page-lead">Наше пространство, занятия, творчество и встречи. Нажмите на фотографию, чтобы рассмотреть её ближе.</p><Gallery items={data.gallery}/></section><CTASection contacts={data.contacts}/></>;
}

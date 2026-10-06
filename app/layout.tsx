import type {Metadata} from 'next';
import './globals.css';
import './sky-theme.css';
import localFont from 'next/font/local';
const manrope=localFont({src:'../public/fonts/Manrope-Variable.ttf',weight:'200 800',display:'swap',fallback:['Arial','sans-serif']});
import {Header} from '@/components/Header';
import {Footer} from '@/components/Content';
import {getContent} from '@/lib/content';
import {getSiteUrl,isPreview} from '@/lib/site';
const siteUrl=getSiteUrl();
const origin=siteUrl?.origin;
export const metadata:Metadata={...(origin?{metadataBase:new URL(origin)}:{}),...(origin?{alternates:{canonical:'/'}}:{}),title:{default:'Созвездие речи — центр развития в Солнечногорске',template:'%s | Созвездие речи'},description:'Логопед-дефектолог, нейропсихолог и детский психолог в Солнечногорске. Развитие речи и поддержка детей от 2 лет и взрослых. Запись: 8-926-484-02-48.',openGraph:{title:'Созвездие речи — рядом на каждом шаге',description:'Центр развития, речи и поддержки детей и взрослых в Солнечногорске.',locale:'ru_RU',type:'website',...(origin?{url:origin}:{}),siteName:'Созвездие речи'},robots:isPreview()?{index:false,follow:false}:{index:true,follow:true},icons:{icon:'/icon.svg'}};
export default async function RootLayout({children}:{children:React.ReactNode}){const {contacts}=await getContent();const json={'@context':'https://schema.org','@type':'LocalBusiness',name:'Созвездие речи',telephone:contacts.phone,address:{'@type':'PostalAddress',streetAddress:contacts.address,addressLocality:'Солнечногорск',addressRegion:'Московская область',addressCountry:'RU'},...(origin?{url:origin}:{}),foundingDate:'2024'};return <html lang="ru"><body className={manrope.className}><a href="#main" className="skip-link">Перейти к содержимому</a><Header phone={contacts.phone} address={contacts.address}/><main id="main">{children}</main><Footer contacts={contacts}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(json).replace(/</g,'\\u003c')}}/></body></html>}

'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import {ChevronLeft,ChevronRight,Expand,X} from 'lucide-react';
import type {GalleryItem} from '@/lib/types';
import {photoUrl} from '@/lib/photo';

export function Gallery({items}:{items:GalleryItem[]}){
 const photos=items.filter(item=>item.published&&photoUrl(item.image));
 const [selected,setSelected]=useState<number|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 const triggers=useRef<(HTMLButtonElement|null)[]>([]);
 const opener=useRef(0);
 const isOpen=selected!==null;
 useEffect(()=>{
  if(!isOpen)return;
  const modal=dialog.current;
  const overflow=document.body.style.overflow;
  const trigger=triggers.current[opener.current];
  modal?.showModal();document.body.style.overflow='hidden';
  return ()=>{modal?.close();document.body.style.overflow=overflow;trigger?.focus();};
 },[isOpen]);
 const move=(direction:number)=>setSelected(current=>current===null?null:(current+direction+photos.length)%photos.length);
 const active=selected===null?undefined:photos[selected];
 return <>
  {photos.length?<div className="photo-grid">{photos.map((item,index)=><figure key={item._id} className="photo-tile"><button ref={element=>{triggers.current[index]=element;}} className="photo-tile-button" aria-label={`Открыть фотографию: ${item.title}`} onClick={()=>{opener.current=index;setSelected(index);}}><Image src={photoUrl(item.image)!} alt={item.alt||item.title} fill sizes="(max-width: 479px) 100vw, (max-width: 899px) 50vw, 33vw" style={{objectPosition:item.image.position||'50% 35%'}}/><span className="photo-expand" aria-hidden="true"><Expand size={19}/></span></button><figcaption>{item.category&&<span className="photo-category">{item.category}</span>}<h3>{item.title}</h3>{item.caption&&<p>{item.caption}</p>}</figcaption></figure>)}</div>:<p className="gallery-empty">Скоро здесь появятся фотографии нашего центра и занятий.</p>}
  <dialog ref={dialog} className="photo-dialog" aria-label="Просмотр фотографий" onCancel={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget)setSelected(null);}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}}}>
   {active&&<div className="lightbox-panel"><div className="lightbox-toolbar"><span aria-live="polite">{selected!+1} / {photos.length}</span><button autoFocus onClick={()=>setSelected(null)} aria-label="Закрыть"><X/></button></div><div className="lightbox-image"><Image key={active._id} src={photoUrl(active.image)!} alt={active.alt||active.title} fill sizes="(max-width: 1000px) 100vw, 1200px" style={{objectFit:'contain'}}/>{photos.length>1&&<><button className="lightbox-prev" aria-label="Предыдущая фотография" onClick={()=>move(-1)}><ChevronLeft/></button><button className="lightbox-next" aria-label="Следующая фотография" onClick={()=>move(1)}><ChevronRight/></button></>}</div><div className="lightbox-caption" aria-live="polite"><h2>{active.title}</h2>{active.caption&&<p>{active.caption}</p>}</div></div>}
  </dialog>
 </>;
}

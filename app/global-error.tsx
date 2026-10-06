'use client';
export default function GlobalError({reset}:{reset:()=>void}){
 return <html lang="ru"><body style={{fontFamily:'Arial,sans-serif',padding:'48px 24px',maxWidth:680,margin:'0 auto',lineHeight:1.7,color:'#283a44'}}><h1>Не удалось загрузить страницу</h1><p>Попробуйте ещё раз или позвоните в центр «Созвездие речи».</p><p><a href="tel:+79264840248">8-926-484-02-48</a></p><button onClick={reset} style={{minHeight:48,padding:'12px 20px',fontSize:16}}>Попробовать снова</button></body></html>;
}

'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <div className="wrap page-intro"><h1>Не удалось загрузить страницу</h1><p>Попробуйте ещё раз или позвоните нам: <a href="tel:+79264840248">8-926-484-02-48</a>.</p><button className="button primary" onClick={reset}>Попробовать снова</button></div>}

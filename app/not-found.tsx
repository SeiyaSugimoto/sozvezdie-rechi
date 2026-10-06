import Link from 'next/link';
export default function NotFound(){return <div className="wrap page-intro"><span className="eyebrow">Страница не найдена</span><h1>Давайте начнём<br/>с главной.</h1><p>Возможно, адрес изменился. На главной странице вы найдёте услуги и контакты центра.</p><Link href="/" className="button primary">На главную</Link></div>}

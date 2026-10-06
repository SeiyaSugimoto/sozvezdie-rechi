import Link from 'next/link';
import {getContent,telephone} from '@/lib/content';
import {BookingCTA,PhotoFrame,SectionHeading,ServiceCard,WhyUs,SpecialistCard,Reviews,CTASection,ContactSection,Values} from '@/components/Content';
export default async function Home(){
 const data=await getContent();
 return <>
  <section className="hero wrap">
   <div className="hero-copy">
    <p className="eyebrow">Солнечногорск · Дети и взрослые</p>
    <h1>Развиваем речь.<br/>Помогаем учиться.<br/><em>Поддерживаем семью.</em></h1>
    <p className="hero-description">Логопед, нейропсихолог и детский психолог. Бережные занятия, понятные цели и внимание к тому, что важно именно вам.</p>
    <div className="hero-actions"><BookingCTA contacts={data.contacts} label="Обсудить занятия"/><a className="hero-phone" href={telephone(data.contacts.phone)}>{data.contacts.phone}</a></div>
    <p className="hero-note">Для детей от 2 лет, школьников и взрослых.<br/>Начнём с разговора — подскажем, к кому обратиться.</p>
   </div>
   <figure className="hero-visual">
    <PhotoFrame photo={data.about.heroPhoto} alt="Ребёнок занимается со специалистом" priority className="hero-photo"/>
    <figcaption><span>Вместе, шаг за шагом.</span> В своём темпе.</figcaption>
   </figure>
  </section>
  <div className="wrap stats"><div><strong>С 2 лет<span> и взрослые</span></strong><p>Поддержка на разных этапах жизни</p></div><div><strong>45 минут</strong><p>Стандартное индивидуальное занятие</p></div><div><strong>С 2024 года</strong><p>В Солнечногорске, на Пролетарской</p></div></div>
  <section className="wrap section directions-section"><SectionHeading eyebrow="Направления работы" title="Что сейчас важно для вас?" description="Развивать речь, легче учиться, понимать эмоции — вместе подберём подходящее направление." link={['/services','Смотреть все услуги']}/><div className="service-grid">{data.services.slice(0,6).map((service,i)=><ServiceCard key={service._id} service={service} index={i}/>)}</div></section>
  <WhyUs/>
  <section className="wrap section"><SectionHeading eyebrow="Наша команда" title="Люди, которым можно доверять" description="Подход, образование и опыт каждого специалиста — чтобы вам было проще познакомиться." link={['/specialists','О специалистах']}/><div className="specialist-grid">{data.specialists.slice(0,3).map((specialist,i)=><SpecialistCard key={specialist._id} specialist={specialist} index={i}/>)}</div></section>
  <section className="wrap about-section"><figure><PhotoFrame fallback="/images/about-movement.jpg" photo={data.about.photo} alt="Упражнение на координацию с поддержкой специалиста" className="about-photo"/><figcaption>Развитие — это и слова, и движение, и маленькие открытия.</figcaption></figure><div><span className="eyebrow">О центре «Созвездие речи»</span><h2>{data.about.title}</h2><p>{data.about.history}</p><p>{data.about.description}</p><Values values={data.about.values}/><Link href="/about" className="text-link">Подробнее о центре</Link></div></section>
  <section className="wrap section"><SectionHeading eyebrow="Отзывы" title="Что говорят наши семьи" link={['/reviews','Все отзывы']}/><Reviews data={data}/></section>
  <CTASection contacts={data.contacts}/><ContactSection contacts={data.contacts}/>
 </>;
}

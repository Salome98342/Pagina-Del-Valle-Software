import React from 'react';
import { ArrowUpRight, Eye, Gem, Handshake, HeartHandshake, ShieldCheck, Target, Users, Zap } from 'lucide-react';
import { Footer, Navbar } from '../layout';
import { PROJECTS_DATA } from '../../data/companyData';
import { TeamSection } from './TeamSection';
import { FadeInSection, StaggerContainer, StaggerItem } from '../ui/Reveal';

const values = [
  { title: 'Transparencia radical', text: 'Hablamos claro en cada etapa. Sin letra pequeña ni tecnicismos: todo es visible, simple y comprensible.', Icon: ShieldCheck },
  { title: 'Agilidad práctica', text: 'Entregas continuas, soluciones funcionales y capacidad de adaptación. Respondemos a los cambios del mercado y de tu negocio.', Icon: Zap },
  { title: 'Cercanía y empatía local', text: 'Somos parte de la misma comunidad. Escuchamos, entendemos y creamos soluciones que facilitan tu día a día.', Icon: HeartHandshake },
  { title: 'Excelencia técnica', text: 'Software estable, seguro e intuitivo. Buscamos calidad y buen rendimiento para cada negocio.', Icon: Gem },
  { title: 'Colaboración activa', text: 'Tu experiencia se une a nuestro conocimiento técnico. Trabajamos juntos, con comunicación abierta durante todo el proceso.', Icon: Handshake },
];

export const AboutPage: React.FC = () => (
  <div className="page-shell">
    <Navbar />
    <main className="pt-24 sm:pt-28">
      <section className="relative overflow-hidden border-b border-slate-800/80 py-20 sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-48 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sm font-semibold text-sky-300"><Users className="h-4 w-4" /> Sobre Del Valle Software</span>
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">Cinco jóvenes emprendedores, <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">una visión compartida.</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">Somos un equipo colombiano que combina tecnología, estrategia y cercanía para ayudar a empresas y comercios a trabajar mejor. Escuchamos cada necesidad y construimos soluciones a la medida, con comunicación clara y acompañamiento directo.</p>
            <a href="#equipo" className="mt-8 inline-flex items-center gap-2 font-semibold text-sky-300 hover:text-sky-200">Conoce a las cinco personas del equipo <ArrowUpRight className="h-4 w-4" /></a>
          </FadeInSection>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid items-stretch max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeInSection>
            <article className="h-full rounded-3xl border border-sky-500/20 bg-gradient-to-br from-slate-900 to-sky-950/40 p-8 sm:p-10">
              <Target className="h-9 w-9 text-sky-400" /><h2 className="mt-5 text-3xl font-bold text-white">Nuestra misión</h2>
              <p className="mt-5 leading-relaxed text-slate-300">Desarrollar soluciones informáticas accesibles, honestas y a la medida para empresas pequeñas, medianas y grandes. Impulsamos el crecimiento de los comerciantes locales mediante la automatización y la innovación tecnológica, con acompañamiento cercano y transparente en cada paso.</p>
              <p className="mt-4 leading-relaxed text-slate-300">Queremos que la tecnología sea una herramienta clara y útil para que cada negocio avance con confianza.</p>
            </article>
          </FadeInSection>
          <FadeInSection>
            <article className="h-full rounded-3xl border border-sky-500/20 bg-gradient-to-br from-slate-900 to-sky-950/40 p-8 sm:p-10">
              <Eye className="h-9 w-9 text-sky-400" /><h2 className="mt-5 text-3xl font-bold text-white">Nuestra visión</h2>
              <p className="mt-5 leading-relaxed text-slate-300">Consolidarnos como el aliado tecnológico de confianza para comercios de toda Colombia, transformando la gestión empresarial mediante sistemas transparentes, ágiles y de alta calidad.</p>
              <p className="mt-4 leading-relaxed text-slate-300">Aspiramos a impulsar el éxito comercial con procesos claros y tecnología accesible, construyendo relaciones duraderas con las empresas de cada región.</p>
            </article>
          </FadeInSection>
        </div>
      </section>

      <section className="border-y border-slate-800/80 bg-slate-900/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInSection><div className="mb-12 max-w-2xl"><p className="font-semibold uppercase tracking-[0.2em] text-sky-400">Lo que nos guía</p><h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Nuestros valores</h2><p className="mt-4 text-slate-300">Principios que orientan cómo pensamos, desarrollamos y colaboramos con cada cliente.</p></div></FadeInSection>
          <StaggerContainer className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {values.map(({ title, text, Icon }, index) => (
              <StaggerItem
                key={title}
                className={`lg:col-span-2 ${index === 3 ? 'lg:col-start-2' : ''} ${index === 4 ? 'lg:col-start-4' : ''}`}
              >
                <article className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
                  <span className="inline-flex rounded-xl border border-sky-500/20 bg-sky-500/10 p-3 text-sky-400"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-400">{text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInSection><div className="mb-12 max-w-3xl"><p className="font-semibold uppercase tracking-[0.2em] text-sky-400">Nuestro trayecto</p><h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Aprendemos construyendo soluciones reales</h2><p className="mt-4 leading-relaxed text-slate-300">Somos un equipo joven y emprendedor con una gran visión. Nuestro camino se construye proyecto a proyecto, trabajando con organizaciones y negocios de nuestra región para resolver retos concretos con tecnología.</p></div></FadeInSection>
          <div className="grid gap-5 lg:grid-cols-2">
            {PROJECTS_DATA.map((project) => {
              const inProgress = project.id === 'psicoarte';
              return <article key={project.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8"><div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">{inProgress ? 'En desarrollo' : 'Proyecto terminado'}</span><span className="text-sm text-slate-500">{project.metrics.find((metric) => metric.label === 'Cliente')?.value ?? project.metrics.find((metric) => metric.label === 'Ubicación')?.value}</span></div><h3 className="mt-5 text-2xl font-bold text-white">{project.title}</h3><p className="mt-3 leading-relaxed text-slate-300">{project.description}</p></article>;
            })}
          </div>
        </div>
      </section>

      <TeamSection />
      <section className="border-t border-slate-800/80 bg-slate-900/40 py-16"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><Handshake className="mx-auto h-9 w-9 text-sky-400"/><h2 className="mt-4 text-3xl font-bold text-white">Construyamos algo que impulse tu negocio</h2><p className="mt-3 text-slate-300">Al trabajar con Del Valle Software recibes atención directa de sus creadores. Sin capas burocráticas, con honestidad técnica y código limpio construido para durar y crecer con tu empresa.</p><a href="/agendar-cita" className="mt-6 inline-flex rounded-xl bg-sky-600 px-6 py-3 font-bold text-white transition-colors hover:bg-sky-500">Agendar Cita</a></div></section>
    </main>
    <Footer />
  </div>
);

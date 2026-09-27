import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { FadeInSection } from '../ui/Reveal';

export const AboutTeaser: React.FC = () => (
  <section className="border-t border-slate-800/80 bg-slate-900/40 py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <FadeInSection>
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-sky-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/50 p-8 sm:p-12 md:flex-row md:items-center">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sm font-semibold text-sky-300"><Users className="h-4 w-4" /> Conoce al equipo</span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">¿Quieres saber más de nosotros?</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">Somos cinco jóvenes emprendedores con una gran visión: acercar la tecnología a empresas y comercios, creando soluciones útiles y creciendo junto a cada cliente.</p>
          </div>
          <a href="/nosotros" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 font-bold text-white shadow-lg shadow-sky-950/40 transition-colors hover:bg-sky-500">Conócenos mejor <ArrowRight className="h-5 w-5" /></a>
        </div>
      </FadeInSection>
    </div>
  </section>
);

import React from 'react';
import { TESTIMONIALS_DATA } from '../data/companyData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonios" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Opiniones & Confianza
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            La confianza de nuestros clientes es nuestro mejor respaldo
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Escucha cómo empresas y emprendedores han recuperado el control de su tiempo y dinamizado sus
            ventas con las soluciones de Del Valle Software.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/30 transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Quote Icon & Rating Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-700 group-hover:text-sky-500/40 transition-colors" />
                </div>

                {/* Review text */}
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{t.review}"
                </p>

                {/* Metric pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/50 border border-sky-500/30 text-sky-300 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{t.resultsMetric}</span>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.clientName}</h4>
                  <p className="text-xs text-slate-400">{t.role} · {t.company}</p>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-1 rounded">
                  {t.serviceReceived}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

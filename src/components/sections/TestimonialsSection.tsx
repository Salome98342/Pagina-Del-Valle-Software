import React from 'react';
import { PROJECTS_DATA } from '../../data/companyData';
import { SectionHeader } from '../ui/SectionHeader';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="portafolio" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          chip="Portafolio"
          title="Proyectos terminados y en desarrollo"
          subtitle="Una vista clara de las soluciones que hemos construido y de las plataformas que estamos desarrollando para organizaciones con objetivos reales de crecimiento."
        />

        <div className="space-y-10">
          {PROJECTS_DATA.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-[0_0_0_1px_rgba(15,23,42,0.5)]"
            >
              <div className="grid lg:grid-cols-[1.15fr_1.15fr]">
                <div className="relative min-h-[260px] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5 sm:p-8">
                  <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/60 text-center text-sm font-medium text-slate-400">
                    Espacio para imagen del proyecto
                  </div>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <span className="mb-3 inline-flex w-fit rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{project.description}</p>

                  <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-200">
                    <span className="font-semibold text-white">Impacto:</span> {project.impact}
                  </div>

                  <ul className="mt-6 space-y-2 text-sm text-slate-300">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-sky-400" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{metric.label}</div>
                        <div className="mt-2 text-lg font-bold text-white">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

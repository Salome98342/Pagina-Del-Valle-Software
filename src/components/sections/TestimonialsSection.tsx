import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/companyData';
import { SectionHeader } from '../ui/SectionHeader';
import { Navbar, Footer } from '../layout';

export const PortfolioPage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<Record<string, number>>({
    'ra-manager': 0,
    psicoarte: 0,
  });
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  React.useEffect(() => {
    if (!expandedImage) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setExpandedImage(null); };
    window.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = ''; };
  }, [expandedImage]);

  const projectImageSets: Record<string, string[]> = {
    'ra-manager': Array.from({ length: 6 }, (_, index) => `/Ra${index + 1}.png`),
    psicoarte: Array.from({ length: 5 }, (_, index) => `/Psicoarte${index + 1}.png`),
  };

  const getProjectImages = (projectId: string) => projectImageSets[projectId] ?? [];

  const getCurrentProjectImage = (projectId: string) => {
    const images = getProjectImages(projectId);
    return images[activeSlide[projectId] ?? 0] ?? images[0] ?? '';
  };

  const showPrevImage = (projectId: string) => {
    const images = getProjectImages(projectId);
    if (images.length === 0) return;

    setActiveSlide((prev) => {
      const currentIndex = prev[projectId] ?? 0;
      const lastIndex = images.length - 1;
      return { ...prev, [projectId]: currentIndex === 0 ? lastIndex : currentIndex - 1 };
    });
  };

  const showNextImage = (projectId: string) => {
    const images = getProjectImages(projectId);
    if (images.length === 0) return;

    setActiveSlide((prev) => {
      const currentIndex = prev[projectId] ?? 0;
      return { ...prev, [projectId]: (currentIndex + 1) % images.length };
    });
  };

  return (
    <div className="page-shell"><Navbar /><section className="min-h-screen pt-28 pb-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          chip="Portafolio"
          title="Proyectos terminados y en desarrollo"
          subtitle="Una vista clara de las soluciones que hemos construido y de las plataformas que estamos desarrollando para organizaciones con objetivos reales de crecimiento."
        />

        <div className="space-y-10">
          {PROJECTS_DATA.map((project) => {
            const projectImages = getProjectImages(project.id);
            const currentImage = getCurrentProjectImage(project.id);
            const projectTitle = project.title;

            return (
            <article
              key={project.id}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-[0_0_0_1px_rgba(15,23,42,0.5)]"
            >
              <div className="grid items-stretch lg:grid-cols-[1.35fr_1fr]">
                <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-4 sm:p-6 lg:p-8">
                  {projectImages.length > 0 ? (
                    <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/60 shadow-lg shadow-slate-950/30 sm:min-h-[360px] lg:sticky lg:top-28 lg:min-h-[520px] lg:max-w-[1100px] lg:mx-auto">
                      <img
                        src={currentImage}
                        alt={`${projectTitle} - vista ${((activeSlide[project.id] ?? 0) + 1)}`}
                        className="h-full max-h-[720px] min-h-[280px] w-full cursor-zoom-in object-contain sm:min-h-[360px] lg:min-h-[520px]"
                        onClick={() => setExpandedImage(currentImage)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setExpandedImage(currentImage); }}
                      />

                      <button type="button" onClick={() => setExpandedImage(currentImage)} className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-blue-950/30 bg-white/90 px-3 py-2 text-xs font-semibold text-blue-950 shadow-[0_8px_24px_rgba(2,6,23,0.35)] backdrop-blur-md hover:bg-sky-100" aria-label="Ampliar imagen"><ZoomIn className="h-4 w-4 text-blue-950" /> Ver ampliada</button>

                      <button
                        type="button"
                        onClick={() => showPrevImage(project.id)}
                        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-900/30 bg-white/95 text-slate-900 shadow-[0_8px_24px_rgba(2,6,23,0.35)] backdrop-blur-md transition hover:scale-105 hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                        aria-label="Imagen anterior"
                      >
                        ‹
                      </button>

                      <button
                        type="button"
                        onClick={() => showNextImage(project.id)}
                        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-900/30 bg-white/95 text-slate-900 shadow-[0_8px_24px_rgba(2,6,23,0.35)] backdrop-blur-md transition hover:scale-105 hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                        aria-label="Siguiente imagen"
                      >
                        ›
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/60 text-center text-sm font-medium text-slate-400">
                      Espacio para imagen del proyecto
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <span className="mb-3 inline-flex w-fit rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{project.description}</p>

                  <div className="mt-5 rounded-2xl border border-emerald-300/70 bg-emerald-100/90 p-4 text-sm text-emerald-900 shadow-inner shadow-emerald-200/40">
                    <span className="font-semibold text-emerald-950">Impacto:</span> {project.impact}
                  </div>

                  <ul className="mt-6 space-y-2 text-sm text-slate-200">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-sky-400" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {project.documentationUrl && (
                    <div className="mt-6">
                      <a
                        href={project.documentationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-sky-700 bg-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(14,116,144,0.22)] transition hover:bg-sky-600 !text-white"
                      >
                        Ver documentación del sistema
                      </a>
                    </div>
                  )}

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-sky-400/30 bg-slate-950/70 p-3 shadow-inner shadow-slate-950/30">
                        <div className="text-xs uppercase tracking-[0.18em] text-sky-300 font-semibold">{metric.label}</div>
                        <div className="mt-2 text-lg font-bold text-slate-50">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
      {expandedImage && (() => {
        const activeProjectId = Object.keys(projectImageSets).find((projectId) => projectImageSets[projectId].includes(expandedImage)) ?? 'ra-manager';
        const images = getProjectImages(activeProjectId);
        const activeIndex = Math.max(0, images.indexOf(expandedImage));
        const currentProjectTitle = PROJECTS_DATA.find((project) => project.id === activeProjectId)?.title ?? 'Proyecto';

        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8" onClick={() => setExpandedImage(null)} role="dialog" aria-modal="true" aria-label="Carrusel de imágenes ampliadas">
            <button type="button" onClick={() => setExpandedImage(null)} className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-slate-900/80 p-3 text-white hover:bg-slate-700" aria-label="Cerrar imagen"><X className="h-6 w-6" /></button>
            <button type="button" onClick={(event) => { event.stopPropagation(); const prevIndex = (activeIndex - 1 + images.length) % images.length; const nextImage = images[prevIndex]; setExpandedImage(nextImage); setActiveSlide((prev) => ({ ...prev, [activeProjectId]: prevIndex })); }} className="absolute left-3 sm:left-8 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-sky-600 text-white shadow-xl shadow-black/50 transition hover:bg-sky-500" aria-label="Imagen anterior"><ChevronLeft className="h-7 w-7 text-white" strokeWidth={3} /></button>
            <img src={expandedImage} alt={`${currentProjectTitle} - imagen ${activeIndex + 1} de ${images.length}`} className="max-h-full max-w-[calc(100%-6rem)] object-contain" onClick={(event) => event.stopPropagation()} />
            <button type="button" onClick={(event) => { event.stopPropagation(); const nextIndex = (activeIndex + 1) % images.length; const nextImage = images[nextIndex]; setExpandedImage(nextImage); setActiveSlide((prev) => ({ ...prev, [activeProjectId]: nextIndex })); }} className="absolute right-3 sm:right-8 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-sky-600 text-white shadow-xl shadow-black/50 transition hover:bg-sky-500" aria-label="Siguiente imagen"><ChevronRight className="h-7 w-7 text-white" strokeWidth={3} /></button>
            <span className="absolute bottom-4 rounded-full bg-slate-900/80 px-3 py-1 text-sm text-white">{activeIndex + 1} / {images.length}</span>
          </div>
        );
      })()}
    </section><Footer /></div>
  );
};

export const TestimonialsSection: React.FC = () => <section className="bg-slate-950 py-16 text-slate-100"><div className="mx-auto max-w-4xl px-4 text-center"><h2 className="text-2xl font-bold text-white sm:text-3xl">Conoce lo que estamos construyendo</h2><p className="mt-3 text-slate-300">Explora nuestros proyectos terminados y en desarrollo.</p><a href="/portafolio" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:scale-105">Nuestro portafolio</a></div></section>;

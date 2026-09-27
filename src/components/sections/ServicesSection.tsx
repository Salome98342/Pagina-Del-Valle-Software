import React, { useMemo, useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { AssessmentSelector } from '../ui/AssessmentSelector';
import { SERVICE_PAGES } from './ServiceLandingPage';
import { ArrowRight } from 'lucide-react';
import { FadeInSection, StaggerContainer, StaggerItem } from '../ui/Reveal';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    'control-inventario',
    'visibilidad-redes',
  ]);

  const painPoints = [
    {
      id: 'control-inventario',
      label: 'Falta de control en inventario, ventas y caja',
      recommended: 'Sistemas de Gestión a Medida (ERP & CRM)',
    },
    {
      id: 'papeleo-tiempo',
      label: 'Pérdida excesiva de horas en tareas manuales y Excel',
      recommended: 'Software para Optimización del Trabajo',
    },
    {
      id: 'visibilidad-redes',
      label: 'Poca presencia y bajo alcance en redes sociales',
      recommended: 'Gestión de Redes Sociales & Visibilidad Digital',
    },
    {
      id: 'solucion-integral',
      label: 'Necesidad de modernizar todo el negocio (interno + externo)',
      recommended: 'Solución Integral de Transformación Digital',
    },
  ];

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const recommendationText = useMemo(() => {
    if (selectedNeeds.length > 2 || selectedNeeds.includes('solucion-integral')) {
      return 'Solución Integral 360° (Software a Medida + Crecimiento en Redes)';
    }

    if (selectedNeeds.length === 0) {
      return 'Selecciona al menos un desafío para obtener tu ruta recomendada';
    }

    return painPoints.find((p) => selectedNeeds.includes(p.id))?.recommended || 'Solución Personalizada Del Valle Software';
  }, [selectedNeeds]);

  const handleRecommend = () => {
    const rec =
      selectedNeeds.length > 2 || selectedNeeds.includes('solucion-integral')
        ? 'Solución Integral de Transformación Digital'
        : painPoints.find((p) => selectedNeeds.includes(p.id))?.recommended ||
          'Sistemas de Gestión a Medida (ERP & CRM)';

    onSelectService(rec);
  };

  return (
    <section id="servicios" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
        <SectionHeader
          chip="Nuestros Servicios"
          title="Soluciones diseñadas para resolver problemas reales"
          subtitle="Creamos tecnología útil que le ahorra tiempo y esfuerzo a las personas, junto a estrategias digitales que posicionan tu empresa frente a clientes reales."
        />

        <nav aria-label="Explora nuestros servicios" className="mb-20">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">Explora cada servicio</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Conoce qué incluye cada solución y encuentra la que mejor responde a las necesidades de tu empresa.
            </p>
          </div>
          <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SERVICE_PAGES.map((page, index) => (
              <StaggerItem key={page.slug}>
                <a
                  href={page.path}
                  className="group flex h-full min-h-64 flex-col rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:shadow-xl hover:shadow-sky-950/30 focus:outline-none focus:ring-2 focus:ring-sky-400 sm:p-8"
                >
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sm font-bold text-sky-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-xl font-bold leading-snug text-white group-hover:text-sky-200 sm:text-2xl">{page.serviceName}</h4>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{page.serviceSummary}</p>
                  <span className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white transition group-hover:bg-sky-400">
                    Explorar servicio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </nav>

        <AssessmentSelector
          painPoints={painPoints}
          selectedNeeds={selectedNeeds}
          toggleNeed={toggleNeed}
          onRecommend={handleRecommend}
          recommendationText={recommendationText}
        />
        </FadeInSection>
      </div>
    </section>
  );
};

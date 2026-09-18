import React, { useMemo, useState } from 'react';
import { SERVICES_DATA } from '../../data/companyData';
import { ServiceItem } from '../../types';
import { SectionHeader } from '../ui/SectionHeader';
import { ServiceCard } from '../ui/ServiceCard';
import { AssessmentSelector } from '../ui/AssessmentSelector';
import {
  LayoutDashboard,
  Cpu,
  Share2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-6 h-6 text-sky-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-blue-400" />;
      case 'Share2':
        return <Share2 className="w-6 h-6 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-sky-400" />;
    }
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
        <SectionHeader
          chip="Nuestros Servicios"
          title="Soluciones diseñadas para resolver problemas reales"
          subtitle="Creamos tecnología útil que le ahorra tiempo y esfuerzo a las personas, junto a estrategias digitales que posicionan tu empresa frente a clientes reales."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
              getIcon={getIcon}
            />
          ))}
        </div>

        <AssessmentSelector
          painPoints={painPoints}
          selectedNeeds={selectedNeeds}
          toggleNeed={toggleNeed}
          onRecommend={handleRecommend}
          recommendationText={recommendationText}
        />
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/companyData';
import { ServiceItem } from '../types';
import {
  LayoutDashboard,
  Cpu,
  Share2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Calculator,
  HelpCircle,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>(SERVICES_DATA[0].id);

  // Interactive Assessment state
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

  return (
    <section id="servicios" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Nuestros Servicios
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Soluciones diseñadas para resolver problemas reales
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Creamos tecnología útil que le ahorra tiempo y esfuerzo a las personas, junto a estrategias
            digitales que posicionan tu empresa frente a clientes reales.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group relative flex flex-col justify-between p-8 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-sky-950/40"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-110 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-sky-300 border border-slate-700">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.fullDesc}
                </p>

                {/* Benefits List */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Beneficios clave:
                  </h4>
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 pt-6 border-t border-slate-800/60">
                <a
                  href="#contacto"
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>Solicitar asesoría para este servicio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Diagnostic Helper / Needs Assessor Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-sky-500/25 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-3 text-sky-400">
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Diagnóstico Rápido de Necesidades
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              ¿No estás seguro de por dónde empezar tu transformación?
            </h3>
            <p className="text-sm text-slate-300 mb-6">
              Selecciona los desafíos que enfrenta tu empresa actualmente para ver nuestra recomendación
              técnica recomendada:
            </p>

            {/* Checkbox pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {painPoints.map((item) => {
                const isSelected = selectedNeeds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleNeed(item.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl text-left text-xs sm:text-sm transition-all border ${
                      isSelected
                        ? 'bg-sky-950/60 border-sky-400/50 text-white font-medium shadow-md shadow-sky-950/50'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                        isSelected
                          ? 'bg-sky-500 border-sky-500 text-white'
                          : 'border-slate-600 bg-slate-800'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Recommendation Output */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Ruta recomendada para tu caso:
                </span>
                <p className="text-base font-bold text-sky-300 mt-0.5">
                  {selectedNeeds.length > 2 || selectedNeeds.includes('solucion-integral')
                    ? 'Solución Integral 360° (Software a Medida + Crecimiento en Redes)'
                    : selectedNeeds.length === 0
                    ? 'Selecciona al menos un desafío para obtener tu ruta recomendada'
                    : painPoints.find((p) => selectedNeeds.includes(p.id))?.recommended ||
                      'Solución Personalizada Del Valle Software'}
                </p>
              </div>

              <a
                href="#contacto"
                onClick={() => {
                  const rec =
                    selectedNeeds.length > 2 || selectedNeeds.includes('solucion-integral')
                      ? 'Solución Integral de Transformación Digital'
                      : painPoints.find((p) => selectedNeeds.includes(p.id))?.recommended ||
                        'Sistemas de Gestión a Medida (ERP & CRM)';
                  onSelectService(rec);
                }}
                className="shrink-0 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors flex items-center gap-2"
              >
                <span>Agendar Visita para esta Solución</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

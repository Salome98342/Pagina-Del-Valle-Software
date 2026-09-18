import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PainPoint {
  id: string;
  label: string;
  recommended: string;
}

interface AssessmentSelectorProps {
  painPoints: PainPoint[];
  selectedNeeds: string[];
  toggleNeed: (id: string) => void;
  onRecommend: () => void;
  recommendationText: string;
}

export const AssessmentSelector: React.FC<AssessmentSelectorProps> = ({
  painPoints,
  selectedNeeds,
  toggleNeed,
  onRecommend,
  recommendationText,
}) => {
  return (
    <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-sky-500/25 shadow-2xl relative overflow-hidden">
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl">
        <div className="flex items-center gap-2.5 mb-3 text-sky-400">
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
                    isSelected ? 'bg-sky-500 border-sky-500 text-white' : 'border-slate-600 bg-slate-800'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Ruta recomendada para tu caso:
            </span>
            <p className="text-base font-bold text-sky-300 mt-0.5">{recommendationText}</p>
          </div>

          <a
            href="#contacto"
            onClick={onRecommend}
            className="shrink-0 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors flex items-center gap-2"
          >
            <span>Agendar Visita para esta Solución</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

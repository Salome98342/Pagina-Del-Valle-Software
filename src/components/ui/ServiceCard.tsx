import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../../types';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService: (serviceTitle: string) => void;
  getIcon: (iconName: string) => React.ReactNode;
  detailHref: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectService, getIcon, detailHref }) => {
  return (
    <div
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

        <p className="text-sm text-slate-300 leading-relaxed mb-6">{service.fullDesc}</p>

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

      <div className="mt-8 pt-6 border-t border-slate-800/60">
        <a href={detailHref} className="mr-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-sky-300 transition-colors">
          <span>Conocer el servicio</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href={`/?servicio=${encodeURIComponent(service.title)}#contacto`}
          onClick={() => onSelectService(service.title)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
        >
          <span>Solicitar asesoría para este servicio</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

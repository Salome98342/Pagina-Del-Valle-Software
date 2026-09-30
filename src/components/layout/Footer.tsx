import React from 'react';
import { Logo } from './Logo';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../../data/companyData';
import { PhoneCall, MessageCircle, Calendar, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" theme="light" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mt-3">
              Soluciones integrales de software a medida, sistemas de gestión empresarial y posicionamiento
              digital en redes sociales. Desarrollado con dedicación para transformar e impulsar el trabajo
              de personas y empresas.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={`tel:${COMPANY_PHONE_RAW}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                <span>{COMPANY_PHONE}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(
                  'Hola Del Valle Software, deseo comunicarme con el equipo.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Oficial</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/#servicios" className="hover:text-sky-400 transition-colors">
                  Servicios Especializados
                </a>
              </li>
              <li>
                <a href="/portafolio" className="hover:text-sky-400 transition-colors">
                  Nuestros proyectos
                </a>
              </li>
              <li>
                <a href="/nosotros#equipo" className="hover:text-sky-400 transition-colors">
                  Conoce al equipo
                </a>
              </li>
              <li>
                <a href="/agendar-cita" className="hover:text-sky-400 transition-colors">
                  Agendar Cita
                </a>
              </li>
            </ul>
          </div>

          {/* Team & Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Equipo Fundador
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Salomé Rodríguez Moscoso</li>
              <li>Sergio Andrés Rincón Serna</li>
              <li>Kevin Santiago Trejos Serrano</li>
              <li>David Alejandro Escobar García</li>
              <li>Manuel Felipe Londoño Torres</li>
            </ul>
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="https://www.instagram.com/delvallesoftware/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-sky-500/20 bg-sky-950/40 px-2.5 py-1 text-[11px] text-sky-400/90 transition-colors hover:border-sky-400/50 hover:text-sky-300"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/people/Del-Valle-Software/61594659355228/#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-sky-500/20 bg-sky-950/40 px-2.5 py-1 text-[11px] text-sky-400/90 transition-colors hover:border-sky-400/50 hover:text-sky-300"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Del Valle Software. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Construido con tecnología moderna para potenciar tu trabajo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

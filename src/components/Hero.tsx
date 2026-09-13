import React from 'react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../data/companyData';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  CalendarCheck2,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Layers,
} from 'lucide-react';

interface HeroProps {
  onScheduleClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScheduleClick }) => {
  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100"
    >
      {/* Background ambient lighting effects matching Del Valle cyan/blue motif */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] sm:w-[800px] sm:h-[450px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-400/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-[320px] h-[320px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-300 text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-sky-950/40">
            <Sparkles className="w-4 h-4 text-sky-400 animate-spin-slow" />
            <span>Transformación Digital & Software a Medida</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span className="text-slate-400 hidden sm:inline">Valle del Cauca & Colombia</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Software que impulsa tu trabajo.{' '}
            <span className="block mt-2 bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Visibilidad que multiplica tu alcance.
            </span>
          </h1>

          {/* Subtitle with user's core mission */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            En <strong className="text-white font-semibold">Del Valle Software</strong> desarrollamos
            sistemas de gestión que eliminan tareas repetitivas y gestionamos tus redes sociales con
            estrategia profesional para que tu empresa crezca de forma integral.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              id="hero-cta-agendar"
              href="#contacto"
              onClick={onScheduleClick}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 shadow-xl shadow-sky-600/25 hover:shadow-sky-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <CalendarCheck2 className="w-5 h-5" />
              <span>Agendar Visita de Diagnóstico</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              id="hero-cta-whatsapp"
              href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(
                'Hola equipo de Del Valle Software, me interesa conocer más sobre sus servicios de software y redes sociales.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/40 transition-all hover:text-white"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Hablar por WhatsApp ({COMPANY_PHONE})</span>
            </a>
          </div>

          {/* Feature Highlights Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 mb-1.5 text-sky-400">
                <Layers className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Proyectos Listos</span>
              </div>
              <p className="text-sm font-bold text-white">Sistema de Gestión ERP</p>
              <p className="text-xs text-slate-400 mt-0.5">Control de stock, ventas y caja</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 mb-1.5 text-cyan-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Redes Sociales</span>
              </div>
              <p className="text-sm font-bold text-white">Estrategia de Alcance</p>
              <p className="text-xs text-slate-400 mt-0.5">Visibilidad que genera clientes</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 mb-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Enfoque 360°</span>
              </div>
              <p className="text-sm font-bold text-white">Transformación Total</p>
              <p className="text-xs text-slate-400 mt-0.5">Software interno + ventas online</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 mb-1.5 text-blue-400">
                <CalendarCheck2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Google Calendar</span>
              </div>
              <p className="text-sm font-bold text-white">Agendamiento Directo</p>
              <p className="text-xs text-slate-400 mt-0.5">Sincroniza visitas y reuniones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

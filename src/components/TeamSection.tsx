import React from 'react';
import { TEAM_MEMBERS } from '../data/companyData';
import { Users, Code, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="equipo" className="py-24 bg-slate-900/40 border-t border-slate-800/80 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Quiénes Somos
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            El equipo detrás de Del Valle Software
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Somos cinco profesionales apasionados por la tecnología aplicada y la transformación digital.
            Estamos 100% listos y comprometidos para iniciar este proyecto tecnológico junto a ti.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={member.name}
              className={`p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between group ${
                idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Avatar Badge & Role Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 p-0.5 shadow-md shadow-sky-950">
                    <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center font-bold text-white text-lg group-hover:scale-105 transition-transform">
                      {member.name
                        .split(' ')
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-sky-400 font-semibold mt-0.5">
                      {member.role}
                    </p>
                    <span className="text-[11px] text-slate-400 block">
                      {member.specialty}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {member.bio}
                </p>
              </div>

              {/* Skills badges */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Statement Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-sky-950/30 border border-sky-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Nuestro Compromiso con Cada Cliente
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Al trabajar con Del Valle Software recibes atención directa de sus creadores. Sin capas
                burocráticas, con honestidad técnica y código limpio construido para durar y crecer con tu empresa.
              </p>
            </div>
          </div>

          <a
            href="#contacto"
            className="shrink-0 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-950 transition-colors"
          >
            Iniciar Proyecto con Nosotros
          </a>
        </div>
      </div>
    </section>
  );
};

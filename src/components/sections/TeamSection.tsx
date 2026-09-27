import React from 'react';
import { TEAM_MEMBERS } from '../../data/companyData';
import { SectionHeader } from '../ui/SectionHeader';
import { TeamMemberCard } from '../ui/TeamMemberCard';
import { ShieldCheck } from 'lucide-react';
import { FadeInSection, StaggerContainer, StaggerItem } from '../ui/Reveal';

export const TeamSection: React.FC = () => {
  return (
    <section id="equipo" className="py-24 bg-slate-900/40 border-t border-slate-800/80 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
        <SectionHeader
          chip="Quiénes Somos"
          title="El equipo detrás de Del Valle Software"
          subtitle="Somos cinco profesionales apasionados por la tecnología aplicada y la transformación digital. Estamos 100% listos y comprometidos para iniciar este proyecto tecnológico junto a ti."
        />

        {/* Team Grid */}
        <StaggerContainer className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member, idx) => (
            <StaggerItem key={member.name} className={idx === 4 ? 'sm:col-span-2 lg:col-span-1' : undefined}>
              <TeamMemberCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>

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
            href="/#contacto"
            className="shrink-0 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-950 transition-colors"
          >
            Iniciar Proyecto con Nosotros
          </a>
        </div>
        </FadeInSection>
      </div>
    </section>
  );
};

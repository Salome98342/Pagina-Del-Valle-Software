import React from 'react';
import { TEAM_MEMBERS } from '../../data/companyData';
import { SectionHeader } from '../ui/SectionHeader';
import { TeamMemberCard } from '../ui/TeamMemberCard';
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
        <StaggerContainer className="mb-12 grid items-start grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <StaggerItem
              key={member.name}
              className={`h-full lg:col-span-2 ${idx === 3 ? 'lg:col-start-2' : ''} ${idx === 4 ? 'lg:col-start-4' : ''}`}
            >
              <TeamMemberCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        </FadeInSection>
      </div>
    </section>
  );
};

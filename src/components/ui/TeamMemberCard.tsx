import React from 'react';
import { TeamMember } from '../../types';

interface TeamMemberCardProps {
  member: TeamMember;
  isWide?: boolean;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, isWide = false }) => {
  return (
    <div
      className={`p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between group ${
        isWide ? 'sm:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div>
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
            <h3 className="text-base font-bold text-white leading-tight">{member.name}</h3>
            <p className="text-xs text-sky-400 font-semibold mt-0.5">{member.role}</p>
            <span className="text-[11px] text-slate-400 block">{member.specialty}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">{member.bio}</p>
      </div>

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
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { TeamMember } from '../../types';

interface TeamMemberCardProps {
  member: TeamMember;
  isWide?: boolean;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, isWide = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={`h-full min-h-[28rem] p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-colors duration-300 flex flex-col group ${
        isWide ? 'sm:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 p-0.5 shadow-md shadow-sky-950">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center font-bold text-white text-lg group-hover:scale-105 transition-transform">
              <span
                role="img"
                aria-label={`Rol de ${member.name}`}
                className="inline-block saturate-0 hue-rotate-[165deg] brightness-125"
              >
                {member.avatarEmoji}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">{member.name}</h3>
            <p className="text-xs text-sky-400 font-semibold mt-0.5">{member.role}</p>
            <span className="text-[11px] text-slate-400 block">{member.specialty}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{member.bio}</p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-800/80">
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
    </motion.div>
  );
};

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HeroFeatureCardProps {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  accentClass: string;
  labelClass: string;
}

export const HeroFeatureCard: React.FC<HeroFeatureCardProps> = ({
  icon: Icon,
  label,
  title,
  description,
  accentClass,
  labelClass,
}) => {
  return (
    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
      <div className={`flex items-center gap-2 mb-1.5 ${accentClass}`}>
        <Icon className="w-4 h-4" />
        <span className={`text-xs font-semibold uppercase tracking-wider ${labelClass}`}>{label}</span>
      </div>
      <p className="text-sm font-bold text-sky-300">{title}</p>
      <p className="text-xs text-slate-400 mt-0.5">{description}</p>
    </div>
  );
};

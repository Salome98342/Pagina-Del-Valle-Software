import React from 'react';

interface ProjectTabButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const ProjectTabButton: React.FC<ProjectTabButtonProps> = ({ active, icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
        active ? 'bg-sky-600 text-white shadow-md shadow-sky-950' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

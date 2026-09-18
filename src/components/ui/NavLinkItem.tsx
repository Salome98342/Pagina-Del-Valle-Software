import React from 'react';

interface NavLinkItemProps {
  label: string;
  href: string;
  mobile?: boolean;
  onClick?: () => void;
}

export const NavLinkItem: React.FC<NavLinkItemProps> = ({
  label,
  href,
  mobile = false,
  onClick,
}) => {
  const className = mobile
    ? 'block py-2.5 px-3 text-base font-medium text-slate-200 hover:text-sky-400 hover:bg-slate-900/50 rounded-lg transition-colors'
    : 'hover:text-sky-400 transition-colors py-1 relative group';

  return (
    <a key={label} href={href} onClick={onClick} className={className}>
      {label}
      {!mobile && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
      )}
    </a>
  );
};

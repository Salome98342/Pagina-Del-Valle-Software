import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  theme = 'auto',
}) => {
  // Dimensions
  const dimensionMap = {
    sm: { icon: 32, text: 'text-lg', subtext: 'text-[9px]', gap: 'gap-2.5' },
    md: { icon: 42, text: 'text-xl', subtext: 'text-[10px]', gap: 'gap-3' },
    lg: { icon: 56, text: 'text-2xl sm:text-3xl', subtext: 'text-xs', gap: 'gap-3.5' },
    xl: { icon: 84, text: 'text-4xl sm:text-5xl', subtext: 'text-sm', gap: 'gap-4' },
  };

  const currentDim = dimensionMap[size];

  const isLight = theme === 'light';

  return (
    <div className={`inline-flex items-center ${currentDim.gap} select-none ${className}`}>
      {/* Mountain Peaks Emblem matching company branding */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: currentDim.icon, height: currentDim.icon }}
      >
        <svg
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(14,165,233,0.35)]"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="leftPeakLight" x1="20" y1="65" x2="42" y2="15" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="leftPeakShadow" x1="42" y1="15" x2="35" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>

            <linearGradient id="rightPeakLight" x1="44" y1="65" x2="68" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="60%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#7DD3FC" />
            </linearGradient>

            <linearGradient id="rightPeakShadow" x1="68" y1="24" x2="58" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>

          {/* Left Peak - Outer Facet */}
          <polygon
            points="12,65 42,16 32,65"
            fill="url(#leftPeakShadow)"
          />

          {/* Left Peak - Main Bright Slope */}
          <polygon
            points="42,16 54,65 32,65"
            fill="url(#leftPeakLight)"
          />

          {/* Right Peak - Shadow Facet */}
          <polygon
            points="44,65 68,26 58,65"
            fill="url(#rightPeakShadow)"
          />

          {/* Right Peak - Main Bright Slope */}
          <polygon
            points="68,26 88,65 58,65"
            fill="url(#rightPeakLight)"
          />

          {/* Dynamic accent lines at base */}
          <line
            x1="8"
            y1="67"
            x2="92"
            y2="67"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="opacity-70"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none tracking-tight">
        <div className={`font-extrabold tracking-wider uppercase font-sans flex items-center gap-1.5 ${currentDim.text}`}>
          <span className={isLight ? 'text-slate-900' : 'text-white'}>
            DEL
          </span>
          <span className="text-sky-400 bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            VALLE
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2.5 h-[1.5px] bg-sky-500 rounded-full shrink-0"></span>
            <span
              className={`font-semibold tracking-[0.25em] uppercase ${currentDim.subtext} ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              SOFTWARE
            </span>
            <span className="w-2.5 h-[1.5px] bg-sky-500 rounded-full shrink-0"></span>
          </div>
        )}
      </div>
    </div>
  );
};

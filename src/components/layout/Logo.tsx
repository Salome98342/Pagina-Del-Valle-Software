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
    sm: { text: 'text-lg', subtext: 'text-[9px]', gap: 'gap-2.5' },
    md: { text: 'text-xl', subtext: 'text-[10px]', gap: 'gap-3' },
    lg: { text: 'text-2xl sm:text-3xl', subtext: 'text-xs', gap: 'gap-3.5' },
    xl: { text: 'text-4xl sm:text-5xl', subtext: 'text-sm', gap: 'gap-4' },
  };

  const currentDim = dimensionMap[size];

  const isLight = theme === 'light';

  return (
    <div className={`inline-flex items-center ${currentDim.gap} select-none ${className}`}>
      {/* Mountain Peaks Emblem matching company branding */}
      <div className={`logo-icon logo-icon--${size}`}>
        <svg
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(33,150,243,0.35)]"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="leftPeakLight" x1="10" y1="70" x2="55" y2="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2196F3" />
              <stop offset="55%" stopColor="#2196F3" />
              <stop offset="100%" stopColor="#0D47A1" />
            </linearGradient>

            <linearGradient id="leftPeakShadow" x1="55" y1="10" x2="45" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0D47A1" />
              <stop offset="100%" stopColor="#1976D2" />
            </linearGradient>

            <linearGradient id="rightPeakLight" x1="58" y1="70" x2="84" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#64B5F6" />
              <stop offset="55%" stopColor="#90CAF9" />
              <stop offset="100%" stopColor="#E3F2FD" />
            </linearGradient>

            <linearGradient id="rightPeakShadow" x1="84" y1="18" x2="75" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#90CAF9" />
              <stop offset="100%" stopColor="#2196F3" />
            </linearGradient>
          </defs>

          {/* Dos picos entrelazados de la nueva marca */}
          <path d="M4 69 47 10c4-5 10-5 14 0l31 36-13 14-25-29-32 38H4Z" fill="url(#leftPeakLight)" />
          <path d="m4 69 50-38-25 38H4Z" fill="url(#leftPeakShadow)" />
          <path d="m57 69 27-43c4-5 10-5 14 0l26 28V69H108L91 45 74 69H57Z" fill="url(#rightPeakLight)" />
          <path d="m57 69 34-24-17 24H57Z" fill="url(#rightPeakShadow)" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none tracking-tight">
        <div className={`font-extrabold tracking-wider uppercase font-sans flex items-center gap-1.5 ${currentDim.text}`}>
          <span className={isLight ? 'text-[#0d47a1]' : 'text-[#e3f2fd]'}>
            DEL
          </span>
          <span className="text-sky-400 bg-gradient-to-r from-[#2196f3] to-[#90caf9] bg-clip-text text-transparent">
            VALLE
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2.5 h-[1.5px] bg-[#2196f3] rounded-full shrink-0"></span>
            <span
              className={`font-semibold tracking-[0.25em] uppercase ${currentDim.subtext} ${
                isLight ? 'text-[#0d47a1]' : 'text-[#b8dcfa]'
              }`}
            >
              SOFTWARE
            </span>
            <span className="w-2.5 h-[1.5px] bg-[#2196f3] rounded-full shrink-0"></span>
          </div>
        )}
      </div>
    </div>
  );
};

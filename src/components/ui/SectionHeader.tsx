import React from 'react';
interface SectionHeaderProps {
  chip: string;
  title: string;
  subtitle: string;
  chipClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  chip,
  title,
  subtitle,
  chipClassName = 'bg-sky-950/60 border-sky-500/20 text-sky-400',
  titleClassName = SECTION_HEADER_TITLE,
  subtitleClassName = SECTION_HEADER_SUBTITLE,
}) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className={`${SECTION_HEADER_CHIP} ${chipClassName}`}>{chip}</div>
      <h2 className={titleClassName}>{title}</h2>
      <p className={subtitleClassName}>{subtitle}</p>
    </div>
  );
};
import {
  SECTION_HEADER_CHIP,
  SECTION_HEADER_SUBTITLE,
  SECTION_HEADER_TITLE,
} from './uiTokens';

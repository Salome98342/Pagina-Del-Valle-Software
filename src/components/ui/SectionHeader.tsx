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
  chipClassName = 'section-header__chip--default',
  titleClassName = 'section-header__title',
  subtitleClassName = 'section-header__subtitle',
}) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className={`section-header__chip ${chipClassName}`}>{chip}</div>
      <h2 className={titleClassName}>{title}</h2>
      <p className={subtitleClassName}>{subtitle}</p>
    </div>
  );
};

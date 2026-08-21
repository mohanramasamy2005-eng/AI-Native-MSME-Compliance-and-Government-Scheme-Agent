import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: string;
  subtitle?: string;
  iconBgColor?: string;
  iconTextColor?: string;
  valueColor?: string;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  iconBgColor = 'bg-secondary-fixed',
  iconTextColor = 'text-secondary',
  valueColor = 'text-primary',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-surface-container-lowest rounded-xl border border-outline-variant p-md flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-secondary/50' : ''
      }`}
    >
      <div>
        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">{title}</p>
        <p className={`font-headline-lg text-headline-lg font-bold mt-xs ${valueColor}`}>{value}</p>
        {subtitle && <p className="font-body-md text-xs text-on-surface-variant mt-xs">{subtitle}</p>}
      </div>
      <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center shrink-0`}>
        <span className={`material-symbols-outlined text-[24px] ${iconTextColor}`}>{icon}</span>
      </div>
    </div>
  );
};

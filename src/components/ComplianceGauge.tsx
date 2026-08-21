import React from 'react';

interface ComplianceGaugeProps {
  score: number;
  subtitle?: string;
}

export const ComplianceGauge: React.FC<ComplianceGaugeProps> = ({
  score = 78,
  subtitle = '2 Actions Required to reach 100%'
}) => {
  const strokeDasharray = `${score}, 100`;

  return (
    <div className="bg-primary-container rounded-xl border border-primary-container p-md flex flex-col justify-center items-center shadow-md relative overflow-hidden text-center min-h-[220px]">
      <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-[140px] text-on-primary-container">
          verified_user
        </span>
      </div>
      <h3 className="font-title-md text-title-md text-on-primary font-semibold z-10 mb-sm">
        Compliance Health
      </h3>
      <div className="relative w-32 h-32 flex items-center justify-center z-10 my-xs">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-surface-tint opacity-30"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
          />
          <path
            className="text-tertiary-fixed-dim transition-all duration-1000 ease-out"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeDasharray={strokeDasharray}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute font-display-lg text-display-lg font-bold text-on-primary">
          {score}<span className="text-title-lg">%</span>
        </span>
      </div>
      <p className="font-label-md text-label-md text-on-primary-container mt-xs z-10 font-medium">
        {subtitle}
      </p>
    </div>
  );
};

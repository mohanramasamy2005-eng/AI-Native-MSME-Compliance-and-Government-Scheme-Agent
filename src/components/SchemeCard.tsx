import React from 'react';
import { SchemeItem } from '../types';

interface SchemeCardProps {
  scheme: SchemeItem;
  onApply?: (scheme: SchemeItem) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, onApply }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-sm mb-xs">
          <span className="font-label-md text-xs px-2 py-0.5 rounded bg-secondary-fixed/50 text-secondary font-semibold uppercase tracking-wider">
            {scheme.category}
          </span>
          <div className="flex items-center gap-1 text-on-tertiary-container bg-tertiary-fixed-dim/20 px-2 py-0.5 rounded-full text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            <span>{scheme.eligibilityMatch}% Match</span>
          </div>
        </div>

        <h3 className="font-title-md text-title-md font-bold text-primary mb-xs leading-snug">
          {scheme.title}
        </h3>
        <p className="font-body-md text-xs text-on-surface-variant mb-sm font-medium">
          {scheme.ministry}
        </p>

        <p className="font-body-md text-body-md text-on-surface-variant mb-md line-clamp-3">
          {scheme.description}
        </p>

        <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant mb-md">
          <div className="flex justify-between items-center text-xs text-on-surface-variant mb-1">
            <span>Funding / Support Amount</span>
            <span className="font-bold text-primary text-sm">{scheme.fundingAmount}</span>
          </div>
          {scheme.deadline && (
            <div className="flex justify-between items-center text-xs text-on-surface-variant">
              <span>Application Deadline</span>
              <span className="font-medium text-primary">{scheme.deadline}</span>
            </div>
          )}
        </div>

        {scheme.keyBenefits && scheme.keyBenefits.length > 0 && (
          <div className="mb-md">
            <p className="font-label-md text-xs font-semibold text-primary mb-xs">Key Benefits:</p>
            <ul className="space-y-1">
              {scheme.keyBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-xs text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-sm pt-sm border-t border-outline-variant">
        {scheme.officialUrl && (
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-secondary hover:underline flex items-center gap-0.5"
          >
            <span>Official Portal</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        )}
        <button
          onClick={() => onApply && onApply(scheme)}
          className="px-md py-1.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-xs font-bold transition-colors ml-auto flex items-center gap-xs"
        >
          <span>Check Eligibility & Apply</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

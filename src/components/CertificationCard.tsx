import React from 'react';
import { CertificationItem } from '../types';
import { StatusBadge } from './StatusBadge';

interface CertificationCardProps {
  certification: CertificationItem;
  onRenew?: (cert: CertificationItem) => void;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({ certification, onRenew }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-sm mb-xs">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              workspace_premium
            </span>
            <span className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              {certification.category}
            </span>
          </div>
          <StatusBadge status={certification.status} />
        </div>

        <h3 className="font-title-md text-title-md font-bold text-primary mb-xs">
          {certification.name}
        </h3>

        <p className="font-body-md text-xs text-on-surface-variant font-medium mb-sm">
          {certification.issuingBody}
        </p>

        <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant mb-md space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Cert Number:</span>
            <span className="font-mono text-primary font-semibold">{certification.certificateNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Valid Period:</span>
            <span className="font-medium text-primary">
              {certification.validFrom} to {certification.validUntil}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-sm border-t border-outline-variant">
        <button
          onClick={() => onRenew && onRenew(certification)}
          className="px-md py-1.5 rounded-lg bg-surface-container-high hover:bg-outline-variant font-label-md text-xs font-semibold text-primary transition-colors flex items-center justify-center gap-xs w-full"
        >
          <span className="material-symbols-outlined text-[16px]">published_with_changes</span>
          <span>Renew / Audit Checklist</span>
        </button>
      </div>
    </div>
  );
};

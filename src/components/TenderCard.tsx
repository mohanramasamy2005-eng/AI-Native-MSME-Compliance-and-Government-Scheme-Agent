import React from 'react';
import { TenderItem } from '../types';

interface TenderCardProps {
  tender: TenderItem;
  onApply?: (tender: TenderItem) => void;
}

export const TenderCard: React.FC<TenderCardProps> = ({ tender, onApply }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-sm mb-xs">
          <span className="font-code-md text-xs font-mono text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
            {tender.tenderNoticeNo}
          </span>
          <div className="flex items-center gap-1 text-on-tertiary-container bg-tertiary-fixed-dim/20 px-2 py-0.5 rounded-full text-xs font-bold">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            <span>{tender.matchScore}% Fit</span>
          </div>
        </div>

        <h3 className="font-title-md text-title-md font-bold text-primary mb-xs">{tender.title}</h3>

        <p className="font-body-md text-xs text-on-surface-variant font-medium mb-md flex items-center gap-xs">
          <span className="material-symbols-outlined text-[16px]">domain</span>
          <span>{tender.issuingOrg}</span>
        </p>

        <div className="grid grid-cols-2 gap-sm bg-surface-container-low p-sm rounded-lg border border-outline-variant mb-md text-xs">
          <div>
            <span className="text-on-surface-variant block mb-0.5">Est. Tender Value</span>
            <span className="font-bold text-primary text-sm">{tender.estimatedValue}</span>
          </div>
          <div>
            <span className="text-on-surface-variant block mb-0.5">Submission Deadline</span>
            <span className="font-bold text-error text-xs flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {tender.submissionDeadline}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-sm border-t border-outline-variant">
        <span className="text-xs text-on-surface-variant flex items-center gap-xs">
          <span className="material-symbols-outlined text-[14px]">location_on</span>
          {tender.location}
        </span>

        <button
          onClick={() => onApply && onApply(tender)}
          className="px-md py-1.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-xs font-bold transition-colors flex items-center gap-xs"
        >
          <span>View Tender & Bid</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

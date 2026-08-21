import React from 'react';
import { ComplianceItem } from '../types';
import { StatusBadge } from './StatusBadge';

interface ComplianceCardProps {
  item: ComplianceItem;
  onFileReturn?: (item: ComplianceItem) => void;
}

export const ComplianceCard: React.FC<ComplianceCardProps> = ({ item, onFileReturn }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-sm mb-xs">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              verified_user
            </span>
            <span className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              {item.category}
            </span>
          </div>
          <StatusBadge status={item.status} />
        </div>

        <h3 className="font-title-md text-title-md font-bold text-primary mb-xs">{item.title}</h3>

        <p className="font-body-md text-xs text-on-surface-variant font-medium mb-sm">
          {item.issuingAuthority} • <span className="text-secondary font-semibold">{item.periodicity}</span>
        </p>

        <p className="font-body-md text-body-md text-on-surface-variant mb-md leading-relaxed">
          {item.description}
        </p>

        <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant mb-md flex items-center justify-between text-xs">
          <div className="flex items-center gap-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-outline">event</span>
            <span>Due Date:</span>
            <span className="font-bold text-primary">{item.dueDate}</span>
          </div>
          {item.potentialPenalty && (
            <span className="text-error font-medium text-[11px] truncate max-w-[200px]" title={item.potentialPenalty}>
              ⚠️ {item.potentialPenalty}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-sm border-t border-outline-variant">
        <button
          onClick={() => onFileReturn && onFileReturn(item)}
          className="px-md py-1.5 rounded-lg bg-surface-container-high hover:bg-outline-variant font-label-md text-xs font-semibold text-primary transition-colors flex items-center gap-xs w-full justify-center"
        >
          <span className="material-symbols-outlined text-[16px]">task_alt</span>
          <span>Mark / Prepare Filing</span>
        </button>
      </div>
    </div>
  );
};

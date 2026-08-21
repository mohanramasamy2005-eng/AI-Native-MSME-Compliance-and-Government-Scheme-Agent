import React, { useState } from 'react';
import { ActionItem } from '../types';
import { StatusBadge } from './StatusBadge';

interface ActionItemProps {
  item: ActionItem;
  onToggleComplete?: (id: string, currentStatus: string) => void;
}

export const ActionItemCard: React.FC<ActionItemProps> = ({ item, onToggleComplete }) => {
  const [expanded, setExpanded] = useState(false);
  const isCompleted = item.status === 'Completed';

  return (
    <div className={`bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm transition-all ${isCompleted ? 'opacity-60 bg-surface-container-low' : 'hover:shadow-md'}`}>
      <div className="flex items-start justify-between gap-md">
        <div className="flex items-start gap-sm flex-1">
          <button
            onClick={() => onToggleComplete && onToggleComplete(item.id, item.status)}
            className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              isCompleted
                ? 'bg-tertiary-fixed-dim border-tertiary-fixed-dim text-on-tertiary-fixed'
                : 'border-outline hover:border-secondary'
            }`}
          >
            {isCompleted && <span className="material-symbols-outlined text-[16px] font-bold">check</span>}
          </button>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-xs mb-1">
              <span className="font-label-md text-xs font-semibold text-secondary uppercase tracking-wider">
                {item.category}
              </span>
              <span>•</span>
              <StatusBadge status={item.priority} size="sm" />
              <span>•</span>
              <span className="text-xs text-on-surface-variant flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                {item.estimatedTimeMinutes} mins
              </span>
            </div>

            <h4 className={`font-title-md text-title-md font-bold ${isCompleted ? 'line-through text-on-surface-variant' : 'text-primary'}`}>
              {item.title}
            </h4>

            <p className="font-body-md text-xs text-on-surface-variant mt-1 font-medium">
              Impact: <span className="text-primary font-semibold">{item.impactSummary}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-xs shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors text-xs flex items-center gap-1 font-semibold"
          >
            <span>{expanded ? 'Hide Steps' : 'Steps'}</span>
            <span className="material-symbols-outlined text-[18px]">
              {expanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </div>

      {expanded && item.steps && item.steps.length > 0 && (
        <div className="mt-md pt-sm border-t border-outline-variant/60 pl-7 space-y-1.5">
          <p className="font-label-md text-xs font-bold text-primary mb-1">Action Steps:</p>
          {item.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-xs text-xs text-on-surface-variant">
              <span className="font-mono font-bold text-secondary text-[11px] w-4">{idx + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

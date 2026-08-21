import React from 'react';
import { DeadlineItem } from '../types';
import { StatusBadge } from './StatusBadge';

interface DeadlineCardProps {
  deadline: DeadlineItem;
  onSetReminder?: (deadline: DeadlineItem) => void;
}

export const DeadlineCard: React.FC<DeadlineCardProps> = ({ deadline, onSetReminder }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-md">
      <div className="flex items-center gap-md">
        <div className="w-12 h-12 rounded-xl bg-surface-container-low border border-outline-variant flex flex-col items-center justify-center shrink-0 text-center">
          <span className="font-headline-md text-headline-md font-bold text-error leading-none">
            {deadline.daysRemaining}
          </span>
          <span className="font-label-md text-[10px] text-on-surface-variant uppercase">Days left</span>
        </div>

        <div>
          <div className="flex items-center gap-xs mb-0.5">
            <span className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              {deadline.category}
            </span>
            <span>•</span>
            <StatusBadge status={deadline.status} size="sm" />
          </div>
          <h4 className="font-title-md text-title-md font-bold text-primary">{deadline.title}</h4>
          <p className="font-body-md text-xs text-on-surface-variant mt-0.5">
            Authority: <span className="font-semibold text-primary">{deadline.authority}</span> | Due: <span className="font-semibold text-error">{deadline.dueDate}</span>
          </p>
        </div>
      </div>

      <button
        onClick={() => onSetReminder && onSetReminder(deadline)}
        className="p-sm rounded-lg bg-surface-container-high hover:bg-outline-variant text-primary transition-colors flex items-center gap-xs text-xs font-semibold shrink-0"
      >
        <span className="material-symbols-outlined text-[18px]">notifications_active</span>
        <span className="hidden sm:inline">Set Reminder</span>
      </button>
    </div>
  );
};

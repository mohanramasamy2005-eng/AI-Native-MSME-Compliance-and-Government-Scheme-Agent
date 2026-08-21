import React from 'react';
import { ComplianceStatus } from '../types';

interface StatusBadgeProps {
  status: ComplianceStatus | 'active' | 'verified' | 'pending' | 'due_soon' | 'overdue' | 'critical' | 'Action Needed' | 'Analyzed' | 'Urgent' | 'Upcoming' | 'In Progress' | 'Completed' | string;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'md' }) => {
  const normStatus = (status || '').toLowerCase().replace(/\s+/g, '_');

  let bgClasses = 'bg-surface-container-high text-on-surface-variant';
  let icon = 'info';

  if (normStatus === 'active' || normStatus === 'verified' || normStatus === 'analyzed' || normStatus === 'completed') {
    bgClasses = 'bg-tertiary-fixed-dim/20 text-on-tertiary-container border border-tertiary-fixed-dim/30';
    icon = 'check_circle';
  } else if (normStatus === 'due_soon' || normStatus === 'action_needed' || normStatus === 'urgent' || normStatus === 'in_progress' || normStatus === 'renewal_pending') {
    bgClasses = 'bg-amber-500/10 text-amber-700 border border-amber-500/30';
    icon = 'warning';
  } else if (normStatus === 'critical' || normStatus === 'overdue' || normStatus === 'expired') {
    bgClasses = 'bg-error-container text-on-error-container border border-error/20';
    icon = 'error';
  } else if (normStatus === 'pending' || normStatus === 'upcoming') {
    bgClasses = 'bg-secondary-fixed/40 text-secondary border border-secondary/20';
    icon = 'schedule';
  }

  const textLabel = label || status;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs font-medium' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center gap-1 rounded-md ${bgClasses} ${sizeClasses} transition-all`}>
      <span className="material-symbols-outlined text-[14px] leading-none">{icon}</span>
      <span className="capitalize">{textLabel}</span>
    </span>
  );
};

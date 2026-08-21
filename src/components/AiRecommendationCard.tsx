import React from 'react';
import { StatusBadge } from './StatusBadge';

interface AiRecommendationCardProps {
  title: string;
  category: string;
  description: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  actionText?: string;
  onAction?: () => void;
  dueDate?: string;
}

export const AiRecommendationCard: React.FC<AiRecommendationCardProps> = ({
  title,
  category,
  description,
  urgency,
  impact,
  actionText = 'Take Action',
  onAction,
  dueDate
}) => {
  return (
    <div className="bg-surface-container-lowest border border-secondary/30 rounded-xl p-md shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      {/* Decorative AI spark background accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-secondary/10 to-transparent rounded-bl-full pointer-events-none" />

      <div className="flex items-start justify-between gap-md mb-xs">
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[18px] text-secondary">auto_awesome</span>
          <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-semibold">
            {category}
          </span>
        </div>
        <StatusBadge status={urgency} size="sm" />
      </div>

      <h4 className="font-title-md text-title-md font-semibold text-primary mb-xs group-hover:text-secondary transition-colors">
        {title}
      </h4>

      <p className="font-body-md text-body-md text-on-surface-variant mb-md leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-sm pt-sm border-t border-outline-variant/40">
        <div className="flex items-center gap-xs text-xs text-on-surface-variant font-medium">
          <span className="material-symbols-outlined text-[16px] text-amber-600">bolt</span>
          <span>Impact: {impact}</span>
          {dueDate && (
            <>
              <span className="mx-1">•</span>
              <span className="material-symbols-outlined text-[16px] text-outline">event</span>
              <span>Due: {dueDate}</span>
            </>
          )}
        </div>

        {onAction && (
          <button
            onClick={onAction}
            className="px-md py-1.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-label-md font-semibold transition-colors flex items-center gap-xs ml-auto"
          >
            <span>{actionText}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};

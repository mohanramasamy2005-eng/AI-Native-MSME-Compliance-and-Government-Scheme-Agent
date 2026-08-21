import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'inbox',
  actionText,
  onAction
}) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl flex flex-col items-center justify-center text-center my-md">
      <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-md text-on-surface-variant">
        <span className="material-symbols-outlined text-[36px]">{icon}</span>
      </div>
      <h3 className="font-title-lg text-title-lg font-bold text-primary mb-xs">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-lg">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-lg py-sm rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-sm font-semibold transition-colors flex items-center gap-xs"
        >
          <span>{actionText}</span>
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      )}
    </div>
  );
};

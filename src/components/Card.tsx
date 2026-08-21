import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  headerIcon?: string;
  variant?: 'default' | 'primary' | 'muted';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  headerIcon,
  variant = 'default'
}) => {
  let bgClasses = 'bg-surface-container-lowest border-outline-variant text-on-surface';
  
  if (variant === 'primary') {
    bgClasses = 'bg-primary-container border-primary-container text-on-primary';
  } else if (variant === 'muted') {
    bgClasses = 'bg-surface-container-low border-outline-variant text-on-surface';
  }

  return (
    <div className={`rounded-xl border p-md shadow-sm transition-all duration-200 ${bgClasses} ${className}`}>
      {(title || action || headerIcon) && (
        <div className="flex items-center justify-between mb-md border-b border-outline-variant/50 pb-sm">
          <div className="flex items-center gap-sm">
            {headerIcon && (
              <span className="material-symbols-outlined text-[20px] text-secondary">
                {headerIcon}
              </span>
            )}
            <div>
              {title && <h3 className="font-title-lg text-title-lg font-semibold">{title}</h3>}
              {subtitle && <p className="font-body-md text-body-md text-on-surface-variant">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

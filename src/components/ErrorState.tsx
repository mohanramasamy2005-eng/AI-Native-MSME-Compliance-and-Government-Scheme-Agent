import React from 'react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'System Warning / Connection Error',
  message,
  onRetry
}) => {
  return (
    <div className="bg-error-container/30 border border-error/30 rounded-xl p-md flex items-start gap-md my-md">
      <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-on-error-container text-[22px]">error</span>
      </div>
      <div className="flex-1">
        <h4 className="font-title-md text-title-md font-bold text-on-error-container">{title}</h4>
        <p className="font-body-md text-xs text-on-surface-variant mt-0.5">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-sm px-md py-1 rounded bg-error text-on-error font-label-md text-xs font-semibold hover:bg-error/90 transition-colors"
          >
            Retry Action
          </button>
        )}
      </div>
    </div>
  );
};

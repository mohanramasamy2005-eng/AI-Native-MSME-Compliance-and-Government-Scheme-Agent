import React from 'react';

interface LoadingStateProps {
  count?: number;
  type?: 'card' | 'table' | 'spinner';
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  count = 3,
  type = 'card',
  message = 'Loading intelligence metrics...'
}) => {
  if (type === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center p-xl text-center">
        <div className="w-10 h-10 border-4 border-secondary-container border-t-secondary rounded-full animate-spin mb-md"></div>
        <p className="font-body-md text-sm text-on-surface-variant font-medium">{message}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-surface-container-low rounded-xl border border-outline-variant p-md space-y-md">
          <div className="h-4 bg-surface-container-high rounded w-1/3"></div>
          <div className="h-6 bg-surface-container-high rounded w-2/3"></div>
          <div className="h-12 bg-surface-container-high rounded w-full"></div>
          <div className="h-8 bg-surface-container-high rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

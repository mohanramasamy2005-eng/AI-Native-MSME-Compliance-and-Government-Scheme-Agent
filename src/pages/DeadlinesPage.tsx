import React, { useState } from 'react';
import { initialDeadlinesList } from '../services/mockData';
import { DeadlineCard } from '../components/DeadlineCard';
import { DeadlineItem } from '../types';

export const DeadlinesPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Urgent' | 'Upcoming'>('All');

  const filteredDeadlines = initialDeadlinesList.filter(
    (item) => filter === 'All' || item.status === filter
  );

  const handleSetReminder = (deadline: DeadlineItem) => {
    alert(`Reminder notification set for ${deadline.title} on ${deadline.dueDate}.`);
  };

  return (
    <div className="space-y-lg">
      <div className="flex flex-wrap justify-between items-center gap-md pb-sm border-b border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
            Deadlines & Compliance Calendar
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Never miss statutory tax filings, pollution NOC renewals, or audit due dates.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-xs bg-surface-container-lowest p-sm rounded-xl border border-outline-variant">
        {(['All', 'Urgent', 'Upcoming'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-md py-1.5 rounded-lg font-label-md text-xs font-semibold transition-all ${
              filter === tab
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {tab} Deadlines
          </button>
        ))}
      </div>

      {/* Deadlines List */}
      <div className="space-y-md">
        {filteredDeadlines.map((deadline) => (
          <DeadlineCard key={deadline.id} deadline={deadline} onSetReminder={handleSetReminder} />
        ))}
      </div>
    </div>
  );
};

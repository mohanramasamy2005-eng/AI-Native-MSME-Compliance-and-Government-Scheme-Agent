import React from 'react';
import { initialTendersList } from '../services/mockData';
import { TenderCard } from '../components/TenderCard';
import { TenderItem } from '../types';

export const TendersPage: React.FC = () => {
  const handleApply = (tender: TenderItem) => {
    alert(`Opening tender bid dossier for ${tender.tenderNoticeNo}...`);
  };

  return (
    <div className="space-y-lg">
      <div className="flex flex-wrap justify-between items-center gap-md pb-sm border-b border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
            Public & PSU Tenders for MSMEs
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Government procurement opportunities matching your registered manufacturing capacity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {initialTendersList.map((tender) => (
          <TenderCard key={tender.id} tender={tender} onApply={handleApply} />
        ))}
      </div>
    </div>
  );
};

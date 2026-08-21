import React from 'react';
import { initialCertificationsList } from '../services/mockData';
import { CertificationCard } from '../components/CertificationCard';
import { CertificationItem } from '../types';

export const CertificationsPage: React.FC = () => {
  const handleRenew = (cert: CertificationItem) => {
    alert(`Opening audit & recertification guide for ${cert.name}...`);
  };

  return (
    <div className="space-y-lg">
      <div className="flex flex-wrap justify-between items-center gap-md pb-sm border-b border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
            Business Certifications & Quality Accreditations
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Track ISO, ZED Gold, CE, and industry quality certifications validity timelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {initialCertificationsList.map((cert) => (
          <CertificationCard key={cert.id} certification={cert} onRenew={handleRenew} />
        ))}
      </div>
    </div>
  );
};

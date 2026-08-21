import React, { useState } from 'react';
import { initialComplianceList } from '../services/mockData';
import { ComplianceCard } from '../components/ComplianceCard';

export const CompliancePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Taxation', 'Environmental', 'Labor & Safety', 'License & Permit'];

  const filteredItems = initialComplianceList.filter((item) => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const searchMatch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="space-y-lg">
      {/* Title & Actions */}
      <div className="flex flex-wrap justify-between items-center gap-md pb-sm border-b border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
            Compliance Center & Regulatory Requirements
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Identify all statutory registrations, licenses, environmental NOCs, and tax filings applicable to your MSME.
          </p>
        </div>

        <div className="flex items-center gap-sm">
          <button className="px-md py-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-primary hover:bg-surface-container-high font-label-md text-xs font-semibold flex items-center gap-xs shadow-xs">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download Compliance Report</span>
          </button>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-md bg-surface-container-lowest p-sm rounded-xl border border-outline-variant">
        <div className="flex items-center gap-xs overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-md py-1.5 rounded-lg font-label-md text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-secondary text-on-secondary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search compliance or authority..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-1.5 pl-9 pr-md text-xs focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* Compliance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filteredItems.map((item) => (
          <ComplianceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

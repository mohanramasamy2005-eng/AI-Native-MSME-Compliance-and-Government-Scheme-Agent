import React, { useState } from 'react';
import { initialSchemesList } from '../services/mockData';
import { SchemeCard } from '../components/SchemeCard';
import { SchemeItem } from '../types';

export const SchemesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Credit Guarantee', 'Subsidy', 'Technology Upgradation', 'Export Support'];

  const filteredSchemes = initialSchemesList.filter(
    (scheme) => selectedCategory === 'All' || scheme.category === selectedCategory
  );

  const handleApply = (scheme: SchemeItem) => {
    alert(`Initiating AI eligibility evaluation for ${scheme.title}...`);
  };

  return (
    <div className="space-y-lg">
      <div className="flex flex-wrap justify-between items-center gap-md pb-sm border-b border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
            Government Schemes & Financial Subsidies
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            AI-matched central and state government schemes customized for ABC Engineering Pvt Ltd.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-xs overflow-x-auto pb-1 bg-surface-container-lowest p-sm rounded-xl border border-outline-variant">
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {filteredSchemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} onApply={handleApply} />
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onToggleMobileSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/assistant?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-surface text-primary fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-30 border-b border-outline-variant flex justify-between items-center h-16 px-md md:px-lg backdrop-blur-md bg-opacity-95">
      {/* Left: Mobile hamburger menu & Search */}
      <div className="flex items-center gap-md flex-1">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors"
          aria-label="Toggle Navigation"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs sm:max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search GST, schemes, tenders, documents..."
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-1.5 pl-10 pr-md text-sm font-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary-container/40 transition-all"
          />
        </form>
      </div>

      {/* Right: Actions & User Avatar */}
      <div className="flex items-center gap-xs sm:gap-md">
        <button
          onClick={() => navigate('/deadlines')}
          className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors relative"
          title="Upcoming Deadlines & Notifications"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse" />
        </button>

        <button
          onClick={() => navigate('/assistant')}
          className="p-2 rounded-full text-secondary hover:bg-secondary-fixed/50 transition-colors"
          title="Open AI Assistant"
        >
          <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
        </button>

        <div
          onClick={() => navigate('/business')}
          className="flex items-center gap-sm cursor-pointer p-1 rounded-lg hover:bg-surface-container-high transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-xs border border-outline-variant">
            RE
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-primary leading-tight">Rajesh E.</p>
            <p className="text-[10px] text-on-surface-variant font-medium">ABC Engineering</p>
          </div>
        </div>
      </div>
    </header>
  );
};

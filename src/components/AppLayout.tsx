import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const AppLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-on-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col w-full h-full md:ml-64 overflow-hidden">
        {/* Topbar */}
        <Topbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

        {/* Main Canvas Page Body */}
        <main className="flex-1 mt-16 p-md sm:p-container-margin overflow-y-auto bg-background">
          <div className="max-w-[1320px] mx-auto pb-lg">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

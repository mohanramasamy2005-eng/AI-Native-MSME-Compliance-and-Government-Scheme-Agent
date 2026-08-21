import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/business', label: 'My Business', icon: 'business_center' },
    { path: '/assistant', label: 'AI Assistant', icon: 'smart_toy' },
    { path: '/compliance', label: 'Compliance', icon: 'verified_user' },
    { path: '/schemes', label: 'Schemes & Subsidies', icon: 'account_balance' },
    { path: '/tenders', label: 'Tenders', icon: 'assignment' },
    { path: '/certifications', label: 'Certifications', icon: 'workspace_premium' },
    { path: '/documents', label: 'Documents', icon: 'description' },
    { path: '/deadlines', label: 'Deadlines', icon: 'event' },
    { path: '/actions', label: 'Action Center', icon: 'bolt' },
  ];

  const bottomItems = [
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full p-md">
      {/* Brand Header */}
      <div className="mb-lg flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
          </div>
          <div>
            <h1 className="font-headline-md text-lg font-bold text-primary dark:text-primary-fixed leading-tight">
              MSME AI
            </h1>
            <p className="font-label-md text-xs text-on-surface-variant font-medium">Intelligent OS</p>
          </div>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
      </div>

      {/* Main Navigation Links */}
      <div className="flex flex-col gap-1 flex-1 overflow-y-auto pr-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `font-label-md text-sm rounded-lg px-md py-2.5 flex items-center gap-sm transition-all duration-150 font-medium ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Bottom Footer Items */}
      <div className="mt-auto flex flex-col gap-1 pt-md border-t border-outline-variant/60">
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `font-label-md text-sm rounded-lg px-md py-2 flex items-center gap-sm transition-all duration-150 ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex bg-surface-container-lowest text-primary h-screen w-64 fixed left-0 top-0 border-r border-outline-variant z-40 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isOpenMobile && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-primary/40 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative bg-surface-container-lowest text-primary w-72 h-full border-r border-outline-variant shadow-2xl flex flex-col z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

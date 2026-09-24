import React from 'react';
import { ArrowLeft, Home, Grid, FolderArchive, User, Bot, ChevronLeft } from 'lucide-react';

/**
 * Top App Header — Universal responsive header adapting to pixel threshold:
 * - Mobile (<1024px): Compact sticky app bar with back icon and title.
 * - Desktop (≥1024px): Elegant desktop card banner with back navigation button, page heading, and right controls.
 */
export const AppHeader = ({ title, onBack, rightElement }) => (
  <>
    {/* Mobile (<1024px) Sticky Header */}
    <header className="flex lg:hidden items-center justify-between px-4 py-3 border-b border-slate-100 bg-white sticky top-0 z-20 shadow-sm">
      <div className="flex items-center space-x-3">
        {onBack && (
          <button 
            onClick={onBack} 
            aria-label="Back" 
            className="p-1.5 -ml-1 text-slate-700 hover:text-[#000080] rounded-xl hover:bg-slate-100 transition"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        {title && <h1 className="text-sm font-bold text-slate-800 tracking-tight">{title}</h1>}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </header>

    {/* Desktop (≥1024px) Banner */}
    <div className="hidden lg:flex items-center justify-between bg-white rounded-2xl p-4 mb-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 hover:text-[#000080] transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>
        )}
        {title && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center">
              <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">{title}</h1>
              <p className="text-[11px] text-slate-400 font-medium">DOWLET1 Citizen Services Portal</p>
            </div>
          </div>
        )}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  </>
);

/**
 * Bottom 5-Tab Navigation Bar
 */
export const BottomNav = ({ activeTab = 'home', onTabChange = () => {} }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Grid },
    { id: 'ai', label: 'AI', icon: Bot, isCenter: true },
    { id: 'applications', label: 'Applications', icon: FolderArchive },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="border-t border-slate-200 bg-white px-2 py-2 flex justify-around items-center relative z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        if (tab.isCenter) {
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center -mt-6 focus:outline-none"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF9933] to-[#138808] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 text-white border-4 border-white">
                <Icon size={22} />
              </div>
              <span className={`text-[10px] mt-1 font-bold ${isActive ? 'text-[#000080]' : 'text-slate-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center flex-1 py-1 focus:outline-none"
          >
            <Icon size={18} className={isActive ? 'text-[#000080]' : 'text-slate-400'} />
            <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#000080]' : 'text-slate-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

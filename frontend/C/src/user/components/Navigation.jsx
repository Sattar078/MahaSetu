import React from 'react';
import { ArrowLeft, Home, Grid, FolderArchive, User, Bot } from 'lucide-react';

/**
 * Top App Header
 */
export const AppHeader = ({ title, onBack, rightElement }) => (
  <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white sticky top-0 z-10">
    <div className="flex items-center space-x-3">
      {onBack && (
        <button 
          onClick={onBack} 
          aria-label="Back" 
          className="p-1 -ml-1 text-slate-700 hover:text-[#0d599f] transition"
        >
          <ArrowLeft size={18} />
        </button>
      )}
      {title && <h1 className="text-sm font-bold text-slate-800 tracking-tight">{title}</h1>}
    </div>
    {rightElement && <div>{rightElement}</div>}
  </header>
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
              <span className={`text-[10px] mt-1 font-bold ${isActive ? 'text-[#0d599f]' : 'text-slate-500'}`}>
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
            <Icon size={18} className={isActive ? 'text-[#0d599f]' : 'text-slate-400'} />
            <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#0d599f]' : 'text-slate-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNav } from './Navigation';
import useDeviceMode from '../../utils/useDeviceMode';
import DesktopLayout from './DesktopLayout';
import { 
  Bell, Menu, User, X, Home as HomeIcon, Search, Sparkles, 
  ClipboardList, FileText, ShieldCheck, Bookmark, Landmark, 
  Megaphone, HelpCircle, MessageSquare, Settings, Globe, 
  Lock, FileCheck, Info, Shield, LogOut, MapPin, CheckCircle2
} from 'lucide-react';
import { getNotifications, markNotificationsAsRead, getProfile, logout } from '../../utils/demoState';

/**
 * MainLayout — wraps authenticated pages with the bottom tab bar and top header/drawer.
 */
export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = useDeviceMode();
  const [profile, setProfile] = useState(getProfile());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(getNotifications());
    setProfile(getProfile());
  }, [location.pathname]);

  const refreshNotifications = () => {
    setNotifications(getNotifications());
  };

  const getActiveTab = () => {
    const p = location.pathname;
    if (p.startsWith('/services')) return 'services';
    if (p.startsWith('/ai')) return 'ai';
    if (p.startsWith('/applications') || p.startsWith('/apply')) return 'applications';
    if (p.startsWith('/profile') || p.startsWith('/privacy') || p.startsWith('/documents')) return 'profile';
    return 'home';
  };

  const handleTabChange = (tab) => {
    const routes = {
      home: '/home',
      services: '/services',
      ai: '/ai',
      applications: '/applications',
      profile: '/profile',
    };
    navigate(routes[tab]);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(prev => prev === dropdownName ? null : dropdownName);
  };

  const mobileUI = (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50 relative">
      
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
      
      {/* Dropdown Overlay */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Drawer Menu */}
      <div className={`fixed inset-y-0 left-0 w-[75%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
        
        {/* Drawer Header - Indian Theme */}
        <div className="relative p-5 bg-white border-b border-slate-100 overflow-hidden">
          {/* Flag Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-slate-100 to-[#138808]"></div>
          {/* Decorative Logo Background Watermark */}
          <div className="absolute -right-8 -top-8 w-32 h-32 opacity-[0.06] select-none pointer-events-none flex items-center justify-center">
            <img src="/dowlet-logo.png" alt="" className="w-full h-full object-contain" />
          </div>
          
          <div className="flex items-center justify-between mb-4 mt-2 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center shadow-sm border border-slate-200">
                <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-extrabold text-lg tracking-wide text-[#000080]">DOWLET1</span>
            </div>
            <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 bg-slate-50 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed max-w-[200px] font-medium relative z-10">
            One Platform for Unified Government Services
          </p>
        </div>

        {/* Profile Quick Link */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => { setIsDrawerOpen(false); navigate('/profile'); }}>
          <div className="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center text-[#FF9933] shrink-0 border-2 border-white shadow-sm font-bold text-sm">
            {profile.fullName ? profile.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RK'}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800 text-sm">{profile.fullName || 'Rahul Kumar'}</h4>
            <p className="text-[11px] text-[#138808] font-medium">View Profile →</p>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="flex-1 overflow-y-auto py-2">
          
          {/* MAIN */}
          <div className="mb-4">
            <p className="px-5 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Main</p>
            <div className="flex flex-col">
              {[
                { icon: HomeIcon, label: 'Home', action: () => { setIsDrawerOpen(false); navigate('/home'); } },
                { icon: Bell, label: 'Notifications', badge: notifications.filter(n => !n.read).length > 0 ? `${notifications.filter(n => !n.read).length} new` : null, action: () => { setIsDrawerOpen(false); navigate('/notifications'); } },
                { icon: Search, label: 'Explore Services', action: () => { setIsDrawerOpen(false); navigate('/services'); } },
                { icon: Sparkles, label: 'AI Assistant', action: () => { setIsDrawerOpen(false); navigate('/ai'); } },
                { icon: ClipboardList, label: 'My Applications', action: () => { setIsDrawerOpen(false); navigate('/applications'); } },
                { icon: FileText, label: 'My Documents', action: () => { setIsDrawerOpen(false); navigate('/documents'); } },
                { icon: ShieldCheck, label: 'Verified Information', action: () => { setIsDrawerOpen(false); navigate('/verified-info'); } },
                { icon: Bookmark, label: 'Saved Services', action: () => { setIsDrawerOpen(false); navigate('/saved'); } },
              ].map((item, i) => (
                <button key={i} onClick={item.action} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors text-left w-full">
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* GOVERNMENT */}
          <div className="mb-4">
            <p className="px-5 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Government</p>
            <div className="flex flex-col">
              {[
                { icon: Landmark, label: 'Government Departments', action: () => { setIsDrawerOpen(false); navigate('/services'); } },
                { icon: Megaphone, label: 'Announcements', action: () => { setIsDrawerOpen(false); navigate('/notifications'); } },
              ].map((item, i) => (
                <button key={i} onClick={item.action} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left w-full">
                  <item.icon size={18} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SUPPORT */}
          <div className="mb-4">
            <p className="px-5 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Support</p>
            <div className="flex flex-col">
              {[
                { icon: HelpCircle, label: 'Help & Support', action: () => { setIsDrawerOpen(false); navigate('/profile?section=help'); } },
                { icon: MessageSquare, label: 'Feedback', action: () => { setIsDrawerOpen(false); navigate('/profile?section=feedback'); } },
              ].map((item, i) => (
                <button key={i} onClick={item.action} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left w-full">
                  <item.icon size={18} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SETTINGS */}
          <div className="mb-4 border-b border-slate-100 pb-2">
            <p className="px-5 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Settings</p>
            <div className="flex flex-col">
              {[
                { icon: Settings, label: 'Settings', action: () => { setIsDrawerOpen(false); navigate('/profile'); } },
                { icon: Globe, label: 'Language', action: () => { setIsDrawerOpen(false); navigate('/profile?section=language'); } },
                { icon: Lock, label: 'Privacy & Security', action: () => { setIsDrawerOpen(false); navigate('/privacy'); } },
                { icon: FileCheck, label: 'Consent & Data Sharing', action: () => { setIsDrawerOpen(false); navigate('/profile?section=consent'); } },
              ].map((item, i) => (
                <button key={i} onClick={item.action} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left w-full">
                  <item.icon size={18} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="pb-4">
            <div className="flex flex-col">
              {[
                { icon: Info, label: 'About DOWLET1', action: () => { setIsDrawerOpen(false); navigate('/profile?section=about'); } },
                { icon: FileText, label: 'Terms & Conditions', action: () => { setIsDrawerOpen(false); navigate('/profile?section=about'); } },
                { icon: Shield, label: 'Privacy Policy', action: () => { setIsDrawerOpen(false); navigate('/profile?section=about'); } },
              ].map((item, i) => (
                <button key={i} onClick={item.action} className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 transition-colors text-left w-full">
                  <item.icon size={16} className="text-slate-400" />
                  <span className="text-xs font-medium text-slate-500">{item.label}</span>
                </button>
              ))}
              
              <button 
                onClick={() => {
                  setIsDrawerOpen(false);
                  if (window.confirm("Are you sure you want to logout?")) {
                    logout(navigate);
                  }
                }} 
                className="flex items-center gap-3 px-5 py-4 mt-2 hover:bg-red-50 text-red-600 transition-colors text-left w-full"
              >
                <LogOut size={18} />
                <span className="text-sm font-bold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Universal Header - Indian Theme */}
      <div className="bg-white px-5 pt-7 pb-4 flex items-center justify-between shadow-sm sticky top-0 z-40 relative">
        {/* Top Flag Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-slate-100 to-[#138808]"></div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => setIsDrawerOpen(true)} className="text-slate-600 p-1 -ml-1 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center shadow-sm border border-slate-200">
              <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-[#000080] text-lg tracking-wide">DOWLET1</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 relative">
          {/* Associated State */}
          <button onClick={() => toggleDropdown('state')} className="hidden sm:flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full border border-slate-200 hover:bg-slate-200 transition-colors">
            <MapPin size={12} className="text-[#FF9933]" />
            <span className="text-[10px] font-bold text-slate-700">Maharashtra</span>
          </button>
          <button onClick={() => toggleDropdown('state')} className="sm:hidden flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full border border-slate-200 hover:bg-slate-200 transition-colors">
            <MapPin size={12} className="text-[#FF9933]" />
            <span className="text-[10px] font-bold text-slate-700">MH</span>
          </button>
          
          {activeDropdown === 'state' && (
            <div className="absolute top-10 right-16 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Select State</p>
              </div>
              <div className="flex flex-col">
                <button className="px-4 py-3 text-sm text-left font-semibold text-[#000080] bg-blue-50 flex items-center justify-between" onClick={() => setActiveDropdown(null)}>
                  Maharashtra <CheckCircle2 size={16} className="text-[#138808]" />
                </button>
                <button className="px-4 py-3 text-sm text-left text-slate-600 hover:bg-slate-50" onClick={() => setActiveDropdown(null)}>Gujarat</button>
                <button className="px-4 py-3 text-sm text-left text-slate-600 hover:bg-slate-50" onClick={() => setActiveDropdown(null)}>Karnataka</button>
              </div>
            </div>
          )}
          
          {/* Language Selector (New Feature) */}
          <button onClick={() => toggleDropdown('language')} className="text-slate-500 hover:text-[#000080] transition-colors p-1 relative">
            <Globe size={20} />
          </button>

          {activeDropdown === 'language' && (
            <div className="absolute top-10 right-8 w-44 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Select Language</p>
              </div>
              <div className="flex flex-col">
                <button className="px-4 py-3 text-sm text-left font-semibold text-[#000080] bg-blue-50 flex items-center justify-between" onClick={() => setActiveDropdown(null)}>
                  English <CheckCircle2 size={16} className="text-[#138808]" />
                </button>
                <button className="px-4 py-3 text-sm text-left text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setActiveDropdown(null)}>हिन्दी (Hindi)</button>
                <button className="px-4 py-3 text-sm text-left text-slate-600 hover:bg-slate-50 font-medium" onClick={() => setActiveDropdown(null)}>मराठी (Marathi)</button>
              </div>
            </div>
          )}
          
          {/* Notifications Button */}
          <button 
            onClick={() => {
              navigate('/notifications');
            }} 
            className="text-slate-600 relative hover:text-[#000080] transition-colors p-1"
            title="Notification Centre"
          >
            <Bell size={20} />
            {notifications.some(n => !n.read) && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>

          {activeDropdown === 'notifications' && (
            <div className="absolute top-10 right-0 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Notifications</p>
                {notifications.filter(n => !n.read).length > 0 ? (
                  <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-md">
                    {notifications.filter(n => !n.read).length} New
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-slate-400">All caught up</span>
                )}
              </div>
              <div className="flex flex-col max-h-[320px] overflow-y-auto divide-y divide-slate-50">
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => {
                        setActiveDropdown(null);
                        if (item.targetUrl) {
                          navigate(item.targetUrl);
                        }
                      }}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        !item.read ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-xs font-bold text-[#000080]">{item.title}</p>
                        {!item.read && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0"></span>}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{item.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[9px] font-medium text-slate-400">{item.time}</p>
                        {item.targetUrl && (
                          <span className="text-[10px] font-semibold text-[#000080] flex items-center gap-0.5">
                            View <span className="text-[9px]">→</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-xs text-slate-400">
                    No notifications yet.
                  </div>
                )}
              </div>
              <button 
                className="w-full py-2.5 text-xs font-bold text-[#000080] hover:bg-slate-50 text-center border-t border-slate-100 transition-colors" 
                onClick={() => {
                  markNotificationsAsRead();
                  setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                  setActiveDropdown(null);
                }}
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">{children}</div>
      
      <div className="sticky bottom-0 z-20 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-slate-100">
        <BottomNav activeTab={getActiveTab()} onTabChange={handleTabChange} />
      </div>
    </div>
  );

  // Desktop: render full desktop website portal
  if (mode === 'desktop') {
    return <DesktopLayout>{children}</DesktopLayout>;
  }

  // Mobile / PWA: return mobile app shell with top drawer and bottom nav
  return mobileUI;
}

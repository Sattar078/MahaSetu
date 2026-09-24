import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Globe, ChevronRight, Shield, BookOpen,
  HelpCircle, MessageSquare, Mail, ExternalLink,
  Bell, Search, User, CheckCircle2, FileText, Sparkles,
  ClipboardList, Landmark
} from 'lucide-react';
import { getNotifications, getCurrentRole, getProfile } from '../../utils/demoState';

/**
 * DesktopLayout — Full-width desktop website shell for DOWLET1:
 * - Tricolor accent bar
 * - Top government portal navbar with search, notifications, and profile
 * - Wide container (`max-w-7xl`) for full desktop responsiveness
 * - Comprehensive official government footer
 */
export default function DesktopLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  const currentRole = getCurrentRole();
  const profile = getProfile();

  const navLinks = [
    { label: 'Home', path: '/home', icon: Landmark },
    { label: 'Explore Services', path: '/services', icon: Landmark },
    { label: 'DOWLET1 AI', path: '/ai', icon: Sparkles, badge: 'Smart' },
    { label: 'My Applications', path: '/applications', icon: ClipboardList },
    { label: 'Documents', path: '/documents', icon: FileText },
    { label: 'Verified Identity', path: '/verified-info', icon: Shield },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      
      {/* ═══════════════ TRICOLOR TOP BAR ═══════════════ */}
      <div className="h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] w-full sticky top-0 z-[60]" />

      {/* ═══════════════ TOP OFFICIAL NOTICE STRIP ═══════════════ */}
      <div className="bg-[#000080] text-white text-[11px] py-1 px-6 border-b border-blue-900/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs">🇮🇳</span>
            <span className="font-semibold tracking-wide">Government of India • Unified Citizen Services Portal</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">Smart India Hackathon Prototype</span>
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/need-discovery')}>Help Me Choose</span>
            <span className="text-white/40">•</span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/privacy')}>Security & Compliance</span>
            <span className="text-white/40">•</span>
            <span className="text-amber-300 font-semibold">Toll-Free: 1800-111-001</span>
          </div>
        </div>
      </div>

      {/* ═══════════════ DESKTOP NAVBAR ═══════════════ */}
      <header className="sticky top-1.5 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => navigate('/home')}>
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md border border-slate-200">
                <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[#000080] text-lg tracking-wide">DOWLET1</span>
                  <span className="text-[10px] font-bold bg-[#FF9933]/15 text-[#e07520] px-1.5 py-0.5 rounded border border-[#FF9933]/30">PORTAL</span>
                </div>
                <p className="text-[9px] text-slate-500 font-semibold tracking-wider">ONE PLATFORM FOR UNIFIED SERVICES</p>
              </div>
            </div>

            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-md mx-4 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 1,200+ central & state schemes, certificates, welfare..."
                className="w-full bg-slate-100/80 border border-slate-200 rounded-xl py-2 pl-10 pr-12 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/10 transition-all outline-none"
              />
              <Search size={15} className="absolute left-3.5 top-2.5 text-slate-400 pointer-events-none" />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1 px-2.5 py-1 bg-[#000080] hover:bg-blue-900 text-white text-[10px] font-bold rounded-lg transition-colors"
              >
                Find
              </button>
            </form>

            {/* Nav Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = location.pathname.startsWith(link.path);
                return (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.path)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-[#000080]/10 text-[#000080]' 
                        : 'text-slate-600 hover:text-[#000080] hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Tools: Language, Notifications, Profile */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Language Selector */}
              <button 
                onClick={() => navigate('/profile?section=language')}
                className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#000080] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                title="Change Portal Language"
              >
                <Globe size={14} className="text-slate-500" />
                <span>English</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-[#000080] transition-colors"
                  title="Notifications"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <h4 className="text-xs font-bold text-slate-800">Notifications ({unreadCount} new)</h4>
                      <button 
                        onClick={() => navigate('/notifications')} 
                        className="text-[10px] font-semibold text-[#000080] hover:underline"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.slice(0, 3).map((item) => (
                        <div key={item.id} className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left cursor-pointer" onClick={() => { setShowNotifications(false); navigate(item.targetUrl || '/notifications'); }}>
                          <p className="text-xs font-bold text-slate-800">{item.title}</p>
                          <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 mt-0.5">{item.message}</p>
                          <span className="text-[9px] text-slate-400 mt-1 block">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Role Indicator & Switcher */}
              <button
                onClick={() => navigate('/role-select')}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 text-xs font-bold transition-all shadow-sm group"
                title="Switch Access Role (Citizen / Officer / Admin)"
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="capitalize">{currentRole} Portal</span>
                <span className="text-[10px] font-semibold bg-white text-orange-700 px-1.5 py-0.2 rounded border border-orange-300 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  Switch
                </span>
              </button>

              {/* Profile Chip */}
              <div 
                onClick={() => navigate('/profile')} 
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer group"
                title="Open Profile & Settings"
              >
                <div className="text-right hidden md:block">
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-[#000080] transition-colors">{profile.fullName || 'Rahul Kumar'}</span>
                    <CheckCircle2 size={12} className="text-[#138808]" />
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium">Demo Verified Citizen</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#000080] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {profile.fullName ? profile.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RK'}
                </div>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* ═══════════════ MAIN CONTENT: FULL DESKTOP CONTAINER ═══════════════ */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* ═══════════════ DESKTOP FOOTER ═══════════════ */}
      <footer className="bg-slate-900 text-white mt-auto border-t-2 border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/95 p-1 flex items-center justify-center">
                  <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="font-extrabold text-base tracking-wide text-white">DOWLET1</span>
                  <span className="ml-2 text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded font-mono">SIH PROTOTYPE</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4 max-w-sm">
                Unified government services platform designed to eliminate bureaucracy through single-click applications, pre-verified credentials, and AI-powered citizen navigation.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Simulated Central Citizen Mesh Active</span>
              </div>
            </div>

            {/* Quick Portal Navigation */}
            <div>
              <h4 className="font-bold text-xs mb-3 uppercase tracking-wider text-slate-300">Citizen Services</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Explore Schemes', path: '/services' },
                  { label: 'Recommended For You', path: '/recommended' },
                  { label: 'Track Applications', path: '/applications' },
                  { label: 'Digital Document Vault', path: '/documents' },
                  { label: 'Verified Information', path: '/verified-info' },
                ].map((item, i) => (
                  <li key={i}>
                    <button onClick={() => navigate(item.path)} className="text-slate-400 hover:text-[#FF9933] text-xs transition-colors flex items-center gap-1">
                      <ChevronRight size={10} /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Central Portals */}
            <div>
              <h4 className="font-bold text-xs mb-3 uppercase tracking-wider text-slate-300">Unified Integrations</h4>
              <ul className="space-y-2">
                {[
                  'Aadhaar e-KYC',
                  'DigiLocker Integration',
                  'National Scholarship Portal',
                  'PM Kisan Samman Nidhi',
                  'State Revenue & Land Records',
                ].map((item, i) => (
                  <li key={i}>
                    <span className="text-slate-400 hover:text-white text-xs transition-colors cursor-pointer flex items-center gap-1">
                      <ChevronRight size={10} /> {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Privacy */}
            <div>
              <h4 className="font-bold text-xs mb-3 uppercase tracking-wider text-slate-300">Support & Security</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Help Center', icon: HelpCircle, path: '/privacy' },
                  { label: 'Privacy & Security', icon: Shield, path: '/privacy' },
                  { label: 'Terms of Use', icon: BookOpen, path: '/privacy' },
                  { label: 'AI Citizen Copilot', icon: Sparkles, path: '/ai' },
                ].map((item, i) => (
                  <li key={i}>
                    <button onClick={() => navigate(item.path)} className="text-slate-400 hover:text-[#FF9933] text-xs transition-colors flex items-center gap-1">
                      <item.icon size={11} /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-[11px] text-center sm:text-left">
              © 2025 DOWLET1 • Smart India Hackathon (SIH) Prototype • Made with ❤️ in India 🇮🇳
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">National Flag Accent:</span>
              <div className="flex items-center gap-1">
                <div className="h-2 w-3 rounded-sm bg-[#FF9933]" />
                <div className="h-2 w-3 rounded-sm bg-white" />
                <div className="h-2 w-3 rounded-sm bg-[#138808]" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

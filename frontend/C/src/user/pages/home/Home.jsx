import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Award, GraduationCap, Briefcase, ChevronRight, 
  Sparkles, Mic, Search, FileText, ClipboardList, 
  Bookmark, BookmarkCheck, Fingerprint, Tractor, Heart, Car, Wallet, Grid,
  CheckCircle2, Clock, RefreshCw, Star, Loader2, Bot, AlertCircle, ArrowRight,
  ShieldCheck, Shield, Send, ExternalLink, Zap
} from 'lucide-react';
import MainLayout from '../../components/MainLayout';
import { 
  demoAPI, 
  getRecommendedServices, 
  saveService, 
  removeSavedService, 
  isServiceSaved,
  getVerifiedInformation,
  getSavedServices,
  getDocuments,
  getNotifications,
  getUnreadCount,
  getProfile
} from '../../../utils/demoState';

export default function Home() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(getProfile());
  const [applications, setApplications] = useState([]);
  const [docsCount, setDocsCount] = useState(3);
  const [walletDocuments, setWalletDocuments] = useState([]);
  const [homeNotifications, setHomeNotifications] = useState([]);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [verifiedInfo, setVerifiedInfo] = useState({});
  const [savedCount, setSavedCount] = useState(0);
  const [quickAiInput, setQuickAiInput] = useState('');

  useEffect(() => {
    demoAPI.init();
    setProfile(getProfile());
    setApplications(demoAPI.getApplications());
    setVerifiedInfo(getVerifiedInformation());
    const docs = getDocuments();
    setWalletDocuments(docs);
    setDocsCount(docs.filter(d => d.available || d.status === 'verified').length);
    setSavedCount(getSavedServices().length);

    const notifs = getNotifications();
    setHomeNotifications(notifs);
    setUnreadNotifsCount(notifs.filter(n => !n.read).length);

    // Simulated loading of personalized recommendations
    setLoadingRecs(true);
    const timer = setTimeout(() => {
      const recs = getRecommendedServices();
      setRecommendations(recs);
      setLoadingRecs(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleSave = (service) => {
    const saved = isServiceSaved(service.id);
    if (saved) {
      removeSavedService(service.id);
      setToastMessage(`${service.name} removed from saved.`);
    } else {
      saveService(service.id);
      setToastMessage(`${service.name} saved.`);
    }
    setRecommendations(getRecommendedServices());
    setSavedCount(getSavedServices().length);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleResetDemo = () => {
    demoAPI.reset();
    window.location.reload();
  };

  const handleQuickAiSubmit = (e) => {
    e.preventDefault();
    if (quickAiInput.trim()) {
      navigate('/ai', { state: { initialQuery: quickAiInput.trim() } });
    }
  };

  const renderApplicationProgress = (step, statusType) => {
    const total = 5;
    const progressPercent = statusType === 'completed' ? '100%' : `${Math.min(100, Math.max(20, ((step + 1) / total) * 100))}%`;
    const barColor = statusType === 'action-required' 
      ? 'bg-amber-500' 
      : statusType === 'completed' 
        ? 'bg-emerald-600' 
        : 'bg-[#000080]';
    
    return (
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
        <div className={`${barColor} h-full rounded-full relative transition-all duration-500`} style={{ width: progressPercent }}>
          <div className="absolute right-0 top-0 bottom-0 w-2 h-2 bg-white rounded-full translate-x-1/2 shrink-0 shadow-sm border-2 border-slate-300"></div>
        </div>
      </div>
    );
  };

  const featuredRec = recommendations.length > 0 ? recommendations[0] : null;
  const secondaryRecs = recommendations.slice(1, 3);

  const quickActionList = [
    { icon: FileText, label: 'Documents', badge: `${docsCount} verified`, color: 'text-blue-600', bg: 'bg-blue-50', action: () => navigate('/documents') },
    { icon: ClipboardList, label: 'Applications', badge: `${applications.length} active`, color: 'text-emerald-600', bg: 'bg-emerald-50', action: () => navigate('/applications') },
    { icon: Bookmark, label: 'Saved', badge: `${savedCount} Saved Services`, color: 'text-amber-600', bg: 'bg-amber-50', action: () => navigate('/saved') },
    { icon: Fingerprint, label: 'Identity', badge: 'Verified', color: 'text-purple-600', bg: 'bg-purple-50', action: () => navigate('/verified-info') },
    { icon: ShieldCheck, label: 'DigiLocker', badge: 'Linked', color: 'text-sky-600', bg: 'bg-sky-50', action: () => navigate('/documents') },
    { icon: Zap, label: 'Eligibility', badge: 'AI Match', color: 'text-rose-600', bg: 'bg-rose-50', action: () => navigate('/need-discovery') },
  ];

  const serviceCategories = [
    { icon: Award, label: 'Certificates', desc: 'Caste, Income, Domicile', color: 'text-orange-500', bg: 'bg-orange-50', border: 'hover:border-orange-200' },
    { icon: GraduationCap, label: 'Education', desc: 'Scholarships & Grants', color: 'text-blue-500', bg: 'bg-blue-50', border: 'hover:border-blue-200' },
    { icon: Briefcase, label: 'Employment', desc: 'Jobs & Upskilling', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'hover:border-emerald-200' },
    { icon: Tractor, label: 'Agriculture', desc: 'Kisan Schemes & Subsidy', color: 'text-green-600', bg: 'bg-green-50', border: 'hover:border-green-200' },
    { icon: Heart, label: 'Healthcare', desc: 'Ayushman & Medical Aid', color: 'text-rose-500', bg: 'bg-rose-50', border: 'hover:border-rose-200' },
    { icon: Car, label: 'Transport', desc: 'Driving Licence & RC', color: 'text-cyan-500', bg: 'bg-cyan-50', border: 'hover:border-cyan-200' },
    { icon: Wallet, label: 'Welfare', desc: 'Pensions & Financial Aid', color: 'text-purple-500', bg: 'bg-purple-50', border: 'hover:border-purple-200' },
    { icon: Grid, label: 'All Services', desc: '1,200+ Central & State', color: 'text-slate-600', bg: 'bg-slate-100', border: 'hover:border-slate-300' }
  ];

  return (
    <MainLayout>
      <div className="pb-16 lg:pb-8 relative">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-3">
            <CheckCircle2 size={16} className="text-[#138808]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ═══════════════ TOP GREETING & STATUS BAR ═══════════════ */}
        <div className="px-4 lg:px-0 pt-2 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 mb-5">
          <div 
            onClick={() => navigate('/profile')} 
            className="flex items-center gap-3 cursor-pointer group"
            title="Open Profile & Settings"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#000080] to-blue-800 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              {profile.fullName ? profile.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RK'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base lg:text-lg font-bold text-slate-800 group-hover:text-[#000080] transition-colors">
                  Good Morning, {profile.fullName || 'Rahul Kumar'}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 size={11} className="text-[#138808]" />
                  <span>Demo Verified Citizen</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span>📍 {profile.district || 'Jaipur'}, {profile.state || 'Rajasthan'}</span>
                <span className="text-slate-300">•</span>
                <span>Citizen ID: DL-8849-IN</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-center">
            <button 
              onClick={() => navigate('/notifications')} 
              className="text-xs text-slate-700 hover:text-[#000080] bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm font-bold relative"
              title="Open Notification Centre"
            >
              <Bell size={14} className={unreadNotifsCount > 0 ? "text-[#000080]" : "text-slate-400"} />
              <span>Notifications</span>
              {unreadNotifsCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-xs">
                  {unreadNotifsCount}
                </span>
              )}
            </button>
            <button 
              onClick={handleResetDemo} 
              className="text-xs text-slate-500 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm font-medium"
              title="Reset state to initial prototype values"
            >
              <RefreshCw size={12} />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>

        {/* ═══════════════ ACTION REQUIRED / DEADLINE ALERT BANNER ═══════════════ */}
        <div className="px-4 lg:px-0 mb-6">
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-500/10 border border-amber-200/80 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Bell size={18} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs lg:text-sm font-bold text-amber-950">Notice: Priority Citizen Updates</h4>
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.2 rounded-full">1 Action Pending</span>
                </div>
                <p className="text-xs text-amber-800 leading-snug mt-0.5">
                  Your saved <strong>Post-Matric Scholarship</strong> application window closes on 30th Sep. Your verified data is ready to autofill.
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/service-details/srv-post-matric')}
              className="whitespace-nowrap px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5 self-stretch sm:self-auto justify-center"
            >
              <span>Review & Apply</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* ═══════════════ AI ASSISTANT DISCOVERY HERO ═══════════════ */}
        <div className="px-4 lg:px-0 mb-8">
          <div className="bg-gradient-to-br from-[#000080] via-[#091b61] to-[#040f3b] rounded-3xl p-5 lg:p-7 shadow-xl relative overflow-hidden text-white">
            
            {/* Background glowing orbs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                    <Sparkles size={18} className="text-[#FF9933]" />
                  </div>
                  <span className="font-extrabold text-xs lg:text-sm tracking-widest text-[#FF9933] uppercase">
                    DOWLET1 AI CITIZEN ASSISTANT
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-white/70">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Multilingual Voice & Chat Enabled</span>
                </div>
              </div>

              <h2 className="text-xl lg:text-3xl font-extrabold text-white mb-2 leading-tight">
                How can we assist your citizen journey today?
              </h2>
              <p className="text-white/80 text-xs lg:text-sm mb-5 max-w-2xl leading-relaxed">
                Ask questions about any government service, check your scheme eligibility in seconds, or auto-fill verified forms with zero paperwork.
              </p>

              {/* Interactive Search Bar */}
              <form onSubmit={handleQuickAiSubmit} className="bg-white/15 backdrop-blur-md rounded-2xl p-1.5 flex items-center border border-white/25 shadow-2xl mb-4 max-w-3xl focus-within:bg-white/20 transition-all">
                <div className="pl-3.5 pr-2 text-white/70">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  value={quickAiInput}
                  onChange={(e) => setQuickAiInput(e.target.value)}
                  placeholder="Ask anything, e.g. 'How to get income certificate in Rajasthan?' or 'Am I eligible for PM Kisan?'"
                  className="flex-1 bg-transparent border-none text-xs lg:text-sm text-white placeholder-white/60 focus:outline-none py-2 px-1"
                />
                <button
                  type="button"
                  onClick={() => navigate('/ai')}
                  title="Voice Search"
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors mr-1 hidden sm:flex items-center justify-center"
                >
                  <Mic size={18} />
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-[#000080] font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Ask AI</span>
                  <Send size={13} />
                </button>
              </form>

              {/* Quick suggestion tag chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
                <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
                  Quick Prompts:
                </span>
                {[
                  'Scholarship Eligibility',
                  'Income Certificate',
                  'PM Kisan Status',
                  'Driving Licence Renewal',
                  'Ration Card Add Member',
                  'Senior Pension'
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => navigate('/ai', { state: { initialQuery: tag } })}
                    className="whitespace-nowrap px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white text-[11px] backdrop-blur-sm transition-all border border-white/15 hover:border-white/30 hover:scale-105 active:scale-95"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ═══════════════ MAIN 12-COLUMN DASHBOARD GRID ═══════════════ */}
        <div className="px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ────────────────────────────────────────────────────────── */}
          {/* LEFT 8 COLUMNS: Core Citizen Features & Schemes           */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Quick Actions Bar */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Quick Citizen Actions
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">Single-click shortcuts</span>
              </div>
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 lg:gap-4">
                  {quickActionList.map((action, i) => (
                    <button
                      key={i}
                      onClick={action.action}
                      className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${action.bg} ${action.color} group-hover:scale-110 transition-transform shadow-sm mb-2`}>
                        <action.icon size={22} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#000080] transition-colors leading-tight">
                        {action.label}
                      </span>
                      <span className="text-[9px] font-semibold text-slate-400 mt-1">
                        {action.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. ⭐ RECOMMENDED FOR YOU (AI Matching Engine) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                    ⭐
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                      RECOMMENDED FOR YOU
                    </h3>
                    <p className="text-[10px] text-slate-400 hidden sm:block">
                      AI-matched based on your verified demographics, student status, and state
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/recommended')} 
                  className="text-xs font-bold text-[#000080] hover:text-blue-900 flex items-center gap-1 hover:underline"
                >
                  View All ({recommendations.length}) <ChevronRight size={14} />
                </button>
              </div>

              {loadingRecs ? (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col items-center justify-center">
                  <Loader2 size={24} className="text-[#000080] animate-spin mb-2" />
                  <p className="text-xs font-bold text-slate-700">Evaluating eligibility criteria...</p>
                  <p className="text-[11px] text-slate-400">Comparing your verified information with 1,200+ schemes</p>
                </div>
              ) : !featuredRec ? (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center">
                  <AlertCircle size={24} className="text-amber-500 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-slate-800 mb-1">No recommendations matched</h4>
                  <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">Complete your verified information to receive personalized government scheme matches.</p>
                  <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-[#000080] text-white text-xs font-bold rounded-xl shadow">
                    Complete Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Top Featured Recommendation */}
                  <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-[#000080] to-[#138808]" />

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 pt-1">
                      <div className="flex items-start gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                          {featuredRec.icon || '🎓'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
                              96% Match
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {featuredRec.department}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-slate-900 text-base lg:text-lg leading-snug">
                            {featuredRec.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {featuredRec.description || 'Financial assistance and welfare grant provided to eligible students for higher education expenses.'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleSave(featuredRec)}
                        className={`p-2.5 rounded-2xl border transition-all self-end sm:self-start shrink-0 ${
                          isServiceSaved(featuredRec.id)
                            ? 'bg-amber-50 text-amber-600 border-amber-200 shadow-sm'
                            : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                        title={isServiceSaved(featuredRec.id) ? "Saved in bookmarks" : "Save service"}
                      >
                        {isServiceSaved(featuredRec.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                      </button>
                    </div>

                    {/* Pre-verified credentials match preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                        <CheckCircle2 size={15} className="text-[#138808] shrink-0" />
                        <span>Pre-verified profile details available</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                        <CheckCircle2 size={15} className="text-[#138808] shrink-0" />
                        <span>All required documents in DigiLocker vault</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => navigate(`/service-details/${featuredRec.id}`)}
                        className="flex-1 py-2.5 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors text-center"
                      >
                        View Full Details
                      </button>
                      <button
                        onClick={() => navigate('/ai', { state: { serviceContext: featuredRec } })}
                        className="py-2.5 px-4 text-xs font-bold text-[#000080] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Bot size={15} className="text-[#FF9933]" />
                        <span>Ask AI Assistant</span>
                      </button>
                      <button
                        onClick={() => navigate(`/apply/${featuredRec.id}/start`)}
                        className="flex-[1.2] py-2.5 px-5 text-xs font-bold text-white bg-[#000080] hover:bg-blue-900 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Apply (Autofill Data)</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Secondary Recommendations Grid (Great for desktop view) */}
                  {secondaryRecs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {secondaryRecs.map((rec) => (
                        <div key={rec.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span className="text-xl p-2 rounded-xl bg-slate-50 border border-slate-100">
                                {rec.icon || '📜'}
                              </span>
                              <button
                                onClick={() => handleToggleSave(rec)}
                                className={`p-1.5 rounded-xl border transition-colors ${
                                  isServiceSaved(rec.id)
                                    ? 'bg-amber-50 text-amber-600 border-amber-200'
                                    : 'bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-600'
                                }`}
                              >
                                {isServiceSaved(rec.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                              </button>
                            </div>
                            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              92% Match
                            </span>
                            <h5 className="font-bold text-slate-800 text-sm mt-1 mb-1 leading-snug line-clamp-1">
                              {rec.name}
                            </h5>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                              {rec.department}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <button
                              onClick={() => navigate(`/service-details/${rec.id}`)}
                              className="flex-1 py-1.5 text-[11px] font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg text-center"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => navigate(`/apply/${rec.id}/start`)}
                              className="flex-1 py-1.5 text-[11px] font-bold text-[#000080] bg-blue-50 hover:bg-blue-100 rounded-lg text-center flex items-center justify-center gap-1"
                            >
                              <span>Apply</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Explore Services by Category */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Explore Services by Category
                </h3>
                <button 
                  onClick={() => navigate('/services')} 
                  className="text-xs font-bold text-[#000080] hover:underline flex items-center gap-1"
                >
                  All Categories <ChevronRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {serviceCategories.map((cat, i) => (
                  <div
                    key={i}
                    onClick={() => navigate('/services')}
                    className={`bg-white rounded-2xl p-3.5 border border-slate-200 ${cat.border} hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-10 h-10 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <cat.icon size={20} />
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs group-hover:text-[#000080] transition-colors">
                        {cat.label}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. My Applications Progress Tracker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    My Active Applications
                  </h3>
                  <p className="text-[10px] text-slate-400">Live multi-stage tracking & verification audit</p>
                </div>
                <button 
                  onClick={() => navigate('/applications')} 
                  className="text-xs font-bold text-[#000080] hover:underline flex items-center gap-1"
                >
                  View All ({applications.length}) <ChevronRight size={13} />
                </button>
              </div>

              {applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.slice(0, 3).map(app => (
                    <div key={app.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                            app.statusType === 'completed'
                              ? 'bg-emerald-50 text-emerald-600'
                              : app.statusType === 'action-required'
                                ? 'bg-amber-50 text-amber-600'
                                : 'bg-blue-50 text-[#000080]'
                          }`}>
                            <Award size={22} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm leading-snug">{app.serviceName}</h4>
                            <p className="text-[11px] text-slate-400 font-mono">Ref: {app.id} • Submitted: {app.submittedDate || '12 Sep 2025'}</p>
                          </div>
                        </div>

                        <span className={`text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto ${
                          app.statusType === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : app.statusType === 'action-required'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                              : 'bg-blue-50 text-[#000080] border border-blue-200'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      {/* Action Required Banner if pending user action */}
                      {app.statusType === 'action-required' && (
                        <div className="mb-3 bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5">
                          <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-amber-900 font-bold">Action Needed from Applicant:</p>
                            <p className="text-xs text-amber-800 mt-0.5 leading-snug">
                              {app.actionRequiredMessage || 'Additional income proof or document verification needed.'}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Progress Timeline */}
                      <div className="my-3">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-semibold text-slate-600 flex items-center gap-1">
                            <Clock size={12} className="text-slate-400" />
                            {app.status}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500">
                            {app.statusType === 'completed' 
                              ? 'Completed (Stage 5 of 5)' 
                              : app.statusType === 'action-required'
                                ? 'Pending Action'
                                : `Stage ${(app.statusStep || 0) + 1} of 5`}
                          </span>
                        </div>
                        {renderApplicationProgress(app.statusStep || 0, app.statusType)}

                        <div className="flex justify-between mt-2 px-1 text-[9px] font-semibold text-slate-400">
                          <span>1. Submitted</span>
                          <span>2. Docs Received</span>
                          <span>3. Verifying</span>
                          <span>4. Officer Review</span>
                          <span>5. Certificate</span>
                        </div>
                      </div>

                      {/* Bottom action row */}
                      <div className="flex justify-end items-center gap-3 pt-3 border-t border-slate-100">
                        <button 
                          onClick={() => navigate(`/applications/${app.id}`)} 
                          className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                            app.statusType === 'action-required'
                              ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm'
                              : app.statusType === 'completed'
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                : 'bg-slate-100 text-[#000080] hover:bg-slate-200'
                          }`}
                        >
                          <span>{app.statusType === 'action-required' ? 'Resolve Action' : 'Track Application Details'}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-center">
                  <p className="text-xs text-slate-500">No active applications currently in progress.</p>
                </div>
              )}
            </div>

          </div>

          {/* ────────────────────────────────────────────────────────── */}
          {/* RIGHT 4 COLUMNS: Verified Identity, Vault & Assistant     */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. 🔐 VERIFIED INFORMATION SHOWCASE ("Enter once, reuse everywhere") */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🔐</span>
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    VERIFIED INFORMATION
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Citizen Mesh
                </span>
              </div>

              <div className="bg-blue-50/60 rounded-2xl p-3 border border-blue-100 mb-4">
                <p className="text-[11px] font-semibold text-[#000080] leading-snug">
                  "Enter your information once. Reuse it securely across all eligible government schemes."
                </p>
              </div>

              {/* 3 Verified Data Categories */}
              <div className="space-y-2.5 mb-4">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800">Personal Details</span>
                      <CheckCircle2 size={13} className="text-[#138808]" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {verifiedInfo.personal?.fullName || "Rahul Kumar"} • DOB: 14/05/1998
                    </p>
                  </div>
                  <span className="text-[9px] font-bold bg-white text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                    Aadhaar e-KYC
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800">Verified Address</span>
                      <CheckCircle2 size={13} className="text-[#138808]" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {verifiedInfo.address?.district || "Jaipur"}, {verifiedInfo.address?.state || "Rajasthan"}
                    </p>
                  </div>
                  <span className="text-[9px] font-bold bg-white text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                    PIN: 302001
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800">Government Identity</span>
                      <CheckCircle2 size={13} className="text-[#138808]" />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Aadhaar: XXXX-XXXX-4921 • PAN Linked
                    </p>
                  </div>
                  <span className="text-[9px] font-bold bg-white text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                    Encrypted
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Reused in Applications</span>
                  <span className="font-extrabold text-emerald-700">3 Services Active</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/verified-info')}
                className="w-full py-2.5 bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Manage Verified Data & Consent</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* 2. DOWLET1 AI Quick Copilot Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-5 text-white shadow-sm border border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Bot size={18} className="text-[#FF9933]" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#FF9933]">
                  AI Copilot Side-Widget
                </h4>
              </div>
              <p className="text-xs text-white/80 mb-3 leading-snug">
                Ask specific questions about scheme deadlines, eligibility, or required certificates.
              </p>
              
              <div className="space-y-1.5 mb-3">
                {[
                  "What documents are needed for Income Certificate?",
                  "Is Aadhaar mandatory for Post-Matric Scholarship?",
                  "How to link Ration card to DOWLET1?"
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => navigate('/ai', { state: { initialQuery: prompt } })}
                    className="w-full text-left text-[11px] p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 border border-white/10 transition-colors truncate block"
                  >
                    👉 {prompt}
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate('/ai')}
                className="w-full py-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles size={14} className="text-[#FF9933]" />
                <span>Launch Full AI Assistant</span>
              </button>
            </div>

            {/* 3. Document Vault Snapshot */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-[#000080]" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    📁 MY DOCUMENTS
                  </h4>
                </div>
                <button 
                  onClick={() => navigate('/documents')} 
                  className="text-[11px] font-bold text-[#000080] hover:underline flex items-center gap-0.5"
                >
                  <span>View →</span>
                </button>
              </div>

              <div className="space-y-2 mb-3">
                {(walletDocuments.length > 0 ? walletDocuments.slice(0, 3) : [
                  { name: 'Identity Proof', issuer: 'UIDAI', status: 'verified' },
                  { name: 'Address Proof', issuer: 'Rajasthan DISCOM', status: 'verified' },
                  { name: 'Income Proof', issuer: 'Revenue Dept', status: 'pending' }
                ]).map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800 text-[11px]">{doc.name}</p>
                      <p className="text-[9px] text-slate-400">{doc.issuer}</p>
                    </div>
                    {doc.status === 'verified' ? (
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <CheckCircle2 size={10} className="text-[#138808]" />
                        <span>✓ Verified</span>
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 flex items-center gap-1">
                        <Clock size={10} className="text-amber-600" />
                        <span>● Pending</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/documents')}
                className="w-full py-2 text-xs font-bold text-[#000080] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-center flex items-center justify-center gap-1"
              >
                <span>Open Document Wallet ({docsCount} Ready)</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* 4. 🔔 RECENT UPDATES (Central Notification Integration) */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-[#000080]" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    🔔 RECENT UPDATES
                  </h4>
                </div>
                <button 
                  onClick={() => navigate('/notifications')} 
                  className="text-[11px] font-bold text-[#000080] hover:underline flex items-center gap-0.5"
                >
                  <span>View All →</span>
                </button>
              </div>

              <div className="space-y-2 mb-3">
                {(homeNotifications.length > 0 ? homeNotifications.slice(0, 3) : [
                  { title: 'Application status updated', time: '2 min ago', read: false },
                  { title: 'Document verification completed', time: '1 hour ago', read: false }
                ]).map((notif, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => navigate('/notifications')}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all hover:border-blue-200 ${
                      !notif.read ? 'bg-blue-50/40 border-blue-100' : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-bold text-slate-800 text-[11px] leading-snug line-clamp-1">{notif.title}</p>
                      {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1 shrink-0" />}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                      <span>{notif.time || "Recent"}</span>
                      <span className="text-[#000080] font-semibold flex items-center gap-0.5">
                        Details <span>→</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/notifications')}
                className="w-full py-2 text-xs font-bold text-[#000080] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-center flex items-center justify-center gap-1"
              >
                <span>Open Notification Centre {unreadNotifsCount > 0 ? `(${unreadNotifsCount} New)` : ''}</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* 5. Support & Helpline */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 text-center">
              <p className="text-xs font-bold text-slate-700">Need immediate assistance?</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Toll-free national citizen helpline active 24x7</p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-bold text-xs">
                <span>📞 1800-111-001 (Toll Free)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

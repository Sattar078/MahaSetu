import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Award, GraduationCap, Briefcase, ChevronRight, 
  Sparkles, Mic, Search, FileText, ClipboardList, 
  Bookmark, BookmarkCheck, Fingerprint, Tractor, Heart, Car, Wallet, Grid,
  CheckCircle2, Clock, RefreshCw, Star, Loader2, Bot, AlertCircle, ArrowRight
} from 'lucide-react';
import MainLayout from '../../components/MainLayout';
import { 
  demoAPI, 
  getRecommendedServices, 
  saveService, 
  removeSavedService, 
  isServiceSaved,
  getVerifiedInformation
} from '../../../utils/demoState';

export default function Home() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [docsCount, setDocsCount] = useState(3);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [verifiedInfo, setVerifiedInfo] = useState({});

  useEffect(() => {
    demoAPI.init();
    setApplications(demoAPI.getApplications());
    setVerifiedInfo(getVerifiedInformation());
    const docs = demoAPI.getDocuments();
    setDocsCount(docs.filter(d => d.available).length);

    // Simulated loading of personalized recommendations
    setLoadingRecs(true);
    const timer = setTimeout(() => {
      const recs = getRecommendedServices();
      setRecommendations(recs);
      setLoadingRecs(false);
    }, 600);

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
    // Update recommendations state to reflect saved toggle
    setRecommendations(getRecommendedServices());
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleResetDemo = () => {
    demoAPI.reset();
    window.location.reload();
  };

  const renderApplicationProgress = (step, statusType) => {
    // 5-step lifecycle: 0 (Submitted), 1 (Docs Received), 2 (Verification in Progress), 3 (Officer Verification), 4 (Certificate Issued)
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

  return (
    <MainLayout>
      <div className="pb-20 relative">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 size={16} className="text-[#138808]" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="px-5 pt-2 pb-4 bg-white flex items-center justify-between">
          <p className="text-slate-500 text-sm">Good Morning, Rahul</p>
          <button onClick={handleResetDemo} className="text-[10px] text-slate-300 hover:text-red-500 flex items-center gap-1">
            <RefreshCw size={10} /> Reset Demo
          </button>
        </div>

        {/* Reminder Banner (Extra Feature for SIH Demo) */}
        <div className="px-5 mb-5 mt-1">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mt-1 shrink-0">
              <Bell size={16} className="animate-pulse" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-amber-900 mb-0.5">Reminder</h4>
              <p className="text-[10px] text-amber-700 leading-tight">
                Your saved <strong>Scholarship</strong> service has an upcoming application deadline.
              </p>
              <button 
                onClick={() => navigate('/service-details')}
                className="mt-2 text-[10px] font-bold text-[#000080] hover:text-blue-800 flex items-center gap-1"
              >
                View Service <ChevronRight size={10} />
              </button>
            </div>
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="px-5 mb-6" onClick={() => navigate('/ai')}>
          <div className="bg-gradient-to-br from-[#000080] to-blue-900 rounded-2xl p-5 shadow-md relative overflow-hidden cursor-pointer">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <Sparkles size={20} className="text-[#FF9933]" />
              <h2 className="text-white font-bold text-sm tracking-wide">DOWLET1 AI</h2>
            </div>
            
            <h3 className="text-white text-2xl font-bold mb-4 relative z-10">How can we help you today?</h3>
            
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-1 mb-4 flex items-center relative z-10">
              <div className="pl-3 py-2 text-white/70">
                <Search size={20} />
              </div>
              <div className="flex-1 px-3 py-2 text-sm text-white/70">
                Ask anything about services...
              </div>
              <button className="p-2 bg-white text-[#000080] rounded-lg shadow-sm mr-1">
                <Mic size={18} />
              </button>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-1 relative z-10 hide-scrollbar">
              {['Scholarship', 'Certificate', 'Pension'].map((tag) => (
                <button key={tag} className="whitespace-nowrap px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-full text-white text-xs backdrop-blur-sm transition-colors border border-white/20">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-5 mb-6">
          <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Quick Actions</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: FileText, label: 'Documents', color: 'text-blue-600', bg: 'bg-blue-50', action: () => navigate('/documents') },
                { icon: ClipboardList, label: 'Applications', color: 'text-emerald-600', bg: 'bg-emerald-50', action: () => navigate('/applications') },
                { icon: Bookmark, label: 'Saved', color: 'text-amber-600', bg: 'bg-amber-50', action: () => navigate('/saved') },
                { icon: Fingerprint, label: 'Identity', color: 'text-purple-600', bg: 'bg-purple-50', action: () => navigate('/identity') }
              ].map((action, i) => (
                <button key={i} onClick={action.action} className="flex flex-col items-center gap-2 group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.bg} ${action.color} group-hover:scale-105 transition-transform`}>
                    <action.icon size={22} />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ⭐ RECOMMENDED FOR YOU Section */}
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">⭐</span>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                RECOMMENDED FOR YOU
              </h3>
            </div>
            <button 
              onClick={() => navigate('/recommended')} 
              className="text-[11px] font-bold text-[#000080] hover:text-blue-900 flex items-center gap-0.5"
            >
              View All <ChevronRight size={13} />
            </button>
          </div>

          {loadingRecs ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center py-7">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2.5">
                <Loader2 size={20} className="text-[#000080] animate-spin" />
              </div>
              <p className="text-xs font-bold text-slate-700">Finding services for you...</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Matching available profile information</p>
            </div>
          ) : !featuredRec ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
                <AlertCircle size={20} />
              </div>
              <h4 className="text-xs font-bold text-slate-800 mb-1">No personalized recommendations yet.</h4>
              <p className="text-[11px] text-slate-500 mb-3 leading-relaxed max-w-xs mx-auto">
                Complete your profile and add verified information to receive relevant service suggestions.
              </p>
              <button 
                onClick={() => navigate('/profile')} 
                className="bg-[#000080] text-white text-[11px] font-bold py-2 px-4 rounded-xl shadow-sm hover:bg-blue-900 transition-colors"
              >
                Complete Profile
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative overflow-hidden transition-all hover:shadow-md">
              {/* Subtle accent bar at top of card */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-blue-500 to-[#138808]"></div>

              {/* Service Header Row */}
              <div className="flex items-start justify-between gap-3 mb-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl shrink-0 shadow-sm">
                    {featuredRec.icon || '🎓'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {featuredRec.name}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500">
                      {featuredRec.department}
                    </p>
                  </div>
                </div>

                {/* Save bookmark button */}
                <button 
                  onClick={() => handleToggleSave(featuredRec)}
                  title={isServiceSaved(featuredRec.id) ? "Saved" : "Save service"}
                  className={`p-2 rounded-xl border transition-colors shrink-0 ${
                    isServiceSaved(featuredRec.id)
                      ? 'bg-amber-50 text-amber-600 border-amber-200' 
                      : 'bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-600'
                  }`}
                >
                  {isServiceSaved(featuredRec.id) ? (
                    <BookmarkCheck size={16} />
                  ) : (
                    <Bookmark size={16} />
                  )}
                </button>
              </div>

              {/* Available Information Badges */}
              <div className="space-y-1.5 mb-3 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                  <CheckCircle2 size={13} className="text-[#138808] shrink-0" />
                  <span>Profile information available</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                  <CheckCircle2 size={13} className="text-[#138808] shrink-0" />
                  <span>Required documents available</span>
                </div>
              </div>

              {/* Reason / Prototype disclaimer */}
              <p className="text-[10px] text-slate-500 italic mb-3 leading-tight flex items-center gap-1">
                <span>"Recommended based on your available profile information."</span>
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                <button 
                  onClick={() => navigate(`/service-details/${featuredRec.id}`)}
                  className="flex-1 py-2 text-[11px] font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-center"
                >
                  View Details
                </button>

                <button 
                  onClick={() => navigate('/ai', { state: { serviceContext: featuredRec } })}
                  title="Ask DOWLET1 AI about this service"
                  className="px-3 py-2 text-[11px] font-bold text-[#000080] bg-blue-50/70 hover:bg-blue-100 border border-blue-100 rounded-xl transition-colors flex items-center gap-1"
                >
                  <Bot size={13} className="text-[#FF9933]" />
                  <span>AI</span>
                </button>

                <button 
                  onClick={() => navigate(`/apply/${featuredRec.id}/start`)}
                  className="flex-[1.2] py-2 text-[11px] font-bold text-white bg-[#000080] hover:bg-blue-900 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1"
                >
                  Apply <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* My Applications */}
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">My Applications</h3>
            <button onClick={() => navigate('/applications')} className="text-[10px] font-semibold text-[#000080]">View All</button>
          </div>
          
          {applications.length > 0 ? (
            <div className="space-y-3">
              {applications.slice(0, 3).map(app => (
                <div key={app.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        app.statusType === 'completed'
                          ? 'bg-emerald-50 text-emerald-600'
                          : app.statusType === 'action-required'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-blue-50 text-[#000080]'
                      }`}>
                        <Award size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm leading-snug">{app.serviceName}</h4>
                        <p className="text-[10px] text-slate-400 font-mono">Ref: {app.id}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      app.statusType === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : app.statusType === 'action-required'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                          : 'bg-blue-50 text-[#000080] border border-blue-200'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Action Required Banner if pending user action */}
                  {app.statusType === 'action-required' && (
                    <div className="mb-3 bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-2">
                      <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-amber-800 font-medium leading-snug">
                        {app.actionRequiredMessage || 'Additional action required from applicant.'}
                      </p>
                    </div>
                  )}
                  
                  <div className="my-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
                        <Clock size={12} className="text-slate-400" />
                        <span>{app.status}</span>
                      </p>
                      <span className="text-[10px] font-medium text-slate-400">
                        {app.statusType === 'completed' 
                          ? 'Completed (5 of 5)' 
                          : app.statusType === 'action-required'
                            ? 'Action Needed'
                            : `Step ${(app.statusStep || 0) + 1} of 5`}
                      </span>
                    </div>
                    {/* Progress bar */}
                    {renderApplicationProgress(app.statusStep || 0, app.statusType)}
                    
                    <div className="flex justify-between mt-1.5 px-0.5">
                      <span className="text-[8px] text-slate-400">Submitted</span>
                      <span className="text-[8px] text-slate-400">Docs</span>
                      <span className="text-[8px] text-slate-400">Verifying</span>
                      <span className="text-[8px] text-slate-400">Officer</span>
                      <span className="text-[8px] text-slate-400">Issued</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end items-center gap-2 border-t border-slate-50 pt-2.5 mt-2">
                    <button 
                      onClick={() => navigate(`/applications/${app.id}`)} 
                      className={`flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors ${
                        app.statusType === 'action-required'
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : app.statusType === 'completed'
                            ? 'text-emerald-700 hover:bg-emerald-50'
                            : 'text-[#000080] hover:bg-blue-50'
                      }`}
                    >
                      {app.statusType === 'action-required' ? 'Resolve Action' : 'Track Details'} <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center text-slate-500 text-sm">
              No recent applications.<br/>
              <span className="text-xs text-slate-400">Ask DOWLET1 AI to help you apply!</span>
            </div>
          )}
        </div>

        {/* Explore Services */}
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Explore Services</h3>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="grid grid-cols-4 gap-y-5 gap-x-2">
              {[
                { icon: Award, label: 'Cert.', color: 'text-orange-500', bg: 'bg-orange-50' },
                { icon: GraduationCap, label: 'Edu.', color: 'text-blue-500', bg: 'bg-blue-50' },
                { icon: Briefcase, label: 'Jobs', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { icon: Tractor, label: 'Agriculture', color: 'text-green-600', bg: 'bg-green-50' },
                { icon: Heart, label: 'Health', color: 'text-rose-500', bg: 'bg-rose-50' },
                { icon: Car, label: 'Transport', color: 'text-cyan-500', bg: 'bg-cyan-50' },
                { icon: Wallet, label: 'Welfare', color: 'text-purple-500', bg: 'bg-purple-50' },
                { icon: Grid, label: 'More', color: 'text-slate-500', bg: 'bg-slate-100' }
              ].map((service, i) => (
                <button key={i} onClick={() => navigate('/services')} className="flex flex-col items-center gap-2 group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${service.bg} ${service.color} group-hover:scale-105 transition-transform`}>
                    <service.icon size={18} />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">{service.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 🔐 Verified Information */}
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span>🔐</span>
              <span>VERIFIED INFORMATION</span>
            </h3>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
              Demo Verified
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1">
                  <span>Personal</span>
                  <CheckCircle2 size={12} className="text-[#138808]" />
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5 truncate">{verifiedInfo.personal?.fullName || "Rahul Kumar"}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1">
                  <span>Address</span>
                  <CheckCircle2 size={12} className="text-[#138808]" />
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5 truncate">{verifiedInfo.address?.district || "Jaipur"}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1">
                  <span>Identity</span>
                  <CheckCircle2 size={12} className="text-[#138808]" />
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5 truncate">Govt ID</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug mb-3.5">
              "Your information can be reused across eligible services."
            </p>

            <div className="flex items-center justify-between border-t border-slate-50 pt-2.5">
              <span className="text-[10px] text-slate-400 font-medium">Reusable across services</span>
              <button 
                onClick={() => navigate('/verified-info')} 
                className="text-[11px] font-bold text-[#000080] hover:text-blue-900 flex items-center gap-1 transition-colors"
              >
                <span>Manage Information</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
        
        {/* My Documents & Updates Row */}
        <div className="px-5 mb-8 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 cursor-pointer" onClick={() => navigate('/documents')}>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
              <FileText size={16} />
            </div>
            <h4 className="font-bold text-slate-800 text-xs">My Documents</h4>
            <p className="text-[10px] text-slate-500 mb-2">{docsCount} verified documents</p>
            <button className="text-[10px] font-semibold text-blue-600 flex items-center gap-1 mt-auto">
              View <ChevronRight size={12} />
            </button>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center mb-2">
              <Bell size={16} />
            </div>
            <h4 className="font-bold text-slate-800 text-xs">Recent Updates</h4>
            <p className="text-[10px] text-slate-500 mb-2 leading-tight">
              {applications.length > 0 ? "Application status updated" : "No recent updates"}
            </p>
            <button className="text-[10px] font-semibold text-rose-500 flex items-center gap-1 mt-auto">
              View All <ChevronRight size={12} />
            </button>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

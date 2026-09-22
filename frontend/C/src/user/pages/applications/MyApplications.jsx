import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { 
  ArrowLeft, Search, ChevronRight, Clock, CheckCircle2, 
  AlertCircle, FileText, Award, RefreshCw, ArrowRight, 
  RotateCcw, SlidersHorizontal, Filter
} from 'lucide-react';
import { 
  demoAPI, 
  getApplications, 
  filterApplications, 
  searchApplications, 
  resetDemoData 
} from '../../../utils/demoState';

const TABS = ['All', 'In Progress', 'Completed', 'Needs Action'];

export default function MyApplications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'oldest' | 'status'
  const [applications, setApplications] = useState([]);
  const [showToast, setShowToast] = useState(null);

  useEffect(() => {
    demoAPI.init();
    loadApps();
  }, []);

  const loadApps = () => {
    const apps = getApplications();
    setApplications(apps);
  };

  const handleReset = () => {
    resetDemoData();
    loadApps();
    setShowToast("Demo application data has been reset.");
    setTimeout(() => setShowToast(null), 3000);
  };

  // 1. Filter by statusTab
  const statusFiltered = filterApplications(activeTab, applications);

  // 2. Search query filter
  const searchFiltered = searchApplications(searchQuery, statusFiltered);

  // 3. Sorting
  const sortedApplications = [...searchFiltered].sort((a, b) => {
    if (sortBy === 'status') {
      return (b.statusStep || 0) - (a.statusStep || 0);
    }
    // Default or latest / oldest by date or ID
    const dateA = new Date(a.submittedDate || 0);
    const dateB = new Date(b.submittedDate || 0);
    if (sortBy === 'oldest') {
      return dateA - dateB;
    }
    return dateB - dateA;
  });

  // Summary counts
  const totalCount = applications.length;
  const inProgressCount = applications.filter(a => a.statusType === 'in-progress').length;
  const completedCount = applications.filter(a => a.statusType === 'completed').length;
  const needsActionCount = applications.filter(a => a.statusType === 'action-required').length;

  const renderProgressBar = (app) => {
    const total = 4; // 0 to 4 steps
    const current = Math.min(app.statusStep ?? 0, 4);
    const isAction = app.statusType === 'action-required';

    return (
      <div className="my-4 relative">
        <div className="flex items-center justify-between px-1 relative z-10">
          {/* Background track */}
          <div className="absolute top-1/2 left-2 right-2 h-[2px] bg-slate-200 -z-10 -translate-y-1/2"></div>
          {/* Active track */}
          <div 
            className={`absolute top-1/2 left-2 h-[2px] -z-10 -translate-y-1/2 transition-all duration-300 ${
              isAction ? 'bg-amber-500' : current === 4 ? 'bg-[#138808]' : 'bg-[#000080]'
            }`}
            style={{ width: `${(current / total) * 100}%`, maxWidth: 'calc(100% - 16px)' }}
          ></div>
          
          {[0, 1, 2, 3, 4].map((stepIdx) => {
            const isCompleted = stepIdx < current || (stepIdx === current && current === 4);
            const isCurrent = stepIdx === current && current !== 4;
            return (
              <div key={stepIdx} className="flex flex-col items-center">
                <div 
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    isCompleted 
                      ? 'bg-[#138808] border-[#138808]' 
                      : isCurrent 
                        ? isAction ? 'bg-amber-500 border-amber-500 ring-4 ring-amber-100' : 'bg-[#000080] border-[#000080] ring-4 ring-blue-100'
                        : 'bg-white border-slate-300'
                  }`}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-slate-400 px-0.5">
          <span>Submitted</span>
          <span>Intake</span>
          <span>Review</span>
          <span>Officer</span>
          <span>Issued</span>
        </div>
      </div>
    );
  };

  const getStatusBadge = (app) => {
    if (app.statusType === 'completed') {
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold text-[#138808] bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
          <CheckCircle2 size={12} /> Certificate Issued
        </span>
      );
    }
    if (app.statusType === 'action-required') {
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          <AlertCircle size={12} className="text-amber-600" /> Action Required
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[10px] font-bold text-[#000080] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
        <Clock size={12} className="text-[#000080]" /> {app.currentStatus || app.status || 'Verification in Progress'}
      </span>
    );
  };

  const getServiceIcon = (app) => {
    const sId = (app.serviceId || '').toLowerCase();
    if (sId.includes('scholarship') || (app.serviceName || '').toLowerCase().includes('scholarship')) return '🎓';
    if (sId.includes('residence')) return '🏠';
    return '📄';
  };

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-full pb-24 relative">
        
        {/* Toast Feedback */}
        {showToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 size={16} className="text-[#138808]" />
            <span>{showToast}</span>
          </div>
        )}

        {/* Page Top Header */}
        <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/home')}
                aria-label="Back to Home"
                className="p-1.5 -ml-1 text-slate-700 hover:text-[#000080] hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText size={16} className="text-[#000080]" />
                  My Applications
                </h1>
              </div>
            </div>

            {/* Developer Reset Demo */}
            <button
              onClick={handleReset}
              title="Reset Demo Applications State"
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 bg-slate-50 hover:bg-red-50 px-2 py-1 rounded-md border border-slate-200 transition-colors"
            >
              <RotateCcw size={11} /> Reset Demo
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Track and manage your government service applications in real time.
          </p>
        </div>

        {/* Summary Metric Cards */}
        <div className="px-5 pt-2 pb-3">
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Total</p>
              <p className="text-lg font-extrabold text-slate-800 mt-0.5">{totalCount}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">In Progress</p>
              <p className="text-lg font-extrabold text-[#000080] mt-0.5">{inProgressCount}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-tight">Completed</p>
              <p className="text-lg font-extrabold text-[#138808] mt-0.5">{completedCount}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-center">
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-tight">Needs Action</p>
              <p className="text-lg font-extrabold text-amber-600 mt-0.5">{needsActionCount}</p>
            </div>
          </div>
        </div>

        {/* Search Bar & Sorting */}
        <div className="px-5 pt-1 pb-3 space-y-2.5">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by ID, service name, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] shadow-sm transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Filter Tabs */}
            <div className="flex gap-1.5 overflow-x-auto hide-scrollbar flex-1 mr-2">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#000080] text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Sort Toggle */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-[11px] font-bold py-1.5 px-2.5 rounded-lg focus:outline-none focus:border-[#000080] shadow-sm shrink-0"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        <div className="px-5 pt-1 space-y-4">
          {sortedApplications.length > 0 ? (
            sortedApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md"
              >
                {/* Accent line on left */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-1 ${
                    app.statusType === 'completed' 
                      ? 'bg-[#138808]' 
                      : app.statusType === 'action-required' 
                        ? 'bg-amber-500' 
                        : 'bg-[#000080]'
                  }`} 
                />

                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-2 pl-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl shrink-0">
                      {getServiceIcon(app)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">
                        {app.serviceName}
                      </h3>
                      <p className="text-[11px] font-medium text-slate-500">
                        {app.department}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Application ID & Status Row */}
                <div className="flex items-center justify-between mb-1 pl-1 pt-1">
                  <span className="font-mono text-[11px] text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {app.id}
                  </span>
                  {getStatusBadge(app)}
                </div>

                {/* 5-step Lifecycle Bar */}
                <div className="pl-1">
                  {renderProgressBar(app)}
                </div>

                {/* Action Required Banner inside card if applicable */}
                {app.statusType === 'action-required' && (
                  <div className="my-3 p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
                    <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-900">Document Required</p>
                      <p className="text-[11px] text-amber-700 leading-snug mt-0.5">
                        {app.actionRequiredMessage || "Please provide required document to continue."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Submitted date & action buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 pl-1">
                  <p className="text-[11px] text-slate-400 font-medium">
                    Submitted: {app.submittedDate || 'Recent'}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/applications/${app.id}`)}
                      className="text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => navigate(`/applications/${app.id}`)}
                      className="flex items-center gap-1 text-xs font-bold text-white bg-[#000080] hover:bg-blue-900 px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
                    >
                      Track <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <FileText size={24} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                No applications in this category.
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-xs mx-auto leading-relaxed">
                You do not have any applications matching the selected criteria. Explore citizen services to apply.
              </p>
              <button
                onClick={() => navigate('/services')}
                className="bg-[#000080] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-sm hover:bg-blue-900 transition-colors"
              >
                Explore Services
              </button>
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
}

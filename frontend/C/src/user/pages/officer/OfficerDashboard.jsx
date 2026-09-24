import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Landmark, ShieldCheck, Award, CheckCircle2, AlertCircle, 
  ChevronRight, RefreshCw, ArrowLeft, Clock, FileText, 
  ExternalLink, UserCheck, XCircle, Search, Filter
} from 'lucide-react';
import { 
  getOfficerPendingApplications, 
  approveOfficerApplication, 
  requestOfficerAction, 
  setCurrentRole 
} from '../../../utils/demoState';

export default function OfficerDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const apps = getOfficerPendingApplications();
    setApplications(apps);
    if (apps.length > 0) {
      setSelectedApp(apps[0]);
    }
  }, []);

  const refreshData = () => {
    const apps = getOfficerPendingApplications();
    setApplications(apps);
    if (apps.length > 0 && !selectedApp) {
      setSelectedApp(apps[0]);
    } else if (selectedApp) {
      const updated = apps.find(a => a.id === selectedApp.id);
      if (updated) setSelectedApp(updated);
    }
  };

  const handleApprove = (appId) => {
    approveOfficerApplication(appId, 'Verified and approved by Officer OFF-REV-RJ-1049');
    setToastMessage(`Application ${appId} successfully advanced.`);
    refreshData();
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRequestAction = (appId) => {
    requestOfficerAction(appId, 'Income certificate renewal or recent payslip required by verification desk.');
    setToastMessage(`Action Required flag sent to applicant for ${appId}.`);
    refreshData();
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSwitchToCitizen = () => {
    setCurrentRole('citizen');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* Tricolor top strip */}
      <div className="h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] w-full sticky top-0 z-50" />

      {/* Top Header */}
      <header className="bg-slate-900 text-white sticky top-1.5 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm">
              <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-wide text-white">DOWLET1 OFFICER CONSOLE</span>
                <span className="text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full uppercase">
                  Nodal Verification
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Department of Revenue & Land Records • Rajasthan State Node
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">Insp. Virendra Singh</p>
              <p className="text-[10px] text-slate-400 font-mono">OFF-REV-RJ-1049</p>
            </div>
            <button
              onClick={handleSwitchToCitizen}
              className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl border border-white/20 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={13} />
              <span>Switch to Citizen View</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold z-50 border border-sky-500/50 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Review</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{applications.filter(a => a.statusType !== 'completed').length}</p>
            <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-2">
              Action Required: {applications.filter(a => a.statusType === 'action-required').length}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verified & Issued</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">{applications.filter(a => a.statusType === 'completed').length}</p>
            <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-2">
              Digital Seal Applied
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Turnaround</p>
            <p className="text-2xl font-black text-[#000080] mt-1">1.2 Days</p>
            <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md inline-block mt-2">
              86% Faster than Manual
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pre-Verified Mesh</p>
            <p className="text-2xl font-black text-purple-700 mt-1">100%</p>
            <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md inline-block mt-2">
              Aadhaar & DigiLocker Sync
            </span>
          </div>
        </div>

        {/* 12-Column Layout: Left Queue (5 cols), Right Audit & Actions (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Applications Queue */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Assigned Applications Queue ({applications.length})
              </h2>
              <button onClick={refreshData} className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium">
                <RefreshCw size={11} /> Refresh
              </button>
            </div>

            <div className="space-y-2.5">
              {applications.map((app) => {
                const isSelected = selectedApp?.id === app.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-white border-[#000080] shadow-md ring-2 ring-[#000080]/10'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-bold text-slate-800 text-sm leading-snug">{app.serviceName}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        app.statusType === 'completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : app.statusType === 'action-required'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                            : 'bg-sky-50 text-sky-800 border border-sky-200'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mt-1">
                      <span>Ref: {app.id}</span>
                      <span>Stage {(app.statusStep || 0) + 1} of 5</span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Applicant: Rahul Kumar</span>
                      <span>Submitted: {app.submittedDate || '12 Sep 2025'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Detail & Official Action Panel */}
          <div className="lg:col-span-7">
            {selectedApp ? (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-20">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <span className="text-[10px] font-bold bg-blue-50 text-[#000080] px-2 py-0.5 rounded-md border border-blue-200">
                      Active Case File
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                      {selectedApp.serviceName}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Case Reference: {selectedApp.id} • Department of Revenue
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    selectedApp.statusType === 'completed'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : selectedApp.statusType === 'action-required'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-sky-50 text-sky-800 border border-sky-200'
                  }`}>
                    {selectedApp.status}
                  </span>
                </div>

                {/* Pre-Verified Citizen Mesh Audit Checklist */}
                <div className="mb-5 bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>Citizen Mesh Verification Audit</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                      <span className="font-semibold text-slate-700">Applicant Identity</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 size={12} /> Aadhaar Verified (UIDAI Registry)
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                      <span className="font-semibold text-slate-700">Residential Address</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 size={12} /> Jaipur, Rajasthan (Pre-verified)
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
                      <span className="font-semibold text-slate-700">Uploaded Supporting Proofs</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 size={12} /> DigiLocker Verified Document Vault
                      </span>
                    </div>
                  </div>
                </div>

                {/* Official Action Controls */}
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Officer Decision & Departmental Signature
                  </h4>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleApprove(selectedApp.id)}
                      className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <CheckCircle2 size={16} />
                      <span>{selectedApp.statusStep >= 3 ? 'Issue Final Digital Certificate' : 'Approve & Advance Verification'}</span>
                    </button>

                    <button
                      onClick={() => handleRequestAction(selectedApp.id)}
                      className="py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <AlertCircle size={16} />
                      <span>Flag Action Required</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-3 text-center">
                    Decisions are cryptographically logged with Officer ID OFF-REV-RJ-1049 and automatically notify the citizen.
                  </p>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center text-slate-400 text-xs">
                Select an application from the queue to review and take action.
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white text-xs py-4 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-slate-400 text-[11px]">
            DOWLET1 Departmental Verification Mesh • Smart India Hackathon Prototype
          </p>
          <button onClick={handleSwitchToCitizen} className="text-sky-400 hover:underline text-[11px]">
            Return to Citizen Mode →
          </button>
        </div>
      </footer>
    </div>
  );
}

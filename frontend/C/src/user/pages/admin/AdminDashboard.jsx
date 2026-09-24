import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, Activity, Users, Landmark, Server, 
  CheckCircle2, ArrowLeft, RefreshCw, BarChart3, Database, Lock
} from 'lucide-react';
import { setCurrentRole } from '../../../utils/demoState';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleSwitchToCitizen = () => {
    setCurrentRole('citizen');
    navigate('/home');
  };

  const telemetryStats = [
    { label: 'Active Central & State Schemes', value: '1,248', desc: 'Covering 28 States & 8 UTs', icon: Landmark, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Verified Citizens Onboarded', value: '1,28,49,102', desc: '98.4% via Aadhaar & DigiLocker', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Simulated API Mesh Latency', value: '14 ms', desc: 'UIDAI & DigiLocker Gateway Sync', icon: Server, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Platform Availability / Uptime', value: '99.98%', desc: 'Fault-tolerant distributed nodes', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* Tricolor top strip */}
      <div className="h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] w-full sticky top-0 z-50" />

      {/* Header */}
      <header className="bg-slate-950 text-white sticky top-1.5 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm">
              <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-wide text-white">DOWLET1 ADMIN CONSOLE</span>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase">
                  System Oversight
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                National Citizen Data Mesh • Architecture Monitoring & SIH Telemetry
              </p>
            </div>
          </div>

          <button
            onClick={handleSwitchToCitizen}
            className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-xl border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>Switch to Citizen Portal</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Telemetry Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {telemetryStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-[11px] text-slate-400 mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* 2-Column System Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Scheme Quotas & Node Health */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BarChart3 size={16} className="text-[#000080]" />
                <span>Scheme Verification Throughput by Department</span>
              </h3>

              <div className="space-y-4">
                {[
                  { name: 'Revenue & Caste/Income Certificates', count: '48,201 apps / day', percent: 85, color: 'bg-orange-500' },
                  { name: 'Education & Higher Studies Scholarships', count: '32,140 apps / day', percent: 70, color: 'bg-blue-600' },
                  { name: 'Agriculture & PM Kisan Direct Benefit Transfer', count: '64,900 apps / day', percent: 92, color: 'bg-emerald-600' },
                  { name: 'Regional Transport & Licences', count: '18,450 apps / day', percent: 45, color: 'bg-purple-600' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{item.name}</span>
                      <span className="text-slate-500 font-mono">{item.count}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className={`${item.color} h-full rounded-full transition-all`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Database size={16} className="text-emerald-600" />
                <span>Federated Citizen Mesh Node Connectivity</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { node: 'UIDAI e-KYC Node', status: 'Online (12ms)' },
                  { node: 'DigiLocker Issuer Node', status: 'Online (15ms)' },
                  { node: 'National Scholarship Portal', status: 'Online (18ms)' },
                  { node: 'PM-KISAN DBT Bridge', status: 'Online (10ms)' },
                  { node: 'Rajasthan Jan-Soochana Node', status: 'Online (14ms)' },
                  { node: 'e-Pramaan SSO Gateway', status: 'Online (9ms)' },
                ].map((n, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="font-bold text-slate-800 text-[11px]">{n.node}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                      <CheckCircle2 size={10} /> {n.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Security Audit & Log */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Lock size={16} className="text-amber-600" />
                <span>Security & Zero-Knowledge Audit Trail</span>
              </h3>

              <div className="space-y-3">
                {[
                  { event: 'Aadhaar Demographic Match', citizen: 'Rahul Kumar (DL-8849)', time: '3 mins ago', status: 'Approved' },
                  { event: 'DigiLocker Income Pull', citizen: 'Rahul Kumar (DL-8849)', time: '8 mins ago', status: 'Verified' },
                  { event: 'Officer Digital Signature Issued', citizen: 'Applicant (DL-8820)', time: '24 mins ago', status: 'Signed' },
                  { event: 'Consent Revocation Check', citizen: 'Applicant (DL-7911)', time: '1 hour ago', status: 'Success' },
                ].map((log, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-[11px]">{log.event}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {log.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">{log.citizen} • {log.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#000080] to-blue-950 text-white rounded-3xl p-6 shadow-md">
              <h4 className="font-extrabold text-sm mb-2 text-[#FF9933]">
                Smart India Hackathon 2024-2025 Evaluation
              </h4>
              <p className="text-xs text-blue-100/80 leading-relaxed mb-4">
                This console demonstrates real-time end-to-end telemetry for unified citizen onboarding, cross-departmental verification, and single-click access.
              </p>
              <button
                onClick={handleSwitchToCitizen}
                className="w-full py-2.5 bg-white text-[#000080] font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors shadow"
              >
                Return to Citizen Portal Home
              </button>
            </div>
          </div>

        </div>

      </main>

      <footer className="bg-slate-950 text-white text-xs py-4 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-slate-500 text-[11px]">
            DOWLET1 Administrative Oversight Console • Made for SIH Prototype
          </p>
          <span className="text-[10px] text-emerald-400 font-mono">
            Gateway Status: Healthy (100%)
          </span>
        </div>
      </footer>
    </div>
  );
}

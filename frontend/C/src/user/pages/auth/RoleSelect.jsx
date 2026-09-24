import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Landmark, ShieldAlert, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import AuthResponsiveContainer from '../../components/AuthResponsiveContainer';
import { setCurrentRole } from '../../../utils/demoState';

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleSelectRole = (role, path) => {
    setCurrentRole(role);
    navigate(path);
  };

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen Portal',
      hindi: 'नागरिक सेवा पोर्टल',
      desc: 'Access 1,200+ central & state welfare schemes, certificates, digital document wallet, and AI assistance.',
      icon: User,
      color: 'text-orange-300',
      bg: 'bg-orange-500/15',
      border: 'border-orange-500/30',
      badge: 'Public Access',
      badgeColor: 'bg-orange-500/20 text-orange-200 border-orange-500/30',
      features: ['Aadhaar e-KYC & DigiLocker', 'AI Scheme Recommendations', 'Pre-verified Autofill'],
      actionText: 'Citizen Login / Register',
      targetPath: '/login'
    },
    {
      id: 'officer',
      title: 'Government Officer Portal',
      hindi: 'सरकारी अधिकारी सत्यापन',
      desc: 'Verify citizen applications, inspect uploaded proofs, request clarifications, and issue digital certificates.',
      icon: Landmark,
      color: 'text-sky-300',
      bg: 'bg-sky-500/15',
      border: 'border-sky-500/30',
      badge: 'Authorized Dept. Staff',
      badgeColor: 'bg-sky-500/20 text-sky-200 border-sky-500/30',
      features: ['Multi-Department Review', 'Digital Certificate Issuance', 'Action Required Flags'],
      actionText: 'Officer Secure Login',
      targetPath: '/officer-login'
    },
    {
      id: 'admin',
      title: 'System Administration',
      hindi: 'प्रशासनिक व निगरानी कंसोल',
      desc: 'Platform telemetry, scheme quota management, national API bridge analytics, and audit inspection.',
      icon: ShieldAlert,
      color: 'text-emerald-300',
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/30',
      badge: 'SuperAdmin / System Auditor',
      badgeColor: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
      features: ['Scheme Quota Health', 'Mesh Latency & API Uptime', 'Security & Access Logs'],
      actionText: 'Admin Command Console',
      targetPath: '/admin-login'
    }
  ];

  return (
    <AuthResponsiveContainer
      title="Select Your Portal Role"
      subtitle="Choose your authorization level to access citizen services or departmental portals."
      showBackButton={true}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4 mb-6">
        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.id}
              onClick={() => handleSelectRole(r.id, r.targetPath)}
              className="p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/12 border border-white/15 hover:border-white/35 transition-all cursor-pointer group shadow-lg text-left"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl ${r.bg} ${r.border} border flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform`}>
                  <Icon size={24} className={r.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-white text-sm sm:text-base group-hover:text-amber-200 transition-colors">
                        {r.title}
                      </h3>
                      <span className="text-[10px] text-white/50 font-medium hidden sm:inline">
                        ({r.hindi})
                      </span>
                    </div>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${r.badgeColor}`}>
                      {r.badge}
                    </span>
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed mb-3">
                    {r.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {r.features.map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[10px] font-medium text-white/80 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                        <CheckCircle2 size={10} className="text-emerald-400" />
                        <span>{f}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1 transition-colors">
                      {r.actionText} <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <ChevronRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <p className="text-[11px] text-white/60">
          Smart India Hackathon 2024-2025 • Role-Based Unified Architecture
        </p>
      </div>
    </AuthResponsiveContainer>
  );
}

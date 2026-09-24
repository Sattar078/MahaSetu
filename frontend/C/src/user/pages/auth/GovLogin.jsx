import { useNavigate } from 'react-router-dom';
import { Fingerprint, ShieldCheck, ScanLine, ArrowRight } from 'lucide-react';
import AuthResponsiveContainer from '../../components/AuthResponsiveContainer';

const methods = [
  { 
    id: 'aadhaar', 
    label: 'Aadhaar e-KYC', 
    description: 'Instant OTP verification directly linked to UIDAI registry', 
    icon: Fingerprint, 
    color: 'text-orange-300', 
    bg: 'bg-orange-500/15', 
    border: 'border-orange-500/30' 
  },
  { 
    id: 'digilocker', 
    label: 'DigiLocker Digital Wallet', 
    description: 'Pull verified certificates & credentials from DigiLocker', 
    icon: ShieldCheck, 
    color: 'text-sky-300', 
    bg: 'bg-sky-500/15', 
    border: 'border-sky-500/30' 
  },
  { 
    id: 'eauth', 
    label: 'National e-Authentication (MeriPehchan)', 
    description: 'Single sign-on for all central & state government services', 
    icon: ScanLine, 
    color: 'text-emerald-300', 
    bg: 'bg-emerald-500/15', 
    border: 'border-emerald-500/30' 
  },
];

export default function GovLogin() {
  const navigate = useNavigate();

  return (
    <AuthResponsiveContainer
      title="Connect Government Identity"
      subtitle="Use your pre-verified national credentials for passwordless, secure access."
      showBackButton={true}
      maxWidth="max-w-md"
    >
      <div className="space-y-3.5 mb-6">
        {methods.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => navigate('/home')}
              className="w-full flex items-center gap-4 p-4 border border-white/15 bg-white/5 rounded-2xl hover:bg-white/15 hover:border-white/35 transition-all group text-left shadow-lg active:scale-[0.98]"
            >
              <div className={`w-12 h-12 rounded-xl ${m.bg} ${m.border} border flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform`}>
                <Icon size={24} className={m.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors flex items-center justify-between">
                  <span>{m.label}</span>
                  <ArrowRight size={14} className="text-white/40 group-hover:text-white transition-colors" />
                </p>
                <p className="text-[11px] text-white/60 mt-0.5 leading-snug">{m.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <button 
          onClick={() => navigate('/home')} 
          className="w-full text-center text-xs font-semibold text-white/60 hover:text-white transition-colors py-2.5 rounded-xl hover:bg-white/5"
        >
          Skip for Now & Explore Portal
        </button>
      </div>
    </AuthResponsiveContainer>
  );
}

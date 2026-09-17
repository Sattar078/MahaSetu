import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/Navigation';
import { Fingerprint, ShieldCheck, ScanLine } from 'lucide-react';

const methods = [
  { id: 'aadhaar', label: 'Aadhaar (Prototype)', description: 'Verify using your Aadhaar number', icon: Fingerprint, color: 'bg-orange-50 text-orange-600' },
  { id: 'digilocker', label: 'DigiLocker (Prototype)', description: 'Use your DigiLocker account', icon: ShieldCheck, color: 'bg-blue-50 text-[#0d599f]' },
  { id: 'eauth', label: 'e-Authentication (Prototype)', description: 'Government e-Auth service', icon: ScanLine, color: 'bg-emerald-50 text-emerald-600' },
];

export default function GovLogin() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="" onBack={() => navigate('/login')} />

      <div className="flex-1 px-6 pt-6 flex flex-col">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Login with Government Identity</h2>
        <p className="text-xs text-slate-500 mb-8">Use your registered government identity for secure access.</p>

        <div className="space-y-3">
          {methods.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => navigate('/profile-setup')}
                className="w-full flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-[#0d599f] hover:bg-blue-50/30 transition group text-left"
              >
                <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center shrink-0`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-[#0d599f] transition">{m.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{m.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-auto pb-8">
          <button onClick={() => navigate('/login')} className="w-full text-center text-sm font-semibold text-slate-400 hover:text-slate-600 transition py-3">
            Cancel
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 h-1 bg-[#e07520]" />
        <div className="flex-1 h-1 bg-white" />
        <div className="flex-1 h-1 bg-[#047857]" />
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { Fingerprint, ShieldCheck, ScanLine, ChevronLeft } from 'lucide-react';

const methods = [
  { id: 'aadhaar', label: 'Aadhaar', description: 'Verify using your Aadhaar number', icon: Fingerprint, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { id: 'digilocker', label: 'DigiLocker', description: 'Use your DigiLocker account', icon: ShieldCheck, color: 'text-[#0d599f]', bg: 'bg-[#0d599f]/20', border: 'border-[#0d599f]/30' },
  { id: 'eauth', label: 'e-Authentication', description: 'Government e-Auth service', icon: ScanLine, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
];

export default function GovLogin() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col min-h-[100dvh] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('https://i.pinimg.com/736x/d1/eb/1a/d1eb1aed415bd2745a4e6c1a8aba837f.jpg')` }}
    >
      {/* ── Dark scrim for legibility ── */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        
        {/* Header bar */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-white/10">
          <button onClick={() => navigate(-1)} className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-xl drop-shadow-md">🇮🇳</span>
            <span className="text-lg font-extrabold text-white tracking-widest uppercase drop-shadow-md">DOWLET1</span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="flex-1 px-6 py-12 flex flex-col justify-center items-center">
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl w-full max-w-sm">
            
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-white mb-2 drop-shadow-md">Connect Identity</h2>
              <p className="text-xs text-white/70 leading-relaxed">Use your registered government identity for secure access to services.</p>
            </div>

            <div className="space-y-4">
              {methods.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => navigate('/home')}
                    className="w-full flex items-center gap-4 p-4 border border-white/10 bg-white/5 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all group text-left shadow-lg active:scale-[0.98]"
                  >
                    <div className={`w-12 h-12 rounded-xl ${m.bg} ${m.border} border flex items-center justify-center shrink-0 shadow-inner`}>
                      <Icon size={22} className={m.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">{m.label}</p>
                      <p className="text-[10px] text-white/60 mt-0.5">{m.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <button 
                onClick={() => navigate('/home')} 
                className="w-full text-center text-xs font-semibold text-white/50 hover:text-white transition-colors py-3"
              >
                Skip for Now
              </button>
            </div>
            
          </div>
        </div>
      </div>

      {/* ── Tricolor bar ── */}
      <div className="absolute bottom-0 left-0 w-full flex z-20 pointer-events-none">
        <div className="flex-1 h-1 bg-[#e07520]" />
        <div className="flex-1 h-1 bg-white" />
        <div className="flex-1 h-1 bg-[#047857]" />
      </div>
    </div>
  );
}

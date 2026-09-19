import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 2.5 seconds
    const t = setTimeout(() => {
      navigate('/profile-setup');
    }, 2500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div
      className="flex flex-col min-h-[100dvh] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('https://i.pinimg.com/736x/d1/eb/1a/d1eb1aed415bd2745a4e6c1a8aba837f.jpg')` }}
    >
      {/* ── Dark scrim for legibility ── */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col min-h-[100dvh] justify-center items-center px-6 py-12">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl w-full max-w-sm text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
          
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border-4 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 size={48} className="text-emerald-400" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md tracking-wide">Verified!</h2>
          <p className="text-sm text-white/80 mb-8 leading-relaxed px-4">
            Your identity has been successfully authenticated.
          </p>

          <button 
            onClick={() => navigate('/profile-setup')}
            className="w-full py-4 px-4 bg-white hover:bg-slate-50 text-[#0d599f] font-extrabold text-sm rounded-xl transition active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
          >
            Continue to Profile <ArrowRight size={18} />
          </button>
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

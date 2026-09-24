import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import AuthResponsiveContainer from '../../components/AuthResponsiveContainer';

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 3 seconds
    const t = setTimeout(() => {
      navigate('/profile-setup');
    }, 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <AuthResponsiveContainer
      title="Identity Authenticated!"
      subtitle="Your credentials have been securely verified against national databases."
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border-4 border-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.35)] animate-bounce">
          <CheckCircle2 size={48} className="text-emerald-400" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">
          Authentication Successful
        </h3>
        <p className="text-xs text-white/80 mb-6 leading-relaxed max-w-xs">
          Your digital citizen profile is now linked. You can complete your demographic details or proceed to services.
        </p>

        <button 
          onClick={() => navigate('/profile-setup')}
          className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-[#0d599f] font-extrabold text-sm rounded-xl transition active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
        >
          <span>Continue to Profile Setup</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </AuthResponsiveContainer>
  );
}

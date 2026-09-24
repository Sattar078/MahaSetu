import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Fingerprint, Cloud, ShieldCheck } from 'lucide-react';
import AuthResponsiveContainer from '../../components/AuthResponsiveContainer';

export default function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (!identifier) {
      setError('Please enter your mobile number or email');
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isMobile = /^\d{10}$/.test(identifier);

    if (!isEmail && !isMobile) {
      setError('Please enter a valid 10-digit mobile number or email');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password === 'wrongpassword') {
      setError('Invalid credentials. Please try again.');
      return;
    }

    navigate('/home');
  };

  return (
    <AuthResponsiveContainer
      title="Welcome Back!"
      subtitle="Sign in to access your unified citizen dashboard, documents, and schemes."
      maxWidth="max-w-md"
    >
      {error && (
        <div className="mb-5 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-xs font-medium text-center shadow-sm">
          {error}
        </div>
      )}

      <div className="mb-4 relative">
        <label className="text-xs font-semibold text-white/90 block mb-2">Mobile Number / Email ID</label>
        <div className="relative">
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter mobile number or email"
            className="w-full bg-white/10 border border-white/20 rounded-xl p-3.5 pl-11 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
          />
          <User size={16} className="absolute left-4 top-3.5 text-white/60 pointer-events-none" />
        </div>
      </div>

      <div className="mb-4 relative">
        <label className="text-xs font-semibold text-white/90 block mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full bg-white/10 border border-white/20 rounded-xl p-3.5 pl-11 pr-11 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
          />
          <Lock size={16} className="absolute left-4 top-3.5 text-white/60 pointer-events-none" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-white/60 hover:text-white transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative flex items-center">
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="peer appearance-none w-4 h-4 border border-white/40 rounded bg-white/10 checked:bg-white checked:border-white transition-all cursor-pointer"
            />
            <svg className="absolute w-3 h-3 left-0.5 top-0.5 text-[#0d599f] opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xs text-white/80 font-medium group-hover:text-white transition-colors">Remember me</span>
        </label>
        
        <button 
          type="button" 
          onClick={() => navigate('/otp-verify')} 
          className="text-xs font-semibold text-white hover:underline transition-all"
        >
          Forgot Password?
        </button>
      </div>

      <button 
        onClick={handleLogin}
        className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-[#0d599f] font-bold text-sm rounded-xl transition active:scale-[0.98] shadow-lg mb-2"
      >
        LOGIN
      </button>

      {/* ── OR ── */}
      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-white/20" />
          <span className="px-3 text-[10px] text-white/50 font-bold uppercase tracking-widest">OR CONNECT WITH</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Prototype e-Auth methods */}
        <div className="flex items-center justify-center gap-5 w-full mt-2">
          <button onClick={() => navigate('/gov-login')} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-md group-active:scale-95">
              <Fingerprint size={22} className="text-white" />
            </div>
            <span className="text-[10px] text-white/70 font-medium group-hover:text-white transition-colors">Aadhaar</span>
          </button>

          <div className="w-px h-10 bg-white/20" />

          <button onClick={() => navigate('/gov-login')} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-md group-active:scale-95">
              <Cloud size={22} className="text-white" />
            </div>
            <span className="text-[10px] text-white/70 font-medium group-hover:text-white transition-colors">DigiLocker</span>
          </button>

          <div className="w-px h-10 bg-white/20" />

          <button onClick={() => navigate('/gov-login')} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-md group-active:scale-95">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <span className="text-[10px] text-white/70 font-medium group-hover:text-white transition-colors">e-Auth</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-white/70">
          New user? <button onClick={() => navigate('/signup')} className="font-bold text-white hover:underline transition-all">Create account</button>
        </p>
      </div>
    </AuthResponsiveContainer>
  );
}

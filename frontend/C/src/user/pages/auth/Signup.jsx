import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, Eye, EyeOff, Fingerprint, Cloud } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [consentData, setConsentData] = useState(false);
  
  const [error, setError] = useState('');

  const handleSignup = () => {
    setError('');

    if (!fullName || !mobile || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!agreeTerms || !consentData) {
      setError('You must agree to the terms and consent to use of information');
      return;
    }

    // Success navigation
    navigate('/otp-verify');
  };

  return (
    <div
      className="flex flex-col h-[100dvh] bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url('https://i.pinimg.com/736x/d1/eb/1a/d1eb1aed415bd2745a4e6c1a8aba837f.jpg')` }}
    >
      {/* ── Dark scrim for legibility ── */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        <div className="px-6 py-8 flex-1 flex flex-col justify-center min-h-max">
          
          {/* Header Section */}
          <div className="flex flex-col items-center mb-6 mt-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl drop-shadow-md">🇮🇳</span>
              <h1 className="text-2xl font-extrabold text-white tracking-widest drop-shadow-md uppercase">
                DOWLET1
              </h1>
            </div>
            <p className="text-white/80 text-sm font-medium drop-shadow text-center mb-5 leading-snug">
              One Platform for Unified<br/>Government Services
            </p>
            <h2 className="text-xl font-bold text-white drop-shadow-md mb-2">
              Create Your Account
            </h2>
            <p className="text-white/70 text-xs font-medium drop-shadow text-center">
              Access government services from one secure platform.
            </p>
          </div>

          {/* ── Glassmorphism Form Card ── */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl mb-8">
            
            {error && (
              <div className="mb-5 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-xs font-medium text-center shadow-sm">
                {error}
              </div>
            )}

            <div className="space-y-4 mb-6">
              {/* Full Name */}
              <div>
                <label className="text-[11px] font-semibold text-white/90 block mb-1.5">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
                  />
                  <User size={16} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="text-[11px] font-semibold text-white/90 block mb-1.5">Mobile Number *</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 top-3.5 flex items-center gap-1.5 z-10 pointer-events-none text-white/80 text-sm font-medium">
                    <Phone size={16} className="text-white/60" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-[72px] text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="text-[11px] font-semibold text-white/90 block mb-1.5">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
                  />
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[11px] font-semibold text-white/90 block mb-1.5">Create Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 pr-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
                  />
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-[11px] font-semibold text-white/90 block mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 pr-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
                  />
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3.5 text-white/60 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-0.5 shrink-0">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="peer appearance-none w-4 h-4 border border-white/40 rounded bg-white/10 checked:bg-white checked:border-white transition-all cursor-pointer"
                  />
                  <svg className="absolute w-3 h-3 left-0.5 top-0.5 text-[#0d599f] opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[11px] text-white/80 font-medium leading-snug group-hover:text-white transition-colors">
                  I agree to Terms & Privacy Policy
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-0.5 shrink-0">
                  <input 
                    type="checkbox" 
                    checked={consentData}
                    onChange={(e) => setConsentData(e.target.checked)}
                    className="peer appearance-none w-4 h-4 border border-white/40 rounded bg-white/10 checked:bg-white checked:border-white transition-all cursor-pointer"
                  />
                  <svg className="absolute w-3 h-3 left-0.5 top-0.5 text-[#0d599f] opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[11px] text-white/80 font-medium leading-snug group-hover:text-white transition-colors">
                  I consent to secure use of my information for requested government services.
                </span>
              </label>
            </div>

            <button 
              onClick={handleSignup}
              className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-[#0d599f] font-bold text-sm rounded-xl transition active:scale-[0.98] shadow-lg mb-2"
            >
              CREATE ACCOUNT
            </button>

            {/* ── OR ── */}
            <div className="flex flex-col items-center mt-6">
              <div className="flex items-center w-full mb-5">
                <div className="flex-1 h-px bg-white/20" />
                <span className="px-3 text-[10px] text-white/50 font-bold uppercase tracking-widest">OR</span>
                <div className="flex-1 h-px bg-white/20" />
              </div>

              <p className="text-[11px] font-semibold text-white/70 mb-4 tracking-wide uppercase">
                Continue with Government Identity
              </p>

              <div className="w-full space-y-3">
                <button onClick={() => navigate('/gov-login')} className="w-full py-3 px-4 border border-white/30 hover:bg-white/10 text-white font-semibold text-sm rounded-xl transition active:scale-[0.98] flex items-center justify-center gap-2">
                  <Fingerprint size={18} className="text-white/90" />
                  Continue with Aadhaar
                </button>
                <button onClick={() => navigate('/gov-login')} className="w-full py-3 px-4 border border-white/30 hover:bg-white/10 text-white font-semibold text-sm rounded-xl transition active:scale-[0.98] flex items-center justify-center gap-2">
                  <Cloud size={18} className="text-white/90" />
                  Continue with DigiLocker
                </button>
              </div>
            </div>
          </div>

          <div className="text-center pb-6">
            <p className="text-xs text-white/70">
              Already have an account? <button onClick={() => navigate('/login')} className="font-bold text-white hover:underline transition-all">Sign In</button>
            </p>
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

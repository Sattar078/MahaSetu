import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, Eye, EyeOff, Fingerprint, Cloud } from 'lucide-react';
import AuthResponsiveContainer from '../../components/AuthResponsiveContainer';

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
    <AuthResponsiveContainer
      title="Create Your Citizen Account"
      subtitle="Register once to access 1,200+ government schemes and certificates with verified ease."
      maxWidth="max-w-lg"
    >
      {error && (
        <div className="mb-5 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-xs font-medium text-center shadow-sm">
          {error}
        </div>
      )}

      <div className="space-y-3.5 mb-5">
        {/* Full Name */}
        <div>
          <label className="text-[11px] font-semibold text-white/90 block mb-1">Full Name *</label>
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

        {/* Mobile Number & Email (2 columns on tablet/desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="text-[11px] font-semibold text-white/90 block mb-1">Mobile Number *</label>
            <div className="relative flex items-center">
              <div className="absolute left-3 top-3 flex items-center gap-1 z-10 pointer-events-none text-white/80 text-xs font-medium">
                <Phone size={14} className="text-white/60" />
                <span>+91</span>
              </div>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit number"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-[64px] text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-white/90 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@domain.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Passwords (2 columns on tablet/desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="text-[11px] font-semibold text-white/90 block mb-1">Create Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 pr-9 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
              />
              <Lock size={15} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-white/60 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-white/90 block mb-1">Confirm Password *</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 pr-9 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
              />
              <Lock size={15} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-white/60 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-2.5 mb-5">
        <label className="flex items-start gap-2.5 cursor-pointer group">
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
            I agree to the Citizen Terms & Privacy Policy
          </span>
        </label>

        <label className="flex items-start gap-2.5 cursor-pointer group">
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
            I consent to secure storage & reuse of my information across eligible services.
          </span>
        </label>
      </div>

      <button 
        onClick={handleSignup}
        className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-[#0d599f] font-bold text-sm rounded-xl transition active:scale-[0.98] shadow-lg mb-4"
      >
        CREATE CITIZEN ACCOUNT
      </button>

      {/* Alternative Government e-Auth */}
      <div className="flex items-center w-full my-3">
        <div className="flex-1 h-px bg-white/20" />
        <span className="px-3 text-[10px] text-white/50 font-bold uppercase tracking-widest">OR FAST REGISTER WITH</span>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button 
          onClick={() => navigate('/gov-login')} 
          className="py-2.5 px-3 border border-white/20 bg-white/5 hover:bg-white/15 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2"
        >
          <Fingerprint size={16} className="text-orange-300" />
          <span>Aadhaar e-KYC</span>
        </button>
        <button 
          onClick={() => navigate('/gov-login')} 
          className="py-2.5 px-3 border border-white/20 bg-white/5 hover:bg-white/15 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2"
        >
          <Cloud size={16} className="text-sky-300" />
          <span>DigiLocker</span>
        </button>
      </div>

      <div className="text-center pt-2">
        <p className="text-xs text-white/70">
          Already registered? <button onClick={() => navigate('/login')} className="font-bold text-white hover:underline transition-all">Sign In</button>
        </p>
      </div>
    </AuthResponsiveContainer>
  );
}

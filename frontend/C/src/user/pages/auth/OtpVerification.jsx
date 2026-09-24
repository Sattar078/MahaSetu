import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import AuthResponsiveContainer from '../../components/AuthResponsiveContainer';

export default function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every((d) => d !== '');

  const handleVerify = () => {
    if (isComplete) navigate('/auth-success');
  };

  return (
    <AuthResponsiveContainer
      title="Verify Mobile Number"
      subtitle="Enter the 6-digit security code sent to your registered mobile."
      showBackButton={true}
      maxWidth="max-w-md"
    >
      <div className="text-center mb-6">
        <p className="text-xs text-white/70 mb-1">One-Time Password sent to</p>
        <p className="text-sm font-bold text-white tracking-widest">+91 98765 43210</p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-between gap-2 sm:gap-3 mb-6">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-11 sm:w-12 h-14 text-center text-xl font-bold rounded-xl outline-none transition-all shadow-inner ${
              digit ? 'bg-white/30 border border-white/60 text-white' : 'bg-white/10 border border-white/20 text-white/50'
            } focus:border-white focus:bg-white/25 focus:ring-2 focus:ring-white/20`}
          />
        ))}
      </div>

      {/* Resend timer */}
      <div className="text-center mb-6">
        {timer > 0 ? (
          <p className="text-xs text-white/60">
            Resend OTP in <span className="font-bold text-white">00:{String(timer).padStart(2, '0')}</span>
          </p>
        ) : (
          <button 
            type="button"
            onClick={() => setTimer(30)} 
            className="text-xs font-bold text-white hover:underline transition-all"
          >
            Resend OTP Code
          </button>
        )}
      </div>

      <button 
        disabled={!isComplete}
        onClick={handleVerify}
        className={`w-full py-3.5 px-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg mb-4 ${
          isComplete 
            ? 'bg-white hover:bg-slate-50 text-[#0d599f] active:scale-[0.98]' 
            : 'bg-white/25 text-white/40 cursor-not-allowed'
        }`}
      >
        <span>VERIFY & CONTINUE</span>
        <ArrowRight size={16} />
      </button>

      <div className="text-center pt-2">
        <p className="text-[11px] text-white/60 flex items-center justify-center gap-1">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Encrypted SMS verification via National Gateway</span>
        </p>
      </div>
    </AuthResponsiveContainer>
  );
}

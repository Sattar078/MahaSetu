import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ArrowRight } from 'lucide-react';

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
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl w-full max-w-sm text-center">
            
            <h2 className="text-xl font-bold text-white mb-2 drop-shadow-md">Verify Mobile Number</h2>
            <p className="text-xs text-white/70 mb-1">We've sent a 6-digit OTP to</p>
            <p className="text-sm font-semibold text-white mb-8 tracking-wide">+91 98765 43210</p>

            {/* OTP Inputs */}
            <div className="flex justify-between gap-2 mb-8">
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
                  className={`w-11 h-14 text-center text-xl font-bold rounded-xl outline-none transition-all shadow-inner ${
                    digit ? 'bg-white/30 border border-white/50 text-white' : 'bg-white/10 border border-white/20 text-white/50'
                  } focus:border-white focus:bg-white/20`}
                />
              ))}
            </div>

            {/* Resend timer */}
            <div className="text-center mb-8">
              {timer > 0 ? (
                <p className="text-xs text-white/60">
                  Resend OTP in <span className="font-bold text-white">00:{String(timer).padStart(2, '0')}</span>
                </p>
              ) : (
                <button onClick={() => setTimer(30)} className="text-xs font-bold text-white hover:underline transition-all">
                  Resend OTP
                </button>
              )}
            </div>

            <button 
              disabled={!isComplete}
              onClick={handleVerify}
              className={`w-full py-4 px-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                isComplete 
                  ? 'bg-white hover:bg-slate-50 text-[#0d599f] active:scale-[0.98]' 
                  : 'bg-white/30 text-white/50 cursor-not-allowed'
              }`}
            >
              VERIFY <ArrowRight size={16} />
            </button>
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

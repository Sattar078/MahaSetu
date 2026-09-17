import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { AppHeader } from '../components/Navigation';
import { PrimaryButton } from '../components/Buttons';

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

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="" onBack={() => navigate('/login')} />

      <div className="flex-1 px-6 pt-8 flex flex-col">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Verify Your Mobile Number</h2>
        <p className="text-xs text-slate-500 mb-1">We've sent a 6-digit OTP to</p>
        <p className="text-sm font-semibold text-slate-800 mb-8">+91 98765 43210</p>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mb-6">
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
              className={`w-11 h-13 text-center text-lg font-bold border-2 rounded-xl outline-none transition-colors ${
                digit ? 'border-[#0d599f] bg-blue-50/50' : 'border-slate-200'
              } focus:border-[#0d599f]`}
            />
          ))}
        </div>

        {/* Resend timer */}
        <div className="text-center mb-8">
          {timer > 0 ? (
            <p className="text-xs text-slate-400">
              Resend OTP in <span className="font-semibold text-[#0d599f]">00:{String(timer).padStart(2, '0')}</span>
            </p>
          ) : (
            <button onClick={() => setTimer(30)} className="text-xs font-semibold text-[#0d599f]">
              Resend OTP
            </button>
          )}
        </div>

        <div className="mt-auto pb-8">
          <PrimaryButton disabled={!isComplete} onClick={() => navigate('/profile-setup')}>
            Verify
          </PrimaryButton>
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

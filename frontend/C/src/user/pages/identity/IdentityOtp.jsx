import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { Lock } from 'lucide-react';

export default function IdentityOtp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method') || 'aadhaar';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      navigate('/identity/success');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Verification" onBack={() => navigate(-1)} />

      <div className="px-5 pt-10 pb-6 flex-1 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-6">
          <Lock size={32} />
        </div>
        
        <h2 className="text-xl font-bold text-slate-900 mb-2">Mock Verification</h2>
        <p className="text-sm text-slate-500 text-center mb-10 px-4">
          Enter the OTP sent to your registered mobile number for {method.toUpperCase()}.
        </p>

        <div className="flex gap-2 justify-center w-full mb-10">
          {otp.map((v, i) => (
            <input 
              key={i}
              type="text"
              maxLength="1"
              value={v}
              onChange={(e) => {
                const newOtp = [...otp];
                newOtp[i] = e.target.value;
                setOtp(newOtp);
                if (e.target.value && e.target.nextSibling) {
                  e.target.nextSibling.focus();
                }
              }}
              className="w-12 h-14 text-center text-xl font-bold border-2 border-slate-200 rounded-xl focus:border-[#000080] focus:ring-0 transition-colors"
            />
          ))}
        </div>

        <div className="mt-auto w-full pb-4">
          <PrimaryButton onClick={handleVerify} className="w-full" disabled={verifying}>
            {verifying ? 'Verifying...' : 'Verify OTP'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

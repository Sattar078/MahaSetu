import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/Buttons';
import { ShieldCheck } from 'lucide-react';
import { demoAPI } from '../../../utils/demoState';

export default function IdentitySuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Update mock state to verified
    const user = demoAPI.getUser();
    if (user) {
      demoAPI.updateUser({ ...user, isIdentityVerified: true });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#138808] text-white">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 shadow-inner relative">
          <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <ShieldCheck size={48} className="text-white" />
        </div>

        <h1 className="text-3xl font-extrabold mb-3 text-center tracking-tight">Identity Verified ✓</h1>
        <p className="text-center text-green-100 mb-10 text-sm max-w-[250px] leading-relaxed">
          Your government identity has been securely linked to DOWLET1.
        </p>

        <PrimaryButton 
          onClick={() => navigate('/profile')} 
          className="w-full bg-white text-[#138808] hover:bg-slate-50 border-none shadow-lg py-4"
        >
          View Verified Information
        </PrimaryButton>
      </div>
    </div>
  );
}

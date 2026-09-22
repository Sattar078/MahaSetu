import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { PrimaryButton } from '../../components/Buttons';
import { ShieldCheck, ShieldAlert, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { demoAPI } from '../../../utils/demoState';

export default function GovernmentIdentity() {
  const navigate = useNavigate();
  // Using demo state or simple local state to toggle modes for the demo
  const [isConnected, setIsConnected] = useState(demoAPI.getUser()?.isIdentityVerified || false);

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-full pb-20">
        <div className="px-5 pt-6 pb-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Lock size={16} className="text-[#000080]" />
            Your Identity
          </h2>
        </div>

        <div className="px-5 pb-6 space-y-6">
          
          {isConnected ? (
            // VERIFIED MODE
            <>
              <div className="bg-gradient-to-br from-[#138808] to-green-700 rounded-2xl p-5 shadow-md text-white relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-white/10">
                  <ShieldCheck size={100} />
                </div>
                
                <h3 className="text-lg font-bold mb-1 relative z-10">Identity Verification</h3>
                <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-4 backdrop-blur-sm relative z-10">
                  <span>Status:</span> <CheckCircle2 size={12} /> Verified
                </div>
                <p className="text-sm text-green-50 font-medium relative z-10">
                  Identity securely linked and verified by Government Databases.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Connected Services</h3>
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#138808]" />
                    <span className="text-sm font-medium text-slate-700">Identity Verification</span>
                  </div>
                  <div className="w-full h-[1px] bg-slate-100"></div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#138808]" />
                    <span className="text-sm font-medium text-slate-700">Profile Verification</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <PrimaryButton className="w-full" onClick={() => navigate('/profile')}>
                  Manage Identity
                </PrimaryButton>
              </div>
            </>
          ) : (
            // NOT CONNECTED MODE
            <>
              <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500">
                  <ShieldAlert size={32} />
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1">Not Connected</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Connect your government identity to simplify eligible services and skip manual document uploads.
                </p>
                
                <PrimaryButton onClick={() => navigate('/identity/connect')} className="w-full">
                  Connect Identity
                </PrimaryButton>
              </div>
            </>
          )}

        </div>
      </div>
    </MainLayout>
  );
}

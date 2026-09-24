import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { ChevronRight, Fingerprint, FileBadge, LockKeyhole } from 'lucide-react';

export default function ConnectIdentity() {
  const navigate = useNavigate();
  
  const methods = [
    { id: 'aadhaar', name: 'Aadhaar Card', icon: Fingerprint, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'digilocker', name: 'DigiLocker', icon: FileBadge, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'eauth', name: 'e-Authentication', icon: LockKeyhole, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      <AppHeader title="Connect Identity" onBack={() => navigate('/identity')} />

      <div className="px-5 pt-8 pb-6 flex-1 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Select Method</h2>
          <p className="text-sm text-slate-500">Choose how you want to link your government identity securely.</p>
        </div>

        <div className="space-y-4">
          {methods.map((method) => (
            <button 
              key={method.id}
              onClick={() => navigate(`/identity/otp?method=${method.id}`)}
              className="w-full bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-[#000080] hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.bg} ${method.color}`}>
                  <method.icon size={24} />
                </div>
                <span className="font-bold text-slate-800">{method.name}</span>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

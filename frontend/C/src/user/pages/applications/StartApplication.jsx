import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { demoAPI } from '../../../utils/demoState';

export default function StartApplication() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  
  useEffect(() => {
    demoAPI.init();
    const s = demoAPI.getService(serviceId) || demoAPI.getService('scholarship');
    setService(s);
  }, [serviceId]);

  if (!service) return null;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      <AppHeader title="Start Application" onBack={() => navigate(-1)} />

      <div className="px-5 pt-6 pb-8 flex-1 flex flex-col">
        <div className="mb-6">
          <p className="text-[10px] font-bold text-[#0d599f] uppercase tracking-wider mb-1">Service</p>
          <h2 className="text-xl font-bold text-slate-900">{service.name}</h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
          <p className="text-xs text-slate-700 leading-relaxed mb-4">
            DOWLET1 can reuse eligible information from your verified profile.
          </p>
          
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Information Available</h3>
          <div className="space-y-2 mb-6">
            {['Name', 'Date of Birth', 'Address', 'Mobile', 'Identity'].map((info, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-xs font-semibold text-slate-700">{info}</span>
              </div>
            ))}
          </div>

          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Documents</h3>
          <div className="space-y-3">
            {service.requiredDocuments.map((doc, i) => {
              const available = ['Identity Proof', 'Address Proof', 'Marksheet'].includes(doc);
              return (
                <div key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {available ? (
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  ) : (
                    <AlertCircle size={14} className="text-amber-500" />
                  )}
                  <span className="text-xs font-semibold text-slate-700">{doc}</span>
                  {available ? (
                    <span className="ml-auto text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Available</span>
                  ) : (
                    <span className="ml-auto text-[9px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md">Missing</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-auto space-y-3">
          <PrimaryButton onClick={() => navigate(`/apply/${service.id}?reuse=true`)} className="w-full bg-[#138808] hover:bg-green-700 border-none shadow-md">
            Use Verified Information
          </PrimaryButton>
          <PrimaryButton onClick={() => navigate(`/apply/${service.id}`)} className="w-full bg-slate-800 hover:bg-slate-900 border-none shadow-md">
            Continue Manually
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

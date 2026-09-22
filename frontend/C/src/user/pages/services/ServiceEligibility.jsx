import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { demoAPI } from '../../../utils/demoState';

export default function ServiceEligibility() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [checking, setChecking] = useState(true);
  const [steps, setSteps] = useState([
    { text: 'Checking profile...', done: false },
    { text: 'Checking service requirements...', done: false },
    { text: 'Checking available information...', done: false },
  ]);

  useEffect(() => {
    demoAPI.init();
    const s = demoAPI.getService(id) || demoAPI.getService('scholarship');
    setService(s);

    // Simulate checking sequence
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < 3) {
        setSteps(prev => {
          const newSteps = [...prev];
          newSteps[currentStep].done = true;
          return newSteps;
        });
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => setChecking(false), 500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [id]);

  if (!service) return null;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Check Eligibility" onBack={() => navigate(-1)} />

      <div className="px-5 pt-8 pb-6 flex-1 flex flex-col">
        {checking ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner relative">
              <Loader2 size={32} className="text-[#0d599f] animate-spin" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-6">Verifying Data</h2>
            <div className="space-y-4 w-full max-w-xs">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  {step.done ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <div className="w-[18px] h-[18px] border-2 border-slate-200 rounded-full" />
                  )}
                  <span className={`text-sm ${step.done ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="text-center mb-8 mt-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-[10px] font-bold text-[#0d599f] tracking-wider uppercase mb-2">Prototype Eligibility Check</h2>
              <p className="text-sm text-slate-600">You may continue to the application process.</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                <span className="text-xs font-semibold text-slate-700">Profile information available</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                <span className="text-xs font-semibold text-slate-700">State information available</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                <span className="text-xs font-semibold text-slate-700">Basic requirements identified</span>
              </div>
            </div>
            
            <div className="mt-auto space-y-3">
              <PrimaryButton onClick={() => navigate(`/apply/${service.id}/start`)} className="w-full">
                Continue to Apply
              </PrimaryButton>
              <button 
                onClick={() => navigate(`/service-details/${service.id}`)}
                className="w-full py-3.5 text-slate-500 font-bold text-xs"
              >
                Back to Service
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

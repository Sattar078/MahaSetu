import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Network, Server, FileCheck, CheckCircle2, FileText, ExternalLink, ArrowRight, Home } from 'lucide-react';
import { demoAPI } from '../../../utils/demoState';

export default function AIWorkflow() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [applicationResult, setApplicationResult] = useState(null);

  const steps = [
    { id: 1, text: "Validating application...", icon: FileCheck },
    { id: 2, text: "Preparing government service request...", icon: Server },
    { id: 3, text: "Transforming information into required format...", icon: FileText },
    { id: 4, text: `Connecting to ${formData?.department || 'Government'} API...`, icon: Network },
    { id: 5, text: "Submitting application...", icon: ExternalLink },
    { id: 6, text: "Receiving application response...", icon: CheckCircle2 }
  ];

  useEffect(() => {
    if (!formData) {
      navigate('/home');
      return;
    }

    // Run the mock workflow sequence
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setCurrentStep(step);
        step++;
      } else {
        clearInterval(interval);
        // Complete workflow
        setTimeout(() => {
          const result = demoAPI.submitApplication(formData.serviceId, formData);
          setApplicationResult(result);
        }, 800);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [formData, navigate]);

  if (!formData) return null;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50">
      
      {!applicationResult ? (
        // --- WORKFLOW VISUALIZER ---
        <div className="flex flex-col flex-1 items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-8 relative">
            <Network size={32} className="text-[#000080]" />
            <div className="absolute -top-2 -right-2 bg-[#FF9933] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
              MOCK
            </div>
          </div>
          
          <h2 className="font-bold text-slate-800 text-lg mb-2">Workflow Engine</h2>
          <p className="text-xs text-slate-500 font-medium bg-slate-200 px-3 py-1 rounded-full mb-8">
            DEMO / MOCK ENVIRONMENT
          </p>

          <div className="w-full max-w-sm space-y-4 text-left bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            {steps.map((s, index) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              const Icon = isCompleted ? CheckCircle2 : s.icon;
              
              return (
                <div key={s.id} className={`flex items-center gap-3 transition-opacity duration-500 ${isCompleted ? 'opacity-50' : isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isCompleted ? 'bg-green-100 text-green-600' : 
                    isActive ? 'bg-blue-100 text-[#000080]' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {isActive ? (
                      <div className="w-3 h-3 border-2 border-transparent border-t-[#000080] rounded-full animate-spin"></div>
                    ) : (
                      <Icon size={14} />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'text-[#000080]' : 'text-slate-600'}`}>
                    {s.text}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 flex flex-col items-center opacity-50">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2">Flow Diagram</p>
            <div className="flex flex-col items-center text-[#000080] text-[10px] font-bold">
              <span>DOWLET1 AI</span>
              <span className="my-1">↓</span>
              <span>Workflow Engine</span>
              <span className="my-1">↓</span>
              <span>API Gateway</span>
              <span className="my-1">↓</span>
              <span className="text-[#FF9933]">{formData.department} API (Mock)</span>
            </div>
          </div>
        </div>
      ) : (
        // --- SUCCESS SCREEN ---
        <div className="flex flex-col flex-1 p-5 pt-12 relative overflow-hidden">
          {/* Confetti / background flair */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-50 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5 text-[#138808] border-4 border-white shadow-sm">
              <CheckCircle2 size={40} />
            </div>
            
            <h1 className="font-extrabold text-slate-800 text-xl mb-2">Application Submitted Successfully</h1>
            <p className="text-sm text-slate-500 font-medium max-w-[250px] mb-8">
              Your application has been securely transmitted to the {formData.department}.
            </p>
            
            {/* Receipt Card */}
            <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-left mb-8 relative">
              
              {/* Fake tearing edge effect */}
              <div className="absolute -top-1.5 left-0 right-0 h-3 bg-repeat-x" style={{ backgroundImage: 'radial-gradient(circle at 50% 0, transparent 4px, white 5px)', backgroundSize: '12px 10px' }}></div>
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide mb-0.5">Application ID</p>
                  <p className="font-mono font-bold text-[#000080] text-lg">{applicationResult.id}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide mb-0.5">Service</p>
                  <p className="text-sm font-semibold text-slate-800">{applicationResult.serviceName}</p>
                </div>
                
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide mb-0.5">Department</p>
                  <p className="text-sm font-semibold text-slate-800">{applicationResult.department}</p>
                </div>
                
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide mb-0.5">Status</p>
                  <div className="inline-flex items-center gap-1.5 bg-[#FF9933]/10 text-[#FF9933] px-2.5 py-1 rounded-full text-xs font-bold border border-[#FF9933]/20">
                    <div className="w-1.5 h-1.5 bg-[#FF9933] rounded-full"></div>
                    {applicationResult.status}
                  </div>
                </div>
                
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide mb-0.5">Applicant</p>
                  <p className="text-sm font-semibold text-slate-800">{formData.fullName}</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="w-full space-y-3">
              <button 
                onClick={() => navigate(`/applications/${applicationResult.id}`)}
                className="w-full bg-[#000080] text-white py-3.5 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2"
              >
                Track Application <ArrowRight size={16} />
              </button>
              
              <button 
                onClick={() => navigate('/home')}
                className="w-full bg-white text-slate-700 border border-slate-200 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <Home size={16} /> Back to Home
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

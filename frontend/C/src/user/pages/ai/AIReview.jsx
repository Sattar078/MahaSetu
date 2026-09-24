import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileText, AlertCircle, ShieldCheck } from 'lucide-react';
import { demoAPI } from '../../../utils/demoState';

export default function AIReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceId = location.state?.serviceId || 'income_certificate';
  const service = demoAPI.getService(serviceId);
  const user = demoAPI.getUser();
  const docs = demoAPI.getDocuments();

  const [isValidating, setIsValidating] = useState(false);
  const [validationSteps, setValidationSteps] = useState({
    fields: false,
    docs: false,
    profile: false,
    ready: false
  });
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Run validation animation on mount
    setIsValidating(true);
    
    setTimeout(() => setValidationSteps(s => ({ ...s, fields: true })), 1000);
    setTimeout(() => setValidationSteps(s => ({ ...s, docs: true })), 2000);
    setTimeout(() => setValidationSteps(s => ({ ...s, profile: true })), 3000);
    setTimeout(() => {
      setValidationSteps(s => ({ ...s, ready: true }));
      setIsValidating(false);
    }, 4000);
  }, []);

  const handleSubmit = () => {
    if (!hasConsented) return;
    
    // Pass the filled form data to the workflow engine mock
    const formData = {
      ...user,
      serviceId: service.id,
      serviceName: service.name,
      department: service.department
    };
    
    navigate('/ai/workflow', { state: { formData } });
  };

  if (!service) return <div className="p-5">Service not found.</div>;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50 pb-20">
      <header className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-slate-600 p-1 -ml-1 mr-3 hover:bg-slate-100 rounded-lg">
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="font-bold text-slate-800 text-lg">Review Application</h1>
          <p className="text-xs text-slate-500 font-medium">Verify information before submission</p>
        </div>
      </header>

      <div className="p-4 space-y-4 flex-1">
        
        {/* Service Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#000080]">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium mb-0.5">Service</p>
              <h2 className="font-bold text-slate-800 text-sm">{service.name}</h2>
              <p className="text-xs text-[#000080]">{service.department}</p>
            </div>
          </div>
        </div>

        {/* Validation Engine Mock */}
        <div className="bg-[#000080] text-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={18} className="text-[#FF9933]" />
            <h3 className="font-bold text-sm">DOWLET1 AI Validation</h3>
          </div>
          
          <div className="space-y-2 text-xs font-medium pl-1">
            <div className="flex items-center justify-between">
              <span className={validationSteps.fields ? 'text-blue-100' : 'text-slate-400'}>Checking required fields...</span>
              {validationSteps.fields ? <CheckCircle2 size={14} className="text-[#138808]" /> : isValidating && !validationSteps.fields ? <div className="w-3 h-3 border-2 border-white/30 border-t-[#FF9933] rounded-full animate-spin"></div> : null}
            </div>
            <div className="flex items-center justify-between">
              <span className={validationSteps.docs ? 'text-blue-100' : 'text-slate-400'}>Checking documents...</span>
              {validationSteps.docs ? <CheckCircle2 size={14} className="text-[#138808]" /> : isValidating && validationSteps.fields && !validationSteps.docs ? <div className="w-3 h-3 border-2 border-white/30 border-t-[#FF9933] rounded-full animate-spin"></div> : null}
            </div>
            <div className="flex items-center justify-between">
              <span className={validationSteps.profile ? 'text-blue-100' : 'text-slate-400'}>Checking profile information...</span>
              {validationSteps.profile ? <CheckCircle2 size={14} className="text-[#138808]" /> : isValidating && validationSteps.docs && !validationSteps.profile ? <div className="w-3 h-3 border-2 border-white/30 border-t-[#FF9933] rounded-full animate-spin"></div> : null}
            </div>
          </div>

          {validationSteps.ready && (
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="font-bold text-sm text-[#FF9933]">Application is ready for submission.</span>
              <CheckCircle2 size={18} className="text-[#138808]" />
            </div>
          )}
        </div>

        {/* Auto-filled Form Data */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Information Used</h3>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 flex items-center gap-1">
              <CheckCircle2 size={10} /> Auto-filled
            </span>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Applicant Name</p>
                <p className="text-sm font-semibold text-slate-800">{user.fullName}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Date of Birth</p>
                <p className="text-sm font-medium text-slate-800">{user.dob}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Address</p>
                <p className="text-sm font-medium text-slate-800">{user.address}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Mobile</p>
                <p className="text-sm font-medium text-slate-800">{user.mobile}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Annual Income</p>
                <p className="text-sm font-medium text-slate-800">{user.income}</p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">Attached Documents</p>
              <div className="space-y-2">
                {service.requiredDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 size={14} className="text-[#138808]" /> {doc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Consent Checkbox */}
        {validationSteps.ready && (
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-3 mt-4">
            <input 
              type="checkbox" 
              id="consent" 
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#000080] rounded border-slate-300 focus:ring-[#000080]"
            />
            <label htmlFor="consent" className="text-xs text-slate-700 leading-relaxed font-medium">
              I confirm that I have reviewed the information and authorize DOWLET1 to submit this application to the selected government service.
            </label>
          </div>
        )}

      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 z-20">
        <button 
          disabled={!validationSteps.ready || !hasConsented}
          onClick={handleSubmit}
          className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 ${
            validationSteps.ready && hasConsented 
              ? 'bg-[#000080] text-white hover:bg-blue-900' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isValidating ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-200 rounded-full animate-spin"></div>
              Validating Application...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </div>
  );
}

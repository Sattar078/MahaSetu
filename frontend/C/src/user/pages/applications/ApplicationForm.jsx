import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { FormInput, FormSelect } from '../../components/FormInput';
import { Calendar, CheckCircle2, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { demoAPI, getVerifiedInformation } from '../../../utils/demoState';

const steps = ['Personal', 'Verified', 'Documents', 'Consent', 'Review'];

export default function ApplicationForm() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const location = useLocation();

  const [service, setService] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPreFilled, setIsPreFilled] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Rahul Kumar",
    dob: "2005-05-15",
    gender: "male",
    address: "Plot 42, Malviya Nagar, Jaipur, Rajasthan",
    mobile: "+91 XXXXX XXXXX"
  });

  useEffect(() => {
    demoAPI.init();
    const s = demoAPI.getService(serviceId) || demoAPI.getService('scholarship');
    setService(s);

    const info = getVerifiedInformation();
    if (info && info.personal) {
      setFormData(prev => ({
        ...prev,
        fullName: info.personal.fullName || prev.fullName,
        dob: "2005-05-15",
        gender: (info.personal.gender || 'male').toLowerCase(),
        address: `${info.address?.addressLine || 'Plot 42, Malviya Nagar'}, ${info.address?.district || 'Jaipur'}, ${info.address?.state || 'Rajasthan'}`,
        mobile: info.contact?.mobile || prev.mobile
      }));
    }

    // Check if coming from reuse information or consent flow
    const params = new URLSearchParams(location.search);
    if (params.get('reuse') === 'true' || location.state?.prefilled) {
      setIsPreFilled(true);
    }
  }, [serviceId, location.search, location.state]);

  const handleUseAvailableInfo = () => {
    setIsPreFilled(true);
  };

  const serviceTitle = service ? service.name : "Service Application";

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title={`Apply for ${serviceTitle}`} onBack={() => navigate(-1)} />

      {/* Step indicator */}
      <div className="px-5 pt-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                i <= currentStep ? 'bg-[#000080] text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 ${i < currentStep ? 'bg-[#000080]' : 'bg-slate-100'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {steps.map((s, i) => (
            <span key={i} className={`text-[8px] font-medium ${i <= currentStep ? 'text-[#000080] font-bold' : 'text-slate-400'}`}>{s}</span>
          ))}
        </div>
      </div>

      {/* Form body */}
      <div className="flex-1 px-5 pt-4 pb-6 flex flex-col max-w-md mx-auto w-full">
        
        {/* Pre-fill Banner */}
        {isPreFilled ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 flex items-center gap-2 text-emerald-800 text-xs">
            <CheckCircle2 size={16} className="text-[#138808] shrink-0" />
            <div>
              <p className="font-bold">Pre-filled from your DOWLET1 profile.</p>
              <p className="text-[10px] text-emerald-700">Verified data was securely auto-populated</p>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#000080] uppercase tracking-wider">
                Information Available
              </span>
              <span className="text-[9px] bg-green-100 text-[#138808] px-1.5 py-0.5 rounded font-bold">
                4 Verified
              </span>
            </div>
            <div className="flex flex-wrap gap-1 text-[10px] text-slate-600">
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200">✓ Name</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200">✓ Address</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200">✓ Mobile</span>
              <span className="bg-white px-2 py-0.5 rounded border border-slate-200">✓ Identity</span>
            </div>
            <button
              onClick={handleUseAvailableInfo}
              className="w-full mt-1 bg-[#000080] text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 shadow-sm"
            >
              <Sparkles size={12} className="text-[#FF9933]" />
              <span>Use Available Information</span>
            </button>
          </div>
        )}

        <h3 className="text-sm font-bold text-slate-900 mb-3">Applicant Personal Information</h3>

        <div className="space-y-3.5">
          <FormInput 
            label="Full Name" 
            placeholder="Rahul Kumar" 
            value={formData.fullName} 
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <FormInput 
            label="Date of Birth" 
            type="date" 
            value={formData.dob} 
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            rightIcon={Calendar} 
          />
          <FormSelect
            label="Gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
          <FormInput 
            label="Residential Address" 
            placeholder="Plot 42, Jaipur, Rajasthan" 
            value={formData.address} 
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <FormInput 
            label="Mobile Number" 
            placeholder="+91 XXXXX XXXXX" 
            value={formData.mobile} 
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          />
        </div>

        <div className="mt-auto pt-6">
          <PrimaryButton onClick={() => navigate(`/apply/${serviceId || 'scholarship'}/verified-info`)} className="w-full bg-[#000080] hover:bg-blue-900 shadow-md">
            Next: Supporting Documents
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

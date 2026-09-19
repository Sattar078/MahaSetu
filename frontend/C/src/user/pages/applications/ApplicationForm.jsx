import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { FormInput, FormSelect } from '../../components/FormInput';
import { Calendar } from 'lucide-react';

const steps = ['Personal', 'Verified', 'Documents', 'Consent', 'Review'];

export default function ApplicationForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Apply for Scholarship" onBack={() => navigate(-1)} />

      {/* Step indicator */}
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-center gap-1">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                i <= currentStep ? 'bg-[#0d599f] text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 ${i < currentStep ? 'bg-[#0d599f]' : 'bg-slate-100'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {steps.map((s, i) => (
            <span key={i} className={`text-[8px] font-medium ${i <= currentStep ? 'text-[#0d599f]' : 'text-slate-400'}`}>{s}</span>
          ))}
        </div>
      </div>

      {/* Form body */}
      <div className="flex-1 px-5 pb-6 flex flex-col">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Personal Information</h3>

        <div className="space-y-4">
          <FormInput label="Full Name" placeholder="Rahul Sharma" defaultValue="Rahul Sharma" />
          <FormInput label="Date of Birth" type="date" defaultValue="2005-07-12" rightIcon={Calendar} />
          <FormSelect
            label="Gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </div>

        <div className="mt-auto pt-6">
          <PrimaryButton onClick={() => navigate('/apply/scholarship/verified-info')}>
            Next
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

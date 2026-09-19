import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { FormSelect } from '../../components/FormInput';
import { CheckCircle, ChevronRight } from 'lucide-react';

const eligibilitySteps = [
  { question: 'What is your age?', options: ['Under 18', '18-25', '26-35', '36-50', 'Above 50'] },
  { question: 'Select range', options: ['Below ₹1,00,000', '₹1,00,000 - ₹3,00,000', '₹3,00,000 - ₹5,00,000', 'Above ₹5,00,000'] },
];

export default function ServiceDetails() {
  const navigate = useNavigate();
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [eligStep, setEligStep] = useState(0);

  if (checkingEligibility) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-white">
        <AppHeader title="Check Your Eligibility" onBack={() => { if (eligStep > 0) setEligStep(eligStep - 1); else setCheckingEligibility(false); }} />

        <div className="px-5 pt-5 flex-1 flex flex-col">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-semibold text-[#0d599f]">{eligStep + 1} of {eligibilitySteps.length}</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
              <div className="h-full bg-[#0d599f] rounded-full transition-all" style={{ width: `${((eligStep + 1) / eligibilitySteps.length) * 100}%` }} />
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-4">{eligibilitySteps[eligStep].question}</h3>

          <div className="space-y-2.5">
            {eligibilitySteps[eligStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  if (eligStep < eligibilitySteps.length - 1) setEligStep(eligStep + 1);
                  else navigate('/eligibility-result');
                }}
                className="w-full flex items-center justify-between p-3.5 border border-slate-200 rounded-xl hover:border-[#0d599f] hover:bg-blue-50/30 transition text-left"
              >
                <span className="text-xs font-medium text-slate-700">{opt}</span>
                <ChevronRight size={14} className="text-slate-300" />
              </button>
            ))}
          </div>

          {eligStep < eligibilitySteps.length - 1 && (
            <div className="mt-auto pb-8">
              <PrimaryButton onClick={() => setEligStep(eligStep + 1)}>Next</PrimaryButton>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Scholarship Services" onBack={() => navigate(-1)} />

      <div className="px-5 pt-5 flex-1 flex flex-col">
        {/* Service Info */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Scholarship Services</h2>
          <p className="text-[10px] text-slate-400 mb-3">Education Department</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Financial assistance for students from economically weaker sections to pursue higher education. Covers tuition fees, hostel charges, and maintenance allowance.
          </p>
        </div>

        {/* Key details */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-3">
            <p className="text-[10px] text-slate-500 mb-0.5">Processing Time</p>
            <p className="text-xs font-bold text-slate-800">7 days</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3">
            <p className="text-[10px] text-slate-500 mb-0.5">Documents Required</p>
            <p className="text-xs font-bold text-slate-800">3 documents</p>
          </div>
        </div>

        {/* Eligibility criteria summary */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-800 mb-3">Eligibility Criteria</h3>
          <div className="space-y-2">
            {['Age: 18–35 years', 'Annual income below ₹3,00,000', 'Resident of Maharashtra'].map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                <span className="text-xs text-slate-600">{c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pb-6 space-y-3">
          <PrimaryButton onClick={() => setCheckingEligibility(true)}>
            Check Eligibility
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

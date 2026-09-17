import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';

export default function EligibilityResult() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Green check circle */}
        <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
          <CheckCircle size={56} className="text-emerald-500" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">You are Eligible!</h2>
        <p className="text-xs text-slate-500 text-center mb-8 leading-relaxed px-4">
          You appear eligible for this scheme based on the provided information.
        </p>

        {/* Key Reasons */}
        <div className="w-full bg-emerald-50 rounded-2xl p-4 mb-8">
          <h3 className="text-xs font-bold text-emerald-700 mb-3">Key Reason</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-700">Your annual income is within the scheme limit.</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-700">Your age meets the eligibility criteria.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        <PrimaryButton onClick={() => navigate('/apply/scholarship')}>
          Continue Application
        </PrimaryButton>
        <SecondaryButton onClick={() => navigate('/services')}>
          Check Another Service
        </SecondaryButton>
      </div>
    </div>
  );
}

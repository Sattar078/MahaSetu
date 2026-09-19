import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { ShieldCheck, Building2, HelpCircle, CheckCircle } from 'lucide-react';

export default function ConsentRequest() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Review data sharing" onBack={() => navigate(-1)} />

      <div className="flex-1 px-5 pt-5 pb-6 flex flex-col">
        {/* What will be shared */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={16} className="text-[#0d599f]" />
            <h3 className="text-xs font-bold text-slate-800">What will be shared?</h3>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 space-y-1.5">
            <p className="text-xs text-slate-600">• Income Information</p>
            <p className="text-xs text-slate-600">• Personal Details</p>
            <p className="text-xs text-slate-600">• Address Information</p>
          </div>
        </div>

        {/* Who will receive it */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={16} className="text-[#0d599f]" />
            <h3 className="text-xs font-bold text-slate-800">Who will receive it?</h3>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-600">Education Department</p>
          </div>
        </div>

        {/* Why is it needed */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle size={16} className="text-[#0d599f]" />
            <h3 className="text-xs font-bold text-slate-800">Why is it needed?</h3>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-xs text-slate-600 leading-relaxed">Scholarship eligibility verification requires income and personal data to process your application.</p>
          </div>
        </div>

        {/* Consent note */}
        <div className="flex items-start gap-2 bg-amber-50 rounded-xl p-3 mb-6">
          <CheckCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-[10px] text-amber-700 leading-relaxed">
            Your consent is required before sharing this information.
          </p>
        </div>

        <div className="mt-auto space-y-3">
          <PrimaryButton onClick={() => navigate('/apply/scholarship/review')}>
            Give Consent
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate(-1)}>
            Cancel
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

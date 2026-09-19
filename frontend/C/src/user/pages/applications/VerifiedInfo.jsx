import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export default function VerifiedInfo() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Verified Information Available" onBack={() => navigate(-1)} />

      <div className="flex-1 px-5 pt-5 pb-6 flex flex-col">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck size={18} className="text-[#0d599f]" />
          <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
        </div>

        {/* Verified data card */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 mb-4">
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-slate-400">Source: Revenue Department</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500">Income</p>
                <p className="text-sm font-bold text-slate-800">Value: ₹1,80,000</p>
              </div>
              <CheckCircle size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Verified</p>
              <p className="text-xs font-semibold text-slate-700">12 Sep 2026</p>
            </div>
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2 bg-emerald-50 rounded-xl p-3 mb-6">
          <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
          <p className="text-[10px] text-emerald-700 leading-relaxed">
            You don't need to upload your income certificate again.
          </p>
        </div>

        <div className="mt-auto space-y-3">
          <PrimaryButton onClick={() => navigate('/apply/scholarship/documents')}>
            Use This Information
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate('/apply/scholarship/documents')}>
            Upload New Document
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

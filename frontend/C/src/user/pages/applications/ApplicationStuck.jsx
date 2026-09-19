import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ApplicationStuck() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="What's happening?" onBack={() => navigate(-1)} />

      <div className="flex-1 px-5 pt-5 pb-6 flex flex-col">
        {/* Current Stage */}
        <div className="mb-6">
          <p className="text-[10px] text-slate-500 mb-1">Current Stage</p>
          <h3 className="text-base font-bold text-slate-900 mb-0.5">Education Verification</h3>
          <p className="text-[10px] text-slate-400">Revenue Department → Education Department</p>
        </div>

        {/* Status */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-amber-500" />
            <h4 className="text-xs font-bold text-amber-700">Status</h4>
          </div>
          <p className="text-xs text-amber-800">Waiting for verification</p>
        </div>

        {/* Citizen Action */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-emerald-500" />
            <h4 className="text-xs font-bold text-emerald-700">Citizen Action</h4>
          </div>
          <p className="text-xs text-emerald-800">No action required</p>
        </div>

        {/* Explanation */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="text-slate-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Your application is currently waiting for verification from the Education Department. This typically takes 3-5 working days. No action is required from your side at this time.
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <PrimaryButton onClick={() => navigate(-1)}>
            Back to Application
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

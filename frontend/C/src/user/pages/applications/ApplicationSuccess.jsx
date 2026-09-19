import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Hash } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';

export default function ApplicationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Animated success icon */}
        <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-6 animate-bounce-slow">
          <CheckCircle size={56} className="text-emerald-500" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-1 text-center">Application Submitted!</h2>
        <p className="text-xs text-slate-500 text-center mb-8">
          Your application has been submitted successfully.
        </p>

        {/* Details card */}
        <div className="w-full bg-slate-50 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Hash size={16} className="text-[#0d599f]" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Application ID</p>
              <p className="text-xs font-bold text-slate-800">MH-EDU-2026-00124</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
              <Clock size={16} className="text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Expected Processing Time</p>
              <p className="text-xs font-bold text-slate-800">7 working days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        <PrimaryButton onClick={() => navigate('/applications/MH-EDU-2026-00124')}>
          Track Application
        </PrimaryButton>
        <SecondaryButton onClick={() => navigate('/home')}>
          Go to Home
        </SecondaryButton>
      </div>
    </div>
  );
}

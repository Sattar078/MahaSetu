import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '../components/Navigation';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { CheckCircle, Clock, Circle, ChevronRight } from 'lucide-react';

const timeline = [
  { step: 'Application Submitted', date: '12 Sep 2026', status: 'done' },
  { step: 'Identity Verification', date: '12 Sep 2026', status: 'done' },
  { step: 'Revenue Verification', date: 'In Progress', status: 'current' },
  { step: 'Education Verification', date: 'In Sep 2026', status: 'pending' },
  { step: 'Approval', date: 'Pending', status: 'pending' },
];

export default function ApplicationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Scholarship Application" onBack={() => navigate('/applications')} />

      <div className="flex-1 px-5 pt-5 pb-6 flex flex-col">
        {/* ID + Status */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] text-slate-500">Application ID</p>
            <p className="text-xs font-bold text-slate-800">{id || 'MH-EDU-2026-00124'}</p>
          </div>
          <span className="text-[10px] font-semibold bg-blue-50 text-[#0d599f] px-3 py-1.5 rounded-lg">In Progress</span>
        </div>

        {/* Current Stage */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-6">
          <p className="text-[10px] text-slate-500 mb-0.5">Current Stage</p>
          <p className="text-sm font-bold text-[#0d599f]">Education Verification</p>
          <p className="text-[10px] text-slate-500 mt-1">3 of 5 stages completed</p>
        </div>

        {/* Timeline */}
        <h3 className="text-xs font-bold text-slate-800 mb-4">Verification Timeline</h3>
        <div className="space-y-0">
          {timeline.map((t, i) => (
            <div key={i} className="flex gap-3">
              {/* Icon column */}
              <div className="flex flex-col items-center">
                {t.status === 'done' ? (
                  <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                ) : t.status === 'current' ? (
                  <Clock size={18} className="text-[#0d599f] shrink-0" />
                ) : (
                  <Circle size={18} className="text-slate-200 shrink-0" />
                )}
                {i < timeline.length - 1 && (
                  <div className={`w-0.5 flex-1 my-1 ${t.status === 'done' ? 'bg-emerald-300' : 'bg-slate-100'}`} />
                )}
              </div>
              {/* Text */}
              <div className="pb-5">
                <p className={`text-xs font-semibold ${t.status === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>{t.step}</p>
                <p className={`text-[10px] mt-0.5 ${t.status === 'current' ? 'text-[#0d599f] font-semibold' : 'text-slate-400'}`}>{t.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          <PrimaryButton onClick={() => navigate(`/applications/${id || 'MH-EDU-2026-00124'}/status`)}>
            View Details
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

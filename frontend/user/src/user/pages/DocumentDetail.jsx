import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '../components/Navigation';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { CheckCircle, Calendar, FileText } from 'lucide-react';

export default function DocumentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Income Certificate" onBack={() => navigate('/documents')} />

      <div className="flex-1 px-5 pt-5 pb-6 flex flex-col">
        {/* Document header */}
        <div className="mb-4">
          <p className="text-[10px] text-slate-400 mb-0.5">Revenue Department</p>
          <h2 className="text-lg font-bold text-slate-900">Income Certificate</h2>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2 bg-emerald-50 rounded-xl px-4 py-3 mb-6">
          <CheckCircle size={18} className="text-emerald-500" />
          <span className="text-xs font-bold text-emerald-700">Verified</span>
        </div>

        {/* Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Calendar size={16} className="text-[#0d599f]" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Issued</p>
              <p className="text-xs font-semibold text-slate-800">12 Sep 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
              <Calendar size={16} className="text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Expires</p>
              <p className="text-xs font-semibold text-slate-800">12 Sep 2027</p>
            </div>
          </div>
        </div>

        {/* Document preview placeholder */}
        <div className="flex-1 bg-slate-50 rounded-2xl flex items-center justify-center min-h-[160px] mb-6 border border-slate-100">
          <div className="flex flex-col items-center text-slate-300">
            <FileText size={40} />
            <p className="text-xs mt-2">Document Preview</p>
          </div>
        </div>

        <div className="space-y-3">
          <PrimaryButton onClick={() => navigate('/apply/scholarship')}>
            Use for Application
          </PrimaryButton>
          <div className="flex gap-3">
            <SecondaryButton className="flex-1">Share</SecondaryButton>
            <SecondaryButton className="flex-1">View Details</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

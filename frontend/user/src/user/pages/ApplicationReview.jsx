import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppHeader } from '../components/Navigation';
import { PrimaryButton } from '../components/Buttons';
import { CheckCircle, FileText, User } from 'lucide-react';

export default function ApplicationReview() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Review Application" onBack={() => navigate(-1)} />

      <div className="flex-1 px-5 pt-5 pb-6 flex flex-col">
        {/* Personal Info section */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <User size={16} className="text-[#0d599f]" />
            <h3 className="text-xs font-bold text-slate-800">Personal Information</h3>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 space-y-2.5">
            <div className="flex justify-between">
              <span className="text-[10px] text-slate-500">Full Name</span>
              <span className="text-xs font-semibold text-slate-800">Rahul Sharma</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-slate-500">Date of Birth</span>
              <span className="text-xs font-semibold text-slate-800">12-07-2005</span>
            </div>
          </div>
        </div>

        {/* Verified Information */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={16} className="text-emerald-500" />
            <h3 className="text-xs font-bold text-slate-800">Verified Information</h3>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4">
            <div className="flex justify-between">
              <span className="text-[10px] text-slate-500">Income</span>
              <span className="text-xs font-semibold text-slate-800">₹1,80,000</span>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-[#0d599f]" />
            <h3 className="text-xs font-bold text-slate-800">Documents</h3>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-700">3 documents uploaded</p>
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0d599f] focus:ring-[#0d599f]"
          />
          <span className="text-[10px] text-slate-500 leading-relaxed">
            I agree to the terms and conditions and confirm that the information provided is accurate.
          </span>
        </label>

        <div className="mt-auto">
          <PrimaryButton disabled={!agreed} onClick={() => navigate('/apply/scholarship/success')}>
            Submit Application
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

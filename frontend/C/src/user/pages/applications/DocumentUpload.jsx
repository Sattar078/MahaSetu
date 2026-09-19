import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const documents = [
  { id: 'identity', label: 'Identity Proof', description: 'Aadhaar / PAN / Voter ID', status: null },
  { id: 'address', label: 'Address Proof', description: 'Ration Card / Electricity Bill', status: null },
  { id: 'income', label: 'Income Certificate', description: '(If not already verified)', status: 'verified' },
];

export default function DocumentUpload() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Upload Documents" onBack={() => navigate(-1)} />

      <div className="flex-1 px-5 pt-5 pb-6 flex flex-col">
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-bold text-slate-800">{doc.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{doc.description}</p>
                </div>
                {doc.status === 'verified' ? (
                  <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                    <CheckCircle size={10} className="text-emerald-500" />
                    <span className="text-[9px] font-semibold text-emerald-600">Verified</span>
                  </div>
                ) : null}
              </div>

              {doc.status !== 'verified' && (
                <button className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-200 rounded-lg hover:border-[#0d599f] hover:bg-blue-50/30 transition">
                  <Upload size={14} className="text-[#0d599f]" />
                  <span className="text-xs font-semibold text-[#0d599f]">Upload</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 space-y-3">
          <PrimaryButton onClick={() => navigate('/apply/scholarship/consent')}>
            Continue
          </PrimaryButton>
          <button onClick={() => navigate('/apply/scholarship/consent')} className="w-full text-center text-xs font-semibold text-slate-400 py-2">
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

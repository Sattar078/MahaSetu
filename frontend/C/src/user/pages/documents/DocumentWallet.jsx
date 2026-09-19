import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { CheckCircle, Clock, Plus, ChevronRight } from 'lucide-react';

const documents = [
  { id: 'income', title: 'Income Certificate', dept: 'Revenue Department', status: 'Verified', statusColor: 'bg-emerald-50 text-emerald-600', date: '12 May 2026' },
  { id: 'caste', title: 'Caste Certificate', dept: 'Social Welfare Department', status: 'Verified', statusColor: 'bg-emerald-50 text-emerald-600', date: '10 May 2026' },
  { id: 'residence', title: 'Residence Certificate', dept: 'Revenue Department', status: 'Verified', statusColor: 'bg-emerald-50 text-emerald-600', date: '10 May 2026' },
];

export default function DocumentWallet() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="My Documents" onBack={() => navigate('/profile')} />

      <div className="flex-1 px-5 pt-4 pb-6 flex flex-col">
        <div className="space-y-3">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => navigate(`/documents/${doc.id}`)}
              className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition text-left"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800">{doc.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{doc.dept}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-lg ${doc.statusColor}`}>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle size={8} /> {doc.status}
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-300">{doc.date}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 shrink-0" />
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <PrimaryButton className="flex items-center justify-center gap-2">
            <Plus size={16} /> Add Document
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

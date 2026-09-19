import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { SearchBar } from '../../components/FormInput';
import { PrimaryButton } from '../../components/Buttons';
import { ChevronRight } from 'lucide-react';

const results = [
  { id: 1, title: 'Scholarship Services', dept: 'Education Department', tag: 'Education' },
  { id: 2, title: 'Student Welfare Scheme', dept: 'Social Welfare Department', tag: 'Social Welfare' },
  { id: 3, title: 'Skill Development Support', dept: 'Employment Department', tag: 'Employment' },
  { id: 4, title: 'Education Loan Scheme', dept: 'Education Department', tag: 'Education' },
  { id: 5, title: 'Scholarship for Minorities', dept: 'Education Department', tag: 'Education' },
];

export default function SearchResults() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Search Results" onBack={() => navigate(-1)} />

      <div className="px-5 pt-4 pb-6 flex-1">
        <SearchBar placeholder="scholarship" />

        <p className="text-xs text-slate-500 mt-4 mb-3">Found <span className="font-semibold text-slate-700">{results.length} services</span></p>

        <div className="space-y-2.5">
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => navigate('/service-details')}
              className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-semibold bg-blue-50 text-[#0d599f] px-2 py-0.5 rounded-full">{r.tag}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800">{r.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{r.dept}</p>
              </div>
              <PrimaryButton className="!w-auto !py-1.5 !px-3 !text-[10px] ml-3 shrink-0" onClick={(e) => { e.stopPropagation(); navigate('/service-details'); }}>
                Apply
              </PrimaryButton>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

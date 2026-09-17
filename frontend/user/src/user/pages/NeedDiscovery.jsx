import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/Navigation';
import { SearchBar } from '../components/FormInput';
import { PrimaryButton } from '../components/Buttons';
import { ChevronRight } from 'lucide-react';

const matchingServices = [
  { id: 1, title: 'Scholarship Services', dept: 'Education Department', route: '/services/education' },
  { id: 2, title: 'Student Welfare Scheme', dept: 'Social Welfare Department', route: '/services/social' },
  { id: 3, title: 'Skill Development Support', dept: 'Employment Department', route: '/services/employment' },
  { id: 4, title: 'Education Loan Scheme', dept: 'Education Department', route: '/services/education' },
];

export default function NeedDiscovery() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="" onBack={() => navigate('/home')} />

      <div className="px-5 pt-4 pb-6 flex flex-col flex-1">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Tell us what you need</h2>
        <p className="text-xs text-slate-500 mb-5">Describe your needs and we'll find matching services.</p>

        <SearchBar placeholder="I need a scholarship..." />

        {/* Matching Services */}
        <div className="mt-6">
          <p className="text-xs font-bold text-slate-700 mb-3">Matching Services</p>
          <div className="space-y-2.5">
            {matchingServices.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(s.route)}
                className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition text-left"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-800">{s.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{s.dept}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <PrimaryButton onClick={() => navigate('/search')}>
            View All Results
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

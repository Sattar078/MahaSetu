import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppHeader } from '../components/Navigation';
import MainLayout from '../components/MainLayout';
import { Clock, ChevronRight } from 'lucide-react';

const allServices = [
  { id: 'scholarship', title: 'Scholarship Services', dept: 'Education Department', days: '7 days', category: 'education' },
  { id: 'welfare', title: 'Student Welfare Scheme', dept: 'Social Welfare Department', days: '5 days', category: 'social' },
  { id: 'skill', title: 'Skill Development', dept: 'Education Department', days: '10 days', category: 'education' },
  { id: 'loan', title: 'Education Loan Scheme', dept: 'Education Department', days: '14 days', category: 'education' },
  { id: 'income', title: 'Income Certificate', dept: 'Revenue Department', days: '3 days', category: 'revenue' },
  { id: 'caste', title: 'Caste Certificate', dept: 'Revenue Department', days: '5 days', category: 'certificates' },
  { id: 'employment-reg', title: 'Employment Registration', dept: 'Employment Department', days: '2 days', category: 'employment' },
];

const tabs = ['All', 'Education', 'Revenue', 'Social'];

export default function ServiceList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = allServices.filter((s) => {
    if (activeTab === 'All') return true;
    return s.category === activeTab.toLowerCase();
  });

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) + ' Services' : 'Services';

  return (
    <MainLayout>
      <div className="bg-white min-h-full">
        <AppHeader title={categoryTitle} onBack={() => navigate('/services')} />

        {/* Tabs */}
        <div className="flex gap-2 px-5 pt-3 pb-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeTab === tab
                  ? 'bg-[#0d599f] text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Service List */}
        <div className="px-5 pt-3 pb-6 space-y-2.5">
          {filtered.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate('/service-details')}
              className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition text-left"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 mb-0.5">{s.title}</p>
                <p className="text-[10px] text-slate-400">{s.dept}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock size={10} className="text-slate-300" />
                  <span className="text-[10px] text-slate-400">{s.days}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

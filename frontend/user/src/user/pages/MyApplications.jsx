import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { EmptyState } from '../components/StateScreens';
import { ChevronRight, Clock } from 'lucide-react';

const tabs = ['All', 'In Progress', 'Completed', 'Rejected'];

const applications = [
  { id: 'MH-EDU-2026-00124', title: 'Scholarship Application', dept: 'Education Department', status: 'In Progress', statusColor: 'bg-blue-50 text-[#0d599f]', date: '12 Sep 2026', progress: '3 of 5 stages completed' },
  { id: 'MH-REV-2026-00234', title: 'Income Certificate', dept: 'Revenue Department', status: 'Completed', statusColor: 'bg-emerald-50 text-emerald-600', date: '10 Sep 2026', progress: 'Completed' },
];

export default function MyApplications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = applications.filter((a) => {
    if (activeTab === 'All') return true;
    return a.status === activeTab;
  });

  return (
    <MainLayout>
      <div className="bg-white min-h-full">
        <div className="px-5 pt-5 pb-3">
          <h2 className="text-lg font-bold text-slate-900 mb-4">My Applications</h2>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded-full text-[10px] font-semibold whitespace-nowrap transition ${
                  activeTab === tab
                    ? 'bg-[#0d599f] text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 pb-6">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3 pt-2">
              {filtered.map((app) => (
                <button
                  key={app.id}
                  onClick={() => navigate(`/applications/${app.id}`)}
                  className="w-full p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800">{app.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{app.dept}</p>
                    </div>
                    <span className={`text-[9px] font-semibold px-2 py-1 rounded-lg ${app.statusColor}`}>{app.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Clock size={10} className="text-slate-300" />
                      <span className="text-[10px] text-slate-400">{app.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-slate-500">{app.progress}</span>
                      <ChevronRight size={14} className="text-slate-300" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

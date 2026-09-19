import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppHeader } from '../../components/Navigation';
import MainLayout from '../../components/MainLayout';
import { CheckCircle, ArrowRight, Bell, Info, AlertTriangle } from 'lucide-react';

const tabs = ['All', 'Applications', 'Services', 'Events'];

const notifications = [
  { id: 1, title: 'Income verification completed', date: '12 Sep 2026', icon: CheckCircle, iconColor: 'text-emerald-500 bg-emerald-50', category: 'Applications' },
  { id: 2, title: 'Your application moved to Education Department', date: '12 Sep 2026', icon: ArrowRight, iconColor: 'text-[#0d599f] bg-blue-50', category: 'Applications' },
  { id: 3, title: 'Additional information required', date: '10 Sep 2026', icon: AlertTriangle, iconColor: 'text-amber-500 bg-amber-50', category: 'Applications' },
  { id: 4, title: 'New scholarship scheme available', date: '09 Sep 2026', icon: Bell, iconColor: 'text-purple-500 bg-purple-50', category: 'Services' },
  { id: 5, title: 'Application approved', date: '09 Sep 2026', icon: CheckCircle, iconColor: 'text-emerald-500 bg-emerald-50', category: 'Applications' },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = notifications.filter((n) => {
    if (activeTab === 'All') return true;
    return n.category === activeTab;
  });

  return (
    <MainLayout>
      <div className="bg-white min-h-full">
        <div className="px-5 pt-5 pb-3">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Notifications</h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded-full text-[10px] font-semibold whitespace-nowrap transition ${
                  activeTab === tab ? 'bg-[#0d599f] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 pb-6 space-y-2.5 pt-2">
          {filtered.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                className="w-full flex items-start gap-3 p-3.5 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition text-left"
              >
                <div className={`w-9 h-9 rounded-xl ${n.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{n.date}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

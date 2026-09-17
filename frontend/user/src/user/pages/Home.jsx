import { useNavigate } from 'react-router-dom';
import { Bell, Award, GraduationCap, Briefcase, Users, ChevronRight } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { SearchBar } from '../components/FormInput';

const quickAccess = [
  { id: 'certificates', label: 'Certificates', icon: Award, color: 'bg-orange-50 text-orange-600' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'bg-blue-50 text-[#0d599f]' },
  { id: 'employment', label: 'Employment', icon: Briefcase, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'social', label: 'Social', icon: Users, color: 'bg-purple-50 text-purple-600' },
];

const recentServices = [
  { id: 's1', title: 'Scholarship Services', dept: 'Education Department', route: '/services/education' },
  { id: 's2', title: 'Student Welfare Scheme', dept: 'Social Welfare Department', route: '/services/social' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="bg-white">
        {/* Header */}
        <div className="bg-[#0d599f] px-5 pt-6 pb-8 rounded-b-3xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-blue-200 text-xs">Good morning,</p>
              <h1 className="text-white text-lg font-bold">Rahul Sharma</h1>
            </div>
            <button onClick={() => navigate('/notifications')} className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Bell size={18} className="text-white" />
            </button>
          </div>

          {/* Search */}
          <div onClick={() => navigate('/discover')} className="cursor-pointer">
            <SearchBar placeholder="What government service do you need?" />
          </div>
        </div>

        {/* Quick Access */}
        <div className="px-5 -mt-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-800">Quick Access</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {quickAccess.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(`/services/${item.id}`)}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-medium text-slate-600">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Your trusted bridge */}
        <div className="px-5 mt-5">
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-xs font-bold text-[#0d599f] mb-1">Your trusted bridge to government services</p>
            <p className="text-[10px] text-slate-500">Access services, track applications, and manage documents — all in one place.</p>
          </div>
        </div>

        {/* Matching / Recent Services */}
        <div className="px-5 mt-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-800">Recent Services</h3>
            <button onClick={() => navigate('/services')} className="text-[10px] font-semibold text-[#0d599f]">View All</button>
          </div>
          <div className="space-y-2.5">
            {recentServices.map((s) => (
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
      </div>
    </MainLayout>
  );
}

import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/Navigation';
import { SearchBar } from '../components/FormInput';
import MainLayout from '../components/MainLayout';
import {
  GraduationCap, Landmark, Briefcase, Users,
  Bus, Heart, FileText, Wheat
} from 'lucide-react';

const categories = [
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'bg-blue-50 text-[#0d599f]' },
  { id: 'revenue', label: 'Revenue', icon: Landmark, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'employment', label: 'Employment', icon: Briefcase, color: 'bg-orange-50 text-orange-600' },
  { id: 'social', label: 'Social Welfare', icon: Users, color: 'bg-purple-50 text-purple-600' },
  { id: 'transport', label: 'Transport', icon: Bus, color: 'bg-cyan-50 text-cyan-600' },
  { id: 'health', label: 'Health', icon: Heart, color: 'bg-red-50 text-red-500' },
  { id: 'certificates', label: 'Certificates', icon: FileText, color: 'bg-amber-50 text-amber-600' },
  { id: 'agriculture', label: 'Agriculture', icon: Wheat, color: 'bg-lime-50 text-lime-600' },
];

export default function ServiceCategories() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="bg-white min-h-full">
        <div className="px-5 pt-5 pb-3">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Government Services</h2>
          <SearchBar placeholder="Search services..." />
        </div>

        <div className="px-5 pt-4 pb-6">
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/services/${cat.id}`)}
                  className="flex flex-col items-center gap-3 p-5 bg-white border border-slate-100 rounded-2xl hover:border-[#0d599f] hover:shadow-sm transition"
                >
                  <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

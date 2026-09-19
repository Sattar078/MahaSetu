import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import {
  User, Phone, MapPin, GraduationCap, ShieldCheck,
  FileText, FolderArchive, Lock, ChevronRight
} from 'lucide-react';

const menuItems = [
  { id: 'personal', label: 'Personal Information', icon: User, route: null },
  { id: 'contact', label: 'Contact Information', icon: Phone, route: null },
  { id: 'address', label: 'Address', icon: MapPin, route: null },
  { id: 'education', label: 'Education', icon: GraduationCap, route: null },
  { id: 'verified', label: 'Verified Information', icon: ShieldCheck, route: null },
  { id: 'documents', label: 'Documents', icon: FileText, route: '/documents' },
  { id: 'applications', label: 'Applications', icon: FolderArchive, route: '/applications' },
  { id: 'consents', label: 'Consents', icon: Lock, route: '/privacy' },
];

export default function Profile() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="bg-white min-h-full">
        <div className="px-5 pt-5 pb-4">
          <h2 className="text-lg font-bold text-slate-900 mb-1">My Profile</h2>

          {/* Profile completion */}
          <div className="bg-blue-50 rounded-2xl p-4 mt-4 mb-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-700">Profile completeness</p>
              <span className="text-sm font-bold text-[#0d599f]">80%</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full">
              <div className="h-full bg-[#0d599f] rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="px-5 pb-6">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => item.route && navigate(item.route)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
                      <Icon size={16} className="text-slate-500" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { Share2, FileText, Lock, Smartphone, Clock, ChevronRight } from 'lucide-react';

const settings = [
  { id: 'sharing', label: 'Data Sharing', description: 'Control what information is shared', icon: Share2 },
  { id: 'consents', label: 'Active Consents', description: 'View and manage your consents', icon: FileText },
  { id: 'security', label: 'Login & Security', description: 'Change password, 2FA', icon: Lock },
  { id: 'devices', label: 'Devices', description: 'Manage your devices', icon: Smartphone },
  { id: 'activity', label: 'Activity History', description: 'View your activity', icon: Clock },
];

export default function PrivacySecurity() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="Privacy & Security" onBack={() => navigate('/profile')} />

      <div className="flex-1 px-5 pt-4 pb-6">
        <div className="space-y-1">
          {settings.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Icon size={16} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{s.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{s.description}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            );
          })}
        </div>

        {/* Info note */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-4">
          <p className="text-[10px] text-slate-600 leading-relaxed">
            Your information is shared only for authorized purposes and with your explicit consent. You can revoke access at any time.
          </p>
        </div>
      </div>
    </div>
  );
}

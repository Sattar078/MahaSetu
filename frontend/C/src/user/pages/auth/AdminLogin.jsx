import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Key, Mail, Sparkles, ArrowRight } from 'lucide-react';
import AuthResponsiveContainer from '../../components/AuthResponsiveContainer';
import { setCurrentRole } from '../../../utils/demoState';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [adminEmail, setAdminEmail] = useState('admin.sih@nic.gov.in');
  const [passkey, setPasskey] = useState('ADMIN-SIH-2025');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!adminEmail.trim()) {
      setError('Please enter Admin Email');
      return;
    }
    if (!passkey.trim()) {
      setError('Please enter Admin Security Passkey');
      return;
    }

    setCurrentRole('admin');
    navigate('/admin/dashboard');
  };

  const handleAutoFill = () => {
    setAdminEmail('admin.sih@nic.gov.in');
    setPasskey('ADMIN-SIH-2025');
    setError('');
  };

  return (
    <AuthResponsiveContainer
      title="System Administrator Access"
      subtitle="National citizen mesh telemetry, audit inspection, and SIH jury evaluation console."
      showBackButton={true}
      onBack={() => navigate('/role-select')}
      maxWidth="max-w-md"
    >
      {/* Demo Credentials Banner */}
      <div className="mb-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-emerald-300 shrink-0" />
          <p className="text-[11px] text-emerald-200 font-medium">Demo Admin Passkey ready</p>
        </div>
        <button
          type="button"
          onClick={handleAutoFill}
          className="text-[10px] font-bold bg-white text-emerald-900 hover:bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors shadow-sm shrink-0"
        >
          Auto-Fill
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-xs font-medium text-center shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-[11px] font-semibold text-white/90 block mb-1">Administrative Email *</label>
          <div className="relative">
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@nic.gov.in"
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all font-mono"
            />
            <Mail size={16} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-white/90 block mb-1">SuperAdmin Passkey / Security Key *</label>
          <div className="relative">
            <input
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter master security passkey"
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all font-mono"
            />
            <Key size={16} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 mt-4"
        >
          <span>ENTER ADMIN MONITORING CONSOLE</span>
          <ArrowRight size={16} />
        </button>
      </form>

      <div className="mt-5 text-center">
        <button
          onClick={() => navigate('/role-select')}
          className="text-xs text-white/60 hover:text-white transition-colors"
        >
          ← Change Role / Back to Role Selection
        </button>
      </div>
    </AuthResponsiveContainer>
  );
}

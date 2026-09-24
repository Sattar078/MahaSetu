import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, ShieldCheck, KeyRound, ChevronDown, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import AuthResponsiveContainer from '../../components/AuthResponsiveContainer';
import { setCurrentRole } from '../../../utils/demoState';

export default function OfficerLogin() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState('revenue');
  const [officerId, setOfficerId] = useState('OFF-REV-RJ-1049');
  const [password, setPassword] = useState('officialpass123');
  const [tokenCode, setTokenCode] = useState('849201');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!officerId.trim()) {
      setError('Please enter your Government Officer ID');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your departmental security password');
      return;
    }

    setCurrentRole('officer');
    navigate('/officer/dashboard');
  };

  const handleAutoFill = () => {
    setDepartment('revenue');
    setOfficerId('OFF-REV-RJ-1049');
    setPassword('officialpass123');
    setTokenCode('849201');
    setError('');
  };

  return (
    <AuthResponsiveContainer
      title="Government Officer Login"
      subtitle="Authorized access for nodal verification officers, revenue inspectors, and welfare administrators."
      showBackButton={true}
      onBack={() => navigate('/role-select')}
      maxWidth="max-w-md"
    >
      {/* Demo Credentials Quick-Fill Banner */}
      <div className="mb-4 bg-sky-500/15 border border-sky-500/30 rounded-2xl p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-sky-300 shrink-0" />
          <p className="text-[11px] text-sky-200 font-medium">Official Credentials ready</p>
        </div>
        <button
          type="button"
          onClick={handleAutoFill}
          className="text-[10px] font-bold bg-white text-[#000080] hover:bg-sky-50 px-2.5 py-1 rounded-lg transition-colors shadow-sm shrink-0"
        >
          Auto-Fill
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 text-xs font-medium text-center shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-3.5">
        {/* Department Dropdown */}
        <div>
          <label className="text-[11px] font-semibold text-white/90 block mb-1">Government Department *</label>
          <div className="relative">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pr-10 text-sm text-white outline-none focus:border-white focus:bg-white/20 transition-all appearance-none"
            >
              <option value="revenue" className="text-slate-900">Department of Revenue & Land Records (Rajasthan)</option>
              <option value="uidai" className="text-slate-900">UIDAI Regional Verification Wing</option>
              <option value="social" className="text-slate-900">Ministry of Social Justice & Empowerment</option>
              <option value="agriculture" className="text-slate-900">Department of Agriculture & Farmers Welfare</option>
              <option value="transport" className="text-slate-900">Regional Transport Office (RTO)</option>
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-white/60 pointer-events-none" />
          </div>
        </div>

        {/* Officer Badge ID */}
        <div>
          <label className="text-[11px] font-semibold text-white/90 block mb-1">Officer Government ID / Badge # *</label>
          <div className="relative">
            <input
              type="text"
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              placeholder="e.g. OFF-REV-RJ-1049"
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all font-mono"
            />
            <Landmark size={16} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
          </div>
        </div>

        {/* Official Password */}
        <div>
          <label className="text-[11px] font-semibold text-white/90 block mb-1">Departmental Passcode *</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter official password"
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
            />
            <KeyRound size={16} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
          </div>
        </div>

        {/* e-Pramaan Security Code */}
        <div>
          <label className="text-[11px] font-semibold text-white/90 block mb-1">e-Pramaan 2FA Security Code</label>
          <div className="relative">
            <input
              type="text"
              value={tokenCode}
              onChange={(e) => setTokenCode(e.target.value)}
              placeholder="6-digit token code"
              maxLength={6}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pl-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all tracking-widest font-mono"
            />
            <ShieldCheck size={16} className="absolute left-3.5 top-3.5 text-white/60 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm rounded-xl transition active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 mt-4"
        >
          <span>AUTHENTICATE OFFICER PORTAL</span>
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

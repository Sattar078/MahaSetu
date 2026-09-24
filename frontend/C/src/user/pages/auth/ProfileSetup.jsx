import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import AuthResponsiveContainer from '../../components/AuthResponsiveContainer';

export default function ProfileSetup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('Rahul Kumar');
  const [dob, setDob] = useState('1998-05-14');
  const [gender, setGender] = useState('male');
  const [state, setState] = useState('rajasthan');
  const [district, setDistrict] = useState('jaipur');
  const [city, setCity] = useState('Jaipur');
  const [pincode, setPincode] = useState('302001');

  return (
    <AuthResponsiveContainer
      title="Complete Citizen Profile"
      subtitle="Add your verified demographic details once to enable instant 1-click scheme applications."
      showBackButton={true}
      maxWidth="max-w-xl"
    >
      {/* Stepper indicator */}
      <div className="flex items-center gap-2 mb-6 px-1">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full h-1 bg-emerald-400 rounded-full mb-1.5 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
          <div className="flex items-center gap-1 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
            <CheckCircle2 size={11} className="fill-emerald-400 text-slate-900" />
            <span>Account</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full h-1 bg-amber-400 rounded-full mb-1.5 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          <div className="flex items-center gap-1 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Demographics</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full h-1 bg-white/20 rounded-full mb-1.5" />
          <div className="flex items-center gap-1 text-white/50 text-[10px] font-bold uppercase tracking-wider">
            <span>Identity</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* PERSONAL INFORMATION */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-3">
            Personal Information
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-white/90 block mb-1">Full Legal Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-white/90 block mb-1">Date of Birth *</label>
                <div className="relative">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 pr-9 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all [&::-webkit-calendar-picker-indicator]:opacity-0"
                  />
                  <Calendar size={15} className="absolute right-3 top-3 text-white/60 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-white/90 block mb-1">Gender</label>
                <div className="relative">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 pr-9 text-sm text-white outline-none focus:border-white focus:bg-white/20 transition-all appearance-none"
                  >
                    <option value="" className="text-slate-800">Select gender</option>
                    <option value="male" className="text-slate-800">Male</option>
                    <option value="female" className="text-slate-800">Female</option>
                    <option value="other" className="text-slate-800">Other</option>
                  </select>
                  <ChevronDown size={15} className="absolute right-3 top-3 text-white/60 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-3">
            Residential Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-white/90 block mb-1">State *</label>
              <div className="relative">
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 pr-9 text-sm text-white outline-none focus:border-white focus:bg-white/20 transition-all appearance-none"
                >
                  <option value="rajasthan" className="text-slate-800">Rajasthan</option>
                  <option value="maharashtra" className="text-slate-800">Maharashtra</option>
                  <option value="delhi" className="text-slate-800">Delhi NCR</option>
                  <option value="karnataka" className="text-slate-800">Karnataka</option>
                </select>
                <ChevronDown size={15} className="absolute right-3 top-3 text-white/60 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-white/90 block mb-1">District *</label>
              <div className="relative">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 pr-9 text-sm text-white outline-none focus:border-white focus:bg-white/20 transition-all appearance-none"
                >
                  <option value="jaipur" className="text-slate-800">Jaipur</option>
                  <option value="jodhpur" className="text-slate-800">Jodhpur</option>
                  <option value="mumbai" className="text-slate-800">Mumbai</option>
                  <option value="pune" className="text-slate-800">Pune</option>
                </select>
                <ChevronDown size={15} className="absolute right-3 top-3 text-white/60 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-white/90 block mb-1">City / Village *</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City or Village"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-white/90 block mb-1">PIN Code *</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="6-digit PIN"
                maxLength={6}
                className="w-full bg-white/10 border border-white/20 rounded-xl p-2.5 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5 pt-2">
          <button 
            onClick={() => navigate('/home')}
            className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 text-[#0d599f] font-extrabold text-sm rounded-xl transition active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
          >
            <span>SAVE & ENTER CITIZEN PORTAL</span>
            <ArrowRight size={16} />
          </button>
          <button 
            onClick={() => navigate('/home')}
            className="w-full py-2 px-4 text-white/70 hover:text-white font-semibold text-xs rounded-xl transition-colors text-center"
          >
            Skip for Now
          </button>
        </div>
      </div>
    </AuthResponsiveContainer>
  );
}

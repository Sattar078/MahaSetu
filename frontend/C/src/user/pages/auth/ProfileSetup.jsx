import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProfileSetup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  return (
    <div
      className="flex flex-col h-[100dvh] bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url('https://i.pinimg.com/736x/d1/eb/1a/d1eb1aed415bd2745a4e6c1a8aba837f.jpg')` }}
    >
      {/* ── Dark scrim for legibility ── */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        
        {/* Header bar */}
        <div className="px-4 py-4 flex items-center justify-between sticky top-0 bg-black/30 backdrop-blur-md z-20 border-b border-white/10">
          <button onClick={() => navigate(-1)} className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-xl drop-shadow-md">🇮🇳</span>
            <span className="text-lg font-extrabold text-white tracking-widest uppercase drop-shadow-md">DOWLET1</span>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="px-5 py-6 pb-20 flex-1 flex flex-col max-w-lg mx-auto w-full">
          
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Complete Your Profile</h1>
          <p className="text-sm text-white/80 mb-6 drop-shadow-sm leading-relaxed">
            Add your details once and use them across government services.
          </p>

          {/* Stepper */}
          <div className="flex items-center gap-2 mb-8 px-1">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full h-1 bg-emerald-500 rounded-full mb-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <div className="flex items-center gap-1.5 text-emerald-400 drop-shadow-sm">
                <CheckCircle2 size={12} className="fill-emerald-500 text-white" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Account</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full h-1 bg-white/30 rounded-full mb-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
              <div className="flex items-center gap-1.5 text-white drop-shadow-sm">
                <div className="w-3 h-3 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full h-1 bg-white/20 rounded-full mb-2" />
              <div className="flex items-center gap-1.5 text-white/50">
                <div className="w-3 h-3 rounded-full border-2 border-white/40" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Identity</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            
            {/* PERSONAL INFORMATION */}
            <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-xl">
              <h2 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold text-white/90 block mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-white/90 block mb-1.5">Date of Birth *</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pr-10 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all [&::-webkit-calendar-picker-indicator]:opacity-0"
                    />
                    <Calendar size={16} className="absolute right-3.5 top-3.5 text-white/60 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-white/90 block mb-1.5">Gender</label>
                  <div className="relative">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pr-10 text-sm text-white outline-none focus:border-white focus:bg-white/20 transition-all appearance-none"
                    >
                      <option value="" className="text-slate-800">Select gender</option>
                      <option value="male" className="text-slate-800">Male</option>
                      <option value="female" className="text-slate-800">Female</option>
                      <option value="other" className="text-slate-800">Other</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-white/60 pointer-events-none" />
                  </div>
                </div>
              </div>
            </section>

            {/* CONTACT INFORMATION */}
            <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-xl">
              <h2 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3.5 rounded-xl">
                  <div>
                    <p className="text-[10px] text-white/60 font-medium mb-0.5">Mobile Number</p>
                    <p className="text-sm text-white font-medium">+91 98765 43210</p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wide">Verified</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3.5 rounded-xl">
                  <div>
                    <p className="text-[10px] text-white/60 font-medium mb-0.5">Email Address</p>
                    <p className="text-sm text-white font-medium">citizen@example.com</p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wide">Verified</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ADDRESS */}
            <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-xl">
              <h2 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-4">Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold text-white/90 block mb-1.5">State *</label>
                  <div className="relative">
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pr-10 text-sm text-white outline-none focus:border-white focus:bg-white/20 transition-all appearance-none"
                    >
                      <option value="" className="text-slate-800">Select your state</option>
                      <option value="maharashtra" className="text-slate-800">Maharashtra</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-white/60 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-white/90 block mb-1.5">District *</label>
                  <div className="relative">
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-3 pr-10 text-sm text-white outline-none focus:border-white focus:bg-white/20 transition-all appearance-none"
                    >
                      <option value="" className="text-slate-800">Select your district</option>
                      <option value="mumbai" className="text-slate-800">Mumbai</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 top-3.5 text-white/60 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-white/90 block mb-1.5">City / Village *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city or village"
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-white/90 block mb-1.5">PIN Code *</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN code"
                    maxLength={6}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white placeholder-white/50 outline-none focus:border-white focus:bg-white/20 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* CONNECT IDENTITY */}
            <section className="bg-gradient-to-br from-[#0d599f]/40 to-indigo-900/40 backdrop-blur-md border border-[#0d599f]/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden mt-4">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="text-8xl">🇮🇳</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🇮🇳</span>
                  <h2 className="text-xs font-bold text-white uppercase tracking-widest">Connect Government Identity</h2>
                </div>
                <p className="text-xs text-blue-100/80 mb-5 leading-relaxed pr-6">
                  Link your verified government identity for eligible government services.
                </p>
                <button 
                  onClick={() => navigate('/gov-login')}
                  className="bg-white text-[#0d599f] px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2 active:scale-95"
                >
                  Connect Now <ArrowRight size={14} />
                </button>
                <p className="text-[10px] text-blue-200/60 mt-4 italic">
                  You can connect your identity later.
                </p>
              </div>
            </section>
            
            <div className="space-y-4 pt-6">
              <button 
                onClick={() => navigate('/gov-login')}
                className="w-full py-4 px-4 bg-white hover:bg-slate-50 text-[#0d599f] font-extrabold text-sm rounded-xl transition active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
              >
                SAVE & CONTINUE <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => navigate('/gov-login')}
                className="w-full py-3 px-4 text-white/70 hover:text-white font-semibold text-xs rounded-xl transition-colors"
              >
                Skip for Now
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Tricolor bar ── */}
      <div className="absolute bottom-0 left-0 w-full flex z-20 pointer-events-none">
        <div className="flex-1 h-1 bg-[#e07520]" />
        <div className="flex-1 h-1 bg-white" />
        <div className="flex-1 h-1 bg-[#047857]" />
      </div>
    </div>
  );
}

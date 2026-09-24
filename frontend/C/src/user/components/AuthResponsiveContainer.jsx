import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Sparkles, CheckCircle2, ChevronLeft, 
  Globe, Landmark, ArrowRight, Lock, FileCheck, Users
} from 'lucide-react';

/**
 * AuthResponsiveContainer — Universal responsive wrapper for all DOWLET1 Auth pages:
 * - On Mobile (<1024px): Full-screen mobile layout with compact header, glassmorphism, and tricolor footer.
 * - On Desktop (≥1024px): Grand split-screen portal with left Government of India showcase & right card container.
 * - Same code, converts in real-time when crossing 1024px threshold.
 */
export default function AuthResponsiveContainer({
  title,
  subtitle,
  children,
  showBackButton = false,
  onBack = null,
  maxWidth = 'max-w-md'
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  return (
    <div
      className="min-h-[100dvh] w-full bg-cover bg-center bg-no-repeat relative flex flex-col justify-between overflow-x-hidden"
      style={{ backgroundImage: `url('https://i.pinimg.com/736x/d1/eb/1a/d1eb1aed415bd2745a4e6c1a8aba837f.jpg')` }}
    >
      {/* ── Global Dark Scrim ── */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] z-0" />

      {/* ── Tricolor Top Strip (Desktop & Mobile) ── */}
      <div className="h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] w-full sticky top-0 z-30" />

      {/* ── Main Responsive Grid ── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100dvh-6px)]">
        
        {/* ════════════════════════════════════════════════════════════ */}
        {/* DESKTOP-ONLY LEFT SHOWCASE (lg:col-span-6 xl:col-span-7)     */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between p-10 xl:p-14 text-white relative border-r border-white/10 bg-gradient-to-br from-[#000080]/85 via-blue-950/90 to-slate-950/95">
          
          {/* Subtle decorative glow */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FF9933]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/95 p-1.5 shadow-lg flex items-center justify-center">
                <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-2xl tracking-wider text-white">DOWLET1</span>
                  <span className="text-[10px] font-bold bg-[#FF9933] text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Official Portal
                  </span>
                </div>
                <p className="text-xs text-white/70 tracking-wide font-medium">
                  One Platform for Unified Government Services
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white/90 backdrop-blur-md mb-8">
              <span>🇮🇳</span>
              <span>National Citizen Digital Identity Gateway • SIH Prototype</span>
            </div>
          </div>

          {/* Center: Pillars of DOWLET1 */}
          <div className="relative z-10 my-auto py-6 max-w-xl space-y-5">
            <h2 className="text-2xl xl:text-3xl font-extrabold text-white leading-tight">
              One Digital Identity.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-emerald-300">
                Thousands of Central & State Services.
              </span>
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Experience the next generation of citizen services in India. No more repeated form submissions, physical queues, or fragmented portals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  title: '1,200+ Unified Services',
                  desc: 'Central schemes, state certificates, education grants & subsidies.',
                  icon: Landmark,
                  color: 'text-orange-300',
                  bg: 'bg-orange-500/10'
                },
                {
                  title: 'Enter Once, Reuse Everywhere',
                  desc: 'Pre-verified data securely auto-fills across all applications.',
                  icon: FileCheck,
                  color: 'text-emerald-300',
                  bg: 'bg-emerald-500/10'
                },
                {
                  title: 'Aadhaar & DigiLocker Vault',
                  desc: 'Zero-knowledge encryption and seamless document verification.',
                  icon: Lock,
                  color: 'text-blue-300',
                  bg: 'bg-blue-500/10'
                },
                {
                  title: 'DOWLET1 AI Copilot',
                  desc: 'Instant eligibility matching, multilingual voice and chat guidance.',
                  icon: Sparkles,
                  color: 'text-amber-300',
                  bg: 'bg-amber-500/10'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${item.bg} ${item.color} shrink-0`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-[11px] text-white/60 leading-snug mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Trust Ticker */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
            <div className="flex items-center gap-6">
              <div>
                <p className="font-extrabold text-white text-base">1.2 Cr+</p>
                <p className="text-[10px] text-white/50">Verified Citizens</p>
              </div>
              <div className="w-px h-7 bg-white/20" />
              <div>
                <p className="font-extrabold text-white text-base">99.8%</p>
                <p className="text-[10px] text-white/50">Form Accuracy</p>
              </div>
              <div className="w-px h-7 bg-white/20" />
              <div>
                <p className="font-extrabold text-white text-base">100%</p>
                <p className="text-[10px] text-white/50">Data Sovereignty</p>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/home')} 
              className="text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1 hover:underline"
            >
              <span>Explore Portal</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* RIGHT COLUMN (OR FULL SCREEN ON MOBILE)                      */}
        {/* ════════════════════════════════════════════════════════════ */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-between p-4 sm:p-6 lg:p-10 xl:p-12 relative min-h-full overflow-y-auto">
          
          {/* Top Bar for Form Column */}
          <div className="flex items-center justify-between w-full mb-4">
            {showBackButton ? (
              <button 
                onClick={handleBack} 
                className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10 flex items-center gap-1 text-xs font-medium"
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
            ) : (
              <div className="w-8" />
            )}

            {/* Mobile-only header branding */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/95 p-1 shadow flex items-center justify-center">
                <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-base font-extrabold text-white tracking-widest uppercase">DOWLET1</span>
            </div>

            {/* Language / portal link */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/home')}
                className="hidden lg:flex items-center gap-1 text-xs font-medium text-white/70 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span>Portal Home</span>
                <ArrowRight size={12} />
              </button>
              <button className="flex items-center gap-1 text-xs font-medium text-white/70 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors">
                <Globe size={13} />
                <span>EN</span>
              </button>
            </div>
          </div>

          {/* Form Card Content Area */}
          <div className={`w-full ${maxWidth} mx-auto my-auto py-4`}>
            
            {/* Mobile Header Subtitle & Logo */}
            <div className="lg:hidden text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/95 p-2 shadow-lg flex items-center justify-center">
                <img src="/dowlet-logo.png" alt="DOWLET1 Logo" className="w-full h-full object-contain drop-shadow" />
              </div>
              <p className="text-xs text-white/80 font-medium leading-snug">
                One Platform for Unified Government Services
              </p>
              {title && (
                <h2 className="text-xl font-bold text-white mt-2 drop-shadow-md">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs text-white/70 mt-1">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Desktop Form Title inside card or above */}
            <div className="hidden lg:block mb-6 text-left">
              {title && (
                <h2 className="text-2xl font-bold text-white drop-shadow-md">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Children Container */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              {children}
            </div>

          </div>

          {/* Bottom compliance line */}
          <div className="text-center py-2 text-[10px] text-white/50">
            Protected by UIDAI & Digital Personal Data Protection (DPDP) Act 2023 Guidelines
          </div>

        </div>

      </div>

      {/* ── Tricolor Bottom Bar (Mobile & Desktop) ── */}
      <div className="h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] w-full sticky bottom-0 z-30 pointer-events-none" />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MahaSetuLogo } from '../components/Illustrations';

export default function Splash() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade-in animation
    const show = setTimeout(() => setVisible(true), 200);
    // Auto-navigate after 3 seconds
    const nav = setTimeout(() => navigate('/onboarding/1'), 3000);
    return () => {
      clearTimeout(show);
      clearTimeout(nav);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-white relative overflow-hidden">
      {/* ── Decorative background shapes ── */}
      {/* Top-right saffron blob */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-orange-200/60 to-orange-100/30 blur-2xl" />
      {/* Bottom-left green blob */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-200/50 to-emerald-100/20 blur-2xl" />
      {/* Subtle center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-50/40 blur-3xl" />

      {/* ── Main content ── */}
      <div
        className={`z-10 flex flex-col items-center transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Logo */}
        <div className="mb-6">
          <MahaSetuLogo size={140} />
        </div>

        {/* App name */}
        <h1 className="text-4xl font-extrabold text-[#0d599f] tracking-tight mb-1">
          MahaSetu
        </h1>

        {/* Tagline */}
        <p className="text-[#047857] text-center font-medium text-sm tracking-wide">
          One citizen. One connected experience.
        </p>
      </div>

      {/* ── Bottom accent bar ── */}
      <div className="absolute bottom-0 left-0 w-full flex">
        <div className="flex-1 h-1 bg-[#e07520]" />
        <div className="flex-1 h-1 bg-white" />
        <div className="flex-1 h-1 bg-[#047857]" />
      </div>
    </div>
  );
}

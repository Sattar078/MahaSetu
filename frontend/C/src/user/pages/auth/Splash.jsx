import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Splash() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const backgroundImage = 'https://i.pinimg.com/736x/d1/eb/1a/d1eb1aed415bd2745a4e6c1a8aba837f.jpg';

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
    <div
      className="splash flex flex-col items-center justify-center min-h-[100dvh] bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-slate-950/55" />

      {/* ── Main content ── */}
      <div
        className={`z-10 flex flex-col items-center transition-all duration-1000 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img src="/dowlet-logo.png" alt="Dowlet Logo" className="w-[140px] h-auto object-contain drop-shadow-xl" />
        </div>

        {/* App name */}
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-1 drop-shadow-md">
          dowlet1
        </h1>

        {/* Tagline */}
        <p className="text-white/90 text-center font-medium text-sm tracking-wide drop-shadow">
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

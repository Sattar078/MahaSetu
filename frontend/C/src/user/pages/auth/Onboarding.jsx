import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

/* ─── Step data ─── */
const steps = [
  {
    step: 1,
    title: 'Government services,\nconnected.',
    description: 'Access and manage government services from one connected experience.',
  },
  {
    step: 2,
    title: 'No repeated\ninformation.',
    description: 'Reuse verified information securely instead of submitting the same details repeatedly.',
  },
  {
    step: 3,
    title: 'Track everything\nin one place.',
    description: 'Follow your applications across departments with one unified status.',
  },
];

const BG_IMAGE = "url('https://i.pinimg.com/736x/d1/eb/1a/d1eb1aed415bd2745a4e6c1a8aba837f.jpg')";

/* ─── Ashoka Chakra SVG ─── */
function AshokaChakra({ spinning }) {
  const spokes = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i * 360) / 24;
    const rad   = (angle * Math.PI) / 180;
    return {
      x1: 50 + 8  * Math.cos(rad),
      y1: 50 + 8  * Math.sin(rad),
      x2: 50 + 42 * Math.cos(rad),
      y2: 50 + 42 * Math.sin(rad),
    };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-20 h-20 ${spinning ? 'chakra-spin' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" stroke="#0d599f" strokeWidth="4" fill="none" />
      {/* Hub */}
      <circle cx="50" cy="50" r="6" fill="#0d599f" />
      {/* 24 spokes */}
      {spokes.map((s, i) => (
        <line
          key={i}
          x1={s.x1} y1={s.y1}
          x2={s.x2} y2={s.y2}
          stroke="#0d599f"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export default function Onboarding() {
  const { step }   = useParams();
  const navigate   = useNavigate();

  const currentStep = Math.min(Math.max(parseInt(step) || 1, 1), 3);
  const data        = steps[currentStep - 1];

  /* ── Transition state ── */
  const [phase, setPhase]     = useState('enter'); // 'enter' | 'exit'
  const [display, setDisplay] = useState(data);    // what's currently shown
  const pendingNav            = useRef(null);

  /* When step URL changes → exit → swap → enter */
  useEffect(() => {
    if (display.step === currentStep) {
      setPhase('enter');
      return;
    }
    setPhase('exit');
    const t = setTimeout(() => {
      setDisplay(data);
      setPhase('enter');
    }, 320); // matches .ob-exit duration
    return () => clearTimeout(t);
  }, [currentStep]); // eslint-disable-line

  /* ── Chakra click state ── */
  const [spinning, setSpinning] = useState(false);

  const handleChakraClick = () => {
    if (spinning) return;
    setSpinning(true);
    // navigate after spin completes (0.7s)
    pendingNav.current = setTimeout(() => {
      setSpinning(false);
      if (currentStep < 3) {
        navigate(`/onboarding/${currentStep + 1}`);
      } else {
        navigate('/login');
      }
    }, 750);
  };

  useEffect(() => () => clearTimeout(pendingNav.current), []);

  const isLast = currentStep === 3;

  return (
    <div
      className="relative flex flex-col min-h-[100dvh] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: BG_IMAGE }}
    >
      {/* ── Dark scrim for legibility ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col min-h-[100dvh] px-6 pt-12 pb-10">

        {/* Skip */}
        <div className="flex justify-end mb-auto">
          {!isLast && (
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-white/70 hover:text-white transition"
            >
              Skip
            </button>
          )}
        </div>

        {/* ── Animated text block ── */}
        <div
          key={currentStep}
          className={phase === 'enter' ? 'ob-enter' : 'ob-exit'}
          style={{ marginTop: 'auto', marginBottom: '2rem' }}
        >
          <h2 className="text-3xl font-extrabold text-white leading-tight mb-4 whitespace-pre-line drop-shadow-lg">
            {display.title}
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-xs">
            {display.description}
          </p>
        </div>

        {/* ── Step dots ── */}
        <div className="flex gap-2 mb-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className={`h-[3px] rounded-full transition-all duration-400 ${
                currentStep === s.step ? 'w-8 bg-white' : 'w-3 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* ── Chakra button ── */}
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-xs font-medium tracking-widest uppercase">
            {isLast ? 'Get Started' : `Step ${currentStep} of 3`}
          </span>

          <button
            onClick={handleChakraClick}
            aria-label={isLast ? 'Get Started' : 'Next'}
            className="flex items-center justify-center w-20 h-20 rounded-full
                       bg-white border border-white/60
                       hover:bg-white/90 active:scale-95
                       transition-all duration-200 focus:outline-none shadow-xl"
          >
            <AshokaChakra spinning={spinning} />
          </button>
        </div>

      </div>

      {/* ── Tricolor bar ── */}
      <div className="absolute bottom-0 left-0 w-full flex z-20">
        <div className="flex-1 h-1 bg-[#e07520]" />
        <div className="flex-1 h-1 bg-white" />
        <div className="flex-1 h-1 bg-[#047857]" />
      </div>
    </div>
  );
}

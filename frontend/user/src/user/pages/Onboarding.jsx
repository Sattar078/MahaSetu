import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PrimaryButton } from '../components/Buttons';
import {
  OnboardingIllustration1,
  OnboardingIllustration2,
  OnboardingIllustration3,
} from '../components/Illustrations';

/* ─── Step data ─── */
const onboardingData = [
  {
    step: 1,
    title: 'Government services, connected.',
    description:
      'Access and manage government services from one connected experience.',
    Illustration: OnboardingIllustration1,
    buttonText: 'Next',
    bgColor: 'bg-blue-50/60',
  },
  {
    step: 2,
    title: 'No repeated information.',
    description:
      'Reuse verified information securely instead of submitting the same details repeatedly.',
    Illustration: OnboardingIllustration2,
    buttonText: 'Next',
    bgColor: 'bg-orange-50/60',
  },
  {
    step: 3,
    title: 'Track everything in one place.',
    description:
      'Follow your applications across departments with one unified status.',
    Illustration: OnboardingIllustration3,
    buttonText: 'Get Started',
    bgColor: 'bg-emerald-50/60',
  },
];

export default function Onboarding() {
  const { step } = useParams();
  const navigate = useNavigate();

  const currentStep = parseInt(step) || 1;
  const data = onboardingData[currentStep - 1] || onboardingData[0];
  const Illustration = data.Illustration;

  /* simple slide-in animation key */
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(false);
    const t = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(t);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 3) {
      navigate(`/onboarding/${currentStep + 1}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      {/* ── Top bar ── */}
      <div className="flex justify-end items-center px-5 pt-5 pb-2">
        {currentStep < 3 && (
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition"
          >
            Skip
          </button>
        )}
      </div>

      {/* ── Illustration area ── */}
      <div
        className={`flex-[1.6] flex items-center justify-center mx-4 rounded-3xl ${data.bgColor} transition-colors duration-500`}
      >
        <div
          className={`transition-all duration-500 ease-out ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Illustration />
        </div>
      </div>

      {/* ── Text + Controls ── */}
      <div className="flex-1 flex flex-col justify-between px-6 pt-8 pb-8">
        {/* Text block */}
        <div
          className={`text-center transition-all duration-500 delay-100 ease-out ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-snug">
            {data.title}
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed px-2">
            {data.description}
          </p>
        </div>

        {/* Pagination + Button */}
        <div className="mt-auto">
          {/* Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-400 ${
                  currentStep === i
                    ? 'w-8 bg-[#0d599f]'
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Action button */}
          <PrimaryButton onClick={handleNext}>
            {data.buttonText}
          </PrimaryButton>
        </div>
      </div>

      {/* ── Bottom accent bar ── */}
      <div className="flex">
        <div className="flex-1 h-1 bg-[#e07520]" />
        <div className="flex-1 h-1 bg-white" />
        <div className="flex-1 h-1 bg-[#047857]" />
      </div>
    </div>
  );
}

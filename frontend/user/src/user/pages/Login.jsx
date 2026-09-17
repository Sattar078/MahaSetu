import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { MahaSetuLogo } from '../components/Illustrations';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { FormInput } from '../components/FormInput';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      {/* ── Top section ── */}
      <div className="flex flex-col items-center pt-12 pb-6 px-6">
        <MahaSetuLogo size={80} />
        <h1 className="text-xl font-bold text-[#0d599f] mt-3 mb-0.5">
          Welcome to MahaSetu
        </h1>
        <p className="text-xs text-slate-500">
          One citizen. One connected experience.
        </p>
      </div>

      {/* ── Form section ── */}
      <div className="flex-1 px-6 flex flex-col">
        <div className="mb-6">
          <FormInput
            label="Mobile Number"
            type="tel"
            placeholder="Enter mobile number"
            rightIcon={Phone}
          />
        </div>

        <PrimaryButton onClick={() => navigate('/otp-verify')}>
          Continue
        </PrimaryButton>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-3 text-xs text-slate-400 font-medium">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <SecondaryButton onClick={() => navigate('/gov-login')}>
          Use Government Identity
        </SecondaryButton>

        <p className="text-center text-[10px] text-slate-400 mt-6 px-4 leading-relaxed">
          Your information is protected and shared only with your consent.
        </p>
      </div>

      {/* ── Bottom accent ── */}
      <div className="flex mt-auto">
        <div className="flex-1 h-1 bg-[#e07520]" />
        <div className="flex-1 h-1 bg-white" />
        <div className="flex-1 h-1 bg-[#047857]" />
      </div>
    </div>
  );
}

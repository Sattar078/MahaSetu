import { useNavigate } from 'react-router-dom';
import { MahaSetuLogo } from '../components/Illustrations';
import { PrimaryButton } from '../components/Buttons';
import { FormInput } from '../components/FormInput';

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <div className="flex flex-col items-center pt-10 pb-4 px-6">
        <MahaSetuLogo size={60} />
        <h1 className="text-lg font-bold text-[#0d599f] mt-2">Create Account</h1>
      </div>

      <div className="flex-1 px-6 flex flex-col gap-4">
        <FormInput label="Full Name" placeholder="Enter your name" />
        <FormInput label="Mobile Number" type="tel" placeholder="Enter mobile number" />
        <FormInput label="Email (optional)" type="email" placeholder="Enter email" />

        <div className="mt-4">
          <PrimaryButton onClick={() => navigate('/login')}>
            Sign Up
          </PrimaryButton>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-[#0d599f] font-semibold">
            Log In
          </button>
        </p>
      </div>

      <div className="flex mt-auto">
        <div className="flex-1 h-1 bg-[#e07520]" />
        <div className="flex-1 h-1 bg-white" />
        <div className="flex-1 h-1 bg-[#047857]" />
      </div>
    </div>
  );
}

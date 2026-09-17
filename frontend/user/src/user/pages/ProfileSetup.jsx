import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { AppHeader } from '../components/Navigation';
import { PrimaryButton } from '../components/Buttons';
import { FormInput, FormSelect } from '../components/FormInput';

export default function ProfileSetup() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <AppHeader title="" onBack={() => navigate(-1)} />

      <div className="flex-1 px-6 pt-6 flex flex-col">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Complete Your Profile</h2>
        <p className="text-xs text-slate-500 mb-8">Help us personalize your experience.</p>

        <div className="space-y-5">
          <FormInput label="Full Name" placeholder="Enter your name" />
          <FormInput label="Date of Birth" type="date" placeholder="DD/MM/YYYY" rightIcon={Calendar} />
          <FormSelect
            label="Gender"
            options={[
              { value: '', label: 'Select gender' },
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </div>

        <div className="mt-auto pb-8">
          <PrimaryButton onClick={() => navigate('/home')}>
            Continue
          </PrimaryButton>
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 h-1 bg-[#e07520]" />
        <div className="flex-1 h-1 bg-white" />
        <div className="flex-1 h-1 bg-[#047857]" />
      </div>
    </div>
  );
}

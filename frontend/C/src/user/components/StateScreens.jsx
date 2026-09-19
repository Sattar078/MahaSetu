import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from './Buttons';
import { AlertTriangle, FolderOpen } from 'lucide-react';

/**
 * Empty State — shown when no data (e.g. no applications yet).
 */
export const EmptyState = ({ title = "No applications yet", description = "Start your journey by exploring available services.", buttonText = "Explore Services", onAction }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
        <FolderOpen size={40} className="text-[#0d599f] opacity-60" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">{title}</h3>
      <p className="text-sm text-slate-500 text-center mb-8 leading-relaxed">{description}</p>
      <PrimaryButton onClick={onAction || (() => navigate('/services'))} className="max-w-xs">
        {buttonText}
      </PrimaryButton>
    </div>
  );
};

/**
 * Error State — shown on failures.
 */
export const ErrorState = ({ title = "Something went wrong", description = "Please try again or check your connection.", onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-8">
    <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6">
      <AlertTriangle size={40} className="text-red-500" />
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">{title}</h3>
    <p className="text-sm text-slate-500 text-center mb-8 leading-relaxed">{description}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm rounded-xl transition active:scale-[0.98]"
      >
        Try Again
      </button>
    )}
  </div>
);

import React from 'react';
import { ChevronDown, Search } from 'lucide-react';

/**
 * Standard Text / Date / Number Input
 */
export const FormInput = ({ label, rightIcon: RightIcon, ...props }) => (
  <div className="w-full">
    {label && <label className="text-xs font-semibold text-slate-700 block mb-1">{label}</label>}
    <div className="relative">
      <input
        className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0d599f]"
        {...props}
      />
      {RightIcon && <RightIcon size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />}
    </div>
  </div>
);

/**
 * Styled Select Dropdown
 */
export const FormSelect = ({ label, options = [], ...props }) => (
  <div className="w-full">
    {label && <label className="text-xs font-semibold text-slate-700 block mb-1">{label}</label>}
    <div className="relative">
      <select
        className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-[#0d599f] bg-white appearance-none text-slate-700"
        {...props}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
    </div>
  </div>
);

/**
 * Global Search Bar
 */
export const SearchBar = ({ placeholder = "What government service do you need?", ...props }) => (
  <div className="flex items-center px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0d599f]">
    <Search size={14} className="text-slate-400 mr-2 shrink-0" />
    <input
      type="text"
      placeholder={placeholder}
      className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-medium"
      {...props}
    />
  </div>
);

/**
 * 6-Digit Verification Code Inputs
 */
export const OtpInputRow = ({ length = 6, onChange = () => {} }) => (
  <div className="flex justify-between gap-2 my-4">
    {Array.from({ length }).map((_, i) => (
      <input
        key={i}
        type="text"
        maxLength={1}
        className="w-11 h-12 text-center text-base font-bold border border-slate-200 rounded-lg focus:border-[#0d599f] outline-none"
        onChange={(e) => onChange(i, e.target.value)}
      />
    ))}
  </div>
);

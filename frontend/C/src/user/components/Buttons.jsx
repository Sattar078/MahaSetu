import React from 'react';

/**
 * Primary Blue Action Button
 */
export const PrimaryButton = ({ children, className = '', ...props }) => (
  <button
    className={`w-full py-3.5 px-4 bg-[#0d599f] hover:bg-[#094680] text-white font-semibold text-sm tracking-wide rounded-xl transition active:scale-[0.98] disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

/**
 * Secondary Blue Outline Button
 */
export const SecondaryButton = ({ children, className = '', ...props }) => (
  <button
    className={`w-full py-3.5 px-4 border-2 border-[#0d599f] text-[#0d599f] font-semibold text-sm rounded-xl hover:bg-blue-50 transition active:scale-[0.98] ${className}`}
    {...props}
  >
    {children}
  </button>
);

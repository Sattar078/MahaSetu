import React from 'react';

/**
 * dowlet1 Logo
 */
export const Dowlet1Logo = ({ size = 120, className = "" }) => (
  <img 
    src="/dowlet-logo.png" 
    alt="Logo" 
    style={{ width: size, height: 'auto' }}
    className={`object-contain ${className}`}
  />
);

/**
 * Onboarding 1 Illustration — Government services connected
 * Shows a bridge connecting government buildings, people, and devices
 */
export const OnboardingIllustration1 = () => (
  <svg width="260" height="220" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background circle */}
    <circle cx="160" cy="125" r="110" fill="#EFF6FF" />
    
    {/* Government building — left */}
    <rect x="45" y="100" width="70" height="65" rx="4" fill="#0d599f" />
    <rect x="55" y="85" width="50" height="20" rx="2" fill="#0d599f" />
    <polygon points="55,85 80,68 105,85" fill="#094680" />
    {/* Building windows */}
    <rect x="55" y="110" width="12" height="14" rx="2" fill="#fff" opacity="0.9" />
    <rect x="74" y="110" width="12" height="14" rx="2" fill="#fff" opacity="0.9" />
    <rect x="93" y="110" width="12" height="14" rx="2" fill="#fff" opacity="0.9" />
    <rect x="55" y="132" width="12" height="14" rx="2" fill="#fff" opacity="0.7" />
    <rect x="74" y="132" width="12" height="14" rx="2" fill="#fff" opacity="0.7" />
    <rect x="93" y="132" width="12" height="14" rx="2" fill="#fff" opacity="0.7" />
    {/* Door */}
    <rect x="72" y="148" width="16" height="17" rx="8" fill="#fff" opacity="0.5" />
    {/* Pillar detail */}
    <rect x="77" y="72" width="6" height="14" fill="#e07520" />
    <circle cx="80" cy="70" r="5" fill="#e07520" />

    {/* Bridge connecting */}
    <rect x="115" y="138" width="90" height="8" rx="4" fill="#e07520" />
    <path d="M120 138 Q160 110 200 138" stroke="#0d599f" strokeWidth="3" fill="none" />
    <line x1="140" y1="125" x2="140" y2="138" stroke="#0d599f" strokeWidth="2" />
    <line x1="160" y1="118" x2="160" y2="138" stroke="#0d599f" strokeWidth="2" />
    <line x1="180" y1="125" x2="180" y2="138" stroke="#0d599f" strokeWidth="2" />
    
    {/* Person — right side */}
    <circle cx="240" cy="108" r="16" fill="#fde8cd" />
    <rect x="228" y="128" width="24" height="32" rx="8" fill="#0d599f" />
    
    {/* Phone in hand */}
    <rect x="254" y="132" width="16" height="26" rx="3" fill="#1e3a5f" />
    <rect x="256" y="135" width="12" height="18" rx="1" fill="#bfdbfe" />
    
    {/* Checkmark badges */}
    <circle cx="140" cy="90" r="14" fill="#047857" />
    <path d="M133 90 L138 95 L147 86" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    
    <circle cx="220" cy="170" r="10" fill="#047857" />
    <path d="M215 170 L218 173 L225 166" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Small floating docs */}
    <rect x="210" y="85" width="18" height="22" rx="3" fill="#fff" stroke="#cbd5e1" strokeWidth="1" />
    <line x1="214" y1="92" x2="224" y2="92" stroke="#cbd5e1" strokeWidth="1" />
    <line x1="214" y1="97" x2="222" y2="97" stroke="#cbd5e1" strokeWidth="1" />
    <line x1="214" y1="102" x2="220" y2="102" stroke="#cbd5e1" strokeWidth="1" />
    
    {/* Ground line */}
    <rect x="30" y="165" width="260" height="4" rx="2" fill="#e2e8f0" />
    
    {/* Small trees */}
    <circle cx="55" cy="172" r="3" fill="#047857" opacity="0.4" />
    <rect x="54" y="175" width="2" height="6" fill="#047857" opacity="0.3" />
    <circle cx="268" cy="172" r="3" fill="#047857" opacity="0.4" />
    <rect x="267" y="175" width="2" height="6" fill="#047857" opacity="0.3" />
  </svg>
);

/**
 * Onboarding 2 Illustration — No repeated information
 * Shows documents with shield / verified reuse concept
 */
export const OnboardingIllustration2 = () => (
  <svg width="260" height="220" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background circle */}
    <circle cx="160" cy="125" r="110" fill="#FFF7ED" />
    
    {/* Large shield in center */}
    <path d="M160 55 L210 80 L210 140 Q210 180 160 200 Q110 180 110 140 L110 80 Z" fill="#0d599f" opacity="0.1" />
    <path d="M160 65 L200 85 L200 135 Q200 170 160 185 Q120 170 120 135 L120 85 Z" fill="#0d599f" opacity="0.15" />
    <path d="M160 75 L190 90 L190 130 Q190 158 160 170 Q130 158 130 130 L130 90 Z" fill="#0d599f" />
    
    {/* Shield checkmark */}
    <path d="M145 125 L155 135 L178 112" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    
    {/* Document left */}
    <g transform="rotate(-12, 75, 110)">
      <rect x="55" y="80" width="50" height="65" rx="4" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="62" y="90" width="30" height="3" rx="1" fill="#cbd5e1" />
      <rect x="62" y="98" width="36" height="3" rx="1" fill="#cbd5e1" />
      <rect x="62" y="106" width="24" height="3" rx="1" fill="#cbd5e1" />
      <rect x="62" y="118" width="30" height="3" rx="1" fill="#e2e8f0" />
      <rect x="62" y="126" width="36" height="3" rx="1" fill="#e2e8f0" />
      {/* Verified badge on doc */}
      <circle cx="95" cy="133" r="8" fill="#047857" />
      <path d="M91 133 L93 135 L99 129" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    
    {/* Document right */}
    <g transform="rotate(10, 245, 110)">
      <rect x="225" y="80" width="50" height="65" rx="4" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="232" y="90" width="30" height="3" rx="1" fill="#cbd5e1" />
      <rect x="232" y="98" width="36" height="3" rx="1" fill="#cbd5e1" />
      <rect x="232" y="106" width="24" height="3" rx="1" fill="#cbd5e1" />
      <rect x="232" y="118" width="30" height="3" rx="1" fill="#e2e8f0" />
      <rect x="232" y="126" width="36" height="3" rx="1" fill="#e2e8f0" />
      {/* Verified badge on doc */}
      <circle cx="265" cy="133" r="8" fill="#047857" />
      <path d="M261 133 L263 135 L269 129" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    
    {/* Arrows showing reuse — left doc to shield */}
    <path d="M95 115 Q120 100 130 105" stroke="#e07520" strokeWidth="2" strokeDasharray="4 3" fill="none" markerEnd="url(#arrowOB2)" />
    {/* Arrow — shield to right doc */}
    <path d="M190 105 Q200 100 225 115" stroke="#e07520" strokeWidth="2" strokeDasharray="4 3" fill="none" />
    
    {/* Cross marks on duplicate */}
    <g opacity="0.5">
      <circle cx="80" cy="195" r="14" fill="#fecaca" />
      <line x1="74" y1="189" x2="86" y2="201" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="86" y1="189" x2="74" y2="201" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <rect x="100" y="186" width="35" height="5" rx="2" fill="#e2e8f0" />
    <rect x="100" y="196" width="28" height="4" rx="2" fill="#f1f5f9" />
    
    {/* Lock icon */}
    <rect x="250" y="185" width="18" height="14" rx="3" fill="#0d599f" />
    <path d="M254 185 V180 Q259 172 264 180 V185" stroke="#0d599f" strokeWidth="2.5" fill="none" />
    <circle cx="259" cy="192" r="2" fill="white" />
  </svg>
);

/**
 * Onboarding 3 Illustration — Track everything in one place
 * Shows a unified dashboard/tracker with multiple status items
 */
export const OnboardingIllustration3 = () => (
  <svg width="260" height="220" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background circle */}
    <circle cx="160" cy="125" r="110" fill="#ECFDF5" />
    
    {/* Central phone/tablet frame */}
    <rect x="110" y="55" width="100" height="160" rx="12" fill="#1e3a5f" />
    <rect x="115" y="65" width="90" height="138" rx="6" fill="#fff" />
    
    {/* Phone notch */}
    <rect x="145" y="57" width="30" height="4" rx="2" fill="#334155" />
    
    {/* Status card 1 — approved (green) */}
    <rect x="122" y="75" width="76" height="28" rx="4" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
    <circle cx="134" cy="89" r="6" fill="#047857" />
    <path d="M131 89 L133 91 L137 87" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="144" y="82" width="40" height="3" rx="1" fill="#047857" opacity="0.7" />
    <rect x="144" y="89" width="30" height="3" rx="1" fill="#86efac" />
    
    {/* Status card 2 — in progress (blue) */}
    <rect x="122" y="109" width="76" height="28" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
    <circle cx="134" cy="123" r="6" fill="#0d599f" />
    <rect x="131" y="121" width="6" height="4" rx="1" fill="white" />
    <rect x="144" y="116" width="40" height="3" rx="1" fill="#0d599f" opacity="0.7" />
    <rect x="144" y="123" width="30" height="3" rx="1" fill="#93c5fd" />
    
    {/* Status card 3 — pending (orange) */}
    <rect x="122" y="143" width="76" height="28" rx="4" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
    <circle cx="134" cy="157" r="6" fill="#e07520" />
    <rect x="132" y="155" width="4" height="5" rx="1" fill="white" />
    <rect x="144" y="150" width="40" height="3" rx="1" fill="#e07520" opacity="0.7" />
    <rect x="144" y="157" width="30" height="3" rx="1" fill="#fdba74" />
    
    {/* Progress bar at bottom of phone */}
    <rect x="125" y="180" width="70" height="5" rx="2.5" fill="#e2e8f0" />
    <rect x="125" y="180" width="45" height="5" rx="2.5" fill="#047857" />
    <text x="130" y="195" fontSize="7" fill="#64748b" fontFamily="sans-serif">3 of 5 complete</text>
    
    {/* Floating notification badges */}
    {/* Left notification */}
    <g transform="translate(50, 80)">
      <rect x="0" y="0" width="55" height="40" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <circle cx="14" cy="14" r="8" fill="#dbeafe" />
      <rect x="8" y="10" width="12" height="8" rx="1" fill="#0d599f" opacity="0.6" />
      <rect x="26" y="10" width="22" height="3" rx="1" fill="#94a3b8" />
      <rect x="26" y="17" width="16" height="3" rx="1" fill="#cbd5e1" />
      <rect x="6" y="30" width="42" height="3" rx="1" fill="#e2e8f0" />
    </g>
    
    {/* Right notification */}
    <g transform="translate(215, 100)">
      <rect x="0" y="0" width="55" height="40" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <circle cx="14" cy="14" r="8" fill="#dcfce7" />
      <path d="M10 14 L12 16 L18 10" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="26" y="10" width="22" height="3" rx="1" fill="#94a3b8" />
      <rect x="26" y="17" width="16" height="3" rx="1" fill="#cbd5e1" />
      <rect x="6" y="30" width="42" height="3" rx="1" fill="#e2e8f0" />
    </g>
    
    {/* Connection lines from notifications to phone */}
    <path d="M105 100 L115 100" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />
    <path d="M215 120 L205 120" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 2" />
    
    {/* Bottom decorative dots */}
    <circle cx="80" cy="200" r="4" fill="#0d599f" opacity="0.15" />
    <circle cx="240" cy="190" r="6" fill="#e07520" opacity="0.15" />
    <circle cx="260" cy="210" r="3" fill="#047857" opacity="0.15" />
    <circle cx="60" cy="180" r="3" fill="#047857" opacity="0.2" />
  </svg>
);

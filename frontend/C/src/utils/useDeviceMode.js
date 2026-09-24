import { useState, useEffect } from 'react';

/**
 * useDeviceMode — returns 'mobile' or 'desktop'
 * 
 * Desktop: viewport ≥ 1024px AND not in PWA standalone mode
 * Mobile: viewport < 1024px OR in PWA standalone mode (installed on homescreen)
 * 
 * Listens for live resize and display-mode changes.
 */
export default function useDeviceMode() {
  const [mode, setMode] = useState(() => getMode());

  useEffect(() => {
    const mqWidth = window.matchMedia('(min-width: 1024px)');
    const mqStandalone = window.matchMedia('(display-mode: standalone)');

    const update = () => setMode(getMode());

    mqWidth.addEventListener('change', update);
    mqStandalone.addEventListener('change', update);
    window.addEventListener('resize', update);

    return () => {
      mqWidth.removeEventListener('change', update);
      mqStandalone.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return mode;
}

function getMode() {
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  if (isStandalone) return 'mobile'; // PWA always mobile

  return window.innerWidth >= 1024 ? 'desktop' : 'mobile';
}

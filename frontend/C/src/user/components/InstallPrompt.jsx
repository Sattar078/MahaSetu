import { useEffect, useState } from 'react';

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
}

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState(null);
  const [visible, setVisible] = useState(() => !isStandalone() && isIos());
  const [ios] = useState(isIos);

  useEffect(() => {
    if (isStandalone()) return undefined;
    const handleInstallAvailable = (event) => {
      event.preventDefault();
      setInstallEvent(event);
      setVisible(true);
    };
    const handleInstalled = () => setVisible(false);

    window.addEventListener('beforeinstallprompt', handleInstallAvailable);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallAvailable);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
  };

  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    setInstallEvent(null);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl md:inset-x-auto md:right-6 md:bottom-6" role="dialog" aria-label="Install dowlet1">
      <div className="flex items-start gap-3">
        <img src="/pwa-192.svg" alt="" className="h-12 w-12 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-slate-900">Install dowlet1</h2>
          {ios ? (
            <p className="mt-1 text-sm leading-5 text-slate-600">Tap Share, then choose <strong>Add to Home Screen</strong> for quick access.</p>
          ) : (
            <p className="mt-1 text-sm leading-5 text-slate-600">Keep citizen services one tap away on your home screen.</p>
          )}
        </div>
        <button type="button" onClick={dismiss} className="rounded-lg p-1 text-xl leading-none text-slate-400 hover:bg-slate-100" aria-label="Dismiss install prompt">&times;</button>
      </div>
      {!ios && <button type="button" onClick={install} className="mt-4 w-full rounded-xl bg-[#0f3d5e] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0b3049]">Install app</button>}
    </aside>
  );
}
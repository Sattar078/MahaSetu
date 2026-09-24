import { Navigate } from 'react-router-dom';
import useDeviceMode from '../../../utils/useDeviceMode';
import DesktopHome from '../desktop/DesktopHome';

export default function Landing() {
  const mode = useDeviceMode();

  // Desktop: show full website homepage
  if (mode === 'desktop') {
    return <DesktopHome />;
  }

  // Mobile / PWA: redirect to app splash screen
  return <Navigate to="/app" replace />;
}

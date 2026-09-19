import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNav } from './Navigation';

/**
 * MainLayout — wraps authenticated pages with the bottom tab bar.
 * Determines active tab from the current URL path.
 */
export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const p = location.pathname;
    if (p.startsWith('/services')) return 'services';
    if (p.startsWith('/applications') || p.startsWith('/apply')) return 'applications';
    if (p.startsWith('/profile') || p.startsWith('/privacy') || p.startsWith('/documents')) return 'profile';
    return 'home';
  };

  const handleTabChange = (tab) => {
    const routes = {
      home: '/home',
      services: '/services',
      applications: '/applications',
      profile: '/profile',
    };
    navigate(routes[tab]);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-black/40 backdrop-blur-[2px]">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <div className="sticky bottom-0 z-20 bg-white/10 backdrop-blur-md border-t border-white/20">
        <BottomNav activeTab={getActiveTab()} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}

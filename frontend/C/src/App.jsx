import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import InstallPrompt from "./user/components/InstallPrompt";

// Auth flow
import Splash from "./user/pages/auth/Splash";
import Onboarding from "./user/pages/auth/Onboarding";
import Login from "./user/pages/auth/Login";
import Signup from "./user/pages/auth/Signup";
import Landing from "./user/pages/auth/Landing";
import OtpVerification from "./user/pages/auth/OtpVerification";
import GovLogin from "./user/pages/auth/GovLogin";
import ProfileSetup from "./user/pages/auth/ProfileSetup";
import AuthSuccess from "./user/pages/auth/AuthSuccess";

// Main app
import Home from "./user/pages/home/Home";
import NeedDiscovery from "./user/pages/home/NeedDiscovery";
import SearchResults from "./user/pages/home/SearchResults";

// Services
import ServiceCategories from "./user/pages/services/ServiceCategories";
import ServiceList from "./user/pages/services/ServiceList";
import ServiceDetails from "./user/pages/services/ServiceDetails";
import EligibilityResult from "./user/pages/services/EligibilityResult";

// Application flow
import ApplicationForm from "./user/pages/applications/ApplicationForm";
import VerifiedInfo from "./user/pages/applications/VerifiedInfo";
import DocumentUpload from "./user/pages/applications/DocumentUpload";
import ConsentRequest from "./user/pages/applications/ConsentRequest";
import ApplicationReview from "./user/pages/applications/ApplicationReview";
import ApplicationSuccess from "./user/pages/applications/ApplicationSuccess";

// My Applications
import MyApplications from "./user/pages/applications/MyApplications";
import ApplicationDetail from "./user/pages/applications/ApplicationDetail";
import ApplicationStuck from "./user/pages/applications/ApplicationStuck";

// Documents
import DocumentWallet from "./user/pages/documents/DocumentWallet";
import DocumentDetail from "./user/pages/documents/DocumentDetail";

// Profile & Settings
import Notifications from "./user/pages/profile/Notifications";
import Profile from "./user/pages/profile/Profile";
import PrivacySecurity from "./user/pages/profile/PrivacySecurity";

function GlobalBackground() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home') {
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundColor = '#f8fafc';
    } else {
      document.body.style.backgroundImage = `url('https://i.pinimg.com/736x/d1/eb/1a/d1eb1aed415bd2745a4e6c1a8aba837f.jpg')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundRepeat = 'no-repeat';
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <GlobalBackground />
      <InstallPrompt />
      <Routes>
        {/* ── Auth flow ── */}
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Splash />} />
        <Route path="/onboarding/:step" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verify" element={<OtpVerification />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/gov-login" element={<GovLogin />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />

        {/* ── Home & Discovery ── */}
        <Route path="/home" element={<Home />} />
        <Route path="/discover" element={<NeedDiscovery />} />
        <Route path="/search" element={<SearchResults />} />

        {/* ── Services ── */}
        <Route path="/services" element={<ServiceCategories />} />
        <Route path="/services/:category" element={<ServiceList />} />
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/eligibility-result" element={<EligibilityResult />} />

        {/* ── Application flow ── */}
        <Route path="/apply/:serviceId" element={<ApplicationForm />} />
        <Route path="/apply/:serviceId/verified-info" element={<VerifiedInfo />} />
        <Route path="/apply/:serviceId/documents" element={<DocumentUpload />} />
        <Route path="/apply/:serviceId/consent" element={<ConsentRequest />} />
        <Route path="/apply/:serviceId/review" element={<ApplicationReview />} />
        <Route path="/apply/:serviceId/success" element={<ApplicationSuccess />} />

        {/* ── My Applications ── */}
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/applications/:id" element={<ApplicationDetail />} />
        <Route path="/applications/:id/status" element={<ApplicationStuck />} />

        {/* ── Documents ── */}
        <Route path="/documents" element={<DocumentWallet />} />
        <Route path="/documents/:id" element={<DocumentDetail />} />

        {/* ── Profile & Settings ── */}
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy" element={<PrivacySecurity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth flow
import Splash from "./user/pages/Splash";
import Onboarding from "./user/pages/Onboarding";
import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import Landing from "./user/pages/Landing";
import OtpVerification from "./user/pages/OtpVerification";
import GovLogin from "./user/pages/GovLogin";
import ProfileSetup from "./user/pages/ProfileSetup";

// Main app
import Home from "./user/pages/Home";
import NeedDiscovery from "./user/pages/NeedDiscovery";
import SearchResults from "./user/pages/SearchResults";

// Services
import ServiceCategories from "./user/pages/ServiceCategories";
import ServiceList from "./user/pages/ServiceList";
import ServiceDetails from "./user/pages/ServiceDetails";
import EligibilityResult from "./user/pages/EligibilityResult";

// Application flow
import ApplicationForm from "./user/pages/ApplicationForm";
import VerifiedInfo from "./user/pages/VerifiedInfo";
import DocumentUpload from "./user/pages/DocumentUpload";
import ConsentRequest from "./user/pages/ConsentRequest";
import ApplicationReview from "./user/pages/ApplicationReview";
import ApplicationSuccess from "./user/pages/ApplicationSuccess";

// My Applications
import MyApplications from "./user/pages/MyApplications";
import ApplicationDetail from "./user/pages/ApplicationDetail";
import ApplicationStuck from "./user/pages/ApplicationStuck";

// Documents
import DocumentWallet from "./user/pages/DocumentWallet";
import DocumentDetail from "./user/pages/DocumentDetail";

// Profile & Settings
import Notifications from "./user/pages/Notifications";
import Profile from "./user/pages/Profile";
import PrivacySecurity from "./user/pages/PrivacySecurity";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Auth flow ── */}
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Splash />} />
        <Route path="/onboarding/:step" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verify" element={<OtpVerification />} />
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

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { 
  ShieldCheck, User, Phone, MapPin, Award, CheckCircle2, 
  AlertCircle, ChevronRight, Edit3, ArrowRight, Lock, 
  Share2, FileText, ExternalLink, RefreshCw, X, Eye, 
  Check, Info, Sparkles, SlidersHorizontal, CheckSquare, 
  Building2, GraduationCap, FileCheck, ArrowUpRight
} from 'lucide-react';
import { 
  demoAPI, 
  getVerifiedInformation, 
  getInformationCategory, 
  updateInformation, 
  getConsentSettings, 
  updateConsentSetting, 
  getInformationUsage, 
  addInformationUsage 
} from '../../../utils/demoState';

export default function VerifiedInformation() {
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [verifiedInfo, setVerifiedInfo] = useState({});
  const [consentSettings, setConsentSettings] = useState({});
  const [informationUsage, setInformationUsage] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Modals
  const [viewCategoryModal, setViewCategoryModal] = useState(null); // 'personal' | 'contact' | 'address' | 'identity'
  const [editCategoryModal, setEditCategoryModal] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  
  const [eligibleServicesModalOpen, setEligibleServicesModalOpen] = useState(false);
  const [consentModalService, setConsentModalService] = useState(null); // service object
  const [manageConnectionModalOpen, setManageConnectionModalOpen] = useState(false);

  const consentSectionRef = useRef(null);

  const openEditModal = useCallback((catKey) => {
    const current = verifiedInfo[catKey] || {};
    setEditFormData({ ...current });
    setEditCategoryModal(catKey);
    setViewCategoryModal(null);
  }, [verifiedInfo]);

  // Load from central state
  useEffect(() => {
    demoAPI.init();
    loadAllData();

    // Check URL params for direct action (e.g. ?category=personal&action=edit)
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    const act = params.get('action');
    if (cat) {
      if (act === 'edit') {
        openEditModal(cat);
      } else {
        setViewCategoryModal(cat);
      }
    }
  }, [location.search, openEditModal]);

  const loadAllData = () => {
    const info = getVerifiedInformation();
    const consent = getConsentSettings();
    const usage = getInformationUsage();
    setVerifiedInfo(info);
    setConsentSettings(consent);
    setInformationUsage(usage);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle Save Form
  const handleSaveEdit = (e) => {
    e?.preventDefault();
    if (!editCategoryModal) return;

    setIsSaving(true);
    setTimeout(() => {
      updateInformation(editCategoryModal, editFormData);
      loadAllData();
      setIsSaving(false);
      setEditCategoryModal(null);
      showToast("✓ Information updated successfully.");
    }, 600);
  };

  // Handle Toggle Consent
  const handleToggleConsent = (key) => {
    const updatedVal = !consentSettings[key];
    const newSettings = updateConsentSetting(key, updatedVal);
    setConsentSettings(newSettings);
    showToast(`Data sharing setting updated to ${updatedVal ? 'ON' : 'OFF'}.`);
  };

  // Handle Allow & Continue from Consent Modal
  const handleAllowConsentAndContinue = () => {
    if (!consentModalService) return;
    
    // Record usage
    addInformationUsage(
      consentModalService.name, 
      consentModalService.reusedFields || ["Name", "Address", "Identity"]
    );
    loadAllData();

    const targetService = consentModalService;
    setConsentModalService(null);
    setEligibleServicesModalOpen(false);

    showToast("Information prepared for reuse. Continuing to application...");
    setTimeout(() => {
      navigate(`/apply/${targetService.id}?reuse=true`);
    }, 600);
  };

  // Calculate Verification Count
  const categoriesList = [
    { key: 'personal', label: 'Personal Information' },
    { key: 'contact', label: 'Contact Information' },
    { key: 'address', label: 'Address Information' },
    { key: 'identity', label: 'Identity Information' }
  ];

  const availableCount = categoriesList.filter(c => {
    const item = verifiedInfo[c.key];
    return item && item.statusType === 'verified';
  }).length;

  const personal = verifiedInfo.personal || {};
  const contact = verifiedInfo.contact || {};
  const address = verifiedInfo.address || {};
  const identity = verifiedInfo.identity || {};

  // Mock eligible services where info can be reused
  const eligibleServices = [
    {
      id: "scholarship",
      name: "Scholarship Application",
      dept: "Education Department",
      icon: "🎓",
      reusedFields: ["Name", "Date of Birth", "Address", "Education Information"],
      highlight: "Pre-fills student profile & domicile details"
    },
    {
      id: "income_certificate",
      name: "Income Certificate",
      dept: "Revenue Department",
      icon: "📄",
      reusedFields: ["Full Name", "Residential Address", "Identity Information"],
      highlight: "Reuses verified identity and address automatically"
    },
    {
      id: "residence_certificate",
      name: "Residence Certificate",
      dept: "Revenue Department",
      icon: "🏠",
      reusedFields: ["Full Name", "Residential Address", "Identity Information"],
      highlight: "Uses registered home district and state records"
    }
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50 relative pb-24">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-2 max-w-[90vw]">
          <CheckCircle2 size={16} className="text-[#138808] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header */}
      <AppHeader title="Verified Information" onBack={() => navigate(-1)} />

      {/* Main Container */}
      <div className="px-5 pt-4 pb-6 space-y-5 max-w-lg mx-auto w-full">

        {/* Subtitle */}
        <p className="text-xs text-slate-500 leading-relaxed -mt-1">
          Manage information that can be reused across eligible government services.
        </p>

        {/* Informational Card at the top */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100/80 rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-[#000080]">
              <div className="w-7 h-7 rounded-lg bg-blue-100/80 flex items-center justify-center font-bold text-sm">
                🔐
              </div>
              <h3 className="font-extrabold text-xs tracking-wider uppercase">Your Information</h3>
            </div>
            <span className="text-[9px] font-extrabold uppercase bg-blue-100/90 text-[#000080] px-2 py-0.5 rounded-md tracking-wider border border-blue-200">
              Official Records
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            "Your information is organized in one place so you don't have to enter the same details repeatedly."
          </p>
        </div>

        {/* 2. Verification Summary Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Verification Status</p>
              <h4 className="text-sm font-bold text-slate-800 mt-0.5">
                {availableCount} of 4 categories available
              </h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#138808] flex items-center justify-center font-bold text-xs border border-emerald-100 shadow-sm">
              100%
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3.5">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${(availableCount / 4) * 100}%` }}
            />
          </div>

          {/* 4 Category Checklist */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100 mb-3">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 size={13} className="text-[#138808] shrink-0" />
              <span>Personal Information</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 size={13} className="text-[#138808] shrink-0" />
              <span>Contact Information</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 size={13} className="text-[#138808] shrink-0" />
              <span>Address Information</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 size={13} className="text-[#138808] shrink-0" />
              <span>Identity Information</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic text-center">
            Verified citizen information • Available for eligible services
          </p>
        </div>

        {/* 3. Information Categories (4 Main Cards) */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Information Categories
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Click card to view or edit</span>
          </div>

          {/* Category 1: 👤 Personal Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF9933] flex items-center justify-center text-lg border border-orange-100">
                  👤
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{personal.title || "Personal Information"}</h4>
                  <p className="text-[11px] text-slate-500">Name, DOB, Gender, State, District</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-[#138808] border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                <CheckCircle2 size={11} />
                <span>{personal.status || "Verified"}</span>
              </span>
            </div>

            {/* Field highlights */}
            <div className="bg-slate-50/80 rounded-xl p-2.5 mb-3 text-xs grid grid-cols-2 gap-2 border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Full Name</span>
                <p className="font-bold text-slate-800 truncate">{personal.fullName || "Rahul Kumar"}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Date of Birth</span>
                <p className="font-semibold text-slate-700">{personal.dob || "15 May 2005"}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Gender</span>
                <p className="font-semibold text-slate-700">{personal.gender || "Male"}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">District & State</span>
                <p className="font-semibold text-slate-700 truncate">{personal.district || "Jaipur"}, {personal.state || "Rajasthan"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 pt-2.5">
              <button 
                onClick={() => setViewCategoryModal('personal')}
                className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 text-center transition-colors flex items-center justify-center gap-1"
              >
                <Eye size={12} />
                <span>View Details</span>
              </button>
              <button 
                onClick={() => openEditModal('personal')}
                className="flex-1 py-1.5 px-3 bg-[#000080]/5 hover:bg-[#000080]/10 text-[#000080] font-bold text-xs rounded-xl border border-blue-200 text-center transition-colors flex items-center justify-center gap-1"
              >
                <Edit3 size={12} />
                <span>Update Information</span>
              </button>
            </div>
          </div>

          {/* Category 2: 📱 Contact Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center text-lg border border-blue-100">
                  📱
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{contact.title || "Contact Information"}</h4>
                  <p className="text-[11px] text-slate-500">Mobile number, Email address</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-[#138808] border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                <CheckCircle2 size={11} />
                <span>{contact.status || "Verified"}</span>
              </span>
            </div>

            {/* Field highlights (masked values) */}
            <div className="bg-slate-50/80 rounded-xl p-2.5 mb-3 text-xs grid grid-cols-2 gap-2 border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Mobile Number</span>
                <p className="font-mono font-bold text-slate-800">{contact.mobile || "+91 XXXXX XXXXX"}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Email Address</span>
                <p className="font-semibold text-slate-700 truncate">{contact.email || "rahul@example.com"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 pt-2.5">
              <button 
                onClick={() => setViewCategoryModal('contact')}
                className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 text-center transition-colors flex items-center justify-center gap-1"
              >
                <Eye size={12} />
                <span>View Details</span>
              </button>
              <button 
                onClick={() => openEditModal('contact')}
                className="flex-1 py-1.5 px-3 bg-[#000080]/5 hover:bg-[#000080]/10 text-[#000080] font-bold text-xs rounded-xl border border-blue-200 text-center transition-colors flex items-center justify-center gap-1"
              >
                <Edit3 size={12} />
                <span>Update Information</span>
              </button>
            </div>
          </div>

          {/* Category 3: 📍 Address Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#138808] flex items-center justify-center text-lg border border-emerald-100">
                  📍
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{address.title || "Address Information"}</h4>
                  <p className="text-[11px] text-slate-500">Residential address, District, State, PIN</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-[#138808] border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                <CheckCircle2 size={11} />
                <span>{address.status || "Verified"}</span>
              </span>
            </div>

            {/* Field highlights */}
            <div className="bg-slate-50/80 rounded-xl p-2.5 mb-3 text-xs grid grid-cols-2 gap-2 border border-slate-100">
              <div className="col-span-2">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Address Line</span>
                <p className="font-semibold text-slate-800">{address.addressLine || "Plot 42, Malviya Nagar, Jaipur"}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">District & State</span>
                <p className="font-semibold text-slate-700">{address.district || "Jaipur"}, {address.state || "Rajasthan"}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">PIN Code</span>
                <p className="font-mono font-bold text-slate-800">{address.pin || "3020XX"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 pt-2.5">
              <button 
                onClick={() => setViewCategoryModal('address')}
                className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 text-center transition-colors flex items-center justify-center gap-1"
              >
                <Eye size={12} />
                <span>View Details</span>
              </button>
              <button 
                onClick={() => openEditModal('address')}
                className="flex-1 py-1.5 px-3 bg-[#000080]/5 hover:bg-[#000080]/10 text-[#000080] font-bold text-xs rounded-xl border border-blue-200 text-center transition-colors flex items-center justify-center gap-1"
              >
                <Edit3 size={12} />
                <span>Update Information</span>
              </button>
            </div>
          </div>

          {/* Category 4: 🪪 Identity Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg border border-purple-100">
                  🪪
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{identity.title || "Government Identity"}</h4>
                  <p className="text-[11px] text-slate-500">Government ID connection (Verified)</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-[#138808] border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                <CheckCircle2 size={11} />
                <span>{identity.status || "Connected"}</span>
              </span>
            </div>

            {/* Field highlights (masked values, no real Aadhaar) */}
            <div className="bg-slate-50/80 rounded-xl p-2.5 mb-3 text-xs grid grid-cols-2 gap-2 border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Identity Type</span>
                <p className="font-semibold text-slate-800">{identity.identityType || "Government ID"}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Identifier Number</span>
                <p className="font-mono font-bold text-slate-800">{identity.idNumber || "XXXX-XXXX-XXXX"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 pt-2.5">
              <button 
                onClick={() => setViewCategoryModal('identity')}
                className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 text-center transition-colors flex items-center justify-center gap-1"
              >
                <Eye size={12} />
                <span>View</span>
              </button>
              <button 
                onClick={() => navigate('/documents')}
                className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 text-center transition-colors flex items-center justify-center gap-1"
              >
                <FileText size={12} />
                <span>Supporting Doc</span>
              </button>
              <button 
                onClick={() => setManageConnectionModalOpen(true)}
                className="flex-1 py-1.5 px-3 bg-[#000080]/5 hover:bg-[#000080]/10 text-[#000080] font-bold text-xs rounded-xl border border-blue-200 text-center transition-colors flex items-center justify-center gap-1"
              >
                <SlidersHorizontal size={12} />
                <span>Manage</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. 🔄 REUSE YOUR INFORMATION SECTION */}
        <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-sm relative overflow-hidden">
          {/* Saffron and green banner stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-blue-600 to-[#138808]"></div>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🔄</span>
            <h3 className="font-extrabold text-xs text-[#000080] uppercase tracking-wider">
              Reuse Your Information
            </h3>
          </div>
          
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            "DOWLET1 can use available information to pre-fill eligible service applications."
          </p>

          <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100 mb-4 space-y-1.5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
              Information Available for Reuse:
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#138808]" />
                <span>Name</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#138808]" />
                <span>Date of Birth</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#138808]" />
                <span>Address</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#138808]" />
                <span>Mobile Number</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <CheckCircle2 size={13} className="text-[#138808]" />
                <span>Identity Information</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setEligibleServicesModalOpen(true)}
            className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-3 rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>See Eligible Services</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 5. CONSENT & DATA SHARING SECTION */}
        <div ref={consentSectionRef} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock size={15} className="text-[#000080]" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Consent & Data Sharing
              </h3>
            </div>
            <span className="text-[10px] text-[#138808] font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
              Active Controls
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            Control which features can reuse your verified profile data across departments.
          </p>

          <div className="space-y-3 pt-1">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex-1 pr-3">
                <p className="text-xs font-bold text-slate-800">Service Application Data Sharing</p>
                <p className="text-[10px] text-slate-500">Allow pre-filling forms for eligible services</p>
              </div>
              <button 
                onClick={() => handleToggleConsent('serviceDataSharing')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                  consentSettings.serviceDataSharing ? 'bg-[#138808]' : 'bg-slate-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  consentSettings.serviceDataSharing ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex-1 pr-3">
                <p className="text-xs font-bold text-slate-800">Profile Information Reuse</p>
                <p className="text-[10px] text-slate-500">Allow authorized verification reuse across departments</p>
              </div>
              <button 
                onClick={() => handleToggleConsent('profileReuse')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                  consentSettings.profileReuse ? 'bg-[#138808]' : 'bg-slate-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  consentSettings.profileReuse ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex-1 pr-3">
                <p className="text-xs font-bold text-slate-800">Document Reuse</p>
                <p className="text-[10px] text-slate-500">Allow document access from Document Wallet</p>
              </div>
              <button 
                onClick={() => handleToggleConsent('documentReuse')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                  consentSettings.documentReuse ? 'bg-[#138808]' : 'bg-slate-300'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  consentSettings.documentReuse ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* 6. RECENT INFORMATION USAGE */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Recent Information Usage
            </h3>
            <span className="text-[10px] font-medium text-slate-400">Activity Log</span>
          </div>

          <div className="space-y-2.5">
            {informationUsage.map((item, idx) => (
              <div key={item.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{item.serviceName}</h4>
                  <p className="text-[11px] text-[#000080] font-medium mt-0.5">{item.action}</p>
                  {item.fieldsReused && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {item.fieldsReused.map((f, fi) => (
                        <span key={fi} className="text-[9px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-medium text-slate-400 shrink-0 mt-0.5">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. PRIVACY & SECURITY UX */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">🔐</span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Privacy & Security
            </h3>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            "Your information is protected by the DOWLET1 citizen platform. All operations adhere to strict data-protection and consent-governance protocols."
          </p>

          <div className="flex gap-2.5 pt-1">
            <button
              onClick={() => {
                consentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                showToast("Manage data sharing toggles above.");
              }}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors text-center"
            >
              Manage Consent
            </button>
            <button
              onClick={() => navigate('/privacy')}
              className="flex-1 py-2.5 bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-colors text-center"
            >
              Privacy Settings
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: VIEW CATEGORY DETAILS */}
      {/* ========================================================================= */}
      {viewCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {viewCategoryModal === 'personal' ? '👤' : viewCategoryModal === 'contact' ? '📱' : viewCategoryModal === 'address' ? '📍' : '🪪'}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  {viewCategoryModal === 'personal' && "Personal Information"}
                  {viewCategoryModal === 'contact' && "Contact Information"}
                  {viewCategoryModal === 'address' && "Address Information"}
                  {viewCategoryModal === 'identity' && "Government Identity"}
                </h3>
              </div>
              <button 
                onClick={() => setViewCategoryModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Individual Fields List */}
            <div className="space-y-3 mb-5 max-h-[60vh] overflow-y-auto">
              {viewCategoryModal === 'personal' && (
                <>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">FULL NAME</p>
                      <p className="text-xs font-bold text-slate-800">{personal.fullName}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">DATE OF BIRTH</p>
                      <p className="text-xs font-bold text-slate-800">{personal.dob}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">GENDER</p>
                      <p className="text-xs font-bold text-slate-800">{personal.gender}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">STATE</p>
                      <p className="text-xs font-bold text-slate-800">{personal.state}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">DISTRICT</p>
                      <p className="text-xs font-bold text-slate-800">{personal.district}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                </>
              )}

              {viewCategoryModal === 'contact' && (
                <>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">MOBILE NUMBER</p>
                      <p className="text-xs font-mono font-bold text-slate-800">{contact.mobile}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">EMAIL ADDRESS</p>
                      <p className="text-xs font-bold text-slate-800">{contact.email}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                </>
              )}

              {viewCategoryModal === 'address' && (
                <>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">ADDRESS LINE</p>
                      <p className="text-xs font-bold text-slate-800">{address.addressLine}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">DISTRICT</p>
                      <p className="text-xs font-bold text-slate-800">{address.district}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">STATE</p>
                      <p className="text-xs font-bold text-slate-800">{address.state}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">PIN CODE</p>
                      <p className="text-xs font-mono font-bold text-slate-800">{address.pin}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Available
                    </span>
                  </div>
                </>
              )}

              {viewCategoryModal === 'identity' && (
                <>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">IDENTITY TYPE</p>
                      <p className="text-xs font-bold text-slate-800">{identity.identityType}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">NUMBER</p>
                      <p className="text-xs font-mono font-bold text-slate-800">{identity.idNumber}</p>
                    </div>
                    <span className="text-[10px] text-[#138808] font-bold flex items-center gap-0.5">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 italic p-1">
                    Identity credentials are encrypted and masked in accordance with data protection guidelines.
                  </p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => openEditModal(viewCategoryModal)}
                className="w-full bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Edit3 size={14} />
                <span>Edit Information</span>
              </button>
              <button
                onClick={() => setViewCategoryModal(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: EDIT INFORMATION FORM */}
      {/* ========================================================================= */}
      {editCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">✏️</span>
                <h3 className="font-bold text-slate-900 text-sm">
                  Update {editCategoryModal === 'personal' ? 'Personal' : editCategoryModal === 'contact' ? 'Contact' : editCategoryModal === 'address' ? 'Address' : 'Identity'} Info
                </h3>
              </div>
              <button 
                onClick={() => setEditCategoryModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveEdit} className="space-y-3 mb-5 max-h-[60vh] overflow-y-auto pr-1">
              {editCategoryModal === 'personal' && (
                <>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={editFormData.fullName || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Date of Birth</label>
                    <input 
                      type="text" 
                      value={editFormData.dob || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, dob: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      placeholder="e.g. 15 May 2005"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Gender</label>
                    <select 
                      value={editFormData.gender || 'Male'}
                      onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080] bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">State</label>
                    <select 
                      value={editFormData.state || 'Rajasthan'}
                      onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080] bg-white"
                    >
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">District</label>
                    <input 
                      type="text" 
                      value={editFormData.district || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, district: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      required
                    />
                  </div>
                </>
              )}

              {editCategoryModal === 'contact' && (
                <>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Mobile Number</label>
                    <input 
                      type="text" 
                      value={editFormData.mobile || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, mobile: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Stored with encrypted masking</span>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={editFormData.email || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      required
                    />
                  </div>
                </>
              )}

              {editCategoryModal === 'address' && (
                <>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Address Line</label>
                    <input 
                      type="text" 
                      value={editFormData.addressLine || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, addressLine: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">District</label>
                    <input 
                      type="text" 
                      value={editFormData.district || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, district: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">State</label>
                    <input 
                      type="text" 
                      value={editFormData.state || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">PIN Code</label>
                    <input 
                      type="text" 
                      value={editFormData.pin || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, pin: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      placeholder="3020XX"
                      required
                    />
                  </div>
                </>
              )}

              {editCategoryModal === 'identity' && (
                <>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Identity Document Type</label>
                    <input 
                      type="text" 
                      value={editFormData.identityType || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, identityType: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Identifier Number (Masked)</label>
                    <input 
                      type="text" 
                      value={editFormData.idNumber || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, idNumber: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#000080]"
                      required
                    />
                  </div>
                </>
              )}

              <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200 mt-2">
                <p className="text-[10px] text-blue-900 leading-snug">
                  ℹ️ Changes made here update your linked citizen profile records.
                </p>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditCategoryModal(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ELIGIBLE SERVICES MODAL */}
      {/* ========================================================================= */}
      {eligibleServicesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Eligible Services for Information Reuse
                </h3>
                <p className="text-[10px] text-slate-400">
                  Available information can be reused during application
                </p>
              </div>
              <button 
                onClick={() => setEligibleServicesModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Services List */}
            <div className="space-y-3 mb-5 max-h-[60vh] overflow-y-auto pr-1">
              {eligibleServices.map((service) => (
                <div key={service.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{service.icon}</span>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">{service.name}</h4>
                        <p className="text-[10px] text-slate-500">{service.dept}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 mb-2 leading-tight">
                    {service.highlight}
                  </p>

                  <div className="bg-white p-2 rounded-lg border border-slate-100 mb-3 space-y-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Available Information:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.reusedFields.map((f, i) => (
                        <span key={i} className="text-[10px] font-medium bg-green-50 text-emerald-800 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setConsentModalService(service);
                    }}
                    className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Use Available Information</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setEligibleServicesModalOpen(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: CONSENT BEFORE REUSE MODAL */}
      {/* ========================================================================= */}
      {consentModalService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-in zoom-in-95 duration-200 border-2 border-[#000080]/10">
            
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#000080] flex items-center justify-center mx-auto mb-2 text-xl shadow-sm border border-blue-100">
                🔐
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                Information Sharing
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Review the information that will be used for this application.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 mb-4 space-y-2.5">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Destination Service:</p>
                <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  <span>{consentModalService.icon}</span>
                  <span>{consentModalService.name}</span>
                </p>
              </div>

              <div className="border-t border-slate-200/60 pt-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">Information to be Reused:</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 size={13} className="text-[#138808]" />
                    <span>Name: <strong>{personal.fullName || "Rahul Kumar"}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 size={13} className="text-[#138808]" />
                    <span>Address: <strong>{address.district || "Jaipur"}, {address.state || "Rajasthan"}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 size={13} className="text-[#138808]" />
                    <span>Mobile: <strong>{contact.mobile || "+91 XXXXX XXXXX"}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 size={13} className="text-[#138808]" />
                    <span>Identity: <strong>{identity.idNumber || "XXXX-XXXX-XXXX"}</strong></span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200/60 pt-2">
                <p className="text-[10px] text-slate-500 leading-tight italic">
                  Note: Pre-filled details will be submitted to the service form upon confirmation.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setConsentModalService(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAllowConsentAndContinue}
                className="flex-1 bg-[#138808] hover:bg-green-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1 shadow-md"
              >
                <span>Allow & Continue</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: MANAGE IDENTITY CONNECTION MODAL */}
      {/* ========================================================================= */}
      {manageConnectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪪</span>
                <h3 className="font-bold text-slate-900 text-sm">Identity Connection</h3>
              </div>
              <button onClick={() => setManageConnectionModalOpen(false)} className="text-slate-400 p-1">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 mb-5 text-xs">
              <div className="bg-green-50 border border-green-200 p-3 rounded-xl flex items-center gap-2 text-emerald-800">
                <CheckCircle2 size={16} className="text-[#138808] shrink-0" />
                <div>
                  <p className="font-bold">Connected & Verified</p>
                  <p className="text-[11px] text-emerald-700">Digital identifier linked to citizen session</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[11px]">Provider:</span>
                  <span className="font-semibold text-slate-800">Citizen Digital Identity</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[11px]">Linked Date:</span>
                  <span className="font-semibold text-slate-800">10 Sep 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-[11px]">Auth Mode:</span>
                  <span className="font-semibold text-slate-800">Secure Session Token</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                Important: Identity credentials remain securely tokenized and protected.
              </p>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => {
                  setManageConnectionModalOpen(false);
                  navigate('/documents');
                }}
                className="w-full bg-[#000080] text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <FileText size={14} />
                <span>View Identity Document in Wallet</span>
              </button>
              <button 
                onClick={() => setManageConnectionModalOpen(false)}
                className="w-full bg-slate-100 text-slate-700 font-bold text-xs py-2 rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

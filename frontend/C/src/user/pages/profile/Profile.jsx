import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { AppHeader } from '../../components/Navigation';
import {
  User, Phone, MapPin, GraduationCap, ShieldCheck,
  FileText, FolderArchive, Lock, ChevronRight, Edit3,
  CheckCircle2, AlertCircle, ArrowRight, Shield, Globe,
  Bell, HelpCircle, MessageSquare, AlertTriangle, Star,
  LogOut, RefreshCw, X, ChevronDown, ChevronUp, Key,
  Smartphone, ExternalLink, Check, Eye, EyeOff, Info,
  Briefcase, IndianRupee, Calendar, Building, Sparkles
} from 'lucide-react';
import {
  getProfile,
  updateProfile,
  getConsentSettings,
  updateConsentSetting,
  getConsentHistory,
  getNotificationSettings,
  updateNotificationSetting,
  getLanguage,
  updateLanguage,
  getSecuritySettings,
  updateSecuritySetting,
  submitFeedback,
  submitSupportRequest,
  logout,
  resetProfileDemo,
  INITIAL_FAQS
} from '../../../utils/demoState';

export default function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // State from central demoState
  const [profile, setProfileState] = useState(getProfile());
  const [consentSettings, setConsentSettings] = useState(getConsentSettings());
  const [notificationSettings, setNotificationSettings] = useState(getNotificationSettings());
  const [securitySettings, setSecuritySettings] = useState(getSecuritySettings());
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage());
  const [consentHistory, setConsentHistory] = useState(getConsentHistory());

  // UI / Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Modals & Panels
  const [activeModal, setActiveModal] = useState(null);
  // Options: 'editProfile', 'updateContact', 'viewIdentity', 'manageIdentity', 'consent',
  // 'loginSecurity', 'changePassword', 'accountActivity', 'connectedServices', 'language',
  // 'faq', 'reportProblem', 'feedback', 'appGuide', 'about', 'terms', 'privacyPolicy', 'logoutConfirm'

  // Edit Profile Form State
  const [editForm, setEditForm] = useState({
    fullName: profile.fullName || '',
    dob: profile.dob || '',
    gender: profile.gender || '',
    occupation: profile.occupation || '',
    income: profile.income || '',
    state: profile.state || '',
    district: profile.district || ''
  });

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    mobile: profile.mobile || '',
    email: profile.email || ''
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Report Problem Form State
  const [problemForm, setProblemForm] = useState({
    category: 'Application',
    description: ''
  });

  // Feedback Form State
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 5,
    comment: ''
  });

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Sync with searchParams on mount (e.g. /profile?section=consent)
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      if (section === 'consent') setActiveModal('consent');
      else if (section === 'privacy') setActiveModal('loginSecurity');
      else if (section === 'help') setActiveModal('faq');
      else if (section === 'language') setActiveModal('language');
      else if (section === 'feedback') setActiveModal('feedback');
      else if (section === 'report') setActiveModal('reportProblem');
      else if (section === 'about') setActiveModal('about');
      else if (section === 'edit') setActiveModal('editProfile');
    }
  }, [searchParams]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync profile when opened
  const refreshAllState = () => {
    const p = getProfile();
    setProfileState(p);
    setConsentSettings(getConsentSettings());
    setNotificationSettings(getNotificationSettings());
    setSecuritySettings(getSecuritySettings());
    setCurrentLanguage(getLanguage());
    setConsentHistory(getConsentHistory());
    setEditForm({
      fullName: p.fullName || '',
      dob: p.dob || '',
      gender: p.gender || '',
      occupation: p.occupation || '',
      income: p.income || '',
      state: p.state || '',
      district: p.district || ''
    });
    setContactForm({
      mobile: p.mobile || '',
      email: p.email || ''
    });
  };

  // Profile Edit Handlers
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = updateProfile(editForm);
    setProfileState(updated);
    setActiveModal(null);
    showToast('Profile updated successfully.');
  };

  // Contact Update Handlers
  const handleSaveContact = (e) => {
    e.preventDefault();
    const updated = updateProfile(contactForm);
    setProfileState(updated);
    setActiveModal(null);
    showToast('Contact information updated in this prototype.');
  };

  // Consent Toggle Handlers
  const handleToggleConsent = (key) => {
    const nextVal = !consentSettings[key];
    const updated = updateConsentSetting(key, nextVal);
    setConsentSettings({ ...updated });
    showToast('Preference updated.');
  };

  // Notification Toggle Handlers
  const handleToggleNotification = (key) => {
    const nextVal = !notificationSettings[key];
    const updated = updateNotificationSetting(key, nextVal);
    setNotificationSettings({ ...updated });
    showToast('Notification preference updated.');
  };

  // Security Toggle Handlers
  const handleToggleSecurity = (key) => {
    const nextVal = !securitySettings[key];
    const updated = updateSecuritySetting(key, nextVal);
    setSecuritySettings({ ...updated });
    showToast('Security preference updated.');
  };

  // Language Change Handler
  const handleSelectLanguage = (lang) => {
    updateLanguage(lang);
    setCurrentLanguage(lang);
    showToast('Language preference updated.');
    setActiveModal(null);
  };

  // Password Change Handler
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 4) {
      setPasswordError('Please enter a new password (min 4 characters).');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }
    setPasswordError('');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setActiveModal(null);
    showToast('✓ Password updated in this prototype.');
  };

  // Report Problem Handler
  const handleProblemSubmit = (e) => {
    e.preventDefault();
    if (!problemForm.description.trim()) return;
    submitSupportRequest(problemForm);
    setProblemForm({ category: 'Application', description: '' });
    setActiveModal(null);
    showToast('✓ Problem reported in this prototype.');
  };

  // Feedback Handler
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    submitFeedback(feedbackForm);
    setFeedbackForm({ rating: 5, comment: '' });
    setActiveModal(null);
    showToast('Thank you for your feedback.');
  };

  // Reset Demo Handler
  const handleResetDemo = () => {
    resetProfileDemo();
    refreshAllState();
    showToast('Demo profile reset to initial defaults.');
  };

  // User initials
  const initials = profile.fullName
    ? profile.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'RK';

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen pb-16">
        
        {/* App Header */}
        <AppHeader 
          title="Profile & Settings" 
          onBack={() => navigate('/home')} 
          rightElement={
            <button
              onClick={() => setActiveModal('about')}
              className="text-xs font-bold text-[#000080] bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 transition-colors flex items-center gap-1"
            >
              <Info size={13} />
              <span>About</span>
            </button>
          }
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-3">
            <CheckCircle2 size={16} className="text-[#138808]" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-2 space-y-4">

          {/* ═══════════════ SECTION 4: PROFILE HEADER ═══════════════ */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 relative overflow-hidden">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-slate-100 to-[#138808]" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Circular Avatar */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#000080] via-[#0d599f] to-blue-700 text-white flex items-center justify-center font-extrabold text-2xl shadow-md border-4 border-white">
                  {initials}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs">
                  <Check size={12} strokeWidth={3} />
                </div>
              </div>

              {/* Name & Contact Details */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                      {profile.fullName || 'Rahul Kumar'}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {profile.email || 'rahul@example.com'}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      Mobile: {profile.mobile || '+91 XXXXX XXXXX'}
                    </p>
                  </div>

                  {/* Edit Profile Button */}
                  <div className="flex items-center justify-center sm:justify-end gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => setActiveModal('editProfile')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#000080] border border-blue-200 text-xs font-bold transition-colors shadow-2xs"
                    >
                      <Edit3 size={13} />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                    <CheckCircle2 size={13} className="text-[#138808]" />
                    <span>✓ Profile Complete</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-[#000080] border border-blue-200 text-[11px] font-semibold">
                    <ShieldCheck size={13} />
                    <span>Demo Verified Citizen</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════ SECTION 5: PROFILE COMPLETION CARD ═══════════════ */}
          <div className="bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-slate-50 rounded-2xl p-5 shadow-sm border border-blue-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#FF9933]" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#000080]">
                  PROFILE COMPLETION
                </h3>
              </div>
              <span className="text-sm font-extrabold text-[#000080]">85%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden mb-2 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#000080] via-[#0d599f] to-[#138808] rounded-full transition-all duration-700"
                style={{ width: '85%' }}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Complete your profile to make more services easier to apply for.
            </p>

            <button
              onClick={() => navigate('/verified-info')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Complete Profile</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* ═══════════════ SECTION 6: PERSONAL INFORMATION ═══════════════ */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center">
                  <User size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Personal Information</h3>
                  <p className="text-[11px] text-slate-400">Basic demographic details for eligible schemes</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal('editProfile')}
                className="text-xs font-bold text-[#000080] hover:underline flex items-center gap-1"
              >
                <Edit3 size={12} />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Full Name</span>
                <span className="font-bold text-slate-800">{profile.fullName}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Date of Birth</span>
                <span className="font-bold text-slate-800">{profile.dob}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Gender</span>
                <span className="font-bold text-slate-800">{profile.gender}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Occupation</span>
                <span className="font-bold text-slate-800">{profile.occupation}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Annual Income</span>
                <span className="font-bold text-slate-800">{profile.income}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">State & District</span>
                <span className="font-bold text-slate-800">{profile.district}, {profile.state}</span>
              </div>
            </div>
          </div>

          {/* ═══════════════ SECTION 7: CONTACT INFORMATION ═══════════════ */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Phone size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Contact Information</h3>
                  <p className="text-[11px] text-slate-400">Communication endpoints for OTP and status alerts</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal('updateContact')}
                className="text-xs font-bold text-[#000080] hover:underline flex items-center gap-1"
              >
                <Edit3 size={12} />
                <span>Update Contact</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Mobile</span>
                  <span className="font-mono font-bold text-slate-800">{profile.mobile}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-[#138808]" />
                  <span>Demo Verified</span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Email</span>
                  <span className="font-bold text-slate-800">{profile.email}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-[#138808]" />
                  <span>Demo Verified</span>
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 italic">
              * Note: Contact details are mock demo values. No real contact details are collected or displayed.
            </p>
          </div>

          {/* ═══════════════ SECTION 8: GOVERNMENT IDENTITY ═══════════════ */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Shield size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Government Identity</h3>
                  <p className="text-[11px] text-slate-400">Federated single-sign-on identity connection</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 size={11} className="text-[#138808]" />
                <span>Connected for Demo</span>
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-800">Identity:</span>
                  <span className="text-xs text-slate-700">Government ID</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-xs text-slate-800">Number:</span>
                  <span className="font-mono font-bold text-xs text-slate-500 tracking-wider">
                    XXXX-XXXX-XXXX
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModal('viewIdentity')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-colors shadow-2xs"
                >
                  View Identity
                </button>
                <button
                  onClick={() => setActiveModal('manageIdentity')}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-bold text-[#000080] transition-colors shadow-2xs"
                >
                  Manage Connection
                </button>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-[11px] text-amber-900 flex items-start gap-2">
              <AlertTriangle size={14} className="text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Demo Identity Connection:</strong> No real Aadhaar data or real Aadhaar APIs are used in this prototype. Sensitive identity numbers are never exposed or stored.
              </span>
            </div>
          </div>

          {/* ═══════════════ SECTION 9, 10, 11: ECOSYSTEM MODULE CARDS ═══════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Section 9: Verified Information */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#000080] mb-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                    <ShieldCheck size={16} />
                  </div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider">Verified Information</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug mb-3">
                  Manage information available for reuse across eligible services.
                </p>
                <div className="space-y-1 mb-3 text-xs text-slate-700">
                  <div className="flex items-center justify-between py-0.5">
                    <span>Personal Information</span>
                    <CheckCircle2 size={13} className="text-[#138808]" />
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span>Address Information</span>
                    <CheckCircle2 size={13} className="text-[#138808]" />
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span>Identity Information</span>
                    <CheckCircle2 size={13} className="text-[#138808]" />
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/verified-info')}
                className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#000080] border border-blue-200 text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span>Manage Information</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Section 10: Document Wallet */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-indigo-700 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <FileText size={16} />
                  </div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider">My Documents</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug mb-3">
                  Centralized secure vault for reuse in government schemes.
                </p>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-3 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>3 Documents</span>
                    <span className="text-[10px] bg-slate-200 px-2 py-0.2 rounded-full">Total</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 size={12} className="text-[#138808]" /> 2 Verified
                    </span>
                    <span className="text-amber-700">1 Pending</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/documents')}
                className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span>Open Document Wallet</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Section 11: My Applications */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <FolderArchive size={16} />
                  </div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider">My Applications</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug mb-3">
                  Live status tracking and audit trail of submitted schemes.
                </p>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-3 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>3 Applications</span>
                    <span className="text-[10px] bg-slate-200 px-2 py-0.2 rounded-full">Total</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span className="text-blue-700">2 In Progress</span>
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 size={12} className="text-[#138808]" /> 1 Completed
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/applications')}
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span>View Applications</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </div>

          {/* ═══════════════ SECTION 12, 13, 14: CONSENT & DATA SHARING ═══════════════ */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Lock size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Consent & Data Sharing</h3>
                  <p className="text-[11px] text-slate-400">
                    Control how your information is reused in eligible service applications.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal('consent')}
                className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#000080] border border-blue-200 text-xs font-bold transition-colors shadow-2xs"
              >
                Manage Consent
              </button>
            </div>

            {/* Functional Toggles inline */}
            <div className="space-y-2 mb-4">
              {[
                { key: 'profileInfoReuse', label: 'Profile Information Reuse', desc: 'Allows pre-filling verified name, address and demographic data' },
                { key: 'documentReuse', label: 'Document Reuse', desc: 'Permits eligible departments to pull verified certificates from wallet' },
                { key: 'applicationDataSharing', label: 'Application Data Sharing', desc: 'Enables cross-department coordination for multi-scheme benefits' },
                { key: 'personalizedRecommendations', label: 'Personalized Service Recommendations', desc: 'AI analyzes demographics to suggest relevant grants & welfare' },
                { key: 'notifications', label: 'Notifications', desc: 'Receive real-time alerts for deadlines, verifications and status changes' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors border border-slate-100">
                  <div className="pr-3">
                    <p className="text-xs font-bold text-slate-800">{item.label}</p>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleToggleConsent(item.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      consentSettings[item.key] ? 'bg-[#000080]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        consentSettings[item.key] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Consent History Preview */}
            <div className="border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  CONSENT HISTORY
                </span>
                <button
                  onClick={() => setActiveModal('consent')}
                  className="text-[11px] font-bold text-[#000080] hover:underline"
                >
                  View All Activity
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {consentHistory.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{item.service}</p>
                      <p className="text-[11px] text-slate-500">{item.description}</p>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 shrink-0">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════════ SECTION 15 & 16: PRIVACY & SECURITY ═══════════════ */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Privacy & Security</h3>
                  <p className="text-[11px] text-slate-400">Credentials, multi-factor verification, and session control</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => setActiveModal('loginSecurity')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-left transition-all group flex items-start justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#000080]">Authentication</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Manage Login & Security</p>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-[#000080] transition-colors" />
              </button>

              <button
                onClick={() => setActiveModal('consent')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-left transition-all group flex items-start justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#000080]">Privacy Settings</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Manage Data Sharing</p>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-[#000080] transition-colors" />
              </button>

              <button
                onClick={() => setActiveModal('accountActivity')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-left transition-all group flex items-start justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#000080]">Activity</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">View Account Activity</p>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-[#000080] transition-colors" />
              </button>

              <button
                onClick={() => setActiveModal('connectedServices')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-left transition-all group flex items-start justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#000080]">Connected Services</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Manage Connections</p>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-[#000080] transition-colors" />
              </button>
            </div>

            {/* Quick status summary */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 size={13} className="text-[#138808]" />
                <span>OTP Verification Enabled</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 size={13} className="text-[#138808]" />
                <span>Session Security Active</span>
              </div>
              <button
                onClick={() => setActiveModal('changePassword')}
                className="text-xs font-bold text-[#000080] hover:underline"
              >
                Change Password →
              </button>
            </div>
          </div>

          {/* ═══════════════ SECTION 18: LANGUAGE ═══════════════ */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF9933] flex items-center justify-center">
                  <Globe size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Language</h3>
                  <p className="text-[11px] text-slate-400">Choose your preferred portal language</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#000080] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                Current: {currentLanguage}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name: 'English', native: 'English' },
                { name: 'हिंदी', native: 'Hindi' },
                { name: 'ગુજરાતી', native: 'Gujarati' },
                { name: 'मराठी', native: 'Marathi' }
              ].map((lang) => {
                const isSelected = currentLanguage === lang.name;
                return (
                  <button
                    key={lang.name}
                    onClick={() => handleSelectLanguage(lang.name)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-[#000080] text-white border-[#000080] shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <p className="text-sm font-bold">{lang.name}</p>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                      {lang.native}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ═══════════════ SECTION 19: NOTIFICATION PREFERENCES ═══════════════ */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center">
                  <Bell size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Notification Preferences</h3>
                  <p className="text-[11px] text-slate-400">Manage real-time notifications and alerts</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/notifications')}
                className="text-xs font-bold text-[#000080] hover:underline"
              >
                View Centre →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { key: 'applicationUpdates', label: 'Application Updates', desc: 'Tracking and status progression' },
                { key: 'documentUpdates', label: 'Document Updates', desc: 'Verification and expiry notices' },
                { key: 'serviceUpdates', label: 'Service Updates', desc: 'New eligible schemes and grants' },
                { key: 'systemNotifications', label: 'System Notifications', desc: 'Portal security and maintenance' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="pr-2">
                    <p className="font-bold text-slate-800">{item.label}</p>
                    <p className="text-[10px] text-slate-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleToggleNotification(item.key)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      notificationSettings[item.key] ? 'bg-[#000080]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        notificationSettings[item.key] ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════════ SECTION 20 & 21: HELP & SUPPORT / FAQ ═══════════════ */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <HelpCircle size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Help & Support</h3>
                  <p className="text-[11px] text-slate-400">Frequently asked questions, reporting and feedback</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <button
                onClick={() => setActiveModal('faq')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-center transition-colors"
              >
                <HelpCircle size={18} className="text-[#000080] mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-800">FAQ</p>
              </button>

              <button
                onClick={() => setActiveModal('reportProblem')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-center transition-colors"
              >
                <AlertTriangle size={18} className="text-amber-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-800">Report Problem</p>
              </button>

              <button
                onClick={() => setActiveModal('feedback')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-center transition-colors"
              >
                <MessageSquare size={18} className="text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-800">Feedback</p>
              </button>

              <button
                onClick={() => setActiveModal('appGuide')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-center transition-colors"
              >
                <Sparkles size={18} className="text-indigo-600 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-800">App Guide</p>
              </button>
            </div>

            {/* Quick Accordion Preview */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                POPULAR QUESTIONS
              </p>
              {INITIAL_FAQS.slice(0, 3).map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-3 text-left font-bold text-xs text-slate-800 flex items-center justify-between hover:bg-slate-100 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 pt-1 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
              <button
                onClick={() => setActiveModal('faq')}
                className="text-xs font-bold text-[#000080] hover:underline pt-1 block"
              >
                View all FAQs →
              </button>
            </div>
          </div>

          {/* ═══════════════ SECTION 24, 25, 26: ABOUT DOWLET1 ═══════════════ */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-[#000080]">DOWLET1</h3>
                  <span className="text-[10px] font-bold bg-[#FF9933]/15 text-[#e07520] px-1.5 py-0.2 rounded border border-[#FF9933]/30">
                    SIH Prototype
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 italic">"One Platform for Unified Government Services"</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              DOWLET1 is an SIH prototype concept designed to provide a unified interface for discovering, applying for and tracking government services.
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500 py-2 border-y border-slate-100 mb-3">
              <span>Version: <strong className="text-slate-700">1.0.0 Demo</strong></span>
              <span>Build: <strong className="text-slate-700">SIH Prototype</strong></span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveModal('terms')}
                className="text-xs font-bold text-[#000080] hover:underline"
              >
                Terms & Conditions
              </button>
              <span className="text-slate-300">•</span>
              <button
                onClick={() => setActiveModal('privacyPolicy')}
                className="text-xs font-bold text-[#000080] hover:underline"
              >
                Privacy Policy
              </button>
              <span className="text-slate-300">•</span>
              <button
                onClick={() => setActiveModal('about')}
                className="text-xs font-bold text-[#000080] hover:underline"
              >
                About Project
              </button>
            </div>
          </div>

          {/* ═══════════════ SECTION 34: SECURITY UX DISCLAIMER ═══════════════ */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-xs">
            <div className="flex items-center gap-2 text-[#000080] font-bold mb-1">
              <Lock size={14} />
              <span>🔐 SECURITY</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Your account controls are managed through the DOWLET1 prototype interface.
            </p>
            <p className="text-[11px] text-slate-500 mt-1 italic">
              * Production deployment note: Production deployment would require secure authentication, authorization, encryption, audit logging and appropriate identity-provider integration.
            </p>
          </div>

          {/* ═══════════════ SECTION 27: LOGOUT & RESET ═══════════════ */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleResetDemo}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <RefreshCw size={13} />
              <span>Reset Profile Demo</span>
            </button>

            <button
              onClick={() => setActiveModal('logoutConfirm')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════
            MODALS & OVERLAYS (Section 6, 7, 8, 13, 16, 17, 21, 22, 23, 25, 26, 27)
        ═══════════════════════════════════════════════════════════════ */}

        {activeModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in zoom-in-95">

              {/* ── 1. EDIT PROFILE MODAL ── */}
              {activeModal === 'editProfile' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <Edit3 size={16} className="text-[#000080]" />
                      <span>Edit Personal Information</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                        <input
                          type="text"
                          value={editForm.dob}
                          onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                          placeholder="e.g. 15 May 2005"
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Gender</label>
                        <select
                          value={editForm.gender}
                          onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Occupation</label>
                        <input
                          type="text"
                          value={editForm.occupation}
                          onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Annual Income</label>
                        <input
                          type="text"
                          value={editForm.income}
                          onChange={(e) => setEditForm({ ...editForm, income: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">State</label>
                        <input
                          type="text"
                          value={editForm.state}
                          onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">District</label>
                        <input
                          type="text"
                          value={editForm.district}
                          onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold transition-colors shadow-sm"
                      >
                        Save Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── 2. UPDATE CONTACT MODAL ── */}
              {activeModal === 'updateContact' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <Phone size={16} className="text-[#000080]" />
                      <span>Update Contact Information</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveContact} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                      <input
                        type="text"
                        value={contactForm.mobile}
                        onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Prototype only: masked demo verification will apply</p>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                      />
                    </div>

                    <div className="p-3 bg-blue-50 rounded-xl text-slate-700 border border-blue-100 text-[11px]">
                      ✓ Prototype note: Contact verification is simulated. No real SMS or email is dispatched.
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold transition-colors shadow-sm"
                      >
                        Update Contact
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── 3. VIEW IDENTITY MODAL ── */}
              {activeModal === 'viewIdentity' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <Shield size={16} className="text-[#000080]" />
                      <span>Government Identity Details</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-lg mb-4 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[10px] tracking-widest uppercase text-slate-300 font-semibold">GOVERNMENT OF INDIA</p>
                        <p className="text-xs font-bold text-amber-400">Citizen Digital Identity (Demo)</p>
                      </div>
                      <span className="text-xl">🇮🇳</span>
                    </div>

                    <div className="space-y-2 mb-4 font-mono">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Masked Number</p>
                      <p className="text-lg font-bold tracking-widest">XXXX XXXX 8849</p>
                    </div>

                    <div className="flex justify-between items-end text-xs">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Holder Name</p>
                        <p className="font-bold">{profile.fullName}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase">Status</p>
                        <p className="font-bold text-emerald-400">✓ Connected Demo</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-xs mb-4">
                    <strong>Demo Security Policy:</strong> Real Aadhaar or national identity numbers are strictly not stored or transmitted in this prototype.
                  </div>

                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}

              {/* ── 4. MANAGE IDENTITY MODAL ── */}
              {activeModal === 'manageIdentity' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#000080]" />
                      <span>Manage Identity Connection</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">Demo Identity Connection</p>
                        <p className="text-[11px] text-slate-500">Active simulated link with DigiLocker / Aadhaar mesh</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Connected
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">Biometric / OTP Auth Mode</p>
                        <p className="text-[11px] text-slate-500">Simulated 2FA authentication on transaction</p>
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        Enabled
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        showToast('Identity connection refreshed in prototype.');
                        setActiveModal(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs shadow-sm"
                    >
                      Re-verify Connection
                    </button>
                  </div>
                </div>
              )}

              {/* ── 5. CONSENT & DATA SHARING MODAL (Section 12, 13, 14) ── */}
              {activeModal === 'consent' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                        <Lock size={16} className="text-[#000080]" />
                        <span>CONSENT & DATA SHARING</span>
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Control how your information is reused in eligible service applications.
                      </p>
                    </div>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  {/* Settings toggles */}
                  <div className="space-y-2.5 mb-5">
                    {[
                      { key: 'profileInfoReuse', label: 'Profile Information Reuse' },
                      { key: 'documentReuse', label: 'Document Reuse' },
                      { key: 'applicationDataSharing', label: 'Application Data Sharing' },
                      { key: 'personalizedRecommendations', label: 'Personalized Service Recommendations' },
                      { key: 'notifications', label: 'Notifications' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <span className="font-bold text-slate-800">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold ${consentSettings[item.key] ? 'text-emerald-700' : 'text-slate-400'}`}>
                            {consentSettings[item.key] ? '[ ON ]' : '[ OFF ]'}
                          </span>
                          <button
                            onClick={() => handleToggleConsent(item.key)}
                            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                              consentSettings[item.key] ? 'bg-[#000080]' : 'bg-slate-300'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                consentSettings[item.key] ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Consent History Section 14 */}
                  <div className="border-t border-slate-100 pt-3 mb-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      CONSENT HISTORY
                    </p>
                    <div className="space-y-2 text-xs">
                      {consentHistory.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-slate-800">{item.service}</p>
                            <p className="text-[11px] text-slate-500">{item.description}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium shrink-0">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}

              {/* ── 6. LOGIN & SECURITY MODAL (Section 16) ── */}
              {activeModal === 'loginSecurity' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#000080]" />
                      <span>LOGIN & SECURITY</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs mb-5">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">Mobile / Email Login</p>
                        <p className="text-[11px] text-slate-500">{profile.email} • {profile.mobile}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-[#138808]" />
                        <span>✓ Active</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">OTP Verification</p>
                        <p className="text-[11px] text-slate-500">2-step verification enabled for sensitive updates</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-[#138808]" />
                        <span>✓ Enabled</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">Remember Me</p>
                        <p className="text-[11px] text-slate-500">Stay signed into this prototype browser</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-600">
                          {securitySettings.rememberMe ? '[ ON ]' : '[ OFF ]'}
                        </span>
                        <button
                          onClick={() => handleToggleSecurity('rememberMe')}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                            securitySettings.rememberMe ? 'bg-[#000080]' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              securitySettings.rememberMe ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">Session Security</p>
                        <p className="text-[11px] text-slate-500">Device token cryptographic verification</p>
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => setActiveModal('changePassword')}
                      className="flex-1 py-2.5 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs transition-colors shadow-sm text-center"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => {
                        showToast('Signed out of other mock sessions.');
                        setActiveModal(null);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors text-center"
                    >
                      Sign Out of Other Sessions
                    </button>
                  </div>
                </div>
              )}

              {/* ── 7. CHANGE PASSWORD MODAL (Section 17) ── */}
              {activeModal === 'changePassword' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <Key size={16} className="text-[#000080]" />
                      <span>CHANGE PASSWORD</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-3.5 text-xs">
                    {passwordError && (
                      <div className="p-2.5 bg-red-50 text-red-700 rounded-xl border border-red-200 text-[11px]">
                        {passwordError}
                      </div>
                    )}

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">New Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Confirm Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[#000080] font-bold hover:underline"
                      >
                        {showPassword ? 'Hide Passwords' : 'Show Passwords'}
                      </button>
                      <span>* Prototype interaction only</span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold transition-colors shadow-sm"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── 8. LANGUAGE MODAL (Section 18) ── */}
              {activeModal === 'language' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <Globe size={16} className="text-[#000080]" />
                      <span>Select Language / भाषा चुनें</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    {[
                      { name: 'English', native: 'English' },
                      { name: 'हिंदी', native: 'Hindi' },
                      { name: 'ગુજરાતી', native: 'Gujarati' },
                      { name: 'मराठी', native: 'Marathi' }
                    ].map((lang) => {
                      const isSel = currentLanguage === lang.name;
                      return (
                        <button
                          key={lang.name}
                          onClick={() => handleSelectLanguage(lang.name)}
                          className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                            isSel
                              ? 'bg-blue-50 border-[#000080] text-[#000080]'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="text-left">
                            <p className="font-bold text-sm">{lang.name}</p>
                            <p className="text-[11px] text-slate-400">{lang.native}</p>
                          </div>
                          {isSel && <CheckCircle2 size={18} className="text-[#000080]" />}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[10px] text-slate-400 italic">
                    * Note: Saved to localStorage. As this is a prototype, full translation across every government form will be unlocked in production.
                  </p>
                </div>
              )}

              {/* ── 9. FAQ ACCORDION MODAL (Section 21) ── */}
              {activeModal === 'faq' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <HelpCircle size={16} className="text-[#000080]" />
                      <span>Frequently Asked Questions</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                    {INITIAL_FAQS.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full p-3.5 text-left font-bold text-xs text-slate-800 flex items-center justify-between hover:bg-slate-100 transition-colors"
                          >
                            <span>{faq.q}</span>
                            {isOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-400" />}
                          </button>
                          {isOpen && (
                            <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Need more assistance?</span>
                    <button
                      onClick={() => setActiveModal('reportProblem')}
                      className="font-bold text-[#000080] hover:underline"
                    >
                      Report a Problem →
                    </button>
                  </div>
                </div>
              )}

              {/* ── 10. REPORT A PROBLEM MODAL (Section 22) ── */}
              {activeModal === 'reportProblem' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <AlertTriangle size={16} className="text-amber-600" />
                      <span>REPORT A PROBLEM</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleProblemSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={problemForm.category}
                        onChange={(e) => setProblemForm({ ...problemForm, category: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                      >
                        <option value="Application">Application</option>
                        <option value="Document">Document</option>
                        <option value="Profile">Profile</option>
                        <option value="Service">Service</option>
                        <option value="Login">Login</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Description</label>
                      <textarea
                        value={problemForm.description}
                        onChange={(e) => setProblemForm({ ...problemForm, description: e.target.value })}
                        placeholder="Enter your issue details here..."
                        rows={4}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold shadow-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── 11. FEEDBACK MODAL (Section 23) ── */}
              {activeModal === 'feedback' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <MessageSquare size={16} className="text-emerald-600" />
                      <span>FEEDBACK</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-2">How was your experience?</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                            className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                          >
                            <Star
                              size={28}
                              className={
                                star <= feedbackForm.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Comment</label>
                      <textarea
                        value={feedbackForm.comment}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                        placeholder="Enter your feedback here..."
                        rows={3}
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold shadow-sm"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── 12. APP GUIDE MODAL ── */}
              {activeModal === 'appGuide' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <Sparkles size={16} className="text-[#FF9933]" />
                      <span>DOWLET1 App Guide</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs text-slate-700 mb-4">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="font-bold text-[#000080] mb-0.5">1. Unified Citizen Profile</p>
                      <p className="text-slate-500">Your single verified identity unlocks automatic form pre-fills across all eligible central and state schemes.</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="font-bold text-[#000080] mb-0.5">2. Document Wallet</p>
                      <p className="text-slate-500">Upload once or sync from DigiLocker. Re-use documents with full consent audit trails.</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="font-bold text-[#000080] mb-0.5">3. AI Assistant</p>
                      <p className="text-slate-500">Ask questions in conversational Hindi, English or regional tongues to track applications or discover schemes.</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="font-bold text-[#000080] mb-0.5">4. Consent Transparency</p>
                      <p className="text-slate-500">You maintain absolute granular sovereignty over which department accesses what data, anytime.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs"
                  >
                    Got It
                  </button>
                </div>
              )}

              {/* ── 13. ABOUT DOWLET1 MODAL (Section 24) ── */}
              {activeModal === 'about' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-slate-200 shadow-xs flex items-center justify-center">
                        <img src="/pwa-192.png" alt="DOWLET1 Logo" className="w-full h-full object-contain" />
                      </div>
                      <h3 className="font-bold text-base text-[#000080]">ABOUT DOWLET1</h3>
                    </div>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600 mb-5">
                    <p className="font-semibold text-slate-800 text-sm">
                      "One Platform for Unified Government Services"
                    </p>
                    <p className="leading-relaxed">
                      DOWLET1 is an SIH prototype concept designed to provide a unified interface for discovering, applying for and tracking government services.
                    </p>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-700">Version:</span>
                        <span>1.0.0 Demo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-700">Build:</span>
                        <span>SIH Prototype</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-700">Team:</span>
                        <span>Smart India Hackathon</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModal('terms')}
                      className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Terms & Conditions
                    </button>
                    <button
                      onClick={() => setActiveModal('privacyPolicy')}
                      className="flex-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#000080] font-bold text-xs"
                    >
                      Privacy Policy
                    </button>
                  </div>
                </div>
              )}

              {/* ── 14. PRIVACY POLICY MODAL (Section 25) ── */}
              {activeModal === 'privacyPolicy' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <Shield size={16} className="text-[#000080]" />
                      <span>Privacy Policy (Prototype)</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1 text-xs text-slate-600">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                      <strong>Important Notice:</strong> This is a prototype and demonstration system. Production deployment would require appropriate legal, security and data-protection controls in compliance with the Digital Personal Data Protection (DPDP) Act.
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">1. Information Used</h4>
                      <p>Only demo mock attributes (e.g. mock name, simulated occupation, mock income bracket) are stored locally in the browser.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">2. Consent</h4>
                      <p>Citizen consent is requested and recorded explicitly prior to reusing any profile field or document for service processing.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">3. Document Reuse</h4>
                      <p>Verified certificates uploaded or linked to the Document Wallet are reused across eligible departments only under active citizen permissions.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">4. Security</h4>
                      <p>The prototype emulates multi-factor OTP checkpoints and device session safety tokens without sending data to third parties.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">5. Data Sharing</h4>
                      <p>Data sharing is strictly sandboxed. No actual government databases or external commercial networks are connected.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">6. User Control</h4>
                      <p>Citizens can revoke data-sharing toggles or trigger prototype state resets at any time.</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-5 py-2 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs"
                    >
                      Understood
                    </button>
                  </div>
                </div>
              )}

              {/* ── 15. TERMS & CONDITIONS MODAL (Section 26) ── */}
              {activeModal === 'terms' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <FileText size={16} className="text-[#000080]" />
                      <span>Terms & Conditions (Prototype)</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 text-xs text-slate-600">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-slate-700 text-[11px]">
                      <strong>Prototype Evaluation Terms:</strong> By interacting with this prototype, you acknowledge that all integrations, identities, and scheme responses are simulated demonstrations.
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">1. Prototype Nature</h4>
                      <p>DOWLET1 is created as a concept demonstrator for unified government service discovery, eligibility checking, and application lifecycle management.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">2. Mock Government Integrations</h4>
                      <p>DigiLocker, Aadhaar, and department registry feeds are simulated using high-fidelity frontend state and localStorage persistence.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">3. No Official Government Service Guarantee</h4>
                      <p>Submitting an application in this prototype does not constitute a legally binding submission to any State or Central Government ministry.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">4. User Responsibility</h4>
                      <p>Users should not enter real sensitive financial passwords, active biometric keys, or real Aadhaar OTPs.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">5. Future Production Deployment Requirements</h4>
                      <p>Transition to production mandates official API gateway accreditation, SOC-2 / MeitY audit clearance, and sovereign cloud infrastructure.</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-5 py-2 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* ── 16. LOGOUT CONFIRMATION MODAL (Section 27) ── */}
              {activeModal === 'logoutConfirm' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <LogOut size={16} className="text-red-600" />
                      <span>Logout Confirmation</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    Are you sure you want to logout?
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 mb-5">
                    * Demo session state will be cleared, while saved prototype demo data will remain safely cached in your browser.
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setActiveModal(null);
                        logout(navigate);
                      }}
                      className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {/* ── 17. ACCOUNT ACTIVITY MODAL ── */}
              {activeModal === 'accountActivity' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#000080]" />
                      <span>Account Activity</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs mb-5">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800">Current Session (Chrome on Windows)</span>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Active Now</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Jaipur, Rajasthan • IP: 103.212.XX.XX (Demo)</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800">Mobile PWA Session</span>
                        <span className="text-[10px] text-slate-400">Yesterday, 18:24</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Android PWA • OTP Verified</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              )}

              {/* ── 18. CONNECTED SERVICES MODAL ── */}
              {activeModal === 'connectedServices' && (
                <div className="p-6">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <ExternalLink size={16} className="text-[#000080]" />
                      <span>Connected Services</span>
                    </h3>
                    <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs mb-5">
                    {[
                      { name: 'DigiLocker Ecosystem', desc: 'Auto-retrieval of Class X, XII and Domicile certificates', status: 'Linked' },
                      { name: 'State Citizen Portal (Rajasthan)', desc: 'Unified single-sign-on and Jan Aadhaar data mesh', status: 'Linked' },
                      { name: 'National Scholarship Portal (NSP)', desc: 'Pre-verified academic grant submissions', status: 'Authorized' }
                    ].map((srv, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800">{srv.name}</p>
                          <p className="text-[11px] text-slate-500">{srv.desc}</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                          {srv.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
}

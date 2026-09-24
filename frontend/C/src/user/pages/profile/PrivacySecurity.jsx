import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import {
  Lock, Shield, Key, Smartphone, Clock, CheckCircle2,
  AlertTriangle, ChevronRight, Share2, FileText, X,
  ExternalLink, ArrowLeft, RefreshCw
} from 'lucide-react';
import {
  getSecuritySettings,
  updateSecuritySetting,
  getConsentSettings,
  updateConsentSetting,
  getProfile
} from '../../../utils/demoState';

export default function PrivacySecurity() {
  const navigate = useNavigate();
  const profile = getProfile();

  const [securitySettings, setSecuritySettings] = useState(getSecuritySettings());
  const [consentSettings, setConsentSettings] = useState(getConsentSettings());
  const [toastMessage, setToastMessage] = useState(null);

  // Modals: 'changePassword', 'sessions', 'connectedServices'
  const [activeModal, setActiveModal] = useState(null);

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleSecurity = (key) => {
    const nextVal = !securitySettings[key];
    const updated = updateSecuritySetting(key, nextVal);
    setSecuritySettings({ ...updated });
    showToast('Security preference updated.');
  };

  const handleToggleConsent = (key) => {
    const nextVal = !consentSettings[key];
    const updated = updateConsentSetting(key, nextVal);
    setConsentSettings({ ...updated });
    showToast('Preference updated.');
  };

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
    showToast('✓ Password updated successfully.');
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50 text-slate-800">
      
      {/* Top Header */}
      <AppHeader title="Privacy & Security" onBack={() => navigate('/profile')} />

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={16} className="text-[#138808]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 pt-3 pb-8 space-y-4">

        {/* ═══════════════ LOGIN & SECURITY CARD (Section 16) ═══════════════ */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
          <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center">
              <Lock size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">LOGIN & SECURITY</h2>
              <p className="text-[11px] text-slate-400">Authentication credentials and device session policy</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs mb-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Mobile / Email Login</p>
                <p className="text-[11px] text-slate-500">{profile.email} • {profile.mobile}</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 size={11} className="text-[#138808]" />
                <span>✓ Active</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">OTP Verification</p>
                <p className="text-[11px] text-slate-500">2-Factor Authentication enabled across all logins</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 size={11} className="text-[#138808]" />
                <span>✓ Enabled</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Remember Me</p>
                <p className="text-[11px] text-slate-500">Maintain active session cache locally</p>
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

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">Session Security</p>
                <p className="text-[11px] text-slate-500">Cryptographically signed tokens active</p>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                Active
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={() => setActiveModal('changePassword')}
              className="flex-1 py-2.5 rounded-xl bg-[#000080] hover:bg-blue-900 text-white font-bold text-xs transition-colors shadow-sm text-center"
            >
              Change Password
            </button>
            <button
              onClick={() => {
                showToast('Signed out of other active sessions.');
              }}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors text-center"
            >
              Sign Out of Other Sessions
            </button>
          </div>
        </div>

        {/* ═══════════════ DATA SHARING & CONSENTS CARD ═══════════════ */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Share2 size={16} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800">Data Sharing & Consent Preferences</h2>
                <p className="text-[11px] text-slate-400">Control data reuse across ministries and programs</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/profile?section=consent')}
              className="text-xs font-bold text-[#000080] hover:underline"
            >
              Full View →
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { key: 'profileInfoReuse', label: 'Profile Information Reuse', desc: 'Auto pre-fill verified name and demographics' },
              { key: 'documentReuse', label: 'Document Reuse', desc: 'Share wallet certificates with eligible schemes' },
              { key: 'applicationDataSharing', label: 'Application Data Sharing', desc: 'Cross-ministry benefit verification' },
              { key: 'personalizedRecommendations', label: 'Personalized Service Recommendations', desc: 'AI discovery matching your profile' },
              { key: 'notifications', label: 'Notifications', desc: 'Real-time push alerts on updates' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="pr-3">
                  <p className="font-bold text-slate-800">{item.label}</p>
                  <p className="text-[10px] text-slate-500">{item.desc}</p>
                </div>
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
            ))}
          </div>
        </div>

        {/* ═══════════════ CONNECTED SERVICES & ACTIVITY ═══════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-2 mb-2 text-[#000080]">
              <Smartphone size={16} />
              <h3 className="font-bold text-xs uppercase tracking-wider">Connected Services</h3>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              External platforms authorized under your digital identity.
            </p>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>DigiLocker</span>
                <span className="text-emerald-700 font-bold">✓ Linked</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Jan Aadhaar / State ID</span>
                <span className="text-emerald-700 font-bold">✓ Linked</span>
              </div>
              <div className="flex justify-between py-1">
                <span>National Scholarship</span>
                <span className="text-blue-700 font-bold">Authorized</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-2 mb-2 text-indigo-700">
              <Clock size={16} />
              <h3 className="font-bold text-xs uppercase tracking-wider">Activity History</h3>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Recent authentication events and consent grants.
            </p>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Web Portal Login</span>
                <span className="text-slate-400">Just now</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Income Certificate Consent</span>
                <span className="text-slate-400">24 Sep 2026</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Scholarship Data Reused</span>
                <span className="text-slate-400">22 Sep 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ SECTION 34: SECURITY UX ═══════════════ */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs">
          <div className="flex items-center gap-2 text-[#000080] font-bold mb-1">
            <Shield size={15} />
            <span>🔐 SECURITY & COMPLIANCE</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-medium">
            Your account controls and verification safeguards are managed through the DOWLET1 citizen interface.
          </p>
          <p className="text-[11px] text-slate-500 mt-1 italic leading-normal">
            Account operations utilize encrypted authentication, audit logging and trusted identity-provider integration.
          </p>
        </div>

      </div>

      {/* ── CHANGE PASSWORD MODAL (Section 17) ── */}
      {activeModal === 'changePassword' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
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
                  type="password"
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
                  type="password"
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
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#000080] text-slate-800"
                />
              </div>

              <div className="p-2.5 bg-slate-50 text-slate-500 rounded-xl text-[11px]">
                * Security note: Password changes are securely verified and encrypted.
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
        </div>
      )}

    </div>
  );
}

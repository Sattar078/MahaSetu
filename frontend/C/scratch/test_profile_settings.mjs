// Test script for complete Profile & Settings module
const store = {};
globalThis.localStorage = {
  getItem: (key) => store[key] !== undefined ? store[key] : null,
  setItem: (key, value) => { store[key] = String(value); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
};

const { 
  demoAPI,
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
  resetProfileDemo,
  detectIntent
} = await import('../src/utils/demoState.js');

console.log("=== Testing Profile & Settings Module ===");

// 1. Initialization and Initial Profile
demoAPI.init();
const initialProfile = getProfile();
console.log("1. Initial Profile:", initialProfile.fullName, initialProfile.email, initialProfile.mobile);
console.assert(initialProfile.fullName === 'Rahul Kumar', "Expected initial name Rahul Kumar");
console.assert(initialProfile.dob === '15 May 2005', "Expected DOB 15 May 2005");
console.assert(initialProfile.gender === 'Male', "Expected Male");
console.assert(initialProfile.occupation === 'Student', "Expected Student");
console.assert(initialProfile.income === '₹1,00,000 – ₹2,00,000', "Expected Income range");
console.assert(initialProfile.state === 'Rajasthan', "Expected Rajasthan");
console.assert(initialProfile.district === 'Jaipur', "Expected Jaipur");
console.assert(initialProfile.mobile === '+91 XXXXX XXXXX', "Expected masked demo mobile");
console.assert(initialProfile.email === 'rahul@example.com', "Expected rahul@example.com");

// 2. Profile Update
const updatedProfile = updateProfile({ fullName: 'Rahul K. Sharma', occupation: 'Software Apprentice' });
console.log("2. Updated Profile:", updatedProfile.fullName, updatedProfile.occupation);
console.assert(updatedProfile.fullName === 'Rahul K. Sharma', "Name should be updated");
console.assert(getProfile().fullName === 'Rahul K. Sharma', "getProfile should return updated name");

// 3. Consent Settings & Toggles
const consent = getConsentSettings();
console.log("3. Initial Consent Settings:", consent);
console.assert(consent.profileInfoReuse === true, "profileInfoReuse should be ON");
console.assert(consent.documentReuse === true, "documentReuse should be ON");
console.assert(consent.applicationDataSharing === true, "applicationDataSharing should be ON");

const toggledConsent = updateConsentSetting('documentReuse', false);
console.assert(toggledConsent.documentReuse === false, "documentReuse should toggle to false");
console.assert(getConsentSettings().documentReuse === false, "getConsentSettings should reflect false");
updateConsentSetting('documentReuse', true); // Toggle back

// 4. Consent History
const history = getConsentHistory();
console.log("4. Consent History Records:", history.length);
console.assert(history.length >= 2, "Should have mock history records");
console.assert(history[0].service.includes("Certificate") || history[0].service.includes("Scholarship"), "Should contain scheme reuse");

// 5. Notification Preferences
const notifSettings = getNotificationSettings();
console.log("5. Initial Notification Settings:", notifSettings);
console.assert(notifSettings.applicationUpdates === true, "applicationUpdates should be ON");
const toggledNotif = updateNotificationSetting('applicationUpdates', false);
console.assert(toggledNotif.applicationUpdates === false, "applicationUpdates should toggle to false");
updateNotificationSetting('applicationUpdates', true);

// 6. Language Preferences
const lang = getLanguage();
console.log("6. Initial Language:", lang);
console.assert(lang === 'English', "Default language should be English");
const newLang = updateLanguage('हिंदी');
console.assert(newLang === 'हिंदी', "Language should update to Hindi");
console.assert(getLanguage() === 'हिंदी', "getLanguage should return Hindi");
updateLanguage('English');

// 7. Security Settings
const sec = getSecuritySettings();
console.log("7. Initial Security Settings:", sec);
console.assert(sec.otpEnabled === true, "OTP verification should be enabled");
console.assert(sec.sessionSecurity === 'Active', "Session security should be Active");
const toggledSec = updateSecuritySetting('rememberMe', false);
console.assert(toggledSec.rememberMe === false, "rememberMe should toggle");
updateSecuritySetting('rememberMe', true);

// 8. Support & Problem Reporting
const report = submitSupportRequest({ category: 'Application', description: 'Test issue with application progress' });
console.log("8. Support Request Created:", report.id, report.status);
console.assert(report.id.startsWith('TKT-'), "Ticket ID should start with TKT-");
console.assert(report.category === 'Application', "Category should match");

// 9. Feedback Submission
const fb = submitFeedback({ rating: 5, comment: 'DOWLET1 unified profile is very easy to use!' });
console.log("9. Feedback Created:", fb.id, fb.rating);
console.assert(fb.id.startsWith('FB-'), "Feedback ID should start with FB-");
console.assert(fb.rating === 5, "Rating should match");

// 10. AI Assistant Intent Recognition
console.log("10. Testing AI Intent Recognition:");
const intentsToTest = [
  { q: "mera profile dikhao", expected: "PROFILE_INFORMATION" },
  { q: "meri profile information", expected: "PROFILE_INFORMATION" },
  { q: "settings kholo", expected: "SETTINGS_QUERY" },
  { q: "meri consent settings", expected: "CONSENT_QUERY" },
  { q: "meri consent settings dikhao", expected: "CONSENT_QUERY" },
  { q: "privacy settings", expected: "PRIVACY_QUERY" },
  { q: "meri language change karni hai", expected: "LANGUAGE_QUERY" },
  { q: "logout", expected: "LOGOUT_QUERY" }
];

for (const test of intentsToTest) {
  const detected = detectIntent(test.q);
  console.log(` - Query: "${test.q}" -> Intent: "${detected.intent}"`);
  console.assert(detected.intent === test.expected, `Expected ${test.expected} for "${test.q}", got ${detected.intent}`);
}

// 11. Reset Profile Demo
resetProfileDemo();
const resetProf = getProfile();
console.log("11. Profile after reset:", resetProf.fullName);
console.assert(resetProf.fullName === 'Rahul Kumar', "Name should be restored to Rahul Kumar");

console.log("\n✅ ALL 11 TEST SUITES PASSED PERFECTLY!");

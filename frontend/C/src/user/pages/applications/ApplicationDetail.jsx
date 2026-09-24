import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { 
  CheckCircle2, Clock, Circle, RefreshCw, FileText, 
  AlertCircle, ChevronDown, ChevronUp, Download, Eye, 
  ShieldCheck, ArrowLeft, Bot, X, Check, ArrowRight, Award
} from 'lucide-react';
import { 
  demoAPI, 
  getApplicationById, 
  updateApplicationStatus, 
  resolveActionRequired 
} from '../../../utils/demoState';

export default function ApplicationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Collapsible section toggles
  const [isAppInfoOpen, setIsAppInfoOpen] = useState(true);
  const [isDocsOpen, setIsDocsOpen] = useState(true);

  // Modals
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [docPreviewModal, setDocPreviewModal] = useState(null); // document object if open
  const [provideDocModalOpen, setProvideDocModalOpen] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  useEffect(() => {
    demoAPI.init();
    if (id) {
      const found = getApplicationById(id);
      setApp(found);
    }
  }, [id]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRefreshStatus = () => {
    if (!app) return;
    setIsRefreshing(true);
    setTimeout(() => {
      const updated = updateApplicationStatus(app.id);
      setApp(updated);
      setIsRefreshing(false);
      showToast(`Status updated to '${updated.status}'.`);
    }, 750);
  };

  const handleResolveAction = () => {
    if (!app) return;
    setUploadingDoc(true);
    setTimeout(() => {
      const resolved = resolveActionRequired(app.id, app.requiredActionDocument || "Bank Account Proof");
      setApp(resolved);
      setUploadingDoc(false);
      setProvideDocModalOpen(false);
      showToast("Document verified and uploaded successfully. Application resumed.");
    }, 900);
  };

  const handleDownloadCertificate = () => {
    showToast("Certificate downloaded successfully.");
  };

  if (!app) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-slate-50">
        <AppHeader title="Application Details" onBack={() => navigate('/applications')} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-base font-bold text-slate-800 mb-1">Application could not be found.</h2>
          <p className="text-xs text-slate-500 mb-6 max-w-xs">
            The requested application reference ID does not exist in the official records.
          </p>
          <button
            onClick={() => navigate('/applications')}
            className="bg-[#000080] text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-sm"
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  // Next steps narrative adapting dynamically to current status
  const getNextStepsText = () => {
    if (app.statusType === 'action-required') {
      return "Action required from you: please upload the requested Bank Account Proof to resume official verification.";
    }
    if (app.statusType === 'completed' || app.statusStep === 4) {
      return "Your certificate has been issued and digitally signed. You can view or download your certificate below.";
    }
    if (app.statusStep === 0) {
      return "Your application has been registered online. Initial automated document verification is scheduled next.";
    }
    if (app.statusStep === 1) {
      return "Your submitted documents have been received from Document Wallet. The next step is field and revenue database cross-check.";
    }
    if (app.statusStep === 2) {
      return "Your submitted information is being verified. The next step is officer verification.";
    }
    if (app.statusStep === 3) {
      return "Your application has passed field checks and is awaiting final officer approval and digital signature.";
    }
    return app.nextSteps || "Your application is being processed according to citizen service standards.";
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50 pb-28 relative">
      <AppHeader title="Application Details" onBack={() => navigate('/applications')} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} className="text-[#138808]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex-1 px-5 pt-5 flex flex-col space-y-5">

        {/* 1. Header Card with Service & ID */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm relative overflow-hidden">
          {/* Top flag accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-slate-200 to-[#138808]"></div>
          
          <div className="flex items-start justify-between gap-3 mb-2 pt-1">
            <div>
              <p className="text-[10px] font-bold text-[#000080] uppercase tracking-wider mb-0.5">
                {app.department}
              </p>
              <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
                {app.serviceName}
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 font-semibold shrink-0">
              {app.id}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
            <span>Submitted: {app.submittedDate || 'Recent'}</span>
            <span>State: {app.state || 'Rajasthan'}</span>
          </div>
        </div>

        {/* 2. Prominent Current Status Card */}
        <div className={`rounded-2xl p-5 border shadow-sm ${
          app.statusType === 'completed'
            ? 'bg-green-50/80 border-green-200 text-green-950'
            : app.statusType === 'action-required'
              ? 'bg-amber-50/90 border-amber-200 text-amber-950'
              : 'bg-blue-50/80 border-blue-200 text-blue-950'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-70">
              CURRENT STATUS
            </span>
            <span className="text-[10px] font-bold bg-white/80 px-2.5 py-0.5 rounded-full shadow-sm border border-slate-200/50">
              Step {Math.min((app.statusStep ?? 0) + 1, 5)} of 5
            </span>
          </div>

          <div className="flex items-center gap-2 my-2">
            {app.statusType === 'completed' ? (
              <CheckCircle2 size={20} className="text-[#138808] shrink-0" />
            ) : app.statusType === 'action-required' ? (
              <AlertCircle size={20} className="text-amber-600 shrink-0 animate-pulse" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-[#000080] border-2 border-white shadow-sm shrink-0"></div>
            )}
            <h3 className="text-base font-bold">
              {app.currentStatus || app.status}
            </h3>
          </div>

          <p className="text-xs opacity-80 leading-relaxed mb-4">
            Your application is currently under official review and verification under the DOWLET1 framework.
          </p>

          {/* Action Required Banner inside status card */}
          {app.statusType === 'action-required' && (
            <div className="bg-white p-3.5 rounded-xl border border-amber-300 shadow-sm mb-4">
              <p className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                <AlertCircle size={14} className="text-amber-600" />
                Missing Document Notice
              </p>
              <p className="text-xs text-amber-800 leading-snug mb-3">
                {app.actionRequiredMessage || "Please provide Bank Account Proof to continue."}
              </p>
              <button
                onClick={() => setProvideDocModalOpen(true)}
                className="w-full bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                Provide Document <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Completed State Actions */}
          {app.statusType === 'completed' && (
            <div className="bg-white p-4 rounded-xl border border-green-200 shadow-sm mb-4">
              <p className="text-xs font-bold text-green-900 mb-1 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#138808]" />
                ✓ CERTIFICATE ISSUED
              </p>
              <p className="text-xs text-green-800 mb-3">
                Your application has been successfully completed.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCertificateModalOpen(true)}
                  className="flex-1 bg-[#138808] hover:bg-green-700 text-white text-xs font-bold py-2 rounded-lg shadow-sm flex items-center justify-center gap-1 transition-colors"
                >
                  <Eye size={14} /> View Certificate
                </button>
                <button
                  onClick={handleDownloadCertificate}
                  className="flex-1 bg-white border border-green-300 text-green-800 text-xs font-bold py-2 rounded-lg hover:bg-green-50 shadow-sm flex items-center justify-center gap-1 transition-colors"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          )}

          {/* Refresh Status button */}
          <button
            onClick={handleRefreshStatus}
            disabled={isRefreshing || app.statusType === 'completed'}
            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
              app.statusType === 'completed'
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                : 'bg-white hover:bg-slate-50 text-[#000080] border border-blue-200 hover:scale-[0.99]'
            }`}
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin text-[#FF9933]" : ""} />
            <span>
              {isRefreshing ? "Checking latest application status..." : "Refresh Status"}
            </span>
          </button>
        </div>

        {/* 3. Vertical Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 mb-5 uppercase tracking-wide flex items-center gap-2">
            <Clock size={16} className="text-[#000080]" />
            Application Timeline
          </h3>

          <div className="space-y-0 pl-1">
            {(app.timeline || []).map((step, idx) => {
              const isDone = step.status === 'completed';
              const isCurrent = step.status === 'current';
              const isPending = step.status === 'pending';

              return (
                <div key={idx} className="flex gap-3.5">
                  {/* Step Icon Column */}
                  <div className="flex flex-col items-center">
                    {isDone ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#138808] border-2 border-[#138808] flex items-center justify-center shrink-0 shadow-sm">
                        <Check size={13} strokeWidth={3} />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#000080] border-2 border-[#000080] flex items-center justify-center shrink-0 shadow-sm ring-4 ring-blue-100">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF9933]"></div>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0">
                        <Circle size={10} className="text-slate-300 fill-slate-200" />
                      </div>
                    )}

                    {/* Connecting line */}
                    {idx < (app.timeline.length - 1) && (
                      <div className={`w-[2px] flex-1 my-1 ${isDone ? 'bg-[#138808]' : 'bg-slate-200'}`} />
                    )}
                  </div>

                  {/* Step Description */}
                  <div className="pb-6 pt-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-bold ${
                        isDone ? 'text-slate-900' : isCurrent ? 'text-[#000080]' : 'text-slate-400'
                      }`}>
                        {step.title}
                      </p>
                      {step.date && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          {step.date}
                        </span>
                      )}
                    </div>
                    {step.desc && (
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {step.desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. What Happens Next? */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
            WHAT HAPPENS NEXT?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            {getNextStepsText()}
          </p>
        </div>

        {/* 5. Collapsible: Application Information */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <button
            onClick={() => setIsAppInfoOpen(!isAppInfoOpen)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Application Information
            </span>
            {isAppInfoOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>

          {isAppInfoOpen && (
            <div className="p-4 pt-1 border-t border-slate-100 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Applicant</span>
                <span className="font-bold text-slate-800">{app.applicantName || "Rahul Kumar"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Service</span>
                <span className="font-bold text-slate-800">{app.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Department</span>
                <span className="font-bold text-slate-800">{app.department}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Application ID</span>
                <span className="font-mono font-bold text-[#000080]">{app.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Submitted Date</span>
                <span className="font-bold text-slate-800">{app.submittedDate || "22 Sep 2026"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-medium">State</span>
                <span className="font-bold text-slate-800">{app.state || "Rajasthan"}</span>
              </div>
            </div>
          )}
        </div>

        {/* 6. Collapsible: Submitted Documents */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <button
            onClick={() => setIsDocsOpen(!isDocsOpen)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Submitted Documents
            </span>
            {isDocsOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>

          {isDocsOpen && (
            <div className="p-4 pt-1 border-t border-slate-100 space-y-2.5">
              {(app.documents || []).map((doc, dIdx) => {
                const docName = typeof doc === 'string' ? doc : doc.name;
                const docType = typeof doc === 'object' && doc.type ? doc.type : 'Verified Digital Document';

                return (
                  <div 
                    key={dIdx}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-[#138808] shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{docName}</p>
                        <p className="text-[10px] text-slate-400">{docType}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setDocPreviewModal({ name: docName, type: docType })}
                      className="text-[11px] font-bold text-[#000080] hover:text-blue-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-colors"
                    >
                      View
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* MODAL 1: Provide Missing Document */}
      {provideDocModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText size={18} className="text-[#000080]" />
                Provide Required Document
              </h3>
              <button onClick={() => setProvideDocModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Your application requires <strong>{app.requiredActionDocument || "Bank Account Proof"}</strong> to proceed with verification and scholarship disbursement.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-4">
              <p className="text-[11px] font-bold text-slate-700 mb-1">Select Document from Wallet / Storage:</p>
              <div className="p-2.5 bg-white rounded-lg border border-blue-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Bank_Passbook_Statement.pdf</span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Ready</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setProvideDocModalOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResolveAction}
                disabled={uploadingDoc}
                className="flex-[1.5] py-2.5 text-xs font-bold text-white bg-[#000080] hover:bg-blue-900 rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                {uploadingDoc ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" /> Uploading...
                  </>
                ) : (
                  <>Upload & Continue</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Document Preview */}
      {docPreviewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-extrabold bg-blue-50 text-[#000080] px-2 py-0.5 rounded border border-blue-100 tracking-wider uppercase">
                DOCUMENT PREVIEW
              </span>
              <button onClick={() => setDocPreviewModal(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={18} />
              </button>
            </div>

            {/* Document preview card */}
            <div className="my-4 p-5 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl border border-slate-200 relative overflow-hidden text-center">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06] -rotate-12">
                <p className="text-4xl font-extrabold tracking-widest text-slate-900">
                  OFFICIAL ATTACHMENT
                </p>
              </div>

              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 mx-auto mb-3 text-[#000080]">
                <FileText size={24} />
              </div>

              <h4 className="font-bold text-slate-900 text-sm mb-1">{docPreviewModal.name}</h4>
              <p className="text-[11px] text-slate-500 mb-3">{docPreviewModal.type}</p>

              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-slate-200/60 text-left space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Verified Holder:</span>
                  <span className="font-bold text-slate-800">Rahul Kumar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verification Source:</span>
                  <span className="font-semibold text-[#138808]">DigiLocker / DOWLET1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-[#138808]">Verified ✓</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setDocPreviewModal(null)}
              className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: Certificate Preview */}
      {certificateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-extrabold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider">
                DIGITAL CERTIFICATE
              </span>
              <button onClick={() => setCertificateModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={18} />
              </button>
            </div>

            {/* Certificate Body with Watermark */}
            <div className="my-4 p-6 bg-gradient-to-b from-amber-50/20 via-white to-blue-50/20 border-2 border-double border-slate-300 rounded-xl relative overflow-hidden text-center shadow-inner">
              
              {/* Diagonal Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.08] -rotate-45">
                <p className="text-2xl font-extrabold tracking-widest text-[#000080] leading-tight">
                  DIGITAL COPY • OFFICIAL RECORD
                </p>
              </div>

              {/* State Emblem / Tricolor D Emblem */}
              <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center mx-auto mb-2 border border-[#000080]/20 shadow-sm">
                <img src="/dowlet-logo.png" alt="Emblem" className="w-full h-full object-contain" />
              </div>

              <h3 className="font-extrabold text-xs text-slate-800 tracking-wider uppercase">
                Government of Rajasthan
              </h3>
              <p className="text-[10px] font-bold text-[#000080] uppercase tracking-wide mb-3">
                {app.department}
              </p>

              <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent my-2"></div>

              <h4 className="font-black text-sm text-slate-900 uppercase my-2 tracking-wide">
                {app.serviceName}
              </h4>

              <p className="text-[10px] text-slate-600 leading-relaxed px-2 my-3">
                This is to certify that <strong>{app.applicantName || "Rahul Kumar"}</strong>, resident of Jaipur, Rajasthan, has successfully completed all verification requirements under the DOWLET1 framework.
              </p>

              {/* Certificate Details */}
              <div className="bg-white/90 p-3 rounded-lg border border-slate-200 text-left space-y-1.5 text-[10px] mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Certificate No:</span>
                  <span className="font-mono font-bold text-slate-900">{app.certificateNumber || "RC-RJ-2026-8849102"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Application ID:</span>
                  <span className="font-mono text-slate-700">{app.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Issue Date:</span>
                  <span className="font-bold text-slate-800">{app.issueDate || "22 Sep 2026"}</span>
                </div>
              </div>

              {/* Digital Signature & QR code box */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[9px]">
                <div className="text-left">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck size={13} /> Digitally Signed
                  </span>
                  <span className="text-slate-400 block">DOWLET1 Authority</span>
                </div>
                <div className="w-12 h-12 bg-slate-100 border border-slate-300 rounded flex flex-col items-center justify-center text-[8px] text-slate-400 font-mono">
                  [ QR ]
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setCertificateModalOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleDownloadCertificate}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-[#000080] hover:bg-blue-900 rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

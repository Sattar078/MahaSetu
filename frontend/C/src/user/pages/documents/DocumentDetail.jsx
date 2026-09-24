import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  AppHeader 
} from '../../components/Navigation';
import MainLayout from '../../components/MainLayout';
import { 
  FileText, CheckCircle2, Clock, AlertTriangle, Calendar, 
  ExternalLink, Eye, Share2, Trash2, ArrowLeft, Download, 
  Lock, Check, RefreshCw, X, ShieldCheck, Sparkles, Building2
} from 'lucide-react';
import { 
  getDocumentById, 
  replaceDocument, 
  deleteDocument, 
  verifyDocument, 
  reuseDocument,
  getDocumentUsage 
} from '../../../utils/demoState';

export default function DocumentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doc, setDoc] = useState(null);
  const [usage, setUsage] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [replaceOpen, setReplaceOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reuseOpen, setReuseOpen] = useState(false);
  const [reuseStep, setReuseStep] = useState('select'); // 'select' | 'consent'
  const [targetService, setTargetService] = useState('income_certificate');
  const [consentAgreed, setConsentAgreed] = useState(true);

  const [replaceFileName, setReplaceFileName] = useState('updated_proof_2026.pdf');
  const [loading, setLoading] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    loadDocument();
  }, [id]);

  const loadDocument = () => {
    const found = getDocumentById(id);
    setDoc(found);
    if (found) {
      setUsage(getDocumentUsage(found.id));
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleVerify = () => {
    if (!doc) return;
    setLoading('verifying');
    setTimeout(() => {
      verifyDocument(doc.id);
      setLoading(null);
      loadDocument();
      showToast('✓ Demo verification completed. Document is now verified.');
    }, 1500);
  };

  const handleReplace = (e) => {
    e.preventDefault();
    if (!doc) return;
    setLoading('replacing');
    setTimeout(() => {
      replaceDocument(doc.id, { fileName: replaceFileName });
      setLoading(null);
      setReplaceOpen(false);
      loadDocument();
      showToast('✓ Document replaced successfully. Status: Verification Pending');
    }, 1200);
  };

  const handleDelete = () => {
    if (!doc) return;
    setLoading('deleting');
    setTimeout(() => {
      deleteDocument(doc.id);
      setLoading(null);
      setDeleteOpen(false);
      navigate('/documents');
    }, 800);
  };

  const handleAllowReuse = () => {
    if (!doc) return;
    reuseDocument(doc.id, targetService);
    setReuseOpen(false);
    navigate(`/apply/${targetService}?reusedDoc=${doc.id}&reuse=true`);
  };

  if (!doc) {
    return (
      <MainLayout>
        <div className="flex flex-col min-h-full pb-20 lg:pb-8 bg-slate-50">
          <AppHeader title="Document Details" onBack={() => navigate('/documents')} />
          <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 text-center shadow-sm">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FileText size={26} />
            </div>
            <h2 className="text-base font-bold text-slate-800 mb-1">Document Not Found</h2>
            <p className="text-xs text-slate-500 mb-6">
              The requested document ID ({id}) could not be found in your prototype wallet.
            </p>
            <button
              onClick={() => navigate('/documents')}
              className="bg-[#000080] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md"
            >
              Back to Document Wallet
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col min-h-full pb-20 lg:pb-8 bg-slate-50/50">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in duration-300">
            <Sparkles size={14} className="text-[#FF9933]" />
            <span>{toastMessage}</span>
          </div>
        )}

        <AppHeader 
          title={doc.name} 
          onBack={() => navigate('/documents')}
          rightElement={
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-[#000080]">
              DEMO / PROTOTYPE
            </span>
          }
        />

        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-2">
          
          {/* Main Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6 relative overflow-hidden">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#000080] flex items-center justify-center shrink-0 shadow-xs">
                  <FileText size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {doc.category || 'General'}
                    </span>
                    <span className="text-xs font-mono text-slate-400">ID: {doc.id}</span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {doc.name}
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 font-medium">
                    <Building2 size={13} className="text-slate-400" />
                    <span>{doc.issuer}</span>
                  </p>
                </div>
              </div>

              {/* Status badge */}
              <div>
                {doc.status === 'verified' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                    <CheckCircle2 size={15} className="text-[#138808]" />
                    <span>✓ Demo Verified</span>
                  </span>
                ) : doc.status === 'pending' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs">
                    <Clock size={15} className="text-amber-600 animate-pulse" />
                    <span>● Verification Pending</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs">
                    <AlertTriangle size={15} className="text-rose-600" />
                    <span>⚠ Action Required</span>
                  </span>
                )}
              </div>
            </div>

            {/* Document Attributes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-slate-100 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">File Name & Size</span>
                <span className="font-mono text-slate-800 font-bold">{doc.fileName}</span>
                <span className="text-slate-400 ml-2">({doc.fileSize || '1.2 MB'})</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Added Date</span>
                <span className="font-bold text-slate-800">{doc.addedDate}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Masked Identification</span>
                <span className="font-mono text-slate-800 font-bold">{doc.docNumberMasked || 'XXXX-XXXX-XXXX'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-semibold block mb-0.5">Validity / Expiry</span>
                <span className="font-bold text-slate-800">{doc.expiryDate || 'Permanent / Lifetime'}</span>
              </div>
            </div>

            {/* USED IN APPLICATIONS SECTION */}
            <div className="py-6 border-b border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Used In Applications
                </h3>
                <span className="text-[11px] text-[#000080] font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                  {usage.length} Linked Services
                </span>
              </div>

              {usage.length > 0 ? (
                <div className="space-y-2.5">
                  {usage.map((u, i) => (
                    <div
                      key={i}
                      onClick={() => navigate(`/applications/${u.id}`)}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#000080] hover:bg-blue-50/40 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#000080]">
                          {u.serviceName}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                          App Ref: {u.id} • Status: {u.status}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#000080]">
                        <span>View</span>
                        <ExternalLink size={13} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-xs text-slate-400">
                    This document has not been reused in any active applications yet.
                  </p>
                </div>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-2xl transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  <span>View Preview</span>
                </button>

                <button
                  onClick={() => {
                    setReuseStep('select');
                    setReuseOpen(true);
                  }}
                  className="py-3 px-4 bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold rounded-2xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Share2 size={16} />
                  <span>Reuse in Service</span>
                </button>

                {doc.status === 'pending' ? (
                  <button
                    disabled={loading === 'verifying'}
                    onClick={handleVerify}
                    className="py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-2xl transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={16} className={loading === 'verifying' ? 'animate-spin' : ''} />
                    <span>{loading === 'verifying' ? 'Checking...' : 'Check Verification'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setReplaceOpen(true)}
                    className="py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-2xl transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={15} />
                    <span>Replace Document</span>
                  </button>
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => navigate('/documents')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Wallet</span>
                </button>

                <button
                  onClick={() => setDeleteOpen(true)}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Delete from Wallet</span>
                </button>
              </div>
            </div>

          </div>

          {/* Security Banner */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs flex items-center gap-3">
            <Lock size={18} className="text-[#000080] shrink-0" />
            <p className="leading-relaxed">
              🔐 <strong>Document Security Notice:</strong> Documents shown here are part of the DOWLET1 prototype. A production implementation would use authenticated storage, encryption, access control, consent and audit logging.
            </p>
          </div>

        </div>

        {/* ═══════════════ MODALS ═══════════════ */}
        {/* Preview Modal */}
        {previewOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900">DOCUMENT PREVIEW</h3>
                <button onClick={() => setPreviewOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 bg-gradient-to-b from-amber-50/30 via-white to-blue-50/20 border-2 border-double border-slate-300 rounded-2xl relative overflow-hidden text-center shadow-inner my-2">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.09] -rotate-45">
                  <p className="text-2xl sm:text-3xl font-black tracking-widest text-red-900 leading-tight">
                    DEMO / NOT AN OFFICIAL DOCUMENT
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center mx-auto mb-2 border border-[#000080]/20 shadow-sm">
                  <img src="/dowlet-logo.png" alt="Emblem" className="w-full h-full object-contain" />
                </div>

                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">
                  Government of Rajasthan • Citizen Services Mesh
                </p>
                <p className="text-[9px] font-bold text-[#000080] uppercase tracking-wider mb-2">
                  {doc.issuer}
                </p>

                <div className="h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent my-3" />

                <h2 className="text-base font-black text-slate-900 uppercase tracking-wide mb-1">
                  {doc.name}
                </h2>
                <p className="text-[10px] font-mono text-slate-500 mb-4">
                  Doc Ref: {doc.id} • Masked ID: {doc.docNumberMasked || 'XXXX-XXXX-4819'}
                </p>

                <div className="grid grid-cols-2 gap-2 text-left bg-white/90 p-3 rounded-xl border border-slate-200 text-xs mb-4">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Citizen Name</span>
                    <span className="font-bold text-slate-800">Rahul Kumar</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">State</span>
                    <span className="font-bold text-slate-800">Rajasthan</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[9px] text-slate-400 block">Added Date</span>
                    <span className="font-medium text-slate-700">{doc.addedDate}</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[9px] text-slate-400 block">Status</span>
                    <span className="font-bold text-emerald-700">{doc.status === 'verified' ? '✓ Verified' : '● Verification Pending'}</span>
                  </div>
                </div>

                <div className="inline-block bg-slate-900 text-white font-mono text-[9px] px-3 py-1 rounded-md mb-2">
                  DEMO / NOT AN OFFICIAL DOCUMENT
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => showToast('Demo document downloaded to memory.')}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-[#000080] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Download Demo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reuse & Consent Modal */}
        {reuseOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              {reuseStep === 'select' ? (
                <>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Lock size={16} className="text-[#000080]" />
                      <h3 className="text-base font-extrabold text-slate-900">🔐 REUSE DOCUMENT</h3>
                    </div>
                    <button onClick={() => setReuseOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                      <X size={18} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mb-4">
                    Use this document in an eligible service application without re-uploading.
                  </p>

                  <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-100 mb-4">
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">Document:</span>
                    <p className="text-sm font-black text-[#000080]">{doc.name}</p>
                  </div>

                  <div className="mb-5 space-y-2">
                    <label className="text-xs font-bold text-slate-800 block">Select Service:</label>
                    {[
                      { id: 'income_certificate', name: 'Income Certificate Application' },
                      { id: 'scholarship', name: 'Post-Matric Scholarship Scheme' },
                      { id: 'residence_certificate', name: 'Residence Certificate' }
                    ].map(s => (
                      <div
                        key={s.id}
                        onClick={() => setTargetService(s.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          targetService === s.id ? 'border-[#000080] bg-blue-50/70 font-bold' : 'border-slate-200'
                        }`}
                      >
                        <span className="text-xs text-slate-900">{s.name}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          targetService === s.id ? 'bg-[#000080] border-[#000080] text-white' : 'border-slate-300'
                        }`}>
                          {targetService === s.id && <Check size={10} />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setReuseOpen(false)} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100">Cancel</button>
                    <button onClick={() => setReuseStep('consent')} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#000080]">Continue</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-[#138808]" />
                      <h3 className="text-base font-extrabold text-slate-900">🔐 DOCUMENT SHARING</h3>
                    </div>
                    <button onClick={() => setReuseOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                      <X size={18} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mb-4">
                    You are about to share pre-verified documents with the destination department:
                  </p>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-4 space-y-2 text-xs">
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Document:</span>
                      <span className="font-extrabold text-slate-900">{doc.name}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">Application:</span>
                      <span className="font-bold text-[#000080]">{targetService}</span>
                    </div>
                    <div className="space-y-1 pt-1 text-[11px] text-emerald-800">
                      <div className="flex items-center gap-1.5"><Check size={12} className="text-[#138808]" /><span>Document name ({doc.name})</span></div>
                      <div className="flex items-center gap-1.5"><Check size={12} className="text-[#138808]" /><span>Document type ({doc.type})</span></div>
                      <div className="flex items-center gap-1.5"><Check size={12} className="text-[#138808]" /><span>Document file ({doc.fileName})</span></div>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/60 border border-blue-200 mb-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentAgreed}
                      onChange={(e) => setConsentAgreed(e.target.checked)}
                      className="mt-0.5 rounded text-[#000080]"
                    />
                    <span className="text-xs text-slate-700 leading-snug">
                      I authorize DOWLET1 to reuse this pre-verified document for this application.
                    </span>
                  </label>

                  <div className="flex gap-2">
                    <button onClick={() => setReuseStep('select')} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100">Back</button>
                    <button disabled={!consentAgreed} onClick={handleAllowReuse} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#000080] disabled:opacity-50">Allow & Continue</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Replace Modal */}
        {replaceOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900">REPLACE DOCUMENT</h3>
                <button onClick={() => setReplaceOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleReplace} className="space-y-4">
                <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl bg-blue-50/30 text-center">
                  <RefreshCw size={22} className="text-[#000080] mx-auto mb-1" />
                  <p className="text-xs font-bold text-slate-800">Replacement File:</p>
                  <p className="text-xs font-mono text-[#000080] font-bold mt-0.5">{replaceFileName}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setReplaceOpen(false)} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100">Cancel</button>
                  <button type="submit" disabled={loading === 'replacing'} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#000080]">
                    {loading === 'replacing' ? 'Updating...' : 'Upload & Replace'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <Trash2 size={24} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-1">Delete Document?</h3>
              <p className="text-xs text-slate-600 mb-5">
                Are you sure you want to remove <strong>{doc.name}</strong> from your DOWLET1 prototype wallet?
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteOpen(false)} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100">Cancel</button>
                <button onClick={handleDelete} disabled={loading === 'deleting'} className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600">
                  {loading === 'deleting' ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
}

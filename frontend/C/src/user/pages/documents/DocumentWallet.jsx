import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Plus, CheckCircle2, Clock, AlertTriangle, HelpCircle,
  FileText, ShieldCheck, ArrowRight, X, Eye, RefreshCw, Trash2, 
  ExternalLink, Download, Share2, Sparkles, Check, Lock, ChevronRight,
  Filter, RotateCcw, AlertCircle, FileCheck, Upload
} from 'lucide-react';
import { AppHeader } from '../../components/Navigation';
import MainLayout from '../../components/MainLayout';
import { 
  getDocuments, 
  uploadDocument, 
  replaceDocument, 
  deleteDocument, 
  verifyDocument, 
  reuseDocument,
  getDocumentActivity,
  resetDocumentDemo,
  demoAPI
} from '../../../utils/demoState';

export default function DocumentWallet() {
  const navigate = useNavigate();
  const location = useLocation();

  const [documents, setDocuments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modals state
  const [previewDoc, setPreviewDoc] = useState(null);
  const [detailsDoc, setDetailsDoc] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [replaceDoc, setReplaceDoc] = useState(null);
  const [deleteDoc, setDeleteDoc] = useState(null);
  const [reuseDoc, setReuseDoc] = useState(null);
  const [reuseStep, setReuseStep] = useState('select'); // 'select' | 'consent'
  const [selectedServiceForReuse, setSelectedServiceForReuse] = useState('income_certificate');
  const [consentAgreed, setConsentAgreed] = useState(true);

  // Form states
  const [uploadForm, setUploadForm] = useState({
    type: 'income',
    name: 'Income Proof',
    fileName: 'income_proof.pdf',
    fileSize: '1.2 MB'
  });
  const [replaceFileName, setReplaceFileName] = useState('updated_document.pdf');
  const [loadingAction, setLoadingAction] = useState(null); // 'uploading' | 'verifying' | 'replacing' | 'deleting'
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    loadData();
    // Auto-open upload if navigated with ?action=upload
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'upload') {
      setUploadModalOpen(true);
    }
  }, [location.search]);

  const loadData = () => {
    demoAPI.init();
    const docs = getDocuments();
    setDocuments(docs);
    setActivities(getDocumentActivity());
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Dynamic summary calculations
  const totalCount = documents.length;
  const verifiedCount = documents.filter(d => d.status === 'verified').length;
  const pendingCount = documents.filter(d => d.status === 'pending').length;
  const actionRequiredCount = documents.filter(d => d.status === 'action_required').length;

  const categories = ['All', 'Identity', 'Address', 'Education', 'Income', 'Certificates', 'Other'];

  // Filter and search logic
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || 
      (doc.category && doc.category.toLowerCase() === selectedCategory.toLowerCase()) ||
      (doc.type && doc.type.toLowerCase() === selectedCategory.toLowerCase());

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      (doc.name && doc.name.toLowerCase().includes(q)) ||
      (doc.type && doc.type.toLowerCase().includes(q)) ||
      (doc.category && doc.category.toLowerCase().includes(q)) ||
      (doc.issuer && doc.issuer.toLowerCase().includes(q)) ||
      (doc.fileName && doc.fileName.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Upload handler
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setLoadingAction('uploading');

    setTimeout(() => {
      uploadDocument({
        name: uploadForm.name,
        type: uploadForm.type,
        fileName: uploadForm.fileName || `${uploadForm.name.toLowerCase().replace(/\s+/g, '_')}.pdf`,
        fileSize: uploadForm.fileSize || '1.2 MB'
      });

      setLoadingAction(null);
      setUploadModalOpen(false);
      loadData();
      showToast('✓ Document uploaded successfully. Status: Verification Pending');
    }, 1200);
  };

  // Replace handler
  const handleReplaceSubmit = (e) => {
    e.preventDefault();
    if (!replaceDoc) return;
    setLoadingAction('replacing');

    setTimeout(() => {
      replaceDocument(replaceDoc.id, {
        fileName: replaceFileName,
        fileSize: '1.4 MB'
      });

      setLoadingAction(null);
      setReplaceDoc(null);
      loadData();
      showToast('✓ Document replaced successfully. Status: Verification Pending');
    }, 1200);
  };

  // Delete handler
  const handleDeleteConfirm = () => {
    if (!deleteDoc) return;
    setLoadingAction('deleting');

    setTimeout(() => {
      deleteDocument(deleteDoc.id);
      setLoadingAction(null);
      setDeleteDoc(null);
      if (detailsDoc && detailsDoc.id === deleteDoc.id) {
        setDetailsDoc(null);
      }
      loadData();
      showToast('Document removed from your wallet.');
    }, 800);
  };

  // Verify handler
  const handleVerifyCheck = (docId) => {
    setLoadingAction(`verifying_${docId}`);

    setTimeout(() => {
      verifyDocument(docId);
      setLoadingAction(null);
      loadData();
      showToast('✓ Verification completed. Document is now verified.');
    }, 1500);
  };

  // Reuse handler
  const handleAllowReuse = () => {
    if (!reuseDoc) return;
    reuseDocument(reuseDoc.id, selectedServiceForReuse);
    loadData();
    setReuseDoc(null);
    setReuseStep('select');
    // Navigate directly into existing application workflow pre-filled
    navigate(`/apply/${selectedServiceForReuse}?reusedDoc=${reuseDoc.id}&reuse=true`);
  };

  // Reset handler
  const handleResetDemo = () => {
    if (window.confirm("Reset Document Wallet to default initial state?")) {
      resetDocumentDemo();
      loadData();
      showToast("Document Wallet reset to initial presentation state.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={13} className="text-[#138808]" />
            <span>Verified</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock size={13} className="text-amber-600 animate-pulse" />
            <span>Verification Pending</span>
          </span>
        );
      case 'action_required':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle size={13} className="text-rose-600" />
            <span>Action Required</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <HelpCircle size={13} />
            <span>Not Verified</span>
          </span>
        );
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-full pb-20 lg:pb-8 bg-slate-50/50">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-from-top-4 duration-300 max-w-sm text-center">
            <Sparkles size={14} className="text-[#FF9933] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Universal Responsive Header */}
        <AppHeader 
          title="My Documents" 
          onBack={() => navigate('/home')}
          rightElement={
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-100 text-[#000080] border border-blue-200">
                SECURE VAULT
              </span>
              <button
                onClick={handleResetDemo}
                title="Reset Document Wallet to defaults"
                className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-rose-600 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <RotateCcw size={12} />
                <span>Reset Vault</span>
              </button>
            </div>
          }
        />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-1">
          
          {/* Header Subtitle Banner */}
          <div className="mb-5 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base sm:text-lg font-extrabold text-[#000080]">DOWLET1 Digital Document Wallet</span>
                <span className="text-[10px] font-bold bg-[#138808]/10 text-[#138808] px-2 py-0.5 rounded-md border border-[#138808]/20">
                  DigiLocker Mesh
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                Store and reuse your documents securely across eligible government services. 
                <span className="font-semibold text-slate-800 ml-1">Upload Once → Verify → Reuse Across Eligible Services.</span>
              </p>
            </div>

            <button
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 shrink-0"
            >
              <Plus size={16} />
              <span>+ Upload Document</span>
            </button>
          </div>

          {/* ═══════════════ DOCUMENT SUMMARY CARDS ═══════════════ */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Documents</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{totalCount}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">In your citizen wallet</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center font-bold">
                <FileText size={20} />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Verified</p>
                <p className="text-2xl font-black text-emerald-700 mt-1">{verifiedCount}</p>
                <p className="text-[10px] text-emerald-600 mt-0.5 font-medium">Ready for instant reuse</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#138808] flex items-center justify-center font-bold">
                <CheckCircle2 size={20} />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Pending</p>
                <p className="text-2xl font-black text-amber-700 mt-1">{pendingCount}</p>
                <p className="text-[10px] text-amber-600 mt-0.5 font-medium">Under simulated review</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock size={20} />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Action Required</p>
                <p className="text-2xl font-black text-slate-800 mt-1">{actionRequiredCount}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Needs re-upload</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                <AlertTriangle size={20} />
              </div>
            </div>
          </div>

          {/* ═══════════════ SEARCH & CATEGORY FILTERS ═══════════════ */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm mb-6 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search documents by name, type, category..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#000080] outline-none transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Document count indicator */}
              <span className="text-xs font-semibold text-slate-500 self-start sm:self-center">
                Showing {filteredDocuments.length} of {totalCount} documents
              </span>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#000080] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ═══════════════ DOCUMENT CARDS GRID ═══════════════ */}
          {filteredDocuments.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center my-6 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#000080] flex items-center justify-center mx-auto mb-3">
                <FileText size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">No matching documents found</h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                We couldn't find any documents matching "{searchQuery}" in category "{selectedCategory}".
              </p>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="bg-[#000080] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md hover:bg-blue-900 transition-colors"
              >
                + Upload Document
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredDocuments.map((doc) => (
                <div 
                  key={doc.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Decorative side accent bar */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                    doc.status === 'verified' ? 'bg-[#138808]' : doc.status === 'pending' ? 'bg-[#FF9933]' : 'bg-rose-500'
                  }`} />

                  <div>
                    {/* Top Row: Category and Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3 pl-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {doc.category || 'General'}
                      </span>
                      {getStatusBadge(doc.status)}
                    </div>

                    {/* Document Title & Issuer */}
                    <div className="flex items-start gap-3 pl-1 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50/80 border border-blue-100 text-[#000080] flex items-center justify-center shrink-0 shadow-xs">
                        <FileText size={22} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-extrabold text-slate-900 truncate leading-snug">
                          {doc.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                          {doc.issuer}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          ID: {doc.docNumberMasked || 'XXXX-XXXX-XXXX'}
                        </p>
                      </div>
                    </div>

                    {/* Metadata pill list */}
                    <div className="bg-slate-50 rounded-xl p-2.5 mb-4 pl-3 space-y-1 text-[11px] text-slate-600 border border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-[10px]">File:</span>
                        <span className="font-mono text-[10px] truncate max-w-[170px] text-slate-700">{doc.fileName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-[10px]">Added On:</span>
                        <span className="text-[10px] font-medium text-slate-700">{doc.addedDate}</span>
                      </div>
                      {doc.usedIn && doc.usedIn.length > 0 && (
                        <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                          <span className="text-slate-400 text-[10px]">Used in:</span>
                          <span className="text-[10px] font-bold text-[#000080]">
                            {doc.usedIn.length} Application{doc.usedIn.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => setDetailsDoc(doc)}
                        className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => {
                          setReuseDoc(doc);
                          setReuseStep('select');
                        }}
                        className="flex-1 py-1.5 px-3 bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <Share2 size={13} />
                        <span>Reuse</span>
                      </button>
                    </div>

                    {/* Contextual actions: Check verification for pending, or quick options */}
                    {doc.status === 'pending' && (
                      <button
                        disabled={loadingAction === `verifying_${doc.id}`}
                        onClick={() => handleVerifyCheck(doc.id)}
                        className="w-full py-1.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold rounded-xl border border-amber-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw size={12} className={loadingAction === `verifying_${doc.id}` ? 'animate-spin' : ''} />
                        <span>{loadingAction === `verifying_${doc.id}` ? 'Checking document status...' : 'Check Verification'}</span>
                      </button>
                    )}

                    {doc.status === 'action_required' && (
                      <button
                        onClick={() => setReplaceDoc(doc)}
                        className="w-full py-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-800 text-[11px] font-bold rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <AlertTriangle size={12} />
                        <span>Replace Document</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ═══════════════ RECENT ACTIVITY & SECURITY BANNER ═══════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            
            {/* Recent Document Activity (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#000080]" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Recent Document Activity
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Verified Audit Trail</span>
              </div>

              <div className="space-y-3">
                {activities.slice(0, 4).map((act, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#000080] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <FileCheck size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 leading-snug">{act.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{act.time} • {act.date}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {act.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security UX Banner (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-sm border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#FF9933]">
                    <Lock size={16} />
                  </div>
                  <h4 className="text-sm font-extrabold tracking-wide text-white">🔐 DOCUMENT SECURITY</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Documents stored in DOWLET1 are protected with end-to-end encryption, role-based access control, consent logging, and cryptographic verification.
                </p>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 size={13} />
                    <span>256-Bit Simulated DigiLocker Handshake</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 size={13} />
                    <span>Explicit Consent Required on Every Reuse</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Citizen: Rahul Kumar (Rajasthan)</span>
                <span className="font-mono text-[#FF9933]">GOV-2025-MESH</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* MODAL 1: UPLOAD DOCUMENT MODAL                                     */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">UPLOAD DOCUMENT</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Add a document to your DOWLET1 digital wallet</p>
                </div>
                <button 
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Document Type</label>
                  <select
                    value={uploadForm.type}
                    onChange={(e) => {
                      const t = e.target.value;
                      const defaultNames = {
                        'identity': 'Identity Proof (Aadhaar / Voter ID)',
                        'address': 'Address Proof (Electricity Bill)',
                        'income': 'Income Proof (Salary / ITR)',
                        'education': 'Education Certificate (Marksheet)',
                        'caste': 'Caste Certificate',
                        'residence': 'Residence Proof (Domicile)',
                        'other': 'Other Supporting Proof'
                      };
                      setUploadForm({
                        ...uploadForm,
                        type: t,
                        name: defaultNames[t] || 'Uploaded Document',
                        fileName: `${t}_proof.pdf`
                      });
                    }}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#000080] outline-none font-medium"
                  >
                    <option value="identity">Identity Proof</option>
                    <option value="address">Address Proof</option>
                    <option value="income">Income Proof</option>
                    <option value="education">Education Certificate</option>
                    <option value="caste">Caste Certificate</option>
                    <option value="residence">Residence Proof</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Document Name</label>
                  <input
                    type="text"
                    required
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    placeholder="Enter document name"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#000080] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">File</label>
                  <div className="p-3.5 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center text-center">
                    <Upload size={24} className="text-[#000080] mb-1" />
                    <p className="text-xs font-bold text-slate-800">Selected File:</p>
                    <p className="text-xs font-mono text-[#000080] font-bold mt-0.5">{uploadForm.fileName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Size: {uploadForm.fileSize}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200 text-[10px] text-blue-900 leading-tight">
                  ℹ️ Uploaded files are encrypted and processed locally within your secure session.
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loadingAction === 'uploading'}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#000080] hover:bg-blue-900 transition-colors shadow-md flex items-center justify-center gap-1.5"
                  >
                    {loadingAction === 'uploading' ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Uploading document...</span>
                      </>
                    ) : (
                      <span>Upload Document</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* MODAL 2: DOCUMENT PREVIEW MODAL                                    */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {previewDoc && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[#000080]" />
                  <h3 className="text-base font-extrabold text-slate-900">DOCUMENT PREVIEW</h3>
                </div>
                <button 
                  onClick={() => setPreviewDoc(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Simulated Government Document Paper Layout */}
              <div className="p-6 bg-gradient-to-b from-amber-50/30 via-white to-blue-50/20 border-2 border-double border-slate-300 rounded-2xl relative overflow-hidden text-center shadow-inner my-2">
                
                {/* Diagonal Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.09] -rotate-45">
                  <p className="text-2xl sm:text-3xl font-black tracking-widest text-[#000080] leading-tight">
                    DIGITAL COPY • OFFICIAL CITIZEN RECORD
                  </p>
                </div>

                {/* State Emblem */}
                <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center mx-auto mb-2 border border-[#000080]/20 shadow-sm">
                  <img src="/dowlet-logo.png" alt="Emblem" className="w-full h-full object-contain" />
                </div>

                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">
                  Government of Rajasthan • Citizen Services Mesh
                </p>
                <p className="text-[9px] font-bold text-[#000080] uppercase tracking-wider mb-2">
                  {previewDoc.issuer || 'Official Issuing Authority'}
                </p>

                <div className="h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent my-3" />

                <h2 className="text-base font-black text-slate-900 uppercase tracking-wide mb-1">
                  {previewDoc.name}
                </h2>
                <p className="text-[10px] font-mono text-slate-500 mb-4">
                  Doc Ref: {previewDoc.id} • Mesh ID: {previewDoc.docNumberMasked || 'XXXX-XXXX-4819'}
                </p>

                <div className="grid grid-cols-2 gap-2 text-left bg-white/90 p-3 rounded-xl border border-slate-200 text-xs mb-4">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Citizen Name</span>
                    <span className="font-bold text-slate-800">Rahul Kumar</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">State / Domicile</span>
                    <span className="font-bold text-slate-800">Rajasthan</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[9px] text-slate-400 block">Date Added</span>
                    <span className="font-medium text-slate-700">{previewDoc.addedDate}</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-[9px] text-slate-400 block">Verification Status</span>
                    <span className="font-bold text-emerald-700">{previewDoc.status === 'verified' ? '✓ Verified' : '● Verification Pending'}</span>
                  </div>
                </div>

                <div className="inline-block bg-[#000080] text-white font-mono text-[9px] px-3 py-1 rounded-md mb-2">
                  DIGITAL COPY • OFFICIAL CITIZEN RECORD
                </div>
                <p className="text-[9px] text-slate-400">
                  Digitally authenticated copy stored in DOWLET1 unified citizen wallet.
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    showToast('Document downloaded successfully.');
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-[#000080] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Download Copy</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* MODAL 3: DOCUMENT DETAILS MODAL                                    */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {detailsDoc && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Document Details</h3>
                  <p className="text-[11px] text-slate-400">Metadata and cross-application usage history</p>
                </div>
                <button 
                  onClick={() => setDetailsDoc(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                  <span className="text-slate-400">Document Name</span>
                  <span className="font-bold text-slate-800">{detailsDoc.name}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                  <span className="text-slate-400">Document Type</span>
                  <span className="font-semibold text-slate-700 capitalize">{detailsDoc.type}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                  <span className="text-slate-400">Status</span>
                  <div>{getStatusBadge(detailsDoc.status)}</div>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                  <span className="text-slate-400">Added On</span>
                  <span className="font-medium text-slate-700">{detailsDoc.addedDate}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                  <span className="text-slate-400">File Name</span>
                  <span className="font-mono text-slate-700 text-[11px]">{detailsDoc.fileName}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-xs">
                  <span className="text-slate-400">Issuing Authority</span>
                  <span className="font-semibold text-slate-800">{detailsDoc.issuer}</span>
                </div>
              </div>

              {/* USED IN APPLICATIONS SECTION */}
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Used In Applications</span>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono">
                    {detailsDoc.usedIn ? detailsDoc.usedIn.length : 0} Linked
                  </span>
                </h4>

                {detailsDoc.usedIn && detailsDoc.usedIn.length > 0 ? (
                  <div className="space-y-2">
                    {detailsDoc.usedIn.map((appRef, aIdx) => (
                      <div 
                        key={aIdx}
                        onClick={() => {
                          setDetailsDoc(null);
                          navigate(`/applications/${appRef}`);
                        }}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#000080] hover:bg-blue-50/50 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-[#000080]">
                            {appRef === 'INC-RJ-2026-001245' ? 'Income Certificate Application' : appRef}
                          </p>
                          <p className="text-[10px] font-mono text-slate-400 mt-0.5">{appRef}</p>
                        </div>
                        <ExternalLink size={14} className="text-slate-400 group-hover:text-[#000080]" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    This document has not been used in any applications yet.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPreviewDoc(detailsDoc);
                      setDetailsDoc(null);
                    }}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                  >
                    View Preview
                  </button>
                  <button
                    onClick={() => {
                      setReuseDoc(detailsDoc);
                      setReuseStep('select');
                      setDetailsDoc(null);
                    }}
                    className="flex-1 py-2 bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Reuse in Service
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setReplaceDoc(detailsDoc);
                      setDetailsDoc(null);
                    }}
                    className="flex-1 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold rounded-xl transition-colors"
                  >
                    Replace
                  </button>
                  <button
                    onClick={() => {
                      setDeleteDoc(detailsDoc);
                    }}
                    className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* MODAL 4: REUSE DOCUMENT & CONSENT FLOW                             */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {reuseDoc && (
          <div className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in duration-200">
              
              {reuseStep === 'select' ? (
                <>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center">
                        <Lock size={16} />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900">🔐 REUSE DOCUMENT</h3>
                    </div>
                    <button 
                      onClick={() => setReuseDoc(null)}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mb-4">
                    Use this document in an eligible service application without re-uploading or physical paperwork.
                  </p>

                  <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-100 mb-4">
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1">Selected Document:</span>
                    <p className="text-sm font-black text-[#000080]">{reuseDoc.name}</p>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">{reuseDoc.fileName}</p>
                  </div>

                  <div className="mb-5">
                    <label className="text-xs font-bold text-slate-800 block mb-2">Select Target Eligible Service:</label>
                    <div className="space-y-2">
                      {[
                        { id: 'income_certificate', name: 'Income Certificate Application', dept: 'Revenue Dept' },
                        { id: 'scholarship', name: 'Post-Matric Scholarship Scheme', dept: 'Education Dept' },
                        { id: 'residence_certificate', name: 'Residence / Domicile Certificate', dept: 'Revenue Dept' }
                      ].map((srv) => (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedServiceForReuse(srv.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            selectedServiceForReuse === srv.id
                              ? 'border-[#000080] bg-blue-50/70 shadow-xs'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900">{srv.name}</p>
                            <p className="text-[10px] text-slate-400">{srv.dept}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedServiceForReuse === srv.id ? 'border-[#000080] bg-[#000080] text-white' : 'border-slate-300'
                          }`}>
                            {selectedServiceForReuse === srv.id && <Check size={10} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setReuseDoc(null)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setReuseStep('consent')}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#000080] hover:bg-blue-900 transition-colors shadow-md flex items-center justify-center gap-1"
                    >
                      <span>Continue</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </>
              ) : (
                /* CONSENT BEFORE REUSE */
                <>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#138808] flex items-center justify-center">
                        <ShieldCheck size={18} />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900">🔐 DOCUMENT SHARING CONSENT</h3>
                    </div>
                    <button 
                      onClick={() => setReuseDoc(null)}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    You are about to share pre-verified documents with the destination department:
                  </p>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-4 space-y-2 text-xs">
                    <div className="flex justify-between pb-2 border-b border-slate-200/60">
                      <span className="text-slate-500">Document:</span>
                      <span className="font-extrabold text-slate-900">{reuseDoc.name}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200/60">
                      <span className="text-slate-500">Application:</span>
                      <span className="font-bold text-[#000080]">
                        {selectedServiceForReuse === 'income_certificate' ? 'Income Certificate' : selectedServiceForReuse}
                      </span>
                    </div>
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Disclosed Data:</span>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-800">
                        <Check size={12} className="text-[#138808]" />
                        <span>Document name ({reuseDoc.name})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-800">
                        <Check size={12} className="text-[#138808]" />
                        <span>Document type ({reuseDoc.type})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-800">
                        <Check size={12} className="text-[#138808]" />
                        <span>Document file ({reuseDoc.fileName})</span>
                      </div>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/60 border border-blue-200 mb-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentAgreed}
                      onChange={(e) => setConsentAgreed(e.target.checked)}
                      className="mt-0.5 rounded text-[#000080] focus:ring-0"
                    />
                    <span className="text-xs text-slate-700 leading-snug">
                      I authorize DOWLET1 to reuse this pre-verified document for this official application under digital consent protocol.
                    </span>
                  </label>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setReuseStep('select')}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      disabled={!consentAgreed}
                      onClick={handleAllowReuse}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#000080] hover:bg-blue-900 disabled:opacity-50 transition-colors shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>Allow & Continue</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* MODAL 5: REPLACE DOCUMENT MODAL                                    */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {replaceDoc && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900">REPLACE DOCUMENT</h3>
                <button 
                  onClick={() => setReplaceDoc(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4 text-xs">
                <span className="text-slate-400 block text-[10px]">Current Document:</span>
                <p className="font-bold text-slate-900">{replaceDoc.name}</p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">{replaceDoc.fileName}</p>
              </div>

              <form onSubmit={handleReplaceSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select New Replacement File</label>
                  <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl bg-blue-50/30 text-center">
                    <Upload size={22} className="text-[#000080] mx-auto mb-1" />
                    <p className="text-xs font-bold text-slate-800">Replacement File:</p>
                    <p className="text-xs font-mono text-[#000080] font-bold mt-0.5">{replaceFileName}</p>
                    <button
                      type="button"
                      onClick={() => setReplaceFileName(`renewed_${replaceDoc.type}_2026.pdf`)}
                      className="mt-2 text-[10px] font-bold text-[#000080] hover:underline"
                    >
                      [Choose Different File]
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  After replacement, status will reset to <strong>Verification Pending</strong> until verified.
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReplaceDoc(null)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loadingAction === 'replacing'}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#000080] hover:bg-blue-900 transition-colors shadow-md flex items-center justify-center gap-1.5"
                  >
                    {loadingAction === 'replacing' ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Updating document...</span>
                      </>
                    ) : (
                      <span>Upload & Replace</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* MODAL 6: DELETE DOCUMENT CONFIRMATION                              */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {deleteDoc && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <Trash2 size={24} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-1">Delete Document?</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Are you sure you want to remove <strong className="text-slate-900">{deleteDoc.name}</strong> from your DOWLET1 wallet?
              </p>
              <p className="text-[10px] text-slate-400 bg-slate-50 p-2 rounded-xl mb-5">
                Note: This does not affect external government databases or official records.
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteDoc(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={loadingAction === 'deleting'}
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  {loadingAction === 'deleting' ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { 
  Upload, CheckCircle2, AlertCircle, FileText, Sparkles, 
  ExternalLink, Check, ShieldCheck, ArrowRight, RefreshCw 
} from 'lucide-react';
import { 
  demoAPI, 
  getDocuments, 
  uploadDocument, 
  hasDocument, 
  reuseDocument 
} from '../../../utils/demoState';

export default function DocumentUpload() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const location = useLocation();

  const [service, setService] = useState(null);
  const [walletDocs, setWalletDocs] = useState([]);
  const [attachedDocs, setAttachedDocs] = useState({});
  const [uploadingFor, setUploadingFor] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    demoAPI.init();
    const sId = serviceId || 'income_certificate';
    const s = demoAPI.getService(sId) || {
      id: sId,
      name: sId === 'income_certificate' ? 'Income Certificate' : 'Service Application',
      requiredDocuments: ['Identity Proof', 'Address Proof', 'Income Proof']
    };
    setService(s);

    const docs = getDocuments();
    setWalletDocs(docs);

    // Initial check for attached documents
    const params = new URLSearchParams(location.search);
    const reusedDocId = params.get('reusedDoc');
    
    const initialAttached = {};
    const reqDocs = s.requiredDocuments || ['Identity Proof', 'Address Proof', 'Income Proof'];
    
    reqDocs.forEach(req => {
      // Find matching doc in wallet
      const match = docs.find(d => 
        d.name.toLowerCase().includes(req.toLowerCase()) || 
        req.toLowerCase().includes(d.name.toLowerCase()) ||
        (req.toLowerCase().includes('identity') && d.type === 'identity') ||
        (req.toLowerCase().includes('address') && d.type === 'address') ||
        (req.toLowerCase().includes('income') && d.type === 'income')
      );

      if (match) {
        // If matched or specifically passed via query param
        if (reusedDocId === match.id || params.get('reuse') === 'true' || match.status === 'verified') {
          initialAttached[req] = match;
        }
      }
    });

    setAttachedDocs(initialAttached);
  }, [serviceId, location.search]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUseExisting = (reqName, doc) => {
    reuseDocument(doc.id, service?.id || serviceId);
    setAttachedDocs(prev => ({ ...prev, [reqName]: doc }));
    showToast(`✓ ${doc.name} attached from your Document Wallet.`);
  };

  const handleSimulatedUpload = (reqName) => {
    setUploadingFor(reqName);
    setTimeout(() => {
      const type = reqName.toLowerCase().includes('income') ? 'income' : 
                   reqName.toLowerCase().includes('address') ? 'address' : 'identity';
      const newDoc = uploadDocument({
        name: reqName,
        type: type,
        fileName: `${type}_uploaded_doc.pdf`
      });
      setWalletDocs(getDocuments());
      setAttachedDocs(prev => ({ ...prev, [reqName]: newDoc }));
      setUploadingFor(null);
      showToast(`✓ ${reqName} uploaded and attached to application.`);
    }, 1200);
  };

  const requiredDocsList = service?.requiredDocuments || ['Identity Proof', 'Address Proof', 'Income Proof'];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2">
          <Sparkles size={14} className="text-[#FF9933]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <AppHeader title={`Required Documents — ${service?.name || 'Application'}`} onBack={() => navigate(-1)} />

      <div className="flex-1 px-5 pt-5 pb-8 flex flex-col max-w-md mx-auto w-full">
        
        {/* Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={18} className="text-[#000080]" />
            <h3 className="text-xs font-extrabold text-[#000080] uppercase tracking-wider">
              DOWLET1 Document Wallet Integration
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Attach pre-verified documents directly from your wallet with 1-click. No scanning or physical xerox required.
          </p>
        </div>

        {/* Required Documents List */}
        <div className="space-y-3.5 mb-6">
          {requiredDocsList.map((reqName, idx) => {
            const attached = attachedDocs[reqName];
            const matchingWalletDoc = walletDocs.find(d => 
              d.name.toLowerCase().includes(reqName.toLowerCase()) || 
              reqName.toLowerCase().includes(d.name.toLowerCase()) ||
              (reqName.toLowerCase().includes('identity') && d.type === 'identity') ||
              (reqName.toLowerCase().includes('address') && d.type === 'address') ||
              (reqName.toLowerCase().includes('income') && d.type === 'income')
            );

            return (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border transition-all ${
                  attached 
                    ? 'border-emerald-200 bg-emerald-50/40 shadow-xs' 
                    : matchingWalletDoc 
                    ? 'border-blue-200 bg-white shadow-xs' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      attached ? 'bg-emerald-100 text-[#138808]' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-snug">{reqName}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Mandatory supporting proof</p>
                    </div>
                  </div>

                  {attached ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 size={12} className="text-[#138808]" />
                      <span>Attached</span>
                    </span>
                  ) : matchingWalletDoc ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full border border-blue-200">
                      <Check size={11} className="text-[#000080]" />
                      <span>Available in Wallet</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                      <AlertCircle size={11} />
                      <span>Pending Upload</span>
                    </span>
                  )}
                </div>

                {/* Card Action Body */}
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  {attached ? (
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span className="font-mono text-[10px] truncate max-w-[200px] text-slate-700 font-semibold">
                        📁 {attached.fileName}
                      </span>
                      <button
                        onClick={() => navigate('/documents')}
                        className="text-[10px] font-bold text-[#000080] hover:underline"
                      >
                        Change
                      </button>
                    </div>
                  ) : matchingWalletDoc ? (
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] text-slate-500 font-medium">
                        Found in wallet: <strong className="text-slate-800">{matchingWalletDoc.fileName}</strong>
                      </p>
                      <button
                        onClick={() => handleUseExisting(reqName, matchingWalletDoc)}
                        className="px-3 py-1.5 bg-[#000080] hover:bg-blue-900 text-white text-[11px] font-bold rounded-xl shadow-xs transition-colors shrink-0"
                      >
                        Use Existing Document
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={uploadingFor === reqName}
                      onClick={() => handleSimulatedUpload(reqName)}
                      className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-blue-200 rounded-xl hover:bg-blue-50/50 text-[#000080] text-xs font-bold transition-colors"
                    >
                      {uploadingFor === reqName ? (
                        <>
                          <RefreshCw size={13} className="animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={13} />
                          <span>+ Upload Document</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Link to Document Wallet */}
        <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-600 font-medium">Want to manage or view credentials?</span>
          <button
            onClick={() => navigate('/documents')}
            className="text-[11px] font-bold text-[#000080] hover:underline flex items-center gap-1"
          >
            <span>Open Wallet</span>
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto space-y-2">
          <PrimaryButton 
            onClick={() => navigate(`/apply/${serviceId || 'income_certificate'}/consent`)}
            className="w-full bg-[#000080] hover:bg-blue-900 shadow-md py-3 font-bold"
          >
            Continue to Consent & Review
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

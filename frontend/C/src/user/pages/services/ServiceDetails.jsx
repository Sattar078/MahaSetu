import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components/Navigation';
import { PrimaryButton } from '../../components/Buttons';
import { CheckCircle2, ChevronRight, Star, Clock, FileText, AlertCircle, Bookmark, BookmarkCheck, Bot } from 'lucide-react';
import { demoAPI } from '../../../utils/demoState';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    demoAPI.init();
    // Default to 'scholarship' if no id provided (to prevent breaks on old routes)
    const sId = id || 'scholarship';
    const s = demoAPI.getService(sId);
    if (s) {
      setService(s);
      setIsSaved(demoAPI.isServiceSaved(s.id));
      setUser(demoAPI.getUser());
    }
  }, [id]);

  if (!service) {
    return (
      <div className="flex flex-col min-h-[100dvh] bg-slate-50 items-center justify-center p-5 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-lg font-bold text-slate-900 mb-2">Service Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">Something went wrong while loading this service.</p>
        <div className="flex gap-3">
          <PrimaryButton onClick={() => navigate('/services')} className="w-full">Back to Services</PrimaryButton>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (isSaved) {
      demoAPI.removeSavedService(service.id);
      setIsSaved(false);
    } else {
      demoAPI.saveService(service.id);
      setIsSaved(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleAskAI = () => {
    // Navigate to AI Assistant with context
    navigate('/ai', { state: { serviceContext: service } });
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-slate-50 relative pb-28">
      <AppHeader title="Service Details" onBack={() => navigate(-1)} />

      {/* Toast Notification */}
      <div 
        className={`fixed top-20 left-1/2 -translate-x-1/2 bg-[#138808] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 transition-all duration-300 z-50 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <CheckCircle2 size={20} />
        <span className="text-sm font-bold whitespace-nowrap">Service saved successfully.</span>
      </div>

      <div className="px-5 pt-6 flex-1 flex flex-col space-y-6">
        
        {/* Header Info */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-900 mb-1">{service.name}</h2>
          <p className="text-xs font-bold text-[#0d599f] uppercase tracking-wider mb-4">{service.department}</p>
          
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              <span className="text-xs font-medium text-slate-600">{service.processingTime}</span>
            </div>
            {service.online && (
              <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded-md border border-green-100">
                Apply Online
              </span>
            )}
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">About This Service</h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            {service.description}
          </p>
        </div>

        {/* Eligibility */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Eligibility</h3>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">{service.eligibility}</p>
          </div>
        </div>

        {/* Required Documents */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Required Documents</h3>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {service.requiredDocuments.map((doc, i) => {
              // Mock check if document is available in user's document wallet
              const available = ['Identity Proof', 'Address Proof', 'Marksheet'].includes(doc);
              return (
                <div key={i} className={`flex items-center gap-3 p-4 ${i !== 0 ? 'border-t border-slate-100' : ''}`}>
                  {available ? (
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle size={16} className="text-amber-500 shrink-0" />
                  )}
                  <span className="text-sm font-medium text-slate-700">{doc}</span>
                  {available ? (
                    <span className="ml-auto text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md">Available</span>
                  ) : (
                    <span className="ml-auto text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-md">Required</span>
                  )}
                </div>
              );
            })}
            <button 
              onClick={() => navigate('/documents')}
              className="w-full flex items-center justify-center gap-2 p-3 bg-slate-50 text-[#0d599f] text-xs font-bold hover:bg-blue-50 transition"
            >
              View My Documents <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* AI Integration */}
        <div className="bg-gradient-to-br from-[#0d599f] to-[#000080] rounded-2xl p-5 text-white shadow-md mb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold mb-1">Need help?</h3>
              <p className="text-xs text-blue-100 mb-3">Ask DOWLET1 AI about this service.</p>
              <button 
                onClick={handleAskAI}
                className="bg-white text-[#0d599f] text-xs font-bold py-2 px-4 rounded-xl shadow-sm hover:bg-slate-50 transition"
              >
                Ask AI
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-6 flex gap-3 z-40 max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={handleSave} 
            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition border shrink-0 ${
              isSaved ? 'bg-amber-50 text-amber-500 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isSaved ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
          </button>
          
          <PrimaryButton onClick={() => navigate(`/eligibility/${service.id}`)} className="flex-1 py-4 text-xs bg-slate-800 hover:bg-slate-900 border-none shadow-md">
            Check Eligibility
          </PrimaryButton>
          
          <PrimaryButton onClick={() => navigate(`/apply/${service.id}/start`)} className="flex-[1.2] py-4 text-xs shadow-md">
            Apply Now
          </PrimaryButton>
        </div>

      </div>
    </div>
  );
}

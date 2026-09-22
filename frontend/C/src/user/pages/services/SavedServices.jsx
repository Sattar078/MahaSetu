import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { AppHeader } from '../../components/Navigation';
import { 
  ChevronRight, BookmarkCheck, Bookmark, Trash2, 
  ArrowRight, FileText, CheckCircle2, Sparkles, AlertCircle 
} from 'lucide-react';
import { demoAPI, isServiceSaved, removeSavedService } from '../../../utils/demoState';

export default function SavedServices() {
  const navigate = useNavigate();
  const [savedServices, setSavedServices] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    demoAPI.init();
    loadSaved();
  }, []);

  const loadSaved = () => {
    // If no saved services yet in prototype, seed with 'scholarship' so it starts with the demo service saved
    const state = demoAPI.getState();
    if (!state.savedServices || state.savedServices.length === 0) {
      demoAPI.saveService('scholarship');
    }
    setSavedServices(demoAPI.getSavedServices());
  };

  const handleRemove = (id, name) => {
    removeSavedService(id);
    setSavedServices(demoAPI.getSavedServices());
    setToastMessage(`${name} removed from saved.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-full pb-24 relative">
        <AppHeader title="Saved Services" onBack={() => navigate('/home')} />

        {/* Toast feedback */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 size={16} className="text-[#138808]" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="px-5 pt-4 pb-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Bookmarked Services
          </h2>
          <p className="text-xs text-slate-500">
            Quickly access and continue applications for services you have saved.
          </p>
        </div>

        <div className="px-5 pt-3 pb-6">
          {savedServices.length > 0 ? (
            <div className="space-y-3">
              {savedServices.map((service) => (
                <div 
                  key={service.id}
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl shadow-sm relative overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-xl shrink-0">
                        {service.icon || '📄'}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {service.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {service.department}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(service.id, service.name)}
                      title="Remove from saved"
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                    {service.shortDescription || service.description}
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button 
                      onClick={() => navigate(`/service-details/${service.id}`)}
                      className="flex-1 py-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors text-center"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => navigate(`/apply/${service.id}/start`)}
                      className="flex-1 py-2 text-xs font-bold text-white bg-[#000080] rounded-xl shadow-sm hover:bg-blue-900 transition-colors flex items-center justify-center gap-1"
                    >
                      Apply <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Bookmark size={24} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                No saved services yet
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-xs mx-auto leading-relaxed">
                Save recommended services from Home or Explore Services to access them easily.
              </p>
              <button
                onClick={() => navigate('/recommended')}
                className="bg-[#000080] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-sm hover:bg-blue-900 transition-colors"
              >
                Explore Recommended Services
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

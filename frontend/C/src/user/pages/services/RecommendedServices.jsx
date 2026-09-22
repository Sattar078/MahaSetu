import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, RefreshCw, CheckCircle2, Bookmark, BookmarkCheck, 
  ChevronRight, Sparkles, Star, Bot, AlertCircle, Search, ArrowRight
} from 'lucide-react';
import MainLayout from '../../components/MainLayout';
import { 
  demoAPI, 
  getRecommendedServices, 
  saveService, 
  removeSavedService, 
  isServiceSaved,
  refreshRecommendations 
} from '../../../utils/demoState';

const CATEGORIES = [
  'All',
  'Education',
  'Certificates',
  'Jobs',
  'Welfare',
  'Health'
];

export default function RecommendedServices() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recommendations, setRecommendations] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    demoAPI.init();
    loadRecommendations();
  }, []);

  const loadRecommendations = () => {
    const recs = getRecommendedServices();
    setRecommendations(recs);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const recs = refreshRecommendations();
      setRecommendations(recs);
      setIsRefreshing(false);
      showToast("Recommendations updated based on current profile.");
    }, 600);
  };

  const handleToggleSave = (service) => {
    const saved = isServiceSaved(service.id);
    if (saved) {
      removeSavedService(service.id);
      showToast(`${service.name} removed from saved.`);
    } else {
      saveService(service.id);
      showToast(`${service.name} saved.`);
    }
    setRecommendations(getRecommendedServices());
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredRecommendations = recommendations.filter(service => {
    if (selectedCategory === 'All') return true;
    return (service.category || '').toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-full pb-24 relative">
        
        {/* Toast Feedback */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 size={16} className="text-[#138808]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Top Header */}
        <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/home')} 
                className="p-1.5 -ml-1 text-slate-700 hover:text-[#000080] hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Back to Home"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Star size={15} className="text-[#FF9933] fill-[#FF9933]" />
                  Recommended For You
                </h1>
              </div>
            </div>

            {/* Refresh Recommendations Button */}
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 text-[11px] font-bold text-[#000080] bg-blue-50/80 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={12} className={isRefreshing ? "animate-spin text-[#FF9933]" : ""} />
              <span>{isRefreshing ? "Updating..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* Banner Subtitle */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Services selected based on your available profile information.
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5 italic">
            Prototype recommendations for demo user Rahul Kumar (Rajasthan, Age: 21).
          </p>
        </div>

        {/* Category Filters */}
        <div className="px-5 py-3 overflow-x-auto hide-scrollbar flex gap-2">
          {CATEGORIES.map(category => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#000080] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Services List */}
        <div className="px-5 pt-2 space-y-4">
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((service, index) => {
              const saved = isServiceSaved(service.id);
              return (
                <div 
                  key={service.id || index}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md"
                >
                  {/* Top accent badge for top recommendation */}
                  {index === 0 && selectedCategory === 'All' && (
                    <div className="absolute top-0 right-0 bg-[#FF9933] text-white text-[9px] font-bold px-3 py-0.5 rounded-bl-lg uppercase tracking-wider">
                      Top Match
                    </div>
                  )}

                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-3 mb-2 pt-1">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl shrink-0">
                        {service.icon || '📄'}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug">
                          {service.name}
                        </h3>
                        <p className="text-[11px] font-medium text-slate-500">
                          {service.department}
                        </p>
                      </div>
                    </div>

                    {/* Save Bookmark Button */}
                    <button
                      onClick={() => handleToggleSave(service)}
                      title={saved ? "Saved" : "Save service"}
                      className={`p-2 rounded-xl border transition-colors shrink-0 ${
                        saved 
                          ? 'bg-amber-50 text-amber-600 border-amber-200' 
                          : 'bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-600'
                      }`}
                    >
                      {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    </button>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    {service.shortDescription || service.description}
                  </p>

                  {/* Available Information Badges */}
                  <div className="bg-slate-50/90 rounded-xl p-2.5 mb-3 border border-slate-100 space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Available Information
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        <CheckCircle2 size={12} className="text-[#138808]" />
                        <span>Profile information</span>
                      </div>
                      {service.matchedDocs && service.matchedDocs.length > 0 ? (
                        service.matchedDocs.map((doc, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                            <CheckCircle2 size={12} className="text-[#138808]" />
                            <span>{doc}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                          <CheckCircle2 size={12} className="text-[#138808]" />
                          <span>Required documents</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => navigate(`/service-details/${service.id}`)}
                      className="flex-1 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-center"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => navigate('/ai', { state: { serviceContext: service } })}
                      title="Ask DOWLET1 AI"
                      className="px-3 py-2 text-xs font-bold text-[#000080] bg-blue-50/70 hover:bg-blue-100 border border-blue-100 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Bot size={14} className="text-[#FF9933]" />
                      <span>Ask AI</span>
                    </button>

                    <button
                      onClick={() => navigate(`/apply/${service.id}/start`)}
                      className="flex-1 py-2 text-xs font-bold text-white bg-[#000080] hover:bg-blue-900 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1"
                    >
                      Apply <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                No personalized recommendations yet.
              </h3>
              <p className="text-xs text-slate-500 mb-4 max-w-xs mx-auto leading-relaxed">
                Complete your profile and add verified information to receive relevant service suggestions.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="bg-[#000080] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-sm hover:bg-blue-900 transition-colors"
              >
                Complete Profile
              </button>
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
}

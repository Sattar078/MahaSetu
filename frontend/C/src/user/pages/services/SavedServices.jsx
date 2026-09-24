import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { AppHeader } from '../../components/Navigation';
import { 
  Star, Bookmark, BookmarkCheck, Search, X, ArrowRight, ChevronRight, 
  CheckCircle2, FileText, Sparkles, Filter, Undo2, ArrowLeft, ShieldCheck,
  Check, ExternalLink, HelpCircle
} from 'lucide-react';
import { 
  demoAPI, 
  getSavedServices, 
  removeSavedService, 
  saveService, 
  toggleSavedService,
  isServiceSaved,
  INITIAL_SAVED_SERVICES 
} from '../../../utils/demoState';

const CATEGORY_FILTERS = [
  'All',
  'Certificates',
  'Education',
  'Jobs',
  'Agriculture',
  'Health',
  'Transport',
  'Welfare'
];

export default function SavedServices() {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const [savedServices, setSavedServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Toast with undo support
  const [toast, setToast] = useState(null); // { message, lastRemovedService }
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    demoAPI.init();
    loadSavedServices();
  }, []);

  const loadSavedServices = () => {
    const list = getSavedServices();
    setSavedServices(list);
  };

  const showToast = (message, lastRemoved = null) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, lastRemoved });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleRemove = (service, e) => {
    if (e) e.stopPropagation();
    removeSavedService(service.id);
    loadSavedServices();
    showToast("Removed from Saved Services", service);
  };

  const handleUndo = () => {
    if (toast?.lastRemoved) {
      saveService(toast.lastRemoved);
      loadSavedServices();
      showToast("Service restored to Saved Services", null);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Filter & Search Logic
  const filteredServices = savedServices.filter(service => {
    // Category match
    const categoryMatch = selectedCategory === 'All' || 
      (service.category && service.category.toLowerCase() === selectedCategory.toLowerCase());
    
    // Search query match
    if (!categoryMatch) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    const nameMatch = service.name && service.name.toLowerCase().includes(q);
    const deptMatch = service.department && service.department.toLowerCase().includes(q);
    const catMatch = service.category && service.category.toLowerCase().includes(q);
    const descMatch = (service.description && service.description.toLowerCase().includes(q)) ||
                      (service.shortDescription && service.shortDescription.toLowerCase().includes(q));

    return nameMatch || deptMatch || catMatch || descMatch;
  });

  // Calculate counts per category
  const categoryCounts = CATEGORY_FILTERS.reduce((acc, cat) => {
    if (cat === 'All') {
      acc[cat] = savedServices.length;
    } else {
      acc[cat] = savedServices.filter(s => s.category && s.category.toLowerCase() === cat.toLowerCase()).length;
    }
    return acc;
  }, {});

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-full pb-28 lg:pb-12 relative text-slate-800">
        
        {/* Universal Top Header */}
        <AppHeader 
          title="Saved Services" 
          onBack={() => navigate(-1)} 
          rightElement={
            <button
              onClick={() => {
                if (searchInputRef.current) {
                  searchInputRef.current.focus();
                }
              }}
              aria-label="Search saved services"
              className="p-2 text-slate-600 hover:text-[#000080] hover:bg-slate-100 rounded-xl transition-colors"
              title="Search saved services"
            >
              <Search size={18} />
            </button>
          }
        />

        {/* Floating Toast Notification with Undo */}
        {toast && (
          <div 
            role="status" 
            aria-live="polite"
            className="fixed top-16 lg:top-24 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold z-50 transition-all border border-slate-700 animate-in fade-in slide-in-from-top-3 max-w-sm w-full mx-auto"
          >
            <CheckCircle2 size={16} className="text-[#138808] shrink-0" />
            <span className="flex-1 truncate">{toast.message}</span>
            {toast.lastRemoved && (
              <button
                onClick={handleUndo}
                className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 shrink-0 shadow-xs"
              >
                <Undo2 size={12} />
                <span>Undo</span>
              </button>
            )}
            <button
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              className="p-1 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-2">
          
          {/* Breadcrumb Navigation on Tablet / Desktop */}
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 mb-3">
            <Link to="/home" className="hover:text-[#000080] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <Link to="/services" className="hover:text-[#000080] transition-colors">Services</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="font-semibold text-slate-700">Saved Services</span>
          </nav>

          {/* Page Banner / Header Card */}
          <div className="bg-gradient-to-r from-blue-900 via-[#000080] to-[#0d599f] rounded-2xl p-5 sm:p-6 text-white shadow-sm mb-5 relative overflow-hidden">
            {/* Subtle decorative background accents */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-[#FF9933]/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-amber-300 text-[11px] font-semibold tracking-wide uppercase mb-2">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span>Bookmarked Hub</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                  <span>⭐ Saved Services</span>
                </h1>
                <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                  Quickly access the government services you saved for later.
                </p>
              </div>

              {/* Dynamic Saved Counter Pill */}
              <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold shrink-0 self-start sm:self-auto">
                <BookmarkCheck size={16} className="text-amber-300" />
                <span>{savedServices.length} {savedServices.length === 1 ? 'Service Saved' : 'Services Saved'}</span>
              </div>
            </div>

            {/* Integrated Search Bar inside banner */}
            <div className="mt-4 pt-3 border-t border-white/15">
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved services by name, department, or category..."
                  aria-label="Search saved services"
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#FF9933] shadow-inner font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search input"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full transition"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Horizontal Category Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Filter size={12} className="text-slate-400" />
                <span>Filter by Category</span>
              </span>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-[11px] font-bold text-[#000080] hover:underline"
                >
                  Reset filter
                </button>
              )}
            </div>

            {/* Scrollable Chip Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {CATEGORY_FILTERS.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={isSelected}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-[#000080] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ═══════════════ MAIN CONTENT AREA ═══════════════ */}

          {/* Case 1: Total savedServices === 0 */}
          {savedServices.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-lg mx-auto my-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center mx-auto mb-4 text-3xl shadow-2xs">
                ⭐
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1.5">
                No Saved Services Yet
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed max-w-sm mx-auto">
                Save government services here so you can quickly access them later.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => navigate('/services')}
                  className="w-full sm:w-auto bg-[#000080] hover:bg-blue-900 text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore Services</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => navigate('/home')}
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold py-3 px-5 rounded-xl border border-slate-200 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : filteredServices.length === 0 ? (
            /* Case 2: Filter/Search returns 0 results */
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center max-w-md mx-auto my-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Search size={24} />
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-800 mb-1">
                No matching services found
              </h2>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Try another search or category.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-[#000080] hover:bg-blue-900 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-sm transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            /* Case 3: Display Saved Services Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => {
                const serviceTargetId = service.id || service.canonicalId || 'scholarship';
                return (
                  <div 
                    key={service.id || serviceTargetId}
                    className="bg-white rounded-2xl border border-blue-100/80 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative group"
                  >
                    {/* Top Header Card Info */}
                    <div className="p-4 sm:p-5 pb-3">
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        
                        {/* Service Icon & Main Details */}
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                            {service.icon || '📄'}
                          </div>
                          <div className="min-w-0">
                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-[#0d599f] border border-blue-100 mb-1">
                              {service.category || 'Services'}
                            </span>
                            <h3 className="text-sm font-bold text-slate-900 leading-snug truncate">
                              {service.name}
                            </h3>
                            <p className="text-[11px] text-slate-500 font-medium truncate">
                              {service.department}
                            </p>
                          </div>
                        </div>

                        {/* Top-Right Saved Star / Bookmark Icon button */}
                        <button
                          onClick={(e) => handleRemove(service, e)}
                          title="Remove from Saved Services"
                          aria-label={`Remove ${service.name} from saved services`}
                          className="p-2 text-amber-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0 bg-amber-50/60 border border-amber-200/60"
                        >
                          <Star size={16} className="fill-amber-400 text-amber-500" />
                        </button>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {service.description || service.shortDescription || 'Apply for eligible education assistance and scholarship services.'}
                      </p>

                      {/* Feature Availability Badges */}
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                          <CheckCircle2 size={13} className="text-[#138808] shrink-0" />
                          <span>Profile information available</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700">
                          <CheckCircle2 size={13} className="text-[#0d599f] shrink-0" />
                          <span>Documents available</span>
                        </div>
                      </div>

                      {/* Demo Recommendation / Eligibility Notice */}
                      <div className="mt-2.5 bg-slate-50 p-2 rounded-lg border border-slate-100 text-[10px] text-slate-500 leading-tight italic">
                        Based on your available profile information.
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="p-4 sm:p-5 pt-0 mt-2">
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => navigate(`/service-details/${serviceTargetId}`, { state: { service } })}
                          className="flex-1 py-2.5 px-3 text-xs font-bold text-[#000080] bg-blue-50/70 hover:bg-blue-100 border border-blue-200/60 rounded-xl transition-colors text-center flex items-center justify-center gap-1"
                        >
                          <span>View Details</span>
                          <ChevronRight size={13} />
                        </button>

                        <button
                          onClick={() => navigate(`/apply/${serviceTargetId}/start`)}
                          className="flex-1 py-2.5 px-3 text-xs font-bold text-white bg-[#000080] hover:bg-blue-900 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Apply</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Help / AI Assistant integration trigger */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50/70 rounded-2xl p-4 sm:p-5 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#000080] text-white flex items-center justify-center text-lg shrink-0 shadow-xs">
                ✨
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Ask DOWLET1 AI about your saved services
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600">
                  Say "Show my saved services" or "Apply for my saved service" for guided assistance.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/ai', { state: { initialQuery: "Show my saved services" } })}
              className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-slate-50 text-[#000080] border border-blue-200 text-xs font-bold rounded-xl shadow-2xs transition-colors whitespace-nowrap text-center"
            >
              Ask AI Assistant →
            </button>
          </div>

          {/* Demo Safety Banner */}
          <div className="mt-8 text-center text-[11px] text-slate-400 py-3 border-t border-slate-200/60">
            DOWLET1 Prototype • Simulated citizen portal data for SIH evaluation • Mock application workflow
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
